# scent-personality-quiz

A lightweight, front-end personality quiz about scent preferences. Users answer 8–10 multiple-choice questions, and the app assigns one of four scent personas (Fruity, Floral, Woody, Oriental) with a short explanation and note suggestions. Built to be deployable as a static site (e.g., GitHub Pages).

## 🌟 Features

- 8–10 question multiple-choice quiz (4 options per question)
- Score-based persona resolution (no backend required)
- Result page with persona summary and suggested notes
- Configurable content via local JSON (questions + results)
- Fast, static deployment (Vite build → GitHub Pages)

## How it works (scoring model)

- Each option maps to a 4-dimensional weight vector [fruity, floral, woody, oriental].
- Selecting an option adds its vector to the running totals.
- After the last question, the highest total wins.
- Ties are broken by a fixed priority list.

## Project structure

scent-personality-quiz/
├─ public/
├─ src/
│  ├─ components/
│  │  ├─ Quiz.jsx
│  │  ├─ Result.jsx
│  │  └─ Progress.jsx
│  ├─ data/
│  │  ├─ questions.json
│  │  └─ results.json
│  ├─ lib/
│  │  └─ scoring.js           # sumScores, resolveWinner
│  ├─ App.jsx
│  ├─ main.jsx
│  └─ index.css
├─ package.json
├─ vite.config.js
└─ README.md

## ⚙️ Tech Stack

- React + Vite
- JavaScript (ES6+)
- Tailwind CSS (optional)
- GitHub Pages (static hosting)



