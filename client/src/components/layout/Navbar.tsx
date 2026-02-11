import { Link, useLocation, useSearchParams } from "wouter";
import { Search, Sparkles } from "lucide-react";
import { CLONE_CONFIG } from "@/lib/config";
import { useState, useEffect } from "react";

export function Navbar() {
  const [location, setLocation] = useLocation();
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const urlSearch = typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("search") : searchParams.get("search");
  useEffect(() => {
    setSearchQuery(urlSearch || "");
  }, [urlSearch]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (q) {
      setLocation("/?search=" + encodeURIComponent(q));
    } else {
      setLocation("/");
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/90 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative h-10 w-10 flex items-center justify-center">
            <div className="absolute inset-0 bg-primary/20 rounded-xl rotate-3 group-hover:rotate-6 transition-transform"></div>
            <div className="absolute inset-0 bg-primary rounded-lg -rotate-3 group-hover:rotate-0 transition-transform shadow-sm flex items-center justify-center text-primary-foreground">
              <Sparkles className="w-6 h-6" />
            </div>
          </div>
          <div className="flex flex-col -space-y-1.5 ml-1">
            <span className="font-heading font-black text-xl tracking-tight text-foreground">{CLONE_CONFIG.logoText}</span>
            <div className="flex items-center gap-1">
              <span className="text-[9px] font-black tracking-[0.3em] text-primary">DIRECTORY</span>
              <div className="h-[1px] w-4 bg-primary/30"></div>
            </div>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className={`text-sm font-semibold transition-all hover:text-primary relative py-1 ${location === '/' ? 'text-primary after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-primary after:rounded-full' : 'text-muted-foreground'}`}>
            Directory
          </Link>
          <Link href="/compare" className={`text-sm font-semibold transition-all hover:text-primary relative py-1 ${location === '/compare' ? 'text-primary after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-primary after:rounded-full' : 'text-muted-foreground'}`}>
            Compare
          </Link>
          <Link href="/categories" className={`text-sm font-semibold transition-all hover:text-primary relative py-1 ${location === '/categories' ? 'text-primary after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-primary after:rounded-full' : 'text-muted-foreground'}`}>
            Categories
          </Link>
          <Link href="/blog" className={`text-sm font-semibold transition-all hover:text-primary relative py-1 ${location.startsWith('/blog') ? 'text-primary after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-primary after:rounded-full' : 'text-muted-foreground'}`}>
            Blog
          </Link>
          <Link href="/resources" className={`text-sm font-semibold transition-all hover:text-primary relative py-1 ${location.startsWith('/resources') ? 'text-primary after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-primary after:rounded-full' : 'text-muted-foreground'}`}>
            Resources
          </Link>
        </div>

        <div className="flex items-center gap-4 ml-4">
          <form onSubmit={handleSearchSubmit} className="relative hidden lg:block">
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
            <input
              type="search"
              placeholder="Search tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-8 w-40 rounded-full border border-input bg-secondary/50 px-8 py-1 text-xs text-foreground placeholder:text-muted-foreground shadow-sm transition-all focus:w-56 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              aria-label="Search tools"
            />
          </form>
        </div>
      </div>
    </nav>
  );
}
