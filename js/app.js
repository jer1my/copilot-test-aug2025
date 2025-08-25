// Main JS: mobile nav toggle, accessible focus handling, background animation.
(function(){
	const navToggle = document.querySelector('.nav-toggle');
	const nav = document.getElementById('primary-nav');
	const body = document.body;
	const yearEl = document.getElementById('year');
	if(yearEl){ yearEl.textContent = new Date().getFullYear(); }

	function toggleNav(force){
		const isOpen = typeof force === 'boolean' ? !force : navToggle.getAttribute('aria-expanded') === 'true';
		const next = !isOpen;
		navToggle.setAttribute('aria-expanded', String(next));
		nav.classList.toggle('open', next);
		body.classList.toggle('nav-open', next);
		if(!next){ navToggle.focus(); }
	}

	if(navToggle){
		navToggle.addEventListener('click', () => toggleNav());
		document.addEventListener('keydown', (e)=>{
			if(e.key === 'Escape' && nav.classList.contains('open')){
				toggleNav(false);
			}
		});
		// Close on outside click (mobile)
		document.addEventListener('click', (e)=>{
			if(!nav.contains(e.target) && !navToggle.contains(e.target) && nav.classList.contains('open')){
				toggleNav(false);
			}
		});
		// Close after navigation item click (for single-page flow)
		nav.addEventListener('click', (e)=>{
			const link = e.target.closest('a');
			if(link && nav.classList.contains('open')){
				toggleNav(false);
			}
		});
	}

	// Background Canvas Animation (particles with connecting lines)
	const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	const canvas = document.getElementById('bg-canvas');
	if(canvas && !prefersReduced){
		const ctx = canvas.getContext('2d');
		let w = canvas.width = window.innerWidth;
		let h = canvas.height = window.innerHeight;
		const particles = [];
		const MAX_PARTICLES = Math.min(140, Math.round((w*h)/28000));
		const LINE_DIST = 140;
		let animationFrame; let lastTime = 0;

		class Particle{
			constructor(){
				this.reset(true);
			}
			reset(initial){
				this.x = Math.random()*w;
				this.y = Math.random()*h;
				const speed = initial ? Math.random()*0.4+0.1 : Math.random()*0.6+0.2;
				const angle = Math.random()*Math.PI*2;
				this.vx = Math.cos(angle)*speed;
				this.vy = Math.sin(angle)*speed;
				this.r = Math.random()*2+0.6;
				this.alpha = Math.random()*0.6+0.2;
			}
			update(dt){
				this.x += this.vx*dt;
				this.y += this.vy*dt;
				if(this.x < -50 || this.x > w+50 || this.y < -50 || this.y > h+50){
					this.reset();
				}
			}
			draw(){
				ctx.beginPath();
				ctx.arc(this.x,this.y,this.r,0,Math.PI*2);
			ctx.fillStyle = `rgba(173,132,255,${this.alpha})`;
				ctx.fill();
			}
		}
		for(let i=0;i<MAX_PARTICLES;i++){ particles.push(new Particle()); }

		function resize(){
			w = canvas.width = window.innerWidth;
			h = canvas.height = window.innerHeight;
		}
		window.addEventListener('resize', resize);

		function render(ts){
			const dt = Math.min(60,(ts - lastTime))/16.666; // normalize to ~60fps
			lastTime = ts;
			ctx.clearRect(0,0,w,h);
			// Draw gradient backdrop overlay subtle
			const grd = ctx.createRadialGradient(w*0.25,h*0.35,0,w*0.25,h*0.35,Math.max(w,h)*0.9);
			grd.addColorStop(0,'rgba(139,92,246,0.08)');
			grd.addColorStop(1,'rgba(13,17,23,0)');
			ctx.fillStyle = grd;
			ctx.fillRect(0,0,w,h);
			// Update & draw particles
			for(const p of particles){ p.update(dt); p.draw(); }
			// Draw connections
			for(let i=0;i<particles.length;i++){
				const p1 = particles[i];
				for(let j=i+1;j<particles.length;j++){
					const p2 = particles[j];
					const dx=p1.x-p2.x, dy=p1.y-p2.y;
						const dist = dx*dx+dy*dy;
						if(dist < LINE_DIST*LINE_DIST){
							const a = 1 - (dist**0.5)/LINE_DIST;
							if(a>0){
								ctx.strokeStyle = `rgba(167,139,250,${a*0.35})`;
								ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(p1.x,p1.y); ctx.lineTo(p2.x,p2.y); ctx.stroke();
							}
						}
				}
			}
			animationFrame = requestAnimationFrame(render);
		}
		animationFrame = requestAnimationFrame(render);
		document.addEventListener('visibilitychange', ()=>{
			if(document.hidden){ cancelAnimationFrame(animationFrame); }
			else{ lastTime = performance.now(); animationFrame = requestAnimationFrame(render); }
		});
	}
})();
