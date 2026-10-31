package uz.airport.cargo.model;

public enum UserRole {
    SUPER_ADMIN("Super Administrator", "Barcha huquqlar, to'liq tizim va foydalanuvchilar"),
    ADMIN("Bosh Dispetcher (Admin)", "Dispetcherlik paneli, jonli tahlil va Excel hisobotlar"),
    OPERATOR_REGISTRATION("Registratsiya Xodimi", "Faqat yangi mijozlar va AWB larni ro'yxatga olish"),
    OPERATOR_WAREHOUSE("Ombor Xodimi (Sklad)", "Faqat ombordagi yig'uv topshiriqlari"),
    OPERATOR_DOCK("Dok Operatori (Rampa)", "Faqat dokga mijoz chaqirish va yuklash"),
    OPERATOR_KPP("KPP Nazorat Xodimi", "Faqat darvoza chiqishi va QR-kod tekshiruvi");

    private final String title;
    private final String description;

    UserRole(String title, String description) {
        this.title = title;
        this.description = description;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }
}

