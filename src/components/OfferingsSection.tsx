import { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const offerings = [
  {
    title: 'Digital Branding',
    slug: 'digital-transformation',
    description: 'We create compelling brand identities and digital experiences that resonate with your audience and differentiate you in the market.',
  },
  {
    title: 'Operations Digitalization',
    slug: 'ai-automation',
    description: 'Transform your manual processes into streamlined digital workflows. Our automation solutions reduce costs and accelerate operations.',
  },
  {
    title: 'AI Document Archives',
    slug: 'document-digitization',
    description: 'AI-powered scanning, OCR, and intelligent archival systems that bring order to your documents with quick retrieval and secure storage.',
  },
  {
    title: 'DevOps & SRE Solutions',
    slug: 'custom-software-development',
    description: 'We enable high-performing engineering teams with modern DevOps and SRE practices, implementing modern DevOps and SRE strategies with AI, automation, tooling, and training.',
  },
] as const;

// Color interpolation constants
const START_COLOR = { r: 15, g: 22, b: 41 };    // Dark blue #0f1629
const END_COLOR = { r: 48, g: 92, b: 222 };     // Royal blue #305CDE

// Smoothstep easing function
const smoothstep = (t: number) => t * t * (3 - 2 * t);

// Interpolate between two colors
const interpolateColor = (progress: number): string => {
  const t = smoothstep(progress);
  const r = Math.round(START_COLOR.r + (END_COLOR.r - START_COLOR.r) * t);
  const g = Math.round(START_COLOR.g + (END_COLOR.g - START_COLOR.g) * t);
  const b = Math.round(START_COLOR.b + (END_COLOR.b - START_COLOR.b) * t);
  return `rgb(${r},${g},${b})`;
};

// Card styles - defined outside to avoid recreating on each render
const cardStyle = {
  background: 'rgba(26, 26, 48, 0.25)',
  backdropFilter: 'blur(24px)',
} as const;

export function OfferingsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleScroll = useCallback(() => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const sectionHeight = sectionRef.current.offsetHeight;
    const viewportHeight = window.innerHeight;
    const scrollStart = viewportHeight;
    const scrollEnd = -sectionHeight;
    const totalScrollDistance = scrollStart - scrollEnd;
    const progress = Math.max(0, Math.min(1, (scrollStart - rect.top) / totalScrollDistance));
    setScrollProgress(progress);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll, isMobile]);

  // Static color for mobile, animated for desktop
  const backgroundColor = useMemo(() => {
    return isMobile ? '#305CDE' : interpolateColor(scrollProgress);
  }, [scrollProgress, isMobile]);

  const sectionStyle = useMemo(() => ({
    background: backgroundColor,
    transition: isMobile ? undefined : 'background 0.15s ease-out',
  }), [backgroundColor, isMobile]);

  return (
    <section ref={sectionRef} className="relative" style={sectionStyle}>
      <div className="container-custom px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-32">
        <div className="flex flex-col lg:grid lg:grid-cols-[280px_1fr] xl:grid-cols-[350px_1fr] gap-10 lg:gap-16 xl:gap-24">
          {/* Left - Sticky Title */}
          <div className="lg:sticky lg:top-28 self-start mb-8 lg:mb-0 h-fit">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.05]">
              Our<br />Offerings
            </h2>
          </div>

          {/* Right - Cards */}
          <div className="relative max-w-2xl mx-auto">
            {offerings.map((offering, index) => (
              <div 
                key={offering.slug}
                className={isMobile ? "mb-6" : "sticky mb-8"}
                style={isMobile ? undefined : { 
                  top: `${80 + index * 40}px`,
                  zIndex: index + 1,
                }}
              >
                {isMobile ? (
                  <Link
                    to={`/services/${offering.slug}`}
                    className="block relative overflow-hidden rounded-2xl shadow-xl group"
                    style={cardStyle}
                  >
                    <div className="absolute inset-0 rounded-2xl border border-white/10" />
                    <div className="relative z-10 p-8">
                      <h3 className="text-xl font-bold text-white mb-4">
                        {offering.title}
                      </h3>
                      <p className="text-sm text-gray-400 leading-relaxed">
                        {offering.description}
                      </p>
                    </div>
                  </Link>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-20px" }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                  >
                    <Link
                      to={`/services/${offering.slug}`}
                      className="block relative overflow-hidden rounded-2xl transition-all duration-300 group shadow-xl"
                      style={cardStyle}
                    >
                      <div className="absolute inset-0 rounded-2xl border border-white/10" />
                      <div className="relative z-10 p-8 sm:p-10 lg:p-12">
                        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors duration-300">
                          {offering.title}
                        </h3>
                        <p className="text-sm sm:text-base lg:text-lg text-gray-400 leading-relaxed">
                          {offering.description}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
