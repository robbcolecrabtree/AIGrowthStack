import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { CATEGORIES } from "@/lib/mockData";
import { useState } from "react";
import { Filter } from "lucide-react";
import { Link } from "wouter";

export function FilterSidebar() {
  const [priceRange, setPriceRange] = useState([200]);

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 pb-4 border-b border-border">
        <Filter className="w-4 h-4 text-primary" />
        <h3 className="font-heading font-bold text-lg text-foreground">Filters</h3>
      </div>

      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-foreground">Category</h4>
        <div className="space-y-2">
          {CATEGORIES.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Link href={`/?category=${encodeURIComponent(category)}`}>
                <Label className="text-sm font-normal text-muted-foreground hover:text-foreground cursor-pointer">
                  {category}
                </Label>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-foreground">Max Monthly Price</h4>
        <Slider
          defaultValue={[200]}
          max={500}
          step={10}
          value={priceRange}
          onValueChange={setPriceRange}
          className="py-4"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>$0</span>
          <span className="font-medium text-foreground">${priceRange[0]}+</span>
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-foreground">Features</h4>
        <div className="space-y-2">
          {["API Access", "Free Tier", "Integrations", "Team Plan", "AI-Powered"].map((feature) => (
            <div key={feature} className="flex items-center space-x-2">
              <Checkbox id={`feature-${feature}`} />
              <Label
                htmlFor={`feature-${feature}`}
                className="text-sm font-normal text-muted-foreground leading-none peer-data-[state=checked]:text-foreground cursor-pointer"
              >
                {feature}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
