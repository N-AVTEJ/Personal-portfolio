/**
 * Alex Rivera — Developer Portfolio
 * Phase 1: Minimal Setup & Foundation
 * Note: Advanced interactivity (menu drawer, project filtering, modal demos) is reserved for Phase 2.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons (CDN fallback-safe)
  if (typeof lucide !== 'undefined' && lucide.createIcons) {
    lucide.createIcons();
  }

  // 2. Set current copyright year dynamically
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 3. Developer Console Welcome Log
  console.log(
    '%c Alex Rivera %c Portfolio (Phase 1: Foundation & UI Ready) ',
    'background: #ccff00; color: #0c0e12; font-weight: bold; padding: 4px 8px; border-radius: 4px 0 0 4px;',
    'background: #181d2a; color: #f8fafc; padding: 4px 8px; border-radius: 0 4px 4px 0;'
  );
});
