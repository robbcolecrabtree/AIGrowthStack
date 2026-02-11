import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEO } from "@/components/layout/SEO";
import { CLONE_CONFIG } from "@/lib/config";

export default function TermsOfService() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <SEO 
        title={`Terms of Service | ${CLONE_CONFIG.siteName}`}
        description={`Terms and Conditions for using the ${CLONE_CONFIG.siteName} platform.`}
      />
      <Navbar />
      <main className="container mx-auto px-4 py-12 flex-grow max-w-4xl">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 md:p-12 shadow-sm">
          <h1 className="text-4xl font-bold mb-8 text-slate-900">Terms of Service</h1>
          <div className="prose prose-slate max-w-none space-y-6 text-slate-600">
            <p className="text-sm italic">Last Updated: February 11, 2026</p>
            
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Agreement to Terms</h2>
              <p>By accessing {CLONE_CONFIG.siteName}, you agree to be bound by these Terms of Service and to comply with all applicable laws and regulations.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Editorial Integrity & Methodology</h2>
              <p>The reviews, summaries, and technical comparisons on this website are developed using an integrated approach that combines advanced data synthesis with human editorial oversight. While we leverage data aggregation tools to collect technical documentation and public specifications, every evaluation is reviewed by our team to ensure the insights provided are accurate and relevant to modern AI-driven growth strategies and marketing automation.</p>
              <p className="font-bold">Despite our verification process, the AI software landscape changes rapidly. You should always verify pricing, features, and AI capabilities directly with the software vendor before making a purchase decision.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Affiliate Disclosure</h2>
              <p>This website is a for-profit directory. We may receive compensation from companies whose products we review or link to. This compensation may impact how and where products appear on the site, including the order in which they appear.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Intellectual Property</h2>
              <p>The content, organization, graphics, design, and other matters related to the site are protected under applicable copyrights and trademarks. The copying, redistribution, or use of any part of the site is strictly prohibited without our express written permission.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Limitation of Liability</h2>
              <p>In no event shall {CLONE_CONFIG.siteName} be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Governing Law</h2>
              <p>These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which the website operates, and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
