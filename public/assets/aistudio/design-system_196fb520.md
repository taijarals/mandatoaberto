---
name: Civic Transparency Core
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#43474d'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#74777e'
  outline-variant: '#c3c6ce'
  surface-tint: '#49607c'
  primary: '#001428'
  on-primary: '#ffffff'
  primary-container: '#0f2942'
  on-primary-container: '#7991af'
  inverse-primary: '#b0c9e8'
  secondary: '#006a61'
  on-secondary: '#ffffff'
  secondary-container: '#86f2e4'
  on-secondary-container: '#006f66'
  tertiary: '#00161e'
  on-tertiary: '#ffffff'
  tertiary-container: '#002c39'
  on-tertiary-container: '#4599b6'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d1e4ff'
  primary-fixed-dim: '#b0c9e8'
  on-primary-fixed: '#011d35'
  on-primary-fixed-variant: '#314863'
  secondary-fixed: '#89f5e7'
  secondary-fixed-dim: '#6bd8cb'
  on-secondary-fixed: '#00201d'
  on-secondary-fixed-variant: '#005049'
  tertiary-fixed: '#b9eaff'
  tertiary-fixed-dim: '#81d1f0'
  on-tertiary-fixed: '#001f29'
  on-tertiary-fixed-variant: '#004d62'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Inter
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.005em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-lg-medium:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '500'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-md-medium:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 18px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.01em
  caption:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '400'
    lineHeight: 14px
  numeric-metric:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.02em
  numeric-table:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: 0em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-tablet: 1.5rem
  margin-desktop: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

This design system delivers an impartial, rigorous, and public-utility digital environment dedicated to monitoring the legislative performance, budget allocations, and formal agendas of Brazilian Federal Deputies. The visual direction balances institutional authority with civic accessibility, completely devoid of partisan aesthetic cues, judgmental gamification, scores, or editorial bias.

### Design Philosophy & Aesthetic Movements
- **Institutional Clarity:** Draws from modern democratic information architecture and data-journalism systems. Prioritizes raw factual intelligibility, data provenance, and clear audit trails over decorative flourishes.
- **Calm Utility:** Employs crisp borders, generous typographic hierarchy, and neutral surfaces to keep the focus squarely on financial ledgers, quorum attendances, and legislative records.
- **Structural Neutrality:** Avoids emotive color coding (e.g., green-for-good or red-for-bad metrics on budget spending). Performance is measured against factual baselines, standard deviations, and constitutional mandates without subjective ranking ribbons or podiums.

## Colors

The color palette reinforces constitutional sobriety, civic neutrality, and accessibility (WCAG AA/AAA compliance across text and graphical elements).

### Core Roles
- **Primary (`#0F2942`):** Institutional deep navy. Used for main action bars, global headers, definitive interactive targets, and structural anchors.
- **Secondary (`#0D9488`):** Deep civic teal. Reserved for verified data tags, active filtering states, primary chart series, and neutral emphasis.
- **Tertiary (`#0E7490`):** Marine slate. Employed for comparative data lines, secondary metric groupings, and auxiliary interactive highlights.
- **Neutral Core (`#0F172A`):** Deep slate-black for high-contrast primary typography and data values.

### Surface, Neutral & Boundary Scale
- **Canvas Neutral (`#F8FAFC`):** Default ambient background, reducing eye strain in high-density data views.
- **Card & Sheet Surface (`#FFFFFF`):** High-clarity white for content containers, ledger cards, data tables, and modal dialogs.
- **Subtle Surface (`#F1F5F9`):** Alternating table rows, input fields, and disabled chip backgrounds.
- **Muted Text / Secondary (`#475569`):** Subheadings, table column headers, and structural metadata.
- **Supporting Text / Tertiary (`#64748B`):** Captions, timestamps, legislative mandate disclaimers, and data source citations.
- **Border Structural (`#E2E8F0`):** Default hairline dividers, table grids, and card perimeters.
- **Border Active (`#CBD5E1`):** Hover states on neutral buttons and active input boundaries.

### Semantic & Informational Indicators
- **Factual Null / Without Record (`#94A3B8`):** Unfilled declarations, parliamentary recess periods, or unreleased receipts.
- **Informational Alert (`#E0F2FE` background / `#0369A1` text):** Clarifications on public data synchronization delays or legislative rectifications.
- **No Partisan Association:** Red, yellow, blue, or green are never utilized to imply moral approval or party affiliation. Metric comparisons rely solely on teal/slate bar fills, positional markers, and raw numeric differentials.

