import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SEO } from "@/components/layout/SEO";
import { CLONE_CONFIG } from "@/lib/config";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <SEO 
        title={`Privacy Policy | ${CLONE_CONFIG.siteName}`}
        description={`Privacy Policy and data protection information for ${CLONE_CONFIG.siteName}.`}
      />
      <Navbar />
      <main className="container mx-auto px-4 py-12 flex-grow max-w-4xl">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 md:p-12 shadow-sm">
          <h1 className="text-4xl font-bold mb-8 text-slate-900">Privacy Policy</h1>
          <div className="prose prose-slate max-w-none space-y-6 text-slate-600">
            <p className="text-sm italic">Last Updated: {new Date().toLocaleDateString()}</p>
            
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Introduction</h2>
              <p>Welcome to {CLONE_CONFIG.siteName}. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Important Information and Who We Are</h2>
              <p>This website is an affiliate-supported directory. We do not sell products directly, but provide information and reviews about third-party software solutions. We may earn a commission if you click on an affiliate link and make a purchase.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Tracking & Cookies</h2>
              <p>We use 30-day tracking cookies from affiliate networks to ensure we receive credit for referrals. These do not store your name or financial details.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Affiliate Tracking</h2>
              <p>We participate in affiliate marketing programs. These programs use cookies to track clicks and attribution for sales. No personally identifiable information is stored by us during this process.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Data Collection</h2>
              <p>We do not collect any direct personal information such as names, email addresses, or phone numbers on this website. Our server logs may collect standard anonymous data such as IP address, browser type, and time of visit for security and analytical purposes.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Your Rights</h2>
              <p>Depending on your location, you may have rights under data protection laws in relation to your personal data, including the right to access, correction, or erasure of your data. Since we do not store personal profiles, these rights typically apply to cookie-based tracking.</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
