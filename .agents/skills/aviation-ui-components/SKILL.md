---
name: aviation-ui-components
description: >-
  Ready-to-use, battle-tested UI component patterns and HTML/CSS snippets for aviation,
  airport logistics, and queue management applications. Use when creating or refining
  KPI stat cards, dock status matrix, queue tables, modal dialogs, and ticket printouts.
---

# Aviation & Logistics UI Component Library

This skill provides modular component blueprints for TAS Cargo QMS.

---

## 1. KPI Metric Card Component
```html
<div class="stat-card">
    <div class="stat-header">
        <span class="stat-label">Bugungi Jami Arizalar</span>
        <div class="stat-icon-badge">📦</div>
    </div>
    <div class="stat-value">142</div>
    <div class="stat-trend up">+18.4% <span>o'tgan smenaga nisbatan</span></div>
</div>
```

## 2. Universal Dock Status Matrix Card
```html
<div class="dock-card [occupied|free]">
    <div class="dock-card-top">
        <span class="dock-title">Dock 1 (Universal)</span>
        <span class="badge [badge-free|badge-busy]">BO'SH / BAND</span>
    </div>
    <div class="dock-body">
        <div class="dock-ticket-number">A-014</div>
        <div class="dock-vehicle-plate">01 777 AAA</div>
    </div>
    <div class="dock-footer">
        <span class="badge-cat">Barcha Toifalar (Universal)</span>
    </div>
</div>
```

## 3. High-Density Queue Data Table Row
```html
<tr>
    <td>
        <strong class="ticket-num [priority]">A-005</strong>
        <div class="priority-tag">PRIORITY</div>
    </td>
    <td class="font-mono text-bold">250-51253053</td>
    <td>Silk Road Logistics MCHJ</td>
    <td>12 dona · 450.5 kg</td>
    <td><span class="badge badge-general">GENERAL</span></td>
    <td class="font-mono text-plate">34 TR 8901</td>
    <td><span class="badge badge-status">DOKKA TAYYOR</span></td>
    <td>
        <button class="btn btn-action" onclick="callTicket(123)">Chaqirish</button>
    </td>
</tr>
```

## 4. Modal Dialog with Glass Backdrop
```html
<div class="modal-overlay">
    <div class="modal-box">
        <div class="modal-header">
            <h3>Talon Chop Etish</h3>
            <button class="modal-close">&times;</button>
        </div>
        <div class="modal-body">
            <!-- Ticket Content -->
        </div>
    </div>
</div>
```

## 5. Print-Ready Ticket Chek
- High contrast black-on-white layout.
- QR Code generated at 200x200px.
- Legible at thermal 80mm POS receipt printers.

