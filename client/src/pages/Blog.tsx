import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BLOG_POSTS } from "@/lib/blogPosts";
import { BlogCard } from "@/components/ui/BlogCard";
import { SEO } from "@/components/layout/SEO";
import { CLONE_CONFIG } from "@/lib/config";

export default function Blog() {
  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      <SEO
        title="Blog & Resources 2026"
        description="Actionable AI guides: pricing, vs. comparisons, tool reviews. Scale with HeyGen, ElevenLabs, Surfer. Compare and build your stack today."
        canonical="/blog"
      />
      <Navbar />

      <main className="container mx-auto px-4 py-12 flex-grow">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-6 tracking-tight">
              Blog & Resources
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              In-depth, SEO-optimized guides on the AI tools and strategies that help teams scale. Growth-focused and updated for 2026.
            </p>
          </div>

          {BLOG_POSTS.some((p) => p.pillar) && (
            <section className="mb-12">
              <h2 className="font-heading font-bold text-2xl text-foreground mb-6">Pillar</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {BLOG_POSTS.filter((p) => p.pillar).map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            </section>
          )}
          {BLOG_POSTS.some((p) => p.featured && !p.pillar) && (
            <section className="mb-12">
              <h2 className="font-heading font-bold text-2xl text-foreground mb-6">Featured</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {BLOG_POSTS.filter((p) => p.featured && !p.pillar).map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            </section>
          )}
          <section>
            {(BLOG_POSTS.some((p) => p.featured) || BLOG_POSTS.some((p) => p.pillar)) && BLOG_POSTS.some((p) => !p.featured && !p.pillar) && (
              <h2 className="font-heading font-bold text-2xl text-foreground mb-6 mt-4">All Articles</h2>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {BLOG_POSTS.filter((p) => !p.featured && !p.pillar).map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
