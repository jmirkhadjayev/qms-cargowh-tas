package uz.airport.cargo.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import uz.airport.cargo.dto.*;
import uz.airport.cargo.model.*;
import uz.airport.cargo.repository.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

@Service
public class QueueService {

    private final TicketRepository ticketRepository;
    private final DockRepository dockRepository;
    private final DiscrepancyReportRepository discrepancyReportRepository;
    private final AweryIntegrationService aweryService;
    private final AuditService auditService;
    private final NotificationService notificationService;
    private final QrCodeService qrCodeService;

    public QueueService(TicketRepository ticketRepository,
                        DockRepository dockRepository,
                        DiscrepancyReportRepository discrepancyReportRepository,
                        AweryIntegrationService aweryService,
                        AuditService auditService,
                        NotificationService notificationService,
                        QrCodeService qrCodeService) {
        this.ticketRepository = ticketRepository;
        this.dockRepository = dockRepository;
        this.discrepancyReportRepository = discrepancyReportRepository;
        this.aweryService = aweryService;
        this.auditService = auditService;
        this.notificationService = notificationService;
        this.qrCodeService = qrCodeService;
    }

    private synchronized String generateNextTicketNumber(boolean isPriority) {
        String prefix = isPriority ? "P-" : "A-";
        int seq = 1;
        while (ticketRepository.findByTicketNumber(String.format("%s%03d", prefix, seq)).isPresent()) {
            seq++;
        }
        return String.format("%s%03d", prefix, seq);
    }

    /**
     * 3.1. Ro'yxatga olish (Registration).
     * MANDATORY REQUIREMENT: Permit MUST be verified. Otherwise registration is blocked and rejection is logged!
     */
    @Transactional
    public Ticket registerTicket(RegisterTicketRequest req) {
        String cleanAwb = req.getAwbNumber().trim();

        // 1. Check Awery release permit
        Optional<AweryAwb> aweryOpt = aweryService.findAwb(cleanAwb);
        boolean permitGranted = aweryOpt.map(AweryAwb::getReleasePermitGranted).orElse(false);

        if (!permitGranted) {
            String errorReason = aweryOpt.isEmpty() ?
                    "AWB Awery ERP tizimidan topilmadi yoki kiritilmagan!" :
                    "Bojxona ruxsati (Release Permit) tasdiqlanmagan! Qoidaga binoan navbatga qo'yish taqiqlanadi.";
            auditService.logEvent(null, "N/A", cleanAwb, "REJECT_REGISTRATION",
                    "NONE", "REJECTED", req.getRegisteredBy(), errorReason);
            throw new IllegalStateException(errorReason);
        }

        // 2. Generate unique ticket number (e.g. A-001 or P-001)
        boolean isPriority = Boolean.TRUE.equals(req.getIsPriority()) ||
                (aweryOpt.isPresent() && (aweryOpt.get().getCategory() == CargoCategory.PERISHABLE || aweryOpt.get().getCategory() == CargoCategory.VALUABLE));
        String ticketNumber = generateNextTicketNumber(isPriority);

        // 3. Build Ticket entity
        Ticket ticket = new Ticket();
        ticket.setTicketNumber(ticketNumber);
        ticket.setAwbNumber(cleanAwb);
        ticket.setIsPriority(isPriority);

        if (aweryOpt.isPresent()) {
            AweryAwb awb = aweryOpt.get();
            ticket.setConsigneeName(req.getConsigneeName() != null && !req.getConsigneeName().isBlank() ? req.getConsigneeName() : awb.getConsignee());
            ticket.setTotalPieces(req.getPieces() != null ? req.getPieces() : awb.getPieces());
            ticket.setTotalWeightKg(req.getWeightKg() != null ? req.getWeightKg() : awb.getWeightKg());
            ticket.setCategory(req.getCategory() != null ? req.getCategory() : awb.getCategory());
            ticket.setStorageLocation(req.getStorageLocation() != null ? req.getStorageLocation() : awb.getWarehouseLocation());
            ticket.setReleasePermitNumber(awb.getCustomsDeclarationNumber());
            ticket.setReleasePermitSource("AWERY_ERP");
        } else {
            ticket.setConsigneeName(req.getConsigneeName());
            ticket.setTotalPieces(req.getPieces());
            ticket.setTotalWeightKg(req.getWeightKg());
            ticket.setCategory(req.getCategory());
            ticket.setStorageLocation(req.getStorageLocation());
            ticket.setReleasePermitSource("MANUAL_CONFIRMED");
        }

        ticket.setRepresentativeName(req.getRepresentativeName());
        ticket.setVehiclePlate(req.getVehiclePlate());
        ticket.setContactPhone(req.getContactPhone());
        ticket.setReleasePermitVerified(true);
        ticket.setRegisteredBy(req.getRegisteredBy());
        ticket.setStatus(TicketStatus.PREPARATION_PENDING);

        // Security barcode hash for QR scanning
        String barcodeToken = UUID.randomUUID().toString().substring(0, 12).toUpperCase();
        ticket.setBarcodeHash("TAS-" + ticketNumber + "-" + barcodeToken);

        Ticket saved = ticketRepository.save(ticket);

        // Audit log
        auditService.logEvent(saved.getId(), saved.getTicketNumber(), saved.getAwbNumber(),
                "REGISTER", "NONE", saved.getStatus().name(), req.getRegisteredBy(),
                "Talon ro'yxatga olindi. Joylar soni: " + saved.getTotalPieces() + ", Vazni: " + saved.getTotalWeightKg() + " kg");

        // Broadcast to WebSocket & SMS
        notificationService.broadcastQueueUpdate(saved);
        if (saved.getContactPhone() != null && !saved.getContactPhone().isBlank()) {
            notificationService.sendSmsNotification(saved.getContactPhone(),
                    String.format("TAS CARGO: Talon %s qabul qilindi. AWB: %s. Yuk omborda tayyorlanmoqda, kutish zalida kuting.",
                            saved.getTicketNumber(), saved.getAwbNumber()));
        }

        return saved;
    }

