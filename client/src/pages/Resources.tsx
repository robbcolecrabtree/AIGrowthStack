import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { articles } from "@/lib/articles";
import { Link } from "wouter";
import { ArrowRight, BookOpen, Clock, Tag } from "lucide-react";
import { SEO } from "@/components/layout/SEO";
import { CLONE_CONFIG } from "@/lib/config";

export default function Resources() {
  const categories = Array.from(new Set(articles.map(a => a.category)));

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      <SEO 
        title={`Resources & Blog | ${CLONE_CONFIG.siteName}`}
        description="Guides and articles on AI tools for marketing, SEO, video, voice, productivity, and automation. Stay ahead with the 2026 AI Growth Stack."
        canonical="/resources"
      />
      <Navbar />

      <main className="container mx-auto px-4 py-12 flex-grow">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-6 tracking-tight">
              Resources & Blog
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Guides, how-tos, and expert takes on scaling with AI—from ad creative and SEO to voice, video, and automation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {articles.map((article) => (
              <Link key={article.id} href={`/resources/${article.slug}`} className="group flex flex-col bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all hover:-translate-y-1">
                <div className="p-6 flex-grow flex flex-col">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wide">
                      {article.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" /> {article.readTime}
                    </span>
                  </div>
                  
                  <h3 className="font-heading font-bold text-xl text-foreground mb-3 group-hover:text-primary transition-colors leading-tight">
                    {article.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center text-primary font-bold text-sm mt-auto">
                    Read Article <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
