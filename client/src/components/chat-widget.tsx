import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/queryClient";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTIONS = [
  "What swings do you recommend for vestibular input?",
  "Help me set up a sensory room",
  "What products work for deep pressure therapy?",
  "Do you offer bulk pricing for clinics?",
];

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: "user", content: text.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await apiRequest("POST", "/api/chat", {
        message: text.trim(),
        history: messages,
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.response },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I'm having trouble connecting right now. Please try again in a moment.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {!isOpen && (
        <button
          data-testid="button-open-chat"
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:scale-105 active:scale-95"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {isOpen && (
        <div
          data-testid="chat-panel"
          className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6 z-50 w-full sm:w-[380px] sm:max-w-[calc(100vw-2rem)] h-[100dvh] sm:h-[540px] sm:max-h-[calc(100vh-6rem)] bg-white dark:bg-gray-900 sm:rounded-2xl shadow-2xl border-0 sm:border border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300"
        >
          <div className="flex items-center justify-between px-5 py-4 bg-primary text-white rounded-t-2xl">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-sm leading-tight">Abley's Assistant</h3>
                <p className="text-xs text-white/70">Powered by Gemini AI</p>
              </div>
            </div>
            <button
              data-testid="button-close-chat"
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4" data-testid="chat-messages">
            {messages.length === 0 && (
              <div className="text-center py-6">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Bot className="w-7 h-7 text-primary" />
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1 text-sm">
                  Hi! I'm the Abley's assistant.
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-5">
                  Ask me about therapy equipment, product recommendations, or setting up your clinic.
                </p>
                <div className="space-y-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      data-testid={`suggestion-${s.slice(0, 20).replace(/\s+/g, "-").toLowerCase()}`}
                      onClick={() => sendMessage(s)}
                      className="block w-full text-left px-3 py-2 text-xs rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-primary/5 hover:border-primary/30 transition-colors text-gray-700 dark:text-gray-300"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, i) => (
              <div
                key={i}
                data-testid={`chat-message-${msg.role}-${i}`}
                className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center ${
                    msg.role === "user"
                      ? "bg-primary text-white"
                      : "bg-gray-100 dark:bg-gray-800 text-primary"
                  }`}
                >
                  {msg.role === "user" ? (
                    <User className="w-3.5 h-3.5" />
                  ) : (
                    <Bot className="w-3.5 h-3.5" />
                  )}
                </div>
                <div
                  className={`max-w-[75%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-primary text-white rounded-br-md"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-md"
                  }`}
                >
                  {msg.content.split("\n").map((line, j) => (
                    <p key={j} className={j > 0 ? "mt-1.5" : ""}>
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2.5" data-testid="chat-loading">
                <div className="w-7 h-7 rounded-full bg-gray-100 dark:bg-gray-800 flex-shrink-0 flex items-center justify-center text-primary">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 px-4 py-3 rounded-2xl rounded-bl-md">
                  <Loader2 className="w-4 h-4 animate-spin text-primary" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <form
            onSubmit={handleSubmit}
            className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 flex gap-2"
          >
            <input
              ref={inputRef}
              data-testid="input-chat-message"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about therapy equipment..."
              disabled={isLoading}
              className="flex-1 px-4 py-2.5 rounded-full bg-gray-100 dark:bg-gray-800 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:opacity-50"
            />
            <Button
              type="submit"
              size="icon"
              data-testid="button-send-chat"
              disabled={!input.trim() || isLoading}
              className="rounded-full w-10 h-10 flex-shrink-0"
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      )}
    </>
  );
}