    /**
     * 3.2. Ombor tayyorlashni boshlash (Start preparation).
     */
    @Transactional
    public Ticket startPreparation(Long ticketId, String warehouseOperator) {
        Ticket ticket = getTicket(ticketId);
        String oldStatus = ticket.getStatus().name();
        ticket.setStatus(TicketStatus.PREPARING);
        ticket.setPreparationStartedAt(LocalDateTime.now());
        ticket.setPreparedBy(warehouseOperator);

        Ticket updated = ticketRepository.save(ticket);
        auditService.logEvent(updated.getId(), updated.getTicketNumber(), updated.getAwbNumber(),
                "START_PREPARATION", oldStatus, updated.getStatus().name(), warehouseOperator, "Sklad xodimi yukni yacheykadan yig'ishni boshladi");

        notificationService.broadcastQueueUpdate(updated);
        return updated;
    }

    /**
     * 3.3. Ombor tayyorlashni yakunlash (Complete preparation - Cargo at Dock).
     */
    @Transactional
    public Ticket completePreparation(Long ticketId, String warehouseOperator, Long preferredDockId) {
        Ticket ticket = getTicket(ticketId);
        String oldStatus = ticket.getStatus().name();
        ticket.setStatus(TicketStatus.PREPARED);
        ticket.setPreparedAt(LocalDateTime.now());
        ticket.setPreparedBy(warehouseOperator);

        if (preferredDockId != null) {
            dockRepository.findById(preferredDockId).ifPresent(dock -> {
                ticket.setAssignedDockId(dock.getId());
                ticket.setAssignedDockNumber(dock.getDockNumber());
            });
        }

        Ticket updated = ticketRepository.save(ticket);
        auditService.logEvent(updated.getId(), updated.getTicketNumber(), updated.getAwbNumber(),
                "PREPARED", oldStatus, updated.getStatus().name(), warehouseOperator, "Yuk topildi va dok hududiga chiqarildi");

        notificationService.broadcastQueueUpdate(updated);
        return updated;
    }

    public Dock findDockByIdOrNumber(Long dockIdOrNumber) {
        return dockRepository.findById(dockIdOrNumber)
                .or(() -> dockRepository.findAll().stream()
                        .filter(d -> d.getDockNumber().longValue() == dockIdOrNumber)
                        .findFirst())
                .orElseThrow(() -> new IllegalArgumentException("Dok topilmadi: " + dockIdOrNumber));
    }

