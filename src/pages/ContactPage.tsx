import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SEOHead } from '@/components/SEOHead';
import { Contact } from '@/components/Contact';
import { siteConfig, generateBreadcrumbSchema } from '@/lib/seo';
import { Helmet } from 'react-helmet-async';

export default function ContactPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: siteConfig.url },
    { name: 'Contact', url: `${siteConfig.url}/contact` },
  ]);

  return (
    <>
      <SEOHead
        title="Contact Us | Astute Computer"
        description="Get in touch with Astute Computer. Contact us for digital transformation, AI automation, document digitization, or custom software development projects."
        canonical="https://astutecomputer.com/contact"
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
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
