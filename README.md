# Day 1: Personal Developer Portfolio 🚀

> **Day 1 of 100** — *100 Days, 100 Web Development Projects* YouTube Challenge

A modern, responsive, high-performance personal developer portfolio built entirely with **semantic HTML5**, **modern CSS3**, and **Vanilla JavaScript (ES6+)**. Designed with a deep charcoal canvas, electric lime accents, editorial typography, and zero build-step dependencies.

---

## 📸 Preview & Highlights

- **Visual Aesthetic**: Deep Charcoal (`#0c0e12`) base with high-energy Electric Lime (`#ccff00`) accents and subtle ambient grid atmospherics.
- **Pure Web Standards**: 0 frontend frameworks, 0 bundlers, 100% browser-native performance.
- **Editorial Typography**: Pairing **Space Grotesk** (display headlines), **Plus Jakarta Sans** (body text), and **JetBrains Mono** (terminal code & technical tags).
- **Accessibility & Craft**: Visible `:focus-visible` indicators, WCAG 2.1 AAA contrast, `prefers-reduced-motion` compliance, and comfortable 44px touch targets.

---

## ⚡ Features

### 1. Functional Navigation & Active Scroll Spy
- Semantic anchor links with smooth scrolling to `#home`, `#about`, `#projects`, `#skills`, and `#contact`.
- Offset compensation (`scroll-margin-top`) prevents the frosted sticky header from obscuring section headings.
- Real-time Scroll Spy powered by a single passive `requestAnimationFrame` loop that highlights the active section without layout thrashing.

### 2. Accessible Mobile Drawer Menu
- Clean hamburger toggle button (`#nav-toggle`) that smoothly morphs into an **"X"** on active state.
- Full ARIA compliance: dynamically updates `aria-expanded="true/false"` and `aria-label`.
- Multi-trigger dismissal:
  - Selecting any navigation link inside the drawer
  - Pressing the `Escape` key
  - Clicking outside on the backdrop overlay (`#nav-overlay`)
  - Automatically resets when resized back to desktop (> 768px)
- Temporary body scroll lock while the mobile drawer is active.

### 3. Hero Section & TypeScript Terminal Card
- Live availability badge with an animated pulsating green indicator (*"Available for new projects & collaborations"*).
- Bold editorial headline with highlighted accent text.
- Interactive TypeScript terminal preview (`developer_profile.ts`) with custom syntax highlighting tokens, macOS window controls, and telemetry chips (*60 FPS Motion*, *WCAG AAA Contrast*, *0 Build Steps*).
- Dual Call-to-Action buttons (*"Explore My Work"* and *"Let's Connect"*).

### 4. Selected Projects with CSS/SVG Visual Previews
Three distinctive project cards featuring bespoke visual previews built with pure CSS and SVGs:
1. **Aura Real-Time Analytics**: Distributed telemetry dashboard with a glowing SVG trendline chart and live metric counters.
2. **Kroma Multi-Brand Design System**: Interactive design token swatch palette with component specimen previews.
3. **Veloce In-Memory Cache Engine**: Distributed node cluster topology visualization showing leader/follower consensus states and replication logs.

### 5. Sample Link Interceptor & Toast Notifications
- Placeholder project links (*Live Preview* & *Source Code*) and social links (*GitHub*, *LinkedIn*, *Twitter/X*, *CodePen*) are marked with `data-placeholder="true"`.
- Clicking them triggers a polite accessible toast notification (`#portfolio-toast` with `role="status"` and `aria-live="polite"`), preventing accidental navigation to dead 404 pages.
- Auto-dismisses after 3.4 seconds or when pressing `Escape`.

### 6. Floating Back-to-Top Control
- Floating return button (`#back-to-top`) smoothly appears in the bottom-right corner when scrolled past 350px.
- Glides viewport smoothly to the top and shifts focus back to the top of the document for keyboard users.
- Includes a complementary inline return button in the footer.

### 7. Categorized Capabilities & Contact
- Skills categorized cleanly into **Frontend**, **Backend**, **Databases**, and **Tools** with pill tags (no arbitrary percentage bars).
- Direct `mailto:` contact CTA with response time indicator (*Typical response time: within 24 business hours*).
- Dynamic footer copyright year generated automatically via JavaScript (`new Date().getFullYear()`).

