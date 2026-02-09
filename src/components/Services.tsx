import { useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { ArrowRight, ChevronDown, Palette, Cog, FileText, Code } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { BlurFade } from '@/components/ui/BlurFade';

// Import service background images
import digitalBrandingBg from '@/assets/services/digital-branding-bg.jpg';
import operationsBg from '@/assets/services/operations-bg.jpg';
import aiDocumentsBg from '@/assets/services/ai-documents-bg.jpg';
import customSoftwareBg from '@/assets/services/custom-software-bg.jpg';

const services = [
  {
    icon: Palette,
    title: 'Digital Branding',
    slug: 'digital-transformation',
    description: 'Brand strategy, logo design, and complete visual identity systems that make your business unforgettable.',
    features: ['Brand Strategy', 'Logo Design', 'Visual Identity', 'Brand Guidelines'],
    bgImage: digitalBrandingBg,
  },
  {
    icon: Cog,
    title: 'Operations Digitalization',
    slug: 'ai-automation',
    description: 'Transform your business processes with cutting-edge digitization and automation solutions.',
    features: ['Process Automation', 'Workflow Design', 'System Integration', 'Digital Transformation'],
    bgImage: operationsBg,
  },
  {
    icon: FileText,
    title: 'AI Document Archives',
    slug: 'document-digitization',
    description: 'AI-powered scanning, OCR, and intelligent archival systems that bring order to your documents.',
    features: ['AI-Powered OCR', 'Smart Indexing', 'Secure Storage', 'Quick Retrieval'],
    bgImage: aiDocumentsBg,
  },
  {
    icon: Code,
    title: 'Custom Software',
    slug: 'custom-software-development',
    description: 'Full-stack web and mobile applications tailored to your unique business requirements.',
    features: ['Web Applications', 'Mobile Apps', 'API Development', 'Cloud Solutions'],
    bgImage: customSoftwareBg,
  },
];

function ServiceItem({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <BlurFade delay={index * 0.08}>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div 
          className="group border-b border-border/50 last:border-b-0 relative overflow-hidden rounded-xl"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Background image - instant transition on hover */}
          <div 
            className="absolute inset-0 transition-opacity duration-100"
            style={{ opacity: isHovered ? 1 : 0 }}
          >
            <img 
              src={service.bgImage} 
              alt="" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-background/80 dark:bg-background/85" />
          </div>

          <CollapsibleTrigger asChild>
            <button className="relative z-10 w-full py-6 sm:py-8 flex items-center justify-between text-left px-4">
              <div className="flex items-center gap-4 sm:gap-6">
                <span 
                  className="text-3xl sm:text-4xl font-bold transition-colors duration-100"
                  style={{ color: isHovered ? 'hsl(var(--primary) / 0.6)' : 'hsl(var(--primary) / 0.3)' }}
                >
                  0{index + 1}
                </span>
                <div className="flex items-center gap-3 sm:gap-4">
                  <div 
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl border border-primary/20 flex items-center justify-center transition-colors duration-100"
                    style={{ backgroundColor: isHovered ? 'hsl(var(--primary) / 0.2)' : 'hsl(var(--primary) / 0.1)' }}
                  >
                    <service.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>
                  <h3 
                    className="text-xl sm:text-2xl md:text-3xl font-semibold transition-colors duration-100"
                    style={{ color: isHovered ? 'hsl(var(--primary))' : 'hsl(var(--foreground))' }}
                  >
                    {service.title}
                  </h3>
                </div>
              </div>
              <div
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center flex-shrink-0 transition-all duration-100"
                style={{ 
                  transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  borderColor: isHovered ? 'hsl(var(--primary) / 0.5)' : 'hsl(var(--border))',
                  backgroundColor: isHovered ? 'hsl(var(--primary) / 0.1)' : 'transparent'
                }}
              >
                <ChevronDown 
                  className="w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-100"
                  style={{ color: isHovered ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))' }}
                />
              </div>
            </button>
          </CollapsibleTrigger>
          
          <CollapsibleContent>
            <div className="relative z-10 pb-6 sm:pb-8 pl-16 sm:pl-24 pr-4">
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
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[150px] -translate-y-1/2 pointer-events-none" />

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
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-[1.15]">
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
            />
          ))}
        </div>
      </div>
    </section>
  );
}
