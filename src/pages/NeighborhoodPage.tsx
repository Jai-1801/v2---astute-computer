import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SEOHead } from '@/components/SEOHead';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Code,
  Bot,
  FileText,
  Layers,
} from 'lucide-react';
import {
  businessInfo,
  localServices,
  getNeighborhoodBySlug,
  neighborhoods,
  getFormattedAddress,
  generateLocalBusinessSchema,
  generateFAQSchema,
} from '@/lib/locations';
import { generateBreadcrumbSchema, siteConfig } from '@/lib/seo';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Code,
  Bot,
  FileText,
  Layers,
};

export default function NeighborhoodPage() {
  const { neighborhood: slug } = useParams();
  const area = slug ? getNeighborhoodBySlug(slug) : undefined;

  if (!area) {
    return <Navigate to="/chennai" replace />;
  }

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: siteConfig.url },
    { name: 'Chennai', url: `${siteConfig.url}/chennai` },
    { name: area.name, url: `${siteConfig.url}/chennai/${area.slug}` },
  ]);

  const localBusinessSchema = generateLocalBusinessSchema();
  const faqSchema = generateFAQSchema(area.faqs);

  // Service schema with area served
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Digital Transformation Services',
    provider: { '@id': 'https://astutecomputer.com/#business' },
    areaServed: {
      '@type': 'Place',
      name: `${area.name}, Chennai`,
    },
  };

  // Get related neighborhoods
  const relatedNeighborhoods = neighborhoods.filter((n) =>
    area.relatedAreas.includes(n.slug)
  );

  return (
    <>
      <SEOHead
        title={area.metaTitle}
        description={area.metaDescription}
        canonical={`https://astutecomputer.com/chennai/${area.slug}`}
        type="website"
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
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
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
                  <Link to="/" className="hover:text-foreground transition-colors">
                    Home
                  </Link>
                  <span>/</span>
                  <Link to="/chennai" className="hover:text-foreground transition-colors">
                    Chennai
                  </Link>
                  <span>/</span>
                  <span className="text-foreground">{area.name}</span>
                </nav>

                <Link
                  to="/chennai"
                  className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
                >
                  <ArrowLeft className="h-4 w-4" />
                  All Chennai Areas
                </Link>

                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-foreground/5 border border-foreground/10">
                    <MapPin className="h-8 w-8 text-foreground" />
                  </div>
                  <div>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4">
                      {area.heroTitle}
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl">
                      {area.heroSubtitle}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 mt-8">
                  <Button asChild size="lg">
                    <Link to="/contact">Get Free Consultation</Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <a href={`tel:${businessInfo.phone}`}>
                      <Phone className="h-4 w-4 mr-2" />
                      Call Us Now
                    </a>
                  </Button>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Introduction */}
          <section className="py-16">
            <div className="container-custom">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="max-w-4xl"
              >
                <p className="text-lg text-foreground/80 leading-relaxed">
                  {area.intro}
                </p>

                {/* Quick Facts */}
                <div className="mt-8 grid sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg bg-card border border-border/50">
                    <p className="text-sm text-muted-foreground">Distance from office</p>
                    <p className="font-semibold text-foreground">{area.distanceFromOffice}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-card border border-border/50">
                    <p className="text-sm text-muted-foreground">Typical clients</p>
                    <p className="font-semibold text-foreground">{area.typicalClients[0]}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-card border border-border/50">
                    <p className="text-sm text-muted-foreground">Near landmarks</p>
                    <p className="font-semibold text-foreground">{area.nearbyLandmarks[0]}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Services */}
          <section className="py-16 bg-card/50">
            <div className="container-custom">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold mb-4">
                  Services Available in {area.name}
                </h2>
                <p className="text-muted-foreground mb-8 max-w-2xl">
                  Full range of technology solutions for {area.name} businesses
                </p>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {localServices.map((service, index) => {
                    const Icon = iconMap[service.icon] || Layers;
                    return (
                      <motion.div
                        key={service.slug}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <Link to={`/services/${service.slug}`}>
                          <Card className="h-full hover:border-foreground/20 transition-colors group">
                            <CardContent className="p-6">
                              <div className="p-3 rounded-lg bg-foreground/5 w-fit mb-4 group-hover:bg-foreground/10 transition-colors">
                                <Icon className="h-6 w-6 text-foreground" />
                              </div>
                              <h3 className="font-semibold text-foreground mb-2">
                                {service.title}
                              </h3>
                              <p className="text-sm text-muted-foreground mb-4">
                                {service.shortDescription}
                              </p>
                              <span className="text-sm text-foreground flex items-center gap-1 group-hover:gap-2 transition-all">
                                Learn more
                                <ArrowRight className="h-4 w-4" />
                              </span>
                            </CardContent>
                          </Card>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          </section>

          {/* Why Choose Us */}
          <section className="py-16">
            <div className="container-custom">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold mb-4">
                  Why Choose Us in {area.name}
                </h2>
                <p className="text-muted-foreground mb-8 max-w-2xl">
                  Local advantages for {area.name} businesses
                </p>

                <div className="grid sm:grid-cols-3 gap-6">
                  {area.whyChooseUs.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="p-6 rounded-xl border border-border/50 bg-card"
                    >
                      <CheckCircle2 className="h-8 w-8 text-foreground mb-4" />
                      <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* Client Types */}
          <section className="py-16 bg-card/50">
            <div className="container-custom">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold mb-4">
                  Businesses We Serve in {area.name}
                </h2>
                <div className="flex flex-wrap gap-3 mt-6">
                  {area.typicalClients.map((client, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 rounded-full bg-foreground/5 border border-foreground/10 text-foreground text-sm"
                    >
                      {client}
                    </span>
                  ))}
                </div>

                <div className="mt-8">
                  <h3 className="font-semibold text-foreground mb-3">Nearby Landmarks</h3>
                  <div className="flex flex-wrap gap-3">
                    {area.nearbyLandmarks.map((landmark, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 rounded bg-muted text-muted-foreground text-sm"
                      >
                        {landmark}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* FAQs */}
          <section className="py-16">
            <div className="container-custom">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold mb-4">
                  FAQs for {area.name} Businesses
                </h2>
                <p className="text-muted-foreground mb-8 max-w-2xl">
                  Common questions from {area.name} clients
                </p>

                <div className="max-w-3xl">
                  <Accordion type="single" collapsible className="w-full">
                    {area.faqs.map((faq, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Related Areas */}
          {relatedNeighborhoods.length > 0 && (
            <section className="py-16 bg-card/50">
              <div className="container-custom">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-2xl font-bold mb-4">Nearby Areas We Serve</h2>
                  <div className="flex flex-wrap gap-4">
                    {relatedNeighborhoods.map((n) => (
                      <Link
                        key={n.slug}
                        to={`/chennai/${n.slug}`}
                        className="px-4 py-2 rounded-lg border border-border/50 hover:border-foreground/20 hover:bg-background transition-all flex items-center gap-2"
                      >
                        {n.name}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    ))}
                    <Link
                      to="/chennai"
                      className="px-4 py-2 rounded-lg border border-foreground/20 bg-foreground/5 hover:bg-foreground/10 transition-all flex items-center gap-2"
                    >
                      View all Chennai areas
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </motion.div>
              </div>
            </section>
          )}

          {/* Contact & NAP Block */}
          <section className="py-16">
            <div className="container-custom">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="grid md:grid-cols-2 gap-12"
              >
                {/* CTA */}
                <div>
                  <h2 className="text-3xl font-bold mb-4">
                    Ready to Get Started in {area.name}?
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    Visit us in Padi, just {area.distanceFromOffice} from {area.name}.
                  </p>
                  <p className="text-muted-foreground mb-8">
                    Get a free consultation with our team. We'll discuss your
                    requirements and provide a customized solution for your {area.name} business.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Button asChild size="lg">
                      <Link to="/contact">Schedule Consultation</Link>
                    </Button>
                    <Button variant="outline" size="lg" asChild>
                      <Link to="/case-studies">View Our Work</Link>
                    </Button>
                  </div>
                </div>

                {/* NAP Block */}
                <div className="p-6 rounded-xl border border-border/50 bg-card">
                  <h3 className="font-semibold text-foreground mb-4">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-foreground flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-foreground">{businessInfo.name}</p>
                        <p className="text-sm text-muted-foreground">{getFormattedAddress()}</p>
                        <p className="text-sm text-foreground mt-1">
                          {area.distanceFromOffice} from {area.name}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-foreground" />
                      <a
                        href={`tel:${businessInfo.phone}`}
                        className="text-foreground hover:underline"
                      >
                        {businessInfo.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-foreground" />
                      <a
                        href={`mailto:${businessInfo.email}`}
                        className="text-foreground hover:underline"
                      >
                        {businessInfo.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-foreground" />
                      <span className="text-muted-foreground">
                        Monday – Friday, 9:00 AM – 6:00 PM
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
