import { BlurFade } from '@/components/ui/BlurFade';
import DotGrid from '@/components/ui/DotGrid';
import ReflectiveCard from '@/components/ui/ReflectiveCard';

const steps = [
  {
    number: '01',
    title: 'Discovery & Strategy',
    description: 'We analyze your current systems, identify pain points, and create a comprehensive digital transformation roadmap aligned with your business goals.',
  },
  {
    number: '02',
    title: 'Design & Development',
    description: 'Our team designs and develops custom solutions using cutting-edge technologies, ensuring scalability, security, and seamless integration.',
  },
  {
    number: '03',
    title: 'Implementation & Testing',
    description: 'Rigorous testing and phased deployment ensure stability. We provide training and documentation for smooth adoption.',
  },
  {
    number: '04',
    title: 'Support & Optimization',
    description: 'Continuous monitoring, maintenance, and optimization to keep your systems running at peak performance year after year.',
  },
];

export function HowWeWork() {
  return (
    <section className="relative bg-[#0a1628] py-20 sm:py-24 md:py-32 overflow-hidden">
      {/* DotGrid Background */}
      <DotGrid
        dotSize={3}
        gap={25}
        baseColor="#000000"
        activeColor="#93c5fd"
        proximity={200}
        shockRadius={200}
        shockStrength={3}
        resistance={750}
        returnDuration={1.2}
      />

      <div className="container-custom px-6 sm:px-8 relative z-10">
        {/* Header */}
        <div className="mb-12 lg:mb-16">
          <BlurFade>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 rounded-full bg-white" />
              <span className="text-xs sm:text-sm uppercase tracking-widest text-white/80 font-medium">
                How We Work?
              </span>
            </div>
          </BlurFade>
          <BlurFade delay={0.1}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white max-w-2xl leading-[1.15]">
              Strategic Deployment, Accelerated by AI
            </h2>
          </BlurFade>
        </div>

        {/* Horizontal line */}
        <div className="w-full h-px bg-white/20 mb-12 lg:mb-16" />

        {/* Steps Grid with Reflective Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          {steps.map((step, index) => (
            <BlurFade key={step.number} delay={0.15 + index * 0.08}>
              <ReflectiveCard
                metalness={0.8}
                roughness={0.3}
                overlayColor="rgba(10, 22, 40, 0.4)"
                className="min-h-[360px]"
              >
                {/* Number */}
                <span className="text-3xl sm:text-4xl font-bold text-cyan-400/80">
                  {step.number}.
                </span>
                
                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-white mt-4 mb-4">
                  {step.title}
                </h3>
                
                {/* Description */}
                <p className="text-sm text-white/70 leading-relaxed">
                  {step.description}
                </p>
              </ReflectiveCard>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
