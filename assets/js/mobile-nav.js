/**
 * mobile-nav.js — B.K. Neon
 * Premium GSAP-animated fullscreen mobile navigation
 */

(function () {
  'use strict';

  /* ── Wait for DOM ────────────────────────────── */
  document.addEventListener('DOMContentLoaded', initMobileNav);

  function initMobileNav() {
    const hamburger = document.querySelector('.nav-hamburger');
    const overlay   = document.querySelector('.mobile-menu-overlay');
    const panel     = document.querySelector('.mobile-menu-panel');
    const closeBtn  = document.querySelector('.mobile-menu-close');
    const navItems  = document.querySelectorAll('.mobile-nav-item');
    const menuLinks = document.querySelectorAll('.mobile-nav-link[data-href]');
    const footer    = document.querySelector('.mobile-menu-footer');

    if (!hamburger || !overlay || !panel) return;

    let isOpen = false;

    /* ── GSAP timeline (open) ─────────────────── */
    function buildOpenTl() {
      const tl = gsap.timeline({ paused: true });

      // 1. Slide panel in
      tl.to(panel, {
        x: '0%',
        duration: 0.55,
        ease: 'power3.out',
      }, 0);

      // 2. Stagger nav items in
      tl.to(navItems, {
        opacity: 1,
        x: 0,
        duration: 0.45,
        stagger: 0.07,
        ease: 'power2.out',
      }, 0.20);

      // 3. Footer fade in
      if (footer) {
        tl.fromTo(footer, {
          opacity: 0,
          y: 16,
        }, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: 'power2.out',
        }, 0.50);
      }

      return tl;
    }

    let openTl = buildOpenTl();

    /* ── Open ────────────────────────────────── */
    function openMenu() {
      if (isOpen) return;
      isOpen = true;

      // Reset items for re-entry animation
      gsap.set(navItems, { opacity: 0, x: 40 });
      if (footer) gsap.set(footer, { opacity: 0, y: 16 });

      overlay.classList.add('is-visible');
      hamburger.classList.add('is-open');
      document.body.classList.add('mobile-menu-open');

      openTl.invalidate().restart();
    }

    /* ── Close ───────────────────────────────── */
    function closeMenu() {
      if (!isOpen) return;
      isOpen = false;

      hamburger.classList.remove('is-open');

      // Slide panel out
      gsap.to(panel, {
        x: '100%',
        duration: 0.40,
        ease: 'power3.in',
        onComplete: () => {
          overlay.classList.remove('is-visible');
          document.body.classList.remove('mobile-menu-open');
          // Reset nav items
          gsap.set(navItems, { opacity: 0, x: 40 });
          if (footer) gsap.set(footer, { opacity: 0, y: 16 });
        }
      });
    }

    /* ── Bind events ─────────────────────────── */
    hamburger.addEventListener('click', () => isOpen ? closeMenu() : openMenu());
    closeBtn.addEventListener('click', closeMenu);

    // Click outside panel (on dark overlay area)
    overlay.addEventListener('click', (e) => {
      if (!panel.contains(e.target)) closeMenu();
    });

    // Nav link click — navigate after close animation
    menuLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('data-href');
        closeMenu();
        // Short delay for close animation to feel smooth
        setTimeout(() => { window.location.href = href; }, 320);
      });
    });

    // ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen) closeMenu();
    });

    /* ── Initialise panel off-screen ─────────── */
    gsap.set(panel, { x: '100%' });
    gsap.set(navItems, { opacity: 0, x: 40 });
    if (footer) gsap.set(footer, { opacity: 0, y: 16 });
  }

})();
