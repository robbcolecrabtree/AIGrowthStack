import { Link } from "wouter";
import { ArrowRight, Clock, Tag } from "lucide-react";
import type { BlogPost } from "@/lib/blogPosts";

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all hover:-translate-y-0.5 no-underline"
    >
      <div className="p-6 flex-grow flex flex-col">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wide">
            {post.category}
          </span>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" /> {post.readTime}
          </span>
        </div>
        <h3 className="font-heading font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
          {post.title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 flex-grow">
          {post.excerpt}
        </p>
        <span className="text-primary text-sm font-medium mt-4 inline-flex items-center gap-1">
          Read article <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </span>
      </div>
    </Link>
  );
}
