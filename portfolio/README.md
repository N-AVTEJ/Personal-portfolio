# Day 1: Personal Developer Portfolio 🚀

> **Day 1 of 100** — *100 Days, 100 Web Development Projects* YouTube Challenge

A modern, responsive, high-performance personal developer portfolio built entirely with **semantic HTML5**, **modern CSS3**, and **Vanilla JavaScript (ES6+)**. Designed with a deep charcoal canvas, electric lime accents, editorial typography, and zero build-step dependencies.

---

## ⚡ Features & Architecture

- **Visual Design**: Dark Charcoal base (`#0c0e12`) with Electric Lime (`#ccff00`) accents and subtle ambient grid atmospherics.
- **Zero Dependencies**: Pure HTML5, CSS3, and ES6+ JavaScript. No frameworks, bundlers, or compilers.
- **Navigation & Scroll Spy**: Smooth anchor scrolling with sticky header offset clearance and a unified RAF-throttled scroll observer that highlights the active section in real-time.
- **Accessible Mobile Drawer**: Hamburger button morphs into an "X", toggles ARIA expanded attributes, locks body scroll on open, and closes on Escape key, outside click, or link selection.
- **Interactive Code Terminal Card**: Syntactically highlighted `developer_profile.ts` card with performance chips (*60 FPS Motion*, *WCAG AAA Contrast*, *0 Build Steps*).
- **Curated Selected Projects**: 3 project cards featuring custom CSS/SVG previews (Aura telemetry chart, Kroma design token swatches, Veloce cluster topology).
- **Placeholder Link Interceptor**: Sample demo and social links trigger a polite accessible toast notification (`#portfolio-toast`), preventing users from being navigated away to broken 404 pages.
- **Floating Back-to-Top**: Appears smoothly when scrolling past 350px and glides back to the top on click.
- **WCAG 2.1 AAA Contrast & Reduced Motion**: High contrast on dark backgrounds and `@media (prefers-reduced-motion: reduce)` support.

---

## 📂 Folder Structure

```
portfolio/
├── index.html        # Semantic HTML5 document & section architecture
├── css/
│   └── style.css     # Design tokens, layouts, animations & responsive queries
├── js/
│   └── script.js     # Vanilla JS functionality (navigation, drawer, toast, scroll spy)
└── assets/
    └── images/
        ├── favicon.svg  # Custom branded SVG favicon (<AR/>)
        └── .gitkeep     # Placeholder for personal photos and screenshots
```

---

## 🛠️ How to Run Locally

1. **Directly in Browser**: Double-click [index.html](file:///c:/Users/navtej/OneDrive/Documents/100%20projects/100%20web%20dev%20projects/Personal%20portfolio/portfolio/index.html) to open it in Chrome, Firefox, Safari, or Edge.
2. **Using Python Local Server**:
   ```powershell
   python -m http.server 5500
   ```
   Then open `http://127.0.0.1:5500/` in your browser.

---

## 🚀 Deployment

- **GitHub Pages**: Go to **Settings** &rarr; **Pages** &rarr; Select `main` branch and `/portfolio` folder &rarr; **Save**.
- **Vercel**: Import your repository, select `portfolio` as the Root Directory, and click **Deploy**.