---

## 📂 Project Structure

```
Personal portfolio/
├── README.md                     # Project documentation & setup guide
└── portfolio/
    ├── index.html                # Semantic HTML5 document & section architecture
    ├── css/
    │   └── style.css             # Design tokens, layouts, animations & responsive queries
    ├── js/
    │   └── script.js             # Vanilla JS functionality (navigation, drawer, toast, scroll spy)
    └── assets/
        └── images/
            ├── favicon.svg       # Custom branded SVG favicon (<AR/>)
            └── .gitkeep          # Directory for personal profile and project images
```

---

## 🛠️ Getting Started / Local Setup

No `npm install` or compilation step is required. You can run the project in seconds:

### Method 1: Direct Browser Opening
Simply double-click or drag and drop [portfolio/index.html](file:///c:/Users/navtej/OneDrive/Documents/100%20projects/100%20web%20dev%20projects/Personal%20portfolio/portfolio/index.html) into any modern browser (Chrome, Firefox, Safari, Edge, Brave).

### Method 2: Python Local HTTP Server
If you prefer running a local development server:

```powershell
# Navigate to the portfolio folder
cd "portfolio"

# Start the server on port 5500 (or any preferred port)
python -m http.server 5500
```

Open your browser and navigate to:
```
http://127.0.0.1:5500/
```

### Method 3: VS Code / IDE Live Server
If using VS Code, right-click `portfolio/index.html` and select **"Open with Live Server"**.

---

## 🎨 Personalization & Customization Guide

To adapt this portfolio for your own personal brand:

1. **Change Your Name & Title**:
   - Open `portfolio/index.html`.
   - Update `<title>`, `Alex Rivera` in the header logo, hero headline, and footer.
2. **Personalize Your Biography**:
   - Edit the paragraphs in `<section id="about">` with your own journey, philosophy, and current pursuits.
3. **Connect Your Real Project URLs**:
   - Locate the `<div class="project-links">` blocks in `portfolio/index.html`.
   - Remove `data-placeholder="true"` and replace `href="#projects"` with your actual demo URL and GitHub repository link.
4. **Update Contact & Social Profiles**:
   - Change `mailto:alex.rivera@example.com` to your real email address.
   - Replace the social link `href` attributes in the hero and contact sections with your actual GitHub, LinkedIn, Twitter/X, or CodePen URLs.
5. **Add Open Graph Sharing Cover**:
   - Place a `1200x630` px image in `portfolio/assets/images/og-cover.png`.
   - Uncomment the `<meta property="og:image">` tags in the `<head>` of `index.html`.

---

## 🚀 Deployment Guide

Because the project is 100% static, it can be deployed for free on any hosting platform:

### Deploying to GitHub Pages
1. Push this repository to your GitHub account:
   ```bash
   git add .
   git commit -m "Day 1: Personal Portfolio Website"
   git push origin main
   ```
2. Navigate to your repository on GitHub &rarr; **Settings** &rarr; **Pages**.
3. Under **Branch**, select `main` and set the folder to `/portfolio` (or `/root` if moved to root).
4. Click **Save**. Your website will be live in ~60 seconds at `https://<your-username>.github.io/<repository-name>/`.

### Deploying to Vercel
1. Log in to [vercel.com](https://vercel.com) and click **"Add New Project"**.
2. Import your GitHub repository.
3. In the configuration dialog, set **Root Directory** to `portfolio`.
4. Framework Preset: **Other**.
5. Click **Deploy**.

---

## 🧪 Browser Compatibility & Verification

Tested and verified across modern desktop, tablet, and mobile viewports:
- **Chrome / Edge / Chromium**: Full support for CSS custom properties, backdrop filters, and IntersectionObserver.
- **Firefox**: Clean typography rendering and smooth anchor navigation.
- **Safari / iOS WebKit**: `-webkit-backdrop-filter` enabled for frosted glass navigation; touch target spacing verified for mobile iOS devices.
- **Reduced Motion**: Dedicated `@media (prefers-reduced-motion: reduce)` block disables heavy animations and smooth scroll loops for users with motion sensitivities.

---

## 📜 License

Created as part of the **"100 Days, 100 Web Development Projects"** challenge. Free to use, customize, and build upon for your personal developer journey!
