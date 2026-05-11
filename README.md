# 🛸 Space Debris Tracker

Real-time interactive 3D orbital debris simulator. Visualizes actual space debris orbiting Earth using real TLE data from CelesTrak, propagated through the SGP4 algorithm.

**Built with:** Vite · Three.js · satellite.js · Tailwind CSS

## Features

- 🌍 **3D Earth** — Textured sphere with atmosphere glow, starfield, and orbital controls
- 📡 **Live TLE Data** — Fetches real debris orbital elements from CelesTrak
- 🛰️ **500 Debris Objects** — Color-coded by altitude zone (LEO/MEO/GEO)
- ⏱️ **Real-Time Propagation** — SGP4 orbital mechanics updated every frame
- 🎛️ **Control Panel** — Pause/play, speed slider (1–100x), zone filters, IST clock
- ⚠️ **Collision Warnings** — Sampled conjunction detection with pulsing alerts
- ℹ️ **Info Modal** — Explains TLE, SGP4, Kessler Syndrome, and CARA system

## Deploy

| Command           | Description                  |
| ----------------- | ---------------------------- |
| `npm run dev`     | Start dev server             |
| `npm run build`   | Build to `dist/`             |
| `npm run preview` | Preview production build     |

## Tech Stack

| Technology  | Purpose                        |
|-------------|--------------------------------|
| Vite        | Build tool and dev server      |
| Three.js    | 3D rendering engine            |
| satellite.js| TLE parsing and SGP4 propagation |
| Tailwind CSS| UI styling                     |
| CelesTrak   | Real TLE debris data source    |
