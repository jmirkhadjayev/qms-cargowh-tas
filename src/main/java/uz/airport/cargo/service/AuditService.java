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

    public AuditService(AuditEventRepository auditEventRepository) {
        this.auditEventRepository = auditEventRepository;
    }

    @Transactional
    public void logEvent(Long ticketId, String ticketNumber, String awbNumber, String eventType,
                         String oldStatus, String newStatus, String operator, String details) {
        AuditEvent event = new AuditEvent(ticketId, ticketNumber, awbNumber, eventType,
                oldStatus, newStatus, operator, details);
        auditEventRepository.save(event);
        log.info("[AUDIT] {} | AWB: {} | Ticket: {} | {} -> {} | User: {} | {}",
                eventType, awbNumber, ticketNumber, oldStatus, newStatus, operator, details);
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
