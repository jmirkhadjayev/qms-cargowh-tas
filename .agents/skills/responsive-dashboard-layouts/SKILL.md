---
name: responsive-dashboard-layouts
description: >-
  Responsive CSS Grid and Flexbox layout patterns tailored for aviation dispatch,
  multi-monitor airport setups, mobile terminal handhelds, and dock rampa screens.
  Use when designing or adjusting layout structures, split-screens, and dashboard grids.
---

# Responsive Airport Dashboard & Grid Architecture

This skill defines responsive layout guidelines for TAS Cargo QMS.

---

## 1. Grid Systems by Viewport

1. **Large Desktop (1440px - 4K)** - Central Dispatcher & Control Tower:
   - 4-column KPI metric summary (`grid-template-columns: repeat(4, 1fr)`).
   - Split layout: 1.8fr primary queue table + 1.2fr live dock matrix.
   - Max container width: 1400px centered or fluid 96vw.

2. **Laptop / Standard Workstation (1024px - 1366px)** - Registration Agent & Cashier:
   - 2-column split: Left 55% registration form, Right 45% recent tickets & print receipts.
   - 2-column or 3-column KPI metrics.

3. **Touchscreen Kiosks & Tablets (768px - 1024px)** - Dock Rampa & Warehouse Forklift:
   - 1-column stacked cards with minimum 48px touch targets.
   - Horizontal scrolling queue pills with swipe navigation.

4. **Mobile Handheld (360px - 480px)** - KPP Gate Scanner & Barcode Reader:
   - Full-width scan viewport with high contrast validation badge (Green APPROVED / Red BLOCKED).

---

## 2. Universal Layout Template
```css
.dashboard-grid {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 20px;
}

@media (max-width: 1100px) {
    .dashboard-grid {
        grid-template-columns: 1fr;
    }
}
```
