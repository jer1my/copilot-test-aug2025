import { motion } from 'framer-motion';

const projects = Array.from({ length: 8 }).map((_,i)=> ({
  id: i+1,
  title: `Project ${i+1}`,
  tag: i % 2 ? 'UI' : 'System',
  desc: 'Sample placeholder description demonstrating masked hover & distortion entrance.'
}));

export default function ProjectsGrid(){
  return (
    <section id="projects" className="relative py-28">
      <div className="max-w-6xl mx-auto px-6">
        <header className="mb-14">
          <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight">Selected Work</h2>
          <p className="mt-4 max-w-2xl text-neutral-400">Grid of placeholder projects. Each tile reveals with a soft scaling mask and subtle gradient overlay; hover triggers a displacement highlight.</p>
        </header>
        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={{ hidden:{opacity:1}, visible:{opacity:1, transition:{staggerChildren:.08}} }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {projects.map(p => (
            <motion.li
              key={p.id}
              variants={{ hidden:{opacity:0, y:30, filter:'blur(8px)'}, visible:{opacity:1, y:0, filter:'blur(0)', transition:{duration:.9, ease:[0.4,0.8,0.2,1]}} }}
              className="group relative rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800/60 shadow-soft"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-600/0 via-brand-600/0 to-purple-600/0 group-hover:from-brand-600/10 group-hover:via-brand-600/0 group-hover:to-purple-600/20 transition-colors"></div>
              <div className="p-5 relative z-10">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-brand-500 font-semibold">
                  <span className="h-2 w-2 rounded-full bg-brand-600 animate-pulse" /> {p.tag}
                </div>
                <h3 className="mt-3 font-medium text-lg">{p.title}</h3>
                <p className="mt-2 text-sm text-neutral-400 leading-relaxed line-clamp-3">{p.desc}</p>
                <button className="mt-6 text-xs font-semibold tracking-wider px-4 py-2 rounded-full bg-neutral-800/70 border border-neutral-700 hover:border-brand-600 hover:text-brand-400 transition-colors">Details</button>
              </div>
              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{filter:'url(#distort-soft)'}} />
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
