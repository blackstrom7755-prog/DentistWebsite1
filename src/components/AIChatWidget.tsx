import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GoogleGenerativeAI } from "@google/generative-ai";

type Message = { role: "user" | "assistant"; content: string };

// Initialize Gemini
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_AI_KEY);

const AIChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "👋 Hi! I'm your DentCare+ virtual assistant. I can help you with:\n\n• **Booking appointments**\n• **Treatment pricing** & info\n• **Clinic hours** & directions\n\nHow can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    
    setInput("");
    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
        systemInstruction: "You are the DentCare+ dental assistant in Ahmedabad. Help patients with booking, pricing, and clinical info. Be professional."
      });

      const chat = model.startChat({
        history: messages.map(m => ({
          role: m.role === "assistant" ? "model" : "user",
          parts: [{ text: m.content }],
        })),
      });

      const result = await chat.sendMessage(text);
      const response = await result.response;
      const responseText = response.text();

      setMessages((prev) => [...prev, { role: "assistant", content: responseText }]);
      
    } catch (e) {
      console.error(e);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "I'm having trouble connecting. Please call us at **+91 98765 43210**!" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* 1. The Floating Button (This was missing) */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#0D9488] text-white shadow-lg flex items-center justify-center hover:scale-105 transition-transform"
          aria-label="Open AI Chat"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* 2. The Chat Window */}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] h-[520px] max-h-[calc(100vh-3rem)] bg-white dark:bg-zinc-950 rounded-2xl shadow-2xl border border-slate-200 dark:border-white/10 flex flex-col overflow-hidden animate-in slide-in-from-bottom-4">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#0D9488] text-white rounded-t-2xl">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5" />
              <div>
                <div className="font-bold text-sm text-white">DentCare+ Assistant</div>
                <div className="text-[10px] opacity-80 uppercase tracking-wider">Ahmedabad Clinic</div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Messages Area */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-[#0D9488] text-white rounded-br-none"
                      : "bg-slate-100 dark:bg-zinc-900 text-slate-800 dark:text-zinc-200 rounded-bl-none"
                  }`}
                  dangerouslySetInnerHTML={{
                    __html: msg.content
                      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                      .replace(/\n/g, "<br/>")
                  }}
                />
              </div>
            ))}
            {loading && (
               <div className="flex justify-start">
                 <div className="bg-slate-100 dark:bg-zinc-900 rounded-2xl px-4 py-3 animate-pulse text-xs text-slate-400">
                   Thinking...
                 </div>
               </div>
            )}
          </div>

          {/* Input Form */}
          <div className="p-3 border-t border-slate-100 dark:border-white/5 bg-white dark:bg-zinc-950">
            <form onSubmit={(e) => { e.preventDefault(); send(); }} className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 h-10 text-sm rounded-xl focus:ring-[#0D9488]"
                disabled={loading}
              />
              <Button type="submit" size="icon" disabled={loading || !input.trim()} className="h-10 w-10 bg-[#0D9488] hover:bg-[#0b7a6f] shrink-0">
                <Send className="w-4 h-4 text-white" />
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatWidget;