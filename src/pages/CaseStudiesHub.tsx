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
import { ArrowRight, Loader2, Filter, X } from 'lucide-react';
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

      <div className="min-h-screen bg-background">
        <Navbar />

        <main>
          {/* Hero Section */}
          <section className="pt-32 pb-16">
            <div className="container-custom">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-3xl"
              >
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                  Case Studies
                </h1>
                <p className="text-xl text-muted-foreground">
                  Real results from real projects. Explore how we've helped businesses
                  transform their operations, digitize their workflows, and achieve
                  measurable growth.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Filters */}
          <section className="pb-8">
            <div className="container-custom">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Filter className="h-4 w-4" />
                  <span className="text-sm font-medium">Filter by:</span>
                </div>

                <Select value={industryFilter} onValueChange={setIndustryFilter}>
                  <SelectTrigger className="w-[180px]">
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
                  <SelectTrigger className="w-[200px]">
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
                    className="text-muted-foreground"
                  >
                    <X className="h-4 w-4 mr-1" />
                    Clear filters
                  </Button>
                )}
              </div>
            </div>
          </section>

          {/* Case Studies Grid */}
          <section className="pb-20">
            <div className="container-custom">
              {isLoading ? (
                <div className="flex justify-center py-20">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : filteredCaseStudies.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-muted-foreground mb-4">
                    No case studies match your filters.
                  </p>
                  <Button variant="outline" onClick={clearFilters}>
                    Clear filters
                  </Button>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredCaseStudies.map((study, index) => (
                    <motion.article
                      key={study.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <Link
                        to={`/case-studies/${study.slug}`}
                        className="group block h-full"
                      >
                        <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4 bg-muted">
                          {study.thumbnail_url ? (
                            <img
                              src={study.thumbnail_url}
                              alt={study.thumbnail_alt || study.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              loading="lazy"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                              No image
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>

                        <div className="space-y-3">
                          <div className="flex flex-wrap gap-2">
                            {(study as any).industry && (
                              <Badge variant="secondary" className="text-xs">
                                {(study as any).industry}
                              </Badge>
                            )}
                            {((study as any).services || [])
                              .slice(0, 2)
                              .map((service: string) => (
                                <Badge
                                  key={service}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  {service}
                                </Badge>
                              ))}
                          </div>

                          <h2 className="text-xl font-semibold text-foreground group-hover:text-foreground/80 transition-colors">
                            {study.title}
                          </h2>

                          <p className="text-muted-foreground text-sm line-clamp-2">
                            {study.short_description}
                          </p>

                          {study.stat_value && study.stat_metric && (
                            <div className="flex items-baseline gap-2 pt-2">
                              <span className="text-2xl font-bold text-foreground">
                                {study.stat_value}
                              </span>
                              <span className="text-sm text-muted-foreground">
                                {study.stat_metric}
                              </span>
                            </div>
                          )}

                          <div className="flex items-center gap-2 text-sm text-foreground font-medium pt-2">
                            Read case study
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </div>
                        </div>
                      </Link>
                    </motion.article>
                  ))}
                </div>
              )}
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
