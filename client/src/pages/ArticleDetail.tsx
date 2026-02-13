import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { articles } from "@/lib/articles";
import { mockSoftware } from "@/lib/mockData";
import { hexToRgba, getAccentTintOpacity } from "@/lib/utils";
import { Link, useRoute } from "wouter";
import NotFound from "./not-found";
import { SEO } from "@/components/layout/SEO";
import { CLONE_CONFIG } from "@/lib/config";
import { ArrowLeft, User, Calendar, Tag, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

function stripHtmlToSnippet(html: string, maxLen = 150) {
  const text = html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (text.length <= maxLen) return text;
  return `${text.slice(0, maxLen).trim()}…`;
}

export default function ArticleDetail() {
  const [match, params] = useRoute("/resources/:slug");
  
  if (!match) return <NotFound />;

  const article = articles.find(a => a.slug === params.slug);
  
  if (!article) return <NotFound />;

  // Find related products based on IDs stored in the article
  const relatedSoftware = article.relatedProducts 
    ? mockSoftware.filter(s => article.relatedProducts?.includes(s.id))
    : [];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "author": {
      "@type": "Person",
      "name": article.author
    },
    "datePublished": article.publishDate,
    "description": article.excerpt
  };

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      <SEO 
        title={article.title}
        description={stripHtmlToSnippet(article.content, 150)}
        canonical={`/resources/${article.slug}`}
        schema={articleSchema}
        ogType="article"
      />
      <Navbar />

      <main className="container mx-auto px-4 py-12 flex-grow">
        <div className="max-w-4xl mx-auto">
          <Link href="/resources" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 group">
             <ArrowLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" /> Back to Resources
          </Link>

          <article className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
            <header className="p-8 md:p-12 border-b border-border bg-secondary/30">
              <div className="flex flex-wrap items-center gap-4 mb-6 text-sm">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-bold uppercase tracking-wide flex items-center gap-1">
                  <Tag className="w-3 h-3" /> {article.category}
                </span>
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Calendar className="w-4 h-4" /> {article.publishDate}
                </span>
                <span className="flex items-center gap-1 text-muted-foreground">
                  <User className="w-4 h-4" /> {article.author}
                </span>
                <span className="text-muted-foreground text-xs">Last updated: Feb 2026</span>
              </div>
              <h1 className="font-heading font-bold text-3xl md:text-5xl text-foreground mb-6 leading-tight">
                {article.title}
              </h1>
              <p className="text-sm italic text-muted-foreground mb-6">
                Disclosure: This post contains affiliate links. If you click and make a purchase, I may earn a small commission at no extra cost to you.
              </p>
              <p className="text-xl text-muted-foreground leading-relaxed font-medium">
                {article.excerpt}
              </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8 md:p-12">
              <div className="lg:col-span-2">
                <div 
                  className="prose prose-invert prose-lg max-w-none prose-headings:font-heading prose-headings:font-bold prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />
              </div>

              <aside className="space-y-8">
                {relatedSoftware.length > 0 && (
                  <div className="bg-secondary/30 rounded-xl border border-border p-6 sticky top-24">
                    <h3 className="font-heading font-bold text-lg mb-4 flex items-center gap-2 text-foreground">
                      <ShieldCheck className="w-5 h-5 text-primary" />
                      Mentioned Tools
                    </h3>
                    <div className="space-y-4">
                      {relatedSoftware.map(software => (
                        <div
                          key={software.id}
                          className={`p-4 rounded-lg flex flex-col gap-3 ${!software.cardAccent ? "bg-card border border-border" : "text-zinc-100 [&_.text-muted-foreground]:text-zinc-400"}`}
                          style={
                            software.cardAccent
                              ? {
                                  background: `linear-gradient(180deg, ${hexToRgba(software.cardAccent, getAccentTintOpacity(software.id))} 0%, transparent 100%), hsl(0 0% 6%)`,
                                  border: "1px solid hsl(var(--border))",
                                  borderTop: `2px solid ${software.cardAccent}`,
                                  ...(software.cardAccentSecondary && {
                                    boxShadow: `inset 0 2px 0 0 ${software.cardAccentSecondary}`,
                                  }),
                                }
                              : undefined
                          }
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={software.logo}
                              alt={software.name}
                              className={`w-10 h-10 object-contain ${["#000000", "#00002C", "#1B2F4A"].includes(software.cardAccent ?? "") ? "invert" : ""}`}
                                onError={(e) => {
                                const t = e.target as HTMLImageElement;
                                if (t.src && !t.src.includes("ui-avatars.com")) {
                                  t.src = software.id === "v0"
                                    ? "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
                                    : `https://ui-avatars.com/api/?name=${encodeURIComponent(software.name)}&background=random`;
                                }
                              }}
                            />
                            <div>
                              <div className="font-bold text-foreground leading-none mb-1">{software.name}</div>
                              <div className="text-xs text-muted-foreground">Rating: {software.rating}/5</div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Link href={`/product/${software.id}`} className="flex-1">
                              <Button size="sm" variant="outline" className="w-full text-xs">View Profile</Button>
                            </Link>
                            <a href={`/go/${software.id}`} target="_blank" rel="noopener sponsored">
                              <Button size="sm" className="text-xs">Visit</Button>
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </aside>
            </div>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
