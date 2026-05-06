gsap.registerPlugin(ScrollTrigger);
const lenis = new Lenis({ duration: 1.35, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothTouch: false });
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add(t => lenis.raf(t * 1000));
gsap.ticker.lagSmoothing(0);

const dot = document.getElementById('cur-dot'), ring = document.getElementById('cur-ring');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove', e => { mx=e.clientX; my=e.clientY; gsap.to(dot,{x:mx,y:my,duration:0.06}); });
(function lerp(){ rx+=(mx-rx)*0.11; ry+=(my-ry)*0.11; ring.style.left=rx+'px'; ring.style.top=ry+'px'; requestAnimationFrame(lerp); })();
document.querySelectorAll('a,button').forEach(el => { el.addEventListener('mouseenter',()=>document.body.classList.add('hov')); el.addEventListener('mouseleave',()=>document.body.classList.remove('hov')); });

const nav=document.getElementById('nav');
let lastY=0, isNavHovered=false, mouseY=0, scrollDir=0;
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

gsap.set(['#phEyebrow','#phTitle','#phBody','#phStats'],{opacity:0,y:20});
const heroTl = gsap.timeline({delay:0.1});
heroTl
  .to('#phEyebrow',{opacity:1,y:0,duration:0.6,ease:'power3.out'})
  .to('#phTitle',{opacity:1,y:0,duration:0.9,ease:'power4.out'},0.1)
  .to('#phBody',{opacity:1,y:0,duration:0.8,ease:'power3.out'},0.45)
  .to('#phStats',{opacity:1,y:0,duration:0.7,ease:'power3.out'},0.65);
gsap.from('#phRight',{x:60,opacity:0,duration:1.2,ease:'power3.out',delay:0.4});

/* Glow parallax */
gsap.to('.hero-glow-a',{yPercent:-20,ease:'none',scrollTrigger:{trigger:'.page-header',start:'top top',end:'bottom top',scrub:2}});
gsap.to('.hero-glow-b',{yPercent:-14,ease:'none',scrollTrigger:{trigger:'.page-header',start:'top top',end:'bottom top',scrub:2.5}});

/* Steps section header */
const fu = (id,delay=0) => { gsap.set(id,{opacity:0,y:24}); gsap.to(id,{opacity:1,y:0,duration:0.9,delay,ease:'power3.out',scrollTrigger:{trigger:id,start:'top 82%'}}); };
fu('#stepsTitle',0);

/* Step rows stagger */
['#step0','#step1','#step2','#step3','#step4'].forEach((id,i) => {
  gsap.to(id,{opacity:1,y:0,duration:0.85,ease:'power3.out',delay:i*0.06,scrollTrigger:{trigger:id,start:'top 82%'}});
});

/* Workflow cards */
fu('#workflowTitle',0);
['#wcard0','#wcard1','#wcard2','#wcard3','#wcard4','#wcard5'].forEach((id,i) => {
  gsap.to(id,{opacity:1,y:0,duration:0.75,ease:'power3.out',delay:(i%3)*0.12,scrollTrigger:{trigger:'.workflow-grid',start:'top 80%'}});
});

/* Stats */
['#stat0','#stat1','#stat2','#stat3'].forEach((id,i) => {
  gsap.to(id,{opacity:1,y:0,duration:0.8,ease:'power3.out',delay:i*0.1,scrollTrigger:{trigger:'.stats-grid',start:'top 82%'}});
});

/* CTA */
gsap.set('#ctaEyebrow', { opacity: 0, y: 12 });
gsap.set('#ctaTitle', { opacity: 0, y: 40 });
gsap.set('#ctaActions', { opacity: 0, y: 24 });
const ctaTl = gsap.timeline({ scrollTrigger: { trigger: '.cta-section', start: 'top 75%' } });
ctaTl.to('#ctaEyebrow', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
  .to('#ctaTitle', { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' }, '-=0.4')
  .to('#ctaActions', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6');