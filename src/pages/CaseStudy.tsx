import { useParams, Link } from 'react-router-dom';
import { useCaseStudyBySlug, usePublishedCaseStudies } from '@/hooks/useCaseStudies';
import { useCaseStudyImages } from '@/hooks/useCaseStudyImages';
import { SEOHead } from '@/components/SEOHead';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ContentRenderer } from '@/components/case-study/ContentRenderer';
import { CaseStudyGallery } from '@/components/case-study/CaseStudyGallery';
import { RelatedCaseStudies } from '@/components/case-study/RelatedCaseStudies';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Helmet } from 'react-helmet-async';
import { siteConfig, generateBreadcrumbSchema } from '@/lib/seo';
import type { JSONContent } from '@tiptap/react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

// Section configuration matching the editor
const SECTION_CONFIG = [
  { key: 'context', label: 'Client & Context' },
  { key: 'problem', label: 'The Problem' },
  { key: 'goals', label: 'Success Criteria' },
  { key: 'solution', label: 'Our Solution' },
  { key: 'implementation', label: 'Implementation' },
  { key: 'results_narrative', label: 'Results' },
  { key: 'next_steps', label: 'Next Steps' },
];

// Map service names to slugs for internal linking
const SERVICE_SLUG_MAP: Record<string, string> = {
  'Document Digitization': 'document-digitization',
  'AI Automation': 'ai-automation',
  'Custom Software': 'custom-software-development',
  'Digital Transformation': 'digital-transformation',
};

