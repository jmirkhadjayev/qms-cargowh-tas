# TAS Cargo QMS — React 18 + Vite + Tailwind CSS + shadcn/ui

Toshkent Xalqaro Aeroporti (TAS Cargo) elektron navbat tizimining zamonaviy React frontend ilovasi.

## 🚀 Texnologiyalar Steki

- **Framework:** React 18 (TypeScript)
- **Bundler / Dev Server:** Vite 5
- **Styling:** Tailwind CSS + PostCSS + Autoprefixer
- **UI Komponentlar:** Radix UI primitives (`@radix-ui/react-slot`, `dialog`, `tabs`), shadcn/ui patternlari
- **Ikonkalar:** Lucide React (`lucide-react`)
- **WebSocket:** `@stomp/stompjs` + `sockjs-client`
- **Utility:** `clsx` + `tailwind-merge` (`cn` helper)

## 📁 Tuzilishi

```
frontend/
├── src/
│   ├── components/
│   │   ├── ui/             # shadcn/ui asosiy komponentlari (Button, Badge, Card...)
│   │   ├── Header.tsx      # Aeroport boshqaruv panelining yuqori paneli va soati
│   │   ├── StatCard.tsx    # KPI ko'rsatkich kartalari
│   │   └── DockMatrix.tsx  # Universal 6 ta rampa doklarining real-vaqt monitoringi
│   ├── lib/
│   │   └── utils.ts        # cn(...) klass birlashtiruvchi utility
│   ├── App.tsx             # Asosiy boshqaruv markazi va jonli navbat jadvali
│   ├── main.tsx            # React kirish nuqtasi
│   └── index.css           # Tailwind direktivalari va dizayn tokenlari
├── tailwind.config.js       # Korporativ ranglar va shriftlar
├── vite.config.ts           # Proxy orqali backend (port 8085) ga ulanish
└── package.json
```

## 🛠 Ishga tushirish

1. Paketlarni o'rnatish:
   ```bash
   cd frontend
   npm install
   ```

2. Dev serverni ishga tushirish (port 5173):
   ```bash
   npm run dev
   ```
   Brauzerda ochiladi: `http://localhost:5173`

3. Production uchun build qilish:
   ```bash
   npm run build
   ```
   Tayyor fayllar `frontend/dist/` jildiga yig'iladi.

