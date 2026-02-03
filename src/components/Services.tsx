import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Palette, Cog, FileText, Code } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

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

function ServiceItem({
  service,
  index,
  isInView,
}: {
  service: (typeof services)[0];
  index: number;
  isInView: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div className="group border-b border-border/50 last:border-b-0">
          <CollapsibleTrigger asChild>
            <button className="w-full py-8 flex items-center justify-between text-left transition-colors hover:bg-primary/5 px-4 -mx-4 rounded-lg">
              <div className="flex items-center gap-6">
                {/* Number */}
                <span className="text-4xl font-bold text-primary/30 group-hover:text-primary/50 transition-colors">
                  0{index + 1}
                </span>
                {/* Title */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-semibold text-foreground group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                </div>
              </div>
              {/* Arrow / Chevron */}
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:border-primary/50 group-hover:bg-primary/10 transition-colors"
              >
                <ChevronDown className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
              </motion.div>
            </button>
          </CollapsibleTrigger>
          
          <CollapsibleContent>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="pb-8 pl-24"
            >
              <p className="text-muted-foreground mb-6 max-w-2xl leading-relaxed">
                {service.description}
              </p>
              
              {/* Features */}
              <div className="flex flex-wrap gap-3 mb-6">
                {service.features.map((feature) => (
                  <span
                    key={feature}
                    className="px-4 py-2 text-sm bg-secondary/50 border border-border rounded-full text-muted-foreground"
                  >
                    {feature}
                  </span>
                ))}
              </div>
              
              {/* CTA */}
              <Link
                to={`/services/${service.slug}`}
                className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
              >
                Learn more
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </CollapsibleContent>
        </div>
      </Collapsible>
    </motion.div>
  );
}

export function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="services" className="snap-section relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      {/* Purple ambient glow */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] -translate-y-1/2" />

      <div ref={ref} className="container-custom relative z-10 py-24 md:py-32">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
              className="inline-block text-sm uppercase tracking-widest text-primary mb-4"
            >
              What We Do
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground"
            >
              Our Offerings
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-md"
          >
            End-to-end digital solutions that transform how you operate, communicate, and grow.
          </motion.p>
        </div>

        {/* Services List */}
        <div className="space-y-0">
          {services.map((service, index) => (
            <ServiceItem
              key={service.title}
              service={service}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
