import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProjectsGrid from './components/ProjectsGrid';
import About from './components/About';
import Contact from './components/Contact';
import { useEffect, useState } from 'react';

export default function App(){
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Intersection Observer for generic reveal fallback (non Framer elements)
  useEffect(()=>{
    const els = document.querySelectorAll('.section-reveal');
    const obs = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('is-visible'); obs.unobserve(e.target); } });
    }, { threshold:.3 });
    els.forEach(el=> obs.observe(el));
    return ()=> obs.disconnect();
  },[]);

  // Show back to top button when 30% of hero is scrolled
  useEffect(() => {
    const heroSection = document.getElementById('hero');
    if (!heroSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show button when less than 70% of hero is visible (30% scrolled out)
        setShowBackToTop(entry.intersectionRatio < 0.7);
      },
      { threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1] }
    );

    observer.observe(heroSection);
    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="font-sans relative bg-noise">
      <Navbar />
      <main>
        <Hero />
        <ProjectsGrid />
        <About />
        <Contact />
      </main>
      <footer className="py-12 text-center text-xs text-neutral-600 tracking-wider">© {new Date().getFullYear()} Distortion Demo. Replace with your name.</footer>
      
      {/* Back to top button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-purple-600 hover:bg-purple-500 shadow-lg hover:shadow-[0_0_20px_rgba(147,51,234,0.5)] transition-all duration-500 flex items-center justify-center group ${
          showBackToTop ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0 pointer-events-none'
        }`}
      >
          <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
    </div>
  );
}
