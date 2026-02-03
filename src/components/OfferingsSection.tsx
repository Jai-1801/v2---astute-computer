import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Palette, Cog, FileText, Code } from 'lucide-react';
import { BlurFade } from '@/components/ui/BlurFade';

const offerings = [
  {
    icon: Palette,
    title: 'Digital Branding',
    slug: 'digital-transformation',
    subtitle: 'Brand Strategy & Visual Identity',
    description: 'We create compelling brand identities and digital experiences that resonate with your audience and differentiate you in the market.',
  },
  {
    icon: Cog,
    title: 'Operations Digitalization',
    slug: 'ai-automation',
    subtitle: 'Process Automation & Integration',
    description: 'Transform your manual processes into streamlined digital workflows. Our automation solutions reduce costs and accelerate operations.',
  },
  {
    icon: FileText,
    title: 'AI Document Archives',
    slug: 'document-digitization',
    subtitle: 'Intelligent Document Management',
    description: 'AI-powered scanning, OCR, and intelligent archival systems that bring order to your documents with quick retrieval and secure storage.',
  },
  {
    icon: Code,
    title: 'Custom Software',
    slug: 'custom-software-development',
    subtitle: 'Full-Stack Development',
    description: 'Tailored web and mobile applications built with modern technologies. From concept to deployment, we deliver solutions that scale.',
  },
];

function OfferingCard({ offering, index }: { offering: typeof offerings[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.5, 1, 1, 0.5]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.95, 1, 1, 0.95]);

  return (
    <motion.div
      ref={cardRef}
      style={{ opacity, scale }}
      className="group"
    >
      <Link
        to={`/services/${offering.slug}`}
        className="block bg-card hover:bg-secondary/50 border border-border rounded-3xl p-8 sm:p-10 transition-all duration-150 hover:border-primary/30"
      >
        <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-12">
          {/* Icon & Title */}
          <div className="flex items-center gap-4 lg:w-1/3">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-150">
              <offering.icon className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-150">
                {offering.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {offering.subtitle}
              </p>
            </div>
          </div>

          {/* Description */}
          <p className="text-muted-foreground lg:flex-1 leading-relaxed">
            {offering.description}
          </p>

          {/* Arrow */}
          <div className="flex items-center lg:w-auto">
            <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center group-hover:border-primary group-hover:bg-primary/10 transition-all duration-150">
              <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-150" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function OfferingsSection() {
  return (
    <section className="relative py-20 sm:py-24 md:py-32 bg-gradient-to-b from-primary/5 to-background">
      <div className="container-custom px-6 sm:px-8">
        {/* Header */}
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-16 mb-12 lg:mb-16">
          <BlurFade>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground">
              Our<br />Offerings
            </h2>
          </BlurFade>
          <BlurFade delay={0.1} className="lg:col-span-2">
            <p className="text-lg text-muted-foreground max-w-2xl lg:mt-4">
              End-to-end digital solutions that transform how you operate, communicate, and grow. Each service is tailored to your unique business needs.
            </p>
          </BlurFade>
        </div>

        {/* Offerings List */}
        <div className="space-y-4 lg:space-y-6">
          {offerings.map((offering, index) => (
            <OfferingCard key={offering.slug} offering={offering} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
