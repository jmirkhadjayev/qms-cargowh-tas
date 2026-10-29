package uz.airport.cargo.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "tickets", indexes = {
    @Index(name = "idx_ticket_number", columnList = "ticketNumber"),
    @Index(name = "idx_awb_number", columnList = "awbNumber"),
    @Index(name = "idx_status", columnList = "status"),
    @Index(name = "idx_registered_at", columnList = "registeredAt")
})
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 20)
    private String ticketNumber; // e.g., "A-012" or "P-005" (priority)

    @Column(nullable = false, length = 30)
    private String awbNumber; // e.g. "250-84729104"

    @Column(nullable = false, length = 150)
    private String consigneeName; // e.g. "OOO 'Silk Road Logistics'"

    private String representativeName; // e.g. "Aliyev Vali"

    @Column(nullable = false)
    private Integer totalPieces;

    @Column(nullable = false)
    private Integer issuedPieces = 0;

    @Column(nullable = false)
    private Double totalWeightKg;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CargoCategory category = CargoCategory.GENERAL;

    private String storageLocation; // e.g., "Sklad 1, Seksiya C, Yacheyka 14"

    private String vehiclePlate; // e.g., "01 A 777 AA"
    private String contactPhone; // e.g., "+998 90 123 45 67"

    @Column(nullable = false)
    private Boolean releasePermitVerified = false; // MUST be true to register!

    private String releasePermitNumber; // Customs clearance / release ID
    private String releasePermitSource; // e.g. "AWERY_ERP" or "CUSTOMS_API"

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TicketStatus status = TicketStatus.REGISTERED;

    private Long assignedDockId;
    private Integer assignedDockNumber;

    @Column(nullable = false)
    private Integer callCount = 0;

    private Boolean isPriority = false;

    // Timestamps for SLA & KPI analytics
    @Column(nullable = false)
    private LocalDateTime registeredAt = LocalDateTime.now();
    private LocalDateTime preparationStartedAt;
    private LocalDateTime preparedAt;
    private LocalDateTime firstCalledAt;
    private LocalDateTime lastCalledAt;
    private LocalDateTime arrivedAtDockAt;
    private LocalDateTime issueStartedAt;
    private LocalDateTime issueCompletedAt;
    private LocalDateTime kppCheckedAt;
    private LocalDateTime closedAt;

    // Operators
    private String registeredBy;
    private String preparedBy;
    private String issuedBy;
    private String kppCheckedBy;

    @Column(length = 1000)
    private String remarks;

    @Column(length = 500)
    private String barcodeHash; // Token for QR Code generation & KPP scanning

    public Ticket() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTicketNumber() { return ticketNumber; }
    public void setTicketNumber(String ticketNumber) { this.ticketNumber = ticketNumber; }

    public String getAwbNumber() { return awbNumber; }
    public void setAwbNumber(String awbNumber) { this.awbNumber = awbNumber; }

    public String getConsigneeName() { return consigneeName; }
    public void setConsigneeName(String consigneeName) { this.consigneeName = consigneeName; }

    public String getRepresentativeName() { return representativeName; }
    public void setRepresentativeName(String representativeName) { this.representativeName = representativeName; }

    public Integer getTotalPieces() { return totalPieces; }
    public void setTotalPieces(Integer totalPieces) { this.totalPieces = totalPieces; }

    public Integer getIssuedPieces() { return issuedPieces; }
    public void setIssuedPieces(Integer issuedPieces) { this.issuedPieces = issuedPieces; }

    public Double getTotalWeightKg() { return totalWeightKg; }
    public void setTotalWeightKg(Double totalWeightKg) { this.totalWeightKg = totalWeightKg; }

    public CargoCategory getCategory() { return category; }
    public void setCategory(CargoCategory category) { this.category = category; }

    public String getStorageLocation() { return storageLocation; }
    public void setStorageLocation(String storageLocation) { this.storageLocation = storageLocation; }

    public String getVehiclePlate() { return vehiclePlate; }
    public void setVehiclePlate(String vehiclePlate) { this.vehiclePlate = vehiclePlate; }

    public String getContactPhone() { return contactPhone; }
    public void setContactPhone(String contactPhone) { this.contactPhone = contactPhone; }

    public Boolean getReleasePermitVerified() { return releasePermitVerified; }
    public void setReleasePermitVerified(Boolean releasePermitVerified) { this.releasePermitVerified = releasePermitVerified; }

    public String getReleasePermitNumber() { return releasePermitNumber; }
    public void setReleasePermitNumber(String releasePermitNumber) { this.releasePermitNumber = releasePermitNumber; }

    public String getReleasePermitSource() { return releasePermitSource; }
    public void setReleasePermitSource(String releasePermitSource) { this.releasePermitSource = releasePermitSource; }

    public TicketStatus getStatus() { return status; }
    public void setStatus(TicketStatus status) { this.status = status; }

    public Long getAssignedDockId() { return assignedDockId; }
    public void setAssignedDockId(Long assignedDockId) { this.assignedDockId = assignedDockId; }

    public Integer getAssignedDockNumber() { return assignedDockNumber; }
    public void setAssignedDockNumber(Integer assignedDockNumber) { this.assignedDockNumber = assignedDockNumber; }

    public Integer getCallCount() { return callCount; }
    public void setCallCount(Integer callCount) { this.callCount = callCount; }

    public Boolean getIsPriority() { return isPriority; }
    public void setIsPriority(Boolean priority) { isPriority = priority; }

    public LocalDateTime getRegisteredAt() { return registeredAt; }
    public void setRegisteredAt(LocalDateTime registeredAt) { this.registeredAt = registeredAt; }

    public LocalDateTime getPreparationStartedAt() { return preparationStartedAt; }
    public void setPreparationStartedAt(LocalDateTime preparationStartedAt) { this.preparationStartedAt = preparationStartedAt; }

    public LocalDateTime getPreparedAt() { return preparedAt; }
    public void setPreparedAt(LocalDateTime preparedAt) { this.preparedAt = preparedAt; }

    public LocalDateTime getFirstCalledAt() { return firstCalledAt; }
    public void setFirstCalledAt(LocalDateTime firstCalledAt) { this.firstCalledAt = firstCalledAt; }

    public LocalDateTime getLastCalledAt() { return lastCalledAt; }
    public void setLastCalledAt(LocalDateTime lastCalledAt) { this.lastCalledAt = lastCalledAt; }

    public LocalDateTime getArrivedAtDockAt() { return arrivedAtDockAt; }
    public void setArrivedAtDockAt(LocalDateTime arrivedAtDockAt) { this.arrivedAtDockAt = arrivedAtDockAt; }

    public LocalDateTime getIssueStartedAt() { return issueStartedAt; }
    public void setIssueStartedAt(LocalDateTime issueStartedAt) { this.issueStartedAt = issueStartedAt; }

    public LocalDateTime getIssueCompletedAt() { return issueCompletedAt; }
    public void setIssueCompletedAt(LocalDateTime issueCompletedAt) { this.issueCompletedAt = issueCompletedAt; }

    public LocalDateTime getKppCheckedAt() { return kppCheckedAt; }
    public void setKppCheckedAt(LocalDateTime kppCheckedAt) { this.kppCheckedAt = kppCheckedAt; }

    public LocalDateTime getClosedAt() { return closedAt; }
    public void setClosedAt(LocalDateTime closedAt) { this.closedAt = closedAt; }

    public String getRegisteredBy() { return registeredBy; }
    public void setRegisteredBy(String registeredBy) { this.registeredBy = registeredBy; }

    public String getPreparedBy() { return preparedBy; }
    public void setPreparedBy(String preparedBy) { this.preparedBy = preparedBy; }

    public String getIssuedBy() { return issuedBy; }
    public void setIssuedBy(String issuedBy) { this.issuedBy = issuedBy; }

    public String getKppCheckedBy() { return kppCheckedBy; }
    public void setKppCheckedBy(String kppCheckedBy) { this.kppCheckedBy = kppCheckedBy; }

    public String getRemarks() { return remarks; }
    public void setRemarks(String remarks) { this.remarks = remarks; }

    public String getBarcodeHash() { return barcodeHash; }
    public void setBarcodeHash(String barcodeHash) { this.barcodeHash = barcodeHash; }
}
