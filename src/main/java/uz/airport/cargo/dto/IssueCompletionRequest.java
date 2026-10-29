package uz.airport.cargo.dto;

public class IssueCompletionRequest {
    private Long ticketId;
    private String operator = "Dock_Agent";
    private String remarks;

    public IssueCompletionRequest() {}

    public Long getTicketId() { return ticketId; }
    public void setTicketId(Long ticketId) { this.ticketId = ticketId; }

    public String getOperator() { return operator; }
    public void setOperator(String operator) { this.operator = operator; }

    public String getRemarks() { return remarks; }
    public void setRemarks(String remarks) { this.remarks = remarks; }
}
