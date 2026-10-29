package uz.airport.cargo.dto;

public class KppConfirmExitRequest {
    private String barcodeOrTicket;
    private String officerName = "KPP_Inspector_1";
    private String remarks;

    public KppConfirmExitRequest() {}

    public String getBarcodeOrTicket() { return barcodeOrTicket; }
    public void setBarcodeOrTicket(String barcodeOrTicket) { this.barcodeOrTicket = barcodeOrTicket; }

    public String getOfficerName() { return officerName; }
    public void setOfficerName(String officerName) { this.officerName = officerName; }

    public String getRemarks() { return remarks; }
    public void setRemarks(String remarks) { this.remarks = remarks; }
}