## Typography

The typography is built entirely on `Inter` to provide maximum clarity across tabular financial structures, parliamentary dates, legal texts, and administrative nomenclatures.

### Tabular Numbers & Formatting Standards
- **Font Feature Settings:** `font-feature-settings: 'tnum' 1, 'cv05' 1, 'zero' 1` must be applied to all monetary metrics, expense breakdowns, dates, percentages, and serial numbers. This prevents column jitter during live filtering and sorting.
- **Monetary Values:** Rendered in Brazilian Real format (`R$ 1.234.567,89`) with the currency symbol set at `font-weight: 500` and the amount at `font-weight: 700`.
- **Temporal Values:** Standardized to `DD/MM/AAAA` or `DD MMM AAAA` (abbreviated month, e.g., `14 OUT 2024`) for parliamentary sessions.
- **Hierarchy:** Restrained use of font weights—reserving `600` and `700` strictly for headers, key numeric totals, and active state indicators to maintain an editorial, unhurried reading environment.

## Layout & Spacing

The layout uses a 12-column responsive grid on desktop with a maximum content container width of `1280px`, scaling down cleanly to 8 columns on tablet and 4 columns on mobile viewports.

### Breakpoints & Adaptive Behavior
- **Mobile (< 640px):** 4 columns, `margin: 1rem` (`16px`), `gutter: 1rem` (`16px`). Multi-column comparison tables collapse to stacked metric cards or horizontally scrollable tabular panes with pinned identifier columns. The bottom comparison bar is persistently anchored above the system navigation bar.
- **Tablet (640px - 1023px):** 8 columns, `margin: 1.5rem` (`24px`), `gutter: 1rem` (`16px`). Grid items flex in 4/4 or 8-span arrangements. Filter controls shift from full modals to drawer overlays.
- **Desktop (1024px+):** 12 columns, `margin: 2rem` (`32px`), `gutter: 1.5rem` (`24px`). Side-by-side analytical grids (e.g., 4 columns for parliamentary dossier metadata, 8 columns for expense breakdown tables and historical trend bars).

### Spacing Rhythm
Built on an exact 4px/8px modular rhythm (`0.25rem` base). Internal card padding standardizes at `space-md` (`16px`) for mobile and `space-lg` (`24px`) for desktop data dashboards. Data rows maintain an uncrowded `48px` minimum touch/click target height.

## Elevation & Depth

Visual hierarchy uses flat, high-clarity surfaces with low-contrast structural borders, reserving ambient shadows only for transient layers (drawers, sticky comparative drawers, and dropdown filters).

### Elevation Hierarchy
- **Level 0 (Canvas Base):** Background color `#F8FAFC`. Zero elevation, zero shadow.
- **Level 1 (Cards, Ledger Tables, Metric Containers):** `#FFFFFF` surface enclosed by a continuous `1px solid #E2E8F0` border. Ambient shadow: `0px 1px 3px rgba(15, 23, 42, 0.04), 0px 1px 2px rgba(15, 23, 42, 0.02)`.
- **Level 2 (Interactive Hover & Filter Selectors):** Cards and active dropdown triggers on hover: `1px solid #CBD5E1` with shadow `0px 4px 6px -1px rgba(15, 23, 42, 0.06), 0px 2px 4px -2px rgba(15, 23, 42, 0.03)`.
- **Level 3 (Persistent Bottom Comparison Bar & Popovers):** `#FFFFFF` surface with an upper border `1px solid #E2E8F0` and elevated ambient shadow: `0px -4px 12px rgba(15, 23, 42, 0.08), 0px -1px 3px rgba(15, 23, 42, 0.04)`.
- **Level 4 (Modals & Sheet Overlays):** `#FFFFFF` with backdrop overlay `#0F172A` at 40% opacity (`rgba(15, 23, 42, 0.40)`). Shadow: `0px 20px 25px -5px rgba(15, 23, 42, 0.10), 0px 8px 10px -6px rgba(15, 23, 42, 0.05)`.

## Shapes

The design system adopts a calibrated medium roundedness standard (`Level 2`), establishing clean, structured, and modern forms that evoke stability and civil accountability.

