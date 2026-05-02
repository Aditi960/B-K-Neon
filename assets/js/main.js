gsap.registerPlugin(ScrollTrigger);

/* ── Lenis smooth scroll ───────────────────── */
const lenis = new Lenis({
  duration: 1.35,
  easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothTouch: false,
});
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add(t => lenis.raf(t * 1000));
gsap.ticker.lagSmoothing(0);

/* ── Custom cursor ─────────────────────────── */
const dot = document.getElementById('cur-dot');
const ring = document.getElementById('cur-ring');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  gsap.to(dot, { x: mx, y: my, duration: 0.06 });
});
(function lerp() {
  rx += (mx - rx) * 0.11; ry += (my - ry) * 0.11;
  ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
  requestAnimationFrame(lerp);
})();
document.querySelectorAll('a,button,.product-card').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('hov'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('hov'));
});

/* ── Nav scroll behaviour ──────────────────── */
const nav = document.getElementById('nav');
lenis.on('scroll', ({ scroll }) => {
  nav.classList.toggle('solid', scroll > 60);
});

/* ── Hero entrance ─────────────────────────── */
gsap.set(['#hl1', '#hl2', '#hl3'], { y: '110%' });
gsap.set(['#heroDesc', '#heroStats', '#heroCtas'], { opacity: 0, y: 22 });

const heroTl = gsap.timeline({ delay: 0.15 });
heroTl
  .to(['#hl1', '#hl2', '#hl3'], {
    y: 0,
    stagger: 0.12,
    duration: 1.0,
    ease: 'power4.out'
  })
  .to('#heroDesc', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.55)
  .to('#heroStats', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.70)
  .to('#heroCtas', { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 0.85);

/* Sign slides in from right */
gsap.from('#neonSign', {
  x: 80, opacity: 0, duration: 1.2, ease: 'power3.out', delay: 0.4
});

/* ── Nav hide on scroll down ───────────────── */
let lastY = 0;
lenis.on('scroll', ({ scroll }) => {
  if (scroll > lastY && scroll > 120) {
    gsap.to(nav, { y: -80, duration: 0.45, ease: 'power2.inOut' });
  } else {
    gsap.to(nav, { y: 0, duration: 0.38, ease: 'power2.out' });
  }
  lastY = scroll;
});

/* ── Blob parallax ─────────────────────────── */
gsap.to('.blob-1', {
  yPercent: -20, ease: 'none',
  scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 2 }
});
gsap.to('.blob-2', {
  yPercent: -14, ease: 'none',
  scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 2.5 }
});
gsap.to('#heroRight', {
  yPercent: -8, ease: 'none',
  scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.8 }
});

/* ── About strip ───────────────────────────── */
const fadeUp = (id, delay = 0) => gsap.to(id, {
  opacity: 1, y: 0, duration: 0.9,
  delay,
  ease: 'power3.out',
  scrollTrigger: { trigger: id, start: 'top 82%' }
});
gsap.set('#aboutLabel', { opacity: 0, y: 20 });
gsap.set('#aboutTitle', { opacity: 0, y: 30 });
gsap.set('#aboutBody', { opacity: 0, y: 20 });
fadeUp('#aboutLabel', 0);
fadeUp('#aboutTitle', 0.1);
fadeUp('#aboutBody', 0.2);

/* ── Sec title & link ──────────────────────── */
gsap.set('#secTitle', { opacity: 0, y: 30 });
gsap.set('#secLink', { opacity: 0, y: 10 });
fadeUp('#secTitle', 0);
fadeUp('#secLink', 0.15);

/* ── Product cards stagger ─────────────────── */
['#card0', '#card1', '#card2', '#card3', '#card4'].forEach((id, i) => {
  gsap.to(id, {
    opacity: 1, y: 0,
    duration: 0.75,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#productGrid',
      start: 'top 78%',
    },
    delay: i * 0.1
  });
});

/* ── Stats stagger ─────────────────────────── */
['#stat0', '#stat1', '#stat2', '#stat3'].forEach((id, i) => {
  gsap.to(id, {
    opacity: 1, y: 0, duration: 0.8,
    ease: 'power3.out',
    delay: i * 0.12,
    scrollTrigger: { trigger: '.stats-strip', start: 'top 80%' }
  });
});

/* ── HIW stagger ─────────────────────────── */
gsap.set('#hiwTitle', { opacity: 0, y: 30 });
fadeUp('#hiwTitle', 0);
['#hiwStep0', '#hiwStep1', '#hiwStep2'].forEach((id, i) => {
  gsap.to(id, {
    opacity: 1, y: 0, duration: 0.8,
    ease: 'power3.out',
    delay: i * 0.15,
    scrollTrigger: { trigger: '#hiwGrid', start: 'top 80%' }
  });
});

/* ── CTA ───────────────────────────────────── */
gsap.set('#ctaEyebrow', { opacity: 0, y: 12 });
gsap.set('#ctaTitle', { opacity: 0, y: 40 });
gsap.set('#ctaActions', { opacity: 0, y: 24 });

const ctaTl = gsap.timeline({
  scrollTrigger: { trigger: '.cta-section', start: 'top 75%' }
});
ctaTl
  .to('#ctaEyebrow', { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' })
  .to('#ctaTitle', { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' }, '-=0.4')
  .to('#ctaActions', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5');

/* ── CTA blob parallax ─────────────────────── */
gsap.to('.cta-blob', {
  yPercent: -18,
  ease: 'none',
  scrollTrigger: {
    trigger: '.cta-section',
    start: 'top bottom', end: 'bottom top',
    scrub: 2
  }
});