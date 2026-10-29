package uz.airport.cargo.model;

import jakarta.persistence.*;

@Entity
@Table(name = "docks")
public class Dock {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private Integer dockNumber; // 1, 2, 3, 4, 5, 6

    @Column(nullable = false)
    private String name; // e.g. "Dock 1 - Rampa A"

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DockStatus status = DockStatus.FREE;

    private Long currentTicketId;
    private String currentTicketNumber;
    private String currentVehiclePlate;

    private String supportedCategories; // Comma-separated: "GENERAL,PERISHABLE,OVERSIZED"

    public Dock() {}

    public Dock(Integer dockNumber, String name, String supportedCategories) {
        this.dockNumber = dockNumber;
        this.name = name;
        this.supportedCategories = supportedCategories;
        this.status = DockStatus.FREE;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Integer getDockNumber() { return dockNumber; }
    public void setDockNumber(Integer dockNumber) { this.dockNumber = dockNumber; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public DockStatus getStatus() { return status; }
    public void setStatus(DockStatus status) { this.status = status; }

    public Long getCurrentTicketId() { return currentTicketId; }
    public void setCurrentTicketId(Long currentTicketId) { this.currentTicketId = currentTicketId; }

    public String getCurrentTicketNumber() { return currentTicketNumber; }
    public void setCurrentTicketNumber(String currentTicketNumber) { this.currentTicketNumber = currentTicketNumber; }

    public String getCurrentVehiclePlate() { return currentVehiclePlate; }
    public void setCurrentVehiclePlate(String currentVehiclePlate) { this.currentVehiclePlate = currentVehiclePlate; }

    public String getSupportedCategories() { return supportedCategories; }
    public void setSupportedCategories(String supportedCategories) { this.supportedCategories = supportedCategories; }
}
