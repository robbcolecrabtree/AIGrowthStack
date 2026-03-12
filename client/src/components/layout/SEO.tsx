import { Helmet } from "react-helmet";
import { CLONE_CONFIG } from "@/lib/config";
import { CURRENT_DATE } from "@/lib/constants";

/** Ensures string ends with (Verified {date}), stripping any existing Verified suffix to avoid duplication */
function ensureVerifiedSuffix(str: string): string {
  const cleaned = str.replace(/\s*\(Verified[^)]*\)\s*$/i, "").trim();
  return `${cleaned} (Verified ${CURRENT_DATE})`;
}

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
  const titleWithVerified = ensureVerifiedSuffix(title);
  const fullTitle = titleWithVerified.endsWith(siteSuffix) ? titleWithVerified : `${titleWithVerified}${siteSuffix}`;
  const fullDescription = ensureVerifiedSuffix(description);
  const baseCanonical = canonical ? `${siteUrl}${canonical.startsWith("/") ? canonical : "/" + canonical}` : siteUrl;
  const [pathPart, queryPart] = baseCanonical.split("?");
  const pathWithSlash = pathPart.endsWith("/") ? pathPart : `${pathPart}/`;
  const fullCanonical = queryPart ? `${pathWithSlash}?${queryPart}` : pathWithSlash;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      <link rel="canonical" href={fullCanonical} />
      {!CLONE_CONFIG.enableIndexing && <meta name="robots" content="noindex,nofollow" />}

      {/* Open Graph */}
      <meta property="og:site_name" content={CLONE_CONFIG.siteName} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:site" content="@aigrowthstack" />

      {/* Structured Data */}
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
    </Helmet>
  );
}
