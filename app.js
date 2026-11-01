/**
 * CALORIQ — Modern Browser-Based Calorie & Macro Tracker
 * Vanilla JavaScript (ES6+) with Persistent LocalStorage
 */

(function () {
  'use strict';

  // --- Storage Key ---
  const STORAGE_KEY = 'caloriq_storage_v1';

  // --- Preloaded Food & Drink Database (50+ Items) ---
  const PRESET_FOODS = [
    // High Protein
    { id: 'p1', name: 'Grilled Chicken Breast', cat: 'protein', emoji: '🍗', serving: '150g', cal: 245, p: 46, c: 0, f: 5 },
    { id: 'p2', name: 'Scrambled Eggs (2 large)', cat: 'protein', emoji: '🍳', serving: '2 eggs (100g)', cal: 144, p: 12, c: 1, f: 10 },
    { id: 'p3', name: 'Egg Whites (4 large)', cat: 'protein', emoji: '🥚', serving: '130g', cal: 68, p: 14, c: 1, f: 0 },
    { id: 'p4', name: 'Whey Protein Shake', cat: 'protein', emoji: '🥤', serving: '1 scoop (30g)', cal: 120, p: 24, c: 2, f: 1.5 },
    { id: 'p5', name: 'Atlantic Salmon Fillet', cat: 'protein', emoji: '🐟', serving: '150g baked', cal: 310, p: 34, c: 0, f: 18 },
    { id: 'p6', name: 'Greek Yogurt 0% Fat', cat: 'protein', emoji: '🥣', serving: '200g cup', cal: 118, p: 20, c: 7, f: 0 },
    { id: 'p7', name: 'Lean Ground Beef (90/10)', cat: 'protein', emoji: '🥩', serving: '150g cooked', cal: 260, p: 39, c: 0, f: 11 },
    { id: 'p8', name: 'Canned Albacore Tuna', cat: 'protein', emoji: '🐟', serving: '1 can (120g drained)', cal: 130, p: 30, c: 0, f: 1 },
    { id: 'p9', name: 'Cottage Cheese (Low Fat)', cat: 'protein', emoji: '🧀', serving: '150g', cal: 120, p: 18, c: 5, f: 2.5 },
    { id: 'p10', name: 'Sirloin Steak (Trimmed)', cat: 'protein', emoji: '🥩', serving: '150g grilled', cal: 285, p: 42, c: 0, f: 12 },
    { id: 'p11', name: 'Tofu (Firm Organic)', cat: 'protein', emoji: '🧊', serving: '150g', cal: 125, p: 15, c: 3, f: 7 },
    { id: 'p12', name: 'Turkey Breast Slices', cat: 'protein', emoji: '🥪', serving: '100g deli', cal: 104, p: 22, c: 2, f: 1 },

    // Grains & Carbs
    { id: 'c1', name: 'Rolled Oatmeal', cat: 'carbs', emoji: '🥣', serving: '50g dry (1 bowl)', cal: 190, p: 6.5, c: 34, f: 3 },
    { id: 'c2', name: 'Cooked Jasmine White Rice', cat: 'carbs', emoji: '🍚', serving: '1 cup (150g)', cal: 195, p: 4, c: 43, f: 0.5 },
    { id: 'c3', name: 'Cooked Brown Rice', cat: 'carbs', emoji: '🍚', serving: '1 cup (150g)', cal: 165, p: 3.5, c: 35, f: 1.5 },
    { id: 'c4', name: 'Baked Sweet Potato', cat: 'carbs', emoji: '🍠', serving: '1 medium (150g)', cal: 135, p: 3, c: 31, f: 0.2 },
    { id: 'c5', name: 'Whole Wheat Sourdough Bread', cat: 'carbs', emoji: '🍞', serving: '2 slices (80g)', cal: 170, p: 8, c: 32, f: 1.5 },
    { id: 'c6', name: 'Cooked Quinoa', cat: 'carbs', emoji: '🌾', serving: '1 cup (185g)', cal: 222, p: 8, c: 39, f: 3.5 },
    { id: 'c7', name: 'Spaghetti Pasta (Cooked)', cat: 'carbs', emoji: '🍝', serving: '150g', cal: 235, p: 8, c: 46, f: 1.2 },
    { id: 'c8', name: 'English Muffin', cat: 'carbs', emoji: '🥯', serving: '1 whole muffin', cal: 130, p: 5, c: 25, f: 1 },
    { id: 'c9', name: 'Black Beans (Cooked)', cat: 'carbs', emoji: '🫘', serving: '1/2 cup (120g)', cal: 115, p: 7.5, c: 20, f: 0.5 },
    { id: 'c10', name: 'Crisp Rice Cakes', cat: 'carbs', emoji: '🍘', serving: '2 cakes (18g)', cal: 70, p: 1.5, c: 15, f: 0.5 },

    // Fruits & Vegetables
    { id: 'v1', name: 'Medium Ripe Banana', cat: 'fruit', emoji: '🍌', serving: '1 medium (118g)', cal: 105, p: 1.3, c: 27, f: 0.3 },
    { id: 'v2', name: 'Fresh Honeycrisp Apple', cat: 'fruit', emoji: '🍎', serving: '1 medium (180g)', cal: 95, p: 0.5, c: 25, f: 0.3 },
    { id: 'v3', name: 'Fresh Blueberries', cat: 'fruit', emoji: '🫐', serving: '1 cup (148g)', cal: 84, p: 1.1, c: 21, f: 0.5 },
    { id: 'v4', name: 'Fresh Strawberries', cat: 'fruit', emoji: '🍓', serving: '1 cup (150g)', cal: 49, p: 1, c: 11.5, f: 0.5 },
    { id: 'v5', name: 'Steamed Broccoli Florets', cat: 'fruit', emoji: '🥦', serving: '150g', cal: 52, p: 4, c: 10, f: 0.5 },
    { id: 'v6', name: 'Baby Spinach (Raw)', cat: 'fruit', emoji: '🥬', serving: '100g salad', cal: 23, p: 2.9, c: 3.6, f: 0.4 },
    { id: 'v7', name: 'Cherry Tomatoes', cat: 'fruit', emoji: '🍅', serving: '1 cup (150g)', cal: 27, p: 1.3, c: 5.8, f: 0.3 },
    { id: 'v8', name: 'Sweet Orange / Clementine', cat: 'fruit', emoji: '🍊', serving: '1 medium (130g)', cal: 62, p: 1.2, c: 15.4, f: 0.2 },
    { id: 'v9', name: 'Crisp Cucumber Slices', cat: 'fruit', emoji: '🥒', serving: '100g', cal: 15, p: 0.7, c: 3.6, f: 0.1 },

    // Healthy Fats
    { id: 'f1', name: 'Fresh Hass Avocado', cat: 'fats', emoji: '🥑', serving: '1/2 avocado (100g)', cal: 160, p: 2, c: 8.5, f: 14.7 },
    { id: 'f2', name: 'Raw Whole Almonds', cat: 'fats', emoji: '🥜', serving: '1 handful (30g)', cal: 175, p: 6, c: 6, f: 15 },
    { id: 'f3', name: 'Extra Virgin Olive Oil', cat: 'fats', emoji: '🫒', serving: '1 tablespoon (14ml)', cal: 119, p: 0, c: 0, f: 13.5 },
    { id: 'f4', name: 'Natural Peanut Butter', cat: 'fats', emoji: '🥜', serving: '2 tbsp (32g)', cal: 190, p: 8, c: 7, f: 16 },
    { id: 'f5', name: 'Raw Walnuts Halves', cat: 'fats', emoji: '🌰', serving: '30g', cal: 196, p: 4.5, c: 4, f: 20 },
    { id: 'f6', name: 'Chia Seeds', cat: 'fats', emoji: '🌱', serving: '2 tbsp (24g)', cal: 115, p: 4, c: 10, f: 7.5 },
    { id: 'f7', name: 'Dark Chocolate (85%)', cat: 'fats', emoji: '🍫', serving: '30g (3 squares)', cal: 175, p: 2.5, c: 12, f: 14 },
    { id: 'f8', name: 'Grass-fed Butter', cat: 'fats', emoji: '🧈', serving: '1 pat (10g)', cal: 72, p: 0.1, c: 0, f: 8.1 },

    // Beverages & Snacks
    { id: 'b1', name: 'Black Americano / Espresso', cat: 'drinks', emoji: '☕', serving: '1 cup (240ml)', cal: 5, p: 0.3, c: 0, f: 0 },
    { id: 'b2', name: 'Oat Milk Flat White', cat: 'drinks', emoji: '☕', serving: '12 oz (350ml)', cal: 130, p: 3, c: 17, f: 5 },
    { id: 'b3', name: 'Green Tea (Unsweetened)', cat: 'drinks', emoji: '🍵', serving: '1 mug', cal: 2, p: 0, c: 0, f: 0 },
    { id: 'b4', name: 'Almond Milk (Unsweetened)', cat: 'drinks', emoji: '🥛', serving: '1 cup (240ml)', cal: 35, p: 1, c: 1, f: 2.5 },
    { id: 'b5', name: 'Kombucha Ginger Drink', cat: 'drinks', emoji: '🍾', serving: '250ml', cal: 30, p: 0, c: 7, f: 0 },
    { id: 'b6', name: 'Protein Snack Bar', cat: 'protein', emoji: '🍫', serving: '1 bar (60g)', cal: 210, p: 20, c: 22, f: 6 },
    { id: 'b7', name: 'Traditional Hummus with Carrots', cat: 'fats', emoji: '🥕', serving: '3 tbsp hummus + carrots', cal: 145, p: 4, c: 15, f: 8 }
  ];

  // --- Initial Default State ---
  const DEFAULT_SETTINGS = {
    calorieGoal: 2000,
    proteinGoal: 140,
    carbsGoal: 210,
    fatGoal: 65,
    waterGoal: 2500
  };

  // --- Helper Date Formatting ---
  function getTodayKey() {
    const d = new Date();
    return formatKeyFromDate(d);
  }

  function formatKeyFromDate(d) {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  function parseDateFromKey(key) {
    const [y, m, d] = key.split('-').map(Number);
    return new Date(y, m - 1, d);
  }

  function formatHumanDate(key) {
    const today = getTodayKey();
    const date = parseDateFromKey(key);

    const yesterdayDate = new Date();
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);
    const yesterday = formatKeyFromDate(yesterdayDate);

    const tomorrowDate = new Date();
    tomorrowDate.setDate(tomorrowDate.getDate() + 1);
    const tomorrow = formatKeyFromDate(tomorrowDate);

    if (key === today) return 'Today';
    if (key === yesterday) return 'Yesterday';
    if (key === tomorrow) return 'Tomorrow';

    return date.toLocaleDateString(undefined, {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  }

  function getDemoDataForDate(dateKey) {
    return {
      water: 1250,
      exercise: [
        { id: 'ex-' + Date.now(), name: 'Morning Jog & Stretch', duration: 30, calories: 230, timestamp: '07:45' }
      ],
      meals: {
        breakfast: [
          { id: 'demo-1', name: 'Rolled Oatmeal with Blueberries', calories: 274, protein: 7.6, carbs: 55, fat: 3.5, serving: '1 bowl', timestamp: '08:30' },
          { id: 'demo-2', name: 'Black Americano', calories: 5, protein: 0.3, carbs: 0, fat: 0, serving: '1 cup', timestamp: '08:35' }
        ],
        lunch: [
          { id: 'demo-3', name: 'Grilled Chicken Breast with Jasmine Rice', calories: 440, protein: 50, carbs: 43, fat: 5.5, serving: '1 plate', timestamp: '12:45' }
        ],
        dinner: [],
        snacks: [
          { id: 'demo-4', name: 'Fresh Honeycrisp Apple & Raw Almonds', calories: 270, protein: 6.5, carbs: 31, fat: 15.3, serving: '1 serving', timestamp: '16:15' }
        ]
      }
    };
  }

  // --- App State ---
  let appState = {
    selectedDate: getTodayKey(),
    settings: { ...DEFAULT_SETTINGS },
    logs: {}
  };

  // --- Local Storage Management ---
  function loadFromStorage() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.settings) appState.settings = { ...DEFAULT_SETTINGS, ...parsed.settings };
        if (parsed.logs) appState.logs = parsed.logs;
      }
    } catch (e) {
      console.warn('Could not load storage data:', e);
    }

    // Seed today's sample data if totally empty
    const today = getTodayKey();
    if (!appState.logs[today] || (
      !appState.logs[today].meals.breakfast.length &&
      !appState.logs[today].meals.lunch.length &&
      !appState.logs[today].meals.snacks.length
    )) {
      if (Object.keys(appState.logs).length === 0) {
        appState.logs[today] = getDemoDataForDate(today);
        saveToStorage();
      }
    }
  }

  function saveToStorage() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        settings: appState.settings,
        logs: appState.logs
      }));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
      showToast('Storage limit reached or blocked', 'danger');
    }
  }

  function getCurrentDayLog() {
    const key = appState.selectedDate;
    if (!appState.logs[key]) {
      appState.logs[key] = {
        water: 0,
        exercise: [],
        meals: {
          breakfast: [],
          lunch: [],
          dinner: [],
          snacks: []
        }
      };
    }
    // Ensure all structures exist
    if (!appState.logs[key].meals) {
      appState.logs[key].meals = { breakfast: [], lunch: [], dinner: [], snacks: [] };
    }
    ['breakfast', 'lunch', 'dinner', 'snacks'].forEach(cat => {
      if (!Array.isArray(appState.logs[key].meals[cat])) {
        appState.logs[key].meals[cat] = [];
      }
    });
    if (!Array.isArray(appState.logs[key].exercise)) {
      appState.logs[key].exercise = [];
    }
    if (typeof appState.logs[key].water !== 'number') {
      appState.logs[key].water = 0;
    }
    return appState.logs[key];
  }

  // --- UI Toast Notifications ---
  function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let icon = '✓';
    if (type === 'danger') icon = '✕';
    if (type === 'info') icon = 'ℹ';

    toast.innerHTML = `<span style="font-weight: 800;">${icon}</span> <span>${message}</span>`;
    container.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 300);
    }, 2800);
  }

  // --- Calculation Helpers ---
  function calculateDayTotals(dayLog) {
    let consumedCal = 0;
    let protein = 0;
    let carbs = 0;
    let fat = 0;

    const meals = dayLog.meals;
    for (const cat in meals) {
      meals[cat].forEach(item => {
        consumedCal += Number(item.calories) || 0;
        protein += Number(item.protein) || 0;
        carbs += Number(item.carbs) || 0;
        fat += Number(item.fat) || 0;
      });
    }

    let burnedCal = 0;
    dayLog.exercise.forEach(item => {
      burnedCal += Number(item.calories) || 0;
    });

    const netCal = Math.max(0, consumedCal - burnedCal);

    return {
      consumed: Math.round(consumedCal),
      burned: Math.round(burnedCal),
      net: Math.round(netCal),
      protein: Math.round(protein * 10) / 10,
      carbs: Math.round(carbs * 10) / 10,
      fat: Math.round(fat * 10) / 10
    };
  }

  // --- RENDER FUNCTIONS ---

  function renderAll() {
    renderDateNav();
    renderHeroAndCalories();
    renderMacros();
    renderWater();
    renderWeeklyChart();
    renderMealLists();
    renderExerciseList();
  }

  // 1. Date Navigation
  function renderDateNav() {
    const key = appState.selectedDate;
    const labelElem = document.getElementById('currentDateLabel');
    const inputElem = document.getElementById('datePickerInput');
    const todayBtn = document.getElementById('todayQuickBtn');

    if (labelElem) labelElem.textContent = formatHumanDate(key);
    if (inputElem) inputElem.value = key;

    const isToday = (key === getTodayKey());
    if (todayBtn) {
      todayBtn.style.opacity = isToday ? '0.45' : '1';
      todayBtn.style.pointerEvents = isToday ? 'none' : 'auto';
    }
  }

  // 2. Calorie Gauge & Hero Balance
  function renderHeroAndCalories() {
    const dayLog = getCurrentDayLog();
    const totals = calculateDayTotals(dayLog);
    const goal = appState.settings.calorieGoal;

    const remaining = goal - totals.consumed; // or based on net
    const isOver = totals.consumed > goal;

    // Numbers display
    const remainingElem = document.getElementById('caloriesRemainingDisplay');
    if (remainingElem) {
      remainingElem.textContent = Math.abs(remaining).toLocaleString();
      remainingElem.style.color = isOver ? '#f43f5e' : '#ffffff';
    }

    const sublabelElem = document.querySelector('.gauge-sublabel');
    if (sublabelElem) {
      sublabelElem.textContent = isOver ? 'kcal OVER GOAL' : 'kcal remaining';
      sublabelElem.style.color = isOver ? '#fb7185' : '#94a3b8';
    }

    // Status chip
    const statusChip = document.getElementById('calorieStatusChip');
    if (statusChip) {
      if (isOver) {
        statusChip.textContent = 'Over Budget';
        statusChip.classList.add('over-budget');
      } else if (totals.consumed >= goal * 0.9) {
        statusChip.textContent = 'Near Target';
        statusChip.classList.remove('over-budget');
      } else {
        statusChip.textContent = 'On Track';
        statusChip.classList.remove('over-budget');
      }
    }

    // Circular Progress Ring SVG
    // Circumference = 2 * PI * 80 ~= 502.65
    const ringFill = document.getElementById('calorieRingFill');
    if (ringFill) {
      const radius = 80;
      const circumference = 2 * Math.PI * radius;
      const fraction = Math.min(1, Math.max(0, totals.consumed / (goal || 1)));
      const offset = circumference - (fraction * circumference);

      ringFill.style.strokeDasharray = `${circumference}`;
      ringFill.style.strokeDashoffset = `${offset}`;

      if (isOver) {
        ringFill.style.stroke = '#f43f5e';
      } else if (totals.consumed >= goal * 0.85) {
        ringFill.style.stroke = '#f59e0b';
      } else {
        ringFill.style.stroke = '#10b981';
      }
    }

    // Stat breakdown pills
    const goalEl = document.getElementById('statBaseGoal');
    const consumedEl = document.getElementById('statConsumed');
    const burnedEl = document.getElementById('statBurned');
    const netEl = document.getElementById('statNet');

    if (goalEl) goalEl.textContent = goal.toLocaleString();
    if (consumedEl) consumedEl.textContent = totals.consumed.toLocaleString();
    if (burnedEl) burnedEl.textContent = totals.burned.toLocaleString();
    if (netEl) netEl.textContent = totals.net.toLocaleString();
  }

  // 3. Macronutrients Progress
  function renderMacros() {
    const dayLog = getCurrentDayLog();
    const totals = calculateDayTotals(dayLog);
    const { proteinGoal, carbsGoal, fatGoal } = appState.settings;

    // Protein
    const protCurrent = document.getElementById('protCurrent');
    const protGoalEl = document.getElementById('protGoal');
    const protBar = document.getElementById('protBar');
    const protPct = document.getElementById('protPct');
    const protCals = document.getElementById('protCals');

    if (protCurrent) protCurrent.textContent = totals.protein;
    if (protGoalEl) protGoalEl.textContent = proteinGoal;
    const pPercent = Math.min(100, Math.round((totals.protein / (proteinGoal || 1)) * 100));
    if (protBar) protBar.style.width = `${pPercent}%`;
    if (protPct) protPct.textContent = `${pPercent}%`;
    if (protCals) protCals.textContent = `${Math.round(totals.protein * 4)} kcal`;

    // Carbs
    const carbsCurrent = document.getElementById('carbsCurrent');
    const carbsGoalEl = document.getElementById('carbsGoal');
    const carbsBar = document.getElementById('carbsBar');
    const carbsPct = document.getElementById('carbsPct');
    const carbsCals = document.getElementById('carbsCals');

    if (carbsCurrent) carbsCurrent.textContent = totals.carbs;
    if (carbsGoalEl) carbsGoalEl.textContent = carbsGoal;
    const cPercent = Math.min(100, Math.round((totals.carbs / (carbsGoal || 1)) * 100));
    if (carbsBar) carbsBar.style.width = `${cPercent}%`;
    if (carbsPct) carbsPct.textContent = `${cPercent}%`;
    if (carbsCals) carbsCals.textContent = `${Math.round(totals.carbs * 4)} kcal`;

    // Fat
    const fatCurrent = document.getElementById('fatCurrent');
    const fatGoalEl = document.getElementById('fatGoal');
    const fatBar = document.getElementById('fatBar');
    const fatPct = document.getElementById('fatPct');
    const fatCals = document.getElementById('fatCals');

    if (fatCurrent) fatCurrent.textContent = totals.fat;
    if (fatGoalEl) fatGoalEl.textContent = fatGoal;
    const fPercent = Math.min(100, Math.round((totals.fat / (fatGoal || 1)) * 100));
    if (fatBar) fatBar.style.width = `${fPercent}%`;
    if (fatPct) fatPct.textContent = `${fPercent}%`;
    if (fatCals) fatCals.textContent = `${Math.round(totals.fat * 9)} kcal`;

    // Summary text
    const totalGrams = Math.round(totals.protein + totals.carbs + totals.fat);
    const summaryEl = document.getElementById('macroTotalsSummary');
    if (summaryEl) summaryEl.textContent = `${totalGrams}g logged`;
  }

  // 4. Hydration / Water
  function renderWater() {
    const dayLog = getCurrentDayLog();
    const current = dayLog.water || 0;
    const goal = appState.settings.waterGoal || 2500;

    const currentEl = document.getElementById('waterCurrent');
    const goalEl = document.getElementById('waterGoal');
    const fillBar = document.getElementById('waterFillBar');

    if (currentEl) currentEl.textContent = current.toLocaleString();
    if (goalEl) goalEl.textContent = goal.toLocaleString();

    const percent = Math.min(100, Math.round((current / (goal || 1)) * 100));
    if (fillBar) fillBar.style.width = `${percent}%`;
  }

  // 5. 7-Day Weekly Trend Chart
  function renderWeeklyChart() {
    const container = document.getElementById('weeklyChartContainer');
    const avgDisplay = document.getElementById('weeklyAvgDisplay');
    if (!container) return;

    container.innerHTML = '';

    const selectedDate = parseDateFromKey(appState.selectedDate);
    const days = [];

    // 7 days ending on selected date + 2 future or last 7 days?
    // Let's display the 7-day window ending on selected date
    for (let i = 6; i >= 0; i--) {
      const d = new Date(selectedDate);
      d.setDate(d.getDate() - i);
      days.push(formatKeyFromDate(d));
    }

    const goal = appState.settings.calorieGoal || 2000;
    let totalCals7Days = 0;
    let loggedDaysCount = 0;

    days.forEach(key => {
      const log = appState.logs[key];
      let dayCal = 0;
      if (log) {
        const t = calculateDayTotals(log);
        dayCal = t.consumed;
        if (dayCal > 0) loggedDaysCount++;
      }
      totalCals7Days += dayCal;

      const dateObj = parseDateFromKey(key);
      const dayLabel = dateObj.toLocaleDateString(undefined, { weekday: 'narrow' });
      const isSelected = (key === appState.selectedDate);
      const isOver = dayCal > goal;

      // Bar height proportion (cap at 100px max, scale relative to goal * 1.3)
      const maxScale = goal * 1.25;
      const heightPx = Math.min(100, Math.max(8, (dayCal / maxScale) * 100));

      const col = document.createElement('div');
      col.className = `chart-day-col ${isSelected ? 'selected' : ''}`;
      col.title = `${formatHumanDate(key)}: ${dayCal} kcal`;

      col.innerHTML = `
        <div class="chart-bar-wrap">
          <div class="chart-bar ${isSelected ? 'active-day' : ''} ${isOver ? 'over-goal' : ''}" style="height: ${heightPx}px;"></div>
        </div>
        <span class="chart-day-label">${dayLabel}</span>
      `;

      col.addEventListener('click', () => {
        appState.selectedDate = key;
        renderAll();
      });

      container.appendChild(col);
    });

    if (avgDisplay) {
      const avg = loggedDaysCount > 0 ? Math.round(totalCals7Days / loggedDaysCount) : 0;
      avgDisplay.textContent = `Avg: ${avg.toLocaleString()} kcal/day`;
    }
  }

  // 6. Meal Lists (Breakfast, Lunch, Dinner, Snacks)
  function renderMealLists() {
    const dayLog = getCurrentDayLog();
    const categories = ['breakfast', 'lunch', 'dinner', 'snacks'];

    categories.forEach(cat => {
      const listEl = document.getElementById(`${cat}List`);
      const metaEl = document.getElementById(`${cat}Meta`);
      if (!listEl) return;

      const items = dayLog.meals[cat] || [];
      let catCalories = 0;

      listEl.innerHTML = '';

      if (items.length === 0) {
        listEl.innerHTML = `<div class="empty-meal-state">No items logged yet</div>`;
      } else {
        items.forEach((item, index) => {
          catCalories += Number(item.calories) || 0;

          const row = document.createElement('div');
          row.className = 'food-row-item';

          const hasMacros = (item.protein > 0 || item.carbs > 0 || item.fat > 0);

          row.innerHTML = `
            <div class="food-left">
              <span class="food-item-name">${escapeHtml(item.name)}</span>
              <div class="food-item-meta">
                ${item.serving ? `<span class="food-portion">${escapeHtml(item.serving)}</span>` : ''}
                ${hasMacros ? `
                  <span class="macro-micro-badge p">P: ${item.protein}g</span>
                  <span class="macro-micro-badge c">C: ${item.carbs}g</span>
                  <span class="macro-micro-badge f">F: ${item.fat}g</span>
                ` : ''}
                ${item.timestamp ? `<span>• ${item.timestamp}</span>` : ''}
              </div>
            </div>
            <div class="food-right">
              <span class="food-calories-num">${Math.round(item.calories)} <small>kcal</small></span>
              <button type="button" class="food-item-delete" data-cat="${cat}" data-index="${index}" title="Remove Item" aria-label="Delete item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
          `;

          listEl.appendChild(row);
        });
      }

      if (metaEl) {
        metaEl.textContent = `${items.length} ${items.length === 1 ? 'item' : 'items'} • ${Math.round(catCalories).toLocaleString()} kcal`;
      }
    });

    // Attach delete listeners
    document.querySelectorAll('.food-item-delete').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const targetBtn = e.currentTarget;
        const cat = targetBtn.getAttribute('data-cat');
        const index = parseInt(targetBtn.getAttribute('data-index'), 10);
        deleteMealItem(cat, index);
      });
    });
  }

  // 7. Exercise List
  function renderExerciseList() {
    const dayLog = getCurrentDayLog();
    const listEl = document.getElementById('exerciseList');
    const metaEl = document.getElementById('exerciseMeta');
    if (!listEl) return;

    const items = dayLog.exercise || [];
    let totalBurn = 0;

    listEl.innerHTML = '';

    if (items.length === 0) {
      listEl.innerHTML = `<div class="empty-meal-state">No active exercise logged today</div>`;
    } else {
      items.forEach((item, index) => {
        totalBurn += Number(item.calories) || 0;

        const row = document.createElement('div');
        row.className = 'food-row-item';

        row.innerHTML = `
          <div class="food-left">
            <span class="food-item-name">${escapeHtml(item.name)}</span>
            <div class="food-item-meta">
              <span>⏱ ${item.duration || 30} mins</span>
              ${item.timestamp ? `<span>• ${item.timestamp}</span>` : ''}
            </div>
          </div>
          <div class="food-right">
            <span class="exercise-calories-num">-${Math.round(item.calories)} <small style="color: #38bdf8;">kcal</small></span>
            <button type="button" class="food-item-delete" data-exercise-index="${index}" title="Remove Activity" aria-label="Delete activity">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
        `;

        listEl.appendChild(row);
      });
    }

    if (metaEl) {
      metaEl.textContent = `${items.length} ${items.length === 1 ? 'activity' : 'activities'} • -${Math.round(totalBurn).toLocaleString()} kcal`;
    }

    // Attach exercise delete listeners
    document.querySelectorAll('[data-exercise-index]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const index = parseInt(e.currentTarget.getAttribute('data-exercise-index'), 10);
        deleteExerciseItem(index);
      });
    });
  }

  // --- ACTIONS & DATA MUTATIONS ---

  function addFoodItem(category, item) {
    const dayLog = getCurrentDayLog();
    if (!item.timestamp) {
      const now = new Date();
      item.timestamp = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    }
    if (!item.id) {
      item.id = 'item-' + Date.now();
    }
    dayLog.meals[category].push(item);
    saveToStorage();
    renderAll();
    showToast(`Added "${item.name}" to ${category.toUpperCase()}`, 'success');
  }

  function deleteMealItem(category, index) {
    const dayLog = getCurrentDayLog();
    const removed = dayLog.meals[category].splice(index, 1)[0];
    saveToStorage();
    renderAll();
    if (removed) {
      showToast(`Removed "${removed.name}"`, 'info');
    }
  }

  function addExerciseItem(item) {
    const dayLog = getCurrentDayLog();
    if (!item.timestamp) {
      const now = new Date();
      item.timestamp = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    }
    if (!item.id) {
      item.id = 'ex-' + Date.now();
    }
    dayLog.exercise.push(item);
    saveToStorage();
    renderAll();
    showToast(`Logged "${item.name}" (-${item.calories} kcal)`, 'success');
  }

  function deleteExerciseItem(index) {
    const dayLog = getCurrentDayLog();
    const removed = dayLog.exercise.splice(index, 1)[0];
    saveToStorage();
    renderAll();
    if (removed) {
      showToast(`Removed activity "${removed.name}"`, 'info');
    }
  }

  function updateWater(delta) {
    const dayLog = getCurrentDayLog();
    dayLog.water = Math.max(0, (dayLog.water || 0) + delta);
    saveToStorage();
    renderWater();
    if (delta > 0) {
      showToast(`Added +${delta} ml water 💧`, 'info');
    } else {
      showToast(`Adjusted water intake`, 'info');
    }
  }

  // --- PRESET RENDERING & SEARCH ---

  let activePresetFilter = 'all';

  function renderPresetsList(searchTerm = '') {
    const grid = document.getElementById('presetsGrid');
    if (!grid) return;

    const term = searchTerm.toLowerCase().trim();
    const filtered = PRESET_FOODS.filter(item => {
      const matchesCategory = (activePresetFilter === 'all' || item.cat === activePresetFilter);
      const matchesSearch = !term || item.name.toLowerCase().includes(term);
      return matchesCategory && matchesSearch;
    });

    grid.innerHTML = '';

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="text-align: center; padding: 2rem; color: #64748b; font-size: 0.85rem;">
          No matching foods found. Use the "Custom Food" tab to add your own!
        </div>
      `;
      return;
    }

    const targetMealSelect = document.getElementById('presetTargetMeal');

    filtered.forEach(item => {
      const card = document.createElement('div');
      card.className = 'preset-item-card';

      card.innerHTML = `
        <div class="preset-left">
          <span class="preset-emoji">${item.emoji}</span>
          <div>
            <div class="preset-name">${escapeHtml(item.name)}</div>
            <div class="preset-serving">${escapeHtml(item.serving)}</div>
          </div>
        </div>
        <div class="preset-right">
          <div class="preset-macros-pill">
            ${item.cal} kcal
            <small>P:${item.p}g • C:${item.c}g • F:${item.f}g</small>
          </div>
          <button type="button" class="preset-add-btn" title="Add to meal" aria-label="Add ${escapeHtml(item.name)}">+</button>
        </div>
      `;

      card.querySelector('.preset-add-btn').addEventListener('click', () => {
        const selectedMeal = targetMealSelect ? targetMealSelect.value : 'breakfast';
        addFoodItem(selectedMeal, {
          name: item.name,
          calories: item.cal,
          protein: item.p,
          carbs: item.c,
          fat: item.f,
          serving: item.serving
        });
      });

      grid.appendChild(card);
    });
  }

  // --- MODALS HANDLING ---

  function openFoodModal(category = 'breakfast', activeTab = 'tabPresets') {
    const backdrop = document.getElementById('foodModalBackdrop');
    if (!backdrop) return;

    // Set target dropdowns
    const targetSelect1 = document.getElementById('presetTargetMeal');
    const targetSelect2 = document.getElementById('customMealCategory');
    const targetSelect3 = document.getElementById('quickCalMealCategory');

    if (targetSelect1) targetSelect1.value = category;
    if (targetSelect2) targetSelect2.value = category;
    if (targetSelect3) targetSelect3.value = category;

    // Switch tab
    switchModalTab(activeTab);

    backdrop.classList.add('open');

    // Focus appropriate input
    setTimeout(() => {
      if (activeTab === 'tabPresets') {
        const searchInput = document.getElementById('foodSearchInput');
        if (searchInput) searchInput.focus();
      } else if (activeTab === 'tabCustom') {
        const customName = document.getElementById('customFoodName');
        if (customName) customName.focus();
      }
    }, 100);
  }

  function closeFoodModal() {
    const backdrop = document.getElementById('foodModalBackdrop');
    if (backdrop) backdrop.classList.remove('open');
  }

  function openExerciseModal() {
    const backdrop = document.getElementById('exerciseModalBackdrop');
    if (!backdrop) return;
    backdrop.classList.add('open');
    setTimeout(() => {
      const nameInput = document.getElementById('exerciseName');
      if (nameInput) nameInput.focus();
    }, 100);
  }

  function closeExerciseModal() {
    const backdrop = document.getElementById('exerciseModalBackdrop');
    if (backdrop) backdrop.classList.remove('open');
  }

  function openSettingsModal() {
    const backdrop = document.getElementById('settingsModalBackdrop');
    if (!backdrop) return;

    // Populate inputs from settings
    const s = appState.settings;
    document.getElementById('settingCalorieGoal').value = s.calorieGoal;
    document.getElementById('settingProteinGoal').value = s.proteinGoal;
    document.getElementById('settingCarbsGoal').value = s.carbsGoal;
    document.getElementById('settingFatGoal').value = s.fatGoal;
    document.getElementById('settingWaterGoal').value = s.waterGoal;

    backdrop.classList.add('open');
  }

  function closeSettingsModal() {
    const backdrop = document.getElementById('settingsModalBackdrop');
    if (backdrop) backdrop.classList.remove('open');
  }

  function switchModalTab(tabId) {
    document.querySelectorAll('.modal-tab').forEach(tab => {
      tab.classList.toggle('active', tab.getAttribute('data-tab') === tabId);
    });
    document.querySelectorAll('.tab-pane').forEach(pane => {
      pane.classList.toggle('active', pane.id === tabId);
    });
  }

  // --- UTILS ---
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // --- INITIALIZATION & EVENT LISTENERS ---
  function init() {
    loadFromStorage();
    renderAll();
    renderPresetsList();

    // 1. Date Navigation Events
    const prevDayBtn = document.getElementById('prevDayBtn');
    const nextDayBtn = document.getElementById('nextDayBtn');
    const todayBtn = document.getElementById('todayQuickBtn');
    const datePicker = document.getElementById('datePickerInput');

    if (prevDayBtn) {
      prevDayBtn.addEventListener('click', () => {
        const cur = parseDateFromKey(appState.selectedDate);
        cur.setDate(cur.getDate() - 1);
        appState.selectedDate = formatKeyFromDate(cur);
        renderAll();
      });
    }

    if (nextDayBtn) {
      nextDayBtn.addEventListener('click', () => {
        const cur = parseDateFromKey(appState.selectedDate);
        cur.setDate(cur.getDate() + 1);
        appState.selectedDate = formatKeyFromDate(cur);
        renderAll();
      });
    }

    if (todayBtn) {
      todayBtn.addEventListener('click', () => {
        appState.selectedDate = getTodayKey();
        renderAll();
      });
    }

    if (datePicker) {
      datePicker.addEventListener('change', (e) => {
        if (e.target.value) {
          appState.selectedDate = e.target.value;
          renderAll();
        }
      });
    }

    // 2. Header & Quick Add Buttons
    const openAddFoodBtn = document.getElementById('openAddFoodBtn');
    if (openAddFoodBtn) {
      openAddFoodBtn.addEventListener('click', () => openFoodModal('breakfast', 'tabPresets'));
    }

    const openQuickAddModalBtn = document.getElementById('openQuickAddModalBtn');
    if (openQuickAddModalBtn) {
      openQuickAddModalBtn.addEventListener('click', () => openFoodModal('breakfast', 'tabPresets'));
    }

    const openSettingsBtn = document.getElementById('openSettingsBtn');
    if (openSettingsBtn) {
      openSettingsBtn.addEventListener('click', openSettingsModal);
    }

    // Category "+ Add" buttons
    document.querySelectorAll('.add-to-cat-btn[data-cat]').forEach(btn => {
      btn.addEventListener('click', () => {
        const cat = btn.getAttribute('data-cat');
        openFoodModal(cat, 'tabPresets');
      });
    });

    // Exercise burn triggers
    const logBurnBtn = document.getElementById('logBurnBtn');
    if (logBurnBtn) logBurnBtn.addEventListener('click', openExerciseModal);

    const addBurnActivityBtn = document.getElementById('addBurnActivityBtn');
    if (addBurnActivityBtn) addBurnActivityBtn.addEventListener('click', openExerciseModal);

    // 3. Water Hydration Buttons
    document.querySelectorAll('.water-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const amount = parseInt(btn.getAttribute('data-amount'), 10) || 250;
        updateWater(amount);
      });
    });

    const waterMinusBtn = document.getElementById('waterMinusBtn');
    if (waterMinusBtn) {
      waterMinusBtn.addEventListener('click', () => {
        updateWater(-250);
      });
    }

    // 4. Modal 1: Food Modal Tabs & Search
    document.querySelectorAll('.modal-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const targetTab = tab.getAttribute('data-tab');
        switchModalTab(targetTab);
      });
    });

    const foodSearchInput = document.getElementById('foodSearchInput');
    const clearSearchBtn = document.getElementById('clearSearchBtn');

    if (foodSearchInput) {
      foodSearchInput.addEventListener('input', (e) => {
        const val = e.target.value;
        if (clearSearchBtn) {
          clearSearchBtn.classList.toggle('visible', Boolean(val));
        }
        renderPresetsList(val);
      });
    }

    if (clearSearchBtn) {
      clearSearchBtn.addEventListener('click', () => {
        if (foodSearchInput) {
          foodSearchInput.value = '';
          clearSearchBtn.classList.remove('visible');
          renderPresetsList('');
          foodSearchInput.focus();
        }
      });
    }

    // Category chips filter for presets
    document.querySelectorAll('#presetCategoryChips .chip').forEach(chip => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('#presetCategoryChips .chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        activePresetFilter = chip.getAttribute('data-filter') || 'all';
        renderPresetsList(foodSearchInput ? foodSearchInput.value : '');
      });
    });

    // Close Modal Buttons
    const closeFoodModalBtn = document.getElementById('closeFoodModalBtn');
    if (closeFoodModalBtn) closeFoodModalBtn.addEventListener('click', closeFoodModal);

    const closeExerciseModalBtn = document.getElementById('closeExerciseModalBtn');
    if (closeExerciseModalBtn) closeExerciseModalBtn.addEventListener('click', closeExerciseModal);

    const closeSettingsModalBtn = document.getElementById('closeSettingsModalBtn');
    if (closeSettingsModalBtn) closeSettingsModalBtn.addEventListener('click', closeSettingsModal);

    // Backdrop click to close
    [
      { id: 'foodModalBackdrop', close: closeFoodModal },
      { id: 'exerciseModalBackdrop', close: closeExerciseModal },
      { id: 'settingsModalBackdrop', close: closeSettingsModal }
    ].forEach(({ id, close }) => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('click', (e) => {
          if (e.target === el) close();
        });
      }
    });

    // Escape key closes modals
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeFoodModal();
        closeExerciseModal();
        closeSettingsModal();
      }
    });

    // 5. Custom Food Form Submission
    const customFoodForm = document.getElementById('customFoodForm');
    if (customFoodForm) {
      customFoodForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('customFoodName').value.trim();
        const cat = document.getElementById('customMealCategory').value;
        const serving = document.getElementById('customServingSize').value.trim();
        const calories = parseFloat(document.getElementById('customCalories').value) || 0;
        const protein = parseFloat(document.getElementById('customProtein').value) || 0;
        const carbs = parseFloat(document.getElementById('customCarbs').value) || 0;
        const fat = parseFloat(document.getElementById('customFat').value) || 0;

        if (!name) return;

        addFoodItem(cat, {
          name,
          calories,
          protein,
          carbs,
          fat,
          serving: serving || '1 serving'
        });

        customFoodForm.reset();
        closeFoodModal();
      });
    }

    // 6. Quick Calories Form Submission
    const quickCalForm = document.getElementById('quickCalForm');
    if (quickCalForm) {
      quickCalForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const cat = document.getElementById('quickCalMealCategory').value;
        const label = document.getElementById('quickCalLabel').value.trim() || 'Quick Calories';
        const calories = parseFloat(document.getElementById('quickCalAmount').value) || 0;

        if (calories <= 0) return;

        addFoodItem(cat, {
          name: label,
          calories,
          protein: 0,
          carbs: 0,
          fat: 0,
          serving: 'Quick entry'
        });

        quickCalForm.reset();
        closeFoodModal();
      });
    }

    // 7. Exercise Form Submission & Quick Suggestions
    const exerciseForm = document.getElementById('exerciseForm');
    if (exerciseForm) {
      exerciseForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('exerciseName').value.trim();
        const duration = parseInt(document.getElementById('exerciseDuration').value, 10) || 30;
        const calories = parseInt(document.getElementById('exerciseCalories').value, 10) || 0;

        if (!name || calories <= 0) return;

        addExerciseItem({
          name,
          duration,
          calories
        });

        exerciseForm.reset();
        closeExerciseModal();
      });
    }

    // Exercise suggestion chips
    document.querySelectorAll('.exercise-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const name = chip.getAttribute('data-name');
        const dur = chip.getAttribute('data-dur');
        const cals = chip.getAttribute('data-cals');

        const nameInput = document.getElementById('exerciseName');
        const durInput = document.getElementById('exerciseDuration');
        const calsInput = document.getElementById('exerciseCalories');

        if (nameInput) nameInput.value = name;
        if (durInput) durInput.value = dur;
        if (calsInput) calsInput.value = cals;
      });
    });

    // 8. Settings Form Submission
    const settingsForm = document.getElementById('settingsForm');
    if (settingsForm) {
      settingsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const cal = parseInt(document.getElementById('settingCalorieGoal').value, 10) || 2000;
        const prot = parseInt(document.getElementById('settingProteinGoal').value, 10) || 140;
        const carbs = parseInt(document.getElementById('settingCarbsGoal').value, 10) || 210;
        const fat = parseInt(document.getElementById('settingFatGoal').value, 10) || 65;
        const water = parseInt(document.getElementById('settingWaterGoal').value, 10) || 2500;

        appState.settings = {
          calorieGoal: cal,
          proteinGoal: prot,
          carbsGoal: carbs,
          fatGoal: fat,
          waterGoal: water
        };

        saveToStorage();
        renderAll();
        closeSettingsModal();
        showToast('Daily goals updated successfully!', 'success');
      });
    }

    // 9. Data Management: Export JSON
    const exportDataBtn = document.getElementById('exportDataBtn');
    if (exportDataBtn) {
      exportDataBtn.addEventListener('click', () => {
        const exportObj = {
          version: '1.0',
          exportDate: new Date().toISOString(),
          settings: appState.settings,
          logs: appState.logs
        };

        const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportObj, null, 2));
        const downloadAnchor = document.createElement('a');
        downloadAnchor.setAttribute('href', dataStr);
        downloadAnchor.setAttribute('download', `caloriq-backup-${getTodayKey()}.json`);
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();

        showToast('Backup JSON exported successfully', 'success');
      });
    }

    // Import JSON
    const importJsonInput = document.getElementById('importJsonInput');
    if (importJsonInput) {
      importJsonInput.addEventListener('change', (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const data = JSON.parse(event.target.result);
            if (data.settings && data.logs) {
              appState.settings = { ...DEFAULT_SETTINGS, ...data.settings };
              appState.logs = data.logs;
              saveToStorage();
              renderAll();
              closeSettingsModal();
              showToast('Backup restored successfully!', 'success');
            } else {
              showToast('Invalid backup file format', 'danger');
            }
          } catch (err) {
            showToast('Failed to parse JSON file', 'danger');
          }
          importJsonInput.value = '';
        };
        reader.readAsText(file);
      });
    }

    // Clear Today's Log
    const resetTodayBtn = document.getElementById('resetTodayBtn');
    if (resetTodayBtn) {
      resetTodayBtn.addEventListener('click', () => {
        const key = appState.selectedDate;
        if (confirm(`Are you sure you want to clear all logged food, exercise, and water for ${formatHumanDate(key)}?`)) {
          delete appState.logs[key];
          saveToStorage();
          renderAll();
          closeSettingsModal();
          showToast(`Cleared logs for ${formatHumanDate(key)}`, 'info');
        }
      });
    }

    // Wipe All Data
    const clearAllDataBtn = document.getElementById('clearAllDataBtn');
    if (clearAllDataBtn) {
      clearAllDataBtn.addEventListener('click', () => {
        if (confirm('Warning: This will permanently delete ALL logged history, dates, and settings from your browser. Continue?')) {
          localStorage.removeItem(STORAGE_KEY);
          appState.settings = { ...DEFAULT_SETTINGS };
          appState.logs = {};
          saveToStorage();
          renderAll();
          closeSettingsModal();
          showToast('All browser data has been wiped', 'danger');
        }
      });
    }
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
