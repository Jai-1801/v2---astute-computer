import { useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePublishedCaseStudies } from '@/hooks/useCaseStudies';
import { BlurFade } from '@/components/ui/BlurFade';

const fallbackProjects = [
  {
    id: '1',
    title: 'Corporate Rebrand',
    slug: 'corporate-rebrand',
    category: 'Digital Branding',
    short_description: 'Complete visual identity overhaul for a Fortune 500 company.',
    thumbnail_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80',
    thumbnail_alt: 'Corporate rebranding case study - abstract digital design',
    stat_value: '150%',
    stat_metric: 'Brand Recognition',
    is_published: true,
  },
  {
    id: '2',
    title: 'Process Automation',
    slug: 'process-automation',
    category: 'Operations',
    short_description: 'End-to-end workflow automation reducing manual work by 80%.',
    thumbnail_url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
    thumbnail_alt: 'Business process automation - digital infrastructure visualization',
    stat_value: '80%',
    stat_metric: 'Time Saved',
    is_published: true,
  },
  {
    id: '3',
    title: 'AI Document System',
    slug: 'ai-document-system',
    category: 'AI Archives',
    short_description: 'Intelligent document management for a legal firm.',
    thumbnail_url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
    thumbnail_alt: 'AI-powered document management system interface',
    stat_value: '10M+',
    stat_metric: 'Documents Processed',
    is_published: true,
  },
  {
    id: '4',
    title: 'E-Commerce Platform',
    slug: 'e-commerce-platform',
    category: 'Software Dev',
    short_description: 'Custom marketplace handling 100K+ daily transactions.',
    thumbnail_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    thumbnail_alt: 'Custom e-commerce platform analytics dashboard',
    stat_value: '300%',
    stat_metric: 'Revenue Growth',
    is_published: true,
  },
  {
    id: '5',
    title: 'Healthcare Portal',
    slug: 'healthcare-portal',
    category: 'Software Dev',
    short_description: 'Patient management system serving 500+ clinics.',
    thumbnail_url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
    thumbnail_alt: 'Healthcare patient management portal interface',
    stat_value: '99.9%',
    stat_metric: 'Uptime',
    is_published: true,
  },
];

interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    slug: string;
    category: string;
    short_description: string;
    thumbnail_url: string | null;
    thumbnail_alt: string | null;
    stat_value: string | null;
    stat_metric: string | null;
  };
  index: number;
  isFromDatabase: boolean;
}

function ProjectCard({ project, index, isFromDatabase }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const card = (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex-shrink-0 w-[260px] sm:w-[300px] md:w-[340px] lg:w-[380px] group cursor-pointer"
    >
      <div className="relative overflow-hidden rounded-2xl bg-card border border-border/50 hover:border-primary/30 aspect-[4/5] transition-all duration-150">
        {/* Image - NO grayscale effect */}
        <div
          className="absolute inset-0 transition-transform duration-300"
          style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
        >
          {project.thumbnail_url && (
            <img
              src={project.thumbnail_url}
              alt={project.thumbnail_alt || project.title}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>

        {/* Stats Badge */}
        {project.stat_value && (
          <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-primary/90 text-primary-foreground text-xs sm:text-sm font-medium backdrop-blur-sm">
            {project.stat_value} {project.stat_metric}
          </div>
        )}

        {/* Content */}
        <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-end">
          <span className="text-xs uppercase tracking-widest text-primary mb-2">
            {project.category}
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-150">
            {project.title}
          </h3>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {project.short_description}
          </p>

          {/* Arrow */}
          <div
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-colors duration-150"
            style={{ transform: isHovered ? 'translateX(4px)' : 'translateX(0)', transition: 'transform 0.15s' }}
          >
            <ArrowRight size={16} className="text-primary group-hover:text-primary-foreground" />
          </div>
        </div>
      </div>
    </div>
  );

  if (isFromDatabase) {
    return (
      <BlurFade delay={index * 0.08}>
        <Link to={`/case-studies/${project.slug}`}>
          {card}
        </Link>
      </BlurFade>
    );
  }

  return (
    <BlurFade delay={index * 0.08}>
      {card}
    </BlurFade>
  );
}

export function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  
  const { data: caseStudies, isLoading } = usePublishedCaseStudies();
  
  const projects = caseStudies && caseStudies.length > 0 ? caseStudies : fallbackProjects;
  const isFromDatabase = caseStudies && caseStudies.length > 0;

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -360 : 360;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="portfolio"
      ref={containerRef}
      className="relative overflow-hidden py-24 sm:py-32 lg:py-40"
    >
      {/* Remove the blurry glow effect - keep it sharp */}
      
      <div className="container-custom px-6 sm:px-8 lg:px-12 mb-12 sm:mb-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 sm:gap-6">
          <div>
            <BlurFade>
              <span className="inline-block text-xs sm:text-sm uppercase tracking-widest text-primary mb-3 sm:mb-4">
                Our Work
              </span>
            </BlurFade>
            <BlurFade delay={0.1}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-[1.15]">
                Case Studies
              </h2>
            </BlurFade>
          </div>

          {/* Navigation Arrows + View All Link */}
          <BlurFade delay={0.2}>
            <div className="flex items-center gap-4">
              <Link
                to="/case-studies"
                className="text-sm font-medium text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
              >
                View all
                <ArrowRight className="h-4 w-4" />
              </Link>
              
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  onClick={() => scrollCarousel('left')}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-border bg-card/50 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-150"
                >
                  <ChevronLeft size={18} />
                </button>
                
                <button
                  onClick={() => scrollCarousel('right')}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-border bg-card/50 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-150"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </BlurFade>
        </div>
      </div>

      {/* Horizontal Scroll Gallery - NO fog/gradient edges */}
      <div className="relative">
        
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div
            ref={scrollRef}
            className="flex gap-4 sm:gap-6 px-6 sm:px-8 lg:px-16 overflow-x-auto scrollbar-hide pb-4"
          >
            {projects.map((project, index) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                index={index}
                isFromDatabase={!!isFromDatabase}
              />
            ))}
            <div className="flex-shrink-0 w-4 sm:w-8 lg:w-16" />
          </div>
        )}
      </div>
    </section>
  );
}
