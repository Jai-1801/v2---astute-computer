import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { 
  Stethoscope, 
  Scale, 
  Factory, 
  TrendingUp, 
  ShoppingCart, 
  GraduationCap 
} from 'lucide-react';

const sectors = [
  {
    id: 'healthcare',
    icon: Stethoscope,
    title: 'Healthcare',
    problem: 'Legacy systems & paper records',
    description: 'Outdated patient management, compliance burdens, and fragmented data across departments.',
    solution: 'AI-powered document digitization and unified patient portals',
    size: 'large',
  },
  {
    id: 'legal',
    icon: Scale,
    title: 'Legal',
    problem: 'Document chaos & slow retrieval',
    description: 'Hours wasted searching through case files, security vulnerabilities, and version control nightmares.',
    solution: 'Intelligent document archives with instant semantic search',
    size: 'medium',
  },
  {
    id: 'manufacturing',
    icon: Factory,
    title: 'Manufacturing',
    problem: 'Outdated processes & manual tracking',
    description: 'Excel-based inventory, disconnected supply chains, and no real-time visibility.',
    solution: 'End-to-end operations digitalization with live dashboards',
    size: 'medium',
  },
  {
    id: 'finance',
    icon: TrendingUp,
    title: 'Finance',
    problem: 'Data silos & reporting delays',
    description: 'Spreadsheet hell, compliance risks, and days-long report generation cycles.',
    solution: 'Automated compliance workflows and real-time analytics',
    size: 'medium',
  },
  {
    id: 'retail',
    icon: ShoppingCart,
    title: 'Retail',
    problem: 'Inventory chaos & channel disconnect',
    description: 'Stock mismatches, poor omnichannel experiences, and lost sales opportunities.',
    solution: 'Unified commerce platforms with predictive inventory',
    size: 'medium',
  },
  {
    id: 'education',
    icon: GraduationCap,
    title: 'Education',
    problem: 'Administrative burden & legacy platforms',
    description: 'Outdated LMS systems, paper-heavy admissions, and poor student engagement.',
    solution: 'Modern learning platforms with automated administration',
    size: 'large',
  },
];

function SectorCard({ 
  sector, 
  index,
  onNavigate,
}: { 
  sector: typeof sectors[0]; 
  index: number;
  onNavigate: (slug: string) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onNavigate(sector.id)}
      className={`relative group cursor-pointer ${
        sector.size === 'large' ? 'md:col-span-2' : ''
      }`}
    >
      <motion.div
        animate={{ 
          y: isHovered ? -8 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="h-full p-6 sm:p-8 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/30 overflow-hidden relative transition-all duration-300"
      >
        {/* Glow effect on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />
        
        {/* Icon */}
        <div className="relative z-10">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-all duration-300"
          >
            <sector.icon className="w-5 h-5 text-primary" />
          </motion.div>
        </div>
        
        <div className="relative z-10">
          <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
            {sector.title}
          </h3>
          <p className="text-sm font-medium text-primary/70 mb-3">
            {sector.problem}
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            {sector.description}
          </p>
          
          {/* Solution reveal on hover */}
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ 
              opacity: isHovered ? 1 : 0, 
              height: isHovered ? 'auto' : 0 
            }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pt-4 border-t border-border/30">
              <span className="text-xs uppercase tracking-widest text-muted-foreground">Our Solution</span>
              <p className="text-sm text-foreground/80 mt-1">{sector.solution}</p>
            </div>
          </motion.div>
        </div>

        {/* Arrow indicator */}
        <motion.div
          animate={{ x: isHovered ? 4 : 0, opacity: isHovered ? 1 : 0 }}
          className="absolute bottom-6 right-6"
        >
          <ArrowRight className="h-5 w-5 text-primary" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export function SectorProblems() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const navigate = useNavigate();

  const handleNavigate = (slug: string) => {
    navigate(`/industries/${slug}`);
  };

  return (
    <section id="sectors" className="snap-section section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-10" />
      {/* Purple ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[200px]" />

      <div ref={ref} className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="inline-block text-sm uppercase tracking-widest text-primary mb-4"
          >
            Industries We Serve
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6"
          >
            Solving Industry
            <br />
            <span className="text-gradient-purple">Challenges</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Every sector faces unique digital transformation hurdles. We've solved them all.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {sectors.map((sector, index) => (
            <SectorCard 
              key={sector.id} 
              sector={sector} 
              index={index}
              onNavigate={handleNavigate}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-4">
            Don't see your industry? We adapt our solutions to any sector.
          </p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 text-primary font-medium link-underline"
          >
            Let's discuss your challenges
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
