# CalorIQ — Modern Calorie & Macro Tracker

A fast, private, browser-based calorie and macronutrient tracker built with **100% Vanilla HTML, CSS, and JavaScript**.

Zero backend, zero external frameworks (no Tailwind), zero CSS variables, and zero build steps. All data is persisted directly in your browser's `localStorage`.

---

## ✨ Features

- **⚡ Daily Energy Balance & Dynamic Ring Gauge**:
  - Real-time SVG circular gauge calculating remaining calories, base goal, consumed calories, burned calories, and net intake (`Net = Consumed - Burned`).
  - Color-coded status indicator: *On Track*, *Near Target*, or *Over Budget*.

- **🥗 Macronutrient Breakdown**:
  - Live progress bars and gram targets for **Protein** (4 kcal/g), **Carbohydrates** (4 kcal/g), and **Fat** (9 kcal/g).

- **🥑 50+ Common Food Presets & Instant Search**:
  - Filterable library covering high-protein items, carbs/grains, fruits & vegetables, healthy fats, and beverages.
  - 1-click addition directly into Breakfast, Lunch, Dinner, or Snacks.

- **📝 Custom Food & Quick-Calorie Logging**:
  - Custom food modal with serving sizes, calories, and full macro breakdowns.
  - Quick-calorie entry mode for rapid logging on the go.

- **🏃 Active Exercise / Burn Tracker**:
  - Log physical activities and workouts to dynamically offset your daily calorie budget.
  - Quick preset suggestions (running, strength training, cycling, brisk walk).

- **💧 Hydration Tracker**:
  - One-tap water logging (`+250ml`, `+500ml`, `+750ml`, `-250ml`) with daily goal progress bar.

- **📅 Multi-Day Navigation & 7-Day Trend Chart**:
  - Date switcher (Previous Day, Next Day, Today jump, and HTML5 calendar date picker).
  - Interactive 7-day intake chart with clickable bars to inspect any previous day.

- **💾 Browser Persistence & Data Backup**:
  - Stored locally via `localStorage`.
  - **Export JSON**: Download a backup file of your entire log history and custom goals.
  - **Import JSON**: Restore your data on any device or browser without an account.

---

## 🚀 Getting Started

No installation, Node.js, or build tools required:

1. Clone or download this repository:
   ```bash
   git clone https://github.com/Wisdombalor/ADE-test.git
   ```
2. Open `index.html` in any modern web browser:
   - On macOS: double-click `index.html` or run:
     ```bash
     open index.html
     ```
   - On Windows: double-click `index.html` or run:
     ```cmd
     start index.html
     ```

---

## 🛠 Tech Stack

- **HTML5**: Semantic tags, accessibility attributes (`aria-*`), and modal dialogs.
- **Vanilla CSS**: Dark-mode glassmorphic aesthetic, custom SVG rings, responsive flexbox/grid layouts. **Zero CSS variables** used.
- **Vanilla JavaScript (ES6+)**: Pure client-side application logic and `localStorage` state management.

---

## 🔒 Privacy

All data remains strictly on your local device. No tracking, no cookies, and no servers.
