/**
 * ALEX RIVERA — DEVELOPER PORTFOLIO
 * Phase 3: Final Polish, Optimization & Demo Readiness
 * 
 * Features:
 * 1. Semantic Navigation & Active Section Scroll Spy
 * 2. Accessible Responsive Mobile Menu (Drawer, Overlay, Escape key, Outside-click)
 * 3. Smooth Anchor Scrolling with Sticky Header Offset & Zero Jump on Top
 * 4. Unified Passive Scroll Handler (RAF) for 60fps Scroll Spy & Floating Back-to-Top
 * 5. Accessible Toast Notification System for Sample / Placeholder Links
 * 6. Dynamic Copyright Year
 * 7. Lucide Icon Initialization with Graceful Fallback
 */

(() => {
  'use strict';

  // Check user preference for reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.addEventListener('DOMContentLoaded', () => {
    initLucideIcons();
    initDynamicYear();
    initNavigationAndSmoothScroll();
    initMobileMenu();
    initUnifiedScrollCoordinator();
    initPlaceholderLinkHandler();
  });

  /* --------------------------------------------------------------------------
     1. Lucide Icons Initialization with Safe Fallback
     -------------------------------------------------------------------------- */
  function initLucideIcons() {
    if (typeof lucide !== 'undefined' && typeof lucide.createIcons === 'function') {
      try {
        lucide.createIcons();
      } catch (err) {
        console.warn('Lucide icon rendering encountered a non-fatal warning:', err);
      }
    }
  }

  /* --------------------------------------------------------------------------
     2. Dynamic Copyright Year
     -------------------------------------------------------------------------- */
  function initDynamicYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  }

  /* --------------------------------------------------------------------------
     3. Navigation & Smooth Anchor Scrolling
     -------------------------------------------------------------------------- */
  function initNavigationAndSmoothScroll() {
    const header = document.getElementById('site-header');

    // Helper: calculate sticky header height
    const getHeaderOffset = () => (header ? header.offsetHeight + 16 : 80);

    // Smooth scrolling for all internal anchor links (excluding placeholder clicks)
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"]):not([data-placeholder="true"])');
    anchorLinks.forEach(link => {
      link.addEventListener('click', (event) => {
        const targetId = link.getAttribute('href');
        if (!targetId || targetId === '#') return;

        // Jump to top of page
        if (targetId === '#top' || targetId === '#home') {
          event.preventDefault();
          window.scrollTo({
            top: 0,
            behavior: prefersReducedMotion ? 'auto' : 'smooth'
          });

          // Focus skip link or top of main content
          const skipLink = document.querySelector('.skip-to-content');
          if (skipLink) skipLink.focus({ preventScroll: true });
          return;
        }

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          event.preventDefault();
          const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - getHeaderOffset();

          window.scrollTo({
            top: Math.max(0, targetPosition),
            behavior: prefersReducedMotion ? 'auto' : 'smooth'
          });

          // Move focus to target section for keyboard and screen reader accessibility
          targetElement.setAttribute('tabindex', '-1');
          targetElement.focus({ preventScroll: true });
        }
      });
    });
  }

  /* --------------------------------------------------------------------------
     4. Responsive Mobile Navigation Menu (Drawer & Overlay)
     -------------------------------------------------------------------------- */
  function initMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const siteNav = document.getElementById('site-nav');
    const navOverlay = document.getElementById('nav-overlay');
    const navLinks = document.querySelectorAll('.site-nav .nav-link');

    if (!navToggle || !siteNav) return;

    let isMenuOpen = false;

    function openMenu() {
      isMenuOpen = true;
      navToggle.classList.add('is-active');
      siteNav.classList.add('is-open');
      if (navOverlay) navOverlay.classList.add('is-active');

      navToggle.setAttribute('aria-expanded', 'true');
      navToggle.setAttribute('aria-label', 'Close navigation menu');

      // Prevent background scrolling on mobile while drawer is active
      document.body.style.overflow = 'hidden';
    }

    function closeMenu(restoreFocus = true) {
      if (!isMenuOpen) return;

      isMenuOpen = false;
      navToggle.classList.remove('is-active');
      siteNav.classList.remove('is-open');
      if (navOverlay) navOverlay.classList.remove('is-active');

      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Open navigation menu');

      // Restore body scrolling
      document.body.style.overflow = '';

      if (restoreFocus && navToggle) {
        navToggle.focus();
      }
    }

    // Toggle button click
    navToggle.addEventListener('click', () => {
      if (isMenuOpen) {
        closeMenu(false);
      } else {
        openMenu();
      }
    });

    // Close when clicking outside on backdrop overlay
    if (navOverlay) {
      navOverlay.addEventListener('click', () => closeMenu(true));
    }

    // Close when clicking on any navigation link inside drawer
    navLinks.forEach(link => {
      link.addEventListener('click', () => closeMenu(false));
    });

    // Keyboard support: Close on Escape key
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && isMenuOpen) {
        closeMenu(true);
      }
    });

    // Close mobile drawer automatically if window is resized past mobile breakpoint
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && isMenuOpen) {
        closeMenu(false);
      }
    }, { passive: true });
  }

  /* --------------------------------------------------------------------------
     5. Unified Scroll Coordinator (Active Nav Spy + Floating Back-to-Top)
     -------------------------------------------------------------------------- */
  function initUnifiedScrollCoordinator() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = Array.from(document.querySelectorAll('section[id]'));
    const floatingBtn = document.getElementById('back-to-top');
    const footerBtn = document.getElementById('footer-back-to-top');
    const header = document.getElementById('site-header');

    const getHeaderOffset = () => (header ? header.offsetHeight + 16 : 80);

    // Scroll to Top action handler
    const scrollToTop = (event) => {
      if (event) event.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });

      const skipLink = document.querySelector('.skip-to-content');
      if (skipLink) skipLink.focus({ preventScroll: true });
    };

    if (floatingBtn) {
      floatingBtn.addEventListener('click', scrollToTop);
    }
    if (footerBtn) {
      footerBtn.addEventListener('click', scrollToTop);
    }

    // Single RAF-throttled scroll observer
    let isScrollTicking = false;

    function handleScrollUpdates() {
      const currentScrollY = window.scrollY;

      // 1. Update Floating Back-to-Top visibility (threshold: 350px)
      if (floatingBtn) {
        if (currentScrollY > 350) {
          floatingBtn.classList.add('is-visible');
        } else {
          floatingBtn.classList.remove('is-visible');
        }
      }

      // 2. Update Active Navigation Link (Scroll Spy)
      if (sections.length && navLinks.length) {
        const scrollPosition = currentScrollY + getHeaderOffset() + 40;
        let activeSectionId = '';

        for (let i = sections.length - 1; i >= 0; i--) {
          const section = sections[i];
          if (section.offsetTop <= scrollPosition) {
            activeSectionId = section.getAttribute('id');
            break;
          }
        }

        if (!activeSectionId && sections.length > 0) {
          activeSectionId = sections[0].getAttribute('id');
        }

        navLinks.forEach(link => {
          const href = link.getAttribute('href');
          const isMatch = href === `#${activeSectionId}`;

          if (isMatch) {
            link.classList.add('is-active');
            link.setAttribute('aria-current', 'true');
          } else {
            link.classList.remove('is-active');
            link.removeAttribute('aria-current');
          }
        });
      }

      isScrollTicking = false;
    }

    window.addEventListener('scroll', () => {
      if (!isScrollTicking) {
        window.requestAnimationFrame(handleScrollUpdates);
        isScrollTicking = true;
      }
    }, { passive: true });

    // Initial check on load
    handleScrollUpdates();
  }

  /* --------------------------------------------------------------------------
     6. Accessible Toast Notifications for Sample / Placeholder Links
     -------------------------------------------------------------------------- */
  function initPlaceholderLinkHandler() {
    const toastElement = document.getElementById('portfolio-toast');
    const toastMessage = document.getElementById('toast-message');
    let toastTimeout = null;

    function hideToast() {
      if (toastElement) {
        toastElement.classList.remove('is-visible');
        toastElement.setAttribute('aria-hidden', 'true');
      }
    }

    function showToast(message) {
      if (!toastElement || !toastMessage) return;

      toastMessage.textContent = message;
      toastElement.classList.add('is-visible');
      toastElement.removeAttribute('aria-hidden');

      if (toastTimeout) {
        clearTimeout(toastTimeout);
      }

      toastTimeout = setTimeout(hideToast, 3400);
    }

    // Dismiss toast on Escape key
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && toastElement && toastElement.classList.contains('is-visible')) {
        hideToast();
      }
    });

    // Event delegation: intercepts clicks on placeholder links
    document.addEventListener('click', (event) => {
      const placeholderLink = event.target.closest('[data-placeholder="true"]');
      if (!placeholderLink) return;

      event.preventDefault();

      const label = placeholderLink.getAttribute('data-placeholder-name') ||
                    placeholderLink.getAttribute('aria-label') ||
                    'Project link';

      showToast(`Sample Link [${label}]: Update with your genuine destination in index.html.`);
    });
  }

})();
