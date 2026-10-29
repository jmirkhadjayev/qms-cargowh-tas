// TAS Cargo SaaS Inventory & Warehouse Management Platform
// Unified Application Framework: Auth Guard, Musemind SaaS Layout, Bilingual i18n, Audio Speech

const i18nDict = {
    uz: {
        appName: "Toshkent Xalqaro Aeroporti",
        appSubtitle: "Yuk Terminali · Elektron Navbat va Dispetcherlik",
        systemActive: "Tizim Faol",
        mainMenu: "Boshqaruv",
        hubTitle: "Dispetcherlik va Boshqaruv Markazi",
        hubDesc: "Import yuklarini berish jarayoni, ombor tayyorgarligi, doklar va KPP nazorat portallari",
        kpiTotal: "Bugungi Jami Arizalar",
        kpiWaiting: "Omborda Kutilmoqda",
        kpiPreparing: "Sklad Yig‘moqda",
        kpiAtDock: "Doklarda Berilmoqda",
        kpiCompleted: "KPP dan Chiqib Ketdi",
        
        // Navigation items
        navDashboard: "Boshqaruv Paneli",
        navRegistration: "Registratsiya Agenti",
        navWarehouse: "Ombor Xodimi (Sklad)",
        navDocks: "Doklar va Rampalar",
        navLed: "Katta LED Tablo TV",
        navKpp: "KPP Chiqish Nazorati",
        navDispatcher: "Dispetcher & Tahlil",
        navAwery: "Awery ERP Integrator",
        
        navSecMain: "ASOSIY MENYU",
        navSecOps: "YUK OPERATSIYALARI",
        navSecSys: "TIZIM VA INTEGRATSIYA",
        
        // Roles & Steps
        step1Title: "1-BOSQICH · MA'MURIY BINO",
        portalRegName: "Registratsiya Agenti",
        portalRegDesc: "Mijoz AWB sini kiritish, CargoUZ Awery ERP orqali Bojxona ruxsatini (Release Permit) tekshirish va QR-kodli elektron talon chop etish.",
        
        step2Title: "2-BOSQICH · OMBOR (SKLAD)",
        portalWhName: "Ombor Xodimi Paneli",
        portalWhDesc: "Elektron yig'uv topshiriqlari: AWB, saqlash yacheykasi, joylar soni. Yukni topib dokka chiqarish va 'Yuk tayyor' deb tasdiqlash.",
        
        step3Title: "3-BOSQICH · YUK BERISH DOKLARI",
        portalDockName: "Dok Operatori (Rampa)",
        portalDockDesc: "Dock 1–6 boshqaruvi: mijozni chaqirish, qabul qilish, berishni boshlash, yakunlash hamda qisman berish (kamomad akti) qayd etish.",
        
        step4Title: "4-BOSQICH · CHIQISH NAZORATI",
        portalKppName: "KPP Qo'riqlash Punkti",
        portalKppDesc: "Darvozada QR-kodni skanerlash, yuk to'liq berilganini va AWB to'g'riligini tekshirish hamda transport vositasi chiqishini tasdiqlash.",
        
        stepLedTitle: "AXBOROT · KUTISH ZALI & DOKLAR",
        portalLedName: "Katta LED Tablo Monitor",
        portalLedDesc: "Katta TV ekranlar uchun mo'ljallangan yuqori kontrastli jonli tablo. Talon raqamlari, avtomobil raqami va avtomatik ovozli e'lon.",
        
        portalAweryName: "Awery ERP / CargoUZ Integratsiyasi",
        portalAweryDesc: "Aeroport yuk tizimi (Awery) bazasi va https://tracking.cargouz.com jonli API integratsiyasi.",
        
        searchPlaceholder: "AWB, talon yoki yuk egasini qidirish...",
        onlineStatus: "CargoUZ Awery Online",
        logout: "Chiqish",
        welcomeBack: "Xush kelibsiz",
        analyticsBtn: "Jonli Tahlil va Hisobotlar",
        excelBtn: "Excel Hisobot Yuklab Olish",
        enter: "Kirish",
        refresh: "Yangilash",
        
        // Form & Fields
        awbNumber: "Avianakladnoy (AWB) Raqami",
        lookupAwery: "CargoUZ / Awery'dan Qidirish",
        consignee: "Yuk Egasi (Consignee)",
        representative: "Oluvchi Vakil (Haydovchi/Ekspeditor)",
        pieces: "Joylar Soni",
        weightKg: "Umumiy Vazn (kg)",
        category: "Kategoriya",
        storageLocation: "Ombordagi Joylashuvi (Yacheyka)",
        vehiclePlate: "Avtomobil Davlat Raqami (UZB / Xalqaro)",
        phone: "SMS-xabarnoma Uchun Telefon",
        priority: "Imtiyozli (Priority)",
        btnSubmitTicket: "Talon Berish va Navbatga Qo'yish",
        recentRegistrations: "Oxirgi Ro'yxatga Olinganlar",
        action: "Amal",
        status: "Holati",
        print: "Chop etish",
        close: "Yopish",
        
        // Statuses
        st_REGISTERED: "Ro'yxatda",
        st_PREPARATION_PENDING: "Kutilmoqda",
        st_PREPARING: "Sklad yig‘moqda",
        st_PREPARED: "Dokka tayyor",
        st_DOCK_ASSIGNED: "Dok tayinlandi",
        st_CALLED: "Chaqirildi!",
        st_ARRIVED: "Yetib keldi",
        st_ISSUING: "Berilmoqda",
        st_ISSUED: "Berildi",
        st_WAITING_KPP: "KPP ga yo'llandi",
        st_PARTIAL_ISSUED: "Qisman berildi",
        st_EXIT_CONFIRMED: "KPP tasdiqlandi",
        st_CLOSED: "Yopildi",
        st_SUSPENDED: "Kechiktirildi",
        st_CANCELLED: "Bekor qilindi"
    },
    ru: {
        appName: "Международный Аэропорт Ташкент",
        appSubtitle: "Грузовой Терминал · Электронная Очередь и Диспетчеризация",
        systemActive: "Система Активна",
        mainMenu: "Панель",
        hubTitle: "Центр Диспетчеризации и Управления",
        hubDesc: "Процесс выдачи импортных грузов, складская подготовка, управление доками и контроль КПП",
        kpiTotal: "Всего Заявок Сегодня",
        kpiWaiting: "Ожидают на Складе",
        kpiPreparing: "Склад Комплектует",
        kpiAtDock: "Выдаются на Доках",
        kpiCompleted: "Выехали через КПП",
        
        // Navigation items
        navDashboard: "Панель Управления",
        navRegistration: "Агент Регистрации",
        navWarehouse: "Грузовой Склад",
        navDocks: "Доки и Рампы",
        navLed: "Большое LED Табло TV",
        navKpp: "Служба Выезда КПП",
        navDispatcher: "Диспетчер & Аналитика",
        navAwery: "Интегратор Awery ERP",
        
        navSecMain: "ГЛАВНОЕ МЕНЮ",
        navSecOps: "ГРУЗОВЫЕ ОПЕРАЦИИ",
        navSecSys: "СИСТЕМА И ИНТЕГРАЦИЯ",
        
        // Roles & Steps
        step1Title: "ЭТАП 1 · АДМИНИСТРАТИВНОЕ ЗДАНИЕ",
        portalRegName: "Агент Регистрации",
        portalRegDesc: "Ввод номера AWB, онлайн-проверка разрешения на выпуск (Release Permit) через CargoUZ Awery и печать электронного талона с QR-кодом.",
        
        step2Title: "ЭТАП 2 · ГРУЗОВОЙ СКЛАД",
        portalWhName: "Планшет Сотрудника Склада",
        portalWhDesc: "Электронные задания: AWB, ячейка хранения, количество мест. Поиск груза, доставка к доку и подтверждение «Груз готов».",
        
        step3Title: "ЭТАП 3 · ДОКИ ВЫДАЧИ ГРУЗА",
        portalDockName: "Оператор Дока (Рампа)",
        portalDockDesc: "Управление Доками 1–6: вызов клиента, прием, выдача груза, завершение и оформление акта при частичной выдаче.",
        
        step4Title: "ЭТАП 4 · КОНТРОЛЬ НА ВЫЕЗДЕ",
        portalKppName: "Контрольно-Пропускной Пункт (КПП)",
        portalKppDesc: "Сканирование QR-кода на шлагбауме, проверка завершения выдачи и подтверждение выезда транспортного средства.",
        
        stepLedTitle: "ИНФО · ЗОНА ОЖИДАНИЯ & ДОКИ",
        portalLedName: "Большое LED Табло Вызова",
        portalLedDesc: "Высококонтрастное табло для больших TV-экранов. Отображение талонов, госномеров и автоматическое голосовое оповещение.",
        
        portalAweryName: "Интеграция с Awery ERP / CargoUZ",
        portalAweryDesc: "База данных грузового комплекса (Awery) и онлайн-интеграция с API https://tracking.cargouz.com.",
        
        searchPlaceholder: "Поиск AWB, талона или грузополучателя...",
        onlineStatus: "CargoUZ Awery Онлайн",
        logout: "Выход",
        welcomeBack: "Добро пожаловать",
        analyticsBtn: "Онлайн Аналитика и Отчёты",
        excelBtn: "Скачать Сменный Отчёт Excel",
        enter: "Войти",
        refresh: "Обновить",
        
        // Form & Fields
        awbNumber: "Номер Авианакладной (AWB)",
        lookupAwery: "Найти в CargoUZ / Awery",
        consignee: "Грузополучатель (Consignee)",
        representative: "Представитель (Водитель/Экспедитор)",
        pieces: "Количество Мест",
        weightKg: "Общий Вес (кг)",
        category: "Категория",
        storageLocation: "Местонахождение на Складе (Ячейка)",
        vehiclePlate: "Госномер Авто (UZB / Международный)",
        phone: "Телефон для SMS-уведомлений",
        priority: "Приоритетный (Priority)",
        btnSubmitTicket: "Выдать Талон и Поставить в Очередь",
        recentRegistrations: "Недавно Зарегистрированные",
        action: "Действие",
        status: "Статус",
        print: "Печать",
        close: "Закрыть",
        
        // Statuses
        st_REGISTERED: "Зарегистрирован",
        st_PREPARATION_PENDING: "Ожидает подготовки",
        st_PREPARING: "Склад готовит",
        st_PREPARED: "Готов у дока",
        st_DOCK_ASSIGNED: "Док назначен",
        st_CALLED: "Вызван!",
        st_ARRIVED: "Прибыл",
        st_ISSUING: "Выдаётся",
        st_ISSUED: "Выдан",
        st_WAITING_KPP: "Направлен на КПП",
        st_PARTIAL_ISSUED: "Выдан частично",
        st_EXIT_CONFIRMED: "Выезд разрешён",
        st_CLOSED: "Закрыт",
        st_SUSPENDED: "Приостановлен",
        st_CANCELLED: "Отменён"
    }
};

