package uz.airport.cargo.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "discrepancies")
public class DiscrepancyReport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long ticketId;

    private String ticketNumber;
    private String awbNumber;

    @Column(nullable = false)
    private String issueType; // "PARTIAL_ISSUE", "DAMAGED", "SHORTAGE", "KPP_MISMATCH", "CARGO_NOT_FOUND"

    private Integer totalPieces;
    private Integer actualPieces;
    private Integer missingPieces;

    @Column(length = 2000)
    private String reason;

    private String reportedBy;
    private LocalDateTime reportedAt = LocalDateTime.now();

    private Boolean resolved = false;
    private String resolvedBy;
    private LocalDateTime resolvedAt;

    public DiscrepancyReport() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getTicketId() { return ticketId; }
    public void setTicketId(Long ticketId) { this.ticketId = ticketId; }

    public String getTicketNumber() { return ticketNumber; }
    public void setTicketNumber(String ticketNumber) { this.ticketNumber = ticketNumber; }

    public String getAwbNumber() { return awbNumber; }
    public void setAwbNumber(String awbNumber) { this.awbNumber = awbNumber; }

    public String getIssueType() { return issueType; }
    public void setIssueType(String issueType) { this.issueType = issueType; }

    public Integer getTotalPieces() { return totalPieces; }
    public void setTotalPieces(Integer totalPieces) { this.totalPieces = totalPieces; }

    public Integer getActualPieces() { return actualPieces; }
    public void setActualPieces(Integer actualPieces) { this.actualPieces = actualPieces; }

    public Integer getMissingPieces() { return missingPieces; }
    public void setMissingPieces(Integer missingPieces) { this.missingPieces = missingPieces; }

    public String getReason() { return reason; }
    public void setReason(String reason) { this.reason = reason; }

    public String getReportedBy() { return reportedBy; }
    public void setReportedBy(String reportedBy) { this.reportedBy = reportedBy; }

    public LocalDateTime getReportedAt() { return reportedAt; }
    public void setReportedAt(LocalDateTime reportedAt) { this.reportedAt = reportedAt; }

    public Boolean getResolved() { return resolved; }
    public void setResolved(Boolean resolved) { this.resolved = resolved; }

    public String getResolvedBy() { return resolvedBy; }
    public void setResolvedBy(String resolvedBy) { this.resolvedBy = resolvedBy; }

    public LocalDateTime getResolvedAt() { return resolvedAt; }
    public void setResolvedAt(LocalDateTime resolvedAt) { this.resolvedAt = resolvedAt; }
}
