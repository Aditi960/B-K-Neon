/* ══════════════════════════════════════════
   B.K. Neon — Gallery JavaScript
   Premium animated image gallery
   ══════════════════════════════════════════ */

gsap.registerPlugin(ScrollTrigger);
const lenis = new Lenis({ duration: 1.35, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothTouch: false });
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add(t => lenis.raf(t * 1000));
gsap.ticker.lagSmoothing(0);

/* ── Custom cursor ─────────────────────── */
const dot = document.getElementById('cur-dot'), ring = document.getElementById('cur-ring');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; gsap.to(dot, { x: mx, y: my, duration: 0.06 }); });
(function lerp() { rx += (mx - rx) * 0.11; ry += (my - ry) * 0.11; ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; requestAnimationFrame(lerp); })();

/* ── Navbar scroll ─────────────────────── */
const nav = document.getElementById('nav'); let lastY = 0;
lenis.on('scroll', ({ scroll }) => { nav.classList.toggle('solid', scroll > 60); if (scroll > lastY && scroll > 120) gsap.to(nav, { y: -80, duration: 0.45, ease: 'power2.inOut' }); else gsap.to(nav, { y: 0, duration: 0.38, ease: 'power2.out' }); lastY = scroll; });

/* ── Page header animations ────────────── */
gsap.set('#pageEyebrow', { opacity: 0, y: 14 }); gsap.set('#pageTitle', { opacity: 0, y: 30 }); gsap.set('#pageSubtitle', { opacity: 0, y: 20 });
gsap.timeline({ delay: 0.1 }).to('#pageEyebrow', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }).to('#pageTitle', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.08).to('#pageSubtitle', { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 0.25);

/* ══════════════════════════════════════════
   Gallery Image Array
   All real filenames from assets/images/
   ══════════════════════════════════════════ */
const galleryImages = [
  'IMG-20230608-WA0000.jpg',
  'IMG-20230608-WA0001.jpg',
  'IMG-20230608-WA0002.jpg',
  'IMG-20230608-WA0003.jpg',
  'IMG-20230608-WA0004.jpg',
  'IMG-20230608-WA0005.jpg',
  'IMG-20230608-WA0006.jpg',
  'IMG-20230608-WA0007.jpg',
  'IMG-20230608-WA0008.jpg',
  'IMG-20230608-WA0009.jpg',
  'IMG-20230608-WA0010.jpg',
  'IMG-20230608-WA0011.jpg',
  'IMG-20230608-WA0012.jpg',
  'IMG-20230608-WA0014.jpg',
  'IMG-20230608-WA0015.jpg',
  'IMG-20230608-WA0016.jpg',
  'IMG-20230608-WA0017.jpg',
  'IMG-20230608-WA0018.jpg',
  'IMG-20230608-WA0019.jpg',
  'IMG-20230608-WA0020.jpg',
  'IMG-20230608-WA0021.jpg',
  'IMG-20230608-WA0022.jpg',
  'IMG-20230608-WA0023.jpg',
  'IMG-20230608-WA0024.jpg',
  'IMG-20230608-WA0025.jpg',
  'IMG-20230608-WA0026.jpg',
  'IMG-20230608-WA0027.jpg',
  'IMG-20230608-WA0028.jpg',
  'IMG-20230608-WA0029.jpg',
  'IMG-20230608-WA0030.jpg',
  'IMG-20230608-WA0031.jpg',
  'IMG-20230608-WA0032.jpg',
  'IMG-20230608-WA0033.jpg',
  'IMG-20230608-WA0034.jpg',
  'IMG-20230608-WA0035.jpg',
  'IMG-20230608-WA0036.jpg',
  'IMG-20230608-WA0037.jpg',
  'IMG-20230608-WA0038.jpg',
  'IMG-20230608-WA0039.jpg',
  'IMG-20230608-WA0040.jpg',
  'IMG-20230608-WA0041.jpg',
  'IMG-20230608-WA0042.jpg',
  'IMG-20230608-WA0043.jpg',
  'IMG-20230608-WA0044.jpg',
  'IMG-20230608-WA0045.jpg',
  'IMG-20230608-WA0046.jpg',
  'IMG-20230608-WA0047.jpg',
  'IMG-20230608-WA0048.jpg',
  'IMG-20230608-WA0049.jpg',
  'IMG-20230608-WA0050.jpg',
  'IMG-20230608-WA0051.jpg',
  'IMG-20230608-WA0052.jpg',
  'IMG-20230608-WA0053.jpg',
  'IMG-20230608-WA0054.jpg',
  'IMG-20230608-WA0055.jpg',
  'IMG-20230608-WA0056.jpg',
  'IMG-20230608-WA0057.jpg',
  'IMG-20230608-WA0058.jpg',
  'IMG-20230608-WA0059.jpg',
  'IMG-20230608-WA0060.jpg',
  'IMG-20230608-WA0061.jpg',
  'IMG-20211205-WA0000.jpg',
  'IMG-20211205-WA0001.jpg',
  'IMG-20211205-WA0002.jpg',
  'IMG-20211205-WA0004.jpg',
  'IMG-20211205-WA0005.jpg',
  'IMG-20211205-WA0006.jpg',
  'IMG-20211205-WA0007.jpg',
  'IMG-20211205-WA0009.jpg',
  'IMG-20211205-WA0010.jpg',
  'IMG-20211205-WA0011.jpg',
  'IMG-20211205-WA0012.jpg',
  'IMG-20211205-WA0013.jpg',
  'IMG-20211205-WA0014.jpg',
  'IMG-20211205-WA0015.jpg',
  'IMG-20211205-WA0016.jpg',
  'IMG-20211205-WA0017.jpg',
  'IMG-20211205-WA0018.jpg',
  'IMG-20211205-WA0019.jpg',
  'IMG-20211205-WA0020.jpg',
  'IMG-20211205-WA0022.jpg',
  'IMG-20211206-WA0007.jpg',
  'IMG-20211212-WA0030.jpg',
  'IMG-20211212-WA0031.jpg',
  'IMG-20211212-WA0032.jpg',
  'IMG-20220422-WA0012.jpg',
  'IMG-20200316-WA0038.jpg',
  'IMG-20200316-WA0041.jpg',
  'IMG-20200316-WA0048.jpg',
];

/* ══════════════════════════════════════════
   Dynamically Build Gallery
   ══════════════════════════════════════════ */
const galleryGrid = document.getElementById('galleryGrid');

galleryImages.forEach((filename, i) => {
  const item = document.createElement('div');
  item.className = 'gallery-item';
  item.dataset.index = i;

  const img = document.createElement('img');
  img.src = `assets/images/${filename}`;
  img.alt = `B.K. Neon — Showcase ${i + 1}`;
  img.loading = 'lazy';
  img.draggable = false;

  item.appendChild(img);
  galleryGrid.appendChild(item);
});

/* ── Hover cursor class ────────────────── */
document.querySelectorAll('a, button, .gallery-item').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('hov'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('hov'));
});

