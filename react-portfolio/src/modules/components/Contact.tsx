import { motion } from 'framer-motion';

export default function Contact(){
  return (
    <section id="contact" className="py-28 relative">
      <div className="max-w-4xl mx-auto px-6">
        <motion.header initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true, margin:'-80px'}} transition={{duration:1}} className="mb-12">
          <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight">Contact</h2>
          <p className="mt-5 text-neutral-400 max-w-2xl leading-relaxed">Simple placeholder form. Add your backend / form service. Distortion filter can be dynamically applied on focus states or submit transition.</p>
        </motion.header>
        <motion.form initial={{opacity:0, y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true, margin:'-40px'}} transition={{duration:1}} className="grid gap-6 md:grid-cols-2">
          <div className="flex flex-col gap-2 md:col-span-1">
            <label className="text-xs tracking-wide uppercase text-neutral-400">Name</label>
            <input className="rounded-xl px-4 py-3 bg-neutral-900/70 border border-neutral-800 focus:outline-none focus:ring-2 focus:ring-brand-600/60" placeholder="Jane Doe" />
          </div>
          <div className="flex flex-col gap-2 md:col-span-1">
            <label className="text-xs tracking-wide uppercase text-neutral-400">Email</label>
            <input className="rounded-xl px-4 py-3 bg-neutral-900/70 border border-neutral-800 focus:outline-none focus:ring-2 focus:ring-brand-600/60" placeholder="you@example.dev" />
          </div>
          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-xs tracking-wide uppercase text-neutral-400">Message</label>
            <textarea rows={6} className="rounded-xl px-4 py-3 bg-neutral-900/70 border border-neutral-800 focus:outline-none focus:ring-2 focus:ring-brand-600/60 resize-none" placeholder="Tell me about the opportunity..." />
          </div>
          <div className="md:col-span-2">
            <button type="button" className="rounded-full px-8 py-3 bg-brand-600 hover:bg-brand-500 transition-colors shadow-glow text-sm font-semibold tracking-wide">Send Message</button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
