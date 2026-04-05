import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Do you accept insurance?",
    a: "Yes! We accept most major dental insurance plans including Delta Dental, Cigna, Aetna, MetLife, and many more. Our front desk team will verify your coverage before your visit so there are no surprises.",
  },
  {
    q: "Is there parking available?",
    a: "Absolutely. We have a dedicated parking lot with complimentary parking for all patients. There is also accessible parking available near the front entrance.",
  },
  {
    q: "How long is a first visit?",
    a: "Your first appointment typically lasts 60–90 minutes. This includes a comprehensive exam, digital X-rays, a professional cleaning, and a personalized treatment plan discussion with the doctor.",
  },
  {
    q: "Do you offer financing or payment plans?",
    a: "Yes, we offer flexible payment plans through CareCredit and in-house financing options with 0% interest for up to 12 months. We want cost to never be a barrier to your dental health.",
  },
  {
    q: "Is teeth whitening safe?",
    a: "Professional teeth whitening performed at our clinic is completely safe. We use clinically-proven systems that protect your enamel while delivering results up to 8 shades whiter in a single session.",
  },
  {
    q: "What should I do in a dental emergency?",
    a: "Call our office immediately at +1 (234) 567-890. We reserve same-day slots for emergencies including severe pain, knocked-out teeth, and broken restorations. After hours, our answering service will connect you with the on-call dentist.",
  },
];

const FAQSection = () => (
  <section id="faq" className="py-20 md:py-28 bg-background">
    <div className="container mx-auto px-4">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-sm font-body font-semibold text-accent-foreground/60 tracking-widest uppercase mb-3 block">
          FAQ
        </span>
        <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
          Common Questions
        </h2>
        <p className="text-muted-foreground font-body text-lg">
          Everything you need to know before your visit.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="bg-card rounded-xl border border-border/50 px-6 shadow-soft"
            >
              <AccordionTrigger className="font-display font-semibold text-foreground text-left hover:no-underline">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground font-body leading-loose text-[0.9375rem]">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  </section>
);

export default FAQSection;
