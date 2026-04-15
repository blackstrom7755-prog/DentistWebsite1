import { useState, useRef, useEffect } from "react";

const TransformationSlider = ({ 
  title, 
  before, 
  after, 
  beforeLabel, 
  afterLabel 
}: { 
  title: string; 
  before: string; 
  after: string; 
  beforeLabel: string; 
  afterLabel: string; 
}) => {
  const [position, setPosition] = useState(50);
  const [isResizing, setIsResizing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  };

  const handleMouseDown = () => setIsResizing(true);
  const handleMouseUp = () => setIsResizing(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => isResizing && handleMove(e.clientX);
    const handleTouchMove = (e: TouchEvent) => isResizing && handleMove(e.touches[0].clientX);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isResizing]);

  return (
    <div className="flex flex-col gap-6">
      <div 
        ref={containerRef}
        className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl cursor-col-resize select-none border border-white/10 group"
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        {/* After Image */}
        <img src={after} alt="After" className="absolute inset-0 w-full h-full object-cover" />

        {/* Before Image (Clipped) */}
        <div 
          className="absolute inset-0 overflow-hidden border-r-2 border-white/50"
          style={{ width: `${position}%` }}
        >
          <img 
            src={before} 
            alt="Before" 
            className="absolute inset-0 h-full object-cover max-w-none" 
            style={{ width: containerRef.current?.offsetWidth }}
          />
        </div>

        {/* Dynamic Labels */}
        <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest transition-opacity duration-300">
          {beforeLabel}
        </div>
        <div className="absolute bottom-4 right-4 bg-[#0D9488]/80 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest transition-opacity duration-300">
          {afterLabel}
        </div>

        {/* Handle */}
        <div 
          className="absolute inset-y-0 w-1 bg-white flex items-center justify-center pointer-events-none"
          style={{ left: `calc(${position}% - 2px)` }}
        >
          <div className="w-10 h-10 bg-white rounded-full shadow-[0_0_20px_rgba(0,0,0,0.3)] flex items-center justify-center border-[3px] border-[#0D9488] z-10">
            <div className="flex gap-1">
              <div className="w-0.5 h-3 bg-[#0D9488] rounded-full" />
              <div className="w-0.5 h-3 bg-[#0D9488] rounded-full" />
            </div>
          </div>
        </div>
      </div>
      <h3 className="font-display font-bold text-navy dark:text-white text-xl text-center">{title}</h3>
    </div>
  );
};

const BeforeAfterSlider = () => {
  const transformations = [
    { 
      title: "Teeth Whitening Transformation", 
      before: "/whitening-before.jpg", 
      after: "/whitening-after.jpg",
      beforeLabel: "BEFORE",
      afterLabel: "AFTER"
    },
    { 
      title: "Orthodontic Realignment", 
      before: "/invisible-braces-dentalia-demo-1.jpg", 
      after: "/metal-braces-dentalia-demo-1.jpg",
      beforeLabel: "INVISIBLE BRACES",
      afterLabel: "METAL BRACES"
    }
  ];

  return (
    <section id="transformations" className="py-20 md:py-28 bg-white dark:bg-[#0a0f16]">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span 
            style={{ color: '#0D9488' }} 
            className="text-sm font-body font-bold tracking-widest uppercase mb-3 block"
          >
            TESTIMONIALS
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-navy dark:text-white mb-6">
            Smile Transformations
          </h2>
          <p className="text-navy/60 dark:text-white/60 font-body text-lg md:text-xl leading-relaxed">
            Drag the clinical sliders to compare traditional and modern dental solutions.
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {transformations.map((item, index) => (
              <TransformationSlider 
                key={index} 
                title={item.title}
                before={item.before}
                after={item.after}
                beforeLabel={item.beforeLabel}
                afterLabel={item.afterLabel}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterSlider;