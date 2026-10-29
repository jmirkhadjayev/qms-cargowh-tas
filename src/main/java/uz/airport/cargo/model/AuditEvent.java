package uz.airport.cargo.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "audit_events", indexes = {
    @Index(name = "idx_audit_ticket_id", columnList = "ticketId"),
    @Index(name = "idx_audit_awb", columnList = "awbNumber"),
    @Index(name = "idx_audit_timestamp", columnList = "timestamp")
})
public class AuditEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long ticketId;
    private String ticketNumber;
    private String awbNumber;

    @Column(nullable = false)
    private String eventType; // "STATUS_CHANGE", "CALL_CLIENT", "PARTIAL_ISSUE", "KPP_EXIT", "DISCREPANCY"

    private String oldStatus;
    private String newStatus;

    private String operatorName; // e.g. "Agent Karimova", "Sklad_Operator_3"
    private String clientVehiclePlate;

    @Column(length = 2000)
    private String details;

    @Column(nullable = false)
    private LocalDateTime timestamp = LocalDateTime.now();

    public AuditEvent() {}

    public AuditEvent(Long ticketId, String ticketNumber, String awbNumber, String eventType,
                      String oldStatus, String newStatus, String operatorName, String details) {
        this.ticketId = ticketId;
        this.ticketNumber = ticketNumber;
        this.awbNumber = awbNumber;
        this.eventType = eventType;
        this.oldStatus = oldStatus;
        this.newStatus = newStatus;
        this.operatorName = operatorName;
        this.details = details;
        this.timestamp = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getTicketId() { return ticketId; }
    public void setTicketId(Long ticketId) { this.ticketId = ticketId; }

    public String getTicketNumber() { return ticketNumber; }
    public void setTicketNumber(String ticketNumber) { this.ticketNumber = ticketNumber; }

    public String getAwbNumber() { return awbNumber; }
    public void setAwbNumber(String awbNumber) { this.awbNumber = awbNumber; }

    public String getEventType() { return eventType; }
    public void setEventType(String eventType) { this.eventType = eventType; }

    public String getOldStatus() { return oldStatus; }
    public void setOldStatus(String oldStatus) { this.oldStatus = oldStatus; }

    public String getNewStatus() { return newStatus; }
    public void setNewStatus(String newStatus) { this.newStatus = newStatus; }

    public String getOperatorName() { return operatorName; }
    public void setOperatorName(String operatorName) { this.operatorName = operatorName; }

    public String getClientVehiclePlate() { return clientVehiclePlate; }
    public void setClientVehiclePlate(String clientVehiclePlate) { this.clientVehiclePlate = clientVehiclePlate; }

    public String getDetails() { return details; }
    public void setDetails(String details) { this.details = details; }

    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
}