    public boolean isTicketEligibleForDock(Ticket ticket, Dock dock) {
        if (ticket == null || dock == null) return false;

        // 1. If explicitly assigned to a dock number
        if (ticket.getAssignedDockNumber() != null) {
            return ticket.getAssignedDockNumber().equals(dock.getDockNumber());
        }

        // 2. All 6 docks support all cargo categories (Universal)
        if (dock.getSupportedCategories() == null || dock.getSupportedCategories().isBlank() ||
                dock.getSupportedCategories().equalsIgnoreCase("ALL") || dock.getSupportedCategories().contains("ALL")) {
            return true;
        }

        List<String> supported = Arrays.stream(dock.getSupportedCategories().split(","))
                .map(String::trim)
                .map(String::toUpperCase)
                .toList();

        String cat = ticket.getCategory() != null ? ticket.getCategory().name() : "GENERAL";
        return supported.contains(cat) || supported.contains("ALL");
    }

    public List<Ticket> getEligiblePreparedTicketsForDock(Dock dock) {
        List<Ticket> allPrepared = ticketRepository.findByStatusInOrderByRegisteredAtAsc(
                List.of(TicketStatus.PREPARED, TicketStatus.DOCK_ASSIGNED)
        );

        return allPrepared.stream()
                .filter(t -> isTicketEligibleForDock(t, dock))
                .sorted(Comparator.comparing(
                        (Ticket t) -> Boolean.TRUE.equals(t.getIsPriority()),
                        Comparator.reverseOrder()
                ).thenComparing(
                        Ticket::getRegisteredAt,
                        Comparator.nullsLast(Comparator.naturalOrder())
                ))
                .collect(Collectors.toList());
    }

    /**
     * 3.4. Dokka chaqirish (Call client to dock).
     * MANDATORY REQUIREMENTS:
     * 1. Cargo MUST be PREPARED before client can be called (TZ 3.3).
     * 2. Dock must NOT be busy with another client.
     * 3. STRICT QUEUE ORDER (Navbatni sakratish taqiqlangan): Only the first eligible ticket in line can be called!
     */
    @Transactional
    public Ticket callClientToDock(Long ticketId, Long dockId, String operator) {
        Ticket ticket = getTicket(ticketId);
        Dock dock = findDockByIdOrNumber(dockId);

        // 1. Cargo readiness check
        if (ticket.getStatus() != TicketStatus.PREPARED && ticket.getStatus() != TicketStatus.DOCK_ASSIGNED) {
            throw new IllegalStateException("Ushbu yuk hali ombor tomonidan tayyorlanmagan! Holati: " + ticket.getStatus().getUzbekName());
        }

        // 2. Dock occupancy check
        if (dock.getStatus() == DockStatus.OCCUPIED && dock.getCurrentTicketId() != null) {
            Optional<Ticket> curOpt = ticketRepository.findById(dock.getCurrentTicketId());
            if (curOpt.isPresent()) {
                Ticket cur = curOpt.get();
                if (cur.getStatus() == TicketStatus.CALLED || cur.getStatus() == TicketStatus.ARRIVED || cur.getStatus() == TicketStatus.ISSUING) {
                    throw new IllegalStateException("Dok #" + dock.getDockNumber() + " hozirda band (Talon: " + cur.getTicketNumber() + "). Yangi mijoz chaqirishdan oldin joriy yuk berish jarayonini yakunlang!");
                }
            }
        }

        // 3. Dock category / assignment eligibility check
        if (!isTicketEligibleForDock(ticket, dock)) {
            if (ticket.getAssignedDockNumber() != null) {
                throw new IllegalStateException("Ushbu yuk Dok #" + ticket.getAssignedDockNumber() + " ga biriktirilgan. Uni Dok #" + dock.getDockNumber() + " ga chaqirib bo'lmaydi!");
            } else {
                throw new IllegalStateException("Ushbu yuk toifasi (" + ticket.getCategory() + ") Dok #" + dock.getDockNumber() + " ga mos kelmaydi!");
            }
        }

        // 4. Strict Queue Check - NO QUEUE SKIPPING (Navbatni sakratishni qat'iy taqiqlash)
        List<Ticket> eligibleQueue = getEligiblePreparedTicketsForDock(dock);
        if (eligibleQueue.isEmpty()) {
            throw new IllegalStateException("Dok #" + dock.getDockNumber() + " uchun navbatda tayyor yuk mavjud emas!");
        }

        Ticket nextInQueue = eligibleQueue.get(0);
        if (!nextInQueue.getId().equals(ticketId)) {
            throw new IllegalStateException(String.format(
                    "Navbatni sakratish (o'zboshimchalik bilan boshqa mijozni chaqirish) taqiqlangan! " +
                    "Navbat bo'yicha navbatdagi mijoz: Talon %s (AWB: %s, %s). Faqat 1-navbatdagi mijoz chaqirilishi mumkin.",
                    nextInQueue.getTicketNumber(), nextInQueue.getAwbNumber(), nextInQueue.getConsigneeName()
            ));
        }

        String oldStatus = ticket.getStatus().name();
        ticket.setStatus(TicketStatus.CALLED);
        ticket.setAssignedDockId(dock.getId());
        ticket.setAssignedDockNumber(dock.getDockNumber());
        ticket.setCallCount(ticket.getCallCount() + 1);

        LocalDateTime now = LocalDateTime.now();
        if (ticket.getFirstCalledAt() == null) {
            ticket.setFirstCalledAt(now);
        }
        ticket.setLastCalledAt(now);

        // Update Dock status
        dock.setStatus(DockStatus.OCCUPIED);
        dock.setCurrentTicketId(ticket.getId());
        dock.setCurrentTicketNumber(ticket.getTicketNumber());
        dock.setCurrentVehiclePlate(ticket.getVehiclePlate());
        dockRepository.save(dock);

        Ticket updated = ticketRepository.save(ticket);

        auditService.logEvent(updated.getId(), updated.getTicketNumber(), updated.getAwbNumber(),
                "CALL_CLIENT", oldStatus, updated.getStatus().name(), operator,
                String.format("Mijoz %d-dokga navbat bo'yicha chaqirildi (Chaqiruv #%d)", dock.getDockNumber(), updated.getCallCount()));

        // Broadcast to Big LED Board and Docks
        notificationService.broadcastLedCall(updated.getTicketNumber(), dock.getDockNumber(),
                updated.getVehiclePlate(), updated.getCategory().getDisplayName());
        notificationService.broadcastDockStatus(dock);
        notificationService.broadcastQueueUpdate(updated);

        // SMS notification
        if (updated.getContactPhone() != null && !updated.getContactPhone().isBlank()) {
            notificationService.sendSmsNotification(updated.getContactPhone(),
                    String.format("TAS CARGO: Diqqat! Talon %s, iltimos DOCK #%d ga yetib keling! Avto: %s",
                            updated.getTicketNumber(), dock.getDockNumber(),
                            updated.getVehiclePlate() != null ? updated.getVehiclePlate() : "-"));
        }

        return updated;
    }

