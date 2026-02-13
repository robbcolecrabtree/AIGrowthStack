import { Software } from "@/lib/mockData";
import { hexToRgba, getAccentTintOpacity } from "@/lib/utils";
import { Star, BadgeCheck, ArrowRight, Lightbulb } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ToolCardProps {
  tool: Software;
}

export function ToolCard({ tool }: ToolCardProps) {
  const goUrl = `/go/${tool.id}`;
  const isAccentCard = !!tool.cardAccent;

  return (
    <div
      className={`group relative rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col ${
        !isAccentCard ? "bg-card border border-border/60 hover:border-primary/40" : "text-zinc-100 [&_.text-muted-foreground]:text-zinc-400"
      }`}
      style={
        isAccentCard && tool.cardAccent
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
      {tool.badge && (
        <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-bold px-3 py-1 rounded-bl-lg z-10 uppercase tracking-wide">
          {tool.badge}
        </div>
      )}

      <div className="p-4 flex-1 flex flex-col gap-3">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-secondary/60 border border-border flex items-center justify-center p-1.5">
            <img
              src={tool.logo}
              alt={`${tool.name} Logo`}
              className={`max-w-full max-h-full object-contain ${isAccentCard && ["#000000", "#00002C", "#1B2F4A"].includes(tool.cardAccent ?? "") ? "invert" : ""}`}
              onError={(e) => {
                const t = e.target as HTMLImageElement;
                if (t.src && !t.src.includes("ui-avatars.com")) {
                  t.src = tool.id === "v0"
                    ? "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
                    : `https://ui-avatars.com/api/?name=${encodeURIComponent(tool.name)}&background=random`;
                }
              }}
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-1.5 mb-1">
              <Link
                href={`/product/${tool.id}`}
                className="font-heading font-semibold text-sm text-foreground hover:text-primary transition-colors"
              >
                {tool.name}
              </Link>
              {tool.verified && (
                <BadgeCheck className="w-3.5 h-3.5 text-accent" title="Verified by our team" />
              )}
            </div>
            <p className="text-[11px] text-muted-foreground line-clamp-2">
              {tool.shortReview}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 text-[11px]">
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="font-semibold">{tool.rating}</span>
            <span className="text-muted-foreground">/ 5</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Badge variant="secondary" className="px-2 py-0.5 text-[10px] font-normal">
              {tool.category}
            </Badge>
          </div>
        </div>

        <div className="mt-2 rounded-lg bg-secondary/50 border border-border px-3 py-2 flex items-start gap-2">
          <Lightbulb className="w-3.5 h-3.5 text-accent mt-0.5 flex-shrink-0" />
          <div className="text-[11px] leading-snug text-muted-foreground">
            <span className="font-semibold text-foreground">Pro Tip: </span>
            {tool.proTip}
          </div>
        </div>
      </div>

      <div className="px-4 pb-4 pt-2 flex items-center justify-between gap-2 border-t border-border/60 bg-secondary/40">
        <Link
          href={`/product/${tool.id}`}
          className="text-[11px] font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
        >
          Review <ArrowRight className="w-3 h-3" />
        </Link>
        <a href={goUrl} target="_blank" rel="noopener sponsored">
          <Button size="sm" className="h-7 px-3 text-[11px]">
            Visit Tool
          </Button>
        </a>
      </div>
    </div>
  );
}