export default function CaseStudy() {
  const { slug } = useParams();
  const { data: caseStudy, isLoading, error } = useCaseStudyBySlug(slug);
  const { data: images = [] } = useCaseStudyImages(caseStudy?.id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error || !caseStudy) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container-custom py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Case Study Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The case study you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link to="/case-studies">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Case Studies
            </Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  // Generate SEO description with results if available
  const results = (caseStudy as any).results as Array<{label: string; value: string; context?: string}> || [];
  const seoDescription = caseStudy.meta_description || 
    (results.length > 0 
      ? `${caseStudy.short_description} Results: ${results.slice(0, 2).map(r => `${r.value} ${r.label}`).join('. ')}.`
      : caseStudy.short_description);

  const seoTitle = caseStudy.meta_title || `Case Study: ${caseStudy.title} | Astute Computer`;

  // Breadcrumb schema
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: siteConfig.url },
    { name: 'Case Studies', url: `${siteConfig.url}/case-studies` },
    { name: caseStudy.title, url: `${siteConfig.url}/case-studies/${caseStudy.slug}` },
  ]);

  // Article schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: caseStudy.title,
    description: caseStudy.short_description,
    image: caseStudy.thumbnail_url || undefined,
    datePublished: caseStudy.published_at || caseStudy.created_at,
    dateModified: caseStudy.updated_at,
    author: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  // FAQ schema if FAQs exist
  const faqs = (caseStudy as any).faqs as Array<{question: string; answer: string}> || [];
  const faqSchema = faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  } : null;

  // Parse section_content from the case study
  const sectionContent = (caseStudy as any).section_content as Record<string, JSONContent> | null;

  // Get related services for linking
  const relatedServices = ((caseStudy as any).services || []) as string[];

  return (
    <>
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        canonical={`https://astutecomputer.com/case-studies/${caseStudy.slug}`}
        type="article"
        image={caseStudy.thumbnail_url || undefined}
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
        {faqSchema && (
          <script type="application/ld+json">
            {JSON.stringify(faqSchema)}
          </script>
        )}
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />

        {/* Fixed Back Button */}
        <div className="fixed top-24 left-4 z-40 md:left-8">
          <Button
            asChild
            variant="outline"
            size="sm"
            className="backdrop-blur-sm bg-background/80 border-border/50 shadow-lg"
          >
            <Link to="/case-studies">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>

        <main>
          {/* Hero Section */}
          <section className="relative min-h-[60vh] flex items-end">
            {/* Background Image */}
            {caseStudy.thumbnail_url && (
              <div className="absolute inset-0">
                <img
                  src={caseStudy.thumbnail_url}
                  alt={caseStudy.thumbnail_alt || caseStudy.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
              </div>
            )}

            <div className="container-custom relative py-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex flex-wrap gap-2 mb-4">
                  {(caseStudy as any).industry && (
                    <Badge variant="secondary">{(caseStudy as any).industry}</Badge>
                  )}
                  <span className="text-xs uppercase tracking-widest text-muted-foreground">
                    {caseStudy.category}
                  </span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                  {caseStudy.title}
                </h1>

                <p className="text-xl text-muted-foreground max-w-2xl mb-8">
                  {caseStudy.short_description}
                </p>

                {/* Key Results */}
                {results.length > 0 && (
                  <div className="flex flex-wrap gap-4 mb-8">
                    {results.slice(0, 3).map((result, index) => (
                      <div key={index} className="px-6 py-4 bg-card/50 backdrop-blur-sm rounded-lg border border-border/50">
                        <span className="text-3xl font-bold text-foreground block">
                          {result.value}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {result.label}
                        </span>
                        {result.context && (
                          <span className="text-xs text-muted-foreground/60 block">
                            {result.context}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Fallback to old stat display */}
                {results.length === 0 && caseStudy.stat_value && caseStudy.stat_metric && (
                  <div className="inline-flex items-baseline gap-2 px-6 py-4 bg-card/50 backdrop-blur-sm rounded-lg border border-border/50">
                    <span className="text-4xl font-bold text-foreground">
                      {caseStudy.stat_value}
                    </span>
                    <span className="text-muted-foreground">
                      {caseStudy.stat_metric}
                    </span>
                  </div>
                )}
              </motion.div>
            </div>
          </section>

          {/* Section Content */}
          {sectionContent && (
            <section className="container-custom py-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="max-w-3xl mx-auto prose prose-lg prose-invert prose-headings:text-foreground prose-p:text-foreground/80 prose-strong:text-foreground prose-a:text-foreground prose-li:text-foreground/80"
              >
                {SECTION_CONFIG.map(({ key, label }) => {
                  const content = sectionContent[key] as JSONContent | undefined;
                  if (!content || !content.content?.length) return null;
                  return (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      viewport={{ once: true }}
                      className="mb-12"
                    >
                      <h2>{label}</h2>
                      <ContentRenderer content={content} />
                    </motion.div>
                  );
                })}
              </motion.div>
            </section>
          )}

          {/* Legacy Content Fallback */}
          {!sectionContent && caseStudy.content && (
            <section className="container-custom py-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="max-w-3xl mx-auto prose prose-lg prose-invert prose-headings:text-foreground prose-p:text-foreground/80 prose-strong:text-foreground prose-a:text-foreground prose-li:text-foreground/80"
              >
                <ContentRenderer content={caseStudy.content as JSONContent} />
              </motion.div>
            </section>
          )}

          {/* Gallery Section */}
          {images.length > 0 && (
            <section className="container-custom py-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-bold mb-8">Project Gallery</h2>
                <CaseStudyGallery images={images} />
              </motion.div>
            </section>
          )}

          {/* FAQs Section - Expandable Accordion */}
          {faqs.length > 0 && (
            <section className="container-custom py-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="max-w-3xl mx-auto"
              >
                <h2 className="text-2xl font-bold mb-8">Frequently Asked Questions</h2>
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`faq-${index}`} className="border-border/50">
                      <AccordionTrigger className="text-left text-lg font-semibold hover:no-underline">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground text-base">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.div>
            </section>
          )}

          {/* Related Services Section */}
          {relatedServices.length > 0 && (
            <section className="container-custom py-16 border-t border-border/50">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-bold mb-6">Related Services</h2>
                <div className="flex flex-wrap gap-4">
                  {relatedServices.map((service) => {
                    const serviceSlug = SERVICE_SLUG_MAP[service];
                    if (!serviceSlug) return null;
                    return (
                      <Link key={service} to={`/services/${serviceSlug}`}>
                        <Badge
                          variant="outline"
                          className="text-base py-2 px-4 hover:bg-foreground/5 transition-colors"
                        >
                          {service}
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Badge>
                      </Link>
                    );
                  })}
                </div>
              </motion.div>
            </section>
          )}

          {/* Related Case Studies */}
          <RelatedCaseStudies
            currentId={caseStudy.id}
            category={caseStudy.category}
          />
        </main>

        <Footer />
      </div>
    </>
  );
}
