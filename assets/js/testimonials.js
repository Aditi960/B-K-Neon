/**
 * testimonials.js — B.K. Neon
 * GSAP-powered premium testimonial slider
 * Touch/swipe + autoplay + keyboard navigation
 */

(function () {
  'use strict';

  const WA_URL = 'https://wa.me/918805745519?text=Hi%20B.K.%20Neon%2C%20I%20visited%20your%20website%20and%20would%20like%20to%20enquire%20about%20custom%20signage.';

  /* ── Testimonial Data ──────────────────── */
  const testimonials = [
    {
      quote: "B.K. Neon made a stunning neon sign for our café entrance. The quality is outstanding — it's been running perfectly for over a year with zero issues. Clients and guests constantly compliment it. Highly recommended!",
      name: 'Priya Sharma',
      role: 'Café Owner',
      city: 'Pune',
      initials: 'PS',
      stars: 5,
    },
    {
      quote: "We ordered custom neon backdrops for multiple wedding events and every single piece was exactly as we discussed — the colours, the font, the glow. Delivery was on time and the packaging was very safe. Will definitely order again.",
      name: 'Rahul Mehta',
      role: 'Wedding Planner',
      city: 'Mumbai',
      initials: 'RM',
      stars: 5,
    },
    {
      quote: "Got our shop sign board done from B.K. Neon. Very professional team, transparent pricing, and the final result was better than what I expected. The sign is bright and clean. Couldn't be happier with the work.",
      name: 'Deepak Joshi',
      role: 'Retail Shop Owner',
      city: 'Pune',
      initials: 'DJ',
      stars: 5,
    },
    {
      quote: "I've worked with B.K. Neon on multiple interior branding projects for my clients. Consistent quality every time, clean finishing, and they're extremely easy to coordinate with. Reliable and professional.",
      name: 'Ananya Desai',
      role: 'Interior Designer',
      city: 'Nashik',
      initials: 'AD',
      stars: 5,
    },
    {
      quote: "The neon logo sign they made for our restaurant is a showstopper. Every customer notices it and asks about it. The glow is beautiful — exactly the vibe we wanted. Fast delivery and very good pricing for the quality.",
      name: 'Vikram Nair',
      role: 'Restaurant Owner',
      city: 'Bangalore',
      initials: 'VN',
      stars: 5,
    },
  ];

  /* ── Build HTML ────────────────────────── */
  function buildTestiSection() {
    const section = document.getElementById('testiSection');
    if (!section) return;

    const starsSVG = (count) =>
      Array.from({ length: count }, () => `<span class="testi-star">★</span>`).join('');

    const cardsHTML = testimonials.map((t) => `
      <div class="testi-card">
        <div class="testi-quote-col">
          <div class="testi-stars">${starsSVG(t.stars)}</div>
          <p class="testi-quote">"${t.quote}"</p>
          <div class="testi-attribution">
            <div class="testi-name">${t.name}</div>
            <div class="testi-role">${t.role}</div>
          </div>
        </div>
        <div class="testi-avatar-col">
          <div class="testi-avatar-ring">
            <div class="testi-avatar-inner">${t.initials}</div>
          </div>
          <div class="testi-city">${t.city}</div>
        </div>
      </div>
    `).join('');

    const dotsHTML = testimonials.map((_, i) =>
      `<button class="testi-dot${i === 0 ? ' is-active' : ''}" data-index="${i}" aria-label="Go to testimonial ${i + 1}"></button>`
    ).join('');

    section.innerHTML = `
      <div class="section-wrap">
        <div class="testimonials-header">
          <div class="testimonials-title-block">
            <div class="testi-label">Client Reviews</div>
            <h2 class="testi-title">WHAT CLIENTS<br>SAY ABOUT US</h2>
          </div>
          <div class="testi-arrows">
            <button class="testi-arrow" id="testiPrev" aria-label="Previous">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
            </button>
            <button class="testi-arrow" id="testiNext" aria-label="Next">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="9 6 15 12 9 18"/>
              </svg>
            </button>
          </div>
        </div>

        <div class="testi-slider-wrap" id="testiSliderWrap">
          <div class="testi-track" id="testiTrack">
            ${cardsHTML}
          </div>
        </div>

        <div class="testi-progress" id="testiProgressWrap">
          <div class="testi-progress-bar" id="testiProgressBar"></div>
        </div>

        <div class="testi-dots" id="testiDots">
          ${dotsHTML}
        </div>
      </div>
    `;
  }

  /* ── Slider Logic ──────────────────────── */
  function initSlider() {
    const track = document.getElementById('testiTrack');
    const dots = document.querySelectorAll('.testi-dot');
    const prevBtn = document.getElementById('testiPrev');
    const nextBtn = document.getElementById('testiNext');
    const progBar = document.getElementById('testiProgressBar');
    const cards = document.querySelectorAll('.testi-card');
    const wrap = document.getElementById('testiSliderWrap');

    if (!track || !cards.length) return;

    const total = testimonials.length;
    let current = 0;
    let autoplayTimer = null;
    let progressTween = null;
    const AUTOPLAY_MS = 5000;

    /* Set initial card width */
    function setWidths() {
      const w = wrap.offsetWidth;
      cards.forEach(c => { c.style.width = w + 'px'; });
    }

    setWidths();
    window.addEventListener('resize', setWidths);

    /* Go to slide */
    function goTo(index, dir = 1) {
      const prev = current;
      current = (index + total) % total;

      /* Update dots */
      dots.forEach((d, i) => d.classList.toggle('is-active', i === current));

      /* GSAP slide */
      gsap.to(track, {
        x: -current * wrap.offsetWidth,
        duration: 0.65,
        ease: 'power3.inOut',
      });

      /* Card content fade */
      const prevCard = cards[prev];
      const nextCard = cards[current];

      prevCard.classList.remove('is-active');
      nextCard.classList.add('is-active');

      gsap.fromTo(nextCard.querySelector('.testi-quote-col'), {
        opacity: 0,
        y: 16,
      }, {
        opacity: 1,
        y: 0,
        duration: 0.55,
        ease: 'power3.out',
        delay: 0.2,
      });

      restartProgress();
    }

    /* Activate initial card */
    cards[0].classList.add('is-active');

    /* Progress bar */
    function restartProgress() {
      if (progressTween) progressTween.kill();
      gsap.set(progBar, { width: '0%' });
      progressTween = gsap.to(progBar, {
        width: '100%',
        duration: AUTOPLAY_MS / 1000,
        ease: 'none',
        onComplete: () => goTo(current + 1),
      });
    }

    /* Autoplay */
    function stopAutoplay() {
      if (progressTween) progressTween.pause();
    }
    function resumeAutoplay() {
      if (progressTween) progressTween.resume();
    }

    restartProgress();

    /* Controls */
    nextBtn.addEventListener('click', () => goTo(current + 1));
    prevBtn.addEventListener('click', () => goTo(current - 1));

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => goTo(i));
    });

    /* Keyboard */
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') goTo(current + 1);
      if (e.key === 'ArrowLeft') goTo(current - 1);
    });

    /* Touch / Swipe */
    let touchStartX = 0;
    let touchStartY = 0;
    let isDragging = false;

    wrap.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      isDragging = true;
      stopAutoplay();
    }, { passive: true });

    wrap.addEventListener('touchend', (e) => {
      if (!isDragging) return;
      isDragging = false;
      const dx = e.changedTouches[0].clientX - touchStartX;
      const dy = e.changedTouches[0].clientY - touchStartY;

      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
        goTo(dx < 0 ? current + 1 : current - 1);
      } else {
        resumeAutoplay();
      }
    }, { passive: true });

    /* Pause on hover */
    wrap.addEventListener('mouseenter', stopAutoplay);
    wrap.addEventListener('mouseleave', resumeAutoplay);
  }

  /* ── Section entrance animation ────────── */
  function animateEntrance() {
    const section = document.getElementById('testiSection');
    if (!section || typeof ScrollTrigger === 'undefined') return;

    gsap.from(section.querySelector('.testimonials-header'), {
      opacity: 0,
      y: 30,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
      },
    });

    gsap.from('#testiSliderWrap', {
      opacity: 0,
      y: 40,
      duration: 1.0,
      ease: 'power3.out',
      delay: 0.15,
      scrollTrigger: {
        trigger: section,
        start: 'top 78%',
      },
    });
  }

  /* ── Init ──────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    buildTestiSection();
    initSlider();
    animateEntrance();
  });

})();
