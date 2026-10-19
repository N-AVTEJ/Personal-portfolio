/**
 * ALEX RIVERA — DEVELOPER PORTFOLIO
 * Phase 2: Functionality, Interactions & JavaScript
 * 
 * Features:
 * 1. Semantic Navigation & Active Section Scroll Spy
 * 2. Accessible Responsive Mobile Menu (Drawer, Overlay, Escape key, Outside-click)
 * 3. Smooth Anchor Scrolling with Sticky Header Offset
 * 4. Floating & Footer Back-to-Top Controls
 * 5. Placeholder Link Interceptor with Accessible Toast Notifications
 * 6. Dynamic Copyright Year
 * 7. Lucide Icon Initialization
 */

(() => {
  'use strict';

  // Check user preference for reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.addEventListener('DOMContentLoaded', () => {
    initLucideIcons();
    initDynamicYear();
    initNavigationAndScrollSpy();
    initMobileMenu();
    initBackToTop();
    initPlaceholderLinkHandler();
  });

  /* --------------------------------------------------------------------------
     1. Lucide Icons Initialization
     -------------------------------------------------------------------------- */
  function initLucideIcons() {
    if (typeof lucide !== 'undefined' && typeof lucide.createIcons === 'function') {
      lucide.createIcons();
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
     3. Navigation, Smooth Scrolling & Active Section Scroll Spy
     -------------------------------------------------------------------------- */
  function initNavigationAndScrollSpy() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = Array.from(document.querySelectorAll('section[id]'));
    const header = document.getElementById('site-header');

    if (!navLinks.length || !sections.length) return;

    // Helper: calculate sticky header height
    const getHeaderOffset = () => (header ? header.offsetHeight + 16 : 80);

    // Smooth scrolling for anchor links with hash
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"]):not([data-placeholder="true"])');
    anchorLinks.forEach(link => {
      link.addEventListener('click', (event) => {
        const targetId = link.getAttribute('href');
        if (!targetId || targetId === '#') return;

        // Skip to content or top
        if (targetId === '#top') {
          event.preventDefault();
          window.scrollTo({
            top: 0,
            behavior: prefersReducedMotion ? 'auto' : 'smooth'
          });
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

          // Move focus to target for accessibility
          targetElement.setAttribute('tabindex', '-1');
          targetElement.focus({ preventScroll: true });
        }
      });
    });

    // Scroll Spy: Highlight active nav link based on scroll position
    let isScrollTicking = false;

    function updateActiveNavLink() {
      const scrollPosition = window.scrollY + getHeaderOffset() + 40;
      let currentSectionId = '';

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.offsetTop <= scrollPosition) {
          currentSectionId = section.getAttribute('id');
          break;
        }
      }

      // Default to first section (home) if scrolled to very top
      if (!currentSectionId && sections.length > 0) {
        currentSectionId = sections[0].getAttribute('id');
      }

      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        const isMatch = href === `#${currentSectionId}`;

        if (isMatch) {
          link.classList.add('is-active');
          link.setAttribute('aria-current', 'true');
        } else {
          link.classList.remove('is-active');
          link.removeAttribute('aria-current');
        }
      });

      isScrollTicking = false;
    }

    window.addEventListener('scroll', () => {
      if (!isScrollTicking) {
        window.requestAnimationFrame(updateActiveNavLink);
        isScrollTicking = true;
      }
    }, { passive: true });

    // Initial check on load
    updateActiveNavLink();
  }

  /* --------------------------------------------------------------------------
     4. Responsive Mobile Navigation Menu
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

      // Prevent background scrolling on narrow screens
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

    // Close when clicking on any navigation link inside the drawer
    navLinks.forEach(link => {
      link.addEventListener('click', () => closeMenu(false));
    });

    // Keyboard support: Close on Escape key
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && isMenuOpen) {
        closeMenu(true);
      }
    });

    // Close mobile menu automatically if viewport is resized to desktop width
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && isMenuOpen) {
        closeMenu(false);
      }
    }, { passive: true });
  }

  /* --------------------------------------------------------------------------
     5. Back-to-Top Button Functionality
     -------------------------------------------------------------------------- */
  function initBackToTop() {
    const floatingBtn = document.getElementById('back-to-top');
    const footerBtn = document.getElementById('footer-back-to-top');

    const scrollToTop = (event) => {
      if (event) event.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });

      // Shift focus to skip link or body top for keyboard users
      const skipLink = document.querySelector('.skip-to-content');
      if (skipLink) {
        skipLink.focus();
      }
    };

    if (floatingBtn) {
      floatingBtn.addEventListener('click', scrollToTop);

      // Show/hide floating button based on scroll depth (threshold: 350px)
      let isBackToTopTicking = false;

      const handleScroll = () => {
        if (window.scrollY > 350) {
          floatingBtn.classList.add('is-visible');
        } else {
          floatingBtn.classList.remove('is-visible');
        }
        isBackToTopTicking = false;
      };

      window.addEventListener('scroll', () => {
        if (!isBackToTopTicking) {
          window.requestAnimationFrame(handleScroll);
          isBackToTopTicking = true;
        }
      }, { passive: true });

      // Initial check
      handleScroll();
    }

    if (footerBtn) {
      footerBtn.addEventListener('click', scrollToTop);
    }
  }

  /* --------------------------------------------------------------------------
     6. Placeholder Link Interceptor with Toast Notifications
     -------------------------------------------------------------------------- */
  function initPlaceholderLinkHandler() {
    const toastElement = document.getElementById('portfolio-toast');
    const toastMessage = document.getElementById('toast-message');
    let toastTimeout = null;

    function showToast(message) {
      if (!toastElement || !toastMessage) return;

      toastMessage.textContent = message;
      toastElement.classList.add('is-visible');
      toastElement.removeAttribute('aria-hidden');

      if (toastTimeout) {
        clearTimeout(toastTimeout);
      }

      toastTimeout = setTimeout(() => {
        toastElement.classList.remove('is-visible');
        toastElement.setAttribute('aria-hidden', 'true');
      }, 3400);
    }

    // Event delegation: capture clicks on any placeholder link
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
