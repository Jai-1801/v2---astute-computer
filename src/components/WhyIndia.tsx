import { Counter } from '@/components/ui/Counter';

const stats = [
  { 
    value: 50, 
    suffix: '+', 
    label: 'PROJECTS DELIVERED', 
    sublabel: 'ACROSS INDUSTRIES',
    gradient: 'from-cyan-400 to-blue-500'
  },
  { 
    value: 70, 
    suffix: '%', 
    label: 'EFFICIENCY GAINS', 
    sublabel: 'THROUGH AUTOMATION',
    gradient: 'from-blue-500 to-cyan-500'
  },
  { 
    value: 40, 
    suffix: '%', 
    label: 'COST SAVINGS', 
    sublabel: 'WITH AI SOLUTIONS',
    gradient: 'from-blue-600 to-blue-400'
  },
];

export function WhyIndia() {
  return (
    <section className="relative bg-[#f5f3ef] py-20 sm:py-28 lg:py-36">
      <div className="container-custom px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
          {/* Left Content - Left aligned */}
          <div className="lg:max-w-md xl:max-w-lg flex-shrink-0 text-left">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />
              <span className="text-xs uppercase tracking-[0.2em] text-blue-600 font-semibold">
                The Glorious Purpose
              </span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-5 leading-[1.15]">
              Why India?
            </h2>
            
            <p className="text-base sm:text-lg text-gray-600 mb-6">
              Right mix of people, infrastructure and support ecosystem
            </p>

            {/* Divider */}
            <div className="w-full h-px bg-gray-300 mb-6" />

            <p className="text-base sm:text-lg text-primary leading-relaxed">
              <span className="font-semibold">Astute Computer</span> partners with businesses across India to define, design, build and scale, innovative and value focused digital solutions & automation systems for your business.
            </p>
          </div>

          {/* Right Stats Cards */}
          <div className="flex-1 w-full">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 lg:gap-6">
              {/* First tall card */}
              <div className="relative bg-[#1a1f3c] rounded-2xl p-5 sm:p-6 md:p-7 min-h-[200px] sm:min-h-[240px] md:min-h-[280px] flex flex-col justify-center overflow-hidden group w-full sm:w-[180px] md:w-[200px] lg:w-[220px]">
                {/* Gradient accent on left */}
                <div className="absolute left-0 top-6 bottom-6 w-1 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full" />
                
                <div className="relative z-10 text-center sm:text-left">
                  <div className="flex items-baseline justify-center sm:justify-start gap-0.5 mb-3">
                    <Counter 
                      value={stats[0].value} 
                      className="text-3xl sm:text-4xl md:text-5xl font-bold text-white" 
                    />
                    <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">{stats[0].suffix}</span>
                  </div>
                  <p className="text-xs font-bold text-white uppercase tracking-wider mb-1">
                    {stats[0].label}
                  </p>
                  <p className="text-xs text-gray-400 uppercase tracking-wider">
                    {stats[0].sublabel}
                  </p>
                </div>
              </div>

              {/* Stacked cards column */}
              <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6 flex-1">
                <div className="relative bg-[#1a1f3c] rounded-2xl p-5 sm:p-6 md:p-7 min-h-[140px] sm:min-h-[160px] md:min-h-[180px] flex items-center overflow-hidden">
                  {/* Gradient accent on right */}
                  <div className="absolute right-0 top-5 bottom-5 w-1 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full" />
                  
                  <div className="relative z-10 text-center sm:text-left flex-shrink-0">
                    <div className="flex items-baseline justify-center sm:justify-start gap-0.5 mb-3">
                      <Counter 
                        value={stats[1].value} 
                        className="text-3xl sm:text-4xl md:text-5xl font-bold text-white" 
                      />
                      <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">{stats[1].suffix}</span>
                    </div>
                    <p className="text-xs font-bold text-white uppercase tracking-wider mb-1">
                      {stats[1].label}
                    </p>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">
                      {stats[1].sublabel}
                    </p>
                  </div>
                  
                  {/* Decorative illustration - desktop only */}
                  <div className="hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 items-center gap-2 opacity-40">
                    <svg width="80" height="60" viewBox="0 0 80 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="20" cy="30" r="8" stroke="#3b82f6" strokeWidth="2" fill="none" />
                      <circle cx="40" cy="20" r="6" stroke="#60a5fa" strokeWidth="2" fill="none" />
                      <circle cx="60" cy="35" r="10" stroke="#2563eb" strokeWidth="2" fill="none" />
                      <path d="M20 30 L40 20 L60 35" stroke="url(#grad1)" strokeWidth="2" strokeLinecap="round" />
                      <defs>
                        <linearGradient id="grad1" x1="20" y1="30" x2="60" y2="35">
                          <stop offset="0%" stopColor="#3b82f6" />
                          <stop offset="100%" stopColor="#60a5fa" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>

                <div className="relative bg-[#1a1f3c] rounded-2xl p-5 sm:p-6 md:p-7 min-h-[140px] sm:min-h-[160px] md:min-h-[180px] flex items-center overflow-hidden">
                  {/* Gradient accent on right */}
                  <div className="absolute right-0 top-5 bottom-5 w-1 bg-gradient-to-b from-blue-600 to-blue-400 rounded-full" />
                  
                  <div className="relative z-10 text-center sm:text-left flex-shrink-0">
                    <div className="flex items-baseline justify-center sm:justify-start gap-0.5 mb-3">
                      <Counter 
                        value={stats[2].value} 
                        className="text-3xl sm:text-4xl md:text-5xl font-bold text-white" 
                      />
                      <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">{stats[2].suffix}</span>
                    </div>
                    <p className="text-xs font-bold text-white uppercase tracking-wider mb-1">
                      {stats[2].label}
                    </p>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">
                      {stats[2].sublabel}
                    </p>
                  </div>
                  
                  {/* Decorative illustration - desktop only */}
                  <div className="hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 items-center gap-2 opacity-40">
                    <svg width="90" height="60" viewBox="0 0 90 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="10" y="25" width="20" height="25" rx="3" stroke="#3b82f6" strokeWidth="2" fill="none" />
                      <rect x="35" y="15" width="20" height="35" rx="3" stroke="#2563eb" strokeWidth="2" fill="none" />
                      <rect x="60" y="10" width="20" height="40" rx="3" stroke="#1d4ed8" strokeWidth="2" fill="none" />
                      <circle cx="20" cy="18" r="4" fill="#3b82f6" opacity="0.6" />
                      <circle cx="45" cy="8" r="3" fill="#2563eb" opacity="0.6" />
                      <circle cx="70" cy="5" r="3" fill="#1d4ed8" opacity="0.6" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
