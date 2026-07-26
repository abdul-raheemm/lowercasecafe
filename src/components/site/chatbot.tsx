import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ChatMessage {
  id: string;
  role: "user" | "bot";
  text: string;
}

/**
 * Isolated bot response function. Swap the body for a real API call
 * (fetch to your endpoint) without touching the UI.
 */
async function sendMessageToBot(_history: ChatMessage[], userText: string): Promise<string> {
  await new Promise((r) => setTimeout(r, 700 + Math.random() * 700));
  const q = userText.toLowerCase();
  if (/(hour|open|close|time)/.test(q))
    return "We're open every day, 7:30 AM – 10:00 PM. The kitchen closes at 9:15 PM.";
  if (/(reserv|book|table)/.test(q))
    return "You can reserve a table on our reservations page — it takes about 30 seconds and I'll hold it right away.";
  if (/(menu|coffee|food|dessert)/.test(q))
    return "Our full menu lives on the /menu page — I recommend the Chemex pour-over and the dark chocolate tart.";
  if (/(wifi|work|laptop)/.test(q))
    return "Yes — fast wifi, plenty of outlets, and we don't mind laptops except Sundays between 11–2.";
  if (/(where|address|location|park)/.test(q))
    return "We're at 42 Kiln Lane in the Old Quarter. Street parking after 6 PM, a lot around the corner on Maple.";
  if (/(event|music|vinyl|cupping)/.test(q))
    return "Our events calendar is on /events — vinyl Sundays and a cupping session are coming up.";
  if (/(hi|hello|hey)/.test(q))
    return "Hi there! I'm Ember, the lowercase concierge. Ask me about hours, menu, reservations or events.";
  return "Good question — I'll pass that along to the team. In the meantime, hello@lowercase.cafe reaches a human.";
}

const SEED: ChatMessage[] = [
  { id: "seed", role: "bot", text: "Hi, I'm Ember — the lowercase concierge. Ask me about hours, the menu, or a reservation." },
];

export function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(SEED);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 200);
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const text = input.trim();
    if (!text) return;
    const userMsg: ChatMessage = { id: `u-${Date.now()}`, role: "user", text };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setTyping(true);
    try {
      const reply = await sendMessageToBot([...messages, userMsg], text);
      setMessages((m) => [...m, { id: `b-${Date.now()}`, role: "bot", text: reply }]);
    } finally {
      setTyping(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Open chat"}
        className={cn(
          "fixed bottom-5 right-5 z-[60] grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-soft transition-all duration-500 hover:scale-105 sm:bottom-6 sm:right-6",
          "glow-amber",
        )}
      >
        {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
      </button>

      <div
        className={cn(
          "fixed bottom-24 right-3 z-[60] w-[calc(100vw-1.5rem)] max-w-sm origin-bottom-right overflow-hidden rounded-3xl border border-primary/15 bg-[color:var(--cream)] shadow-soft transition-all duration-500 sm:right-6",
          open ? "pointer-events-auto scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0",
        )}
        role="dialog"
        aria-label="Café chat"
      >
        <div className="flex items-center gap-3 border-b border-primary/10 bg-[color:var(--walnut)] px-4 py-3 text-[color:var(--cream)]">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-[color:var(--amber-glow)]/20 animate-bulb">
            <Sparkles className="h-4 w-4 text-[color:var(--amber-glow)]" />
          </span>
          <div className="flex-1">
            <p className="font-serif text-base leading-none">Ember</p>
            <p className="text-[11px] uppercase tracking-[0.2em] text-[color:var(--cream)]/60">lowercase concierge</p>
          </div>
        </div>

        <div ref={scrollRef} className="flex h-80 flex-col gap-3 overflow-y-auto px-4 py-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={cn(
                "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                m.role === "user"
                  ? "self-end bg-primary text-primary-foreground"
                  : "self-start bg-white/70 text-primary border border-primary/10",
              )}
            >
              {m.text}
            </div>
          ))}
          {typing && (
            <div className="self-start inline-flex items-center gap-1.5 rounded-2xl border border-primary/10 bg-white/70 px-3.5 py-3">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="h-1.5 w-1.5 rounded-full bg-primary/50 animate-typing-dot"
                  style={{ animationDelay: `${i * 120}ms` }}
                />
              ))}
            </div>
          )}
        </div>

        <form onSubmit={handleSend} className="flex items-center gap-2 border-t border-primary/10 bg-white/60 p-3">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about hours, menu, tables…"
            aria-label="Message"
            className="flex-1 rounded-full border border-primary/15 bg-[color:var(--cream)] px-4 py-2 text-sm text-primary placeholder:text-muted-foreground focus:border-primary/40 focus:outline-none"
          />
          <button
            type="submit"
            aria-label="Send message"
            className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105 disabled:opacity-40"
            disabled={!input.trim() || typing}
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </>
  );
}