    /**
     * Call next client in line for dock.
     */
    @Transactional
    public Ticket callNextClientToDock(Long dockId, String operator) {
        Dock dock = findDockByIdOrNumber(dockId);
        List<Ticket> eligible = getEligiblePreparedTicketsForDock(dock);
        if (eligible.isEmpty()) {
            throw new IllegalStateException("Dok #" + dock.getDockNumber() + " uchun navbatda tayyor yuk mavjud emas!");
        }
        Ticket next = eligible.get(0);
        return callClientToDock(next.getId(), dock.getId(), operator);
    }

    /**
     * 3.5. Qayta chaqirish (Repeat call if client hasn't arrived).
     */
    @Transactional
    public Ticket repeatCall(Long ticketId, String operator) {
        Ticket ticket = getTicket(ticketId);
        ticket.setCallCount(ticket.getCallCount() + 1);
        ticket.setLastCalledAt(LocalDateTime.now());
        Ticket updated = ticketRepository.save(ticket);

        auditService.logEvent(updated.getId(), updated.getTicketNumber(), updated.getAwbNumber(),
                "RECALL_CLIENT", updated.getStatus().name(), updated.getStatus().name(), operator,
                "Mijoz qayta chaqirildi (#" + updated.getCallCount() + ")");

        notificationService.broadcastLedCall(updated.getTicketNumber(), updated.getAssignedDockNumber(),
                updated.getVehiclePlate(), updated.getCategory().getDisplayName());

        return updated;
    }

