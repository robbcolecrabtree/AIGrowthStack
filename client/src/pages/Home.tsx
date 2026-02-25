import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FilterSidebar } from "@/components/ui/FilterSidebar";
import { SoftwareCard } from "@/components/ui/SoftwareCard";
import { ToolCard } from "@/components/ui/ToolCard";
import {
  mockSoftware,
  featuredTools,
  CATEGORIES,
  toolsByCategory,
} from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Sparkles, LayoutGrid, BookOpen, ArrowRight, FileText, Zap } from "lucide-react";
import { Link, useSearchParams } from "wouter";
import { SEO } from "@/components/layout/SEO";
import { CLONE_CONFIG } from "@/lib/config";
import { BLOG_POSTS } from "@/lib/blogPosts";
import { BlogCard } from "@/components/ui/BlogCard";
import type { BlogPost } from "@/lib/blogPosts";

const categorySlug = (c: string) => encodeURIComponent(c);

const latestInsights = BLOG_POSTS.slice(-5);

function LatestInsightCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex-shrink-0 w-[280px] md:w-auto snap-center md:snap-align-none flex flex-col bg-card border border-border rounded-xl overflow-hidden transition-all duration-200 hover:border-[#A855F7]/60 hover:shadow-[0_0_20px_-5px_rgba(168,85,247,0.2)] no-underline"
    >
      <div className="h-20 flex-shrink-0 bg-gradient-to-br from-primary/20 via-secondary to-primary/10" />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-heading font-bold text-sm text-foreground line-clamp-2 leading-tight mb-3 group-hover:text-primary transition-colors">
          {post.title}
        </h3>
        <span className="mt-auto inline-flex items-center gap-1.5 w-fit h-8 px-3 rounded-md text-xs font-semibold border border-primary/40 text-primary group-hover:bg-primary/10 transition-colors">
          Read <ArrowRight className="w-3 h-3" />
        </span>
      </div>
    </Link>
  );
}

