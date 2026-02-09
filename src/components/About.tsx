import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { Target, Lightbulb, Users, Zap, Shield, Clock } from 'lucide-react';
import { BlurFade } from '@/components/ui/BlurFade';
import { Counter } from '@/components/ui/Counter';

const features = [
  {
    icon: Target,
    title: 'Precision',
    description: 'Every line of code, every pixel, every decision is made with purpose and accuracy.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'We push boundaries and embrace cutting-edge technologies to deliver modern solutions.',
  },
  {
    icon: Users,
    title: 'Partnership',
    description: 'Your success is our success. We grow together as true partners in your journey.',
  },
  {
    icon: Zap,
    title: 'Impact',
    description: 'We deliver solutions that make a measurable difference to your bottom line.',
  },
  {
    icon: Shield,
    title: 'Security',
    description: 'Enterprise-grade security measures to protect your data and operations.',
  },
  {
    icon: Clock,
    title: 'Reliability',
    description: '99.9% uptime guarantee with 24/7 monitoring and rapid response times.',
  },
];

const stats = [
  { value: 30, suffix: '+', label: 'Projects Delivered' },
  { value: 3, suffix: '+', label: 'Years Experience' },
  { value: 100, suffix: '%', label: 'Client Satisfaction' },
  { value: 24, suffix: '/7', label: 'Support Available' },
];

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="relative overflow-hidden py-20 sm:py-24 md:py-32">
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px]" />

      <div ref={ref} className="container-custom relative z-10 px-6 sm:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <BlurFade>
            <span className="inline-block text-xs sm:text-sm uppercase tracking-widest text-primary mb-3 sm:mb-4">
              Why Partner With Us
            </span>
          </BlurFade>
          <BlurFade delay={0.1}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-5 sm:mb-6 leading-[1.15]">
              We Build Digital
              <br />
              <span className="text-gradient-purple">Excellence</span>
            </h2>
          </BlurFade>
          <BlurFade delay={0.2}>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Astute Computer is a software consultancy dedicated to helping businesses modernize their operations through innovative digital solutions.
            </p>
          </BlurFade>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-16 sm:mb-20">
          {features.map((feature, index) => (
            <BlurFade key={feature.title} delay={0.1 * index}>
              <div className="group p-5 sm:p-6 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/30 hover:bg-card transition-all duration-300">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </BlurFade>
          ))}
        </div>

        {/* Stats Section */}
        <BlurFade delay={0.4}>
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent border border-primary/20 p-6 sm:p-8 md:p-12">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[150px] bg-primary/20 rounded-full blur-[80px]" />
            
            <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
              {stats.map((stat, index) => (
                <div key={stat.label}>
                  <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-2">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
