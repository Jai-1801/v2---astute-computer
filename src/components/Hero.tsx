import { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion';
import { FloatingGrid } from './FloatingGrid';
import { MagneticButton } from './MagneticButton';

const headlineWords = ['Modernize', 'Your', 'Operations.', 'Digitalize', 'Your', 'Legacy.'];

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

  const scrollToServices = () => {
    const element = document.querySelector('#services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={ref}
      className="snap-section relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 3D Grid Background */}
      <FloatingGrid />

      {/* Content */}
      <motion.div
        style={{ opacity, y, filter: blurFilter }}
        className="relative z-10 container-custom text-center px-4"
      >
        {/* Headline */}
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.1]">
            {headlineWords.map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.5 + index * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className={`inline-block mr-4 ${
                  word.includes('.') ? 'text-muted-foreground' : 'text-foreground'
                }`}
              >
                {word}
              </motion.span>
            ))}
          </h1>
        </div>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed"
        >
          From digital branding to AI-powered document archives.
          <br className="hidden sm:block" />
          We build the software that powers your business.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
        >
          <MagneticButton variant="primary" onClick={scrollToContact}>
            Transform Your Business
          </MagneticButton>
          <MagneticButton variant="secondary" onClick={scrollToServices}>
            View Solutions
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator - Fixed to bottom of viewport */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 text-muted-foreground"
        >
          <span className="text-xs uppercase tracking-widest font-light">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-foreground/50 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
