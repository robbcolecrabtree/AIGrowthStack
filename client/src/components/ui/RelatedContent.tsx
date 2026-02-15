import { Link } from "wouter";
import { FileText, Layout } from "lucide-react";
import {
  getRelatedContentForTool,
  getRelatedContentForTools,
} from "@/lib/mockData";

interface RelatedContentProps {
  currentToolId?: string;
  relatedToolIds?: string[];
  excludeId?: string;
}

export function RelatedContent({
  currentToolId,
  relatedToolIds,
  excludeId,
}: RelatedContentProps) {
  const related = currentToolId
    ? getRelatedContentForTool(currentToolId)
    : relatedToolIds
      ? getRelatedContentForTools(relatedToolIds, excludeId ? [excludeId] : [])
      : [];

  if (related.length === 0) return null;

  return (
    <section className="mt-8 pt-8 border-t border-border">
      <h2 className="font-heading font-bold text-xl mb-4 flex items-center gap-2 text-foreground">
        <FileText className="w-5 h-5 text-primary" />
        Actionable Resources & Guides
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {related.map((item) => {
          const href = item.type === "blog" ? `/blog/${item.slug}` : `/resources/${item.slug}`;
          return (
            <Link
              key={item.id}
              href={href}
              className="group flex flex-col p-4 rounded-xl border border-border bg-card hover:border-primary/40 hover:shadow-md transition-all duration-200 no-underline"
            >
              <span className="inline-flex items-center gap-1.5 w-fit mb-2">
                {item.type === "blog" ? (
                  <FileText className="w-3.5 h-3.5 text-primary" />
                ) : (
                  <Layout className="w-3.5 h-3.5 text-primary" />
                )}
                <span className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-xs font-bold uppercase tracking-wide">
                  {item.type}
                </span>
              </span>
              <span className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                {item.title}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
