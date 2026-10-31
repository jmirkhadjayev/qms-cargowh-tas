---
name: premium-frontend-design
description: >-
  Standard and comprehensive guide for building professional, premium enterprise frontend
  user interfaces for the Tashkent Airport Cargo Queue Management System (TAS Cargo QMS).
  Use whenever creating, updating, or reviewing UI designs, CSS styling, color schemes,
  typography, responsive layouts, or accessibility standards.
---

# Premium Frontend Design System & UI Architecture

This skill defines the visual language, design tokens, and engineering principles required to deliver a world-class, premium enterprise UI for aviation and logistics operations.

---

## 1. Core Philosophy: Functional Enterprise Elegance

1. **Light & Crisp Base**:
   - Clean slate background (`#f8fafc` or `#fafafa`), never dirty grays.
   - Pure white card containers (`#ffffff`) with subtle 1px borders (`#e2e8f0` or `#e4e4e7`).
   - Deep contrast for critical operational data: Slate 900 (`#0f172a`) for primary text, Slate 500 (`#64748b`) for secondary labels.

2. **Typography Hierarchy**:
   - **Primary UI Font**: `Montserrat` or `Inter` (sans-serif) with weights 500 (body), 600 (labels), 700/800 (headings).
   - **Data & Numeric Font**: `JetBrains Mono` for all ticket numbers (`A-014`, `P-002`), AWB codes (`250-51253053`), weights, pieces, vehicle plates, timestamps, and flight numbers.
   - **Rule**: Never use ultra-thin weights (<400) for operational numbers. Ticket numbers must always be `font-weight: 800`.

3. **Color Tokens & Semantic Mapping**:
   ```css
   :root {
       /* Primary Brand: Aviation Corporate Blue */
       --primary: #2563eb;
       --primary-hover: #1d4ed8;
       --primary-light: #eff6ff;
       --primary-border: #bfdbfe;

       /* Priority / Expedited Cargo: Deep Amber/Gold */
       --priority-accent: #d97706;
       --priority-light: #fffbeb;
       --priority-border: #fde68a;

       /* Success / Ready / Arrived / Active: Emerald Green */
       --success: #059669;
       --success-light: #ecfdf5;
       --success-border: #a7f3d0;

       /* Warning / Waiting / Under Inspection: Warm Amber */
       --warning: #d97706;
       --warning-light: #fffbeb;

       /* Danger / Blocked / Discrepancy: Crimson */
       --danger: #dc2626;
       --danger-light: #fef2f2;
       --danger-border: #fecaca;
   }
   ```

4. **Input & Form Field Polish**:
   - Form fields must have 1px crisp borders (`#cbd5e1`), smooth focus ring (`box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12)`).
   - Placeholders must be distinct, soft, and light (`color: #94a3b8; opacity: 0.55; font-weight: 400;`), so operators immediately recognize empty fields versus filled fields.
   - Labels must be bold, concise, and upper/mixed case with `letter-spacing: 0.04em`.

5. **Tables & High-Density Views**:
   - Compact row heights (40–48px) for desktop operators.
   - Distinct table headers with soft Slate fill (`#f1f5f9`) and 1px border dividers.
   - Hover highlights on table rows (`background: #f8fafc; transition: background 0.12s ease;`).

---

## 2. Checklists Before Submitting Any UI Change

- [ ] **Contrast Check**: All text colors must pass WCAG AA contrast (minimum 4.5:1 ratio on their background). No faint `#eff6ff` on white backgrounds.
- [ ] **Data Precision**: All operational identifiers (AWB, Ticket, Flight) use monospace font.
- [ ] **Responsive Breakpoints**: Test at 1440px (Desktop), 1024px (Tablet/Dock Kiosk), and 768px (Mobile/Handheld scanner).
- [ ] **Touch Target Size**: On warehouse and dock screens, buttons and touch elements must be at least 42x42px.
- [ ] **Internationalization**: Support Uzbek and Russian terminology cleanly without truncation.