    /**
     * 3.6. Mijoz dokka yetib keldi (Client arrived at dock).
     */
    @Transactional
    public Ticket markClientArrived(Long ticketId, String operator) {
        Ticket ticket = getTicket(ticketId);
        String oldStatus = ticket.getStatus().name();
        ticket.setStatus(TicketStatus.ARRIVED);
        ticket.setArrivedAtDockAt(LocalDateTime.now());
        Ticket updated = ticketRepository.save(ticket);

        auditService.logEvent(updated.getId(), updated.getTicketNumber(), updated.getAwbNumber(),
                "CLIENT_ARRIVED", oldStatus, updated.getStatus().name(), operator, "Mijoz dokka yetib keldi, shaxsi tekshirilmoqda");

        notificationService.broadcastQueueUpdate(updated);
        return updated;
    }

    /**
     * 3.7. Yuk berishni boshlash (Start issuing).
     */
    @Transactional
    public Ticket startIssuing(Long ticketId, String operator) {
        Ticket ticket = getTicket(ticketId);
        String oldStatus = ticket.getStatus().name();
        ticket.setStatus(TicketStatus.ISSUING);
        ticket.setIssueStartedAt(LocalDateTime.now());
        ticket.setIssuedBy(operator);
        Ticket updated = ticketRepository.save(ticket);

        auditService.logEvent(updated.getId(), updated.getTicketNumber(), updated.getAwbNumber(),
                "START_ISSUE", oldStatus, updated.getStatus().name(), operator, "Yuk berish jarayoni boshlandi");

        notificationService.broadcastQueueUpdate(updated);
        return updated;
    }

    /**
     * 3.8. Yuk berishni to'liq yakunlash (Complete issuing).
     */
    @Transactional
    public Ticket completeIssuing(Long ticketId, String operator, String remarks) {
        Ticket ticket = getTicket(ticketId);
        String oldStatus = ticket.getStatus().name();

        ticket.setStatus(TicketStatus.WAITING_KPP);
        ticket.setIssuedPieces(ticket.getTotalPieces());
        ticket.setIssueCompletedAt(LocalDateTime.now());
        ticket.setIssuedBy(operator);
        if (remarks != null && !remarks.isBlank()) {
            ticket.setRemarks(remarks);
        }

        // Free the dock
        if (ticket.getAssignedDockId() != null) {
            dockRepository.findById(ticket.getAssignedDockId()).ifPresent(dock -> {
                dock.setStatus(DockStatus.FREE);
                dock.setCurrentTicketId(null);
                dock.setCurrentTicketNumber(null);
                dock.setCurrentVehiclePlate(null);
                dockRepository.save(dock);
                notificationService.broadcastDockStatus(dock);
            });
        }

        Ticket updated = ticketRepository.save(ticket);

        auditService.logEvent(updated.getId(), updated.getTicketNumber(), updated.getAwbNumber(),
                "COMPLETE_ISSUE", oldStatus, updated.getStatus().name(), operator,
                "Yuk to'liq berildi (" + updated.getIssuedPieces() + "/" + updated.getTotalPieces() + " joy). KPP chiqishiga yuborildi.");

        notificationService.broadcastQueueUpdate(updated);
        return updated;
    }

    /**
     * 5.2. Qisman berish (Partial issue with Act/Discrepancy).
     */
    @Transactional
    public Ticket partialIssue(Long ticketId, Integer actualPieces, String reason, String operator) {
        Ticket ticket = getTicket(ticketId);
        String oldStatus = ticket.getStatus().name();

        ticket.setStatus(TicketStatus.PARTIAL_ISSUED);
        ticket.setIssuedPieces(actualPieces);
        ticket.setIssueCompletedAt(LocalDateTime.now());
        ticket.setIssuedBy(operator);
        ticket.setRemarks("QISMAN BERILDI: " + reason);

        // Register Discrepancy
        DiscrepancyReport report = new DiscrepancyReport();
        report.setTicketId(ticket.getId());
        report.setTicketNumber(ticket.getTicketNumber());
        report.setAwbNumber(ticket.getAwbNumber());
        report.setIssueType("PARTIAL_ISSUE");
        report.setTotalPieces(ticket.getTotalPieces());
        report.setActualPieces(actualPieces);
        report.setMissingPieces(ticket.getTotalPieces() - actualPieces);
        report.setReason(reason);
        report.setReportedBy(operator);
        discrepancyReportRepository.save(report);

        // Free dock
        if (ticket.getAssignedDockId() != null) {
            dockRepository.findById(ticket.getAssignedDockId()).ifPresent(dock -> {
                dock.setStatus(DockStatus.FREE);
                dock.setCurrentTicketId(null);
                dock.setCurrentTicketNumber(null);
                dock.setCurrentVehiclePlate(null);
                dockRepository.save(dock);
            });
        }

        Ticket updated = ticketRepository.save(ticket);
        auditService.logEvent(updated.getId(), updated.getTicketNumber(), updated.getAwbNumber(),
                "PARTIAL_ISSUE", oldStatus, updated.getStatus().name(), operator,
                "Qisman berildi: " + actualPieces + " ta joy berildi, " + report.getMissingPieces() + " ta yetishmadi. Sabab: " + reason);

        notificationService.broadcastQueueUpdate(updated);
        return updated;
    }

