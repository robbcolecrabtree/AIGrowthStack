import { Check, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockSoftware } from "@/lib/mockData";

const NEXT_STEP_LABEL = "Next Step";
const VOLT_COLOR = "#E4FE65";

export interface ComparisonToolConfig {
  id: string;
  bestFor: string;
  keyFeature: string;
  isTopPick?: boolean;
}

export interface ComparisonTableConfig {
  tools: ComparisonToolConfig[];
  nextStepLabel?: string;
}

export function ComparisonTable({ config }: { config: ComparisonTableConfig | null }) {
  if (!config?.tools?.length) return null;

  const resolvedTools = config.tools.map((c) => {
    const software = mockSoftware.find((s) => s.id === c.id);
    const priceStr =
      software?.startingPrice === 0
        ? "Free"
        : software?.startingPrice
          ? `$${software.startingPrice}/mo`
          : "—";
    return {
      ...c,
      name: software?.name ?? c.id,
      logo: software?.logo ?? "",
      price: priceStr,
      link: `/go/${c.id}`,
      feature: c.keyFeature,
    };
  });

  const tools = resolvedTools;
  const nextStepLabel = config.nextStepLabel ?? "Get Started";

  return (
    <div className="w-full my-12 overflow-visible">
      <div className="relative w-full overflow-x-auto pb-12 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {/* Right-edge fade to signal more content */}
        <div
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-card to-transparent z-[1]"
          aria-hidden
        />
        <div className="min-w-[850px] border border-primary/20 bg-card rounded-xl shadow-xl overflow-visible pt-8">
          <table
            className="min-w-[850px] w-full border-separate table-fixed"
            style={{ borderSpacing: 0 }}
          >
          <colgroup>
            <col style={{ width: "160px" }} />
            {tools.map((t) => (
              <col key={t.id} style={{ width: `calc((100% - 160px) / ${tools.length})` }} />
            ))}
          </colgroup>
          <thead>
            <tr className="bg-muted/30">
              <th className="w-[160px] min-w-[160px] px-3 py-5 text-center font-bold text-muted-foreground bg-muted/30 border-b border-r border-primary/10">
                Feature
              </th>
              {tools.map((tool, i) => (
                <th
                  key={tool.id}
                  className={`relative px-3 py-5 text-center font-bold text-foreground overflow-visible ${
                    tool.isTopPick ? "bg-primary/5 border-l border-r" : "bg-muted/30"
                  } border-b border-primary/10 ${i !== tools.length - 1 && !tool.isTopPick ? "border-r" : ""}`}
                  style={tool.isTopPick ? { borderLeftColor: VOLT_COLOR, borderRightColor: VOLT_COLOR } : undefined}
                >
                  {tool.isTopPick && (
                    <span className="absolute top-0 left-0 right-0 flex justify-center -translate-y-full whitespace-nowrap z-10">
                      <Badge className="bg-[#E4FE65] text-black hover:bg-[#ccff00] border-none px-4 py-1 text-xs font-bold shadow-lg rounded-b-none">
                        TOP PICK
                      </Badge>
                    </span>
                  )}
                  <div className="flex flex-col items-center justify-center gap-2">
                    <div className="h-12 w-12 rounded-lg bg-background flex items-center justify-center shadow-sm border border-primary/10 overflow-hidden">
                      <img
                        src={tool.logo}
                        alt={tool.name}
                        className="h-8 w-8 object-contain"
                        onError={(e) => {
                          const t = e.target as HTMLImageElement;
                          t.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(tool.name)}&background=random`;
                        }}
                      />
                    </div>
                    <span className="font-bold text-lg text-center">{tool.name}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="w-[160px] min-w-[160px] px-3 py-3 text-center text-sm text-muted-foreground bg-muted/10 border-b border-r border-primary/10 font-medium">
                Best For
              </td>
              {tools.map((tool, i) => (
                <td
                  key={tool.id}
                  className={`px-3 py-3 text-center text-sm border-b border-primary/10 ${
                    i !== tools.length - 1 && !tool.isTopPick ? "border-r" : ""
                  } ${tool.isTopPick ? "bg-primary/5 font-medium text-foreground border-l border-r" : "text-muted-foreground bg-card"}`}
                  style={tool.isTopPick ? { borderLeftColor: VOLT_COLOR, borderRightColor: VOLT_COLOR } : undefined}
                >
                  {tool.bestFor}
                </td>
              ))}
            </tr>
            <tr>
              <td className="w-[160px] min-w-[160px] px-3 py-3 text-center text-sm text-muted-foreground bg-muted/10 border-b border-r border-primary/10 font-medium">
                Key Feature
              </td>
              {tools.map((tool, i) => (
                <td
                  key={tool.id}
                  className={`px-3 py-3 text-center text-sm border-b border-primary/10 ${
                    i !== tools.length - 1 && !tool.isTopPick ? "border-r" : ""
                  } ${tool.isTopPick ? "bg-primary/5 border-l border-r" : "bg-card"}`}
                  style={tool.isTopPick ? { borderLeftColor: VOLT_COLOR, borderRightColor: VOLT_COLOR } : undefined}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Check className="w-4 h-4 text-primary shrink-0" />
                    <span>{tool.feature}</span>
                  </div>
                </td>
              ))}
            </tr>
            <tr>
              <td className="w-[160px] min-w-[160px] px-3 py-3 text-center text-sm text-muted-foreground bg-muted/10 border-b border-r border-primary/10 font-medium">
                Pricing
              </td>
              {tools.map((tool, i) => (
                <td
                  key={tool.id}
                  className={`px-3 py-3 text-center font-bold border-b border-primary/10 ${
                    i !== tools.length - 1 && !tool.isTopPick ? "border-r" : ""
                  } ${tool.isTopPick ? "bg-primary/5 text-primary border-l border-r" : "bg-card text-muted-foreground"}`}
                  style={tool.isTopPick ? { borderLeftColor: VOLT_COLOR, borderRightColor: VOLT_COLOR } : undefined}
                >
                  {tool.price}
                </td>
              ))}
            </tr>
            <tr>
              <td className="w-[160px] min-w-[160px] px-3 py-3 text-center text-sm text-muted-foreground bg-muted/10 border-r border-primary/10 font-medium">
                {NEXT_STEP_LABEL}
              </td>
              {tools.map((tool, i) => (
                <td
                  key={tool.id}
                  className={`px-3 py-3 text-center border-primary/10 ${
                    i !== tools.length - 1 && !tool.isTopPick ? "border-r" : ""
                  } ${tool.isTopPick ? "bg-primary/5 border-l border-r" : "bg-card"}`}
                  style={tool.isTopPick ? { borderLeftColor: VOLT_COLOR, borderRightColor: VOLT_COLOR } : undefined}
                >
                  <Button
                    variant="outline"
                    className={
                      tool.isTopPick
                        ? "bg-[#E4FE65] text-black hover:bg-[#ccff00] font-bold shadow-md w-full transition-transform hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(228,254,101,0.4)] border-[#E4FE65]"
                        : "w-full border-2 border-primary/40 text-foreground hover:bg-primary/10 hover:border-primary/60 transition-transform hover:-translate-y-0.5 hover:shadow-lg"
                    }
                    asChild
                  >
                    <a
                      href={tool.link}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="flex items-center justify-center gap-2"
                    >
                      {nextStepLabel} <ExternalLink className="w-3 h-3 opacity-50" />
                    </a>
                  </Button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}
