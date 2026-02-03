import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Palette, Cog, FileText, Code } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

const services = [
  {
    icon: Palette,
    title: 'Digital Branding',
    slug: 'digital-transformation',
    description: 'Brand strategy, logo design, and complete visual identity systems that make your business unforgettable.',
    features: ['Brand Strategy', 'Logo Design', 'Visual Identity', 'Brand Guidelines'],
  },
  {
    icon: Cog,
    title: 'Operations Digitalization',
    slug: 'ai-automation',
    description: 'Transform your business processes with cutting-edge digitization and automation solutions.',
    features: ['Process Automation', 'Workflow Design', 'System Integration', 'Digital Transformation'],
  },
  {
    icon: FileText,
    title: 'AI Document Archives',
    slug: 'document-digitization',
    description: 'AI-powered scanning, OCR, and intelligent archival systems that bring order to your documents.',
    features: ['AI-Powered OCR', 'Smart Indexing', 'Secure Storage', 'Quick Retrieval'],
  },
  {
    icon: Code,
    title: 'Custom Software',
    slug: 'custom-software-development',
    description: 'Full-stack web and mobile applications tailored to your unique business requirements.',
    features: ['Web Applications', 'Mobile Apps', 'API Development', 'Cloud Solutions'],
  },
];

function StackCard({
  service,
  index,
  totalCards,
}: {
  service: (typeof services)[0];
  index: number;
  totalCards: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  // Cards behind should scale down and fade slightly
  const scale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.5, 0.7, 1],
    [0.9, 0.95, 1, 0.98, 0.95]
  );
  
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.8, 1],
    [0.5, 0.8, 1, 0.9, 0.7]
  );

  // Staggered sticky top position
  const stickyTop = 80 + index * 20;

  return (
    <motion.div
      ref={cardRef}
      style={{
        position: 'sticky',
        top: stickyTop,
        scale,
        opacity,
        zIndex: totalCards - index,
      }}
      className="mb-6"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          delay: index * 0.1,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        viewport={{ once: true, margin: '-50px' }}
        className="group relative"
      >
        <Link to={`/services/${service.slug}`}>
          <div 
            className="relative p-8 sm:p-10 rounded-2xl bg-card border border-border/50 transition-all duration-500 group-hover:border-foreground/20 overflow-hidden"
            style={{
              boxShadow: `0 ${10 + index * 5}px ${40 + index * 10}px -${10 + index * 2}px hsl(0 0% 0% / ${0.3 + index * 0.05})`,
            }}
          >
            {/* Glow effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10">
              {/* Icon */}
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="relative z-10 w-16 h-16 rounded-xl bg-foreground/5 border border-foreground/10 flex items-center justify-center group-hover:bg-foreground/10 transition-colors flex-shrink-0"
              >
                <service.icon className="w-8 h-8 text-foreground" />
              </motion.div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="relative z-10 text-2xl sm:text-3xl font-semibold text-foreground mb-3">
                      {service.title}
                    </h3>
                    <p className="relative z-10 text-muted-foreground leading-relaxed max-w-xl">
                      {service.description}
                    </p>
                  </div>

                  {/* Features */}
                  <ul className="relative z-10 flex flex-wrap lg:flex-col gap-2 lg:gap-1 lg:text-right lg:min-w-[180px]">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center lg:justify-end gap-2 text-sm text-muted-foreground"
                      >
                        <span className="w-1 h-1 rounded-full bg-foreground/50 lg:order-2" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Card number */}
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 text-6xl sm:text-8xl font-bold text-foreground/5 pointer-events-none">
              0{index + 1}
            </div>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
}

// Mobile fallback grid
function MobileServiceCard({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="group relative"
    >
      <Link to={`/services/${service.slug}`}>
        <div className="relative p-6 rounded-2xl bg-card border border-border/50 transition-all duration-500 group-hover:border-foreground/20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="relative z-10 w-14 h-14 rounded-xl bg-foreground/5 border border-foreground/10 flex items-center justify-center mb-6 group-hover:bg-foreground/10 transition-colors"
          >
            <service.icon className="w-7 h-7 text-foreground" />
          </motion.div>

          <h3 className="relative z-10 text-2xl font-semibold text-foreground mb-3">
            {service.title}
          </h3>
          <p className="relative z-10 text-muted-foreground mb-6 leading-relaxed">
            {service.description}
          </p>

          <ul className="relative z-10 space-y-2">
            {service.features.map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <span className="w-1 h-1 rounded-full bg-foreground/50" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </Link>
    </motion.div>
  );
}

export function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const isMobile = useIsMobile();

  return (
    <section id="services" className="snap-section relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <div ref={ref} className="container-custom relative z-10 py-24 md:py-32">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="inline-block text-sm uppercase tracking-widest text-muted-foreground mb-4"
          >
            What We Do
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6"
          >
            Our Services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            End-to-end digital solutions that transform how you operate, communicate, and grow.
          </motion.p>
        </div>

        {/* Scroll Stack for Desktop, Grid for Mobile */}
        {isMobile ? (
          <div className="grid gap-6">
            {services.map((service, index) => (
              <MobileServiceCard key={service.title} service={service} index={index} />
            ))}
          </div>
        ) : (
          <div className="relative pb-32">
            {services.map((service, index) => (
              <StackCard
                key={service.title}
                service={service}
                index={index}
                totalCards={services.length}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
