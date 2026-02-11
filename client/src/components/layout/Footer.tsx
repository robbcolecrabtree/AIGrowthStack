import { Sparkles } from "lucide-react";
import { CLONE_CONFIG } from "@/lib/config";
import { Link } from "wouter";
import { CATEGORIES } from "@/lib/mockData";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border py-12 text-muted-foreground">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-6 w-6 text-primary" />
              <span className="font-heading font-bold text-xl text-foreground">{CLONE_CONFIG.siteName}</span>
            </div>
            <p className="text-sm leading-relaxed">
              The trusted directory for the best AI tools for business in 2026. We help teams discover, compare, and adopt marketing, content, video, voice, productivity, and automation tools.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-4">Categories</h4>
            <ul className="space-y-2 text-sm">
              {CATEGORIES.map((cat) => (
                <li key={cat}>
                  <Link href={`/?category=${encodeURIComponent(cat)}`} className="hover:text-primary transition-colors">
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-4">Directory</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-primary transition-colors">Browse All</Link></li>
              <li><Link href="/categories" className="hover:text-primary transition-colors">Categories</Link></li>
              <li><Link href="/compare" className="hover:text-primary transition-colors">Compare Tools</Link></li>
              <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
              <li><Link href="/resources" className="hover:text-primary transition-colors">Resources</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-4">Disclosure</h4>
            <p className="text-xs leading-relaxed mb-4">
              {CLONE_CONFIG.affiliateDisclosureText}
            </p>
            <h4 className="font-bold text-foreground mb-2 text-xs uppercase tracking-widest">Disclaimer</h4>
            <p className="text-[10px] leading-relaxed italic text-muted-foreground">
              {CLONE_CONFIG.legalDisclaimer}
            </p>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center text-xs gap-4">
          <p className="text-muted-foreground">
            © 2026 AIGrowthStack.io
            <span className="mx-2">|</span>
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <span className="mx-2">|</span>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms</Link>
            <span className="mx-2">|</span>
            <Link href="/disclosure" className="hover:text-primary transition-colors">Affiliate Disclosure</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
