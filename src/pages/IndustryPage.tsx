import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SEOHead } from '@/components/SEOHead';
import { MagneticButton } from '@/components/MagneticButton';
import { Button } from '@/components/ui/button';
import { getIndustryBySlug } from '@/lib/industries';
import { useCaseStudiesByIndustry } from '@/hooks/useCaseStudiesByIndustry';
import { siteConfig } from '@/lib/seo';

// Animated counter component
function AnimatedCounter({ value, suffix = '' }: { value: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''));
  const hasX = value.includes('x');
  const prefix = value.match(/^[^0-9]*/)?.[0] || '';

  return (
    <span ref={ref} className="tabular-nums">
      {isInView ? (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {hasX ? value : `${prefix}${numericValue}${suffix}`}
        </motion.span>
      ) : '0'}
    </span>
  );
}

// Word-by-word reveal component
function WordReveal({ text, className = '' }: { text: string; className?: string }) {
  const words = text.split(' ');

  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: i * 0.08,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

// 3D tilt card component
function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    ref.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
  };

  return (
    <div
      ref={ref}
      className={`transition-transform duration-300 ease-out ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}

export default function IndustryPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const industry = getIndustryBySlug(slug || '');
  const { data: caseStudies = [] } = useCaseStudiesByIndustry(slug);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  // Removed blur filter - causes jank on every scroll tick

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!industry) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Industry Not Found</h1>
          <Button onClick={() => navigate('/')} variant="outline">
            Return Home
          </Button>
        </div>
      </div>
    );
  }

  const Icon = industry.icon;

  return (
    <>
      <SEOHead
        title={industry.metaTitle}
        description={industry.metaDescription}
        canonical={`${siteConfig.url}/industries/${industry.slug}`}
      />

      <div className="min-h-screen bg-background">
        <Navbar />

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="fixed top-24 left-4 sm:left-8 z-40"
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/#sectors')}
            className="gap-2 glass hover:bg-foreground/5"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back</span>
          </Button>
        </motion.div>

        {/* Hero Section */}
        <motion.section
          ref={heroRef}
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
          {/* Animated background orbs */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{
                x: [0, 30, 0],
                y: [0, -20, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-foreground/5 rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                x: [0, -20, 0],
                y: [0, 30, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
              className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-foreground/3 rounded-full blur-3xl"
            />
          </div>

          {/* Grid pattern */}
          <div className="absolute inset-0 grid-pattern opacity-10" />

          <div className="container-custom relative z-10 text-center">
            {/* Floating icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="mb-8"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-foreground/5 border border-foreground/10"
              >
                <Icon className="w-12 h-12 text-foreground" />
              </motion.div>
            </motion.div>

            {/* Tagline */}
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="inline-block text-sm uppercase tracking-widest text-muted-foreground mb-6"
            >
              {industry.tagline}
            </motion.span>

            {/* Title with word reveal */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6">
              <WordReveal text={`${industry.title} Solutions`} />
            </h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-10"
            >
              {industry.heroDescription}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <MagneticButton
                variant="primary"
                onClick={() => navigate('/contact')}
              >
                Start Your Project
                <ArrowRight className="w-4 h-4 ml-2" />
              </MagneticButton>
              <MagneticButton
                variant="secondary"
                onClick={() => document.getElementById('problems')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Explore Solutions
              </MagneticButton>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-6 h-10 rounded-full border-2 border-foreground/30 flex items-start justify-center p-2"
            >
              <motion.div
                animate={{ opacity: [1, 0, 1], y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1 h-2 rounded-full bg-foreground/50"
              />
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Problems Section */}
        <section id="problems" className="section-padding relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />

          <div className="container-custom relative z-10">
            <SectionHeader
              label="The Challenge"
              title="Industry Pain Points"
              description="Common obstacles that prevent organizations from reaching their full potential."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
              {industry.problems.map((problem, index) => (
                <motion.div
                  key={problem.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                  className="group relative p-6 sm:p-8 rounded-2xl bg-card/50 border border-border/50 hover:border-foreground/20 transition-all duration-300"
                >
                  <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-foreground/90">
                    {problem.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {problem.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-foreground/70">
                    <span className="w-2 h-2 rounded-full bg-foreground/50" />
                    {problem.impact}
                  </div>

                  {/* Corner accent */}
                  <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute top-0 right-0 w-px h-12 bg-gradient-to-b from-foreground/30 to-transparent" />
                    <div className="absolute top-0 right-0 h-px w-12 bg-gradient-to-l from-foreground/30 to-transparent" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Solutions Section */}
        <section className="section-padding relative overflow-hidden">
          <div className="container-custom relative z-10">
            <SectionHeader
              label="Our Approach"
              title="Tailored Solutions"
              description="Proven methodologies designed specifically for your industry's unique requirements."
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-16">
              {industry.solutions.map((solution, index) => (
                <TiltCard key={solution.title}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.15 }}
                    viewport={{ once: true }}
                    className="h-full p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-card to-card/50 border border-border/50 hover:border-foreground/20 transition-colors duration-300"
                  >
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {solution.title}
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      {solution.description}
                    </p>
                    <ul className="space-y-3">
                      {solution.features.map((feature, i) => (
                        <motion.li
                          key={feature}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + i * 0.1 }}
                          viewport={{ once: true }}
                          className="flex items-center gap-3 text-sm text-foreground/80"
                        >
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-foreground/10 flex items-center justify-center">
                            <Check className="w-3 h-3 text-foreground" />
                          </span>
                          {feature}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </TiltCard>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="section-padding relative overflow-hidden bg-card/30">
          <div className="absolute inset-0 grid-pattern opacity-5" />

          <div className="container-custom relative z-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {industry.stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center p-6 sm:p-8 rounded-2xl bg-card/50 border border-border/30"
                >
                  <div className="text-4xl sm:text-5xl font-bold text-foreground mb-2">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Case Studies Section */}
        {caseStudies.length > 0 && (
          <section className="section-padding relative overflow-hidden">
            <div className="container-custom relative z-10">
              <SectionHeader
                label="Success Stories"
                title="Related Case Studies"
                description={`See how we've helped ${industry.title.toLowerCase()} organizations transform.`}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
                {caseStudies.slice(0, 6).map((study, index) => (
                  <motion.div
                    key={study.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Link
                      to={`/case-studies/${study.slug}`}
                      className="group block h-full"
                    >
                      <div className="h-full rounded-2xl overflow-hidden bg-card border border-border/50 hover:border-foreground/20 transition-all duration-300">
                        {study.thumbnail_url && (
                          <div className="aspect-video overflow-hidden">
                            <img
                              src={study.thumbnail_url}
                              alt={study.thumbnail_alt || study.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                        )}
                        <div className="p-6">
                          <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-foreground/80 transition-colors">
                            {study.title}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {study.short_description}
                          </p>
                          {study.stat_value && (
                            <div className="mt-4 pt-4 border-t border-border/30">
                              <span className="text-2xl font-bold text-foreground">
                                {study.stat_value}
                              </span>
                              <span className="text-sm text-muted-foreground ml-2">
                                {study.stat_metric}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {caseStudies.length > 6 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="text-center mt-12"
                >
                  <Button
                    variant="outline"
                    onClick={() => navigate('/case-studies')}
                  >
                    View All Case Studies
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </motion.div>
              )}
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="section-padding relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-card/50 to-transparent" />

          {/* Animated particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-foreground/20 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          <div className="container-custom relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="inline-block text-sm uppercase tracking-widest text-muted-foreground mb-6">
                Ready to Transform?
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Let's Build Your
                <br />
                <span className="text-muted-foreground">{industry.title} Solution</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
                Every successful transformation starts with a conversation.
                Tell us about your challenges and goals.
              </p>

              <MagneticButton
                variant="primary"
                onClick={() => navigate('/contact')}
              >
                Schedule a Consultation
                <ArrowRight className="w-4 h-4 ml-2" />
              </MagneticButton>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}

// Section header component
function SectionHeader({
  label,
  title,
  description
}: {
  label: string;
  title: string;
  description: string;
}) {
  return (
    <div className="text-center">
      <motion.span
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="inline-block text-sm uppercase tracking-widest text-muted-foreground mb-4"
      >
        {label}
      </motion.span>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true }}
        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6"
      >
        {title}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="text-muted-foreground max-w-2xl mx-auto"
      >
        {description}
      </motion.p>
    </div>
  );
}
