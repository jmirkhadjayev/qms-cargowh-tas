package uz.airport.cargo.model;

public enum TicketStatus {
    REGISTERED("Ro'yxatdan o'tdi", "Зарегистрирован"),
    PREPARATION_PENDING("Kutishda (Omborga topshirildi)", "Ожидает подготовки"),
    PREPARING("Sklad tayyorlamoqda", "Подготовка начата"),
    PREPARED("Yuk tayyorlandi (Dokka yetkazildi)", "Груз подготовлен"),
    DOCK_ASSIGNED("Dok tayinlandi", "Док назначен"),
    CALLED("Mijoz dokka chaqirildi", "Клиент вызван"),
    ARRIVED("Mijoz dokka yetib keldi", "Клиент прибыл"),
    ISSUING("Yuk berish boshlandi", "Выдача начата"),
    ISSUED("Yuk to'liq topshirildi", "Выдача завершена"),
    PARTIAL_ISSUED("Qisman berildi (Akt bilan)", "Выдан частично"),
    WAITING_KPP("KPP tekshiruvini kutmoqda", "Ожидает подтверждения на КПП"),
    EXIT_CONFIRMED("KPP dan chiqish tasdiqlandi", "Выезд подтверждён"),
    CLOSED("Talon yopildi", "Закрыт"),
    SUSPENDED("To'xtatildi / Kechiktirildi", "Приостановлен"),
    CANCELLED("Bekor qilindi", "Отменён");

    private final String uzbekName;
    private final String russianName;

    TicketStatus(String uzbekName, String russianName) {
        this.uzbekName = uzbekName;
        this.russianName = russianName;
    }

    public String getUzbekName() {
        return uzbekName;
    }

    public String getRussianName() {
        return russianName;
    }
}
