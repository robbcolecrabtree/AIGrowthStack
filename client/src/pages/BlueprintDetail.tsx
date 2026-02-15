import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getBlueprintBySlug } from "@/lib/blueprints";
import { getContentRelationBySlug } from "@/lib/mockData";
import { RelatedTools } from "@/components/ui/RelatedTools";
import { RelatedContent } from "@/components/ui/RelatedContent";
import { Link, useRoute } from "wouter";
import NotFound from "./not-found";
import { SEO } from "@/components/layout/SEO";
import { CLONE_CONFIG } from "@/lib/config";
import { ArrowLeft, Copy, Check, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

export default function BlueprintDetail() {
  const [match, params] = useRoute("/resources/:slug");
  const [copied, setCopied] = useState(false);

  if (!match || !params?.slug) return <NotFound />;

  const blueprint = getBlueprintBySlug(params.slug);
  if (!blueprint) return <NotFound />;

  const Icon = blueprint.icon;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(blueprint.copyableContent);
      setCopied(true);
      toast({
        title: (
          <span className="flex items-center gap-2 text-white">
            <Check className="w-4 h-4 shrink-0 text-[#E4FE65]" />
            Copied!
          </span>
        ),
        variant: "success",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({ title: "Failed to copy", variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      <SEO
        title={`${blueprint.title} | ${CLONE_CONFIG.siteName}`}
        description={blueprint.description}
        canonical={`/resources/${blueprint.slug}`}
      />
      <Navbar />

      <main className="container mx-auto px-4 py-12 flex-grow">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/resources"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" /> Back to Resources
          </Link>

          <article className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
            <header className="p-8 md:p-12 border-b border-border bg-secondary/30">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wide">
                  {blueprint.type}
                </span>
              </div>
              <h1 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4 leading-tight">
                {blueprint.title}
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {blueprint.description}
              </p>
            </header>

            <div className="p-8 md:p-12 space-y-10">
              {/* Copy to Clipboard */}
              <section>
                <h2 className="font-heading font-bold text-xl text-foreground mb-3">
                  {blueprint.copyableLabel}
                </h2>
                <div className="relative rounded-xl border border-border bg-secondary/30 overflow-hidden">
                  <pre className="p-4 md:p-6 text-sm text-muted-foreground overflow-x-auto font-mono whitespace-pre-wrap">
                    {blueprint.copyableContent}
                  </pre>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopy}
                    className="absolute top-3 right-3 gap-2"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-green-500" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" /> {blueprint.copyableLabel}
                      </>
                    )}
                  </Button>
                </div>
              </section>

              {/* How to Use */}
              <section>
                <h2 className="font-heading font-bold text-xl text-foreground mb-6">
                  How to Use
                </h2>
                <ol className="space-y-6">
                  {blueprint.howToUseSteps.map((step) => (
                    <li key={step.step} className="flex gap-4">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 text-primary font-bold text-sm flex items-center justify-center">
                        {step.step}
                      </span>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">{step.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">{step.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>

              {/* Primary Action */}
              <section className="pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground mb-4">
                  Ready to use this blueprint? Get started with {blueprint.toolName} below.
                </p>
                <a
                  href={blueprint.affiliateUrl}
                  target="_blank"
                  rel="noopener sponsored"
                  className="inline-flex"
                >
                  <Button size="lg" className="gap-2">
                    Visit {blueprint.toolName} <ExternalLink className="w-4 h-4" />
                  </Button>
                </a>
                <p className="text-xs text-muted-foreground mt-8 italic">
                  As an affiliate, we may earn a commission if you purchase through this link at no extra cost to you.
                </p>
              </section>

              {(() => {
                const relation = getContentRelationBySlug(blueprint.slug);
                const toolIds = relation?.relatedToolIds ?? [];
                return (
                  <>
                    <RelatedTools relatedToolIds={toolIds} />
                    <RelatedContent
                      relatedToolIds={toolIds}
                      excludeId={blueprint.id}
                    />
                  </>
                );
              })()}
            </div>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
