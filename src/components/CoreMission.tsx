import { BlurFade } from '@/components/ui/BlurFade';
import { ArrowRight, Sparkles, Cpu, TrendingUp, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import TiltedCard from '@/components/ui/TiltedCard';
import indiaGateImg from '@/assets/sections/india-gate.jpg';

const highlights = [
  { icon: FileText, label: 'Document Digitization' },
  { icon: Cpu, label: 'AI Automation' },
  { icon: Sparkles, label: 'Custom Software' },
  { icon: TrendingUp, label: 'Digital Growth' },
];

export function CoreMission() {
  return (
    <section className="relative z-10 bg-[#f8f8f8] py-24 sm:py-32 lg:py-40 overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
      
      <div className="relative container-custom px-6 sm:px-8 lg:px-12">
        {/* Main content grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Image with decorative elements */}
          <BlurFade>
            <div className="relative">
              {/* Decorative gradient blob */}
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/15 rounded-full blur-2xl" />
              
              {/* Main image with TiltedCard */}
              <TiltedCard
                imageSrc={indiaGateImg}
                altText="Digital transformation in India"
                containerHeight="350px"
                containerWidth="100%"
                imageHeight="350px"
                imageWidth="100%"
                rotateAmplitude={12}
                scaleOnHover={1.02}
                showMobileWarning={false}
                displayOverlayContent
                overlayContent={
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-background/90 backdrop-blur-md rounded-2xl p-4 border border-border/50">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                          <Sparkles className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">Chennai Tech Hub</p>
                          <p className="text-xs text-muted-foreground">India's Digital Innovation Center</p>
                        </div>
                      </div>
                    </div>
                  </div>
                }
              />
            </div>
          </BlurFade>

          {/* Right: Content */}
          <div className="space-y-8">
            <BlurFade delay={0.1}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                <span className="text-xs uppercase tracking-[0.2em] text-primary font-medium">
                  Our Mission
                </span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-[1.15] tracking-tight">
                Empowering businesses with{' '}
                <span className="text-primary">cutting-edge</span>{' '}
                digital solutions
              </h2>
            </BlurFade>

            <BlurFade delay={0.2}>
              <p className="text-lg text-gray-600 leading-relaxed">
                Experience seamless innovation while we modernize your operations, digitalize your legacy systems, and accelerate your growth with AI-powered solutions.
              </p>
            </BlurFade>

            <BlurFade delay={0.3}>
              <p className="text-base text-gray-600 leading-relaxed">
                <span className="text-primary font-semibold">Astute Computer</span> partners with businesses across India to define, design, build, and scale innovative digital solutions. From document digitization to custom software development, we bring decades of expertise to every project.
              </p>
            </BlurFade>

            {/* Highlights grid */}
            <BlurFade delay={0.4}>
              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-4 pt-4">
                {highlights.map((item, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white border border-gray-200 hover:border-primary/30 hover:shadow-md transition-all duration-300"
                  >
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                      <item.icon className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-gray-900">{item.label}</span>
                  </div>
                ))}
              </div>
            </BlurFade>

            {/* CTA */}
            <BlurFade delay={0.5}>
              <Link 
                to="/about" 
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium group transition-colors"
              >
                Learn more about us
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </BlurFade>
          </div>
        </div>
      </div>
    </section>
  );
}
