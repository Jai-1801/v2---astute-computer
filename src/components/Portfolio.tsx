import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePublishedCaseStudies, type CaseStudy } from '@/hooks/useCaseStudies';

// Fallback data for when database is empty
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

  const cardContent = (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex-shrink-0 w-[320px] sm:w-[380px] lg:w-[420px] group cursor-pointer"
    >
      <div className="relative overflow-hidden rounded-2xl bg-card border border-border/50 aspect-[4/5]">
        {/* Image */}
        <motion.div
          className="absolute inset-0"
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.6 }}
        >
          {project.thumbnail_url && (
            <img
              src={project.thumbnail_url}
              alt={project.thumbnail_alt || project.title}
              loading="lazy"
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </motion.div>

        {/* Content */}
        <div className="absolute inset-0 p-6 flex flex-col justify-end">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs uppercase tracking-widest text-muted-foreground mb-2"
          >
            {project.category}
          </motion.span>
          <h3 className="text-2xl font-bold text-foreground mb-2">
            {project.title}
          </h3>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {project.short_description}
          </p>

          {/* Stats */}
          <div className="flex items-center justify-between">
            <div>
              {project.stat_value && (
                <>
                  <span className="text-3xl font-bold text-foreground">
                    {project.stat_value}
                  </span>
                  <span className="text-sm text-muted-foreground ml-2">
                    {project.stat_metric}
                  </span>
                </>
              )}
            </div>
            <motion.div
              animate={{ x: isHovered ? 5 : 0 }}
              className="w-10 h-10 rounded-full bg-foreground/10 flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-colors"
            >
              <ArrowRight size={18} />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  // Only link to detail page if from database
  if (isFromDatabase) {
    return (
      <Link to={`/case-studies/${project.slug}`}>
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}

export function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  
  const { data: caseStudies, isLoading } = usePublishedCaseStudies();
  
  // Use database data if available, otherwise fallback
  const projects = caseStudies && caseStudies.length > 0 ? caseStudies : fallbackProjects;
  const isFromDatabase = caseStudies && caseStudies.length > 0;

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="portfolio"
      ref={containerRef}
      className="snap-section section-padding relative overflow-hidden"
    >
      <div className="container-custom mb-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
              className="inline-block text-sm uppercase tracking-widest text-muted-foreground mb-4"
            >
              Our Work
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground"
            >
              Case Studies
            </motion.h2>
          </div>

          {/* Navigation Arrows + View All Link */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-4"
          >
            <Link
              to="/case-studies"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
            >
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
            
            <div className="flex items-center gap-3">
              <motion.button
                onClick={() => scrollCarousel('left')}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 rounded-full border border-border/50 bg-card/50 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/50 hover:shadow-[0_0_20px_hsl(var(--foreground)/0.1)] transition-all duration-300"
              >
                <ChevronLeft size={20} />
              </motion.button>
              
              {/* Animated connecting line */}
              <div className="relative w-8 h-px">
                <div className="absolute inset-0 bg-border/50" />
                <motion.div
                  className="absolute inset-0 bg-foreground/50"
                  animate={{ scaleX: [0, 1, 0], originX: ['0%', '0%', '100%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>
              
              <motion.button
                onClick={() => scrollCarousel('right')}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                className="w-12 h-12 rounded-full border border-border/50 bg-card/50 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/50 hover:shadow-[0_0_20px_hsl(var(--foreground)/0.1)] transition-all duration-300"
              >
                <ChevronRight size={20} />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Horizontal Scroll Gallery */}
      <div className="relative">
        {/* Left fade mask */}
        <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 lg:w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        
        {/* Right fade mask */}
        <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 lg:w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div
            ref={scrollRef}
            className="flex gap-6 px-4 sm:px-8 lg:px-16 overflow-x-auto scrollbar-hide pb-4"
          >
            {projects.map((project, index) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                index={index}
                isFromDatabase={!!isFromDatabase}
              />
            ))}
            {/* Spacer for last card visibility */}
            <div className="flex-shrink-0 w-4 sm:w-8 lg:w-16" />
          </div>
        )}
      </div>

      {/* Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="container-custom mt-20"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-t border-b border-border/50">
          {[
            { value: '30+', label: 'Projects Completed' },
            { value: '10+', label: 'Happy Clients' },
            { value: '3+', label: 'Years Experience' },
            { value: '100%', label: 'Client Satisfaction' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl sm:text-5xl font-bold text-foreground mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
