import { Software } from "@/lib/mockData";
import { hexToRgba, getAccentTintOpacity } from "@/lib/utils";
import { Star, Check, ChevronRight, ArrowRight, BadgeCheck } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface SoftwareCardProps {
  software: Software;
}

export function SoftwareCard({ software }: SoftwareCardProps) {
  const goUrl = `/go/${software.id}`;
  const isAccentCard = !!software.cardAccent;

  return (
    <div
      className={`group relative rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden ${
        !isAccentCard ? "bg-card border border-border/50 hover:border-primary/30" : "text-zinc-100 [&_.text-muted-foreground]:text-zinc-400 [&_.text-primary]:text-white"
      }`}
      style={
        isAccentCard && software.cardAccent
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
      {software.badge && (
        <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg z-10">
          {software.badge}
        </div>
      )}

      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0">
            <div className="w-20 h-20 rounded-lg bg-secondary/50 border border-border flex items-center justify-center p-2">
              <img
                src={software.logo}
                alt={`${software.name} Logo`}
                className={`max-w-full max-h-full object-contain ${isAccentCard && ["#000000", "#00002C", "#1B2F4A"].includes(software.cardAccent ?? "") ? "invert" : ""}`}
                onError={(e) => {
                  const t = e.target as HTMLImageElement;
                  if (t.src && !t.src.includes("ui-avatars.com")) {
                    t.src = software.id === "v0"
                      ? "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
                      : `https://ui-avatars.com/api/?name=${encodeURIComponent(software.name)}&background=random`;
                  }
                }}
              />
            </div>
            <div className="mt-3 flex flex-col items-center">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="font-bold text-lg">{software.rating}</span>
              </div>
              <span className="text-xs text-muted-foreground">{software.reviewCount} reviews</span>
            </div>
          </div>

          <div className="flex-grow">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-2 mb-2">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <Link
                    href={`/product/${software.id}`}
                    className="font-heading font-bold text-xl text-foreground hover:text-primary transition-colors flex items-center gap-2 group-hover:underline decoration-primary/50 underline-offset-4"
                  >
                    {software.name}
                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                  </Link>
                  {software.verified && (
                    <span className="inline-flex items-center gap-1 text-accent" title="Vetted by our team">
                      <BadgeCheck className="w-4 h-4" />
                      <span className="text-xs font-medium">Verified</span>
                    </span>
                  )}
                </div>
                <p className="text-sm font-medium text-primary mb-1">{software.tagline}</p>
              </div>
              <div className="text-right">
                <div className="font-bold text-xl">
                  {software.startingPrice === 0 ? "Free / Quote" : `$${software.startingPrice}`}
                </div>
                <div className="text-xs text-muted-foreground">{software.priceModel}</div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{software.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 mb-4">
              {software.pros.slice(0, 2).map((pro, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                  <Check className="w-3.5 h-3.5 text-accent mt-0.5 flex-shrink-0" />
                  <span>{pro}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {software.categories.slice(0, 3).map((cat) => (
                <Badge key={cat} variant="secondary" className="text-xs font-normal">
                  {cat}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-secondary/30 border-t border-border px-6 py-3 flex flex-col sm:flex-row justify-between items-center gap-3">
        <Link
          href={`/product/${software.id}`}
          className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
        >
          Read Full Review <ArrowRight className="w-3 h-3" />
        </Link>
        <div className="flex gap-3 w-full sm:w-auto">
          <Link href="/compare">
            <Button variant="ghost" size="sm" className="w-full sm:w-auto text-xs h-9 cursor-pointer hover:bg-card border border-transparent hover:border-border">
              + Compare
            </Button>
          </Link>
          <a href={goUrl} target="_blank" rel="noopener sponsored">
            <Button size="sm" className="w-full sm:w-auto h-9 gap-2 shadow-sm font-bold bg-primary hover:bg-primary/90">
              Visit Tool <ChevronRight className="w-3.5 h-3.5" />
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
