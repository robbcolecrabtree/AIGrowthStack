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
        title={`Blog & Resources | ${CLONE_CONFIG.siteName}`}
        description="High-authority guides on the AI growth stack: scaling with AI tools, video, voice, SEO, and automation. Expert, growth-focused articles for 2026."
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {BLOG_POSTS.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
