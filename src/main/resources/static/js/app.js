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
    // No-op: Tun rejimi o'chirilgan
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
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (i18nDict[currentLang] && i18nDict[currentLang][key]) {
            el.textContent = i18nDict[currentLang][key];
        }
    });

    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
        const key = el.getAttribute('data-i18n-ph');
        if (i18nDict[currentLang] && i18nDict[currentLang][key]) {
            el.setAttribute('placeholder', i18nDict[currentLang][key]);
        }
    });

    document.querySelectorAll('.lang-btn-saas, #langUzBtn, #langRuBtn').forEach(btn => {
        const isUz = btn.id.includes('Uz') || btn.textContent.includes('UZ');
        if ((currentLang === 'uz' && isUz) || (currentLang === 'ru' && !isUz)) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// ==========================================================================
// ROLE CONFIGURATION & STRICT ROLE-BASED ACCESS CONTROL (RBAC)
// ==========================================================================

const ROLE_CONFIG = {
    'SUPER_ADMIN': {
        title: 'Super Administrator',
        home: 'index.html',
        allowed: ['index.html', 'dispatcher.html', 'registration.html', 'warehouse.html', 'dock.html', 'kpp.html', 'led-board.html', 'awery-sim.html', 'activity-log.html']
    },
    'ADMIN': {
        title: 'Bosh Dispetcher',
        home: 'dispatcher.html',
        allowed: ['dispatcher.html', 'dock.html', 'led-board.html']
    },
    'OPERATOR_REGISTRATION': {
        title: 'Registratsiya Agenti',
        home: 'registration.html',
        allowed: ['registration.html']
    },
    'OPERATOR_WAREHOUSE': {
        title: 'Ombor Xodimi (Sklad)',
        home: 'warehouse.html',
        allowed: ['warehouse.html']
    },
    'OPERATOR_DOCK': {
        title: 'Dok Operatori (Rampa)',
        home: 'dock.html',
        allowed: ['dock.html']
    },
    'OPERATOR_KPP': {
        title: 'KPP Nazorat Xodimi',
        home: 'kpp.html',
        allowed: ['kpp.html']
    }
};

function getCurrentUser() {
    try {
        const raw = localStorage.getItem('tas_cargo_user');
        if (raw) return JSON.parse(raw);
    } catch(e) {}
    return null;
}

function getCurrentPageFile() {
    const p = window.location.pathname.split('/').pop().toLowerCase();
    return p || 'index.html';
}

function checkAuthGuard() {
    const currentPath = window.location.pathname.toLowerCase();
    const currentFile = getCurrentPageFile();
    const isLoginPage = currentFile === 'login.html';
    const isLedPage = currentFile === 'led-board.html'; // Standalone TV display

    if (isLoginPage || isLedPage) {
        return true;
    }

    const user = getCurrentUser();

    if (!user) {
        if (document.documentElement) document.documentElement.style.display = 'none';
        window.location.replace('login.html');
        return false;
    }

    const role = user.role;
    const config = ROLE_CONFIG[role];

    // SuperAdmin has full access to every screen
    if (role === 'SUPER_ADMIN') {
        return true;
    }

    if (!config) {
        console.warn(`[RBAC] Noma'lum rol: ${role}. Login sahifasiga qaytarilmoqda.`);
        if (document.documentElement) document.documentElement.style.display = 'none';
        window.location.replace('login.html');
        return false;
    }

    // Effective allowed pages: user's custom permissions set by SuperAdmin take priority over role default!
    const effectiveAllowed = (user.allowedPages && user.allowedPages.length > 0)
        ? user.allowedPages
        : config.allowed;

    const effectiveHome = user.targetUrl || config.home;

    // Strict validation: is current page in allowed list?
    if (!effectiveAllowed.includes(currentFile)) {
        console.warn(`[RBAC] Ruxsat cheklangan! Foydalanuvchi: ${user.email || user.username} (${role}) ushbu oynaga (${currentFile}) kira olmaydi. O'z ish stansiyasiga (${effectiveHome}) yo'naltirilmoqda.`);
        if (document.documentElement) document.documentElement.style.display = 'none';
        window.location.replace(effectiveHome);
        return false;
    }

    return true;
}

// Immediate synchronous check at script execution
checkAuthGuard();

// Synchronize session permissions from server in background
async function syncUserPermissionsWithServer() {
    const user = getCurrentUser();
    if (!user || !user.email) return;
    try {
        const res = await fetch(`/api/auth/me?email=${encodeURIComponent(user.email)}`);
        if (res.ok) {
            const freshUser = await res.json();
            if (freshUser) {
                user.allowedPages = freshUser.allowedPages;
                user.targetUrl = freshUser.targetUrl;
                user.role = freshUser.role;
                user.roleTitle = freshUser.roleTitle;
                user.active = freshUser.active;
                localStorage.setItem('tas_cargo_user', JSON.stringify(user));
            }
        }
    } catch(e) {}
}
syncUserPermissionsWithServer();

function logout() {
    localStorage.removeItem('tas_cargo_user');
    localStorage.removeItem('tas_cargo_token');
    showToast(currentLang === 'ru' ? 'Вы вышли из системы' : 'Tizimdan muvaffaqiyatli chiqildi', 'info');
    setTimeout(() => {
        window.location.replace('login.html');
    }, 400);
}

// ==========================================================================
// DYNAMIC ROLE-BASED SAAS LAYOUT INJECTION
// ==========================================================================

const ALL_MODULES = [
    { file: 'index.html', title: 'Boshqaruv Paneli (Hub)', icon: '<rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/>', badge: 'Admin', section: 'ASOSIY BOSHQARUV' },
    { file: 'activity-log.html', title: 'Amallar Jurnali (Audit)', icon: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>', badge: 'Audit', section: 'ASOSIY BOSHQARUV' },
    { file: 'dispatcher.html', title: 'Dispetcher & Tahlil', icon: '<line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/>', badge: 'Jonli', section: 'DISPETCHERLIK PANELI' },
    { file: 'registration.html', title: 'Registratsiya Agenti', icon: '<path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"/><path d="M13 5v2"/><path d="M13 11v2"/><path d="M13 17v2"/>', badge: 'AWB', section: 'OPERATSION STANSIYALAR' },
    { file: 'warehouse.html', title: 'Ombor (Sklad)', icon: '<path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>', badge: "Yig'uv", section: 'OPERATSION STANSIYALAR' },
    { file: 'dock.html', title: 'Doklar va Rampalar', icon: '<rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>', badge: '1–6', section: 'OPERATSION STANSIYALAR' },
    { file: 'kpp.html', title: 'KPP Chiqish Nazorati', icon: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>', badge: 'Darvoza', section: 'OPERATSION STANSIYALAR' },
    { file: 'led-board.html', title: 'Katta LED Tablo TV', icon: '<rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>', badge: 'Jonli', target: '_blank', section: 'MONITORING' },
    { file: 'awery-sim.html', title: 'Awery ERP Simulyator', icon: '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>', badge: 'API', section: 'MONITORING & INTEGRATSIYA' }
];

function renderNavItemsForRole(role, currentFile, user) {
    const config = ROLE_CONFIG[role] || { allowed: ['login.html'] };
    const allowed = (user && user.allowedPages && user.allowedPages.length > 0)
        ? user.allowedPages
        : config.allowed;

    if (role === 'SUPER_ADMIN') {
        let html = '';
        let lastSection = '';
        ALL_MODULES.forEach(mod => {
            if (mod.section !== lastSection) {
                lastSection = mod.section;
                html += `<div class="nav-section-title">${mod.section}</div>`;
            }
            const isActive = currentFile === mod.file ? 'active' : '';
            const targetAttr = mod.target ? `target="${mod.target}"` : '';
            const badgeHtml = mod.badge ? `<span class="nav-badge ${mod.badge === 'Jonli' ? 'live' : ''}">${mod.badge}</span>` : '';
            html += `
                <a href="${mod.file}" class="saas-nav-item ${isActive}" ${targetAttr}>
                    <span class="nav-icon"><svg class="icon-svg icon-svg-md" viewBox="0 0 24 24">${mod.icon}</svg></span>
                    <span class="nav-text">${mod.title}</span>
                    ${badgeHtml}
                </a>
            `;
        });
        return html;
    }

    let html = '<div class="nav-section-title">BIRIKTIRILGAN ISH OYNALARI</div>';
    const permitted = ALL_MODULES.filter(m => allowed.includes(m.file));
    if (permitted.length === 0) {
        html += `<div style="padding: 10px 14px; font-size: 0.72rem; color: var(--text-muted);">Biriktirilgan oynalar yo'q</div>`;
    } else {
        permitted.forEach(mod => {
            const isActive = currentFile === mod.file ? 'active' : '';
            const targetAttr = mod.target ? `target="${mod.target}"` : '';
            const badgeHtml = mod.badge ? `<span class="nav-badge ${mod.badge === 'Jonli' ? 'live' : ''}">${mod.badge}</span>` : '';
            html += `
                <a href="${mod.file}" class="saas-nav-item ${isActive}" ${targetAttr}>
                    <span class="nav-icon"><svg class="icon-svg icon-svg-md" viewBox="0 0 24 24">${mod.icon}</svg></span>
                    <span class="nav-text">${mod.title}</span>
                    ${badgeHtml}
                </a>
            `;
        });
    }
    return html;
}

function setupSaasLayout() {
    const currentFile = getCurrentPageFile();
    if (currentFile === 'login.html' || currentFile === 'led-board.html') {
        return; // Skip login & standalone LED board
    }

    const user = getCurrentUser();
    if (!user) {
        window.location.replace('login.html');
        return;
    }

    const role = user.role;
    const config = ROLE_CONFIG[role] || { home: 'login.html', title: 'Xodim' };
    const brandHomeLink = (role === 'SUPER_ADMIN') ? 'index.html' : (user.targetUrl || config.home);

    // If already wrapped in .saas-layout, do not re-wrap
    if (document.querySelector('.saas-sidebar')) {
        updateActiveSidebarLink(currentFile);
        return;
    }

    // Capture existing header and main content
    const existingHeader = document.querySelector('.app-header');
    if (existingHeader) existingHeader.style.display = 'none';

    // Create SaaS Wrapper
    const wrapper = document.createElement('div');
    wrapper.className = 'saas-layout';

    // Sidebar HTML (Role-based menu and brand link)
    const sidebarHtml = `
        <aside class="saas-sidebar" id="saasSidebar">
            <div class="saas-brand">
                <a href="${brandHomeLink}" class="saas-brand-link" title="Tashkent International Airport Cargo">
                    <img src="images/tashkent-airport-logo.svg" alt="Tashkent Airport" class="brand-logo-img">
                    <img src="images/tashkent-airport-emblem.svg" alt="Tashkent Airport" class="brand-emblem-collapsed">
                </a>
                <button class="sidebar-toggle-btn" onclick="toggleSidebarCollapse()" title="Sidebar">
                    <svg class="icon-svg icon-svg-sm" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>
                </button>
            </div>

            <div class="saas-nav-container">
                ${renderNavItemsForRole(role, currentFile, user)}
            </div>

            <div class="saas-sidebar-footer">
                <div class="saas-user-card">
                    <div class="user-avatar-wrap">
                        <svg class="icon-svg" style="color:var(--primary); width:15px; height:15px;" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                        <span class="user-status-dot"></span>
                    </div>
                    <div class="user-details">
                        <span class="user-name-txt">${user.fullName || user.email || 'Xodim'}</span>
                        <span class="user-role-txt">${user.roleName || user.roleTitle || config.title}</span>
                    </div>
                    <button class="btn-sidebar-logout" onclick="logout()" title="Chiqish / Выход">
                        <svg class="icon-svg" style="width:14px; height:14px;" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                    </button>
                </div>
            </div>
        </aside>
    `;

    // Breadcrumb text tailored to employee role
    const breadcrumbRole = (role === 'SUPER_ADMIN')
        ? 'TASHKENT AIRPORT &bull; SUPER ADMIN HUB'
        : `TASHKENT AIRPORT &bull; ${(user.roleName || user.roleTitle || config.title).toUpperCase()}`;

    // Topbar HTML
    const topbarHtml = `
        <header class="saas-topbar">
            <div class="topbar-left">
                <button class="sidebar-toggle-btn" onclick="toggleSidebarCollapse()" title="Menyuni ochish/yopish">
                    <svg class="icon-svg icon-svg-md" viewBox="0 0 24 24"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
                </button>
                <div class="topbar-page-info">
                    <div class="topbar-breadcrumbs">${breadcrumbRole}</div>
                    <div class="topbar-page-title" id="pageDynamicTitle">${getPageName(currentFile)}</div>
                </div>
            </div>

            <!-- Topbar Tools -->
            <div class="topbar-right">
                <div class="live-badge-tool">
                    <span class="pulse-dot"></span>
                    <span data-i18n="onlineStatus">CargoUZ Awery Online</span>
                </div>

                <div class="topbar-clock" id="liveClock">--:--:--</div>

                <!-- Airport Audio Chime Button -->
                <button class="btn-airport-chime" onclick="triggerAirportChimeTest()" title="Aeroport audio e'loni sinovi (Chime)">
                    <svg class="icon-svg icon-svg-sm" viewBox="0 0 24 24"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
                    <span>Chime</span>
                </button>

                <div class="lang-toggle-saas">
                    <button class="lang-btn-saas ${currentLang === 'uz' ? 'active' : ''}" onclick="setLanguage('uz')">UZ</button>
                    <button class="lang-btn-saas ${currentLang === 'ru' ? 'active' : ''}" onclick="setLanguage('ru')">RU</button>
                </div>

                <div class="user-avatar-wrap" style="cursor:pointer;" onclick="window.location.href='${brandHomeLink}'" title="${user.fullName || user.email}">
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

    // For non-SuperAdmin employees, remove/hide any links in DOM pointing to index.html or other modules
    if (role !== 'SUPER_ADMIN') {
        document.querySelectorAll('a[href="index.html"], a[href="/index.html"], a[href="./index.html"]').forEach(el => {
            el.style.display = 'none';
            el.setAttribute('href', '#');
            el.onclick = (e) => { e.preventDefault(); return false; };
        });
    }
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

// ==========================================================================
// SUPER ADMIN: RBAC PERMISSIONS & USER MANAGEMENT MODAL
// ==========================================================================

let rbacUsersCache = [];

async function openSuperAdminRbacModal() {
    let modal = document.getElementById('superAdminRbacModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'superAdminRbacModal';
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 960px; width: 95%; max-height: 90vh; overflow-y: auto; padding: 24px; border-radius: 14px;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; border-bottom:1px solid var(--border-color); padding-bottom:12px;">
                    <div>
                        <div style="display:inline-flex; align-items:center; gap:6px; font-size:0.68rem; font-weight:800; color:var(--primary); background:var(--primary-light); padding:2px 8px; border-radius:4px; text-transform:uppercase;">
                            <svg class="icon-svg icon-svg-sm" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                            SuperAdmin Boshqaruv Markazi
                        </div>
                        <h3 style="font-size:1.15rem; font-weight:800; color:var(--text-primary); margin-top:4px;">Xodimlarga Ruxsatnomalar va Oynalarni Biriktirish (RBAC)</h3>
                        <p style="font-size:0.75rem; color:var(--text-muted);">Har bir xodimga faqat o'zi ko'rishi mumkin bo'lgan dastur oynalarini (registratsiya, ombor, dok, kpp...) biriktiring.</p>
                    </div>
                    <div style="display:flex; gap:8px;">
                        <button onclick="openCreateUserModal()" class="btn btn-primary" style="font-size:0.78rem; padding:6px 12px;">
                            + Yangi Xodim Qo'shish
                        </button>
                        <button onclick="closeSuperAdminRbacModal()" class="btn btn-secondary" style="font-size:0.78rem; padding:6px 10px;">✕</button>
                    </div>
                </div>

                <div id="rbacUsersContainer" style="min-height: 200px;">
                    <div style="text-align:center; padding: 30px; color:var(--text-muted); font-size:0.85rem;">Yuklanmoqda...</div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }
    modal.style.display = 'flex';
    await loadRbacUsersTable();
}

function closeSuperAdminRbacModal() {
    const modal = document.getElementById('superAdminRbacModal');
    if (modal) modal.style.display = 'none';
}

async function loadRbacUsersTable() {
    const container = document.getElementById('rbacUsersContainer');
    if (!container) return;
    try {
        const res = await fetch('/api/auth/users');
        if (!res.ok) throw new Error('Foydalanuvchilarni yuklab bo\'lmadi');
        rbacUsersCache = await res.json();
        renderRbacUsersTable();
    } catch(err) {
        container.innerHTML = `<div style="color:var(--danger); padding:20px; text-align:center;">Xatolik: ${err.message}</div>`;
    }
}

function renderRbacUsersTable() {
    const container = document.getElementById('rbacUsersContainer');
    if (!container) return;

    if (!rbacUsersCache || rbacUsersCache.length === 0) {
        container.innerHTML = `<div style="text-align:center; padding:30px; color:var(--text-muted);">Foydalanuvchilar topilmadi</div>`;
        return;
    }

    const moduleLabels = {
        'index.html': { name: 'Hub', cls: 'badge-registered' },
        'dispatcher.html': { name: 'Dispetcher', cls: 'badge-called' },
        'registration.html': { name: 'Registratsiya', cls: 'badge-issuing' },
        'warehouse.html': { name: 'Ombor', cls: 'badge-warning' },
        'dock.html': { name: 'Dok', cls: 'badge-warning' },
        'kpp.html': { name: 'KPP', cls: 'badge-closed' },
        'led-board.html': { name: 'LED Tablo', cls: 'badge-called' },
        'awery-sim.html': { name: 'Awery', cls: 'badge-registered' }
    };

    let tableHtml = `
        <table class="data-table" style="width:100%; font-size:0.78rem;">
            <thead>
                <tr>
                    <th>Xodim (FIO / Email)</th>
                    <th>Asosiy Roli</th>
                    <th>Biriktirilgan Ruxsatli Oynalar</th>
                    <th>Boshlang'ich Oyna</th>
                    <th>Holati</th>
                    <th style="text-align:right;">Amallar</th>
                </tr>
            </thead>
            <tbody>
    `;

    rbacUsersCache.forEach(u => {
        const pages = u.allowedPages || [];
        const isSuper = u.role === 'SUPER_ADMIN';

        let pageBadges = '';
        if (isSuper) {
            pageBadges = `<span class="badge badge-called" style="font-weight:700;">TO'LIQ HUQUQ (Barcha oynalar)</span>`;
        } else if (pages.length === 0) {
            pageBadges = `<span style="color:var(--text-dim); font-size:0.72rem;">Ruxsat berilmagan</span>`;
        } else {
            pageBadges = pages.map(p => {
                const info = moduleLabels[p] || { name: p, cls: 'badge-registered' };
                return `<span class="badge ${info.cls}" style="margin:2px 3px 2px 0; font-size:0.65rem;">${info.name}</span>`;
            }).join('');
        }

        const statusBadge = u.active !== false
            ? `<span style="color:var(--emerald); font-weight:700; font-size:0.72rem;">● Faol</span>`
            : `<span style="color:var(--danger); font-weight:700; font-size:0.72rem;">○ Bloklangan</span>`;

        tableHtml += `
            <tr>
                <td>
                    <div style="font-weight:700; color:var(--text-primary);">${u.fullName || u.email}</div>
                    <div style="font-size:0.7rem; color:var(--text-muted); font-family:var(--font-mono);">${u.email}</div>
                </td>
                <td>
                    <span class="badge badge-registered" style="font-weight:600;">${u.roleTitle || u.role}</span>
                </td>
                <td style="max-width: 320px;">
                    <div style="display:flex; flex-wrap:wrap; gap:3px;">
                        ${pageBadges}
                    </div>
                </td>
                <td>
                    <span style="font-family:var(--font-mono); font-size:0.72rem; color:var(--text-secondary);">${u.targetUrl || '-'}</span>
                </td>
                <td>${statusBadge}</td>
                <td style="text-align:right;">
                    <button onclick="openEditUserPermissionsModal(${u.id})" class="btn btn-secondary" style="padding:4px 8px; font-size:0.72rem; margin-right:4px;">
                        ⚙️ Ruxsatlar
                    </button>
                    ${!isSuper ? `<button onclick="deleteUserAccount(${u.id}, '${u.fullName || u.email}')" class="btn btn-secondary" style="padding:4px 7px; font-size:0.72rem; color:var(--danger); border-color:#fecaca;">🗑️</button>` : ''}
                </td>
            </tr>
        `;
    });

    tableHtml += `
            </tbody>
        </table>
    `;

    container.innerHTML = tableHtml;
}

function openEditUserPermissionsModal(userId) {
    const user = rbacUsersCache.find(u => u.id === userId);
    if (!user) return;

    let subModal = document.getElementById('editPermissionsSubModal');
    if (!subModal) {
        subModal = document.createElement('div');
        subModal.id = 'editPermissionsSubModal';
        subModal.className = 'modal-overlay';
        subModal.style.zIndex = '10001';
        document.body.appendChild(subModal);
    }

    const availableModules = [
        { file: 'registration.html', title: '1-Bosqich · Registratsiya Agenti', desc: 'Mijozlarni ro\'yxatga olish, AWB tekshiruvi va elektron talon berish' },
        { file: 'warehouse.html', title: '2-Bosqich · Ombor (Sklad Plansheti)', desc: 'Yuk yacheykasini topish, tayyorlash va dokka yetkazish' },
        { file: 'dock.html', title: '3-Bosqich · Yuk Berish Doklari (Rampa 1–6)', desc: 'Mijozni chaqirish, yuklashni boshlash va kamomad aktini tuzish' },
        { file: 'kpp.html', title: '4-Bosqich · KPP Chiqish Nazorati', desc: 'QR-kodli talonni tekshirish va hududdan chiqishni tasdiqlash' },
        { file: 'dispatcher.html', title: 'Dispetcherlik va Jonli Tahlil', desc: 'Umumiy navbat oqimini monitoring qilish va tahliliy hisobotlar' },
        { file: 'led-board.html', title: 'Katta LED Tablo Monitor TV', desc: 'Kutish zali va doklar uchun ovozli axborot tablosini ko\'rish' },
        { file: 'awery-sim.html', title: 'Awery ERP / Bojxona Simulyatori', desc: 'Bojxona relizini sinash va integratsiyani tekshirish' }
    ];

    const currentAllowed = user.allowedPages || [];

    const checkboxesHtml = availableModules.map(m => {
        const isChecked = currentAllowed.includes(m.file) ? 'checked' : '';
        return `
            <label style="display:flex; align-items:flex-start; gap:10px; padding:8px 12px; background:#ffffff; border:1px solid var(--border-color); border-radius:8px; cursor:pointer; margin-bottom:6px;">
                <input type="checkbox" name="modulePermission" value="${m.file}" ${isChecked} style="margin-top:3px; width:16px; height:16px; cursor:pointer;">
                <div style="flex:1;">
                    <div style="font-weight:700; font-size:0.8rem; color:var(--text-primary);">${m.title}</div>
                    <div style="font-size:0.7rem; color:var(--text-muted);">${m.desc}</div>
                </div>
            </label>
        `;
    }).join('');

    subModal.innerHTML = `
        <div class="modal-content" style="max-width: 620px; width: 95%; max-height: 88vh; overflow-y: auto; padding: 22px; border-radius: 12px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; border-bottom:1px solid var(--border-color); padding-bottom:10px;">
                <div>
                    <h3 style="font-size:1.05rem; font-weight:800; color:var(--text-primary);">Xodim Ruxsatnomalarini Tahrirlash</h3>
                    <div style="font-size:0.74rem; color:var(--text-muted);">${user.fullName} (${user.email})</div>
                </div>
                <button onclick="closeEditUserPermissionsModal()" class="btn btn-secondary" style="padding:4px 8px; font-size:0.75rem;">✕</button>
            </div>

            <div style="margin-bottom:14px;">
                <label style="display:block; font-size:0.75rem; font-weight:700; color:var(--text-secondary); margin-bottom:4px;">Tizimdagi Asosiy Roli</label>
                <select id="editUserRoleSelect" class="form-input" style="width:100%; font-size:0.8rem; padding:8px;" onchange="handleRolePresetChange(this.value)">
                    <option value="OPERATOR_REGISTRATION" ${user.role === 'OPERATOR_REGISTRATION' ? 'selected' : ''}>Registratsiya Xodimi</option>
                    <option value="OPERATOR_WAREHOUSE" ${user.role === 'OPERATOR_WAREHOUSE' ? 'selected' : ''}>Ombor Xodimi (Sklad)</option>
                    <option value="OPERATOR_DOCK" ${user.role === 'OPERATOR_DOCK' ? 'selected' : ''}>Dok Operatori (Rampa)</option>
                    <option value="OPERATOR_KPP" ${user.role === 'OPERATOR_KPP' ? 'selected' : ''}>KPP Nazorat Xodimi</option>
                    <option value="ADMIN" ${user.role === 'ADMIN' ? 'selected' : ''}>Bosh Dispetcher (Admin)</option>
                    <option value="SUPER_ADMIN" ${user.role === 'SUPER_ADMIN' ? 'selected' : ''}>Super Administrator</option>
                </select>
            </div>

            <div style="margin-bottom:14px;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                    <label style="font-size:0.75rem; font-weight:700; color:var(--text-secondary);">Biriktiriladigan Oynalar (Ruxsatlar)</label>
                    <div style="font-size:0.7rem;">
                        <a href="javascript:void(0)" onclick="selectAllPermissions(true)" style="color:var(--primary); font-weight:600; text-decoration:none; margin-right:8px;">Barchasini belgilash</a>
                        <a href="javascript:void(0)" onclick="selectAllPermissions(false)" style="color:var(--text-muted); text-decoration:none;">Tozalash</a>
                    </div>
                </div>
                <div style="background:var(--bg-app); padding:10px; border-radius:8px; border:1px solid var(--border-color);" id="permissionsCheckboxesWrap">
                    ${checkboxesHtml}
                </div>
            </div>

            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:12px; margin-bottom:16px;">
                <div>
                    <label style="display:block; font-size:0.75rem; font-weight:700; color:var(--text-secondary); margin-bottom:4px;">Boshlang'ich Oyna (Home URL)</label>
                    <select id="editUserTargetUrl" class="form-input" style="width:100%; font-size:0.8rem; padding:8px;">
                        <option value="registration.html" ${user.targetUrl === 'registration.html' ? 'selected' : ''}>Registratsiya Agenti</option>
                        <option value="warehouse.html" ${user.targetUrl === 'warehouse.html' ? 'selected' : ''}>Ombor (Sklad)</option>
                        <option value="dock.html" ${user.targetUrl === 'dock.html' ? 'selected' : ''}>Doklar va Rampalar</option>
                        <option value="kpp.html" ${user.targetUrl === 'kpp.html' ? 'selected' : ''}>KPP Chiqish</option>
                        <option value="dispatcher.html" ${user.targetUrl === 'dispatcher.html' ? 'selected' : ''}>Dispetcher & Tahlil</option>
                        <option value="index.html" ${user.targetUrl === 'index.html' ? 'selected' : ''}>Boshqaruv Paneli (Hub)</option>
                    </select>
                </div>
                <div>
                    <label style="display:block; font-size:0.75rem; font-weight:700; color:var(--text-secondary); margin-bottom:4px;">Hisob Holati</label>
                    <select id="editUserActiveSelect" class="form-input" style="width:100%; font-size:0.8rem; padding:8px;">
                        <option value="true" ${user.active !== false ? 'selected' : ''}>Faol (Ruxsat berilgan)</option>
                        <option value="false" ${user.active === false ? 'selected' : ''}>Bloklangan (Tizimga kira olmaydi)</option>
                    </select>
                </div>
            </div>

            <div style="display:flex; justify-content:flex-end; gap:8px;">
                <button onclick="closeEditUserPermissionsModal()" class="btn btn-secondary" style="font-size:0.8rem;">Bekor qilish</button>
                <button onclick="saveUserPermissions(${user.id})" class="btn btn-primary" style="font-size:0.8rem; font-weight:700;">
                    ✓ Ruxsatnomalarni Saqlash
                </button>
            </div>
        </div>
    `;

    subModal.style.display = 'flex';
}

function closeEditUserPermissionsModal() {
    const subModal = document.getElementById('editPermissionsSubModal');
    if (subModal) subModal.style.display = 'none';
}

function selectAllPermissions(check) {
    document.querySelectorAll('#permissionsCheckboxesWrap input[type="checkbox"]').forEach(cb => {
        cb.checked = check;
    });
}

function handleRolePresetChange(role) {
    const roleMap = {
        'OPERATOR_REGISTRATION': ['registration.html'],
        'OPERATOR_WAREHOUSE': ['warehouse.html'],
        'OPERATOR_DOCK': ['dock.html'],
        'OPERATOR_KPP': ['kpp.html'],
        'ADMIN': ['dispatcher.html', 'dock.html', 'led-board.html'],
        'SUPER_ADMIN': ['index.html', 'dispatcher.html', 'registration.html', 'warehouse.html', 'dock.html', 'kpp.html', 'led-board.html', 'awery-sim.html']
    };
    const defaultPages = roleMap[role] || [];
    document.querySelectorAll('#permissionsCheckboxesWrap input[type="checkbox"]').forEach(cb => {
        cb.checked = defaultPages.includes(cb.value);
    });

    const targetMap = {
        'OPERATOR_REGISTRATION': 'registration.html',
        'OPERATOR_WAREHOUSE': 'warehouse.html',
        'OPERATOR_DOCK': 'dock.html',
        'OPERATOR_KPP': 'kpp.html',
        'ADMIN': 'dispatcher.html',
        'SUPER_ADMIN': 'index.html'
    };
    const sel = document.getElementById('editUserTargetUrl');
    if (sel && targetMap[role]) {
        sel.value = targetMap[role];
    }
}

async function saveUserPermissions(userId) {
    const checked = Array.from(document.querySelectorAll('#permissionsCheckboxesWrap input[type="checkbox"]:checked')).map(cb => cb.value);
    const role = document.getElementById('editUserRoleSelect').value;
    const targetUrl = document.getElementById('editUserTargetUrl').value;
    const active = document.getElementById('editUserActiveSelect').value === 'true';

    try {
        const res = await fetch(`/api/auth/users/${userId}/permissions`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                allowedPages: checked,
                role: role,
                targetUrl: targetUrl,
                active: active
            })
        });

        if (!res.ok) {
            const err = await res.json().catch(() => ({}));
            throw new Error(err.message || 'Ruxsatnomalarni saqlashda xatolik yuz berdi');
        }

        showToast('Xodim ruxsatnomalari muvaffaqiyatli saqlandi!', 'success');
        closeEditUserPermissionsModal();
        await loadRbacUsersTable();

        // If Super Admin updated their own account, refresh local user
        const currentUser = getCurrentUser();
        if (currentUser && currentUser.id === userId) {
            currentUser.allowedPages = checked;
            currentUser.targetUrl = targetUrl;
            currentUser.role = role;
            localStorage.setItem('tas_cargo_user', JSON.stringify(currentUser));
        }
    } catch(err) {
        showToast(err.message, 'error');
    }
}

