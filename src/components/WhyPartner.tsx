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
    <section className="relative min-h-screen overflow-hidden">
      {/* Background images that change on hover */}
      {features.map((feature) => (
        <div
          key={feature.id}
          className="absolute inset-0 transition-opacity duration-100"
          style={{ opacity: activeFeature.id === feature.id ? 1 : 0 }}
        >
          <img
            src={feature.image}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-background/60 dark:bg-background/70" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 container-custom px-6 sm:px-8 py-20 sm:py-24 md:py-32 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
          {/* Left: Image Card */}
          <BlurFade>
            <div className="relative">
              <div className="aspect-[3/4] sm:aspect-[4/5] rounded-3xl overflow-hidden bg-card border-4 border-background shadow-2xl">
                <img
                  src={activeFeature.image}
                  alt={activeFeature.title}
                  className="w-full h-full object-cover transition-all duration-100"
                />
              </div>
            </div>
          </BlurFade>

          {/* Right: Feature List */}
          <div className="bg-card/80 backdrop-blur-sm rounded-3xl p-8 sm:p-10 border border-border">
            <BlurFade delay={0.1}>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
                  Why Partner With Us?
                </h2>
              </div>
            </BlurFade>

            <div className="space-y-4">
              {features.map((feature, index) => (
                <BlurFade key={feature.id} delay={0.15 + index * 0.05}>
                  <div
                    onMouseEnter={() => setActiveFeature(feature)}
                    className={`group p-5 rounded-2xl cursor-pointer transition-all duration-100 ${
                      activeFeature.id === feature.id
                        ? 'bg-secondary/80 border border-primary/30'
                        : 'hover:bg-secondary/50'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-100 ${
                        activeFeature.id === feature.id
                          ? 'bg-primary/20'
                          : 'bg-secondary'
                      }`}>
                        <feature.icon className={`w-5 h-5 transition-colors duration-100 ${
                          activeFeature.id === feature.id ? 'text-primary' : 'text-muted-foreground'
                        }`} />
                      </div>
                      <div>
                        <h3 className={`font-semibold text-lg mb-1 transition-colors duration-100 ${
                          activeFeature.id === feature.id ? 'text-primary' : 'text-foreground'
                        }`}>
                          {feature.title}
                        </h3>
                        {activeFeature.id === feature.id && (
                          <p className="text-sm text-muted-foreground">
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
