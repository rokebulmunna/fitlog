# Fitlog 🏋️‍♂️

Fitlog is a modern, responsive, and feature-rich fitness web application built with Next.js. It allows fitness enthusiasts to browse a dynamic catalog of workouts, view detailed exercise breakdowns, manage their daily training schedules, and curate a personal collection of saved lifts.

---

## 🚀 Technologies Used

- **Framework:** [Next.js](https://nextjs.org/) (App Router, Turbopack, Server & Client Components)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) (Custom Dark Theme with `#ccff00` accent styling)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Data Persistence:** Browser `localStorage` for seamless state management across sessions
- **Typography:** Google Fonts (`Oswald` for bold athletic headings)

---

## ✨ Features

1. **Dynamic Workout Catalog (Home Page):**
   - Fetches and displays live workout data from a remote API endpoint in a responsive grid layout.
   - Includes real-time filtering, search capabilities, and equipment/muscle group badges.

2. **Detailed Workout Views:**
   - Dynamic routing (`/workout/[id]`) that renders comprehensive information for each specific exercise, including step-by-step instructions, equipment requirements, duration, and estimated calorie burn.

3. **Interactive Plan Management ("My Plan"):**
   - Tabbed interface allowing users to switch between **Today's Plan** and **Saved** workouts instantly.
   - Real-time summary dashboard that dynamically aggregates and tracks total exercises, active minutes, and calories.

4. **Mutual Exclusivity & Quick Actions:**
   - Clean state control ensuring exercises can be strategically assigned either to today's schedule or saved for later without duplication.
   - Quick removal options via "Mark as Done" or dismissal buttons (`X`) that instantly update both local storage and navigation counts.

5. **Live Dynamic Counter Badges:**
   - Real-time navigation badges tracking active plan and saved items using custom event dispatchers across components.

6. **Sorting Capabilities:**
   - Integrated sorting dropdown allowing users to re-order their workout lists instantly by **Duration**, **Calories**, or **Rating**.

---