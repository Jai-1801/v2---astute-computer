import { ArrowRight } from 'lucide-react';
import LightPillar from '@/components/ui/LightPillar';

export function Hero() {
  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Fixed Hero Background */}
      <section className="fixed top-0 left-0 right-0 h-screen flex items-center overflow-hidden bg-[#0a0a0a] z-0">
        {/* Light Pillar Background Effect */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <LightPillar
            topColor="#305CDE"
            bottomColor="#60A5FA"
            intensity={1}
            rotationSpeed={0.3}
            glowAmount={0.002}
            pillarWidth={3}
            pillarHeight={0.4}
            noiseIntensity={0.5}
            pillarRotation={25}
            interactive={false}
            mixBlendMode="screen"
            quality="medium"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full px-6 sm:px-8 md:px-12 lg:px-20 xl:px-32 pt-24 sm:pt-24 md:pt-28 lg:pt-28">
          <div className="max-w-3xl">
            {/* Announcement Badge - 6S Style */}
            <div className="mb-5 sm:mb-6 inline-flex items-center">
              <span className="px-3 py-1.5 bg-white text-[#305CDE] text-[0.8rem] sm:text-sm md:text-base font-semibold rounded-l-md">
                New
              </span>
              <span className="px-3 sm:px-4 py-1.5 bg-gray-800/80 backdrop-blur-sm text-white text-[0.8rem] sm:text-sm md:text-base rounded-r-md">
                Now offering AI-powered solutions
              </span>
            </div>

            {/* Headline - 6S Consulting Typography Style */}
            <h1 className="text-[1.75rem] sm:text-3xl md:text-4xl lg:text-[3.5rem] xl:text-[4rem] font-bold tracking-tight leading-[1.15] md:leading-[1.2] lg:leading-[1.25] mb-5 sm:mb-6 md:mb-8">
              <span className="text-white">Strategic Digital Scaling</span>
              <br />
              <span className="text-white">Driven by </span>
              <span className="text-white">AI</span>
            </h1>

            {/* Subheadline - Bold and bright */}
            <p className="text-[0.95rem] sm:text-base md:text-lg lg:text-xl xl:text-[1.35rem] text-white font-medium max-w-2xl mb-6 sm:mb-8 md:mb-10 leading-[1.6]">
              We help businesses establish their own dedicated digital transformation hub — 
              a fully owned capability center designed to deliver technology, 
              operations, and business functions at scale.
            </p>

            {/* CTA Button - Blue gradient bg with white text */}
            <div className="flex flex-col sm:flex-row items-start gap-4 mb-6 sm:mb-8 md:mb-10">
              <button
                onClick={scrollToContact}
                className="group inline-flex items-center gap-2 pl-5 sm:pl-6 pr-2 py-2 bg-gradient-to-r from-[#305CDE] to-[#60A5FA] hover:from-[#2548B5] hover:to-[#3B82F6] text-white text-[0.9rem] sm:text-base font-medium rounded-full transition-all"
              >
                <span>Coffee's on us</span>
                <span className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 bg-white/20 rounded-full">
                  <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white transition-transform duration-300 ease-out group-hover:-translate-x-0.5" />
                </span>
              </button>
            </div>

            {/* Customer Testimonial Row - Brighter text */}
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full bg-gradient-to-br from-[#305CDE]/60 to-[#305CDE] border-2 border-[#0a0a0a] flex items-center justify-center text-[10px] sm:text-xs md:text-sm font-medium text-white"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 text-[0.8rem] sm:text-sm md:text-base">
                <span className="text-white/80">→</span>
                <span className="font-bold text-white">20+</span>
                <span className="text-white font-medium">Satisfied Customers</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spacer to push content below */}
      <div className="h-screen" />
    </>
  );
}
