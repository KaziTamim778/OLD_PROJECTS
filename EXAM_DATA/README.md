<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Quantum Practice Analytics Dashboard

A **dark-themed, military-tactical-styled** performance tracking and exam analytics web application built for two students — **Tamim** and **Tanvir** — preparing for higher-education admission exams in Bangladesh (BUET, DU, Medical, KUET, CUET, etc.). The dashboard monitors practice problem-solving across **Physics, Chemistry, and Mathematics**, tracks competitive exam results, archives board exam history, and celebrates academic milestones — all wrapped in a futuristic "Ops Center / Tactical HUD" aesthetic.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Pages & Components](#2-pages--components)
3. [Design System](#3-design-system)
4. [Functionality & Interactivity](#4-functionality--interactivity)
5. [Data Architecture](#5-data-architecture)
6. [Tech Stack](#6-tech-stack)
7. [Glossary of Technical Terms](#7-glossary-of-technical-terms)
8. [Running Locally](#8-running-locally)

---

## 1. Project Overview

**Quantum Practice Analytics** is a single-page React application with five distinct "zones" (pages), navigated via a fixed right-side sidebar. No routing library is used — each zone is conditionally rendered based on the active page state. The overall visual identity is a dark zinc/charcoal base with subject-specific accent color themes and neon glow effects, heavily inspired by video-game HUDs.

### The Five Zones

| Zone | Code Name | Purpose |
|---|---|---|
| Profile | The Gladiators | Player identity cards, mission progress, global overview widgets |
| War | The War | Admission exam performance comparison & timeline |
| Archive | The Ruins | Historical SSC/HSC board exam data |
| Practice | The Dojo | Problem-solving volume, chapter breakdown, type distribution |
| Trophies | Hall of Fame | Varsity merit ranks, board results, olympiad prizes |

---

## 2. Pages & Components

### The Dojo (Default / Practice Page)

The main analytics hub. It renders four sub-components stacked vertically:

- **MasteryKPI** — The hero card. Displays the total number of problems solved (large animated counter), a mini area sparkline chart (first 10 chapters), MCQ count with a progress bar, and a Paper 1 vs Paper 2 split shown as 12 stacked micro-bars.
- **TypeComparison** — A donut pie chart breaking down problems by type (MCQ, CQ, Written), with percentage labels and a text breakdown column on the left.
- **ChapterChart** — A full-width area chart plotting problem volume per chapter, with a custom hover tooltip showing the MCQ/CQ/Written breakdown for each individual chapter.
- **ChapterLedger** — A collapsible, searchable, sortable data table of all chapters (35 total across all subjects). Columns: Code, Name, MCQ, CQ, Written, Total. Subject rows are color-coded blue/emerald/violet.
- **PaperSummary** — A second donut chart showing the Paper 1 vs Paper 2 split more prominently, with descriptive info cards.

A **SubjectTabs** bar at the top lets the user filter all Dojo content to "All Subjects", "Physics", "Chemistry", or "Math". Switching subjects changes the entire color theme of the page.

---

### The Gladiators (Profile Page)

The player identity and overview page. Contains:

- **Real-time clock** — Live digital clock updating every second with full date display.
- **PlayerCard** — Large tactical profile cards for each player. Shows name, rank tier, motto, Udvash roll number, and institution. Hovering rotates and scales the initials box.
- **PlayerDetailModal** — Clicking a player card opens a full-screen modal overlay with a "Neural HUD" layout: left panel has identity metrics and an access-level progress bar; right panel shows academic identification details and verdict text. Closed with a top-right X button.
- **MissionCard** — Four status cards showing ongoing missions (e.g., "Mastery Threshold", "Exam Readiness") with progress bars and sync percentages.
- **Performance Metrics Banner** — Three summary info cards with icons (Binary code, BarChart, Shield).
- **Global Overview Widgets** — Four mini-charts, one for each other zone:
  - Dojo Volume → RadialBarChart (circular bar comparison)
  - War Momentum → LineChart (exam efficiency trend)
  - Ruins Mastery → RadarChart (subject spread comparison)
  - Hall of Fame → Animated counters for trophy counts

---

### The War (Admission Exams Page)

Head-to-head and individual analysis of live admission exam results:

- **3-column HUD header**: combatant stats (aggregated scores, victories, peak rank), a RadarChart for tactical spread (5 axes: Consistency, Efficiency, Volume, Peak Rank, Win Rate), and a "Battle Intelligence" text verdict block.
- **Mode toggle (WarTabs)**: Switch between "Operator: Tamim", "Operator: Tanvir", or "H2H Comparison" view.
- **Efficiency Trajectory Area Chart**: X-axis = exam timeline (chronological order), Y-axis = percentage score. In comparison mode, two colored area lines render simultaneously with a slight bounce-in animation.
- **Custom Tooltip**: On hover over any data point, shows the exam name, date, both players' obtained marks and merit ranks.

---

### The Ruins (Archived Exams Page)

Historical board exam performance (SSC 2023 / HSC 2025):

- **Phase toggle**: Switch between SSC and HSC datasets.
- **Profile toggle**: Filter to Tamim, Tanvir, or combined view.
- **3-column HUD header**: aggregated era averages, a RadarChart by subject, and an "Era Intelligence" verdict.
- **Efficiency Trajectory Area Chart**: Same style as The War page but for board exam history.
- Custom tooltip showing "Recovered Data" for each archived exam point.

---

### Hall of Fame (Trophies Page)

Academic achievements and official results:

- **Mode toggle**: "Global" (comparison), "Tamim", or "Tanvir".
- **University Pedestals** — Grid of HofCard components for 13 universities/programs (BUET, DU, Medical, KUET, CUET, etc.). Each card shows merit rank, GPA coefficient, and optional peer comparison. Cards gray out when no data is available.
- **Merit Convergence Profile** — AreaChart with two lines (Tamim in white, Tanvir in amber) showing merit density over time.
- **Board Archives** — HofCard components for SSC and HSC official results (subject-by-subject).
- **Artifact Gallery** — Styled table of olympiad/competition prizes, each row showing event name, subject, and placement (1st/2nd/3rd) with amber hover highlight.

---

### Sidebar

Fixed on the right edge of the viewport. Five icon buttons using Lucide icons:

| Icon | Page |
|---|---|
| User | The Gladiators (Profile) |
| Swords | The War |
| Archive | The Ruins |
| Flame | The Dojo |
| Trophy | Hall of Fame |

Active page is indicated by a white bar on the right edge of the button and a white glow drop shadow. Hovering any button reveals an animated tooltip label on the left.

---

## 3. Design System

### Color Palette

The app uses a **zinc-based dark monochrome** foundation with four subject-specific accent themes that swap out dynamically.

#### Base Neutral Colors

| Role | Hex | Tailwind Class |
|---|---|---|
| Darkest background | `#09090b` | `zinc-950` / `black` |
| Card background | `#18181b` | `zinc-900` |
| Border / secondary bg | `#27272a` | `zinc-800` |
| Muted text | `#71717a` | `zinc-500` |
| Secondary text | `#a1a1aa` | `zinc-400` |
| Primary text | `#f4f4f5` | `zinc-100` |
| Highlight white | `#ffffff` | `white` |

#### Subject Theme Accents

| Subject | Primary | Secondary | Accent | Highlight |
|---|---|---|---|---|
| Physics | `#1e3a8a` (deep blue) | `#3b82f6` (blue-500) | `#93c5fd` (blue-300) | `#22d3ee` (cyan) |
| Chemistry | `#064e3b` (deep emerald) | `#10b981` (emerald-500) | `#6ee7b7` (emerald-300) | `#5eead4` (teal) |
| Math | `#4c1d95` (deep violet) | `#8b5cf6` (violet-500) | `#c4b5fd` (violet-300) | `#e879f9` (fuchsia) |
| All (default) | `#18181b` | `#27272a` | `#71717a` | `#ffffff` |

#### Special / Accent Colors

| Use | Hex |
|---|---|
| Tamim (War page) | `#818cf8` (indigo) |
| Tanvir (War page) | `#2dd4bf` (teal) |
| Hall of Fame gold | `#fbbf24` (amber-400) |
| Active status | `#34d399` (emerald-400) |
| Error / danger | `#ef4444` (red-500) |

#### Background Ambient Effect

Each page has a large radial gradient blurred circle (150px blur, 10% opacity) anchored to the top-left of the viewport. It shifts to amber/gold on the Hall of Fame page and white on all others, creating a subtle scene-light effect.

---

### Charts & Graphs

| Chart Type | Component(s) | Library | Purpose |
|---|---|---|---|
| Area Chart | MasteryKPI, ChapterChart, TheWar, TheRuins, HallOfFame | Recharts `AreaChart` | Volume over time / efficiency trajectory |
| Donut Chart | TypeComparison, PaperSummary | Recharts `PieChart` | Proportional part-to-whole distributions |
| Radar Chart | TheWar, TheRuins, TheGladiators | Recharts `RadarChart` | Multi-axis performance spread |
| Radial Bar Chart | TheGladiators | Recharts `RadialBarChart` | Circular comparative volume (Tamim vs Tanvir) |
| Line Chart | TheGladiators | Recharts `LineChart` | Momentum trend (two players over time) |
| Mini Sparkline | MasteryKPI | Recharts `AreaChart` | Compact hero-card trend indicator |
| Micro-bar grid | MasteryKPI | Custom `div` grid | Paper 1 vs 2 split per chapter (12 bars) |

All charts use `ResponsiveContainer` (100% width), animated entry (`animationDuration` 1500–2500ms), gradient area fills via SVG `<defs>`, and custom dark-styled tooltip components.

---

### Data Tables

**ChapterLedger** is the only full data table in the app:
- Columns: Code · Name · MCQ · CQ · Written · Total
- Sortable by any column (click header toggles asc/desc, shown with ↑↓↕ indicators)
- Real-time search filter input
- Rows color-coded by subject: blue (Physics), emerald (Chemistry), violet (Math)
- Collapses by default and slides open on button click

---

### Hover Effects & Animations

| Effect | Location | Implementation |
|---|---|---|
| Tooltip fade-in | Sidebar navigation | Tailwind `opacity-0 group-hover:opacity-100 transition-opacity` |
| Card glow | PlayerCard, MissionCard | Inline `boxShadow: '0 0 20px [color]22'` with `transition-all` |
| Initials box rotate | PlayerCard | `rotate-3 group-hover:rotate-0 scale-105` |
| Grayscale reveal | Dojo chart cards | `grayscale group-hover:grayscale-0 opacity-40 group-hover:opacity-100` |
| Chart dot enlarge | ChapterChart | Animated `r: 4 → 6` on cursor hover |
| Row highlight | ChapterLedger | `hover:bg-[color]/5 transition-colors` |
| Progress bar fill | MissionCard, MasteryKPI | `transition-all duration-1000 w-[X%]` |
| Scale on hover | Various buttons | `hover:scale-105 transition-transform` |
| Pulse animation | Status dots, DummyPage | `animate-pulse` |
| Bounce animation | War chart lines | `animate-bounce` with staggered `animation-delay` |
| Fade + slide-in | Page entry | `animate-in fade-in slide-in-from-bottom-4 duration-700` |
| Modal backdrop | PlayerDetailModal | `opacity-0 → opacity-100` fade transition |
| Scroll progress bar | Top of viewport | Width grows from 0%→100% as user scrolls, with glow |

---

## 4. Functionality & Interactivity

### Navigation

- No URL-based routing. The `activePage` state in `App.tsx` controls which component renders.
- Sidebar calls `onNavigate(pageId)` which updates `activePage`.
- The scroll progress bar at the top reflects the user's vertical scroll position on the current page.

### Subject Filtering

- The `SubjectTabs` component at the top of The Dojo page updates `activeSubject` state.
- This simultaneously changes the **color theme** of every child component on the page (MasteryKPI, TypeComparison, ChapterChart, ChapterLedger, PaperSummary) and **filters the dataset** to only show chapters belonging to the selected subject.

### Mode Switching (War, Ruins, Hall of Fame)

- `WarTabs` and custom toggle buttons in TheRuins and HallOfFame change local `activeMode` state.
- This re-filters the data array and re-renders charts with the appropriate player's or combined dataset.

### ChapterLedger Interactions

1. Click **toggle button** → ledger slides open/closed with status indicator changing emerald → red.
2. Click any **column header** → sorts rows ascending; click again → descending; third click → resets.
3. Type in **search box** → filters visible rows in real-time (case-insensitive match on chapter name).

### Player Detail Modal

- Click either PlayerCard → `selectedPlayer` state is set → modal fades in with full player data.
- Click X button or press outside area → `selectedPlayer` set to null → modal closes.
- The modal contains a custom scrollbar (`custom-scrollbar` CSS class) for long content.

### Real-time Clock

- `useEffect` with `setInterval(1000)` inside TheGladiators → re-renders date/time string every second.
- Displays: full weekday, date, month, year, and `HH:MM:SS` time.

### Animated Counters

- Custom counter component uses `useEffect` with `setInterval` to increment a value from 0 to the target over ~1 second, producing a smooth "counting up" number animation on page load.

### Data Handling

- All data is **static and hardcoded** in `.ts` files under `data/`. No API calls, no external fetching.
- Data is imported directly and filtered/aggregated inside components or passed via props.
- Computed values (totals, averages, victory counts, percentages) are all derived inline using `.reduce()`, `.filter()`, and `.map()` on the static arrays.

---

## 5. Data Architecture

```
data/
├── practiceData.ts    → 35 chapters across 3 subjects with MCQ/CQ/Written counts
├── profiles.ts        → Identity metadata for Tamim & Tanvir (ID, roll, institution, motto)
├── admissionExams.ts  → ~30 admission exam results (BUET, DU, Medical, KUET, CUET, etc.)
├── archivedExams.ts   → SSC (2023) and HSC (2025) board exam breakdowns
└── hallOfFame.ts      → Varsity merit ranks, GPA results, competition prizes
```

### Subject Data Summary

| Subject | Chapters | Total Problems |
|---|---|---|
| Physics | 15 | ~7,500 |
| Chemistry | 8 | ~6,943 |
| Math | 12 | ~9,487 |
| **Total** | **35** | **~23,930** |

### Problem Types

| Type | Abbrev | Description |
|---|---|---|
| Multiple Choice Question | MCQ | Single correct option questions |
| Concept Question | CQ | Short analytical/conceptual questions |
| Written | WRT | Full calculation/proof-based problems |

---

## 6. Tech Stack

| Tool | Version | Role |
|---|---|---|
| React | 19.2.4 | UI framework |
| TypeScript | 5.8.2 | Type safety |
| Vite | 6.2.0 | Build tool & dev server (port 3000) |
| Recharts | 3.7.0 | All charts and graphs |
| Lucide React | 0.460.0 | Icon set (sidebar, cards, buttons) |
| Tailwind CSS | (via PostCSS) | Utility-first styling |
| `@vitejs/plugin-react` | 5.0.0 | Vite plugin for React fast refresh |

---

## 7. Glossary of Technical Terms

### Components & Architecture

| Term | Meaning |
|---|---|
| **Component** | A reusable, self-contained piece of UI written as a TypeScript function that returns HTML-like JSX markup. |
| **Props** | Short for "properties" — data passed from a parent component into a child component, like function arguments. |
| **State** | A component's internal memory. When state changes (e.g., `activePage`), React re-renders the component to reflect the new value. |
| **useEffect** | A React hook that runs side-effect code (like timers or subscriptions) after a component renders. Used here for the live clock and animated counters. |
| **Conditional Rendering** | Showing different UI based on a condition — here, entire pages and modals are shown/hidden based on state values. |
| **ResponsiveContainer** | A Recharts wrapper that makes a chart resize automatically to fill its parent element's width/height. |
| **Custom Tooltip** | A hand-crafted React component passed to Recharts that replaces the default tooltip popup with custom styled HTML. |

### Design & Styling

| Term | Meaning |
|---|---|
| **Tailwind CSS** | A utility-first CSS framework where you style elements by composing small single-purpose class names directly in JSX (e.g., `bg-zinc-900 text-white rounded-lg`). |
| **Utility Class** | A single-purpose CSS class in Tailwind, like `flex`, `p-4`, `text-lg`, or `opacity-50`. |
| **`group` / `group-hover`** | A Tailwind pattern where a parent element is marked `group` and child elements use `group-hover:` to trigger styles when the *parent* is hovered, not just the element itself. |
| **`transition-all`** | A Tailwind class that enables smooth CSS transitions on all animatable properties when they change. |
| **`animate-pulse`** | A Tailwind built-in animation that fades an element's opacity in and out repeatedly — used for status dots and loading indicators. |
| **`animate-bounce`** | A built-in Tailwind animation that moves an element up and down — used on chart data lines in The War page. |
| **Radial Gradient** | A CSS gradient that radiates outward from a central point. Used for the ambient background glow on each page. |
| **`drop-shadow`** | A Tailwind/CSS filter that adds a shadow around an element's visible pixels (including transparent edges), used for icon glows in the sidebar. |
| **`backdrop-blur`** | A CSS filter applied to the *background behind* an element, creating a frosted-glass translucency effect on modals and cards. |
| **`boxShadow` (inline style)** | CSS property creating a glow or shadow around an element's border box. Used dynamically with theme colors (e.g., `0 0 20px #22d3ee22`). |
| **Hex Color Alpha** | The last two characters in an 8-digit hex color (e.g., `#22d3ee22`) represent opacity — `22` in hex ≈ 13% opacity, `44` ≈ 27%, `88` ≈ 53%. |
| **`grayscale` / `grayscale-0`** | Tailwind classes that apply/remove a CSS grayscale filter — used for a "de-emphasized → highlighted" reveal effect on hover. |
| **Zinc** | The Tailwind color scale chosen as the base neutral. Zinc is a slightly cooler, more neutral gray compared to Tailwind's `gray` or `slate` scales. |

### Charts & Data Visualization

| Term | Meaning |
|---|---|
| **AreaChart** | A line chart where the area between the line and the X-axis is filled, emphasizing volume and trends over time. |
| **PieChart (Donut)** | A circular chart divided into segments proportional to data values. A "donut" chart has an empty center hole (set via `innerRadius`). |
| **RadarChart** | A circular chart with multiple axes radiating from the center, where each axis represents a different metric. The plotted shape shows relative performance across all dimensions simultaneously. |
| **RadialBarChart** | Circular bars arranged around a center point. Each bar's arc length represents its value — used here to compare total volumes between two players. |
| **`paddingAngle`** | In a Recharts PieChart, the gap in degrees between each segment — adds visual separation between slices. |
| **Gradient Fill** | In AreaCharts, a color that transitions from a solid color at the top line to fully transparent at the bottom, defined using SVG `<linearGradient>` and `<stop>` elements inside `<defs>`. |
| **`PolarGrid`** | Background concentric rings and spoke lines drawn inside a RadarChart to aid reading. |
| **`PolarAngleAxis`** | The axis labels placed around the outer ring of a RadarChart, naming each dimension. |
| **`animationDuration`** | Recharts prop (in milliseconds) that controls how long the chart takes to draw itself on first render. |
| **Sparkline** | A tiny chart with no axes or labels, used inline within a card to show a data trend at a glance. |

### Data & Logic

| Term | Meaning |
|---|---|
| **Static Data** | Data that is hardcoded in `.ts` files and does not change at runtime. The app has no backend or live database — all numbers are fixed. |
| **`.reduce()`** | A JavaScript array method that accumulates all array elements into a single value — used here to sum up total problems, calculate averages, etc. |
| **`.filter()`** | A JavaScript array method that returns a new array containing only elements matching a condition — used for subject filtering and player filtering. |
| **`.map()`** | A JavaScript array method that transforms each element and returns a new array — used extensively for rendering lists of cards, rows, and chart data points. |
| **Derived Value** | A computed number calculated from raw data on-the-fly, rather than stored separately. For example, `total problems = sum of all chapter totals`. |
| **MCQ** | Multiple Choice Question — exam format with 4 options and 1 correct answer. Common in Bangladesh's national admission exams. |
| **CQ** | Creative/Concept Question — a structured multi-part analytical question, standard in SSC/HSC board exams in Bangladesh. |
| **Merit Rank** | A student's position on the official university admission merit list, sorted by exam score. Lower number = better rank. Displayed as branch-specific or central (university-wide). |
| **Branch Merit** | Merit rank within a specific department/program (e.g., CSE, EEE) versus the university-wide central rank. |
| **GPA** | Grade Point Average — the standard academic grade scale in Bangladesh (0–5). A `5.0 GPA` is equivalent to an A+ in all subjects. |
| **SSC / HSC** | Secondary School Certificate (Grade 10 board exam) and Higher Secondary Certificate (Grade 12 board exam) — the two national public exams before university in Bangladesh. |
| **Udvash** | A prominent coaching institute in Bangladesh for university admission preparation. "Udvash ID" is the student's enrollment roll number at that institute. |

### React-Specific Patterns

| Term | Meaning |
|---|---|
| **Hook** | A special React function (prefixed with `use`) that lets function components access React features like state and lifecycle. Examples: `useState`, `useEffect`. |
| **`useState`** | The most common React hook — declares a state variable and a function to update it. Changing it triggers a re-render. |
| **Callback Prop** | A function passed as a prop from a parent to a child, so the child can communicate back up — e.g., `onNavigate` passed to Sidebar. |
| **Prop Drilling** | Passing data through multiple component layers via props. This app uses prop drilling rather than a global state solution (no Redux or Context). |
| **`key` prop** | A unique identifier React requires on list items (`.map()` renders) to efficiently track which items changed, added, or removed. |
| **Fragment** | A React wrapper (`<>...</>`) that groups multiple elements without adding an extra `<div>` to the DOM. |

---

## 8. Running Locally

**Prerequisites:** Node.js (v18+)

```bash
# Install dependencies
npm install

# Start development server (http://localhost:3000)
npm run dev

# Build for production
npm run build
```

No API keys or environment variables are required — the app is fully self-contained with static data.

---

<div align="center">
<sub>QUANTUM_PRACTICE_ANALYTICS • TRAINING_GROUNDS_S4 • © 2026</sub>
</div>
