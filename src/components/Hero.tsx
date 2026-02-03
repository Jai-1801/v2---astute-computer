import { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BlurFade } from '@/components/ui/BlurFade';

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const blurValue = useTransform(scrollYProgress, [0, 0.5], [0, 10]);
  const blurFilter = useMotionTemplate`blur(${blurValue}px)`;
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden pt-24"
    >
      {/* Purple Ambient Glow Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute inset-0 grid-pattern opacity-20" />
      </div>

      {/* Content */}
      <motion.div
        style={{ opacity, y, filter: blurFilter }}
        className="relative z-10 container-custom px-6 sm:px-8"
      >
        <div className="max-w-3xl">
          {/* Announcement Badge */}
          <BlurFade delay={0.1}>
            <span className="badge-announcement mb-8 inline-flex">
              <Sparkles className="h-4 w-4" />
              <span>Now offering AI-powered solutions</span>
            </span>
          </BlurFade>

          {/* Headline */}
          <BlurFade delay={0.2}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
              <span className="text-gradient-purple">Modernize</span>
              <span className="text-foreground"> Your Operations.</span>
              <br />
              <span className="text-muted-foreground">Digitalize Your Legacy.</span>
            </h1>
          </BlurFade>

          {/* Subheadline */}
          <BlurFade delay={0.3}>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mb-10 leading-relaxed">
              From digital branding to AI-powered document archives.
              We build the software that powers your business transformation.
            </p>
          </BlurFade>

          {/* CTA Buttons */}
          <BlurFade delay={0.4}>
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <button
                onClick={scrollToContact}
                className="group inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground text-sm font-medium rounded-full button-glow transition-all hover:scale-[1.02]"
              >
                Transform Your Business
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <Link
                to="/case-studies"
                className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-border text-foreground text-sm font-medium rounded-full hover:border-primary/50 hover:bg-primary/5 transition-all"
              >
                View Our Work
              </Link>
            </div>
          </BlurFade>

          {/* Customer Testimonial Row */}
          <BlurFade delay={0.5}>
            <div className="mt-12 flex items-center gap-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/50 to-primary border-2 border-background flex items-center justify-center text-xs font-medium text-primary-foreground"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div className="text-sm">
                <span className="font-semibold text-foreground">20+</span>
                <span className="text-muted-foreground"> Satisfied Clients</span>
              </div>
            </div>
          </BlurFade>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-xs uppercase tracking-widest font-light">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-primary/50 to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}
