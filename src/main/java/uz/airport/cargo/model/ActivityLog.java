package uz.airport.cargo.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "activity_logs", indexes = {
    @Index(name = "idx_act_timestamp", columnList = "timestamp"),
    @Index(name = "idx_act_entity", columnList = "entityName"),
    @Index(name = "idx_act_action", columnList = "actionCode"),
    @Index(name = "idx_act_user", columnList = "userEmail")
})
public class ActivityLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDateTime timestamp = LocalDateTime.now();

    @Column(nullable = false)
    private String userName;

    @Column(nullable = false)
    private String userEmail;

    /**
     * O'zbekcha matn: "Yaratish", "O'zgartirish", "Yuklab olish", "O'chirish", "Kirish"
     */
    @Column(nullable = false)
    private String action;

    /**
     * Kod: "CREATE", "UPDATE", "DOWNLOAD", "DELETE", "LOGIN"
     */
    @Column(nullable = false)
    private String actionCode;

    /**
     * Masalan: "TechnicalInspection", "Yo'l varaqasi", "Navbat Arizasi", "Xodim / Foydalanuvchi"
     */
    @Column(nullable = false)
    private String entityName;

    /**
     * Obyekt ID raqami: "1", "2", "159", "250-51253053", "A-014" yoki "—"
     */
    private String entityId;

    /**
     * Vergul bilan ajratilgan o'zgargan maydonlar: "result, checklist", "id, type, notes, tonKm, number, +45"
     */
    @Column(length = 1500)
    private String changedFields;

    /**
     * IP manzil: "::ffff:172.18.0.1", "127.0.0.1"
     */
    private String ipAddress;

    /**
     * Qo'shimcha ma'lumotlar / JSON
     */
    @Column(length = 4000)
    private String details;

    public ActivityLog() {}

    public ActivityLog(LocalDateTime timestamp, String userName, String userEmail, String action,
                       String actionCode, String entityName, String entityId, String changedFields,
                       String ipAddress, String details) {
        this.timestamp = timestamp != null ? timestamp : LocalDateTime.now();
        this.userName = userName;
        this.userEmail = userEmail;
        this.action = action;
        this.actionCode = actionCode;
        this.entityName = entityName;
        this.entityId = entityId != null && !entityId.isBlank() ? entityId : "—";
        this.changedFields = changedFields != null ? changedFields : "—";
        this.ipAddress = ipAddress != null && !ipAddress.isBlank() ? ipAddress : "127.0.0.1";
        this.details = details;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }

    public String getUserName() { return userName; }
    public void setUserName(String userName) { this.userName = userName; }

    public String getUserEmail() { return userEmail; }
    public void setUserEmail(String userEmail) { this.userEmail = userEmail; }

    public String getAction() { return action; }
    public void setAction(String action) { this.action = action; }

    public String getActionCode() { return actionCode; }
    public void setActionCode(String actionCode) { this.actionCode = actionCode; }

    public String getEntityName() { return entityName; }
    public void setEntityName(String entityName) { this.entityName = entityName; }

    public String getEntityId() { return entityId; }
    public void setEntityId(String entityId) { this.entityId = entityId; }

    public String getChangedFields() { return changedFields; }
    public void setChangedFields(String changedFields) { this.changedFields = changedFields; }

    public String getIpAddress() { return ipAddress; }
    public void setIpAddress(String ipAddress) { this.ipAddress = ipAddress; }

    public String getDetails() { return details; }
    public void setDetails(String details) { this.details = details; }
}
