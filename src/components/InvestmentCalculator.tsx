import { useState } from "react";
import { Calculator, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const treatments = [
  { id: "whitening", label: "Teeth Whitening", min: 199, max: 450 },
  { id: "implants", label: "Dental Implants", min: 1500, max: 4000 },
  { id: "invisalign", label: "Invisalign / Braces", min: 2500, max: 6000 },
  { id: "rct", label: "Root Canal (RCT)", min: 400, max: 1200 },
  { id: "veneers", label: "Cosmetic Veneers", min: 800, max: 2000 },
  { id: "cleaning", label: "Deep Cleaning", min: 100, max: 300 },
];

const InvestmentCalculator = () => {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) =>
    setSelected((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  const totals = treatments
    .filter((t) => selected.includes(t.id))
    .reduce(
      (acc, t) => ({ min: acc.min + t.min, max: acc.max + t.max }),
      { min: 0, max: 0 }
    );

  return (
    <section className="py-20 md:py-28 gradient-mint">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-sm font-body font-semibold text-accent-foreground/60 tracking-widest uppercase mb-3 block">Pricing</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
              Investment Calculator
            </h2>
            <p className="text-muted-foreground font-body text-lg">
              Select your treatments to see an estimated investment range.
            </p>
          </div>

          <div className="bg-card rounded-2xl shadow-elevated p-6 md:p-10 border border-border/50">
            <div className="grid sm:grid-cols-2 gap-3 mb-8">
              {treatments.map((t) => {
                const active = selected.includes(t.id);
                return (
                  <button
                    key={t.id}
                    onClick={() => toggle(t.id)}
                    className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left font-body ${
                      active
                        ? "border-accent bg-accent/10"
                        : "border-border hover:border-accent/40"
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 ${
                        active ? "bg-accent" : "bg-muted"
                      }`}
                    >
                      {active && <Check className="w-4 h-4 text-accent-foreground" />}
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-foreground">{t.label}</div>
                      <div className="text-xs text-muted-foreground">
                        ${t.min.toLocaleString()} – ${t.max.toLocaleString()}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-border">
              <div className="flex items-center gap-3">
                <Calculator className="w-8 h-8 text-navy" />
                <div>
                  <div className="text-xs text-muted-foreground font-body">Estimated Range</div>
                  <div className="text-2xl md:text-3xl font-display font-bold text-foreground">
                    {selected.length > 0
                      ? `$${totals.min.toLocaleString()} – $${totals.max.toLocaleString()}`
                      : "Select treatments"}
                  </div>
                </div>
              </div>
              <Button className="bg-primary text-primary-foreground" asChild>
                <a href="#contact">Get Exact Quote</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvestmentCalculator;
