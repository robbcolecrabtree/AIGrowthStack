import { Helmet } from "react-helmet";
import { CLONE_CONFIG } from "@/lib/config";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogType?: "website" | "article" | "product";
  ogImage?: string;
  schema?: object;
}

export function SEO({ 
  title, 
  description, 
  canonical, 
  ogType = "website", 
  ogImage = "/logo.png",
  schema 
}: SEOProps) {
  const siteUrl = CLONE_CONFIG.siteUrl;
  const siteSuffix = ` | ${CLONE_CONFIG.siteName}`;
  const fullTitle = title.endsWith(siteSuffix) ? title : `${title}${siteSuffix}`;
  const fullCanonical = canonical ? `${siteUrl}${canonical}` : siteUrl;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullCanonical} />
      {!CLONE_CONFIG.enableIndexing && <meta name="robots" content="noindex,nofollow" />}

      {/* Open Graph */}
      <meta property="og:site_name" content={CLONE_CONFIG.siteName} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:site" content="@aigrowthstack" />

      {/* Structured Data */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}
