import { BlurFade } from '@/components/ui/BlurFade';
import indiaGateImg from '@/assets/sections/india-gate.jpg';

export function CoreMission() {
  return (
    <section className="relative bg-secondary/30 py-24 sm:py-32 lg:py-40">
      <div className="container-custom px-6 sm:px-8 lg:px-12">
        {/* Header - Following 6S style: label left, headline right */}
        <div className="grid lg:grid-cols-[200px_1fr] gap-8 lg:gap-24 mb-20 lg:mb-28">
          <BlurFade>
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-primary" />
              <span className="text-xs uppercase tracking-[0.2em] text-foreground font-medium">
                Our Core Thing
              </span>
            </div>
          </BlurFade>
          
          <BlurFade delay={0.1}>
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-[2.75rem] font-bold text-foreground leading-[1.2] tracking-tight italic">
                Empowering businesses with cutting-edge digital transformation and AI-powered solutions!
              </h2>
              <p className="text-xl sm:text-2xl lg:text-[1.75rem] text-muted-foreground leading-[1.3] mt-4 italic">
                Experience seamless innovation while we modernize your operations, digitalize your legacy systems, and accelerate your growth.
              </p>
            </div>
          </BlurFade>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-foreground/20 mb-16 lg:mb-20" />

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <BlurFade delay={0.2}>
            <div className="relative max-w-md">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden border-4 border-background shadow-2xl">
                <img 
                  src={indiaGateImg} 
                  alt="Digital transformation visualization" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </BlurFade>

          <BlurFade delay={0.3}>
            <div className="space-y-6 lg:pt-4">
              <p className="text-base sm:text-lg lg:text-xl text-foreground leading-relaxed">
                Chennai is emerging as India's digital transformation hub, with a thriving ecosystem of tech companies and startups. The city's robust IT infrastructure, skilled workforce, and business-friendly environment make it the ideal location for digital innovation.
              </p>
              <p className="text-base sm:text-lg lg:text-xl text-foreground leading-relaxed">
                <span className="text-primary font-semibold">Astute Computer</span> partners with businesses to define, design, build, and scale innovative digital solutions. From document digitization to custom software development, we bring decades of expertise to every project.
              </p>
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
