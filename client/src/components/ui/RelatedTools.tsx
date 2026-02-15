import { Link } from "wouter";
import { mockSoftware } from "@/lib/mockData";
import { Sparkles } from "lucide-react";

interface RelatedToolsProps {
  relatedToolIds: string[];
}

export function RelatedTools({ relatedToolIds }: RelatedToolsProps) {
  const tools = relatedToolIds
    .map((id) => mockSoftware.find((s) => s.id === id))
    .filter(Boolean);

  if (tools.length === 0) return null;

  return (
    <section className="mt-8 pt-8 border-t border-border">
      <h2 className="font-heading font-bold text-xl mb-4 flex items-center gap-2 text-foreground">
        <Sparkles className="w-5 h-5 text-primary" />
        Related Tools
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {tools.map((tool) => (
          <Link
            key={tool.id}
            href={`/product/${tool.id}`}
            className="group flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:border-primary/40 hover:shadow-md transition-all duration-200 no-underline"
          >
            <img
              src={tool.logo}
              alt={tool.name}
              className="w-10 h-10 object-contain rounded-lg"
              onError={(e) => {
                const t = e.target as HTMLImageElement;
                if (t.src && !t.src.includes("ui-avatars.com")) {
                  t.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(tool.name)}&background=random`;
                }
              }}
            />
            <div className="flex-1 min-w-0">
              <span className="font-semibold text-foreground group-hover:text-primary transition-colors block truncate">
                {tool.name}
              </span>
              <span className="text-xs text-muted-foreground">View profile →</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
