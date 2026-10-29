package uz.airport.cargo.dto;

public class CallClientRequest {
    private Long ticketId;
    private Long dockId;
    private String operator = "Dock_Agent_1";

    public CallClientRequest() {}

    public Long getTicketId() { return ticketId; }
    public void setTicketId(Long ticketId) { this.ticketId = ticketId; }

    public Long getDockId() { return dockId; }
    public void setDockId(Long dockId) { this.dockId = dockId; }

    public String getOperator() { return operator; }
    public void setOperator(String operator) { this.operator = operator; }
}
