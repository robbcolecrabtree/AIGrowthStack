import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getBlogPostBySlug } from "@/lib/blogPosts";
import { mockSoftware } from "@/lib/mockData";
import { hexToRgba, getAccentTintOpacity } from "@/lib/utils";
import { Link, useRoute } from "wouter";
import NotFound from "./not-found";
import { SEO } from "@/components/layout/SEO";
import { ArrowLeft, User, Calendar, Tag, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const PROGRESS_BAR_COLOR = "#E4FE65";

export default function BlogPost() {
  const [match, params] = useRoute("/blog/:slug");

  if (!match || !params?.slug) return <NotFound />;

  const post = getBlogPostBySlug(params.slug);
  if (!post) return <NotFound />;

  const featuredTools = post.featuredToolIds
    .map((id) => mockSoftware.find((s) => s.id === id))
    .filter(Boolean);

  const articleRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: articleRef,
    offset: ["start start", "end end"],
  });
  const clampedProgress = useTransform(scrollYProgress, (v) => Math.min(1, Math.max(0, v)));

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    author: { "@type": "Person", name: post.author },
    datePublished: post.publishDate,
    dateModified: post.lastUpdated,
    description: post.excerpt,
  };

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      <div className="fixed top-0 left-0 right-0 h-1 z-[60] bg-transparent overflow-hidden">
        <motion.div
          className="h-full w-full origin-left"
          style={{ scaleX: clampedProgress, backgroundColor: PROGRESS_BAR_COLOR }}
        />
      </div>
      <SEO
        title={post.metaTitle}
        description={post.metaDescription}
        canonical={`/blog/${post.slug}`}
        schema={articleSchema}
        ogType="article"
      />
      <Navbar />

      <main className="container mx-auto px-4 py-12 flex-grow">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" /> Back to Blog
          </Link>

          <article ref={articleRef} className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
            <header className="p-8 md:p-12 border-b border-border bg-secondary/30">
              <div className="flex flex-wrap items-center gap-4 mb-6 text-sm">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-bold uppercase tracking-wide flex items-center gap-1">
                  <Tag className="w-3 h-3" /> {post.category}
                </span>
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Calendar className="w-4 h-4" /> {post.publishDate}
                </span>
                <span className="flex items-center gap-1 text-muted-foreground">
                  <User className="w-4 h-4" /> {post.author}
                </span>
                <span className="text-muted-foreground text-xs">
                  Last updated: {post.lastUpdated}
                </span>
              </div>
              <h1 className="font-heading font-bold text-5xl text-foreground mb-12 leading-tight tracking-tight">
                {post.title}
              </h1>
              <p className="text-sm italic text-muted-foreground mb-6">
                Disclosure: This post contains affiliate links. If you click and make a purchase, I may earn a small commission at no extra cost to you.
              </p>
              <p className="text-xl text-muted-foreground leading-relaxed font-medium">
                {post.excerpt}
              </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8 md:p-12">
              <div className="lg:col-span-2">
                <div
                  className="prose prose-invert prose-lg max-w-3xl mx-auto leading-relaxed prose-headings:font-heading prose-headings:font-bold prose-headings:text-foreground prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-6 prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-ul:list-disc prose-li:text-muted-foreground prose-li:leading-relaxed prose-li:my-3 prose-li:marker:text-[#E4FE65] prose-h2:mt-16 prose-h2:mb-6 prose-h2:pl-4 prose-h2:border-l-4 prose-h2:border-l-[#E4FE65] prose-h3:mt-10 prose-h3:mb-4 prose-img:rounded-xl prose-img:my-12 [&>p:first-of-type]:text-xl [&>p:first-of-type]:font-normal [&>p:first-of-type]:mb-8 [&_table]:bg-white/5 [&_table]:backdrop-blur-sm [&_table]:rounded-xl [&_table]:border [&_table]:border-white/10 [&_table]:overflow-hidden [&_pre]:bg-white/5 [&_pre]:backdrop-blur-sm [&_pre]:rounded-xl [&_pre]:border [&_pre]:border-white/10 [&_pre]:overflow-hidden [&_code]:bg-white/5 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded-md [&_code]:border [&_code]:border-white/10"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </div>

              <aside className="space-y-8 lg:block">
                {featuredTools.length > 0 && (
                  <div className="rounded-xl border border-white/20 p-6 backdrop-blur-md bg-white/10 lg:sticky lg:top-24">
                    <h3 className="font-heading font-bold text-lg mb-4 flex items-center gap-2 text-foreground">
                      <Sparkles className="w-5 h-5 text-primary" />
                      Featured Tools
                    </h3>
                    <div className="space-y-4">
                      {featuredTools.map((tool) => (
                        <div
                          key={tool.id}
                          className={`p-4 rounded-lg flex flex-col gap-3 ${!tool.cardAccent ? "bg-card border border-border" : "text-zinc-100 [&_.text-muted-foreground]:text-zinc-400"}`}
                          style={
                            tool.cardAccent
                              ? {
                                  background: `linear-gradient(180deg, ${hexToRgba(tool.cardAccent, getAccentTintOpacity(tool.id))} 0%, transparent 100%), hsl(0 0% 6%)`,
                                  border: "1px solid hsl(var(--border))",
                                  borderTop: `2px solid ${tool.cardAccent}`,
                                  ...(tool.cardAccentSecondary && {
                                    boxShadow: `inset 0 2px 0 0 ${tool.cardAccentSecondary}`,
                                  }),
                                }
                              : undefined
                          }
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={tool.logo}
                              alt={tool.name}
                              className={`w-10 h-10 object-contain ${["#000000", "#00002C", "#1B2F4A"].includes(tool.cardAccent ?? "") ? "invert" : ""}`}
                              onError={(e) => {
                                const t = e.target as HTMLImageElement;
                                if (t.src && !t.src.includes("ui-avatars.com")) {
                                  t.src = tool.id === "v0"
                                    ? "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
                                    : `https://ui-avatars.com/api/?name=${encodeURIComponent(tool.name)}&background=random`;
                                }
                              }}
                            />
                            <div>
                              <div className="font-bold text-foreground leading-none mb-1">
                                {tool.name}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Rating: {tool.rating}/5
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Link href={`/product/${tool.id}`} className="flex-1">
                              <Button
                                size="sm"
                                variant="outline"
                                className="w-full text-xs"
                              >
                                View Profile
                              </Button>
                            </Link>
                            <a href={`/go/${tool.id}`} target="_blank" rel="noopener sponsored">
                              <Button size="sm" className="text-xs">
                                Visit
                              </Button>
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
