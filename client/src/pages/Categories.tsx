import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CATEGORIES, toolsByCategory } from "@/lib/mockData";
import {
  Megaphone,
  FileText,
  Video,
  Mic,
  Briefcase,
  Workflow,
  Code2,
  MessageCircle,
  ArrowRight,
} from "lucide-react";
import { Link } from "wouter";
import { SEO } from "@/components/layout/SEO";
import { CLONE_CONFIG } from "@/lib/config";

const categoryIcons: Record<string, React.ReactNode> = {
  "Marketing & Ads": <Megaphone className="w-6 h-6" />,
  "SEO & Writing": <FileText className="w-6 h-6" />,
  "Video & Image": <Video className="w-6 h-6" />,
  "Audio & Voice": <Mic className="w-6 h-6" />,
  "Productivity & Work": <Briefcase className="w-6 h-6" />,
  "Data & Automation": <Workflow className="w-6 h-6" />,
  "Development": <Code2 className="w-6 h-6" />,
  "Customer Support": <MessageCircle className="w-6 h-6" />,
};

export default function Categories() {
  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      <SEO
        title={`AI Tool Categories | ${CLONE_CONFIG.siteName}`}
        description="Browse AI tools by category: Marketing & Ads, Video & Image, SEO & Writing, Audio & Voice, Productivity & Work, and Data & Automation."
        canonical="/categories"
      />
      <Navbar />

      <main className="container mx-auto px-4 py-12 flex-grow">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-heading font-bold text-4xl text-foreground mb-4 tracking-tight">
            Browse by Category
          </h1>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
            Find the best AI tools for your use case. We've grouped our directory into categories so you can compare options that fit your stack.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CATEGORIES.map((category) => {
              const count = toolsByCategory(category).length;
              return (
                <Link
                  key={category}
                  href={`/?category=${encodeURIComponent(category)}`}
                  className="group p-6 bg-card border border-border rounded-xl hover:border-primary/40 hover:shadow-md transition-all flex items-center justify-between no-underline"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors flex-shrink-0">
                      {categoryIcons[category] || <FileText className="w-6 h-6" />}
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-foreground group-hover:text-primary transition-colors">
                        {category}
                      </h3>
                      <span className="text-sm text-muted-foreground">{count} tools</span>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                </Link>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
