import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SEOHead } from '@/components/SEOHead';
import { About } from '@/components/About';
import { siteConfig, generateBreadcrumbSchema } from '@/lib/seo';
import { Helmet } from 'react-helmet-async';

export default function AboutPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: siteConfig.url },
    { name: 'About', url: `${siteConfig.url}/about` },
  ]);

  return (
    <>
      <SEOHead
        title="About Us | Astute Computer"
        description="Learn about Astute Computer - a digital transformation company helping businesses modernize operations, digitize documents, and build custom software solutions."
        canonical="https://astutecomputer.com/about"
        type="website"
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-20">
          <About />
        </main>
        <Footer />
      </div>
    </>
  );
}
