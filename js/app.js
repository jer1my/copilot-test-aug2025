/* Fullscreen animated background & responsive nav */
(function(){
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');
  let width, height, particles; 
  const PARTICLE_COUNT_BASE = 70; // scales with screen area
  const DPR = window.devicePixelRatio || 1;
  const mouse = { x: 0, y: 0, active: false };
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function resize() {
    width = window.innerWidth; height = window.innerHeight;
    canvas.width = width * DPR; canvas.height = height * DPR; canvas.style.width = width + 'px'; canvas.style.height = height + 'px';
    ctx.scale(DPR, DPR);
    initParticles();
  }

  function rand(min,max){ return Math.random()*(max-min)+min; }

  function initParticles(){
    const areaFactor = (width * height) / (1280*720);
    const count = Math.min(220, Math.floor(PARTICLE_COUNT_BASE * areaFactor));
    particles = new Array(count).fill(0).map(()=>({
      x: rand(0,width),
      y: rand(0,height),
      vx: rand(-0.15,0.15),
      vy: rand(-0.15,0.15),
      r: rand(1.2,3.4),
      h: rand(200,260),
      s: rand(55,85),
      l: rand(55,75),
      pulse: rand(0,Math.PI*2)
    }));
  }

  function step(){
    if(prefersReducedMotion) return; // freeze for reduced motion
    ctx.clearRect(0,0,width,height);

    // draw subtle gradient background overlay (optional subtle refresh)
    const grd = ctx.createRadialGradient(width*0.6,height*0.4,50,width*0.5,height*0.5,Math.max(width,height));
    grd.addColorStop(0,'rgba(40,70,120,0.08)');
    grd.addColorStop(1,'rgba(10,15,25,0)');
    ctx.fillStyle = grd; ctx.fillRect(0,0,width,height);

    // draw connections
    for(let i=0;i<particles.length;i++){
      const p = particles[i];
      for(let j=i+1;j<particles.length;j++){
        const q = particles[j];
        const dx = p.x - q.x; const dy = p.y - q.y; const dist = Math.hypot(dx,dy);
        if(dist < 120){
          const alpha = 1 - dist/120;
            ctx.strokeStyle = `hsla(${p.h},70%,60%,${alpha*0.25})`;
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(p.x,p.y); ctx.lineTo(q.x,q.y); ctx.stroke();
        }
      }
    }

    // update & draw particles
    particles.forEach(p=>{
      p.x += p.vx; p.y += p.vy; p.pulse += 0.02;
      // mild mouse attraction
      if(mouse.active){
        const dx = mouse.x - p.x; const dy = mouse.y - p.y; const dist = Math.hypot(dx,dy);
        if(dist < 180){
          const force = (1 - dist/180) * 0.6;
          p.vx += (dx/dist)*force*0.02;
          p.vy += (dy/dist)*force*0.02;
        }
      }
      // boundaries wrap
      if(p.x < -20) p.x = width + 10; else if(p.x > width + 20) p.x = -10;
      if(p.y < -20) p.y = height + 10; else if(p.y > height + 20) p.y = -10;
      const rad = p.r + Math.sin(p.pulse) * 0.4;
      ctx.beginPath();
      ctx.fillStyle = `hsla(${p.h},${p.s}%,${p.l}%,0.85)`;
      ctx.shadowColor = `hsla(${p.h},70%,60%,0.6)`;
      ctx.shadowBlur = 8;
      ctx.arc(p.x,p.y,rad,0,Math.PI*2); ctx.fill();
    });
    ctx.shadowBlur = 0;

    requestAnimationFrame(step);
  }

  window.addEventListener('resize', resize, { passive: true });
  window.addEventListener('mousemove', e=>{ mouse.x = e.clientX; mouse.y = e.clientY; mouse.active = true; });
  window.addEventListener('mouseleave', ()=>{ mouse.active = false; });

  resize();
  if(!prefersReducedMotion) requestAnimationFrame(step);

  // Responsive Navigation
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav__toggle');
  const menu = document.getElementById('navMenu');

  function closeMenu(){
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded','false');
    toggle.setAttribute('aria-label','Open menu');
  }

  toggle?.addEventListener('click', ()=>{
    const open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    if(open) {
      // trap focus first/last
      const focusables = menu.querySelectorAll('a,button');
      focusables[0]?.focus();
    }
  });

  menu.addEventListener('click', e => {
    if(e.target.closest('a')) closeMenu();
  });
  document.addEventListener('keydown', e=>{
    if(e.key === 'Escape') closeMenu();
  });

  // current year
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();
})();
