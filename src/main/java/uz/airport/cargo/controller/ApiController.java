package uz.airport.cargo.controller;

import jakarta.validation.Valid;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uz.airport.cargo.dto.*;
import uz.airport.cargo.model.*;
import uz.airport.cargo.service.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api")
public class ApiController {

    private final QueueService queueService;
    private final AweryIntegrationService aweryService;
    private final AuditService auditService;
    private final ReportService reportService;

    public ApiController(QueueService queueService,
                         AweryIntegrationService aweryService,
                         AuditService auditService,
                         ReportService reportService) {
        this.queueService = queueService;
        this.aweryService = aweryService;
        this.auditService = auditService;
        this.reportService = reportService;
    }

    // 0. Authentication
    @PostMapping("/auth/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> creds) {
        String username = creds.getOrDefault("username", "").trim().toLowerCase();
        String password = creds.getOrDefault("password", "").trim();

        Map<String, Map<String, String>> users = Map.of(
            "admin", Map.of("username", "admin", "fullName", "Sardor Aliyev", "role", "ADMIN", "roleName", "Bosh Dispetcher (Admin)", "avatar", "👨‍✈️"),
            "agent", Map.of("username", "agent", "fullName", "Nodira Karimova", "role", "AGENT", "roleName", "Registratsiya Agenti", "avatar", "👩‍💼"),
            "sklad", Map.of("username", "sklad", "fullName", "Rustam Mahmudov", "role", "WAREHOUSE", "roleName", "Katta Omborchi", "avatar", "👷‍♂️"),
            "dock", Map.of("username", "dock", "fullName", "Jasur Rahimov", "role", "DOCK_OPERATOR", "roleName", "Dok Operatori (Dock 1)", "avatar", "🚛"),
            "kpp", Map.of("username", "kpp", "fullName", "Farhod Ergashev", "role", "KPP_SECURITY", "roleName", "KPP Nazorat Ofitseri", "avatar", "👮‍♂️")
        );

        if (users.containsKey(username)) {
            // Check password
            boolean valid = (username.equals("admin") && password.equals("admin123")) ||
                            (!username.equals("admin") && (password.equals("tas123") || password.equals("admin123")));
            if (valid) {
                return ResponseEntity.ok(Map.of(
                    "success", true,
                    "token", "TAS-JWT-" + UUID.randomUUID().toString().substring(0, 8),
                    "user", users.get(username)
                ));
            }
        }

        return ResponseEntity.status(401).body(Map.of(
            "success", false,
            "error", "Login yoki parol noto'g'ri (Login/password incorrect)"
        ));
    }

