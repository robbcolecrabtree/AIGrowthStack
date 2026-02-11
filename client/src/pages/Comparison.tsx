import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { mockSoftware, Software } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Check, X, ArrowLeft, Plus, Search, Trash2 } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function getInitialSelectedIds(): string[] {
  if (typeof window === "undefined") return mockSoftware.slice(0, 2).map((s) => s.id);
  const params = new URLSearchParams(window.location.search);
  const withId = params.get("with");
  if (withId && mockSoftware.some((s) => s.id.toLowerCase() === withId.toLowerCase())) {
    const found = mockSoftware.find((s) => s.id.toLowerCase() === withId.toLowerCase());
    return found ? [found.id] : mockSoftware.slice(0, 2).map((s) => s.id);
  }
  return mockSoftware.slice(0, 2).map((s) => s.id);
}

export default function Comparison() {
  const [selectedIds, setSelectedIds] = useState<string[]>(getInitialSelectedIds);

  const selectedSoftware = selectedIds
    .map((id) => mockSoftware.find((s) => s.id === id))
    .filter(Boolean) as Software[];

  const handleAdd = (id: string) => {
    if (selectedIds.length < 4 && !selectedIds.includes(id)) {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleRemove = (id: string) => {
    setSelectedIds(selectedIds.filter((i) => i !== id));
  };

  const availableSoftware = mockSoftware.filter(
    (s) => !selectedIds.includes(s.id)
  );

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      <Navbar />

      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4">
              <ArrowLeft className="w-4 h-4 mr-1" /> Back to Directory
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="font-heading font-bold text-3xl text-foreground">Compare AI Tools</h1>
              <p className="text-muted-foreground font-medium max-w-2xl">
                Compare up to 4 AI tools side-by-side. We evaluate features, pricing, and ease of use so you can choose the right fit for your stack.
              </p>
            </div>
            
            {selectedIds.length < 4 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="gap-2 shadow-sm">
                    <Plus className="w-4 h-4" /> Add Software to Compare
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 bg-card border-border">
                  <div className="p-2 relative border-b border-border mb-1">
                    <Search className="absolute left-3 top-3 h-3.5 w-3.5 text-muted-foreground" />
                    <input 
                      className="w-full bg-secondary/50 rounded-md py-1.5 pl-8 text-xs text-foreground border-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground"
                      placeholder="Search tools..."
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                  {availableSoftware.map((s) => (
                    <DropdownMenuItem 
                      key={s.id} 
                      onClick={() => handleAdd(s.id)}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <img
                        src={s.logo}
                        alt=""
                        className="w-5 h-5 object-contain"
                        onError={(e) => {
                          const t = e.target as HTMLImageElement;
                          if (t.src && !t.src.includes("ui-avatars.com")) {
                            t.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(s.name)}&background=random`;
                          }
                        }}
                      />
                      <span className="text-sm font-medium">{s.name}</span>
                    </DropdownMenuItem>
                  ))}
                  {availableSoftware.length === 0 && (
                    <div className="p-4 text-center text-xs text-muted-foreground">
                      No more vendors available
                    </div>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>

        <div className="prose prose-invert max-w-none mb-12 p-8 bg-card border border-border rounded-2xl shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-foreground">How We Compare</h2>
          <p className="text-muted-foreground mb-4">
            We combine hands-on testing with user feedback to compare features, pricing, and real-world usability. Our goal is to help you pick the right AI tools for your workflow.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div>
              <h4 className="font-bold text-primary text-sm mb-2 uppercase">Features & Integrations</h4>
              <p className="text-xs text-muted-foreground italic text-pretty">We check what each tool can do out of the box and how well it fits into existing stacks.</p>
            </div>
            <div>
              <h4 className="font-bold text-primary text-sm mb-2 uppercase">Pricing & Value</h4>
              <p className="text-xs text-muted-foreground italic text-pretty">Transparent comparison of plans and pricing so you can budget with confidence.</p>
            </div>
            <div>
              <h4 className="font-bold text-primary text-sm mb-2 uppercase">Ease of Use</h4>
              <p className="text-xs text-muted-foreground italic text-pretty">We rate setup time, learning curve, and day-to-day usability from a team perspective.</p>
            </div>
          </div>
        </div>

        {selectedSoftware.length === 0 ? (
          <div className="bg-card rounded-2xl border-2 border-dashed border-border p-12 text-center">
            <div className="max-w-xs mx-auto">
              <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-bold text-lg text-foreground mb-2">No tools selected</h3>
              <p className="text-sm text-muted-foreground mb-6">Select at least one tool to start your comparison.</p>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="lg">Choose Software</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="w-64">
                   {mockSoftware.map((s) => (
                    <DropdownMenuItem key={s.id} onClick={() => handleAdd(s.id)} className="gap-2 cursor-pointer">
                       <img
                      src={s.logo}
                      alt=""
                      className="w-5 h-5 object-contain"
                      onError={(e) => {
                        const t = e.target as HTMLImageElement;
                        if (t.src && !t.src.includes("ui-avatars.com")) {
                          t.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(s.name)}&background=random`;
                        }
                      }}
                    />
                       {s.name}
                    </DropdownMenuItem>
                   ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ) : (
          <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="w-[200px] bg-slate-50/80 font-bold text-slate-900 sticky left-0 z-10 border-r">Feature</TableHead>
                    {selectedSoftware.map(software => (
                      <TableHead key={software.id} className="min-w-[220px] text-center bg-slate-50/30 group relative">
                        <button 
                          onClick={() => handleRemove(software.id)}
                          className="absolute top-2 right-2 p-1 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-all opacity-0 group-hover:opacity-100"
                          title="Remove from comparison"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <div className="flex flex-col items-center py-6 px-4">
                          <div className="w-16 h-16 bg-card rounded-xl border border-border shadow-sm flex items-center justify-center p-2 mb-4">
                            <img
                            src={software.logo}
                            alt={software.name}
                            className="max-w-full max-h-full object-contain"
                            onError={(e) => {
                              const t = e.target as HTMLImageElement;
                              if (t.src && !t.src.includes("ui-avatars.com")) {
                                t.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(software.name)}&background=random`;
                              }
                            }}
                          />
                          </div>
                          <span className="font-bold text-foreground text-lg mb-1">{software.name}</span>
                          {software.verified && (
                            <div className="flex items-center gap-1 mb-2">
                              <Check className="w-3.5 h-3.5 text-accent" />
                              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Verified</span>
                            </div>
                          )}
                          <div className="flex flex-col gap-2 w-full">
                            <Link href={`/product/${software.id}`} className="w-full">
                              <Button size="sm" variant="outline" className="w-full text-xs h-9">Review</Button>
                            </Link>
                            <a href={`/go/${software.id}`}>
                              <Button size="sm" className="w-full text-xs h-9 shadow-sm">Visit Tool</Button>
                            </a>
                          </div>
                        </div>
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="group">
                    <TableCell className="font-semibold bg-secondary/50 text-foreground sticky left-0 border-r border-border">Rating</TableCell>
                    {selectedSoftware.map(s => (
                      <TableCell key={s.id} className="text-center">
                        <div className="flex flex-col items-center">
                          <span className="font-extrabold text-2xl text-foreground">{s.rating}</span>
                          <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-tighter">{s.reviewCount} reviews</span>
                        </div>
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-semibold bg-secondary/50 text-foreground sticky left-0 border-r border-border">Starting Price</TableCell>
                    {selectedSoftware.map(s => (
                      <TableCell key={s.id} className="text-center">
                        <div className="font-bold text-lg text-foreground">
                          {s.startingPrice === 0 ? "Free / Quote" : `$${s.startingPrice}`}
                        </div>
                        <div className="text-[10px] text-muted-foreground font-medium">{s.priceModel}</div>
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-semibold bg-secondary/50 text-foreground sticky left-0 border-r border-border">Category</TableCell>
                    {selectedSoftware.map(s => (
                      <TableCell key={s.id} className="text-center">
                        <div className="flex flex-wrap justify-center gap-1">
                          {s.categories.slice(0, 2).map(cat => (
                            <span key={cat} className="px-2 py-0.5 bg-primary/10 text-primary border border-primary/20 rounded text-[9px] font-bold">
                              {cat}
                            </span>
                          ))}
                        </div>
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-semibold bg-secondary/50 text-foreground sticky left-0 border-r border-border">Deployment</TableCell>
                    {selectedSoftware.map(s => (
                      <TableCell key={s.id} className="text-center font-medium text-foreground text-sm">
                        {s.deploymentTime}
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-semibold bg-secondary/50 text-foreground sticky left-0 border-r border-border">Support</TableCell>
                    {selectedSoftware.map(s => (
                      <TableCell key={s.id} className="text-center">
                        <span className="px-2 py-1 rounded-full text-[10px] font-bold bg-secondary text-foreground">
                          {s.supportLevel}
                        </span>
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-semibold bg-secondary/50 text-foreground sticky left-0 border-r border-border">Automation Score</TableCell>
                    {selectedSoftware.map(s => (
                      <TableCell key={s.id} className="text-center">
                        <div className="flex flex-col items-center gap-1">
                          <div className="w-full bg-secondary h-1.5 rounded-full overflow-hidden max-w-[80px]">
                            <div className="bg-primary h-full rounded-full" style={ { width: `${s.automationScore}%` } }></div>
                          </div>
                          <span className="text-xs font-bold text-foreground">{s.automationScore}%</span>
                        </div>
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                     <TableCell className="font-semibold bg-secondary/50 text-foreground sticky left-0 border-r border-border">Key Features</TableCell>
                     {selectedSoftware.map(s => (
                      <TableCell key={s.id} className="text-center">
                        <div className="flex flex-wrap justify-center gap-1">
                          {s.features.slice(0, 2).map(f => (
                            <span key={f} className="px-2 py-0.5 bg-primary/10 text-primary rounded text-[9px] font-bold">{f}</span>
                          ))}
                        </div>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
