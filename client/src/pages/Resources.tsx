import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { articles } from "@/lib/articles";
import { blueprints } from "@/lib/blueprints";
import { Link } from "wouter";
import { ArrowRight, Clock, Sparkles } from "lucide-react";
import { SEO } from "@/components/layout/SEO";
import { CLONE_CONFIG } from "@/lib/config";

export default function Resources() {
  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      <SEO 
        title="Resources & Blueprints 2026"
        description="Actionable blueprints for Browse AI, Gamma, Reclaim. Pricing, workflows, ROI. Download configs and start automating today."
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

          {/* Blueprints */}
          <div className="mb-16">
            <div className="flex items-center gap-2 mb-8">
              <Sparkles className="w-5 h-5 text-primary" />
              <h2 className="font-heading font-bold text-2xl text-foreground">High-Value Blueprints</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {blueprints.map((blueprint) => {
                const Icon = blueprint.icon;
                const isNewFeb2026 = blueprint.id === "automated-sales-machine";
                return (
                  <Link
                    key={blueprint.id}
                    href={blueprint.ctaHref}
                    className={`group flex flex-col bg-card rounded-2xl border overflow-hidden hover:shadow-lg hover:shadow-primary/5 hover:border-primary/50 transition-all duration-200 hover:-translate-y-1 no-underline ${isNewFeb2026 ? "border-primary/40 ring-1 ring-primary/20" : "border-border"}`}
                  >
                    <div className="p-6 flex-grow flex flex-col">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        {isNewFeb2026 && (
                          <span className="px-2.5 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wide">
                            New for February 2026
                          </span>
                        )}
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wide w-fit mb-3">
                        {blueprint.type}
                      </span>
                      <h3 className="font-heading font-bold text-xl text-foreground mb-3 group-hover:text-primary transition-colors leading-tight">
                        {blueprint.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow">
                        {blueprint.description}
                      </p>
                      <div className="flex items-center text-primary font-bold text-sm mt-auto">
                        {blueprint.ctaLabel} <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Articles */}
          <div>
            <h2 className="font-heading font-bold text-2xl text-foreground mb-8">Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
        </div>
      </main>

      <Footer />
    </div>
  );
}