    /**
     * 5.4 & 4.9. KPP (Oxrana) tekshiruv va Chiqishni tasdiqlash.
     */
    public Ticket scanAtKpp(String barcodeOrTicket) {
        Ticket ticket = findByBarcodeOrNumber(barcodeOrTicket);
        if (ticket.getStatus() != TicketStatus.WAITING_KPP && ticket.getStatus() != TicketStatus.PARTIAL_ISSUED) {
            auditService.logEvent(ticket.getId(), ticket.getTicketNumber(), ticket.getAwbNumber(),
                    "KPP_WARNING", ticket.getStatus().name(), ticket.getStatus().name(), "KPP",
                    "OGOHLANTIRISH: Ushbu talon hali dokdan to'liq berilmagan yoki statusi noto'g'ri!");
        }
        return ticket;
    }

    @Transactional
    public Ticket confirmKppExit(String barcodeOrTicket, String officer, String remarks) {
        Ticket ticket = findByBarcodeOrNumber(barcodeOrTicket);

        if (ticket.getStatus() != TicketStatus.WAITING_KPP && ticket.getStatus() != TicketStatus.PARTIAL_ISSUED) {
            String warn = "KPP Rad etildi: Talon statusi (" + ticket.getStatus().getUzbekName() + ") chiqishga ruxsat bermaydi!";
            auditService.logEvent(ticket.getId(), ticket.getTicketNumber(), ticket.getAwbNumber(),
                    "KPP_EXIT_BLOCKED", ticket.getStatus().name(), ticket.getStatus().name(), officer, warn);
            throw new IllegalStateException(warn);
        }

        String oldStatus = ticket.getStatus().name();
        ticket.setStatus(TicketStatus.CLOSED);
        ticket.setKppCheckedAt(LocalDateTime.now());
        ticket.setClosedAt(LocalDateTime.now());
        ticket.setKppCheckedBy(officer);
        if (remarks != null && !remarks.isBlank()) {
            ticket.setRemarks((ticket.getRemarks() != null ? ticket.getRemarks() + " | " : "") + "KPP: " + remarks);
        }

        Ticket updated = ticketRepository.save(ticket);
        auditService.logEvent(updated.getId(), updated.getTicketNumber(), updated.getAwbNumber(),
                "KPP_EXIT_CONFIRMED", oldStatus, updated.getStatus().name(), officer,
                "Avto va yuk KPP dan muvaffaqiyatli chiqib ketdi. Talon rasman yopildi.");

        notificationService.broadcastQueueUpdate(updated);
        return updated;
    }

    /**
     * Suspend or Cancel
     */
    @Transactional
    public Ticket suspendTicket(Long ticketId, String reason, String operator) {
        Ticket ticket = getTicket(ticketId);
        String old = ticket.getStatus().name();
        ticket.setStatus(TicketStatus.SUSPENDED);
        ticket.setRemarks(reason);

        if (ticket.getAssignedDockId() != null) {
            dockRepository.findById(ticket.getAssignedDockId()).ifPresent(dock -> {
                if (ticket.getId().equals(dock.getCurrentTicketId())) {
                    dock.setStatus(DockStatus.FREE);
                    dock.setCurrentTicketId(null);
                    dock.setCurrentTicketNumber(null);
                    dock.setCurrentVehiclePlate(null);
                    dockRepository.save(dock);
                    notificationService.broadcastDockStatus(dock);
                }
            });
        }

        Ticket updated = ticketRepository.save(ticket);
        auditService.logEvent(updated.getId(), updated.getTicketNumber(), updated.getAwbNumber(),
                "SUSPEND", old, updated.getStatus().name(), operator, "Sabab: " + reason);
        notificationService.broadcastQueueUpdate(updated);
        return updated;
    }

