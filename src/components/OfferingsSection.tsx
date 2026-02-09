import { useEffect, useState } from 'react';
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

// Card styles - defined outside to avoid recreating on each render
const cardStyle = {
  background: 'rgba(26, 26, 48, 0.25)',
  backdropFilter: 'blur(24px)',
} as const;

// Static gradient background
const sectionStyle = {
  background: 'linear-gradient(to bottom, #0f1629 0%, #1a2a5e 40%, #305CDE 100%)',
} as const;

export function OfferingsSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section className="relative" style={sectionStyle}>
      <div className="container-custom px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-32">
        <div className="flex flex-col md:grid md:grid-cols-[240px_1fr] lg:grid-cols-[280px_1fr] xl:grid-cols-[350px_1fr] gap-8 md:gap-12 lg:gap-16 xl:gap-24">
          {/* Left - Sticky Title */}
          <div className="md:sticky md:top-28 self-start mb-6 md:mb-0 h-fit">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.15]">
              Our<br />Offerings
            </h2>
          </div>

          {/* Right - Stacking Cards (now enabled on mobile too!) */}
          <div className="relative w-full max-w-2xl mx-auto md:mx-0">
            {offerings.map((offering, index) => (
              <div
                key={offering.slug}
                className="sticky mb-6 sm:mb-8"
                style={{
                  // Card stacking: each card sticks slightly lower
                  top: isMobile ? `${100 + index * 20}px` : `${80 + index * 40}px`,
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
                    style={cardStyle}
                  >
                    <div className="absolute inset-0 rounded-2xl border border-white/10" />
                    <div className={`relative z-10 ${isMobile ? 'p-6' : 'p-8 sm:p-10 lg:p-12'}`}>
                      <h3 className={`font-bold text-white mb-3 sm:mb-4 group-hover:text-blue-300 transition-colors duration-300 ${isMobile ? 'text-lg' : 'text-xl sm:text-2xl lg:text-3xl'}`}>
                        {offering.title}
                      </h3>
                      <p className={`text-gray-400 leading-relaxed ${isMobile ? 'text-sm' : 'text-sm sm:text-base lg:text-lg'}`}>
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
