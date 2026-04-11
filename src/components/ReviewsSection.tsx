import { Star, Quote } from "lucide-react";

const reviews = [
  { name: "Sarah J.", text: "Absolutely life-changing! My Invisalign treatment was smooth, and the staff made every visit a breeze. I can't stop smiling.", rating: 5, date: "2 weeks ago" },
  { name: "Michael T.", text: "I was terrified of dentists, but Dr. Mitchell's team made my root canal completely painless. The laser technology is incredible.", rating: 5, date: "1 month ago" },
  { name: "Priya K.", text: "Got my dental implants here and the result is indistinguishable from my natural teeth. Worth every penny.", rating: 5, date: "3 weeks ago" },
  { name: "James L.", text: "The 3D scanning replaced those awful impressions. Professional, modern, and genuinely caring team.", rating: 5, date: "5 days ago" },
  { name: "Emma R.", text: "My kids actually look forward to dental visits now! The pediatric team is exceptional with children.", rating: 5, date: "1 week ago" },
  { name: "David C.", text: "Best whitening results I've ever had. Six shades lighter in one session. The investment calculator on their site helped me plan.", rating: 5, date: "2 months ago" },
];

const ReviewsSection = () => (
  <section id="reviews" className="py-20 md:py-28 bg-background">
    <div className="container mx-auto px-4">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span 
          style={{ color: '#0D9488' }} 
          className="text-2xl md:text-2xl text-sm font-body font-bold tracking-widest uppercase mb-3 block"
        >
          TESTIMONIAL
        </span>
        <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
          What Our Patients Say
        </h2>
        <div className="flex items-center justify-center gap-2 mt-4">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-gold text-gold" />
            ))}
          </div>
          <span className="font-body text-sm text-muted-foreground">4.9/5 from 500+ Google Reviews</span>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((r) => (
          <div
            key={r.name}
            className="gradient-card rounded-xl p-6 shadow-soft hover:shadow-elevated transition-all duration-300 border border-border/50"
          >
            <Quote className="w-8 h-8 text-accent/40 mb-4" />
            <p className="text-foreground/80 font-body text-sm leading-relaxed mb-4">"{r.text}"</p>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-sm font-body text-foreground">{r.name}</div>
                <div className="text-xs text-muted-foreground font-body">{r.date}</div>
              </div>
              <div className="flex gap-0.5">
                {[...Array(r.rating)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-gold text-gold" />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ReviewsSection;
