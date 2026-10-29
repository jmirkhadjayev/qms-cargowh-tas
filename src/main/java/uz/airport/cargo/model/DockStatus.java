package uz.airport.cargo.model;

public enum DockStatus {
    FREE("Bo'sh"),
    OCCUPIED("Band (Xizmat ko'rsatilmoqda)"),
    MAINTENANCE("Ta'mirda"),
    RESERVED("Zaxiralangan (Maxsus yuk uchun)");

    private final String description;

    DockStatus(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}