function openCreateUserModal() {
    let subModal = document.getElementById('createUserSubModal');
    if (!subModal) {
        subModal = document.createElement('div');
        subModal.id = 'createUserSubModal';
        subModal.className = 'modal-overlay';
        subModal.style.zIndex = '10002';
        document.body.appendChild(subModal);
    }

    subModal.innerHTML = `
        <div class="modal-content" style="max-width: 500px; width: 95%; padding: 22px; border-radius: 12px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; border-bottom:1px solid var(--border-color); padding-bottom:10px;">
                <h3 style="font-size:1.05rem; font-weight:800; color:var(--text-primary);">+ Yangi Xodim Qo'shish</h3>
                <button onclick="closeCreateUserModal()" class="btn btn-secondary" style="padding:4px 8px; font-size:0.75rem;">✕</button>
            </div>

            <div style="margin-bottom:10px;">
                <label style="display:block; font-size:0.75rem; font-weight:700; color:var(--text-secondary); margin-bottom:3px;">F.I.O (Ism-Familiya)</label>
                <input type="text" id="newFullName" class="form-input" placeholder="Masalan: Azizbek Karimov" style="width:100%; font-size:0.8rem; padding:8px;">
            </div>

            <div style="margin-bottom:10px;">
                <label style="display:block; font-size:0.75rem; font-weight:700; color:var(--text-secondary); margin-bottom:3px;">Login (Email yoki Username)</label>
                <input type="text" id="newEmail" class="form-input" placeholder="Masalan: azizbek@uzairports.com" style="width:100%; font-size:0.8rem; padding:8px;">
            </div>

            <div style="margin-bottom:10px;">
                <label style="display:block; font-size:0.75rem; font-weight:700; color:var(--text-secondary); margin-bottom:3px;">Kirish Paroli</label>
                <input type="password" id="newPassword" class="form-input" placeholder="••••••••" style="width:100%; font-size:0.8rem; padding:8px;">
            </div>

            <div style="margin-bottom:16px;">
                <label style="display:block; font-size:0.75rem; font-weight:700; color:var(--text-secondary); margin-bottom:3px;">Lavozim / Rol</label>
                <select id="newRole" class="form-input" style="width:100%; font-size:0.8rem; padding:8px;">
                    <option value="OPERATOR_REGISTRATION">Registratsiya Xodimi</option>
                    <option value="OPERATOR_WAREHOUSE">Ombor Xodimi (Sklad)</option>
                    <option value="OPERATOR_DOCK">Dok Operatori (Rampa)</option>
                    <option value="OPERATOR_KPP">KPP Nazorat Xodimi</option>
                    <option value="ADMIN">Bosh Dispetcher (Admin)</option>
                </select>
            </div>

            <div style="display:flex; justify-content:flex-end; gap:8px;">
                <button onclick="closeCreateUserModal()" class="btn btn-secondary" style="font-size:0.8rem;">Bekor qilish</button>
                <button onclick="submitCreateUser()" class="btn btn-primary" style="font-size:0.8rem; font-weight:700;">+ Yaratish</button>
            </div>
        </div>
    `;

    subModal.style.display = 'flex';
}