/* ══════════════════════════════════════════
   Staggered Scroll Reveal (GSAP)
   ══════════════════════════════════════════ */
document.querySelectorAll('.gallery-item').forEach((item, i) => {
  gsap.to(item, {
    opacity: 1,
    y: 0,
    duration: 0.85,
    ease: 'power3.out',
    delay: (i % 3) * 0.12,
    scrollTrigger: {
      trigger: item,
      start: 'top 90%',
    }
  });
});

/* ══════════════════════════════════════════
   Cinematic Lightbox
   ══════════════════════════════════════════ */
const lightbox = document.getElementById('galleryLightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCounter = document.getElementById('lightboxCounter');
let currentIndex = 0;

function openLightbox(index) {
  currentIndex = index;
  updateLightboxImage();
  lightbox.classList.add('active');
  lenis.stop();
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('active');
  lenis.start();
  document.body.style.overflow = '';
}

function updateLightboxImage() {
  lightboxImg.src = `assets/images/${galleryImages[currentIndex]}`;
  lightboxImg.alt = `B.K. Neon — Showcase ${currentIndex + 1}`;
  lightboxCounter.innerHTML = `<span class="current-num">${String(currentIndex + 1).padStart(2, '0')}</span> / ${String(galleryImages.length).padStart(2, '0')}`;
}

function nextImage() {
  currentIndex = (currentIndex + 1) % galleryImages.length;
  updateLightboxImage();
}

function prevImage() {
  currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
  updateLightboxImage();
}

// Click on gallery item
document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    openLightbox(parseInt(item.dataset.index));
  });
});

// Close button
document.getElementById('lightboxClose').addEventListener('click', closeLightbox);

// Backdrop click
document.querySelector('.lightbox-backdrop').addEventListener('click', closeLightbox);

// Nav arrows
document.getElementById('lightboxPrev').addEventListener('click', (e) => { e.stopPropagation(); prevImage(); });
document.getElementById('lightboxNext').addEventListener('click', (e) => { e.stopPropagation(); nextImage(); });

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') nextImage();
  if (e.key === 'ArrowLeft') prevImage();
});

/* ── Process steps (kept) ──────────────── */
['#pstep0', '#pstep1', '#pstep2'].forEach((id, i) => { gsap.to(id, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: i * 0.15, scrollTrigger: { trigger: '.process-strip', start: 'top 80%' } }); });

/* ── CTA (kept) ────────────────────────── */
gsap.set('#ctaEyebrow', { opacity: 0, y: 12 }); gsap.set('#ctaTitle', { opacity: 0, y: 40 }); gsap.set('#ctaActions', { opacity: 0, y: 24 });
gsap.timeline({ scrollTrigger: { trigger: '.cta-section', start: 'top 75%' } })
  .to('#ctaEyebrow', { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' })
  .to('#ctaTitle', { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' }, '-=0.4')
  .to('#ctaActions', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5');
gsap.to('.cta-blob', { yPercent: -18, ease: 'none', scrollTrigger: { trigger: '.cta-section', start: 'top bottom', end: 'bottom top', scrub: 2 } });