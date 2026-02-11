export interface SiteConfig {
  siteName: string;
  siteUrl: string;
  defaultIndustry: string;
  brandColor: string; // H S% L% format
  logoText: string;
  affiliateDisclosureText: string;
  analyticsId: string;
  legalDisclaimer: string;
  enableIndexing: boolean;
  seedVersion: string;
  enableSchemaValidation: boolean;
}

export const CLONE_CONFIG: SiteConfig = {
  siteName: "AIGrowthStack",
  siteUrl: "https://aigrowthstack.io",
  defaultIndustry: "Marketing & Ads",
  brandColor: "263 70% 58%", // Violet #8B5CF6
  logoText: "AIGROWTHSTACK",
  affiliateDisclosureText: "AIGrowthStack may earn a commission when you click on links to products. This does not affect our reviews or comparisons.",
  analyticsId: "G-XXXXXXXXXX",
  legalDisclaimer: "Information on AIGrowthStack is provided for general informational purposes only. Tool features and pricing change frequently; please verify details with vendors.",
  enableIndexing: true,
  seedVersion: "v2.0.0",
  enableSchemaValidation: true,
};