let currentLang = localStorage.getItem('tas_cargo_lang') || 'uz';

// Neo-Classic Theme: Pure Clean Light Only (Tun rejimi yo'q)
document.documentElement.removeAttribute('data-theme');
localStorage.removeItem('tas_cargo_theme');

function initTheme() {
    document.documentElement.removeAttribute('data-theme');
}

function toggleTheme() {
    // No-op: Tun rejimi o'chirilgan (Neo-classic light style)
}

function updateThemeUI() {
    // No-op
}

initTheme();

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('tas_cargo_lang', lang);
    applyTranslations();
    updateThemeUI();
}

function t(key) {
    const dict = i18nDict[currentLang] || i18nDict.uz;
    return dict[key] || key;
}

function applyTranslations() {
    // Translate textContent
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (i18nDict[currentLang] && i18nDict[currentLang][key]) {
            el.textContent = i18nDict[currentLang][key];
        }
    });

    // Translate Placeholders
    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
        const key = el.getAttribute('data-i18n-ph');
        if (i18nDict[currentLang] && i18nDict[currentLang][key]) {
            el.setAttribute('placeholder', i18nDict[currentLang][key]);
        }
    });

    // Update Language Toggle buttons
    document.querySelectorAll('.lang-btn-saas, #langUzBtn, #langRuBtn').forEach(btn => {
        const isUz = btn.id.includes('Uz') || btn.textContent.includes('UZ');
        if ((currentLang === 'uz' && isUz) || (currentLang === 'ru' && !isUz)) {
            btn.classList.add('active');
            btn.style.background = 'rgba(56, 189, 248, 0.25)';
            btn.style.color = '#38bdf8';
        } else {
            btn.classList.remove('active');
            btn.style.background = 'transparent';
            btn.style.color = '#94a3b8';
        }
    });
}

