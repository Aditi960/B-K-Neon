/* ══════════════════════════════════════════
   B.K. Neon — Work Page JavaScript
   Categorized folder-based portfolio gallery
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
const nav = document.getElementById('nav');
let lastY = 0, isNavHovered = false, mouseY = 0, scrollDir = 0;
nav.addEventListener('mouseenter', () => isNavHovered = true);
nav.addEventListener('mouseleave', () => { isNavHovered = false; updateNav(); });
document.addEventListener('mousemove', e => { mouseY = e.clientY; updateNav(); });
function updateNav() {
    if (isNavHovered || mouseY <= 90 || lastY <= 120 || scrollDir === -1) {
        gsap.to(nav, { y: 0, duration: 0.38, ease: 'power2.out', overwrite: 'auto' });
    } else if (scrollDir === 1 && lastY > 120) {
        gsap.to(nav, { y: -80, duration: 0.45, ease: 'power2.inOut', overwrite: 'auto' });
    }
}
lenis.on('scroll', ({ scroll }) => {
    nav.classList.toggle('solid', scroll > 60);
    if (scroll > lastY) scrollDir = 1;
    else if (scroll < lastY) scrollDir = -1;
    lastY = scroll;
    updateNav();
});

/* ── Page header animations ────────────── */
gsap.set('#pageEyebrow', { opacity: 0, y: 14 }); gsap.set('#pageTitle', { opacity: 0, y: 30 }); gsap.set('#pageSubtitle', { opacity: 0, y: 20 });
gsap.timeline({ delay: 0.1 }).to('#pageEyebrow', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }).to('#pageTitle', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.08).to('#pageSubtitle', { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 0.25);

/* ══════════════════════════════════════════
   GALLERY CONFIGURATION
   ──────────────────────────────────────────
   Each category maps to a folder under
   assets/images/<folder>/

   To add images:
     1. Drop the file into the correct folder
     2. Add the filename to the array below
   
   To add a new category:
     1. Create a new folder in assets/images/
     2. Add a new entry to GALLERY_CATEGORIES
     3. Add a matching filter button in work.html
   ══════════════════════════════════════════ */

const GALLERY_CATEGORIES = {
  led: {
    label: 'LED',
    folder: 'LED',
    images: [
      'IMG-20230608-WA0017.jpg',
      'IMG-20230608-WA0021.jpg',
      'IMG-20230608-WA0022.jpg',
      'IMG-20230608-WA0026.jpg',
      'IMG-20230608-WA0027.jpg',
      'IMG-20230608-WA0044.jpg',
      'IMG-20230608-WA0045.jpg',
      'IMG-20230608-WA0050.jpg',
      'IMG-20230608-WA0051.jpg',
      'IMG-20230608-WA0052.jpg',
      'IMG-20230608-WA0055.jpg',
      'IMG-20230608-WA0056.jpg',
      'IMG-20200316-WA0038.jpg',
      'IMG-20200316-WA0041.jpg',
      'IMG-20211205-WA0001.jpg',
      'IMG-20211205-WA0004.jpg',
      'IMG-20211205-WA0005.jpg',
      'IMG-20211205-WA0006.jpg',
      'IMG-20211205-WA0013.jpg',
      'IMG-20211205-WA0014.jpg',
      'IMG-20211205-WA0015.jpg',
      'IMG-20211205-WA0016.jpg',
      'IMG-20211205-WA0017.jpg',
      'IMG-20211205-WA0019.jpg',
      'IMG-20211212-WA0030.jpg',
      'IMG-20211212-WA0031.jpg',
      'IMG-20211212-WA0032.jpg',
      'WhatsApp Image 2026-05-07 at 6.58.19 PM (1).jpeg',
      'WhatsApp Image 2026-05-07 at 6.58.20 PM (1).jpeg',
      'WhatsApp Image 2026-05-07 at 6.58.20 PM.jpeg',
      'WhatsApp Image 2026-05-07 at 6.58.21 PM.jpeg',
      'WhatsApp Image 2026-05-07 at 6.58.23 PM (3).jpeg',
      'WhatsApp Image 2026-05-07 at 6.58.24 PM (2).jpeg',
      'WhatsApp Image 2026-05-07 at 6.58.25 PM.jpeg',
      'WhatsApp Image 2026-05-07 at 6.58.29 PM.jpeg',
    ]
  },

  neon: {
    label: 'Neon',
    folder: 'NEON',
    images: [
      'IMG-20211205-WA0000.jpg',
      'IMG-20211205-WA0002.jpg',
      'IMG-20211205-WA0009.jpg',
      'IMG-20211205-WA0010.jpg',
      'IMG-20211205-WA0012.jpg',
      'IMG-20211205-WA0018.jpg',
      'IMG-20211205-WA0020.jpg',
      'IMG-20211205-WA0022.jpg',
      'IMG-20230608-WA0000.jpg',
      'IMG-20230608-WA0001.jpg',
      'IMG-20230608-WA0004.jpg',
      'IMG-20230608-WA0005.jpg',
      'IMG-20230608-WA0008.jpg',
      'IMG-20230608-WA0019.jpg',
      'IMG-20230608-WA0025.jpg',
      'IMG-20230608-WA0028.jpg',
      'IMG-20230608-WA0029.jpg',
      'IMG-20230608-WA0030.jpg',
      'IMG-20230608-WA0031.jpg',
      'IMG-20230608-WA0032.jpg',
      'IMG-20230608-WA0033.jpg',
      'IMG-20230608-WA0035.jpg',
      'IMG-20230608-WA0036.jpg',
      'IMG-20230608-WA0037.jpg',
      'IMG-20230608-WA0049.jpg',
      'IMG-20230608-WA0053.jpg',
      'IMG-20230608-WA0057.jpg',
      'IMG-20230608-WA0061.jpg',
      'ChatGPT Image May 7, 2026, 06_53_44 PM.png',
      'WhatsApp Image 2026-05-07 at 6.58.19 PM (2).jpeg',
      'WhatsApp Image 2026-05-07 at 6.58.20 PM (2).jpeg',
      'WhatsApp Image 2026-05-07 at 6.58.21 PM (2).jpeg',
      'WhatsApp Image 2026-05-07 at 6.58.22 PM (1).jpeg',
      'WhatsApp Image 2026-05-07 at 6.58.22 PM (2).jpeg',
      'WhatsApp Image 2026-05-07 at 6.58.23 PM (1).jpeg',
      'WhatsApp Image 2026-05-07 at 6.58.23 PM (2).jpeg',
      'WhatsApp Image 2026-05-07 at 6.58.23 PM.jpeg',
    ]
  },

  flex: {
    label: 'Flex',
    folder: 'flex',
    images: [
      'WhatsApp Image 2026-05-07 at 6.48.42 PM (2).jpeg',
      'WhatsApp Image 2026-05-07 at 6.48.42 PM (3).jpeg',
      'WhatsApp Image 2026-05-07 at 6.48.43 PM.jpeg',
      'WhatsApp Image 2026-05-07 at 6.58.17 PM.jpeg',
      'WhatsApp Image 2026-05-07 at 6.58.18 PM.jpeg',
      'WhatsApp Image 2026-05-07 at 6.58.19 PM.jpeg',
      'WhatsApp Image 2026-05-07 at 6.58.24 PM (1).jpeg',
      'WhatsApp Image 2026-05-07 at 6.58.25 PM (1).jpeg',
      'WhatsApp Image 2026-05-07 at 6.58.25 PM (2).jpeg',
      'WhatsApp Image 2026-05-07 at 6.58.25 PM (3).jpeg',
      'WhatsApp Image 2026-05-07 at 6.58.26 PM (1).jpeg',
      'WhatsApp Image 2026-05-07 at 6.58.26 PM (2).jpeg',
      'WhatsApp Image 2026-05-07 at 6.58.26 PM.jpeg',
      'WhatsApp Image 2026-05-07 at 6.58.27 PM (1).jpeg',
      'WhatsApp Image 2026-05-07 at 6.58.27 PM (2).jpeg',
      'WhatsApp Image 2026-05-07 at 6.58.27 PM (3).jpeg',
      'WhatsApp Image 2026-05-07 at 6.58.27 PM.jpeg',
      'WhatsApp Image 2026-05-07 at 6.58.28 PM (1).jpeg',
      'WhatsApp Image 2026-05-07 at 6.58.28 PM (2).jpeg',
      'WhatsApp Image 2026-05-07 at 6.58.28 PM (3).jpeg',
      'WhatsApp Image 2026-05-07 at 6.58.28 PM.jpeg',
    ]
  },

  plates: {
    label: 'Plates',
    folder: 'Plates',
    images: [
      'IMG-20230608-WA0038.jpg',
      'WhatsApp Image 2026-05-07 at 6.58.21 PM (1).jpeg',
      'WhatsApp Image 2026-05-07 at 6.58.21 PM (3).jpeg',
      'WhatsApp Image 2026-05-07 at 6.58.22 PM.jpeg',
    ]
  }
};

/* ══════════════════════════════════════════
   Build flat gallery array from categories
   ══════════════════════════════════════════ */
function buildGalleryData() {
  const items = [];
  for (const [catKey, catConfig] of Object.entries(GALLERY_CATEGORIES)) {
    catConfig.images.forEach(filename => {
      items.push({
        src: `assets/images/${catConfig.folder}/${encodeURIComponent(filename)}`,
        cat: catKey,
        label: catConfig.label,
        filename: filename
      });
    });
  }
  // Shuffle for a natural mixed feel in "All Work" view
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
  return items;
}

const galleryData = buildGalleryData();

/* ══════════════════════════════════════════
   Render Gallery Grid
   ══════════════════════════════════════════ */
const galleryGrid = document.getElementById('galleryGrid');

function renderGallery(data) {
  galleryGrid.innerHTML = '';

  data.forEach((entry, i) => {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.dataset.cat = entry.cat;
    item.dataset.index = i;

    // Glow overlay
    const glow = document.createElement('div');
    glow.className = 'gallery-glow';
    item.appendChild(glow);

    // Image
    const img = document.createElement('img');
    img.src = entry.src;
    img.alt = `B.K. Neon — ${entry.label} Sign`;
    img.loading = 'lazy';
    img.draggable = false;

    // Category badge
    const badge = document.createElement('span');
    badge.className = 'gallery-badge';
    badge.textContent = entry.label;

    // Zoom icon overlay
    const zoomIcon = document.createElement('div');
    zoomIcon.className = 'gallery-zoom-icon';
    zoomIcon.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><line x1="16.5" y1="16.5" x2="21" y2="21"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>`;

    item.appendChild(img);
    item.appendChild(badge);
    item.appendChild(zoomIcon);
    galleryGrid.appendChild(item);

    // Click → open lightbox
    item.addEventListener('click', () => openLightbox(i, data));
  });

  // Re-bind hover cursors
  bindCursorHovers();
  // Run staggered reveal
  animateGalleryItems();
}

/* ── Initial render ────────────────────── */
renderGallery(galleryData);

/* ── Hover cursor class ────────────────── */
function bindCursorHovers() {
  document.querySelectorAll('a, button, .gallery-item').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('hov'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('hov'));
  });
}

/* ── Staggered scroll reveal ───────────── */
function animateGalleryItems() {
  // Kill previous ScrollTrigger instances for gallery items
  ScrollTrigger.getAll().forEach(st => {
    if (st.trigger && st.trigger.classList && st.trigger.classList.contains('gallery-item')) {
      st.kill();
    }
  });

  document.querySelectorAll('.gallery-item').forEach((item, i) => {
    gsap.set(item, { opacity: 0, y: 30 });
    gsap.to(item, {
      opacity: 1,
      y: 0,
      duration: 0.85,
      ease: 'power3.out',
      delay: (i % 3) * 0.12,
      scrollTrigger: {
        trigger: item,
        start: 'top 92%',
      }
    });
  });
}

/* ══════════════════════════════════════════
   Category Filter
   ══════════════════════════════════════════ */
const filterBtns = document.querySelectorAll('.filter-btn');
let activeFilter = 'all';

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;
    if (filter === activeFilter) return;

    activeFilter = filter;
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Animate out current items
    const currentItems = document.querySelectorAll('.gallery-item');
    gsap.to(currentItems, {
      opacity: 0,
      y: -15,
      duration: 0.3,
      ease: 'power2.in',
      stagger: 0.02,
      onComplete: () => {
        // Filter data
        const filtered = filter === 'all'
          ? galleryData
          : galleryData.filter(item => item.cat === filter);

        renderGallery(filtered);
        ScrollTrigger.refresh();
      }
    });
  });
});

/* ══════════════════════════════════════════
   Fullscreen Lightbox
   ══════════════════════════════════════════ */
let lightboxData = [];
let lightboxIndex = 0;

// Create lightbox DOM
const lightbox = document.createElement('div');
lightbox.id = 'galleryLightbox';
lightbox.className = 'lightbox';
lightbox.innerHTML = `
  <div class="lightbox-backdrop"></div>
  <div class="lightbox-content">
    <button class="lightbox-close" aria-label="Close lightbox">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
    </button>
    <button class="lightbox-nav lightbox-prev" aria-label="Previous image">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="15 18 9 12 15 6"/>
      </svg>
    </button>
    <div class="lightbox-image-wrap">
      <img class="lightbox-img" src="" alt="" />
      <div class="lightbox-loader"></div>
    </div>
    <button class="lightbox-nav lightbox-next" aria-label="Next image">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="9 6 15 12 9 18"/>
      </svg>
    </button>
    <div class="lightbox-info">
      <span class="lightbox-category"></span>
      <span class="lightbox-counter"></span>
    </div>
  </div>
`;
document.body.appendChild(lightbox);

const lbImg = lightbox.querySelector('.lightbox-img');
const lbCategory = lightbox.querySelector('.lightbox-category');
const lbCounter = lightbox.querySelector('.lightbox-counter');
const lbLoader = lightbox.querySelector('.lightbox-loader');

function openLightbox(index, data) {
  lightboxData = data;
  lightboxIndex = index;
  updateLightboxImage();

  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
  lenis.stop();

  gsap.fromTo(lightbox, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power2.out' });
  gsap.fromTo(lightbox.querySelector('.lightbox-content'),
    { scale: 0.92, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.5, ease: 'power3.out', delay: 0.1 }
  );
}

function closeLightbox() {
  gsap.to(lightbox, {
    opacity: 0, duration: 0.3, ease: 'power2.in',
    onComplete: () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
      lenis.start();
    }
  });
}

function updateLightboxImage() {
  const entry = lightboxData[lightboxIndex];
  lbLoader.style.display = 'block';
  lbImg.style.opacity = '0';

  lbImg.onload = () => {
    lbLoader.style.display = 'none';
    gsap.to(lbImg, { opacity: 1, duration: 0.4, ease: 'power2.out' });
  };

  lbImg.src = entry.src;
  lbImg.alt = `B.K. Neon — ${entry.label} Sign`;
  lbCategory.textContent = entry.label;
  lbCounter.textContent = `${lightboxIndex + 1} / ${lightboxData.length}`;
}

function navigateLightbox(dir) {
  lightboxIndex = (lightboxIndex + dir + lightboxData.length) % lightboxData.length;
  gsap.to(lbImg, {
    opacity: 0, x: dir * -30, duration: 0.2, ease: 'power2.in',
    onComplete: () => {
      gsap.set(lbImg, { x: dir * 30 });
      updateLightboxImage();
      gsap.to(lbImg, { x: 0, duration: 0.35, ease: 'power3.out' });
    }
  });
}

// Lightbox event listeners
lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
lightbox.querySelector('.lightbox-backdrop').addEventListener('click', closeLightbox);
lightbox.querySelector('.lightbox-prev').addEventListener('click', () => navigateLightbox(-1));
lightbox.querySelector('.lightbox-next').addEventListener('click', () => navigateLightbox(1));

// Keyboard navigation
document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') navigateLightbox(-1);
  if (e.key === 'ArrowRight') navigateLightbox(1);
});

// Touch swipe support
let touchStartX = 0;
lightbox.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
lightbox.addEventListener('touchend', e => {
  const diff = e.changedTouches[0].screenX - touchStartX;
  if (Math.abs(diff) > 50) navigateLightbox(diff > 0 ? -1 : 1);
}, { passive: true });

/* ── Portfolio CTA ─────────────────────── */
gsap.set('#portfolioCta', { opacity: 0, y: 20 });
gsap.to('#portfolioCta', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '.portfolio-cta', start: 'top 82%' } });