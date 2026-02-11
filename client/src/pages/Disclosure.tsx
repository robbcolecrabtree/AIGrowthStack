import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEO } from "@/components/layout/SEO";
import { CLONE_CONFIG } from "@/lib/config";

export default function Disclosure() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <SEO
        title={`Affiliate Disclosure | ${CLONE_CONFIG.siteName}`}
        description="How AIGrowthStack.io is funded and how compensation may affect our reviews. We keep our analysis independent."
      />
      <Navbar />
      <main className="container mx-auto px-4 py-12 flex-grow max-w-4xl">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 md:p-12 shadow-sm">
          <h1 className="text-4xl font-bold mb-8 text-slate-900">Affiliate Disclosure</h1>
          <div className="prose prose-slate max-w-none space-y-6 text-slate-600">
            <p className="text-sm italic">Last Updated: Feb 2026</p>
            <p className="text-lg leading-relaxed">
              AIGrowthStack.io is an independent review hub. We may receive compensation from the companies whose products we review. This helps us keep the site free for users, but it never dictates our expert analysis or &ldquo;Best&rdquo; rankings.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
