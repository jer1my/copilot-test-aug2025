import { useEffect, useState } from 'react';

export default function Navbar(){
  const [scrolled,setScrolled] = useState(false);
  useEffect(()=>{ const on = () => setScrolled(window.scrollY > 8); window.addEventListener('scroll', on, {passive:true}); on(); return ()=> window.removeEventListener('scroll', on); },[]);
  return (
    <div className={`fixed top-0 inset-x-0 z-50 transition-all ${scrolled? 'backdrop-blur bg-neutral-900/70':'bg-transparent'} `}>
      <nav className="max-w-6xl mx-auto flex items-center gap-6 px-6 h-16">
        <a href="#hero" className="font-display text-lg font-semibold tracking-tight">JB</a>
        <div className="flex-1" />
        <a href="#projects" className="text-sm font-medium text-neutral-300 hover:text-brand-400 transition-colors">Projects</a>
        <a href="#about" className="text-sm font-medium text-neutral-300 hover:text-brand-400 transition-colors">About</a>
        <a href="#contact" className="text-sm font-medium text-neutral-300 hover:text-brand-400 transition-colors">Contact</a>
      </nav>
    </div>
  );
}