// ==========================================================================
// AUTHENTICATION GUARD & USER SESSION
// ==========================================================================

function getCurrentUser() {
    try {
        const raw = localStorage.getItem('tas_cargo_user');
        if (raw) return JSON.parse(raw);
    } catch(e) {}
    return null;
}

function checkAuthGuard() {
    const currentPath = window.location.pathname.toLowerCase();
    const isLoginPage = currentPath.endsWith('login.html');
    const isLedPage = currentPath.endsWith('led-board.html'); // TV display can bypass
    const user = getCurrentUser();

    if (!user && !isLoginPage && !isLedPage) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

function logout() {
    localStorage.removeItem('tas_cargo_user');
    localStorage.removeItem('tas_cargo_token');
    showToast(currentLang === 'ru' ? 'Вы вышли из системы' : 'Tizimdan muvaffaqiyatli chiqildi', 'info');
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 400);
}

// ==========================================================================
// DYNAMIC MUSEMIND SAAS LAYOUT INJECTION
// ==========================================================================

function getCurrentPageFile() {
    const p = window.location.pathname.split('/').pop().toLowerCase();
    return p || 'index.html';
}

function setupSaasLayout() {
    const currentFile = getCurrentPageFile();
    if (currentFile === 'login.html' || currentFile === 'led-board.html') {
        return; // Skip login & standalone LED board
    }

    const user = getCurrentUser() || {
        username: 'admin',
        fullName: 'Sardor Aliyev',
        role: 'ADMIN',
        roleName: 'Bosh Dispetcher',
        avatar: 'SA'
    };

    // If already wrapped in .saas-layout, do not re-wrap
    if (document.querySelector('.saas-sidebar')) {
        updateActiveSidebarLink(currentFile);
        return;
    }

    // Capture existing header and main content
    const existingHeader = document.querySelector('.app-header');
    if (existingHeader) existingHeader.style.display = 'none';

    const existingMain = document.querySelector('.main-content') || document.body;

    // Create SaaS Wrapper
    const wrapper = document.createElement('div');
    wrapper.className = 'saas-layout';

    // Sidebar HTML (Tashkent Airport Logo + Crisp SVG Icons)
    const sidebarHtml = `
        <aside class="saas-sidebar" id="saasSidebar">
            <div class="saas-brand">
                <a href="index.html" class="saas-brand-link" title="Tashkent International Airport Cargo">
                    <img src="images/tashkent-airport-logo.svg" alt="Tashkent Airport" class="brand-logo-img">
                    <img src="images/tashkent-airport-emblem.svg" alt="Tashkent Airport" class="brand-emblem-collapsed">
                </a>
                <button class="sidebar-toggle-btn" onclick="toggleSidebarCollapse()" title="Sidebar">
                    <svg class="icon-svg icon-svg-sm" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>
                </button>
            </div>

            <div class="saas-nav-container">
                <div class="nav-section-title" data-i18n="navSecMain">ASOSIY MENYU</div>

                <a href="index.html" class="saas-nav-item ${currentFile === 'index.html' ? 'active' : ''}" id="nav_index">
                    <span class="nav-icon"><svg class="icon-svg icon-svg-md" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/></svg></span>
                    <span class="nav-text" data-i18n="navDashboard">Boshqaruv Paneli</span>
                </a>

                <a href="registration.html" class="saas-nav-item ${currentFile === 'registration.html' ? 'active' : ''}" id="nav_reg">
                    <span class="nav-icon"><svg class="icon-svg icon-svg-md" viewBox="0 0 24 24"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"/><path d="M13 5v2"/><path d="M13 11v2"/><path d="M13 17v2"/></svg></span>
                    <span class="nav-text" data-i18n="navRegistration">Registratsiya Agenti</span>
                    <span class="nav-badge live">AWB</span>
                </a>

                <a href="warehouse.html" class="saas-nav-item ${currentFile === 'warehouse.html' ? 'active' : ''}" id="nav_wh">
                    <span class="nav-icon"><svg class="icon-svg icon-svg-md" viewBox="0 0 24 24"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg></span>
                    <span class="nav-text" data-i18n="navWarehouse">Ombor (Sklad)</span>
                </a>

                <a href="dock.html" class="saas-nav-item ${currentFile === 'dock.html' ? 'active' : ''}" id="nav_dock">
                    <span class="nav-icon"><svg class="icon-svg icon-svg-md" viewBox="0 0 24 24"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg></span>
                    <span class="nav-text" data-i18n="navDocks">Doklar va Rampalar</span>
                    <span class="nav-badge">1–6</span>
                </a>

                <div class="nav-section-title" data-i18n="navSecOps">YUK OPERATSIYALARI</div>

                <a href="led-board.html" target="_blank" class="saas-nav-item" id="nav_led">
                    <span class="nav-icon"><svg class="icon-svg icon-svg-md" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg></span>
                    <span class="nav-text" data-i18n="navLed">Katta LED Tablo TV</span>
                    <span class="nav-badge live">Jonli</span>
                </a>

                <a href="kpp.html" class="saas-nav-item ${currentFile === 'kpp.html' ? 'active' : ''}" id="nav_kpp">
                    <span class="nav-icon"><svg class="icon-svg icon-svg-md" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg></span>
                    <span class="nav-text" data-i18n="navKpp">KPP Chiqish Nazorati</span>
                </a>

                <div class="nav-section-title" data-i18n="navSecSys">TIZIM VA INTEGRATSIYA</div>

                <a href="dispatcher.html" class="saas-nav-item ${currentFile === 'dispatcher.html' ? 'active' : ''}" id="nav_disp">
                    <span class="nav-icon"><svg class="icon-svg icon-svg-md" viewBox="0 0 24 24"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg></span>
                    <span class="nav-text" data-i18n="navDispatcher">Dispetcher & Tahlil</span>
                </a>

                <a href="awery-sim.html" class="saas-nav-item ${currentFile === 'awery-sim.html' ? 'active' : ''}" id="nav_awery">
                    <span class="nav-icon"><svg class="icon-svg icon-svg-md" viewBox="0 0 24 24"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg></span>
                    <span class="nav-text" data-i18n="navAwery">Awery ERP Integrator</span>
                </a>
            </div>

            <div class="saas-sidebar-footer">
                <div class="saas-user-card">
                    <div class="user-avatar-wrap">
                        <svg class="icon-svg" style="color:var(--primary); width:15px; height:15px;" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                        <span class="user-status-dot"></span>
                    </div>
                    <div class="user-details">
                        <span class="user-name-txt">${user.fullName || 'Admin'}</span>
                        <span class="user-role-txt">${user.roleName || 'Bosh Dispetcher'}</span>
                    </div>
                    <button class="btn-sidebar-logout" onclick="logout()" title="Chiqish / Выход">
                        <svg class="icon-svg" style="width:14px; height:14px;" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                    </button>
                </div>
            </div>
        </aside>
    `;

    // Topbar HTML (Clean Vector Icons & Text Language Badges)
    const topbarHtml = `
        <header class="saas-topbar">
            <div class="topbar-left">
                <button class="sidebar-toggle-btn" onclick="toggleSidebarCollapse()" title="Menyuni ochish/yopish">
                    <svg class="icon-svg icon-svg-md" viewBox="0 0 24 24"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
                </button>
                <div class="topbar-page-info">
                    <div class="topbar-breadcrumbs">TASHKENT AIRPORT &bull; CARGO LOGISTICS HUB</div>
                    <div class="topbar-page-title" id="pageDynamicTitle">${getPageName(currentFile)}</div>
                </div>
            </div>

            <!-- Global Search -->
            <div class="saas-search-box">
                <svg class="icon-svg icon-svg-sm search-icon-left" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                <input type="text" class="saas-search-input" id="globalAwbSearch" data-i18n-ph="searchPlaceholder" placeholder="AWB, talon yoki yuk egasini qidirish..." onkeydown="handleGlobalSearch(event)">
                <span class="search-shortcut-badge">Ctrl K</span>
            </div>

            <!-- Topbar Tools -->
            <div class="topbar-right">
                <div class="live-badge-tool">
                    <span class="pulse-dot"></span>
                    <span data-i18n="onlineStatus">CargoUZ Awery Online</span>
                </div>

                <div class="topbar-clock" id="liveClock">17:50:00 (Toshkent)</div>

                <!-- Airport Audio Chime Button -->
                <button class="btn-airport-chime" onclick="triggerAirportChimeTest()" title="Aeroport audio e'loni sinovi (Chime)">
                    <svg class="icon-svg icon-svg-sm" viewBox="0 0 24 24"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
                    <span>Chime</span>
                </button>

                <div class="lang-toggle-saas">
                    <button class="lang-btn-saas ${currentLang === 'uz' ? 'active' : ''}" onclick="setLanguage('uz')">UZ</button>
                    <button class="lang-btn-saas ${currentLang === 'ru' ? 'active' : ''}" onclick="setLanguage('ru')">RU</button>
                </div>

                <div class="user-avatar-wrap" style="cursor:pointer;" onclick="window.location.href='index.html'" title="${user.fullName}">
                    <svg class="icon-svg" style="color:var(--primary); width:16px; height:16px;" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </div>
            </div>
        </header>
    `;

    // Assemble structure
    const mainSection = document.createElement('main');
    mainSection.className = 'saas-main';
    mainSection.innerHTML = topbarHtml;

    const contentSection = document.createElement('div');
    contentSection.className = 'saas-content';

    // Move existing body children (except scripts & our wrapper) into contentSection
    const childrenToMove = Array.from(document.body.children);
    childrenToMove.forEach(child => {
        if (child.tagName !== 'SCRIPT' && child !== wrapper && !child.classList.contains('app-header')) {
            contentSection.appendChild(child);
        }
    });

    mainSection.appendChild(contentSection);

    wrapper.innerHTML = sidebarHtml;
    wrapper.appendChild(mainSection);

    document.body.prepend(wrapper);

    // Keyboard shortcut for search (Ctrl+K or Cmd+K)
    window.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            const searchInput = document.getElementById('globalAwbSearch');
            if (searchInput) searchInput.focus();
        }
    });

    applyTranslations();
    updateThemeUI();
}

