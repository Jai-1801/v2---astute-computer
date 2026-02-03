import { useState } from 'react';
import { Sparkles, Shield, Users, Zap } from 'lucide-react';
import { BlurFade } from '@/components/ui/BlurFade';
import businessImg from '@/assets/sections/why-partner-business.jpg';
import indiaImg from '@/assets/sections/why-partner-india.jpg';

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
    image: businessImg,
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
    image: indiaImg,
  },
];

export function WhyPartner() {
  const [activeFeature, setActiveFeature] = useState(features[0]);

  return (
    <section className="relative py-24 sm:py-32 lg:py-40 overflow-hidden">
      {/* Background images that change on hover - instant transition */}
      {features.map((feature) => (
        <div
          key={feature.id}
          className="absolute inset-0"
          style={{ 
            opacity: activeFeature.id === feature.id ? 1 : 0,
            transition: 'opacity 100ms ease-out'
          }}
        >
          <img
            src={feature.image}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-background/70 dark:bg-background/80" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 container-custom px-6 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Image Card */}
          <BlurFade>
            <div className="relative max-w-lg mx-auto lg:mx-0">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden border-4 border-background shadow-2xl">
                <img
                  src={activeFeature.image}
                  alt={activeFeature.title}
                  className="w-full h-full object-cover"
                  style={{ transition: 'opacity 100ms ease-out' }}
                />
              </div>
            </div>
          </BlurFade>

          {/* Right: Feature List */}
          <div className="bg-card/90 backdrop-blur-md rounded-2xl p-8 sm:p-10 lg:p-12 border border-border/50">
            <BlurFade delay={0.1}>
              <div className="flex items-center gap-3 mb-10">
                <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
                  Why Partner With Us?
                </h2>
              </div>
            </BlurFade>

            <div className="space-y-2">
              {features.map((feature, index) => (
                <BlurFade key={feature.id} delay={0.15 + index * 0.05}>
                  <div
                    onMouseEnter={() => setActiveFeature(feature)}
                    className={`group p-5 rounded-xl cursor-pointer border transition-all duration-100 ${
                      activeFeature.id === feature.id
                        ? 'bg-card border-primary/30 shadow-sm'
                        : 'bg-transparent border-transparent hover:bg-secondary/30'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-100 ${
                        activeFeature.id === feature.id
                          ? 'bg-primary/15'
                          : 'bg-secondary/50'
                      }`}>
                        <feature.icon className={`w-5 h-5 transition-colors duration-100 ${
                          activeFeature.id === feature.id ? 'text-primary' : 'text-muted-foreground'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-semibold text-base sm:text-lg transition-colors duration-100 ${
                          activeFeature.id === feature.id ? 'text-primary' : 'text-foreground'
                        }`}>
                          {feature.title}
                        </h3>
                        {activeFeature.id === feature.id && (
                          <p className="text-sm text-muted-foreground mt-1.5">
                            {feature.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </BlurFade>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
