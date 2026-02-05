import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SEOHead } from '@/components/SEOHead';
import { usePublishedCaseStudies } from '@/hooks/useCaseStudies';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowRight, Loader2, Filter, X, Sparkles } from 'lucide-react';
import { siteConfig, generateBreadcrumbSchema } from '@/lib/seo';
import { Helmet } from 'react-helmet-async';

const INDUSTRIES = [
  'Audit',
  'Retail',
  'Manufacturing',
  'Healthcare',
  'Fintech',
  'Legal',
  'Education',
];

const SERVICES = [
  'Document Digitization',
  'AI Automation',
  'Custom Software',
  'Digital Transformation',
];

export default function CaseStudiesHub() {
  const { data: caseStudies = [], isLoading } = usePublishedCaseStudies();
  const [industryFilter, setIndustryFilter] = useState<string>('all');
  const [serviceFilter, setServiceFilter] = useState<string>('all');

  const filteredCaseStudies = useMemo(() => {
    return caseStudies.filter((study) => {
      const matchesIndustry =
        industryFilter === 'all' || (study as any).industry === industryFilter;
      const matchesService =
        serviceFilter === 'all' ||
        ((study as any).services || []).includes(serviceFilter);
      return matchesIndustry && matchesService;
    });
  }, [caseStudies, industryFilter, serviceFilter]);

  const hasActiveFilters = industryFilter !== 'all' || serviceFilter !== 'all';

  const clearFilters = () => {
    setIndustryFilter('all');
    setServiceFilter('all');
  };

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: siteConfig.url },
    { name: 'Case Studies', url: `${siteConfig.url}/case-studies` },
  ]);

  return (
    <>
      <SEOHead
        title="Case Studies | Astute Computer"
        description="Explore our portfolio of successful digital transformation projects. See how we've helped businesses across industries achieve measurable results with AI, automation, and custom software."
        canonical="https://astutecomputer.com/case-studies"
        type="website"
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-[#f5f3ef]">
        <Navbar />

        <main>
          {/* Hero Section - Dark gradient header */}
          <section className="relative pt-24 pb-20 sm:pt-32 sm:pb-28 bg-gradient-to-br from-[#1a1f3c] via-[#252a4a] to-[#1a1f3c] overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-20 right-[10%] w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
              <div className="absolute bottom-10 left-[5%] w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
            </div>
            
            <div className="container-custom px-6 sm:px-8 relative z-10">
              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 lg:gap-16">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="max-w-2xl"
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-2 h-2 rounded-full bg-blue-400" />
                    <span className="text-xs uppercase tracking-[0.2em] text-blue-400 font-semibold">
                      Our Work
                    </span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5">
                    Case Studies
                  </h1>
                  <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                    Real results from real projects. Explore how we've helped businesses
                    transform their operations, digitize their workflows, and achieve
                    measurable growth.
                  </p>
                </motion.div>
                
                {/* Stats summary */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex gap-8 sm:gap-12"
                >
                  <div className="text-center">
                    <div className="text-3xl sm:text-4xl font-bold text-white mb-1">50+</div>
                    <div className="text-xs sm:text-sm text-gray-400 uppercase tracking-wider">Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl sm:text-4xl font-bold text-white mb-1">15+</div>
                    <div className="text-xs sm:text-sm text-gray-400 uppercase tracking-wider">Industries</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl sm:text-4xl font-bold text-white mb-1">95%</div>
                    <div className="text-xs sm:text-sm text-gray-400 uppercase tracking-wider">Success Rate</div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Filters - Floating card style */}
          <section className="relative -mt-8 pb-8 sm:pb-12">
            <div className="container-custom px-6 sm:px-8">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6"
              >
                <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Filter className="h-4 w-4" />
                    <span className="text-sm font-medium">Filter by:</span>
                  </div>

                  <Select value={industryFilter} onValueChange={setIndustryFilter}>
                    <SelectTrigger className="w-full sm:w-[180px] bg-gray-50 border-gray-200">
                      <SelectValue placeholder="Industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Industries</SelectItem>
                      {INDUSTRIES.map((industry) => (
                        <SelectItem key={industry} value={industry}>
                          {industry}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={serviceFilter} onValueChange={setServiceFilter}>
                    <SelectTrigger className="w-full sm:w-[200px] bg-gray-50 border-gray-200">
                      <SelectValue placeholder="Service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Services</SelectItem>
                      {SERVICES.map((service) => (
                        <SelectItem key={service} value={service}>
                          {service}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {hasActiveFilters && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearFilters}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X className="h-4 w-4 mr-1" />
                      Clear filters
                    </Button>
                  )}
                  
                  <div className="ml-auto hidden sm:flex items-center gap-2 text-sm text-gray-500">
                    <Sparkles className="h-4 w-4 text-blue-500" />
                    <span>{filteredCaseStudies.length} case studies</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Case Studies Grid - Bento Layout */}
          <section className="pb-20 sm:pb-28">
            <div className="container-custom px-6 sm:px-8">
              {isLoading ? (
                <div className="flex justify-center py-20">
                  <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                </div>
              ) : filteredCaseStudies.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                    <Filter className="h-6 w-6 text-gray-400" />
                  </div>
                  <p className="text-gray-600 mb-4">
                    No case studies match your filters.
                  </p>
                  <Button variant="outline" onClick={clearFilters} className="border-gray-300">
                    Clear filters
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-5">
                  {filteredCaseStudies.map((study, index) => {
                    // Define bento grid patterns for variety
                    const patterns = [
                      { colSpan: 'md:col-span-3 lg:col-span-4', rowSpan: 'row-span-2', type: 'tall-gradient' },
                      { colSpan: 'md:col-span-3 lg:col-span-4', rowSpan: 'row-span-1', type: 'image-standard' },
                      { colSpan: 'md:col-span-3 lg:col-span-4', rowSpan: 'row-span-1', type: 'text-only' },
                      { colSpan: 'md:col-span-3 lg:col-span-4', rowSpan: 'row-span-1', type: 'image-standard' },
                      { colSpan: 'md:col-span-6 lg:col-span-4', rowSpan: 'row-span-1', type: 'image-overlay' },
                      { colSpan: 'md:col-span-3 lg:col-span-4', rowSpan: 'row-span-2', type: 'tall-image' },
                    ];
                    
                    const pattern = patterns[index % patterns.length];
                    
                    return (
                      <motion.article
                        key={study.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: Math.min(index * 0.08, 0.5) }}
                        className={`${pattern.colSpan} ${pattern.rowSpan}`}
                      >
                        {pattern.type === 'tall-gradient' && (
                          <Link
                            to={`/case-studies/${study.slug}`}
                            className="group block h-full rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 relative min-h-[500px]"
                          >
                            {/* Background Image with Blue Gradient Overlay */}
                            <div className="absolute inset-0">
                              {study.thumbnail_url ? (
                                <img
                                  src={study.thumbnail_url}
                                  alt={study.thumbnail_alt || study.title}
                                  className="w-full h-full object-cover"
                                  loading="lazy"
                                />
                              ) : (
                                <div className="w-full h-full bg-[#1a1f3c]" />
                              )}
                              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1f3c] via-[#1a1f3c]/80 to-[#1a1f3c]/40" />
                            </div>
                            {/* Content */}
                            <div className="relative z-10 h-full flex flex-col justify-between p-6 sm:p-8">
                              <div>
                                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                                  {study.title}
                                </h2>
                                <p className="text-gray-300 text-sm leading-relaxed line-clamp-4">
                                  {study.short_description}
                                </p>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-blue-400 font-medium mt-4">
                                Read more
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                              </div>
                            </div>
                          </Link>
                        )}

                        {pattern.type === 'text-only' && (
                          <Link
                            to={`/case-studies/${study.slug}`}
                            className="group block h-full rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 bg-[#1a1f3c] p-6 sm:p-8 flex flex-col justify-between min-h-[240px]"
                          >
                            <div>
                              <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                                {study.title}
                              </h2>
                              <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
                                {study.short_description}
                              </p>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-blue-400 font-medium mt-4">
                              Read more
                              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </div>
                          </Link>
                        )}

                        {pattern.type === 'image-standard' && (
                          <Link
                            to={`/case-studies/${study.slug}`}
                            className="group block h-full rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 bg-white min-h-[240px]"
                          >
                            <div className="relative h-full overflow-hidden">
                              {study.thumbnail_url ? (
                                <img
                                  src={study.thumbnail_url}
                                  alt={study.thumbnail_alt || study.title}
                                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                  loading="lazy"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1a1f3c] to-[#252a4a]">
                                  <Sparkles className="h-8 w-8 text-blue-400/50" />
                                </div>
                              )}
                              {(study as any).industry && (
                                <div className="absolute top-4 left-4">
                                  <Badge className="bg-white/90 text-gray-800 text-xs font-medium backdrop-blur-sm">
                                    {(study as any).industry}
                                  </Badge>
                                </div>
                              )}
                            </div>
                          </Link>
                        )}

                        {pattern.type === 'image-overlay' && (
                          <Link
                            to={`/case-studies/${study.slug}`}
                            className="group block h-full rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 relative min-h-[280px]"
                          >
                            <div className="absolute inset-0">
                              {study.thumbnail_url ? (
                                <img
                                  src={study.thumbnail_url}
                                  alt={study.thumbnail_alt || study.title}
                                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                  loading="lazy"
                                />
                              ) : (
                                <div className="w-full h-full bg-gradient-to-br from-[#1a1f3c] to-[#252a4a]" />
                              )}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                            </div>
                            <div className="relative z-10 h-full flex flex-col justify-end p-6 sm:p-8">
                              <h2 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                                {study.title}
                              </h2>
                              <p className="text-gray-200 text-sm leading-relaxed line-clamp-2">
                                {study.short_description}
                              </p>
                            </div>
                          </Link>
                        )}

                        {pattern.type === 'tall-image' && (
                          <Link
                            to={`/case-studies/${study.slug}`}
                            className="group block h-full rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 relative min-h-[500px]"
                          >
                            <div className="absolute inset-0">
                              {study.thumbnail_url ? (
                                <img
                                  src={study.thumbnail_url}
                                  alt={study.thumbnail_alt || study.title}
                                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                  loading="lazy"
                                />
                              ) : (
                                <div className="w-full h-full bg-gradient-to-br from-[#1a1f3c] to-[#252a4a]" />
                              )}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                            </div>
                            <div className="relative z-10 h-full flex flex-col justify-end p-6 sm:p-8">
                              {(study as any).industry && (
                                <Badge className="bg-white/20 text-white text-xs font-medium backdrop-blur-sm w-fit mb-3">
                                  {(study as any).industry}
                                </Badge>
                              )}
                              <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                                {study.title}
                              </h2>
                              <p className="text-gray-200 text-sm leading-relaxed line-clamp-3">
                                {study.short_description}
                              </p>
                              {study.stat_value && study.stat_metric && (
                                <div className="flex items-baseline gap-2 mt-4 pt-4 border-t border-white/20">
                                  <span className="text-2xl font-bold text-white">
                                    {study.stat_value}
                                  </span>
                                  <span className="text-sm text-gray-300">
                                    {study.stat_metric}
                                  </span>
                                </div>
                              )}
                            </div>
                          </Link>
                        )}
                      </motion.article>
                    );
                  })}
                </div>
              )}
            </div>
          </section>
          {/* CTA Section */}
          <section className="pb-20 sm:pb-28">
            <div className="container-custom px-6 sm:px-8">
              <div className="relative bg-gradient-to-br from-[#1a1f3c] via-[#252a4a] to-[#1a1f3c] rounded-3xl p-8 sm:p-12 lg:p-16 overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl" />
                
                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                  <div className="max-w-xl">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                      Ready to transform your business?
                    </h2>
                    <p className="text-gray-300 leading-relaxed">
                      Let's discuss how we can help you achieve similar results. Our team is ready to understand your challenges and design solutions that deliver measurable impact.
                    </p>
                  </div>
                  
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#1a1f3c] font-medium rounded-full hover:bg-gray-100 transition-colors shrink-0"
                  >
                    <span>Start a conversation</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
