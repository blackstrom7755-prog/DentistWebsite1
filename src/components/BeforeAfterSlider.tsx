import { useState, useRef } from "react";
import beforeAfterImg from "@/assets/before-after.jpg";

const BeforeAfterSlider = () => {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  };

  return (
    <section id="transformations" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-body font-semibold text-accent-foreground/60 tracking-widest uppercase mb-3 block">Results</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
            See the Transformation
          </h2>
          <p className="text-muted-foreground font-body text-lg">
            Drag the slider to reveal stunning before & after results from our cosmetic treatments.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div
            ref={containerRef}
            className="relative aspect-square rounded-2xl overflow-hidden shadow-elevated cursor-col-resize select-none"
            onMouseMove={(e) => e.buttons === 1 && handleMove(e.clientX)}
            onTouchMove={(e) => handleMove(e.touches[0].clientX)}
          >
            {/* After (full image) */}
            <img
              src={beforeAfterImg}
              alt="After dental treatment"
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
              width={1200}
              height={600}
            />

            {/* Before (clipped) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${position}%` }}
            >
              <img
                src={beforeAfterImg}
                alt="Before dental treatment"
                className="absolute inset-0 w-full h-full object-cover brightness-90 saturate-75"
                style={{ width: `${100 / (position / 100)}%`, maxWidth: "none" }}
                loading="lazy"
                width={1200}
                height={600}
              />
            </div>

            {/* Slider line */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-card shadow-lg"
              style={{ left: `${position}%`, transform: "translateX(-50%)" }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card shadow-elevated flex items-center justify-center">
                <span className="text-foreground text-xs font-bold font-body">⟷</span>
              </div>
            </div>

            {/* Labels */}
            <div className="absolute top-4 left-4 bg-primary/80 backdrop-blur-sm text-primary-foreground text-xs font-body font-semibold px-3 py-1 rounded-full">
              Before
            </div>
            <div className="absolute top-4 right-4 bg-accent/80 backdrop-blur-sm text-accent-foreground text-xs font-body font-semibold px-3 py-1 rounded-full">
              After
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterSlider;