function getPageName(file) {
    const names = {
        'index.html': 'Boshqaruv Paneli (Dashboard)',
        'registration.html': 'Registratsiya Agenti (1-Bosqich)',
        'warehouse.html': 'Ombor Xodimi Paneli (2-Bosqich)',
        'dock.html': 'Yuk Berish Doklari (3-Bosqich)',
        'kpp.html': 'KPP Chiqish Nazorati (4-Bosqich)',
        'dispatcher.html': 'Dispetcherlik va Jonli Hisobotlar',
        'awery-sim.html': 'Awery ERP / CargoUZ Simulyatori'
    };
    return names[file] || 'TAS Cargo Terminal';
}

function toggleSidebarCollapse() {
    const sb = document.getElementById('saasSidebar');
    if (!sb) return;
    if (window.innerWidth <= 768) {
        sb.classList.toggle('mobile-open');
    } else {
        sb.classList.toggle('collapsed');
        const icon = document.getElementById('collapseIcon');
        if (icon) {
            icon.textContent = sb.classList.contains('collapsed') ? '▶' : '◀';
        }
    }
}

function updateActiveSidebarLink(file) {
    document.querySelectorAll('.saas-nav-item').forEach(item => {
        const href = item.getAttribute('href');
        if (href === file) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

function handleGlobalSearch(e) {
    if (e.key === 'Enter') {
        const query = e.target.value.trim();
        if (query) {
            // If it looks like an AWB, redirect to registration or dispatcher
            window.location.href = `registration.html?search=${encodeURIComponent(query)}`;
        }
    }
}

// ==========================================================================
// LIVE CLOCK & NOTIFICATIONS
// ==========================================================================

function initClock() {
    const clockEl = document.getElementById('liveClock');
    if (!clockEl) return;
    function update() {
        const now = new Date();
        const city = currentLang === 'ru' ? 'Ташкент' : 'Toshkent';
        clockEl.textContent = now.toLocaleTimeString('uz-UZ', { hour12: false }) + ` (${city})`;
    }
    setInterval(update, 1000);
    update();
}

function showToast(message, type = 'info') {
    let container = document.getElementById('toastContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toastContainer';
        container.style.cssText = 'position:fixed;bottom:24px;right:24px;z-index:9999;display:flex;flex-direction:column;gap:10px;';
        document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    const bg = type === 'success' ? '#059669' : type === 'error' ? '#dc2626' : '#0284c7';
    toast.style.cssText = `background:${bg};color:#fff;padding:10px 18px;border-radius:10px;font-family:inherit;font-size:0.82rem;font-weight:600;box-shadow:0 8px 20px rgba(0,0,0,0.25);display:flex;align-items:center;gap:8px;animation:slideIn 0.3s ease;border:1px solid rgba(255,255,255,0.2);`;
    const iconSvg = type === 'success' 
        ? '<svg class="icon-svg" style="width:16px;height:16px;stroke:#fff;" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>'
        : type === 'error'
        ? '<svg class="icon-svg" style="width:16px;height:16px;stroke:#fff;" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>'
        : '<svg class="icon-svg" style="width:16px;height:16px;stroke:#fff;" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>';
    toast.innerHTML = `<span>${iconSvg}</span> <span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.4s ease';
        setTimeout(() => toast.remove(), 400);
    }, 4000);
}

// Realistic Web Audio API Airport Public Address Chime Synthesizer (554Hz -> 440Hz C#5-A4)
function playAirportChime() {
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        const ctx = new AudioContext();
        const now = ctx.currentTime;

        // Tone 1: C#5 (554.37 Hz)
        const osc1 = ctx.createOscillator();
        const gain1 = ctx.createGain();
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(554.37, now);
        gain1.gain.setValueAtTime(0.25, now);
        gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.55);
        osc1.connect(gain1);
        gain1.connect(ctx.destination);
        osc1.start(now);
        osc1.stop(now + 0.55);

        // Tone 2: A4 (440.0 Hz)
        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(440.0, now + 0.32);
        gain2.gain.setValueAtTime(0.3, now + 0.32);
        gain2.gain.exponentialRampToValueAtTime(0.001, now + 1.1);
        osc2.connect(gain2);
        gain2.connect(ctx.destination);
        osc2.start(now + 0.32);
        osc2.stop(now + 1.1);
    } catch (e) {
        console.warn('Airport chime error:', e);
    }
}

function triggerAirportChimeTest() {
    playAirportChime();
    setTimeout(() => {
        playVoiceCall('A-101', '3');
    }, 650);
    const msg = currentLang === 'ru' 
        ? "Оповещение аэропорта: Талон А-101, Док 3" 
        : "Aeroport audio e'loni: Talon A-101, Dok 3";
    showToast(msg, 'info');
}

// Audio Speech Announcement (Bilingual Web Speech API with airport chime)
function playVoiceCall(ticketNumber, dockNumber) {
    playAirportChime();

    setTimeout(() => {
        if (!('speechSynthesis' in window)) return;
        try {
            let text = '';
            let lang = 'uz-UZ';
            if (currentLang === 'ru') {
                text = `Внимание! Талон ${ticketNumber.replace('-', ' ')}, пройдите к Доку номер ${dockNumber}.`;
                lang = 'ru-RU';
            } else {
                text = `Diqqat! Talon ${ticketNumber.replace('-', ' ')}, Dok raqami ${dockNumber} ga marhamat.`;
                lang = 'uz-UZ';
            }
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 0.92;
            utterance.pitch = 1.0;
            utterance.lang = lang;
            window.speechSynthesis.speak(utterance);
        } catch (e) {
            console.warn('Speech synthesis error:', e);
        }
    }, 650);
}

// Status badge generator (Localized)
function getStatusBadge(status) {
    const textKey = 'st_' + status;
    const localizedText = (i18nDict[currentLang] && i18nDict[currentLang][textKey]) ? i18nDict[currentLang][textKey] : status;

    const classMap = {
        'REGISTERED': 'badge-registered',
        'PREPARATION_PENDING': 'badge-registered',
        'PREPARING': 'badge-preparing',
        'PREPARED': 'badge-prepared',
        'DOCK_ASSIGNED': 'badge-prepared',
        'CALLED': 'badge-called',
        'ARRIVED': 'badge-arrived',
        'ISSUING': 'badge-issuing',
        'ISSUED': 'badge-closed',
        'WAITING_KPP': 'badge-waiting_kpp',
        'PARTIAL_ISSUED': 'badge-warning',
        'EXIT_CONFIRMED': 'badge-closed',
        'CLOSED': 'badge-closed',
        'SUSPENDED': 'badge-warning',
        'CANCELLED': 'badge-danger'
    };

    const cls = classMap[status] || 'badge-registered';
    return `<span class="badge ${cls}">${localizedText}</span>`;
}

// Auto-run on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    if (checkAuthGuard()) {
        setupSaasLayout();
        initClock();
        applyTranslations();
        updateThemeUI();
    }
});
