package uz.airport.cargo.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import uz.airport.cargo.model.*;
import uz.airport.cargo.repository.AweryAwbRepository;
import uz.airport.cargo.repository.DockRepository;
import uz.airport.cargo.repository.UserRepository;

@Component
public class DataInitializer implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DataInitializer.class);

    private final DockRepository dockRepository;
    private final AweryAwbRepository aweryAwbRepository;
    private final UserRepository userRepository;
    private final uz.airport.cargo.repository.ActivityLogRepository activityLogRepository;

    public DataInitializer(DockRepository dockRepository,
                           AweryAwbRepository aweryAwbRepository,
                           UserRepository userRepository,
                           uz.airport.cargo.repository.ActivityLogRepository activityLogRepository) {
        this.dockRepository = dockRepository;
        this.aweryAwbRepository = aweryAwbRepository;
        this.userRepository = userRepository;
        this.activityLogRepository = activityLogRepository;
    }

    @Override
    public void run(String... args) {
        initDocks();
        initAweryAwbs();
        initUsers();
        initActivityLogs();
    }

    private void initUsers() {
        log.info("Tizim foydalanuvchilari va rollari tekshirilmoqda...");

        // 1. SuperAdmin accounts
        createOrUpdateUser("supperadmin@uzairports.com", "admin123", "Bosh Tizim Administratori",
                UserRole.SUPER_ADMIN, "index.html", "SUP");
        createOrUpdateUser("superadmin@uzairports.com", "admin123", "Bosh Tizim Administratori (Alias)",
                UserRole.SUPER_ADMIN, "index.html", "SUP");

        // 2. Admin / Dispatcher
        createOrUpdateUser("admin@uzairports.com", "admin123", "Sardor Aliyev (Bosh Dispetcher)",
                UserRole.ADMIN, "dispatcher.html", "ADM");

        // 3. Operator: Registration
        createOrUpdateUser("registration@uzairports.com", "tas123", "Nodira Karimova (Registratsiya)",
                UserRole.OPERATOR_REGISTRATION, "registration.html", "REG");

        // 4. Operator: Warehouse
        createOrUpdateUser("warehouse@uzairports.com", "tas123", "Rustam Mahmudov (Katta Omborchi)",
                UserRole.OPERATOR_WAREHOUSE, "warehouse.html", "WHS");

        // 5. Operator: Dock
        createOrUpdateUser("dock@uzairports.com", "tas123", "Jasur Rahimov (Dok Operatori)",
                UserRole.OPERATOR_DOCK, "dock.html", "DCK");

        // 6. Operator: KPP Checkpoint
        createOrUpdateUser("kpp@uzairports.com", "tas123", "Farhod Ergashev (KPP Ofitseri)",
                UserRole.OPERATOR_KPP, "kpp.html", "KPP");

        log.info("Barcha xizmat hisoblari (SuperAdmin, Admin, Registratsiya, Ombor, Dok, KPP) muvaffaqiyatli saqlandi.");
    }

    private void createOrUpdateUser(String email, String password, String fullName, UserRole role, String targetUrl, String avatar) {
        User user = userRepository.findByEmailIgnoreCase(email).orElse(new User());
        user.setEmail(email.toLowerCase().trim());
        user.setPassword(password);
        user.setFullName(fullName);
        user.setRole(role);
        user.setTargetUrl(targetUrl);
        user.setAvatar(avatar);
        user.setActive(true);
        if (user.getAllowedPages() == null || user.getAllowedPages().isBlank()) {
            user.setAllowedPageList(User.getDefaultPagesForRole(role));
        }
        userRepository.save(user);
    }

    private void initDocks() {
        log.info("Doklar konfiguratsiyasi universal holatga keltirilmoqda (Dock 1 - 6)...");
        for (int i = 1; i <= 6; i++) {
            final int dockNum = i;
            Dock dock = dockRepository.findAll().stream()
                    .filter(d -> d.getDockNumber() != null && d.getDockNumber() == dockNum)
                    .findFirst()
                    .orElse(new Dock(dockNum, "Dock " + dockNum + " (Universal)", "ALL"));
            dock.setName("Dock " + dockNum + " (Universal)");
            dock.setSupportedCategories("ALL");
            dockRepository.save(dock);
        }
        log.info("Barcha 6 ta dok xamma toifadagi yuklarga (Universal) muvaffaqiyatli moslashtirildi.");
    }

    private void initAweryAwbs() {
        if (aweryAwbRepository.count() == 0) {
            log.info("Awery ERP integratsiyasi uchun namunaviy AWB ma'lumotlari kiritilmoqda...");

            // 1. Release GRANTED - General cargo
            aweryAwbRepository.save(new AweryAwb(
                    "250-84920183", "OOO 'Silk Road Logistics'", "HY-532 (Istanbul)",
                    18, 420.5, CargoCategory.GENERAL,
                    "Sklad 1, Rampa A, Yacheyka 14-B",
                    true, "CC-2026-99120", "To'qimachilik mahsulotlari va uskunalar"
            ));

            // 2. Release GRANTED - Perishable (Priority)
            aweryAwbRepository.save(new AweryAwb(
                    "250-99210482", "FE 'Green Oasis Express'", "TK-368 (Frankfurt)",
                    6, 115.0, CargoCategory.PERISHABLE,
                    "Sklad 2, Sovutgich kamera #3",
                    true, "CC-2026-99121", "Dori-darmon va vaksinalar (+2...+8 C)"
            ));

            // 3. Release GRANTED - Oversized
            aweryAwbRepository.save(new AweryAwb(
                    "250-77182901", "AO 'O'zavtosanoat'", "C6-880 (Seul)",
                    2, 1850.0, CargoCategory.OVERSIZED,
                    "Ochiq maydon, Rampa 3, Yacheyka OS-02",
                    true, "CC-2026-99122", "Avtomobil yig'uv press qoliplari"
            ));

            // 4. Release GRANTED - Valuable
            aweryAwbRepository.save(new AweryAwb(
                    "250-33019284", "OOO 'Asia High-Tech Group'", "EK-204 (Dubay)",
                    4, 38.0, CargoCategory.VALUABLE,
                    "Maxsus seyf xonasi VAL-1",
                    true, "CC-2026-99123", "Elektron mikrosxemalar va server chiplari"
            ));

            // 5. Release NOT GRANTED (Customs hold)
            aweryAwbRepository.save(new AweryAwb(
                    "250-66491028", "OOO 'Global Trade Tashkent'", "HY-274 (Pekin)",
                    12, 340.0, CargoCategory.GENERAL,
                    "Sklad 1, Seksiya D, Yacheyka 08",
                    false, "KUTILMOQDA (Bojxona tekshiruvida)", "Xo'jalik mollari (Bojxona rasmiylashtiruvi tugallanmagan)"
            ));

            // 6. Release GRANTED - Dangerous Goods (DGR)
            aweryAwbRepository.save(new AweryAwb(
                    "250-55102938", "MChJ 'ChimPharm Sanoat'", "LH-642 (Myunxen)",
                    8, 95.0, CargoCategory.DANGEROUS,
                    "Sklad 3, Maxsus DGR xonasi",
                    true, "CC-2026-99125", "Kimyoviy reagentlar (Class 3 Flammable)"
            ));

            log.info("Awery ERP AWB namunalari muvaffaqiyatli saqlandi.");
        }
    }

    private void initActivityLogs() {
        if (activityLogRepository.count() == 0) {
            log.info("Amallar jurnali (Activity Log) namunaviy yozuvlari kiritilmoqda...");

            java.util.List<uz.airport.cargo.model.ActivityLog> logs = new java.util.ArrayList<>();

            // 1. Exact records from user's screenshot
            logs.add(new uz.airport.cargo.model.ActivityLog(
                    java.time.LocalDateTime.of(2026, 10, 28, 10, 8, 47),
                    "Anvarbek A. Jurayev", "a.jurayev@fleetcore.uz",
                    "Yaratish", "CREATE", "TechnicalInspection", "2",
                    "result, checklist", "::ffff:172.18.0.1",
                    "Avtotransport texnik ko'rigi muvaffaqiyatli o'tkazildi va tasdiqlandi"
            ));

            logs.add(new uz.airport.cargo.model.ActivityLog(
                    java.time.LocalDateTime.of(2026, 10, 23, 19, 26, 25),
                    "Admin", "admin@fleetcore.uz",
                    "O'zgartirish", "UPDATE", "Yo'l varaqasi", "1",
                    "id, type, notes, tonKm, number, +45", "::ffff:172.18.0.1",
                    "Yuk tashish yo'l varaqasi rekvizitlari yangilandi"
            ));

            logs.add(new uz.airport.cargo.model.ActivityLog(
                    java.time.LocalDateTime.of(2026, 10, 23, 19, 22, 52),
                    "Admin", "admin@fleetcore.uz",
                    "Yuklab olish", "DOWNLOAD", "Jadvalni yuklab olish", "—",
                    "path, rows, table, format", "::ffff:172.18.0.1",
                    "Smenalik amallar hisoboti Excel formatida yuklab olindi (124 qator)"
            ));

            logs.add(new uz.airport.cargo.model.ActivityLog(
                    java.time.LocalDateTime.of(2026, 10, 23, 14, 37, 21),
                    "Admin", "admin@fleetcore.uz",
                    "Yaratish", "CREATE", "EmployeeDocumentType", "1",
                    "name", "::ffff:172.18.0.1",
                    "Yangi xodim hujjati shabloni ro'yxatga olindi"
            ));

            logs.add(new uz.airport.cargo.model.ActivityLog(
                    java.time.LocalDateTime.of(2026, 10, 23, 9, 39, 10),
                    "Jamshidbek D. Mirkhadjayev", "j.mirkhadjayev@fleetcore.uz",
                    "Yuklab olish", "DOWNLOAD", "Yo'l varaqasi", "1",
                    "—", "::ffff:172.18.0.1",
                    "Tasdiqlangan elektron yo'l varaqasi PDF nusxasi yuklab olindi"
            ));

            logs.add(new uz.airport.cargo.model.ActivityLog(
                    java.time.LocalDateTime.of(2026, 10, 22, 13, 28, 8),
                    "Admin", "admin@fleetcore.uz",
                    "O'zgartirish", "UPDATE", "Yo'l varaqasi", "1",
                    "conditionOnIssue, overrideEligibility", "::ffff:172.18.0.1",
                    "Maxsus yuk berish shartlari va ruxsatnomasi qayta ko'rib chiqildi"
            ));

            logs.add(new uz.airport.cargo.model.ActivityLog(
                    java.time.LocalDateTime.of(2026, 10, 22, 13, 27, 49),
                    "Admin", "admin@fleetcore.uz",
                    "Yaratish", "CREATE", "Yo'l varaqasi", "1",
                    "type, tasks, validTo, driverId, validFrom, +2", "::ffff:172.18.0.1",
                    "Dastlabki yo'l varaqasi tizimga kiritildi"
            ));

            logs.add(new uz.airport.cargo.model.ActivityLog(
                    java.time.LocalDateTime.of(2026, 10, 22, 13, 27, 23),
                    "Admin", "admin@fleetcore.uz",
                    "Yaratish", "CREATE", "TechnicalInspection", "1",
                    "result, checklist", "::ffff:172.18.0.1",
                    "Texnik nazorat kartasi tekshiruvdan o'tkazildi"
            ));

            logs.add(new uz.airport.cargo.model.ActivityLog(
                    java.time.LocalDateTime.of(2026, 10, 22, 13, 27, 14),
                    "Admin", "admin@fleetcore.uz",
                    "Yaratish", "CREATE", "Tibbiy ko'rik", "1",
                    "pulse, result, checkedAt, isPreTrip, temperature, +1", "::ffff:172.18.0.1",
                    "Haydovchilar smena oldi tibbiy nazorat ko'rigi qaydnomasi"
            ));

            logs.add(new uz.airport.cargo.model.ActivityLog(
                    java.time.LocalDateTime.of(2026, 10, 22, 13, 26, 12),
                    "Admin", "admin@fleetcore.uz",
                    "Yuklab olish", "DOWNLOAD", "Jadvalni yuklab olish", "—",
                    "path, rows, table, format", "::ffff:172.18.0.1",
                    "Umumiy monitoring jadvali eksport qilindi"
            ));

            logs.add(new uz.airport.cargo.model.ActivityLog(
                    java.time.LocalDateTime.of(2026, 10, 22, 13, 24, 58),
                    "Admin", "admin@fleetcore.uz",
                    "O'zgartirish", "UPDATE", "Organization", "3",
                    "—", "::ffff:172.18.0.1",
                    "Tashkilot rekvizitlariga tuzatish kiritildi"
            ));

            logs.add(new uz.airport.cargo.model.ActivityLog(
                    java.time.LocalDateTime.of(2026, 10, 22, 13, 22, 51),
                    "Admin", "admin@fleetcore.uz",
                    "Yaratish", "CREATE", "Ofis", "159",
                    "code, kind, nameEn, nameRu, nameUz, +11", "::ffff:172.18.0.1",
                    "Yangi bojxona brokerlik ofisi ma'lumotlar bazasiga qo'shildi"
            ));

            logs.add(new uz.airport.cargo.model.ActivityLog(
                    java.time.LocalDateTime.of(2026, 10, 22, 13, 20, 57),
                    "Admin", "admin@fleetcore.uz",
                    "Yaratish", "CREATE", "Organization", "3",
                    "code, nameEn, nameRu, nameUz, taskLayout, +1", "::ffff:172.18.0.1",
                    "Logistika hamkori 'Silk Road Logistics' tashkiloti kiritildi"
            ));

            // 2. Cargo Queue specific operational records
            logs.add(new uz.airport.cargo.model.ActivityLog(
                    java.time.LocalDateTime.now().minusMinutes(12),
                    "Bosh Tizim Administratori", "supperadmin@uzairports.com",
                    "O'zgartirish", "UPDATE", "Xodim Ruxsatnomalari", "4",
                    "allowedPages, targetUrl, role", "::ffff:172.18.0.1",
                    "Registratsiya xodimi (Nodira Karimova) uchun Ombor (warehouse.html) ruxsati berildi"
            ));

            logs.add(new uz.airport.cargo.model.ActivityLog(
                    java.time.LocalDateTime.now().minusMinutes(25),
                    "Nodira Karimova", "registration@uzairports.com",
                    "Yaratish", "CREATE", "Navbat Arizasi", "250-84920183",
                    "ticketNumber, awbNumber, cargoCategory, vehiclePlate", "192.168.1.102",
                    "Yangi navbat taloni berildi: A-014 (Silk Road Logistics, 18 joy, 420.5 kg)"
            ));

            logs.add(new uz.airport.cargo.model.ActivityLog(
                    java.time.LocalDateTime.now().minusMinutes(20),
                    "Rustam Mahmudov", "warehouse@uzairports.com",
                    "O'zgartirish", "UPDATE", "Ombor (Sklad)", "A-014",
                    "status, warehouseLocation, packageCount", "192.168.1.104",
                    "Yuk yacheyka 14-B dan yig'ilib dok maydonchasiga yetkazildi (Yuk Tayyor)"
            ));

            logs.add(new uz.airport.cargo.model.ActivityLog(
                    java.time.LocalDateTime.now().minusMinutes(15),
                    "Jasur Rahimov", "dock@uzairports.com",
                    "O'zgartirish", "UPDATE", "Dok (Rampa 1)", "A-014",
                    "status, dockNumber, calledAt", "192.168.1.108",
                    "Mijoz Rampa 1 ga chaqirildi va yuk topshirish jarayoni boshlandi"
            ));

            logs.add(new uz.airport.cargo.model.ActivityLog(
                    java.time.LocalDateTime.now().minusMinutes(8),
                    "Farhod Ergashev", "kpp@uzairports.com",
                    "O'zgartirish", "UPDATE", "KPP Chiqish Nazorati", "A-014",
                    "status, kppExitTime, securityOfficer", "192.168.1.112",
                    "Darvozada transport vositasi (01 A 777 AA) nazorati tasdiqlanib hududdan chiqarildi"
            ));

            logs.add(new uz.airport.cargo.model.ActivityLog(
                    java.time.LocalDateTime.now().minusMinutes(3),
                    "Sardor Aliyev", "admin@uzairports.com",
                    "Yuklab olish", "DOWNLOAD", "Jadvalni yuklab olish", "—",
                    "path, rows, table, format", "192.168.1.101",
                    "Yuk berish dispetcherlik hisoboti Excel formatida yuklab olindi"
            ));

            activityLogRepository.saveAll(logs);
            log.info("Amallar jurnali muvaffaqiyatli to'ldirildi: {} ta yozuv kiritildi.", logs.size());
        }
    }
}

