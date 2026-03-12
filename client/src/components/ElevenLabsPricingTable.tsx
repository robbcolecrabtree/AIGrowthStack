import { Check } from "lucide-react";

const PLANS = [
  {
    name: "Free Tier",
    price: "$0/mo",
    features: [
      "10,000 characters/mo",
      "3 custom voices",
      "Attribution required",
    ],
    popular: false,
  },
  {
    name: "Creator Plan",
    price: "$11/mo",
    features: [
      "100,000 characters/mo",
      "30 custom voices",
      "Voice Design v3 Access",
      "Commercial license",
    ],
    popular: true,
  },
  {
    name: "Pro Plan",
    price: "$22/mo",
    features: [
      "500,000 characters/mo",
      "160 custom voices",
      "Highest audio quality (192kbps)",
    ],
    popular: false,
  },
];

export function ElevenLabsPricingTable() {
  return (
    <div className="w-full min-w-0">
      <div className="grid grid-cols-1 md:grid-cols-[repeat(3,minmax(0,1fr))] gap-4">
        {PLANS.map((plan) => (
          <div
            key={plan.name}
            className={`relative rounded-xl border p-6 transition-shadow min-w-0 ${
              plan.popular
                ? "border-primary/50 bg-primary/5 shadow-lg shadow-primary/10 ring-2 ring-primary/30"
                : "border-border bg-card"
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                  Most Popular
                </span>
              </div>
            )}
            <div className="text-center mb-6 pt-1">
              <h3 className="font-heading font-bold text-lg text-foreground">
                {plan.name}
              </h3>
              <div className="mt-3 text-2xl font-bold text-foreground">
                {plan.price}
              </div>
            </div>
            <ul className="space-y-4">
              {plan.features.map((feature, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm text-muted-foreground"
                >
                  <Check
                    className="w-4 h-4 text-primary flex-shrink-0 mt-0.5"
                    aria-hidden
                  />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
