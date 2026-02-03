import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, ChevronDown, Palette, Cog, FileText, Code } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { BlurFade } from '@/components/ui/BlurFade';

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
    <BlurFade delay={index * 0.1}>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div className="group border-b border-border/50 last:border-b-0">
          <CollapsibleTrigger asChild>
            <button className="w-full py-6 sm:py-8 flex items-center justify-between text-left transition-colors hover:bg-primary/5 px-4 -mx-4 rounded-lg">
              <div className="flex items-center gap-4 sm:gap-6">
                <span className="text-3xl sm:text-4xl font-bold text-primary/30 group-hover:text-primary/50 transition-colors">
                  0{index + 1}
                </span>
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <service.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-foreground group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                </div>
              </div>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-border flex items-center justify-center group-hover:border-primary/50 group-hover:bg-primary/10 transition-colors flex-shrink-0"
              >
                <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:text-primary" />
              </motion.div>
            </button>
          </CollapsibleTrigger>
          
          <CollapsibleContent>
            <div className="pb-6 sm:pb-8 pl-16 sm:pl-24">
              <p className="text-muted-foreground mb-6 max-w-2xl leading-relaxed text-sm sm:text-base">
                {service.description}
              </p>
              
              <div className="flex flex-wrap gap-2 sm:gap-3 mb-6">
                {service.features.map((feature) => (
                  <span
                    key={feature}
                    className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm bg-secondary/50 border border-border rounded-full text-muted-foreground"
                  >
                    {feature}
                  </span>
                ))}
              </div>
              
              <Link
                to={`/services/${service.slug}`}
                className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all text-sm sm:text-base"
              >
                Learn more
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>
    </BlurFade>
  );
}

export function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="services" className="relative overflow-hidden py-20 sm:py-24 md:py-32">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[150px] -translate-y-1/2" />

      <div ref={ref} className="container-custom relative z-10 px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 sm:gap-6 mb-12 sm:mb-16">
          <div>
            <BlurFade>
              <span className="inline-block text-xs sm:text-sm uppercase tracking-widest text-primary mb-3 sm:mb-4">
                What We Do
              </span>
            </BlurFade>
            <BlurFade delay={0.1}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
                Our Offerings
              </h2>
            </BlurFade>
          </div>
          <BlurFade delay={0.2}>
            <p className="text-base sm:text-lg text-muted-foreground max-w-md">
              End-to-end digital solutions that transform how you operate, communicate, and grow.
            </p>
          </BlurFade>
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
