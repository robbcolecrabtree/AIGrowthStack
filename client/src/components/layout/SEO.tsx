import { Helmet } from "react-helmet";
import { CLONE_CONFIG } from "@/lib/config";
import { CURRENT_DATE, SOCIAL_FRESHNESS_LABEL } from "@/lib/constants";

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

/** Force apex (non-www) canonical host to match Cloudflare redirect rules */
function canonicalSiteUrl(url: string): string {
  return url.replace(/^https:\/\/www\./i, "https://");
}

export function SEO({ 
  title, 
  description, 
  canonical, 
  ogType = "website", 
  ogImage = "/logo.png",
  schema 
}: SEOProps) {
  const siteUrl = canonicalSiteUrl(CLONE_CONFIG.siteUrl);
  const siteSuffix = ` | ${CLONE_CONFIG.siteName}`;
  const titleWithVerified = ensureVerifiedSuffix(title);
  const fullTitle = titleWithVerified.endsWith(siteSuffix) ? titleWithVerified : `${titleWithVerified}${siteSuffix}`;
  const fullDescription = ensureVerifiedSuffix(description);
  const baseCanonical = canonical ? `${siteUrl}${canonical.startsWith("/") ? canonical : "/" + canonical}` : siteUrl;
  const [pathPart, queryPart] = baseCanonical.split("?");
  const pathWithSlash = pathPart.endsWith("/") ? pathPart : `${pathPart}/`;
  const fullCanonical = queryPart ? `${pathWithSlash}?${queryPart}` : pathWithSlash;

  const absoluteOgImage =
    ogImage.startsWith("http") ? ogImage : `${siteUrl}${ogImage.startsWith("/") ? ogImage : `/${ogImage}`}`;

  const titleTrim = title.trim();
  const socialShareTitle = `${titleTrim} | ${SOCIAL_FRESHNESS_LABEL}${siteSuffix}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      <link rel="canonical" href={fullCanonical} />
      {!CLONE_CONFIG.enableIndexing && <meta name="robots" content="noindex,nofollow" />}

      {/* Open Graph — freshness label for CTR on social / some surfaces */}
      <meta property="og:site_name" content={CLONE_CONFIG.siteName} />
      <meta property="og:title" content={socialShareTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:image" content={absoluteOgImage} />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={socialShareTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={absoluteOgImage} />
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
