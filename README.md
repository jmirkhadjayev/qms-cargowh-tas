# ✈️ Toshkent Xalqaro Aeroporti (TAS Cargo) — Avtomatlashtirilgan Elektron Navbat va Dispetcherlik Tizimi

Ushbu loyiha **Islom Karimov nomidagi Toshkent xalqaro aeroporti yuk terminali** (Департамент грузовых перевозок) uchun import yuklarini berish jarayonini avtomatlashtirish, tirik navbatlarni yo'qotish va **Awery ERP** bilan to'liq integratsiyani ta'minlash maqsadida **Java 21 (Spring Boot 3.3.4)** asosida ishlab chiqilgan.

---

## 🏛 1. Asosiy Bo'g'inlar va Jarayon Zanjiri (TZ bo'yicha)

1. **Ma'muriy Bino (Registratsiya Agenti) — `registration.html`:**
   * AWB kiritilganda **Awery ERP** tizimidan Bojxona ruxsati (*Release Permit*) avtomatik tekshiriladi.
   * **Qat'iy qoida (TZ 1.4 & 3.1):** Agar reliz tasdiqlanmagan bo'lsa, navbatga qo'yish zudlik bilan bloklanadi va hodisa audit jurnaliga yoziladi.
   * Ruxsat tasdiqlanganda, unikal talon raqami (`A-001`, `P-001` imtiyozli) beriladi va **QR-kodli chek/talon** chop etiladi.
2. **Ombor (Sklad Plansheti) — `warehouse.html`:**
   * Ombor xodimi ekranda yangi topshiriqni ko'radi: AWB, saqlash yacheykasi (*Storage Location*), joylar soni, vazni.
   * Yuk topilib dokka chiqarilgach, xodim "Yuk tayyor" (*Prepared*) deb tasdiqlaydi.
   * **TZ 3.3 talabi:** Yuk ombor tomonidan tayyorlanmaguncha, mijozni dokka chaqirish taqiqlanadi!
3. **Yuk Berish Doklari (Dock 1–6) — `dock.html`:**
   * Dok agenti tayyor yuklar orasidan navbatdagisini tanlab, **"Mijozni chaqirish"** tugmasini bosadi.
   * LED tabloda talon raqami va avto raqami yonadi, audio ovozli e'lon yangraydi, mijozga SMS boradi.
   * Mijoz kelgach yuk topshiriladi. Kamomad yoki zarar bo'lsa — **Dalolatnoma (Akt)** tuzilib, qisman beriladi (*Partial Issue*).
4. **Katta LED Tablo Monitor — `led-board.html`:**
   * Kutish zali va doklar ustidagi TV ekranlar uchun mo'ljallangan yuqori kontrastli jonli tablo.
   * **Web Speech Audio Sintezi:** Yangi chaqiruv bo'lganda avtomatik ovozli e'lon yangraydi: *"Diqqat! Talon A-014, Dok raqami 2 ga marhamat!"*
5. **KPP Chiqish Nazorati (Oxrana) — `kpp.html`:**
   * Darvozadagi xavfsizlik xodimi haydovchining QR-kodini skanerlaydi.
   * Tizim yuk dokdan to'liq berilganini tekshiradi va chiqishni tasdiqlaydi (*Exit Confirmed*). Talon yopiladi (*Closed*).

---

## 🚀 2. Tizimni Ishga Tushirish

Loyihani ishga tushirish uchun papkadagi **`start.bat`** faylini bir marta bosish yetarli:
```cmd
start.bat
```
Tizim avtomatik tarzda:
1. Java 21 va Maven sozlamalarini ulaydi;
2. Spring Boot serverini `8080` portda ishga tushiradi;
3. Brauzerda Boshqaruv Markazini (`http://localhost:8080`) ochadi.

---

## 🌐 3. Veb-Portallar Manzillari

* 🏠 **Boshqaruv Markazi (Hub):** [http://localhost:8080](http://localhost:8080)
* 🎫 **Registratsiya Agenti:** [http://localhost:8080/registration.html](http://localhost:8080/registration.html)
* 📦 **Ombor Plansheti:** [http://localhost:8080/warehouse.html](http://localhost:8080/warehouse.html)
* 🚛 **Dok Operatori:** [http://localhost:8080/dock.html](http://localhost:8080/dock.html)
* 📺 **Katta LED Tablo (Ovozli):** [http://localhost:8080/led-board.html](http://localhost:8080/led-board.html)
* 🛡 **KPP Qo'riqlash Punkti:** [http://localhost:8080/kpp.html](http://localhost:8080/kpp.html)
* 📊 **Dispetcherlik & Audit:** [http://localhost:8080/dispatcher.html](http://localhost:8080/dispatcher.html)
* 🔄 **Awery ERP Simulyatori:** [http://localhost:8080/awery-sim.html](http://localhost:8080/awery-sim.html)
* 🗄 **H2 Database Console:** [http://localhost:8080/h2-console](http://localhost:8080/h2-console) (JDBC: `jdbc:h2:file:./data/cargodb`)

---

## 📥 4. Excel Smena Hisoboti Eksporti (TZ 8-bo'lim)
Istalgan vaqtda dispetcherlik panelidan yoki quyidagi havola orqali joriy smena hisobotini `.xlsx` formatida yuklab olish mumkin:
```
GET /api/reports/excel
```
Hisobot o'z ichiga barcha arizalar, haqiqatda berilgan joylar, kutish vaqtlari (daqiqa) va KPI parametrlarini oladi.
