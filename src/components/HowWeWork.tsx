import { BlurFade } from '@/components/ui/BlurFade';

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
    <section className="relative bg-primary py-20 sm:py-24 md:py-32 overflow-hidden">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }} />
      </div>

      <div className="container-custom px-6 sm:px-8 relative z-10">
        {/* Header */}
        <div className="mb-12 lg:mb-16">
          <BlurFade>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 rounded-full bg-primary-foreground" />
              <span className="text-xs sm:text-sm uppercase tracking-widest text-primary-foreground/80 font-medium">
                How We Work?
              </span>
            </div>
          </BlurFade>
          <BlurFade delay={0.1}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground max-w-2xl">
              Strategic Deployment, Accelerated by AI
            </h2>
          </BlurFade>
        </div>

        {/* Horizontal line */}
        <div className="w-full h-px bg-primary-foreground/20 mb-12 lg:mb-16" />

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <BlurFade key={step.number} delay={0.15 + index * 0.08}>
              <div className="h-full p-6 sm:p-8 rounded-2xl border border-dashed border-primary-foreground/30 bg-primary-foreground/5 backdrop-blur-sm hover:border-primary-foreground/50 hover:bg-primary-foreground/10 transition-all duration-150 group">
                {/* Number */}
                <span className="text-3xl sm:text-4xl font-bold text-primary-foreground/60 group-hover:text-primary-foreground transition-colors duration-150">
                  {step.number}.
                </span>
                
                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-primary-foreground mt-4 mb-6">
                  {step.title}
                </h3>
                
                {/* Description */}
                <p className="text-sm text-primary-foreground/70 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