### Shape Geometry Application
- **Default Elements (`0.5rem` / `8px`):** Input fields, standard interactive buttons, filter dropdowns, table outer wraps, and avatar masks (parliamentary photos adopt `8px` squircle cuts rather than playful circles to maintain dossier formality).
- **Cards & Data Modules (`rounded-lg` - `0.75rem` / `12px`):** Analytical containers, expense grouping cards, attendance metric boxes, and modal viewports.
- **Badges, Tags & Status Chips (`rounded-full` / `9999px`):** Compact metadata tags (e.g., federation unit `UF`, party acronym `PARTIDO`, verification pill).
- **Tab Bars & Bottom Sheets:** Bottom comparison bar utilizes top-only radii of `12px` (`rounded-t-lg`).

## Components

### Header with Civic Transparency Seal & Search
- **Structure:** Clean white bar (`#FFFFFF`), `1px solid #E2E8F0` lower border.
- **Transparency Seal:** Features an emblem of open public data paired with an official verification badge: uppercase `label-sm` reading "DADOS ABERTOS / CÂMARA DOS DEPUTADOS" with a subtle teal indicator dot (`#0D9488`).
- **Global Search:** Wide input box with slate search icon, placeholder "Buscar por nome do deputado, partido, UF ou proposição...", clear button (`X`), and auto-suggest overlay grouped by Deputy and Legislative Theme.

### Navigation Tabs with Metric Badges
- **Style:** Underlined or pill-segmented horizontal scroll container.
- **States:** Active tab features a bottom border `2px solid #0F2942` and `text-primary` (`#0F2942`) with `body-md-medium`. Inactive tabs use `text-secondary` (`#64748B`) with transparent border.
- **Badge:** Counter chip (`#F1F5F9` background, `#334155` text) indicating numerical count (e.g., "Proposições [42]"). Active tab badges transition to `#0F2942` fill with white text.

### Parliamentary Avatar Card
- **Avatar:** Formal official photo enclosed in an `8px` rounded frame (`48x48px` in lists, `80x80px` in profile dossier), bordered by `1px solid #E2E8F0`.
- **Dossier Text:** Full legislative name as `headline-sm`, followed by a row containing Party tag (`#0F2942` border, neutral background) and State/UF badge.
- **Mandate Context:** Clean metadata row displaying legislative status (Em Exercício / Suplente / Licenciado) using strictly neutral gray and teal indicators.

### Statistical Indicator Cards (Metric Cards)
- **Structure:** White container, `12px` radius, subtle border.
- **Elements:**
  1. *Header Label:* Uppercase `caption` in `#64748B` (e.g., "COTA PARLAMENTAR (CEAP)").
  2. *Primary Metric:* `numeric-metric` in `#0F172A` with tabular figures.
  3. *Temporal Subtext:* `caption` indicating reference period (e.g., "01/01/2024 a 31/10/2024").
  4. *Contextual Comparative:* A horizontal micro-bar showing deputy value vs. state or chamber average, labeled with objective delta percentages without qualitative labels like "bom" or "ruim".

### Accessible Bar Charts
- **Palette:** Primary series in `#0D9488` (Teal), secondary comparison series in `#0E7490` or `#94A3B8`.
- **Readability:** Explicit value labels rendered directly above bars using tabular numbers.
- **Grid Lines:** Thin horizontal rules in `#E2E8F0` with clear numeric axis markers at `10px` intervals. Focus state outlines individual bars with `2px solid #0F2942`.

### Data Table & Empty States
- **Table:** Row height `48px`, header row `#F8FAFC` with sticky position, sortable indicators on monetary and date columns. Alternating hover rows `#F8FAFC`.
- **Receipt Action:** Direct link to digital document receipt (NF-e/Ressarcimento) with external link icon.
- **Empty / Unrecorded State:** Dedicated container showing an outlined folder icon, title "Sem registros para o período selecionado" in `#0F172A`, and supporting note "Não constam notas fiscais ou lançamentos na base oficial da Câmara para o filtro aplicado."

### Modals & Year/Month Range Selectors
- **Modal Viewport:** Centered dialogue on desktop, bottom-sheet on mobile. Header contains explicit title and close action.
- **Filter Controls:** Dual-select row for Legislative Year (`2024`, `2023`, `2022`, ...) and Month (`Janeiro` - `Dezembro`), paired with clear "Redefinir Filtros" and "Aplicar" primary buttons.

### Persistent Comparison Dock (Bottom Bar)
- **Position:** Fixed at the screen bottom, z-index 100.
- **Capacity:** Slots for up to 3 deputies side-by-side with miniature avatars, names, and remove buttons (`X`).
- **Trigger:** A prominent primary action button "Comparar Gastos e Votações" (`#0F2942`) enabled when 2 or more deputies are pinned.