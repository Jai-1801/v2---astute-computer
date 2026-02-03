import { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
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
    parallaxIntensity: 30,
  },
  {
    id: 'legal',
    icon: Scale,
    title: 'Legal',
    problem: 'Document chaos & slow retrieval',
    description: 'Hours wasted searching through case files, security vulnerabilities, and version control nightmares.',
    solution: 'Intelligent document archives with instant semantic search',
    size: 'medium',
    parallaxIntensity: -20,
  },
  {
    id: 'manufacturing',
    icon: Factory,
    title: 'Manufacturing',
    problem: 'Outdated processes & manual tracking',
    description: 'Excel-based inventory, disconnected supply chains, and no real-time visibility.',
    solution: 'End-to-end operations digitalization with live dashboards',
    size: 'medium',
    parallaxIntensity: 25,
  },
  {
    id: 'finance',
    icon: TrendingUp,
    title: 'Finance',
    problem: 'Data silos & reporting delays',
    description: 'Spreadsheet hell, compliance risks, and days-long report generation cycles.',
    solution: 'Automated compliance workflows and real-time analytics',
    size: 'medium',
    parallaxIntensity: -15,
  },
  {
    id: 'retail',
    icon: ShoppingCart,
    title: 'Retail',
    problem: 'Inventory chaos & channel disconnect',
    description: 'Stock mismatches, poor omnichannel experiences, and lost sales opportunities.',
    solution: 'Unified commerce platforms with predictive inventory',
    size: 'medium',
    parallaxIntensity: 20,
  },
  {
    id: 'education',
    icon: GraduationCap,
    title: 'Education',
    problem: 'Administrative burden & legacy platforms',
    description: 'Outdated LMS systems, paper-heavy admissions, and poor student engagement.',
    solution: 'Modern learning platforms with automated administration',
    size: 'large',
    parallaxIntensity: -25,
  },
];

function SectorCard({ 
  sector, 
  index,
  scrollProgress,
  onNavigate,
}: { 
  sector: typeof sectors[0]; 
  index: number;
  scrollProgress: any;
  onNavigate: (slug: string) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Individual parallax transformation based on scroll progress
  const y = useTransform(
    scrollProgress, 
    [0, 1], 
    [sector.parallaxIntensity, -sector.parallaxIntensity]
  );
  
  const scale = useTransform(
    scrollProgress,
    [0, 0.5, 1],
    [0.95, 1, 0.95]
  );
  
  const rotateX = useTransform(
    scrollProgress,
    [0, 0.5, 1],
    [index % 2 === 0 ? 2 : -2, 0, index % 2 === 0 ? -2 : 2]
  );
  
  return (
    <motion.div
      style={{ y, scale, rotateX }}
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
        className="h-full p-6 sm:p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 overflow-hidden relative"
      >
        {/* Glow effect on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-foreground/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />
        
        {/* Floating animation for icon */}
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="relative z-10"
        >
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-12 h-12 rounded-xl bg-foreground/5 border border-foreground/10 flex items-center justify-center mb-4 group-hover:bg-foreground/10 group-hover:border-foreground/20 transition-all duration-300"
          >
            <sector.icon className="w-5 h-5 text-foreground" />
          </motion.div>
        </motion.div>
        
        <div className="relative z-10">
          <h3 className="text-xl font-semibold text-foreground mb-2">
            {sector.title}
          </h3>
          <p className="text-sm font-medium text-foreground/70 mb-3">
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

        {/* Animated corner accent */}
        <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
          <motion.div
            className="absolute top-0 right-0 w-px h-12 bg-gradient-to-b from-foreground/20 to-transparent"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="absolute top-0 right-0 h-px w-12 bg-gradient-to-l from-foreground/20 to-transparent"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

export function SectorProblems() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const navigate = useNavigate();
  
  // Scroll progress for parallax effect
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const handleNavigate = (slug: string) => {
    navigate(`/industries/${slug}`);
  };

  return (
    <section id="sectors" className="snap-section section-padding relative overflow-hidden">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 grid-pattern opacity-10" />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />

      <div ref={ref} className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="inline-block text-sm uppercase tracking-widest text-muted-foreground mb-4"
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
            <span className="text-muted-foreground">Challenges</span>
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

        {/* Bento Grid with Parallax */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 perspective-1000">
          {sectors.map((sector, index) => (
            <SectorCard 
              key={sector.id} 
              sector={sector} 
              index={index} 
              scrollProgress={scrollYProgress}
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
            className="inline-flex items-center gap-2 text-foreground font-medium link-underline"
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
