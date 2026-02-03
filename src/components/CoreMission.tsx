import { BlurFade } from '@/components/ui/BlurFade';
import indiaGateImg from '@/assets/sections/india-gate.jpg';

export function CoreMission() {
  return (
    <section className="relative min-h-screen bg-secondary/30 py-20 sm:py-24 md:py-32">
      <div className="container-custom px-6 sm:px-8">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 mb-16 lg:mb-24">
          <BlurFade>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-xs sm:text-sm uppercase tracking-widest text-primary font-medium">
                Our Core Thing
              </span>
            </div>
          </BlurFade>
          
          <BlurFade delay={0.1}>
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6">
                Empowering businesses with cutting-edge digital transformation and AI-powered solutions!
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                Experience seamless innovation while we modernize your operations, digitalize your legacy systems, and accelerate your growth.
              </p>
            </div>
          </BlurFade>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-border mb-16 lg:mb-24" />

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <BlurFade delay={0.2}>
            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden border-4 border-background shadow-2xl">
                <img 
                  src={indiaGateImg} 
                  alt="Digital transformation visualization" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </BlurFade>

          <BlurFade delay={0.3}>
            <div className="space-y-6">
              <p className="text-base sm:text-lg text-foreground leading-relaxed">
                Chennai is emerging as India's digital transformation hub, with a thriving ecosystem of tech companies and startups. The city's robust IT infrastructure, skilled workforce, and business-friendly environment make it the ideal location for digital innovation.
              </p>
              <p className="text-base sm:text-lg text-foreground leading-relaxed">
                <span className="text-primary font-semibold">Astute Computer</span> partners with businesses to define, design, build, and scale innovative digital solutions. From document digitization to custom software development, we bring decades of expertise to every project.
              </p>
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
