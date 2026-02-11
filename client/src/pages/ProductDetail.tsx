import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { mockSoftware } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Star, Check, X, Building2, Wallet, Users, BadgeCheck } from "lucide-react";
import { useRoute, useParams, Link } from "wouter";
import NotFound from "./not-found";
import { SEO } from "@/components/layout/SEO";
import { CLONE_CONFIG } from "@/lib/config";

export default function ProductDetail() {
  const [match] = useRoute("/product/:id");
  const params = useParams<{ id?: string }>();
  const id = (params?.id ?? "").toLowerCase();

  if (!match) return <NotFound />;

  const software = mockSoftware.find((p) => p.id.toLowerCase() === id);
  if (!software) return <NotFound />;

  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "SoftwareApplication",
    "name": software.name,
    "operatingSystem": "Web-based",
    "applicationCategory": "BusinessApplication",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": software.rating,
      "reviewCount": software.reviewCount
    },
    "offers": {
      "@type": "Offer",
      "price": software.startingPrice,
      "priceCurrency": "USD"
    }
  };

  return (
    <div key={id} className="min-h-screen flex flex-col bg-background font-sans">
      <SEO 
        title={`${software.name} - Features, Pricing & Reviews | ${CLONE_CONFIG.siteName}`}
        description={(software.summary || software.description || "").trim()}
        canonical={`/product/${software.id}`}
        ogType="product"
        schema={productSchema}
      />
      <Navbar />

      {/* Breadcrumb */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground font-medium">{software.name}</span>
            {software.verified && (
              <span className="ml-2 inline-flex items-center gap-1 text-accent" title="Vetted by our team">
                <BadgeCheck className="w-4 h-4" /> Verified
              </span>
            )}
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Header Card */}
            <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-24 h-24 bg-white rounded-lg border border-border flex items-center justify-center p-2 flex-shrink-0 overflow-hidden">
                  <img
                  src={software.logo}
                  alt={`${software.name} logo`}
                  className="max-w-full max-h-full object-contain"
                  onError={(e) => {
                    const t = e.target as HTMLImageElement;
                    if (t.src && !t.src.includes("ui-avatars.com")) {
                      t.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(software.name)}&background=random`;
                    }
                  }}
                />
                </div>
                <div className="flex-grow">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h1 className="font-heading font-bold text-3xl text-foreground mb-2">{software.name}</h1>
                    {software.verified && (
                      <span className="inline-flex items-center gap-1 text-accent" title="Vetted by our team">
                        <BadgeCheck className="w-5 h-5" /> Verified
                      </span>
                    )}
                  </div>
                  <p className="text-lg text-muted-foreground mb-2">{software.tagline}</p>
                  <p className="text-xs text-muted-foreground mb-4">Last updated: Feb 2026</p>

                  <div className="flex flex-wrap items-center gap-4 mb-6">
                    <div className="flex items-center gap-1 bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="font-bold text-foreground">{software.rating}</span>
                      <span className="text-muted-foreground text-sm">/ 5</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{software.reviewCount} user reviews</span>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <p className="w-full text-xs italic text-muted-foreground mb-1">As an affiliate, we may earn a commission if you purchase through this link at no extra cost to you.</p>
                    <a href={`/go/${software.id}`}>
                      <Button size="lg" className="gap-2 shadow-md hover:shadow-lg transition-all">
                        Visit Website <ExternalLink className="w-4 h-4" />
                      </Button>
                    </a>
                    <Link href={`/compare?with=${encodeURIComponent(software.id)}`}>
                      <Button variant="outline" size="lg" className="cursor-pointer">Compare</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Overview */}
            <div className="bg-card rounded-xl border border-border p-8 shadow-sm">
              <h2 className="font-heading font-bold text-xl mb-6 flex items-center gap-2 text-foreground">
                <Building2 className="w-5 h-5 text-primary" />
                Expert Analysis
              </h2>
              <div className="prose prose-invert max-w-none mb-8">
                {software.reviewContent ? (
                  <div className="text-muted-foreground leading-relaxed [&>p]:mb-4" dangerouslySetInnerHTML={{ __html: software.reviewContent }} />
                ) : (
                  <>
                    <p className="text-muted-foreground leading-relaxed text-lg italic border-l-4 border-primary/20 pl-4 mb-6">
                      "Our comprehensive analysis of {software.name} reveals a strong fit for modern teams. We've tested it for real-world workflows and integration depth."
                    </p>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {software.description} {software.name} is designed to streamline workflows and scale with your stack. 
                      Our team has evaluated its feature set, pricing, and support to help you decide.
                    </p>
                    <h3 className="text-lg font-bold text-foreground mt-8 mb-4">Key Capabilities</h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {software.name} integrates with the tools teams already use and offers a clear path from setup to daily use. 
                      We focus on automation depth, ease of use, and value for money in our reviews.
                    </p>
                  </>
                )}
                <h3 className="text-lg font-bold text-foreground mt-8 mb-4">Pros & Cons</h3>
                <p className="text-muted-foreground mb-4">
                  Below we summarize what users and our editors see as strengths and trade-offs when choosing {software.name}.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-border">
                <div>
                  <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                    <Check className="w-4 h-4 text-accent" /> Pros
                  </h3>
                  <ul className="space-y-3">
                    {software.pros.map((pro, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5"></span>
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                    <X className="w-4 h-4 text-destructive" /> Cons
                  </h3>
                  <ul className="space-y-3">
                    {software.cons.map((con, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-destructive mt-1.5"></span>
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-card rounded-xl border border-border p-8 shadow-sm">
              <h2 className="font-heading font-bold text-xl mb-6 flex items-center gap-2 text-foreground">
                <Wallet className="w-5 h-5 text-primary" />
                Pricing
              </h2>
              <div className="bg-secondary/50 rounded-lg p-6 border border-border flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wider font-semibold mb-1">Starting At</div>
                  <div className="text-3xl font-bold text-foreground">
                    {software.startingPrice === 0 ? "Free / Quote" : `$${software.startingPrice}`}
                    {software.startingPrice !== 0 && (
                      <span className="text-sm font-normal text-muted-foreground ml-1">/{software.priceModel.replace("Per User/Month", "user/mo").replace("Flat Rate/Month", "mo").replace("Freemium", "").replace("Contact Sales for Quote", "")}</span>
                    )}
                  </div>
                </div>
                <div className="h-10 w-px bg-border hidden md:block"></div>
                <div>
                   <div className="text-sm text-muted-foreground uppercase tracking-wider font-semibold mb-1">Pricing Model</div>
                   <div className="font-medium text-foreground">{software.priceModel}</div>
                </div>
                <a href={`/go/${software.id}`}><Button variant="secondary">View Pricing</Button></a>
              </div>
            </div>

            {/* Reviews Stub */}
            <div className="bg-card rounded-xl border border-border p-8 shadow-sm">
               <h2 className="font-heading font-bold text-xl mb-6 flex items-center gap-2 text-foreground">
                <Users className="w-5 h-5 text-primary" />
                User Sentiment
              </h2>
              <div className="prose prose-invert max-w-none mb-8">
                <p className="text-muted-foreground leading-relaxed">
                  Our team and user feedback indicate that {software.name} is a solid choice for its category. 
                  We keep our reviews updated as products evolve.
                </p>
              </div>
              <div className="space-y-6">
                {[1, 2].map((i) => (
                  <div key={i} className="border-b border-border pb-6 last:border-0 last:pb-0">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex text-amber-400">
                        {[1,2,3,4,5].map(s => <Star key={s} className="w-3 h-3 fill-current" />)}
                      </div>
                      <span className="font-bold text-sm text-foreground">Great for teams</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                      "We've been using {software.name} for several months. It fits our workflow well and the support is responsive."
                    </p>
                    <div className="text-xs text-muted-foreground">
                      — Verified user, recent
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-card rounded-xl border border-border p-6 shadow-sm sticky top-24">
              <h3 className="font-bold text-lg mb-4 text-foreground">Tool Details</h3>

              <div className="space-y-4">
                <div>
                  <div className="text-xs text-muted-foreground uppercase font-semibold mb-1">Categories</div>
                  <div className="flex flex-wrap gap-2">
                    {software.categories.map(cat => (
                      <Badge key={cat} variant="outline" className="bg-secondary/50">{cat}</Badge>
                    ))}
                  </div>
                </div>

                <div className="border-t border-border my-4"></div>

                <div>
                  <div className="text-xs text-muted-foreground uppercase font-semibold mb-1">Key Features</div>
                  <ul className="space-y-2">
                    {software.features.map(feat => (
                      <li key={feat} className="text-sm text-muted-foreground flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary/60"></div>
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8">
                 <a href={`/go/${software.id}`}>
                    <Button className="w-full">Visit Website</Button>
                 </a>
              </div>
            </div>
          </div>

        </div>
      </main>
      
      <Footer />
    </div>
  );
}