function closeCreateUserModal() {
    const subModal = document.getElementById('createUserSubModal');
    if (subModal) subModal.style.display = 'none';
}

async function submitCreateUser() {
    const fullName = document.getElementById('newFullName').value.trim();
    const email = document.getElementById('newEmail').value.trim();
    const password = document.getElementById('newPassword').value.trim();
    const role = document.getElementById('newRole').value;

    if (!fullName || !email || !password) {
        showToast('Iltimos, barcha maydonlarni to\'ldiring', 'error');
        return;
    }

    try {
        const res = await fetch('/api/auth/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fullName, email, password, role })
        });

        if (!res.ok) {
            const err = await res.json().catch(() => ({}));
            throw new Error(err.message || 'Xodimni yaratishda xatolik yuz berdi');
        }

        showToast('Yangi xodim muvaffaqiyatli qo\'shildi!', 'success');
        closeCreateUserModal();
        await loadRbacUsersTable();
    } catch(err) {
        showToast(err.message, 'error');
    }
}

async function deleteUserAccount(userId, name) {
    if (!confirm(`${name} hisobini rostdan ham o'chirmoqchimisiz?`)) return;
    try {
        const res = await fetch(`/api/auth/users/${userId}`, { method: 'DELETE' });
        if (!res.ok) {
            const err = await res.json().catch(() => ({}));
            throw new Error(err.message || 'O\'chirishda xatolik');
        }
        showToast('Xodim hisobi o\'chirildi', 'info');
        await loadRbacUsersTable();
    } catch(err) {
        showToast(err.message, 'error');
    }
}
