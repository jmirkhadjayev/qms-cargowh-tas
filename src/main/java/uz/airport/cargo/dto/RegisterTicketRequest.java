package uz.airport.cargo.dto;

import jakarta.validation.constraints.NotBlank;
import uz.airport.cargo.model.CargoCategory;

public class RegisterTicketRequest {

    @NotBlank(message = "AWB raqami kiritilishi shart")
    private String awbNumber;

    private String consigneeName;
    private String representativeName;
    private Integer pieces;
    private Double weightKg;
    private CargoCategory category = CargoCategory.GENERAL;
    private String vehiclePlate;
    private String contactPhone;
    private String storageLocation;
    private String registeredBy = "Agent_Kassa_1";
    private Boolean isPriority = false;

    public RegisterTicketRequest() {}

    // Getters and Setters
    public String getAwbNumber() { return awbNumber; }
    public void setAwbNumber(String awbNumber) { this.awbNumber = awbNumber; }

    public String getConsigneeName() { return consigneeName; }
    public void setConsigneeName(String consigneeName) { this.consigneeName = consigneeName; }

    public String getRepresentativeName() { return representativeName; }
    public void setRepresentativeName(String representativeName) { this.representativeName = representativeName; }

    public Integer getPieces() { return pieces; }
    public void setPieces(Integer pieces) { this.pieces = pieces; }

    public Double getWeightKg() { return weightKg; }
    public void setWeightKg(Double weightKg) { this.weightKg = weightKg; }

    public CargoCategory getCategory() { return category; }
    public void setCategory(CargoCategory category) { this.category = category; }

    public String getVehiclePlate() { return vehiclePlate; }
    public void setVehiclePlate(String vehiclePlate) { this.vehiclePlate = vehiclePlate; }

    public String getContactPhone() { return contactPhone; }
    public void setContactPhone(String contactPhone) { this.contactPhone = contactPhone; }

    public String getStorageLocation() { return storageLocation; }
    public void setStorageLocation(String storageLocation) { this.storageLocation = storageLocation; }

    public String getRegisteredBy() { return registeredBy; }
    public void setRegisteredBy(String registeredBy) { this.registeredBy = registeredBy; }

    public Boolean getIsPriority() { return isPriority; }
    public void setIsPriority(Boolean priority) { isPriority = priority; }
}