    @Transactional
    public Ticket cancelTicket(Long ticketId, String reason, String operator) {
        Ticket ticket = getTicket(ticketId);
        String old = ticket.getStatus().name();
        ticket.setStatus(TicketStatus.CANCELLED);
        ticket.setRemarks(reason);

        if (ticket.getAssignedDockId() != null) {
            dockRepository.findById(ticket.getAssignedDockId()).ifPresent(dock -> {
                if (ticket.getId().equals(dock.getCurrentTicketId())) {
                    dock.setStatus(DockStatus.FREE);
                    dock.setCurrentTicketId(null);
                    dock.setCurrentTicketNumber(null);
                    dock.setCurrentVehiclePlate(null);
                    dockRepository.save(dock);
                    notificationService.broadcastDockStatus(dock);
                }
            });
        }

        Ticket updated = ticketRepository.save(ticket);
        auditService.logEvent(updated.getId(), updated.getTicketNumber(), updated.getAwbNumber(),
                "CANCEL", old, updated.getStatus().name(), operator, "Sabab: " + reason);
        notificationService.broadcastQueueUpdate(updated);
        return updated;
    }

    // Queries
    public List<Ticket> getActiveQueue() {
        return ticketRepository.findActiveQueue(Arrays.asList(
                TicketStatus.REGISTERED,
                TicketStatus.PREPARATION_PENDING,
                TicketStatus.PREPARING,
                TicketStatus.PREPARED,
                TicketStatus.DOCK_ASSIGNED,
                TicketStatus.CALLED,
                TicketStatus.ARRIVED,
                TicketStatus.ISSUING
        ));
    }

    public List<Ticket> getAllRecentTickets() {
        return ticketRepository.findTop50ByOrderByRegisteredAtDesc();
    }

    public List<Dock> getAllDocks() {
        return dockRepository.findAllByOrderByDockNumberAsc();
    }

    public QueueSummaryDto getSummary() {
        List<Ticket> all = ticketRepository.findAll();
        LocalDateTime today = LocalDate.now().atStartOfDay();

        QueueSummaryDto dto = new QueueSummaryDto();
        dto.setTotalToday(all.stream().filter(t -> t.getRegisteredAt().isAfter(today)).count());
        dto.setWaitingCount(all.stream().filter(t -> t.getStatus() == TicketStatus.PREPARATION_PENDING || t.getStatus() == TicketStatus.REGISTERED).count());
        dto.setPreparingCount(all.stream().filter(t -> t.getStatus() == TicketStatus.PREPARING).count());
        dto.setCalledCount(all.stream().filter(t -> t.getStatus() == TicketStatus.CALLED).count());
        dto.setAtDockCount(all.stream().filter(t -> t.getStatus() == TicketStatus.ARRIVED || t.getStatus() == TicketStatus.ISSUING).count());
        dto.setCompletedToday(all.stream().filter(t -> t.getStatus() == TicketStatus.WAITING_KPP || t.getStatus() == TicketStatus.CLOSED).count());
        dto.setKppExitedToday(all.stream().filter(t -> t.getStatus() == TicketStatus.CLOSED).count());

        Map<String, Long> statusMap = all.stream()
                .collect(Collectors.groupingBy(t -> t.getStatus().name(), Collectors.counting()));
        dto.setStatusCounts(statusMap);

        // Calculate average wait time (minutes)
        double avgWait = all.stream()
                .filter(t -> t.getFirstCalledAt() != null)
                .mapToLong(t -> java.time.Duration.between(t.getRegisteredAt(), t.getFirstCalledAt()).toMinutes())
                .average().orElse(0.0);
        dto.setAvgWaitMinutes(Math.round(avgWait * 10.0) / 10.0);

        return dto;
    }

    public Ticket getTicket(Long id) {
        return ticketRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Talon topilmadi: " + id));
    }

    public Ticket findByBarcodeOrNumber(String token) {
        if (token == null) throw new IllegalArgumentException("Barkod kiritilmagan");
        String clean = token.trim();
        return ticketRepository.findByBarcodeHash(clean)
                .or(() -> ticketRepository.findByTicketNumber(clean))
                .orElseThrow(() -> new IllegalArgumentException("Bunday talon yoki QR-kod topilmadi: " + clean));
    }

    public String generateQrCodeForTicket(Ticket ticket) {
        return qrCodeService.generateQrCodeBase64(ticket.getBarcodeHash(), 220, 220);
    }
}
