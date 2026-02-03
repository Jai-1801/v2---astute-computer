import { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

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
      className="snap-section relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Purple Ambient Glow Background */}
      <div className="absolute inset-0">
        {/* Primary glow */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] animate-pulse-glow" />
        {/* Secondary glow */}
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] animate-pulse-glow delay-500" />
        {/* Grid pattern */}
        <div className="absolute inset-0 grid-pattern opacity-20" />
      </div>

      {/* Content */}
      <motion.div
        style={{ opacity, y, filter: blurFilter }}
        className="relative z-10 container-custom px-4"
      >
        <div className="max-w-4xl">
          {/* Announcement Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-8"
          >
            <span className="badge-announcement">
              <Sparkles className="h-4 w-4" />
              <span>Now offering AI-powered solutions</span>
            </span>
          </motion.div>

          {/* Headline - Left aligned with gradient */}
          <div className="mb-8">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]"
            >
              <span className="text-gradient-purple">Modernize</span>
              <span className="text-foreground"> Your Operations.</span>
              <br />
              <span className="text-muted-foreground">Digitalize Your Legacy.</span>
            </motion.h1>
          </div>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed"
          >
            From digital branding to AI-powered document archives.
            We build the software that powers your business transformation.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-col sm:flex-row items-start gap-4"
          >
            <motion.button
              onClick={scrollToContact}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground text-sm font-medium rounded-full button-glow transition-all"
            >
              Transform Your Business
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </motion.button>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/case-studies"
                className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-border text-foreground text-sm font-medium rounded-full hover:border-primary/50 hover:bg-primary/5 transition-all"
              >
                View Our Work
              </Link>
            </motion.div>
          </motion.div>

          {/* Customer Testimonial Row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="mt-12 flex items-center gap-4"
          >
            {/* Avatar Stack */}
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
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 text-muted-foreground"
        >
          <span className="text-xs uppercase tracking-widest font-light">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-primary/50 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
