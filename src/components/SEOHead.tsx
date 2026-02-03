import { Helmet } from 'react-helmet-async';
import {
  siteConfig,
  organizationSchema,
  localBusinessSchema,
  websiteSchema,
  serviceSchemas,
  homeBreadcrumbs,
} from '@/lib/seo';

interface SEOHeadProps {
  title?: string;
  description?: string;
  canonical?: string;
  type?: 'website' | 'article';
  image?: string;
  noIndex?: boolean;
  includeSchemas?: boolean;
}

export function SEOHead({
  title = `${siteConfig.name} | Digital Transformation & Software Solutions`,
  description = siteConfig.description,
  canonical = siteConfig.url,
  type = 'website',
  image = siteConfig.ogImage,
  noIndex = false,
  includeSchemas = true,
}: SEOHeadProps) {
  const fullTitle = title.includes(siteConfig.name)
    ? title
    : `${title} | ${siteConfig.name}`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="author" content={siteConfig.author} />
      <meta name="keywords" content={siteConfig.keywords} />

      {/* Robots */}
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}

      {/* Canonical */}
      <link rel="canonical" href={canonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={siteConfig.name} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonical} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD Structured Data */}
      {includeSchemas && (
        <>
          <script type="application/ld+json">
            {JSON.stringify(organizationSchema)}
          </script>
          <script type="application/ld+json">
            {JSON.stringify(localBusinessSchema)}
          </script>
          <script type="application/ld+json">
            {JSON.stringify(websiteSchema)}
          </script>
          <script type="application/ld+json">
            {JSON.stringify(homeBreadcrumbs)}
          </script>
          {serviceSchemas.map((schema, index) => (
            <script key={index} type="application/ld+json">
              {JSON.stringify(schema)}
            </script>
          ))}
        </>
      )}
    </Helmet>
  );
}
