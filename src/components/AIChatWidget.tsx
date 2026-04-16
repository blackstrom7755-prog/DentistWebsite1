import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";

type Message = { role: "user" | "assistant"; content: string; isFallback?: boolean };

// Local Knowledge Base
const KNOWLEDGE_BASE = {
  hours: "We are open **Monday to Saturday from 9:00 AM to 8:00 PM**.\nWe are closed on Sundays.",
  pricing: "Our pricing varies by treatment:\n• **Teeth Cleaning:** ₹1,000 - ₹2,000\n• **Root Canal (RCT):** ₹3,500 - ₹7,000\nFor exact quotes, please book a consultation.",
  cleanings: "Professional teeth cleaning usually costs between **₹1,000 and ₹2,000** depending on the condition.",
  rct: "A Root Canal Treatment (RCT) costs between **₹3,500 and ₹7,000** depending on the tooth and complexity.",
  location: "Our clinic is located at **123 Science City Road, Ahmedabad, Gujarat**.\nWe have ample parking space available!",
  appointment: "You can book an appointment by using the booking form on this website or by reaching out to us directly.",
  hello: "Hello! How can I help you with your dental needs today?",
};

const matchKeyword = (input: string): string | null => {
  const lowerInput = input.toLowerCase();
  
  if (lowerInput.includes("hour") || lowerInput.includes("time") || lowerInput.includes("open") || lowerInput.includes("close")) {
    return KNOWLEDGE_BASE.hours;
  }
  if (lowerInput.includes("price") || lowerInput.includes("cost") || lowerInput.includes("much") || lowerInput.includes("fees")) {
    if (lowerInput.includes("clean")) return KNOWLEDGE_BASE.cleanings;
    if (lowerInput.includes("root") || lowerInput.includes("rct") || lowerInput.includes("canal")) return KNOWLEDGE_BASE.rct;
    return KNOWLEDGE_BASE.pricing;
  }
  if (lowerInput.includes("clean")) return KNOWLEDGE_BASE.cleanings;
  if (lowerInput.includes("root") || lowerInput.includes("rct") || lowerInput.includes("canal")) return KNOWLEDGE_BASE.rct;
  
  if (lowerInput.includes("locat") || lowerInput.includes("where") || lowerInput.includes("address") || lowerInput.includes("ahmedabad") || lowerInput.includes("find")) {
    return KNOWLEDGE_BASE.location;
  }
  if (lowerInput.includes("book") || lowerInput.includes("appoint") || lowerInput.includes("schedule")) {
    return KNOWLEDGE_BASE.appointment;
  }
  if (lowerInput === "hi" || lowerInput === "hello" || lowerInput.includes("hey")) {
    return KNOWLEDGE_BASE.hello;
  }
  return null;
}

const AIChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "👋 Hi! I'm your DentCare+ virtual assistant. I can quickly help you with:\n\n• **Treatments & Pricing**\n• **Clinic Hours**\n• **Location Details**\n\nHow can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    
    setInput("");
    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    // Simulate network delay for realistic "typing" effect
    setTimeout(() => {
      const responseText = matchKeyword(text);
      if (responseText) {
        setMessages((prev) => [...prev, { role: "assistant", content: responseText }]);
      } else {
        setMessages((prev) => [...prev, { 
          role: "assistant", 
          content: "I'm sorry, I don't have that specific information in my quick-answers databank right now. Please reach out to our clinic directly!",
          isFallback: true
        }]);
      }
      setLoading(false);
    }, 1200);
  };

  return (
    <>
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#0D9488] text-white shadow-lg flex items-center justify-center"
            aria-label="Open AI Chat"
          >
            <MessageCircle className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] h-[540px] max-h-[calc(100vh-3rem)] bg-white dark:bg-zinc-950 rounded-2xl shadow-2xl border border-slate-200 dark:border-white/10 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#0D9488] text-white shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-sm text-white">DentCare+ Assistant</div>
                  <div className="text-[10px] text-teal-100 flex items-center gap-1">
                     <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                     Online (Local AI)
                  </div>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Messages Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
              <AnimatePresence initial={false}>
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {msg.role === "assistant" && (
                      <div className="w-6 h-6 rounded-full bg-[#0D9488]/10 flex items-center justify-center shrink-0 mt-1 hidden sm:flex">
                        <Bot className="w-3.5 h-3.5 text-[#0D9488]" />
                      </div>
                    )}
                    <div
                      className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-2.5 text-[13.5px] leading-relaxed break-words ${
                        msg.role === "user"
                          ? "bg-[#0D9488] text-white rounded-tr-sm"
                          : "bg-slate-100 dark:bg-zinc-900/50 border border-slate-200/50 dark:border-white/5 text-slate-800 dark:text-zinc-200 rounded-tl-sm"
                      }`}
                    >
                      <div dangerouslySetInnerHTML={{
                          __html: msg.content
                            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                            .replace(/\n/g, "<br/>")
                        }} 
                      />
                      {msg.isFallback && (
                         <div className="flex gap-2 mt-3 pt-3 border-t border-slate-200 dark:border-white/10">
                            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="flex-1 bg-[#25D366] hover:bg-[#20bd5a] text-white text-[11px] py-1.5 px-2 rounded-lg flex items-center justify-center gap-1 font-medium transition-colors">
                              WhatsApp
                            </a>
                            <a href="mailto:hello@dentcare.com" className="flex-1 bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 text-white text-[11px] py-1.5 px-2 rounded-lg flex items-center justify-center gap-1 font-medium transition-colors">
                              Email Us
                            </a>
                         </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {loading && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className="flex justify-start gap-2"
                >
                  <div className="w-6 h-6 rounded-full bg-[#0D9488]/10 flex items-center justify-center shrink-0 mt-1 hidden sm:flex">
                    <Bot className="w-3.5 h-3.5 text-[#0D9488]" />
                  </div>
                  <div className="bg-slate-100 dark:bg-zinc-900/50 border border-slate-200/50 dark:border-white/5 rounded-2xl rounded-tl-sm px-4 py-3.5 flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400 w-fit">
                    <motion.span animate={{ y: [0, -4, 0] }} transition={{ duration: 0.5, repeat: Infinity, delay: 0 }} className="w-1.5 h-1.5 bg-slate-400 dark:bg-slate-500 rounded-full block" />
                    <motion.span animate={{ y: [0, -4, 0] }} transition={{ duration: 0.5, repeat: Infinity, delay: 0.15 }} className="w-1.5 h-1.5 bg-slate-400 dark:bg-slate-500 rounded-full block" />
                    <motion.span animate={{ y: [0, -4, 0] }} transition={{ duration: 0.5, repeat: Infinity, delay: 0.3 }} className="w-1.5 h-1.5 bg-slate-400 dark:bg-slate-500 rounded-full block" />
                  </div>
                </motion.div>
             )}
            </div>

            {/* Input Form */}
            <div className="p-3 border-t border-slate-100 dark:border-white/5 bg-white dark:bg-zinc-950 shrink-0">
              <form onSubmit={(e) => { e.preventDefault(); send(); }} className="flex gap-2 relative">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about pricing, hours..."
                  className="flex-1 h-11 text-[13px] rounded-xl focus-visible:ring-[#0D9488] border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-zinc-900 placeholder:text-slate-400 pr-12 text-slate-900 dark:text-slate-100 placeholder:text-[13px]"
                  disabled={loading}
                />
                <Button type="submit" size="icon" disabled={loading || !input.trim()} className="absolute right-1 top-1 bottom-1 h-9 w-9 rounded-lg bg-[#0D9488] hover:bg-[#0b7a6f] shrink-0 disabled:opacity-50 transition-colors">
                  <Send className="w-4 h-4 text-white" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatWidget;