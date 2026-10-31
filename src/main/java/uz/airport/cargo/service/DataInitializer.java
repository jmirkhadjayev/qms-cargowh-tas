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

    public DataInitializer(DockRepository dockRepository,
                           AweryAwbRepository aweryAwbRepository,
                           UserRepository userRepository) {
        this.dockRepository = dockRepository;
        this.aweryAwbRepository = aweryAwbRepository;
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) {
        initDocks();
        initAweryAwbs();
        initUsers();
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
}