    // 1. Queue Operations
    @PostMapping("/queue/register")
    public ResponseEntity<?> registerTicket(@Valid @RequestBody RegisterTicketRequest request) {
        try {
            Ticket ticket = queueService.registerTicket(request);
            String qr = queueService.generateQrCodeForTicket(ticket);
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "ticket", ticket,
                    "qrCodeBase64", qr
            ));
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "error", e.getMessage()
            ));
        }
    }

    @GetMapping("/queue/active")
    public List<Ticket> getActiveQueue() {
        return queueService.getActiveQueue();
    }

    @GetMapping("/queue/recent")
    public List<Ticket> getRecentTickets() {
        return queueService.getAllRecentTickets();
    }

    @GetMapping("/queue/summary")
    public QueueSummaryDto getSummary() {
        return queueService.getSummary();
    }

    @GetMapping("/queue/ticket/{id}")
    public Ticket getTicket(@PathVariable Long id) {
        return queueService.getTicket(id);
    }

    @GetMapping("/queue/ticket/{id}/qr")
    public Map<String, String> getTicketQr(@PathVariable Long id) {
        Ticket ticket = queueService.getTicket(id);
        String qr = queueService.generateQrCodeForTicket(ticket);
        return Map.of("ticketNumber", ticket.getTicketNumber(), "qrCode", qr);
    }

    // 2. Warehouse operations
    @PostMapping("/queue/prepare/start")
    public Ticket startPreparation(@RequestBody Map<String, Object> body) {
        Long ticketId = Long.valueOf(body.get("ticketId").toString());
        String operator = body.getOrDefault("operator", "Sklad_Operator").toString();
        return queueService.startPreparation(ticketId, operator);
    }

    @PostMapping("/queue/prepare/complete")
    public Ticket completePreparation(@RequestBody Map<String, Object> body) {
        Long ticketId = Long.valueOf(body.get("ticketId").toString());
        String operator = body.getOrDefault("operator", "Sklad_Operator").toString();
        Long preferredDock = body.get("preferredDockId") != null ? Long.valueOf(body.get("preferredDockId").toString()) : null;
        return queueService.completePreparation(ticketId, operator, preferredDock);
    }

    // 3. Dock Operations
    @GetMapping("/docks")
    public List<Dock> getDocks() {
        return queueService.getAllDocks();
    }

    @GetMapping("/queue/dock/{dockId}/eligible")
    public List<Ticket> getEligibleQueueForDock(@PathVariable Long dockId) {
        Dock dock = queueService.findDockByIdOrNumber(dockId);
        return queueService.getEligiblePreparedTicketsForDock(dock);
    }

    @PostMapping("/queue/dock/call")
    public Ticket callClient(@RequestBody CallClientRequest req) {
        if (req.getTicketId() == null) {
            return queueService.callNextClientToDock(req.getDockId(), req.getOperator());
        }
        return queueService.callClientToDock(req.getTicketId(), req.getDockId(), req.getOperator());
    }

    @PostMapping("/queue/dock/call-next")
    public Ticket callNextClient(@RequestBody Map<String, Object> body) {
        Long dockId = Long.valueOf(body.get("dockId").toString());
        String operator = body.getOrDefault("operator", "Dock_Agent_" + dockId).toString();
        return queueService.callNextClientToDock(dockId, operator);
    }

    @PostMapping("/queue/dock/recall")
    public Ticket repeatCall(@RequestBody Map<String, Object> body) {
        Long ticketId = Long.valueOf(body.get("ticketId").toString());
        String operator = body.getOrDefault("operator", "Dock_Agent").toString();
        return queueService.repeatCall(ticketId, operator);
    }

    @PostMapping("/queue/dock/arrived")
    public Ticket markArrived(@RequestBody Map<String, Object> body) {
        Long ticketId = Long.valueOf(body.get("ticketId").toString());
        String operator = body.getOrDefault("operator", "Dock_Agent").toString();
        return queueService.markClientArrived(ticketId, operator);
    }

    @PostMapping("/queue/dock/start-issue")
    public Ticket startIssue(@RequestBody Map<String, Object> body) {
        Long ticketId = Long.valueOf(body.get("ticketId").toString());
        String operator = body.getOrDefault("operator", "Dock_Agent").toString();
        return queueService.startIssuing(ticketId, operator);
    }

    @PostMapping("/queue/dock/complete-issue")
    public Ticket completeIssue(@RequestBody IssueCompletionRequest req) {
        return queueService.completeIssuing(req.getTicketId(), req.getOperator(), req.getRemarks());
    }

    @PostMapping("/queue/dock/partial-issue")
    public Ticket partialIssue(@RequestBody PartialIssueRequest req) {
        return queueService.partialIssue(req.getTicketId(), req.getActualPieces(), req.getReason(), req.getOperator());
    }

    // 4. KPP Operations
    @GetMapping("/kpp/scan")
    public ResponseEntity<?> scanKpp(@RequestParam String token) {
        try {
            Ticket ticket = queueService.scanAtKpp(token);
            boolean canExit = ticket.getStatus() == TicketStatus.WAITING_KPP || ticket.getStatus() == TicketStatus.PARTIAL_ISSUED;
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "canExit", canExit,
                    "ticket", ticket
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "error", e.getMessage()));
        }
    }

    @PostMapping("/kpp/confirm-exit")
    public ResponseEntity<?> confirmExit(@RequestBody KppConfirmExitRequest req) {
        try {
            Ticket ticket = queueService.confirmKppExit(req.getBarcodeOrTicket(), req.getOfficerName(), req.getRemarks());
            return ResponseEntity.ok(Map.of("success", true, "ticket", ticket));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "error", e.getMessage()));
        }
    }

    // 5. Awery ERP Simulator & Lookup
    @GetMapping("/awery/search")
    public List<AweryAwb> searchAwbs(@RequestParam(required = false) String query) {
        return aweryService.searchAwbs(query);
    }

    @GetMapping("/awery/awb/{awbNumber}")
    public ResponseEntity<?> getAwb(@PathVariable String awbNumber) {
        return aweryService.findAwb(awbNumber)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/awery/live/{awbNumber}")
    public Map<String, Object> getLiveTracking(@PathVariable String awbNumber) {
        return aweryService.getLiveTrackingRaw(awbNumber);
    }

    @PostMapping("/awery/awb/{awbNumber}/toggle-permit")
    public ResponseEntity<?> togglePermit(@PathVariable String awbNumber) {
        return aweryService.findAwb(awbNumber).map(awb -> {
            awb.setReleasePermitGranted(!Boolean.TRUE.equals(awb.getReleasePermitGranted()));
            aweryService.saveOrUpdate(awb);
            return ResponseEntity.ok(awb);
        }).orElse(ResponseEntity.notFound().build());
    }

    // 6. Audit logs
    @GetMapping("/audit/recent")
    public List<AuditEvent> getRecentAudit() {
        return auditService.getRecentEvents();
    }

    @GetMapping("/audit/ticket/{id}")
    public List<AuditEvent> getTicketAudit(@PathVariable Long id) {
        return auditService.getTicketEvents(id);
    }

    // 7. Excel Report Export
    @GetMapping("/reports/excel")
    public ResponseEntity<byte[]> downloadExcelReport(@RequestParam(required = false) String from,
                                                      @RequestParam(required = false) String to) {
        try {
            LocalDateTime start = from != null ? LocalDateTime.parse(from) : LocalDateTime.now().minusDays(1).withHour(0).withMinute(0);
            LocalDateTime end = to != null ? LocalDateTime.parse(to) : LocalDateTime.now().plusDays(1).withHour(23).withMinute(59);

            byte[] excelBytes = reportService.generateExcelShiftReport(start, end);

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"TAS_Cargo_Queue_Report.xlsx\"")
                    .contentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                    .body(excelBytes);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @ExceptionHandler({IllegalStateException.class, IllegalArgumentException.class})
    public ResponseEntity<Map<String, Object>> handleBusinessException(RuntimeException ex) {
        return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "error", "QUEUE_VALIDATION_ERROR",
                "message", ex.getMessage() != null ? ex.getMessage() : "Xatolik yuz berdi"
        ));
    }
}
