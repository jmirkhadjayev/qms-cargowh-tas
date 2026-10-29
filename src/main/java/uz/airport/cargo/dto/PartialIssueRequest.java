package uz.airport.cargo.dto;

public class PartialIssueRequest {
    private Long ticketId;
    private Integer actualPieces;
    private String reason;
    private String operator = "Dock_Agent";

    public PartialIssueRequest() {}

    public Long getTicketId() { return ticketId; }
    public void setTicketId(Long ticketId) { this.ticketId = ticketId; }

    public Integer getActualPieces() { return actualPieces; }
    public void setActualPieces(Integer actualPieces) { this.actualPieces = actualPieces; }

    public String getReason() { return reason; }
    public void setReason(String reason) { this.reason = reason; }

    public String getOperator() { return operator; }
    public void setOperator(String operator) { this.operator = operator; }
}
