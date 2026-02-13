import { Link, useLocation, useSearchParams } from "wouter";
import { Search, Sparkles, Menu, X } from "lucide-react";
import { CLONE_CONFIG } from "@/lib/config";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MOBILE_ACTIVE_BORDER = "#A855F7";

const mobileNavLinks = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/categories", label: "Categories" },
  { href: "/resources", label: "Resources" },
];

function isActive(href: string, location: string) {
  if (href === "/") return location === "/";
  return location.startsWith(href);
}

export function Navbar() {
  const [location, setLocation] = useLocation();
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const urlSearch = typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("search") : searchParams.get("search");
  useEffect(() => {
    setSearchQuery(urlSearch || "");
  }, [urlSearch]);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

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
    <>
      <nav className="sticky top-0 z-[100] w-full border-b border-border bg-background/90 backdrop-blur-md">
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
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[99] bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.25, ease: "easeOut" }}
              className="fixed top-0 right-0 bottom-0 z-[100] w-[min(320px,85vw)] bg-background border-l border-border shadow-xl flex flex-col"
            >
              <div className="flex items-center justify-between h-16 px-4 border-b border-border">
                <span className="font-heading font-semibold text-foreground">Menu</span>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="flex flex-col p-4 gap-1">
                {mobileNavLinks.map(({ href, label }) => {
                  const active = isActive(href, location);
                  return (
                    <Link
                      key={href}
                      href={href}
                      className={`text-base font-semibold py-3 px-4 rounded-lg transition-all ${
                        active
                          ? "text-white"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                      }`}
                      style={active ? { borderLeft: `3px solid ${MOBILE_ACTIVE_BORDER}` } : { borderLeft: "3px solid transparent" }}
                    >
                      {label}
                    </Link>
                  );
                })}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
