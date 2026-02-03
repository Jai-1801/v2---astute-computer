import { Link } from 'react-router-dom';
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
  Building2,
  Users,
  CheckCircle2,
  Code,
  Bot,
  FileText,
  Layers,
} from 'lucide-react';
import {
  businessInfo,
  chennaiPage,
  neighborhoods,
  localServices,
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

export default function ChennaiPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: siteConfig.url },
    { name: 'Chennai', url: `${siteConfig.url}/chennai` },
  ]);

  const localBusinessSchema = generateLocalBusinessSchema();
  const faqSchema = generateFAQSchema(chennaiPage.faqs);

  return (
    <>
      <SEOHead
        title={chennaiPage.metaTitle}
        description={chennaiPage.metaDescription}
        canonical="https://astutecomputer.com/chennai"
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
                  <span className="text-foreground">Chennai</span>
                </nav>

                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-foreground/5 border border-foreground/10">
                    <MapPin className="h-8 w-8 text-foreground" />
                  </div>
                  <div>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4">
                      {chennaiPage.heroTitle}
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl">
                      {chennaiPage.heroSubtitle}
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
                <p className="text-lg text-foreground/80 leading-relaxed whitespace-pre-line">
                  {chennaiPage.intro}
                </p>
              </motion.div>
            </div>
          </section>

          {/* Services Grid */}
          <section className="py-16 bg-card/50">
            <div className="container-custom">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold mb-4">Our Services in Chennai</h2>
                <p className="text-muted-foreground mb-8 max-w-2xl">
                  Comprehensive technology solutions available across Chennai and Tamil Nadu
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

          {/* Neighborhoods Grid */}
          <section id="areas" className="py-16">
            <div className="container-custom">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold mb-4">Areas We Serve in Chennai</h2>
                <p className="text-muted-foreground mb-8 max-w-2xl">
                  From our Padi office, we serve businesses across all major Chennai neighborhoods
                </p>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {neighborhoods.map((area, index) => (
                    <motion.div
                      key={area.slug}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      viewport={{ once: true }}
                    >
                      <Link
                        to={`/chennai/${area.slug}`}
                        className="block p-4 rounded-lg border border-border/50 hover:border-foreground/20 hover:bg-card/50 transition-all group"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium text-foreground group-hover:text-foreground/80">
                              {area.name}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {area.distanceFromOffice} from office
                            </p>
                          </div>
                          <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* Why Choose Us */}
          <section className="py-16 bg-card/50">
            <div className="container-custom">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold mb-4">
                  Why Choose Astute Computer in Chennai
                </h2>
                <p className="text-muted-foreground mb-8 max-w-2xl">
                  Local expertise combined with global technology standards
                </p>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {chennaiPage.whyChennai.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="p-6 rounded-xl border border-border/50 bg-background"
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

          {/* Industries Section */}
          <section className="py-16">
            <div className="container-custom">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold mb-4">Industries We Serve in Chennai</h2>
                <p className="text-muted-foreground mb-8 max-w-2xl">
                  Trusted by Chennai businesses across diverse sectors
                </p>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      icon: Building2,
                      title: 'Healthcare',
                      description: 'Hospitals, clinics, and diagnostic centers',
                    },
                    {
                      icon: Users,
                      title: 'Legal Services',
                      description: 'Law firms and legal documentation',
                    },
                    {
                      icon: Building2,
                      title: 'Manufacturing',
                      description: 'Production and quality control systems',
                    },
                    {
                      icon: Building2,
                      title: 'Retail',
                      description: 'POS systems and inventory management',
                    },
                    {
                      icon: Users,
                      title: 'Education',
                      description: 'Learning management and administration',
                    },
                    {
                      icon: Building2,
                      title: 'Financial Services',
                      description: 'Document processing and compliance',
                    },
                  ].map((industry, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-4 p-4 rounded-lg border border-border/50"
                    >
                      <industry.icon className="h-6 w-6 text-foreground flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-foreground">{industry.title}</h3>
                        <p className="text-sm text-muted-foreground">{industry.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* FAQs */}
          <section className="py-16 bg-card/50">
            <div className="container-custom">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold mb-4">
                  Frequently Asked Questions
                </h2>
                <p className="text-muted-foreground mb-8 max-w-2xl">
                  Common questions about our Chennai services
                </p>

                <div className="max-w-3xl">
                  <Accordion type="single" collapsible className="w-full">
                    {chennaiPage.faqs.map((faq, index) => (
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
                    Ready to Transform Your Chennai Business?
                  </h2>
                  <p className="text-muted-foreground mb-8">
                    Get a free consultation with our Chennai team. We'll discuss your
                    requirements and provide a customized solution.
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
