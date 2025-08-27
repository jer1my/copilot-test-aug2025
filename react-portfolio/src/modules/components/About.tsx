import { motion } from 'framer-motion';

export default function About(){
  return (
    <section id="about" className="py-28 relative">
      <div className="max-w-5xl mx-auto px-6">
        <motion.header initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true, margin:'-80px'}} transition={{duration:1}} className="mb-12">
          <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight">About</h2>
          <p className="mt-5 text-neutral-400 max-w-2xl leading-relaxed">This is placeholder copy describing a creative technologist who blends interaction design with robust, observable engineering. Replace with real narrative. The reveal uses a simple motion fade+lift while the section container can optionally layer the turbulence filter for on-enter distortion.</p>
        </motion.header>
        <div className="grid gap-6 md:grid-cols-2">
          {[1,2,3,4].map(i => (
            <motion.div key={i} initial={{opacity:0, y:24, scale:.96}} whileInView={{opacity:1,y:0,scale:1}} viewport={{once:true, margin:'-60px'}} transition={{duration:0.9, ease:[0.4,0.8,0.2,1]}} className="rounded-2xl border border-neutral-800 bg-neutral-900/60 backdrop-blur p-6 shadow-soft">
              <h3 className="font-medium text-lg mb-3">Capability {i}</h3>
              <p className="text-sm leading-relaxed text-neutral-400">Filler description for capability {i}. Distillation of expertise, tooling familiarity, and outcome focus. Iterate with real details later.</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
