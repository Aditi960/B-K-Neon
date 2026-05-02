gsap.registerPlugin(ScrollTrigger);
const lenis = new Lenis({ duration: 1.35, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothTouch: false });
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add(t => lenis.raf(t * 1000));
gsap.ticker.lagSmoothing(0);

const dot = document.getElementById('cur-dot'), ring = document.getElementById('cur-ring');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove', e => { mx=e.clientX; my=e.clientY; gsap.to(dot,{x:mx,y:my,duration:0.06}); });
(function lerp(){ rx+=(mx-rx)*0.11; ry+=(my-ry)*0.11; ring.style.left=rx+'px'; ring.style.top=ry+'px'; requestAnimationFrame(lerp); })();
document.querySelectorAll('a,button,.product-card').forEach(el => { el.addEventListener('mouseenter',()=>document.body.classList.add('hov')); el.addEventListener('mouseleave',()=>document.body.classList.remove('hov')); });

const nav=document.getElementById('nav'); let lastY=0;
lenis.on('scroll',({scroll})=>{ nav.classList.toggle('solid',scroll>60); if(scroll>lastY&&scroll>120) gsap.to(nav,{y:-80,duration:0.45,ease:'power2.inOut'}); else gsap.to(nav,{y:0,duration:0.38,ease:'power2.out'}); lastY=scroll; });

/* Page header */
gsap.set('#pageEyebrow',{opacity:0,y:14}); gsap.set('#pageTitle',{opacity:0,y:30}); gsap.set('#pageSubtitle',{opacity:0,y:20});
gsap.timeline({delay:0.1}).to('#pageEyebrow',{opacity:1,y:0,duration:0.6,ease:'power3.out'}).to('#pageTitle',{opacity:1,y:0,duration:0.8,ease:'power3.out'},0.08).to('#pageSubtitle',{opacity:1,y:0,duration:0.7,ease:'power3.out'},0.25);

/* Product cards stagger */
document.querySelectorAll('.pcard').forEach((card,i) => {
  gsap.to(card, { opacity:1, y:0, duration:0.75, ease:'power3.out', delay:(i%3)*0.1, scrollTrigger:{ trigger:card, start:'top 85%' } });
});

/* Category filter */
const catTabs = document.querySelectorAll('.cat-tab');
const sections = document.querySelectorAll('.cat-section');
catTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    catTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const cat = tab.dataset.cat;
    sections.forEach(sec => {
      if(cat === 'all' || sec.dataset.section === cat) {
        sec.style.display = '';
        gsap.fromTo(sec, {opacity:0,y:20}, {opacity:1,y:0,duration:0.5,ease:'power3.out'});
      } else {
        gsap.to(sec, {opacity:0,y:-10,duration:0.2,ease:'power2.in',onComplete:()=>{ sec.style.display='none'; }});
      }
    });
  });
});

/* Process steps */
['#pstep0','#pstep1','#pstep2'].forEach((id,i) => { gsap.to(id,{opacity:1,y:0,duration:0.8,ease:'power3.out',delay:i*0.15,scrollTrigger:{trigger:'.process-strip',start:'top 80%'}}); });

/* CTA */
gsap.set('#ctaEyebrow',{opacity:0,y:12}); gsap.set('#ctaTitle',{opacity:0,y:40}); gsap.set('#ctaActions',{opacity:0,y:24});
gsap.timeline({scrollTrigger:{trigger:'.cta-section',start:'top 75%'}})
  .to('#ctaEyebrow',{opacity:1,y:0,duration:0.7,ease:'power3.out'})
  .to('#ctaTitle',{opacity:1,y:0,duration:1.0,ease:'power3.out'},'-=0.4')
  .to('#ctaActions',{opacity:1,y:0,duration:0.8,ease:'power3.out'},'-=0.5');
gsap.to('.cta-blob',{yPercent:-18,ease:'none',scrollTrigger:{trigger:'.cta-section',start:'top bottom',end:'bottom top',scrub:2}});