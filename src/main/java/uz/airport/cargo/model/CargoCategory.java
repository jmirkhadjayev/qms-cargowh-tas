package uz.airport.cargo.model;

public enum CargoCategory {
    GENERAL("Oddiy yuk (General Cargo)"),
    OVERSIZED("Soverx-gabarit (Oversized)"),
    DANGEROUS("Xavfli yuk (Dangerous Goods - DGR)"),
    PERISHABLE("Tez buziluvchi (Perishable - PER)"),
    VALUABLE("Qimmatbaho yuk (Valuable - VAL)");

    private final String displayName;

    CargoCategory(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
