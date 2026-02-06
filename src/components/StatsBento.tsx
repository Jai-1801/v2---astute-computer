import { Counter } from '@/components/ui/Counter';
import skyscrapersImg from '@/assets/sections/skyscrapers.jpg';
import aiPurpleImg from '@/assets/sections/ai-purple-abstract.jpg';
import indiaGateImg from '@/assets/sections/india-gate.jpg';

const stats = [
  { value: 20, suffix: '+', label: 'SATISFIED CLIENTS', sublabel: 'Trust Our Solutions' },
  { value: 70, suffix: '%', label: 'TECH-DRIVEN RESULTS', sublabel: 'Powering Growth' },
  { value: 40, suffix: '%', label: 'COST SAVINGS', sublabel: 'Through AI Automation' },
];

export function StatsBento() {
  return (
    <section className="relative bg-secondary/30 py-24 sm:py-32 lg:py-40">
      <div className="container-custom px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 mb-16 lg:mb-20">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2.5 h-2.5 rounded-full bg-primary" />
              <span className="text-xs uppercase tracking-[0.2em] text-foreground font-medium">
                The Glorious Purpose
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
              Why Chennai?
            </h2>
            <p className="text-muted-foreground mt-4 text-base sm:text-lg lg:text-xl">
              Right mix of talent, infrastructure, and innovation ecosystem
            </p>
          </div>

          <p className="text-base sm:text-lg lg:text-xl text-primary leading-relaxed lg:mt-12">
            Astute Computer partners with businesses across India to define, design, build, and scale innovative digital solutions that drive growth and efficiency.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {/* Time Reduction Card - Show first on mobile */}
          <div className="bg-card border border-border/50 rounded-2xl p-6 sm:p-8 sm:col-span-2 lg:col-span-1 order-1">
            <div className="flex items-baseline gap-1 mb-4">
              <Counter 
                value={40} 
                className="text-5xl sm:text-6xl font-bold text-foreground" 
              />
              <span className="text-5xl sm:text-6xl font-bold text-foreground">%</span>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-foreground mb-4">
              time reduction in Digital Setup
            </p>
            <p className="text-sm text-muted-foreground">
              AI-accelerated capabilities for setup and world-class automation solutions
            </p>
          </div>

          {/* Stats Cards - Important stats visible on mobile */}
          {stats.slice(0, 2).map((stat, index) => (
            <div key={stat.label} className={`bg-primary rounded-2xl p-6 sm:p-8 text-primary-foreground relative overflow-hidden order-${index + 2}`}>
              <div className="absolute right-0 top-0 w-2 h-full bg-gradient-to-b from-primary-foreground/20 to-transparent" />
              <div className="flex items-baseline gap-1 mb-2">
                <Counter 
                  value={stat.value} 
                  className="text-5xl sm:text-6xl font-bold" 
                />
                <span className="text-5xl sm:text-6xl font-bold">{stat.suffix}</span>
              </div>
              <p className="text-xs uppercase tracking-wider font-medium opacity-90">
                {stat.label}
              </p>
              <p className="text-xs uppercase tracking-wider opacity-70">
                {stat.sublabel}
              </p>
            </div>
          ))}

          {/* Skyscrapers Image */}
          <div className="aspect-[4/3] sm:aspect-square md:aspect-[4/5] rounded-2xl overflow-hidden order-4">
            <img
              src={skyscrapersImg}
              alt="Modern business district"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          {/* AI Card - Fixed color styling */}
          <div className="aspect-[4/3] sm:aspect-square md:aspect-[4/5] rounded-2xl overflow-hidden relative group bg-card order-5">
            <img
              src={aiPurpleImg}
              alt="AI Technology"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <div className="inline-flex items-center gap-2 mb-2 flex-wrap">
                <span className="px-2 py-0.5 text-[10px] uppercase tracking-wider font-bold bg-primary/20 text-primary rounded">New</span>
                <span className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Dewdrop AI is your AI Consultant</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-bold text-foreground">AI</h3>
              <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
                With AI-powered automation, operational friction reduces significantly, costs drop by nearly 40%, and time-to-market accelerates dramatically.
              </p>
            </div>
          </div>

          {/* Stats Column */}
          <div className="space-y-4 sm:space-y-5 lg:space-y-6 order-6">
            {/* Stat Card 1 */}
            <div className="bg-card border border-border/50 rounded-2xl p-6 sm:p-8">
              <p className="text-sm text-muted-foreground mb-3">
                Balanced scorecard approach to track and achieve critical OKRs and KPIs
              </p>
              <div className="flex items-baseline gap-1">
                <Counter 
                  value={100} 
                  className="text-4xl sm:text-5xl font-bold text-foreground" 
                />
                <span className="text-4xl sm:text-5xl font-bold text-foreground">%</span>
              </div>
              <p className="text-lg sm:text-xl font-bold text-foreground mt-2">
                Alignment to Compliance
              </p>
            </div>

            {/* India Gate Image */}
            <div className="aspect-[4/3] rounded-2xl overflow-hidden">
              <img
                src={indiaGateImg}
                alt="India Gate"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
