import { useRef, useEffect, useState } from 'react';
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
];

export function OfferingsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = sectionRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;
      
      // Calculate how far through the section we've scrolled
      const scrollStart = viewportHeight; // When section top hits bottom of viewport
      const scrollEnd = -sectionHeight; // When section bottom leaves top of viewport
      const totalScrollDistance = scrollStart - scrollEnd;
      const currentPosition = rect.top;
      
      const progress = Math.max(0, Math.min(1, (scrollStart - currentPosition) / totalScrollDistance));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Interpolate colors based on scroll progress
  // Start: dark blue (#0f1629) -> End: royal blue (#305CDE)
  const interpolateColor = (progress: number) => {
    // Apply easing for smoother transition
    const easedProgress = progress * progress * (3 - 2 * progress); // smoothstep easing
    
    // Dark Blue RGB: 15, 22, 41
    // Royal Blue RGB: 48, 92, 222
    const r = Math.round(15 + (48 - 15) * easedProgress);
    const g = Math.round(22 + (92 - 22) * easedProgress);
    const b = Math.round(41 + (222 - 41) * easedProgress);
    return `rgb(${r}, ${g}, ${b})`;
  };

  return (
    <section 
      ref={sectionRef}
      className="relative"
      style={{
        background: interpolateColor(scrollProgress),
        transition: 'background 0.15s ease-out',
      }}
    >
      <div className="container-custom px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-32">
        <div className="flex flex-col lg:grid lg:grid-cols-[280px_1fr] xl:grid-cols-[350px_1fr] gap-10 lg:gap-16 xl:gap-24">
          {/* Left - Sticky Title */}
          <div className="lg:sticky lg:top-28 self-start mb-8 lg:mb-0 h-fit">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.05]">
              Our<br />Offerings
            </h2>
          </div>

          {/* Right - Stacking Cards */}
          <div className="relative max-w-2xl mx-auto">
            {offerings.map((offering, index) => (
              <div 
                key={offering.slug}
                className="sticky mb-8"
                style={{ 
                  top: `${80 + (index * 40)}px`,
                  zIndex: index + 1,
                }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                >
                  <Link
                    to={`/services/${offering.slug}`}
                    className="block relative overflow-hidden rounded-2xl transition-all duration-300 group shadow-xl"
                    style={{
                      background: 'rgba(26, 26, 48, 0.25)',
                      backdropFilter: 'blur(24px)',
                    }}
                  >
                    {/* Border */}
                    <div className="absolute inset-0 rounded-2xl border border-white/10" />
                    
                    {/* Content */}
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
