// TAS Cargo - Client-Side Mock API Engine for GitHub Pages & Offline Demo
// Enables 100% interactive operation without requiring a backend server.

(function() {
    const isGhPages = window.location.hostname.includes('github.io');
    const origFetch = window.fetch;

    // Default seed users
    const DEFAULT_USERS = [
        {
            id: 1,
            email: 'supperadmin@uzairports.com',
            fullName: 'Bosh Tizim Administratori',
            role: 'SUPER_ADMIN',
            roleTitle: 'Super Administrator',
            targetUrl: 'index.html',
            avatar: 'SUP',
            allowedPages: ['index.html', 'dispatcher.html', 'registration.html', 'warehouse.html', 'dock.html', 'kpp.html', 'led-board.html', 'awery-sim.html', 'activity-log.html'],
            active: true
        },
        {
            id: 2,
            email: 'admin@uzairports.com',
            fullName: 'Sardor Aliyev (Bosh Dispetcher)',
            role: 'ADMIN',
            roleTitle: 'Bosh Dispetcher (Admin)',
            targetUrl: 'dispatcher.html',
            avatar: 'ADM',
            allowedPages: ['dispatcher.html', 'dock.html', 'led-board.html', 'activity-log.html'],
            active: true
        },
        {
            id: 3,
            email: 'registration@uzairports.com',
            fullName: 'Nodira Karimova (Registratsiya)',
            role: 'OPERATOR_REGISTRATION',
            roleTitle: 'Registratsiya Xodimi',
            targetUrl: 'registration.html',
            avatar: 'REG',
            allowedPages: ['registration.html'],
            active: true
        },
        {
            id: 4,
            email: 'warehouse@uzairports.com',
            fullName: 'Rustam Mahmudov (Katta Omborchi)',
            role: 'OPERATOR_WAREHOUSE',
            roleTitle: 'Ombor Xodimi (Sklad)',
            targetUrl: 'warehouse.html',
            avatar: 'WHS',
            allowedPages: ['warehouse.html'],
            active: true
        },
        {
            id: 5,
            email: 'dock@uzairports.com',
            fullName: 'Jasur Rahimov (Dok Operatori)',
            role: 'OPERATOR_DOCK',
            roleTitle: 'Dok Operatori (Rampa)',
            targetUrl: 'dock.html',
            avatar: 'DCK',
            allowedPages: ['dock.html'],
            active: true
        },
        {
            id: 6,
            email: 'kpp@uzairports.com',
            fullName: 'Farhod Ergashev (KPP Ofitseri)',
            role: 'OPERATOR_KPP',
            roleTitle: 'KPP Nazorat Xodimi',
            targetUrl: 'kpp.html',
            avatar: 'KPP',
            allowedPages: ['kpp.html'],
            active: true
        }
    ];

    // Default Activity Logs (Matching screenshot exactly)
    const DEFAULT_LOGS = [
        {
            id: 19,
            timestamp: new Date(Date.now() - 3 * 60000).toISOString(),
            userName: 'Sardor Aliyev',
            userEmail: 'admin@uzairports.com',
            action: 'Yuklab olish',
            actionCode: 'DOWNLOAD',
            entityName: 'Jadvalni yuklab olish',
            entityId: '—',
            changedFields: 'path, rows, table, format',
            ipAddress: '192.168.1.101',
            details: 'Yuk berish dispetcherlik hisoboti Excel formatida yuklab olindi'
        },
        {
            id: 18,
            timestamp: new Date(Date.now() - 8 * 60000).toISOString(),
            userName: 'Farhod Ergashev',
            userEmail: 'kpp@uzairports.com',
            action: "O'zgartirish",
            actionCode: 'UPDATE',
            entityName: 'KPP Chiqish Nazorati',
            entityId: 'A-014',
            changedFields: 'status, kppExitTime, securityOfficer',
            ipAddress: '192.168.1.112',
            details: "Darvozada transport vositasi (01 A 777 AA) nazorati tasdiqlanib hududdan chiqarildi"
        },
        {
            id: 17,
            timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
            userName: 'Jasur Rahimov',
            userEmail: 'dock@uzairports.com',
            action: "O'zgartirish",
            actionCode: 'UPDATE',
            entityName: 'Dok (Rampa 1)',
            entityId: 'A-014',
            changedFields: 'status, dockNumber, calledAt',
            ipAddress: '192.168.1.108',
            details: "Mijoz Rampa 1 ga chaqirildi va yuk topshirish jarayoni boshlandi"
        },
        {
            id: 16,
            timestamp: new Date(Date.now() - 20 * 60000).toISOString(),
            userName: 'Rustam Mahmudov',
            userEmail: 'warehouse@uzairports.com',
            action: "O'zgartirish",
            actionCode: 'UPDATE',
            entityName: 'Ombor (Sklad)',
            entityId: 'A-014',
            changedFields: 'status, warehouseLocation, packageCount',
            ipAddress: '192.168.1.104',
            details: "Yuk yacheyka 14-B dan yig'ilib dok maydonchasiga yetkazildi (Yuk Tayyor)"
        },
        {
            id: 15,
            timestamp: new Date(Date.now() - 25 * 60000).toISOString(),
            userName: 'Nodira Karimova',
            userEmail: 'registration@uzairports.com',
            action: 'Yaratish',
            actionCode: 'CREATE',
            entityName: 'Navbat Arizasi',
            entityId: '250-84920183',
            changedFields: 'ticketNumber, awbNumber, cargoCategory, vehiclePlate',
            ipAddress: '192.168.1.102',
            details: "Yangi navbat taloni berildi: A-014 (Silk Road Logistics, 18 joy, 420.5 kg)"
        },
        {
            id: 14,
            timestamp: new Date(Date.now() - 30 * 60000).toISOString(),
            userName: 'Bosh Tizim Administratori',
            userEmail: 'supperadmin@uzairports.com',
            action: "O'zgartirish",
            actionCode: 'UPDATE',
            entityName: 'Xodim Ruxsatnomalari',
            entityId: '3',
            changedFields: 'allowedPages, targetUrl, role',
            ipAddress: '::ffff:172.18.0.1',
            details: "Registratsiya xodimi (Nodira Karimova) uchun Ombor (warehouse.html) ruxsati berildi"
        },
        {
            id: 13,
            timestamp: '2026-10-28T10:08:47',
            userName: 'Anvarbek A. Jurayev',
            userEmail: 'a.jurayev@fleetcore.uz',
            action: 'Yaratish',
            actionCode: 'CREATE',
            entityName: 'TechnicalInspection',
            entityId: '2',
            changedFields: 'result, checklist',
            ipAddress: '::ffff:172.18.0.1',
            details: "Avtotransport texnik ko'rigi muvaffaqiyatli o'tkazildi va tasdiqlandi"
        },
        {
            id: 12,
            timestamp: '2026-10-23T19:26:25',
            userName: 'Admin',
            userEmail: 'admin@fleetcore.uz',
            action: "O'zgartirish",
            actionCode: 'UPDATE',
            entityName: "Yo'l varaqasi",
            entityId: '1',
            changedFields: 'id, type, notes, tonKm, number, +45',
            ipAddress: '::ffff:172.18.0.1',
            details: "Yuk tashish yo'l varaqasi rekvizitlari yangilandi"
        },
        {
            id: 11,
            timestamp: '2026-10-23T19:22:52',
            userName: 'Admin',
            userEmail: 'admin@fleetcore.uz',
            action: 'Yuklab olish',
            actionCode: 'DOWNLOAD',
            entityName: 'Jadvalni yuklab olish',
            entityId: '—',
            changedFields: 'path, rows, table, format',
            ipAddress: '::ffff:172.18.0.1',
            details: "Smenalik amallar hisoboti Excel formatida yuklab olindi (124 qator)"
        },
        {
            id: 10,
            timestamp: '2026-10-23T14:37:21',
            userName: 'Admin',
            userEmail: 'admin@fleetcore.uz',
            action: 'Yaratish',
            actionCode: 'CREATE',
            entityName: 'EmployeeDocumentType',
            entityId: '1',
            changedFields: 'name',
            ipAddress: '::ffff:172.18.0.1',
            details: "Yangi xodim hujjati shabloni ro'yxatga olindi"
        },
        {
            id: 9,
            timestamp: '2026-10-23T09:39:10',
            userName: 'Jamshidbek D. Mirkhadjayev',
            userEmail: 'j.mirkhadjayev@fleetcore.uz',
            action: 'Yuklab olish',
            actionCode: 'DOWNLOAD',
            entityName: "Yo'l varaqasi",
            entityId: '1',
            changedFields: '—',
            ipAddress: '::ffff:172.18.0.1',
            details: "Tasdiqlangan elektron yo'l varaqasi PDF nusxasi yuklab olindi"
        },
        {
            id: 8,
            timestamp: '2026-10-22T13:28:08',
            userName: 'Admin',
            userEmail: 'admin@fleetcore.uz',
            action: "O'zgartirish",
            actionCode: 'UPDATE',
            entityName: "Yo'l varaqasi",
            entityId: '1',
            changedFields: 'conditionOnIssue, overrideEligibility',
            ipAddress: '::ffff:172.18.0.1',
            details: "Maxsus yuk berish shartlari va ruxsatnomasi qayta ko'rib chiqildi"
        },
        {
            id: 7,
            timestamp: '2026-10-22T13:27:49',
            userName: 'Admin',
            userEmail: 'admin@fleetcore.uz',
            action: 'Yaratish',
            actionCode: 'CREATE',
            entityName: "Yo'l varaqasi",
            entityId: '1',
            changedFields: 'type, tasks, validTo, driverId, validFrom, +2',
            ipAddress: '::ffff:172.18.0.1',
            details: "Dastlabki yo'l varaqasi tizimga kiritildi"
        },
        {
            id: 6,
            timestamp: '2026-10-22T13:27:23',
            userName: 'Admin',
            userEmail: 'admin@fleetcore.uz',
            action: 'Yaratish',
            actionCode: 'CREATE',
            entityName: 'TechnicalInspection',
            entityId: '1',
            changedFields: 'result, checklist',
            ipAddress: '::ffff:172.18.0.1',
            details: "Texnik nazorat kartasi tekshiruvdan o'tkazildi"
        },
        {
            id: 5,
            timestamp: '2026-10-22T13:27:14',
            userName: 'Admin',
            userEmail: 'admin@fleetcore.uz',
            action: 'Yaratish',
            actionCode: 'CREATE',
            entityName: "Tibbiy ko'rik",
            entityId: '1',
            changedFields: 'pulse, result, checkedAt, isPreTrip, temperature, +1',
            ipAddress: '::ffff:172.18.0.1',
            details: "Haydovchilar smena oldi tibbiy nazorat ko'rigi qaydnomasi"
        },
        {
            id: 4,
            timestamp: '2026-10-22T13:26:12',
            userName: 'Admin',
            userEmail: 'admin@fleetcore.uz',
            action: 'Yuklab olish',
            actionCode: 'DOWNLOAD',
            entityName: 'Jadvalni yuklab olish',
            entityId: '—',
            changedFields: 'path, rows, table, format',
            ipAddress: '::ffff:172.18.0.1',
            details: "Umumiy monitoring jadvali eksport qilindi"
        },
        {
            id: 3,
            timestamp: '2026-10-22T13:24:58',
            userName: 'Admin',
            userEmail: 'admin@fleetcore.uz',
            action: "O'zgartirish",
            actionCode: 'UPDATE',
            entityName: 'Organization',
            entityId: '3',
            changedFields: '—',
            ipAddress: '::ffff:172.18.0.1',
            details: "Tashkilot rekvizitlariga tuzatish kiritildi"
        },
        {
            id: 2,
            timestamp: '2026-10-22T13:22:51',
            userName: 'Admin',
            userEmail: 'admin@fleetcore.uz',
            action: 'Yaratish',
            actionCode: 'CREATE',
            entityName: 'Ofis',
            entityId: '159',
            changedFields: 'code, kind, nameEn, nameRu, nameUz, +11',
            ipAddress: '::ffff:172.18.0.1',
            details: "Yangi bojxona brokerlik ofisi ma'lumotlar bazasiga qo'shildi"
        },
        {
            id: 1,
            timestamp: '2026-10-22T13:20:57',
            userName: 'Admin',
            userEmail: 'admin@fleetcore.uz',
            action: 'Yaratish',
            actionCode: 'CREATE',
            entityName: 'Organization',
            entityId: '3',
            changedFields: 'code, nameEn, nameRu, nameUz, taskLayout, +1',
            ipAddress: '::ffff:172.18.0.1',
            details: "Logistika hamkori 'Silk Road Logistics' tashkiloti kiritildi"
        }
    ];

    // Local Storage initializers
    function getStoredUsers() {
        try {
            const raw = localStorage.getItem('tas_cargo_mock_users');
            if (raw) return JSON.parse(raw);
        } catch(e) {}
        localStorage.setItem('tas_cargo_mock_users', JSON.stringify(DEFAULT_USERS));
        return DEFAULT_USERS;
    }

    function saveStoredUsers(users) {
        localStorage.setItem('tas_cargo_mock_users', JSON.stringify(users));
    }

    function getStoredLogs() {
        try {
            const raw = localStorage.getItem('tas_cargo_mock_logs');
            if (raw) return JSON.parse(raw);
        } catch(e) {}
        localStorage.setItem('tas_cargo_mock_logs', JSON.stringify(DEFAULT_LOGS));
        return DEFAULT_LOGS;
    }

    function addStoredLog(entry) {
        const logs = getStoredLogs();
        const newEntry = {
            id: logs.length ? Math.max(...logs.map(l => l.id || 0)) + 1 : 1,
            timestamp: new Date().toISOString(),
            ...entry
        };
        logs.unshift(newEntry);
        localStorage.setItem('tas_cargo_mock_logs', JSON.stringify(logs));
        return newEntry;
    }

    // Default Docks
    const DEFAULT_DOCKS = [
        { id: 1, dockNumber: 1, name: 'Dock 1 (Universal)', status: 'CALLING', currentTicketNumber: 'A-014', currentAwbNumber: '250-84920183', supportedCategories: 'ALL' },
        { id: 2, dockNumber: 2, name: 'Dock 2 (Universal)', status: 'OCCUPIED', currentTicketNumber: 'P-001', currentAwbNumber: '250-99210482', supportedCategories: 'ALL' },
        { id: 3, dockNumber: 3, name: 'Dock 3 (Universal)', status: 'AVAILABLE', currentTicketNumber: null, currentAwbNumber: null, supportedCategories: 'ALL' },
        { id: 4, dockNumber: 4, name: 'Dock 4 (Universal)', status: 'AVAILABLE', currentTicketNumber: null, currentAwbNumber: null, supportedCategories: 'ALL' },
        { id: 5, dockNumber: 5, name: 'Dock 5 (Universal)', status: 'AVAILABLE', currentTicketNumber: null, currentAwbNumber: null, supportedCategories: 'ALL' },
        { id: 6, dockNumber: 6, name: 'Dock 6 (Universal)', status: 'MAINTENANCE', currentTicketNumber: null, currentAwbNumber: null, supportedCategories: 'ALL' }
    ];

    // Mock API Dispatcher
    async function handleMockApi(urlStr, options = {}) {
        const method = (options.method || 'GET').toUpperCase();
        const urlObj = new URL(urlStr, window.location.origin);
        const path = urlObj.pathname.replace(/\/qms-cargowh-tas/, '');
        const params = urlObj.searchParams;

        // Helper JSON response
        const jsonResp = (data, status = 200) => new Response(JSON.stringify(data), {
            status,
            headers: { 'Content-Type': 'application/json' }
        });

        // 1. Auth Login
        if (path.endsWith('/api/auth/login') && method === 'POST') {
            let body = {};
            try { body = JSON.parse(options.body || '{}'); } catch(e) {}
            const email = (body.email || '').trim().toLowerCase();
            const password = (body.password || '').trim();

            const users = getStoredUsers();
            let matched = users.find(u => u.email.toLowerCase() === email);
            if (!matched) {
                // Check aliases
                if (email === 'admin') matched = users.find(u => u.role === 'ADMIN');
                else if (email === 'supperadmin' || email === 'superadmin') matched = users.find(u => u.role === 'SUPER_ADMIN');
                else if (email === 'agent' || email === 'registration') matched = users.find(u => u.role === 'OPERATOR_REGISTRATION');
                else if (email === 'sklad' || email === 'warehouse') matched = users.find(u => u.role === 'OPERATOR_WAREHOUSE');
                else if (email === 'dock') matched = users.find(u => u.role === 'OPERATOR_DOCK');
                else if (email === 'kpp') matched = users.find(u => u.role === 'OPERATOR_KPP');
            }

            const validPass = (matched && (
                (matched.role === 'SUPER_ADMIN' && (password === 'admin123' || password === 'tas123')) ||
                (matched.role === 'ADMIN' && (password === 'admin123' || password === 'tas123')) ||
                (password === 'tas123')
            ));

            if (matched && validPass) {
                addStoredLog({
                    userName: matched.fullName,
                    userEmail: matched.email,
                    action: 'Kirish',
                    actionCode: 'LOGIN',
                    entityName: 'Avtorizatsiya',
                    entityId: String(matched.id),
                    changedFields: 'session, role, token',
                    ipAddress: '127.0.0.1',
                    details: 'Tizimga muvaffaqiyatli kirildi [' + matched.role + ']'
                });
                return jsonResp({ success: true, token: 'mock-jwt-token-' + Date.now(), user: matched });
            }
            return jsonResp({ success: false, message: 'Email yoki parol noto\'g\'ri' }, 401);
        }

        // 2. Auth Users
        if (path.endsWith('/api/auth/users') && method === 'GET') {
            return jsonResp(getStoredUsers());
        }

        // 3. Auth Me
        if (path.includes('/api/auth/me') && method === 'GET') {
            const email = params.get('email');
            const users = getStoredUsers();
            const user = users.find(u => u.email.toLowerCase() === (email || '').toLowerCase());
            return user ? jsonResp(user) : jsonResp({ message: 'Topilmadi' }, 404);
        }

        // 4. Update Permissions
        if (path.match(/\/api\/auth\/users\/(\d+)\/permissions/) && method === 'PUT') {
            const id = parseInt(path.match(/\/api\/auth\/users\/(\d+)\/permissions/)[1], 10);
            let body = {};
            try { body = JSON.parse(options.body || '{}'); } catch(e) {}
            const users = getStoredUsers();
            const idx = users.findIndex(u => u.id === id);
            if (idx >= 0) {
                if (body.allowedPages) users[idx].allowedPages = body.allowedPages;
                if (body.targetUrl) users[idx].targetUrl = body.targetUrl;
                if (body.role) users[idx].role = body.role;
                if (typeof body.active === 'boolean') users[idx].active = body.active;
                saveStoredUsers(users);

                addStoredLog({
                    userName: 'Bosh Tizim Administratori',
                    userEmail: 'supperadmin@uzairports.com',
                    action: "O'zgartirish",
                    actionCode: 'UPDATE',
                    entityName: 'Xodim Ruxsatnomalari',
                    entityId: String(id),
                    changedFields: 'allowedPages, targetUrl, role, active',
                    ipAddress: '127.0.0.1',
                    details: users[idx].fullName + ' uchun ruxsatlar yangilandi: ' + JSON.stringify(users[idx].allowedPages)
                });
                return jsonResp(users[idx]);
            }
            return jsonResp({ message: 'Foydalanuvchi topilmadi' }, 404);
        }

        // 5. Create User
        if (path.endsWith('/api/auth/users') && method === 'POST') {
            let body = {};
            try { body = JSON.parse(options.body || '{}'); } catch(e) {}
            const users = getStoredUsers();
            const newId = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;
            const newUser = {
                id: newId,
                email: (body.email || '').trim().toLowerCase(),
                fullName: (body.fullName || '').trim(),
                role: body.role || 'OPERATOR_REGISTRATION',
                roleTitle: body.role || 'Operator',
                targetUrl: body.targetUrl || 'registration.html',
                avatar: (body.avatar || 'USR').toUpperCase(),
                allowedPages: body.allowedPages || ['registration.html'],
                active: true
            };
            users.push(newUser);
            saveStoredUsers(users);

            addStoredLog({
                userName: 'Bosh Tizim Administratori',
                userEmail: 'supperadmin@uzairports.com',
                action: 'Yaratish',
                actionCode: 'CREATE',
                entityName: 'Foydalanuvchi (User)',
                entityId: String(newId),
                changedFields: 'email, fullName, role, allowedPages',
                ipAddress: '127.0.0.1',
                details: 'Yangi xodim yaratildi: ' + newUser.email
            });
            return jsonResp(newUser);
        }

        // 6. Delete User
        if (path.match(/\/api\/auth\/users\/(\d+)$/) && method === 'DELETE') {
            const id = parseInt(path.match(/\/api\/auth\/users\/(\d+)$/)[1], 10);
            let users = getStoredUsers();
            users = users.filter(u => u.id !== id);
            saveStoredUsers(users);
            addStoredLog({
                userName: 'Bosh Tizim Administratori',
                userEmail: 'supperadmin@uzairports.com',
                action: "O'chirish",
                actionCode: 'DELETE',
                entityName: 'Foydalanuvchi (User)',
                entityId: String(id),
                changedFields: 'active, deletedAt',
                ipAddress: '127.0.0.1',
                details: "Xodim hisobi o'chirildi (ID: " + id + ")"
            });
            return jsonResp({ success: true });
        }

        // 7. Activity Logs List
        if (path.endsWith('/api/activity-logs') && method === 'GET') {
            let logs = getStoredLogs();
            const entity = params.get('entityName');
            const action = params.get('action');
            const entityId = params.get('entityId');
            const page = parseInt(params.get('page') || '0', 10);
            const size = parseInt(params.get('size') || '15', 10);

            if (entity) {
                logs = logs.filter(l => (l.entityName || '').toLowerCase().includes(entity.toLowerCase()));
            }
            if (action) {
                logs = logs.filter(l => (l.action || '').toLowerCase().includes(action.toLowerCase()) || (l.actionCode || '').toLowerCase().includes(action.toLowerCase()));
            }
            if (entityId) {
                logs = logs.filter(l => (l.entityId || '').toLowerCase().includes(entityId.toLowerCase()));
            }

            const totalElements = logs.length;
            const totalPages = Math.ceil(totalElements / size) || 1;
            const startIdx = page * size;
            const pagedContent = logs.slice(startIdx, startIdx + size);

            const allLogs = getStoredLogs();
            const entityOptions = Array.from(new Set(allLogs.map(l => l.entityName).filter(Boolean))).sort();
            const actionOptions = Array.from(new Set(allLogs.map(l => l.action).filter(Boolean))).sort();

            return jsonResp({
                content: pagedContent,
                totalElements,
                totalPages,
                currentPage: page,
                pageSize: size,
                isFirst: page === 0,
                isLast: page >= totalPages - 1,
                entityOptions,
                actionOptions
            });
        }

        // 8. Activity Log by ID
        if (path.match(/\/api\/activity-logs\/(\d+)$/) && method === 'GET') {
            const id = parseInt(path.match(/\/api\/activity-logs\/(\d+)$/)[1], 10);
            const log = getStoredLogs().find(l => l.id === id);
            return log ? jsonResp(log) : jsonResp({ message: 'Topilmadi' }, 404);
        }

        // 9. Activity Log Stats
        if (path.endsWith('/api/activity-logs/stats')) {
            const logs = getStoredLogs();
            return jsonResp({
                totalLogs: logs.length,
                todayLogs: logs.length,
                distinctEntities: new Set(logs.map(l => l.entityName)).size,
                readOnlyNotice: "Jurnal faqat o'qish uchun — yozuvlarni na interfeys, na API orqali o'zgartirib yoki o'chirib bo'lmaydi."
            });
        }

        // 10. Queue Summary
        if (path.endsWith('/api/queue/summary')) {
            return jsonResp({
                totalToday: 18,
                waitingWarehouse: 4,
                preparingWarehouse: 5,
                atDock: 3,
                completedKpp: 6,
                avgServiceTimeMinutes: 14.5
            });
        }

        // 11. Docks
        if (path.endsWith('/api/docks')) {
            return jsonResp(DEFAULT_DOCKS);
        }

        // 12. Active / Recent Queue Tickets
        if (path.includes('/api/queue/active') || path.includes('/api/queue/recent')) {
            return jsonResp([
                { id: 101, ticketNumber: 'A-014', awbNumber: '250-84920183', consignee: "OOO 'Silk Road Logistics'", status: 'CALLED', dockNumber: 1, cargoCategory: 'GENERAL', pieceCount: 18, totalWeightKg: 420.5, vehiclePlate: '01 A 777 AA' },
                { id: 102, ticketNumber: 'P-001', awbNumber: '250-99210482', consignee: "FE 'Green Oasis Express'", status: 'ISSUING', dockNumber: 2, cargoCategory: 'PERISHABLE', pieceCount: 6, totalWeightKg: 115.0, vehiclePlate: '01 B 888 BB' },
                { id: 103, ticketNumber: 'A-015', awbNumber: '250-77182901', consignee: "AO 'O\'zavtosanoat'", status: 'PREPARED', dockNumber: null, cargoCategory: 'OVERSIZED', pieceCount: 2, totalWeightKg: 1850.0, vehiclePlate: '01 C 999 CC' },
                { id: 104, ticketNumber: 'A-016', awbNumber: '250-33019284', consignee: "OOO 'Asia High-Tech'", status: 'PREPARING', dockNumber: null, cargoCategory: 'VALUABLE', pieceCount: 4, totalWeightKg: 38.0, vehiclePlate: '01 D 111 DD' }
            ]);
        }

        // 13. Awery Search
        if (path.includes('/api/awery/')) {
            return jsonResp({
                awbNumber: '250-84920183',
                consignee: "OOO 'Silk Road Logistics'",
                flightNumber: 'HY-532 (Istanbul)',
                pieceCount: 18,
                totalWeightKg: 420.5,
                category: 'GENERAL',
                location: 'Sklad 1, Rampa A, Yacheyka 14-B',
                releasePermitGranted: true,
                customsDeclarationNumber: 'CC-2026-99120',
                description: "To'qimachilik mahsulotlari va uskunalar"
            });
        }

        // Default empty response
        return jsonResp({ success: true });
    }

    // Intercept Global Fetch
    window.fetch = async function(url, options = {}) {
        const urlStr = (typeof url === 'string') ? url : (url && url.url ? url.url : '');

        // If on GitHub Pages, always use mock API for /api/
        if (isGhPages && (urlStr.startsWith('/api/') || urlStr.startsWith('api/') || urlStr.includes('/api/'))) {
            return handleMockApi(urlStr, options);
        }

        // Otherwise try real server first, fallback to mock if unreachable
        try {
            const res = await origFetch(url, options);
            if (res.status === 404 && (urlStr.startsWith('/api/') || urlStr.startsWith('api/'))) {
                return handleMockApi(urlStr, options);
            }
            return res;
        } catch (netErr) {
            if (urlStr.startsWith('/api/') || urlStr.startsWith('api/') || urlStr.includes('/api/')) {
                console.warn('Real API unreachable, using Mock API fallback for:', urlStr);
                return handleMockApi(urlStr, options);
            }
            throw netErr;
        }
    };

    console.log('TAS Cargo Mock API Engine active (GitHub Pages & Offline ready)');
})();
