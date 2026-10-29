package uz.airport.cargo.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "awery_awbs", indexes = {
    @Index(name = "idx_awery_awb_number", columnList = "awbNumber", unique = true)
})
public class AweryAwb {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 30)
    private String awbNumber; // e.g., "250-10928374"

    @Column(nullable = false)
    private String consignee; // Cargo receiver

    private String flightNumber; // e.g., "HY-532"
    private LocalDateTime arrivalDate;

    private Integer pieces;
    private Double weightKg;

    @Enumerated(EnumType.STRING)
    private CargoCategory category = CargoCategory.GENERAL;

    private String warehouseLocation; // e.g., "Sklad 1, Rampa-B, Yacheyka 12-A"

    @Column(nullable = false)
    private Boolean releasePermitGranted = true; // Customs release status

    private String customsDeclarationNumber; // e.g. "CC-2026-991823"
    private String cargoDescription; // e.g. "Elektronika ehtiyot qismlari"
    private Boolean terminalFeesPaid = true; // Terminal storage fee paid

    public AweryAwb() {}

    public AweryAwb(String awbNumber, String consignee, String flightNumber, Integer pieces,
                    Double weightKg, CargoCategory category, String warehouseLocation,
                    Boolean releasePermitGranted, String customsDeclarationNumber, String cargoDescription) {
        this.awbNumber = awbNumber;
        this.consignee = consignee;
        this.flightNumber = flightNumber;
        this.pieces = pieces;
        this.weightKg = weightKg;
        this.category = category;
        this.warehouseLocation = warehouseLocation;
        this.releasePermitGranted = releasePermitGranted;
        this.customsDeclarationNumber = customsDeclarationNumber;
        this.cargoDescription = cargoDescription;
        this.arrivalDate = LocalDateTime.now().minusDays(1);
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getAwbNumber() { return awbNumber; }
    public void setAwbNumber(String awbNumber) { this.awbNumber = awbNumber; }

    public String getConsignee() { return consignee; }
    public void setConsignee(String consignee) { this.consignee = consignee; }

    public String getFlightNumber() { return flightNumber; }
    public void setFlightNumber(String flightNumber) { this.flightNumber = flightNumber; }

    public LocalDateTime getArrivalDate() { return arrivalDate; }
    public void setArrivalDate(LocalDateTime arrivalDate) { this.arrivalDate = arrivalDate; }

    public Integer getPieces() { return pieces; }
    public void setPieces(Integer pieces) { this.pieces = pieces; }

    public Double getWeightKg() { return weightKg; }
    public void setWeightKg(Double weightKg) { this.weightKg = weightKg; }

    public CargoCategory getCategory() { return category; }
    public void setCategory(CargoCategory category) { this.category = category; }

    public String getWarehouseLocation() { return warehouseLocation; }
    public void setWarehouseLocation(String warehouseLocation) { this.warehouseLocation = warehouseLocation; }

    public Boolean getReleasePermitGranted() { return releasePermitGranted; }
    public void setReleasePermitGranted(Boolean releasePermitGranted) { this.releasePermitGranted = releasePermitGranted; }

    public String getCustomsDeclarationNumber() { return customsDeclarationNumber; }
    public void setCustomsDeclarationNumber(String customsDeclarationNumber) { this.customsDeclarationNumber = customsDeclarationNumber; }

    public String getCargoDescription() { return cargoDescription; }
    public void setCargoDescription(String cargoDescription) { this.cargoDescription = cargoDescription; }

    public Boolean getTerminalFeesPaid() { return terminalFeesPaid; }
    public void setTerminalFeesPaid(Boolean terminalFeesPaid) { this.terminalFeesPaid = terminalFeesPaid; }
}
