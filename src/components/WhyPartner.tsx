import { useState } from 'react';
import { Sparkles, Shield, Users, Zap } from 'lucide-react';
import businessImg from '@/assets/sections/why-partner-business.jpg';
import indiaImg from '@/assets/sections/why-partner-india.jpg';
import skyscrapersImg from '@/assets/sections/skyscrapers.jpg';
import aiImg from '@/assets/sections/ai-purple-abstract.jpg';

const features = [
  {
    id: 'strategy',
    icon: Zap,
    title: 'End-to-End Strategic Execution',
    description: 'Complete digital transformation support from strategy to deployment.',
    image: businessImg,
  },
  {
    id: 'ai',
    icon: Sparkles,
    title: 'AI-Powered Solutions',
    description: 'Cutting-edge AI and automation to streamline your operations.',
    image: aiImg,
  },
  {
    id: 'expertise',
    icon: Users,
    title: 'Local Market Expertise',
    description: 'Deep understanding of Chennai\'s business landscape and talent pool.',
    image: indiaImg,
  },
  {
    id: 'partner',
    icon: Shield,
    title: 'Robust Partner Ecosystem',
    description: 'Strong network of technology partners and industry connections.',
    image: skyscrapersImg,
  },
];

export function WhyPartner() {
  const [activeFeature, setActiveFeature] = useState(features[0]);

  return (
    <section className="relative py-24 sm:py-32 lg:py-40 overflow-hidden">
      {/* Background images that change on hover */}
      {features.map((feature) => (
        <div
          key={feature.id}
          className="absolute inset-0 transition-opacity duration-500 ease-out"
          style={{ 
            opacity: activeFeature.id === feature.id ? 1 : 0,
          }}
        >
          <img
            src={feature.image}
            alt=""
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 container-custom px-6 sm:px-8 lg:px-12">
        {/* Card frame with transparent left cutout */}
        <div className="relative max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-2 min-h-[420px] md:min-h-[520px]">
            {/* Left: Transparent cutout - just shows background through */}
            <div className="relative h-48 sm:h-64 md:h-auto rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none overflow-hidden border-4 border-b-0 md:border-b-4 md:border-r-0 border-white/90">
              {/* This is just a frame - background shows through */}
            </div>

            {/* Right: White/Cream panel with content */}
            <div className="bg-[#faf8f5] rounded-b-3xl md:rounded-r-3xl md:rounded-bl-none p-6 sm:p-8 md:p-10 lg:p-12 border-4 border-t-0 md:border-t-4 md:border-l-0 border-white/90">
              <div className="flex items-center gap-3 mb-6 md:mb-8">
                <div className="w-2.5 h-2.5 rounded-full bg-pink-500" />
                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">
                  Why Partner With Us?
                </h2>
              </div>

              <div className="space-y-2">
                {features.map((feature) => (
                  <div
                    key={feature.id}
                    onMouseEnter={() => setActiveFeature(feature)}
                    className={`group p-4 rounded-2xl cursor-pointer transition-colors duration-200 ${
                      activeFeature.id === feature.id
                        ? 'bg-[#fceee0]'
                        : 'hover:bg-gray-100/70'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-200 ${
                        activeFeature.id === feature.id
                          ? 'bg-blue-50'
                          : 'bg-gray-100'
                      }`}>
                        <feature.icon className={`w-5 h-5 transition-colors duration-200 ${
                          activeFeature.id === feature.id ? 'text-blue-500' : 'text-gray-400'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-base text-gray-900">
                          {feature.title}
                        </h3>
                        {activeFeature.id === feature.id && (
                          <p className="text-sm text-gray-500 leading-relaxed mt-1.5">
                            {feature.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* White frame border around the whole card */}
          <div className="absolute inset-0 rounded-3xl border-4 border-white/90 pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
