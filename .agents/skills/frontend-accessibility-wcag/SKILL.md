---
name: frontend-accessibility-wcag
description: >-
  WCAG 2.1 AA accessibility guidelines, color contrast verification, keyboard navigation,
  and screen readability for TAS Cargo QMS airport displays and control rooms.
  Use when designing or reviewing colors, focus indicators, labels, and text readability.
---

# Frontend Accessibility & Contrast Guidelines (WCAG 2.1 AA)

This skill ensures that all user interfaces for TAS Cargo QMS remain legible and accessible in all working environments (bright sunlight, terminal warehouses, night shifts).

---

## 1. Contrast Rules (No Faint Text)

1. **Light Mode Minimum Contrast**:
   - Primary text (`#0f172a` Slate 900) on white background: **16.1:1** (Passes AAA).
   - Secondary text (`#475569` Slate 600) on white background: **7.0:1** (Passes AAA).
   - Ticket numbers (`#1d4ed8` Deep Blue): **6.3:1** (Passes AA).
   - Priority numbers (`#d97706` Dark Amber): **4.6:1** (Passes AA).
   - **STRICT PROHIBITION**: Never use `--primary-light` (`#eff6ff`) or white (`#ffffff`) as a text color on light backgrounds.

2. **Form Accessibility**:
   - Every input MUST have an associated `<label for="...">`.
   - Focus states MUST have a visible 3px outline or ring:
     ```css
     input:focus, select:focus, button:focus-visible {
         outline: none;
         border-color: #2563eb;
         box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.18);
     }
     ```
   - Placeholder text is purely an auxiliary hint and must not replace labels.

3. **Color Blindness Safety (Redundant Encoding)**:
   - Status indicators must not rely solely on color. Always pair a color with a text badge or symbol:
     - 🟢 Yashil + "TAYYOR" / "APPROVED"
     - 🟡 Sariq + "KUTMOQDA" / "WAITING"
     - 🔴 Qizil + "RAD ETILDI" / "BLOCKED"

