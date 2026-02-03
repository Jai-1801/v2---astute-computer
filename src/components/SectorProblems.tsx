import { useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Stethoscope, Scale, Factory, TrendingUp, ShoppingCart, GraduationCap } from 'lucide-react';
import { BlurFade } from '@/components/ui/BlurFade';

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
    <BlurFade delay={index * 0.1}>
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => onNavigate(sector.id)}
        className={`relative group cursor-pointer ${
          sector.size === 'large' ? 'md:col-span-2' : ''
        }`}
      >
        <div
          className="h-full p-5 sm:p-6 md:p-8 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/30 overflow-hidden relative transition-all duration-300"
          style={{ transform: isHovered ? 'translateY(-4px)' : 'translateY(0)' }}
        >
          {/* Glow effect on hover */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent transition-opacity duration-300"
            style={{ opacity: isHovered ? 1 : 0 }}
          />
          
          {/* Icon */}
          <div className="relative z-10">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-all duration-300">
              <sector.icon className="w-5 h-5 text-primary" />
            </div>
          </div>
          
          <div className="relative z-10">
            <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
              {sector.title}
            </h3>
            <p className="text-xs sm:text-sm font-medium text-primary/70 mb-2 sm:mb-3">
              {sector.problem}
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-4">
              {sector.description}
            </p>
            
            {/* Solution reveal on hover */}
            <div
              className="overflow-hidden transition-all duration-300"
              style={{ 
                opacity: isHovered ? 1 : 0, 
                maxHeight: isHovered ? '100px' : '0px' 
              }}
            >
              <div className="pt-4 border-t border-border/30">
                <span className="text-xs uppercase tracking-widest text-muted-foreground">Our Solution</span>
                <p className="text-xs sm:text-sm text-foreground/80 mt-1">{sector.solution}</p>
              </div>
            </div>
          </div>

          {/* Arrow indicator */}
          <div
            className="absolute bottom-5 sm:bottom-6 right-5 sm:right-6 transition-all duration-300"
            style={{ 
              transform: isHovered ? 'translateX(4px)' : 'translateX(0)', 
              opacity: isHovered ? 1 : 0 
            }}
          >
            <ArrowRight className="h-5 w-5 text-primary" />
          </div>
        </div>
      </div>
    </BlurFade>
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
    <section id="sectors" className="relative overflow-hidden py-20 sm:py-24 md:py-32">
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[200px]" />

      <div ref={ref} className="container-custom relative z-10 px-6 sm:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <BlurFade>
            <span className="inline-block text-xs sm:text-sm uppercase tracking-widest text-primary mb-3 sm:mb-4">
              Industries We Serve
            </span>
          </BlurFade>
          <BlurFade delay={0.1}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6">
              Solving Industry
              <br />
              <span className="text-gradient-purple">Challenges</span>
            </h2>
          </BlurFade>
          <BlurFade delay={0.2}>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
              Every sector faces unique digital transformation hurdles. We've solved them all.
            </p>
          </BlurFade>
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
        <BlurFade delay={0.4}>
          <div className="text-center mt-12 sm:mt-16">
            <p className="text-sm sm:text-base text-muted-foreground mb-4">
              Don't see your industry? We adapt our solutions to any sector.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-primary font-medium link-underline text-sm sm:text-base"
            >
              Let's discuss your challenges
              <span>→</span>
            </a>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
