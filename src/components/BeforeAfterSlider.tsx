import { useState, useRef } from "react";

const TransformationSlider = ({ title, before, after }: { title: string; before: string; after: string }) => {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  };

  return (
    <div className="flex flex-col gap-6">
      <div 
        ref={containerRef}
        className="relative aspect-square rounded-2xl overflow-hidden shadow-glow cursor-col-resize select-none border border-white/5"
        onMouseMove={(e) => e.buttons === 1 && handleMove(e.clientX)}
        onTouchMove={(e) => handleMove(e.touches[0].clientX)}
      >
        {/* After (full image) */}
        <img
          src={after}
          alt="After dental treatment"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />

        {/* Before (clipped) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${position}%` }}
        >
          <img
            src={before}
            alt="Before dental treatment"
            className="absolute inset-0 w-full h-full object-cover brightness-90 saturate-75"
            style={{ width: `${100 / (position / 100)}%`, maxWidth: "none" }}
            loading="lazy"
          />
        </div>

        {/* Slider line */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-xl"
          style={{ left: `${position}%`, transform: "translateX(-50%)" }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-2xl flex items-center justify-center">
            <span className="text-navy text-[10px] font-bold">⟷</span>
          </div>
        </div>

        {/* Labels */}
        <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border border-white/10">
          Before
        </div>
        <div className="absolute top-4 right-4 bg-accent/80 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border border-white/10">
          After
        </div>
      </div>
      <div className="text-center">
        <h3 className="text-white font-display font-bold text-lg">{title}</h3>
      </div>
    </div>
  );
};

const BeforeAfterSlider = () => {
  const transformations = [
    { title: "Invisalign Transformation", before: "/before-after.jpg", after: "/before-after.jpg" },
    { title: "Professional Whitening", before: "/before-after.jpg", after: "/before-after.jpg" },
    { title: "Same-Day Implants", before: "/before-after.jpg", after: "/before-after.jpg" },
  ];

  return (
    <section id="transformations" className="py-20 md:py-28 bg-[#0a0a0a]">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-body font-bold text-accent tracking-widest uppercase mb-3 block">Real Results</span>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-6">
            Smile Transformations
          </h2>
          <p className="text-white/60 font-body text-lg md:text-xl leading-relaxed">
            Drag the sliders to reveal stunning before & after results from our expert clinical team.
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {transformations.map((t, idx) => (
              <TransformationSlider key={idx} {...t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterSlider;