export default function Home() {
  const [searchParams] = useSearchParams();
  const rawSearch = typeof window !== "undefined" ? window.location.search : "";
  const params = rawSearch ? new URLSearchParams(rawSearch) : searchParams;
  const categoryParam = params.get("category") || "";
  const searchParam = params.get("search") || "";

  let filteredSoftware = categoryParam
    ? mockSoftware.filter((s) => s.categories.includes(categoryParam as any))
    : mockSoftware;

  if (searchParam.trim()) {
    const q = searchParam.trim().toLowerCase();
    filteredSoftware = filteredSoftware.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        (s.tagline && s.tagline.toLowerCase().includes(q)) ||
        (s.description && s.description.toLowerCase().includes(q)) ||
        s.categories.some((c) => c.toLowerCase().includes(q))
    );
  }

  const metaTitle = categoryParam
    ? `Best ${categoryParam} AI Tools 2026`
    : "Best AI Tools for Business 2026: Pricing & Reviews";
  const metaDescription =
    "Compare actionable AI tools: pricing, vs. reviews, ROI. HeyGen, ElevenLabs, Surfer, Jasper. Vetted for B2B growth—start comparing today.";

  const blogPreview = BLOG_POSTS.slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      <SEO
        title={metaTitle}
        description={metaDescription}
        canonical={categoryParam ? `/?category=${categorySlug(categoryParam)}` : "/"}
      />
      <Navbar />

      {/* Hero */}
      <section className="border-b border-border py-12 md:py-16">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h1 className="font-heading font-bold text-4xl md:text-6xl text-foreground mb-6 tracking-tight animate-in fade-in slide-in-from-top-4 duration-700">
            The <span className="text-primary">AI Growth Stack</span> Directory
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Compare the best AI tools for business in 2026. Vetted reviews, pricing, and features for marketing, content, video, voice, productivity, and automation.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {CATEGORIES.map((tag) => (
              <Link key={tag} href={`/?category=${categorySlug(tag)}`}>
                <span
                  className={`inline-block px-4 py-1.5 border rounded-full text-sm font-medium cursor-pointer transition-colors ${
                    categoryParam === tag
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-card border-border text-muted-foreground hover:border-primary/50 hover:text-primary"
                  }`}
                >
                  {tag}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Insights */}
      <section className="border-b border-border py-8 md:py-10">
        <div className="container mx-auto px-4 mb-4">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            <h2 className="font-heading font-bold text-xl md:text-2xl text-foreground">Latest Insights</h2>
          </div>
        </div>
        <div className="md:container md:mx-auto md:px-4">
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pl-4 pr-8 pb-4 md:pl-0 md:pr-0 md:grid md:grid-cols-3 md:overflow-visible md:snap-none md:gap-6 md:pb-0 scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {latestInsights.map((post) => (
              <LatestInsightCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* The 2026 Sales Stack */}
      <section className="border-b border-border py-8 md:py-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-primary" />
            <h2 className="font-heading font-bold text-xl md:text-2xl text-foreground">The 2026 Sales Stack</h2>
          </div>
          <p className="text-muted-foreground mb-6 max-w-2xl">
            The exact scraping and outreach workflow used to generate 100+ B2B leads per week.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="/go/browse-ai"
              target="_blank"
              rel="noopener sponsored"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border hover:border-primary/50 hover:bg-primary/5 transition-all text-foreground font-medium no-underline"
            >
              Browse AI for Data Extraction <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="/go/amplemarket"
              target="_blank"
              rel="noopener sponsored"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border hover:border-primary/50 hover:bg-primary/5 transition-all text-foreground font-medium no-underline"
            >
              Amplemarket for AI Outbound <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="/go/tidio"
              target="_blank"
              rel="noopener sponsored"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border hover:border-primary/50 hover:bg-primary/5 transition-all text-foreground font-medium no-underline"
            >
              Tidio Lyro for Live Conversion <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Main Directory List */}
      <main className="container mx-auto px-4 py-12 border-b border-border">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24">
              <FilterSidebar />
            </div>
          </aside>

          <div className="col-span-1 lg:col-span-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <h2 className="font-heading font-bold text-2xl text-foreground">
                {searchParam
                  ? `Search results${categoryParam ? ` in ${categoryParam}` : ""}`
                  : categoryParam
                    ? `${categoryParam} Tools`
                    : "All Tools"}
              </h2>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Sort by:</span>
                <Button variant="outline" size="sm" className="h-8 gap-2">
                  Recommended <ArrowUpDown className="w-3 h-3" />
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              {filteredSoftware.length > 0 ? (
                filteredSoftware.map((software) => (
                  <SoftwareCard key={software.id} software={software} />
                ))
              ) : (
                <div className="p-12 text-center bg-card rounded-xl border border-dashed border-border">
                  <p className="text-muted-foreground">
                    {searchParam ? "No tools match your search." : "No tools in this category yet."}
                  </p>
                  <Button variant="link" onClick={() => (window.location.href = "/")}>
                    View all tools
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Featured Tools */}
      <section className="container mx-auto px-4 py-12 border-b border-border">
        <div className="flex items-center gap-2 mb-8">
          <Sparkles className="w-5 h-5 text-primary" />
          <h2 className="font-heading font-bold text-2xl text-foreground">Featured Tools</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      {/* Browse by Category */}
      <section className="container mx-auto px-4 py-12 border-b border-border">
        <div className="flex items-center gap-2 mb-8">
          <LayoutGrid className="w-5 h-5 text-primary" />
          <h2 className="font-heading font-bold text-2xl text-foreground">Browse by Category</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CATEGORIES.map((category) => {
            const count = toolsByCategory(category).length;
            return (
              <Link
                key={category}
                href={`/?category=${categorySlug(category)}`}
                className="group p-6 bg-card border border-border rounded-xl hover:border-primary/40 hover:shadow-lg transition-all flex items-center justify-between no-underline"
              >
                <span className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                  {category}
                </span>
                <span className="text-sm text-muted-foreground">{count} tools</span>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </Link>
            );
          })}
        </div>
      </section>

      {/* Blog & Resources */}
      <section className="container mx-auto px-4 py-12 border-b border-border">
        <div className="flex items-center gap-2 mb-8">
          <BookOpen className="w-5 h-5 text-primary" />
          <h2 className="font-heading font-bold text-2xl text-foreground">Blog & Resources</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {blogPreview.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
        <div className="text-center">
          <Link href="/blog">
            <Button variant="outline" className="gap-2 border-primary text-primary hover:bg-primary/10 hover:border-primary">
              View all articles <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
