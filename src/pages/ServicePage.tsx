import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SEOHead } from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useServiceBySlug, useCaseStudiesByService } from '@/hooks/useServices';
import { ArrowLeft, ArrowRight, Check, Loader2, MapPin } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { siteConfig, generateBreadcrumbSchema } from '@/lib/seo';
import { Helmet } from 'react-helmet-async';

// Map of other services for internal linking
const OTHER_SERVICES = [
  { slug: 'document-digitization', title: 'Document Digitization' },
  { slug: 'ai-automation', title: 'AI Automation' },
  { slug: 'custom-software-development', title: 'Custom Software Development' },
  { slug: 'digital-transformation', title: 'Digital Transformation' },
];

export default function ServicePage() {
  const { slug } = useParams();
  const { data: service, isLoading, error } = useServiceBySlug(slug);
  const { data: relatedCaseStudies = [] } = useCaseStudiesByService(slug);

  // Get other services for internal linking (exclude current)
  const otherServices = OTHER_SERVICES.filter((s) => s.slug !== slug).slice(0, 2);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-6 py-24 sm:py-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-lg"
          >
            <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
              <LucideIcons.FileQuestion className="w-12 h-12 text-primary" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Service Not Found
            </h1>
            <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
              The service you're looking for doesn't exist or is not available. 
              Explore our other digital solutions below.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="gap-2 h-12 px-8">
                <Link to="/#services">
                  <ArrowLeft className="h-4 w-4" />
                  Browse Services
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="gap-2 h-12 px-8">
                <Link to="/contact">
                  Contact Us
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  // Dynamic icon from Lucide
  const IconComponent =
    service.icon && (LucideIcons as any)[service.icon]
      ? (LucideIcons as any)[service.icon]
      : LucideIcons.Layers;

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: siteConfig.url },
    { name: 'Services', url: `${siteConfig.url}/#services` },
    { name: service.title, url: `${siteConfig.url}/services/${service.slug}` },
  ]);

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.short_description,
    provider: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    serviceType: service.title,
    areaServed: [
      { '@type': 'City', name: 'Chennai' },
      { '@type': 'State', name: 'Tamil Nadu' },
    ],
  };

  return (
    <>
      <SEOHead
        title={service.meta_title || `${service.title} | Astute Computer`}
        description={service.meta_description || service.short_description}
        canonical={`https://astutecomputer.com/services/${service.slug}`}
        type="website"
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(serviceSchema)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />

        <main>
          {/* Hero Section */}
          <section className="pt-32 pb-16 border-b border-border/50">
            <div className="container-custom">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Link
                  to="/#services"
                  className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
                >
                  <ArrowLeft className="h-4 w-4" />
                  All Services
                </Link>

                <div className="flex items-start gap-6 mb-6">
                  <div className="p-4 rounded-xl bg-foreground/5 border border-foreground/10">
                    <IconComponent className="h-10 w-10 text-foreground" />
                  </div>
                  <div className="flex-1">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4">
                      {service.title}
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl">
                      {service.short_description}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 mt-8">
                  <Button asChild size="lg">
                    <Link to="/contact">Get Started</Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link to="/case-studies">View Case Studies</Link>
                  </Button>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Long Description */}
          {service.long_description && (
            <section className="py-16">
              <div className="container-custom">
                <div className="max-w-3xl">
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-lg text-foreground/80 leading-relaxed"
                  >
                    {service.long_description}
                  </motion.p>
                </div>
              </div>
            </section>
          )}

          {/* Features & Benefits */}
          <section className="py-16 bg-card/50">
            <div className="container-custom">
              <div className="grid md:grid-cols-2 gap-12">
                {/* Features */}
                {service.features && service.features.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <h2 className="text-2xl font-bold mb-6">What We Deliver</h2>
                    <ul className="space-y-4">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <Check className="h-5 w-5 text-foreground mt-0.5 flex-shrink-0" />
                          <span className="text-foreground/80">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}

                {/* Benefits */}
                {service.benefits && service.benefits.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <h2 className="text-2xl font-bold mb-6">Business Impact</h2>
                    <ul className="space-y-4">
                      {service.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <ArrowRight className="h-5 w-5 text-foreground mt-0.5 flex-shrink-0" />
                          <span className="text-foreground/80">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </div>
            </div>
          </section>

          {/* Chennai Availability Section */}
          <section className="py-16">
            <div className="container-custom">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="p-8 rounded-2xl border border-border/50 bg-card/50">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="p-3 rounded-xl bg-foreground/5 border border-foreground/10">
                      <MapPin className="h-6 w-6 text-foreground" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold mb-2">
                        Available in Chennai & Tamil Nadu
                      </h2>
                      <p className="text-muted-foreground max-w-2xl">
                        Our {service.title.toLowerCase()} services are available across Chennai and Tamil Nadu.
                        Visit our Padi office for in-person consultations or connect with us remotely.
                      </p>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4 mb-6">
                    <div className="p-4 rounded-lg bg-background border border-border/30">
                      <p className="text-sm text-muted-foreground">On-Site Available</p>
                      <p className="font-semibold text-foreground">Yes, across Chennai</p>
                    </div>
                    <div className="p-4 rounded-lg bg-background border border-border/30">
                      <p className="text-sm text-muted-foreground">Response Time</p>
                      <p className="font-semibold text-foreground">Same day for Chennai</p>
                    </div>
                    <div className="p-4 rounded-lg bg-background border border-border/30">
                      <p className="text-sm text-muted-foreground">Industries Served</p>
                      <p className="font-semibold text-foreground">Healthcare, Legal, Manufacturing</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Link
                      to="/chennai"
                      className="px-4 py-2 rounded-lg border border-foreground/20 hover:bg-foreground/5 transition-colors text-sm flex items-center gap-2"
                    >
                      Chennai Hub
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      to="/chennai/anna-nagar"
                      className="px-4 py-2 rounded-lg border border-border/50 hover:border-foreground/20 transition-colors text-sm"
                    >
                      Anna Nagar
                    </Link>
                    <Link
                      to="/chennai/ambattur"
                      className="px-4 py-2 rounded-lg border border-border/50 hover:border-foreground/20 transition-colors text-sm"
                    >
                      Ambattur
                    </Link>
                    <Link
                      to="/chennai/velachery"
                      className="px-4 py-2 rounded-lg border border-border/50 hover:border-foreground/20 transition-colors text-sm"
                    >
                      Velachery
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Related Case Studies */}
          {relatedCaseStudies.length > 0 && (
            <section className="py-16">
              <div className="container-custom">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold">Related Case Studies</h2>
                    <Link
                      to="/case-studies"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                    >
                      View all
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    {relatedCaseStudies.map((study: any) => (
                      <Link
                        key={study.id}
                        to={`/case-studies/${study.slug}`}
                        className="group block"
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
                        </div>
                        <h3 className="font-semibold text-foreground group-hover:text-foreground/80 transition-colors">
                          {study.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                          {study.short_description}
                        </p>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              </div>
            </section>
          )}

          {/* Related Services (Internal Linking) */}
          <section className="py-16 border-t border-border/50">
            <div className="container-custom">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-bold mb-6">Explore Other Services</h2>
                <div className="flex flex-wrap gap-4">
                  {otherServices.map((s) => (
                    <Link key={s.slug} to={`/services/${s.slug}`}>
                      <Badge
                        variant="outline"
                        className="text-base py-2 px-4 hover:bg-foreground/5 transition-colors"
                      >
                        {s.title}
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Badge>
                    </Link>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-card/50">
            <div className="container-custom text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                  Ready to Transform Your Business?
                </h2>
                <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                  Let's discuss how {service.title.toLowerCase()} can help you achieve
                  your goals.
                </p>
                <Button asChild size="lg">
                  <Link to="/contact">Get in Touch</Link>
                </Button>
              </motion.div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
