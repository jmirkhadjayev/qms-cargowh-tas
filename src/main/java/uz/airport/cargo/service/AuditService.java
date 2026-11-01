package uz.airport.cargo.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import uz.airport.cargo.model.AuditEvent;
import uz.airport.cargo.repository.AuditEventRepository;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AuditService {

    private static final Logger log = LoggerFactory.getLogger(AuditService.class);
    private final AuditEventRepository auditEventRepository;
    private final ActivityLogService activityLogService;

    public AuditService(AuditEventRepository auditEventRepository, ActivityLogService activityLogService) {
        this.auditEventRepository = auditEventRepository;
        this.activityLogService = activityLogService;
    }

    @Transactional
    public void logEvent(Long ticketId, String ticketNumber, String awbNumber, String eventType,
                         String oldStatus, String newStatus, String operator, String details) {
        AuditEvent event = new AuditEvent(ticketId, ticketNumber, awbNumber, eventType,
                oldStatus, newStatus, operator, details);
        auditEventRepository.save(event);
        log.info("[AUDIT] {} | AWB: {} | Ticket: {} | {} -> {} | User: {} | {}",
                eventType, awbNumber, ticketNumber, oldStatus, newStatus, operator, details);

        try {
            String action = (eventType != null && eventType.contains("REG")) ? "Yaratish" : "O'zgartirish";
            String changedFields = (oldStatus != null && newStatus != null) ? "status, oldStatus, newStatus" : "ticketNumber, awbNumber, status";
            String opName = (operator != null && !operator.isBlank()) ? operator : "Tizim Operatori";
            String entityId = (awbNumber != null && !awbNumber.isBlank()) ? awbNumber : (ticketNumber != null ? ticketNumber : String.valueOf(ticketId));
            activityLogService.logAction(opName, "operator@uzairports.com", action, "Navbat Arizasi", entityId, changedFields, "127.0.0.1", details);
        } catch (Exception ignored) {}
    }

    public List<AuditEvent> getRecentEvents() {
        return auditEventRepository.findTop100ByOrderByTimestampDesc();
    }

    public List<AuditEvent> getTicketEvents(Long ticketId) {
        return auditEventRepository.findByTicketIdOrderByTimestampAsc(ticketId);
    }

    public List<AuditEvent> getEventsByPeriod(LocalDateTime start, LocalDateTime end) {
        return auditEventRepository.findByTimestampBetweenOrderByTimestampDesc(start, end);
    }
}
