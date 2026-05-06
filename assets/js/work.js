gsap.registerPlugin(ScrollTrigger);
const lenis = new Lenis({ duration: 1.35, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothTouch: false });
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add(t => lenis.raf(t * 1000));
gsap.ticker.lagSmoothing(0);
const dot = document.getElementById('cur-dot'), ring = document.getElementById('cur-ring');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; gsap.to(dot, { x: mx, y: my, duration: 0.06 }); });
(function lerp() { rx += (mx - rx) * 0.11; ry += (my - ry) * 0.11; ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; requestAnimationFrame(lerp); })();
document.querySelectorAll('a,button,.gallery-item').forEach(el => { el.addEventListener('mouseenter', () => document.body.classList.add('hov')); el.addEventListener('mouseleave', () => document.body.classList.remove('hov')); });
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
gsap.set('#pageEyebrow', { opacity: 0, y: 14 }); gsap.set('#pageTitle', { opacity: 0, y: 30 }); gsap.set('#pageSubtitle', { opacity: 0, y: 20 });
gsap.timeline({ delay: 0.1 }).to('#pageEyebrow', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }).to('#pageTitle', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.08).to('#pageSubtitle', { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 0.25);
document.querySelectorAll('.gallery-item').forEach((item, i) => { gsap.to(item, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: i * 0.08, scrollTrigger: { trigger: '#galleryGrid', start: 'top 85%' } }); });
const filterBtns = document.querySelectorAll('.filter-btn'), galleryItems = document.querySelectorAll('.gallery-item');
filterBtns.forEach(btn => { btn.addEventListener('click', () => { filterBtns.forEach(b => b.classList.remove('active')); btn.classList.add('active'); const filter = btn.dataset.filter; galleryItems.forEach(item => { const show = filter === 'all' || item.dataset.cat === filter; if (show) { item.style.display = ''; gsap.fromTo(item, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }); } else { gsap.to(item, { opacity: 0, y: -10, duration: 0.25, ease: 'power2.in', onComplete: () => { item.style.display = 'none'; } }); } }); }); });
gsap.set('#portfolioCta', { opacity: 0, y: 20 });
gsap.to('#portfolioCta', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '.portfolio-cta', start: 'top 82%' } });

/* CTA */
gsap.set('#ctaEyebrow', { opacity: 0, y: 12 });
gsap.set('#ctaTitle', { opacity: 0, y: 40 });
gsap.set('#ctaActions', { opacity: 0, y: 24 });
const ctaTl = gsap.timeline({ scrollTrigger: { trigger: '.cta-section', start: 'top 75%' } });
ctaTl.to('#ctaEyebrow', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
    .to('#ctaTitle', { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' }, '-=0.4')
    .to('#ctaActions', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6');