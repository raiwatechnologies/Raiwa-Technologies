import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bot,
  X,
  Send,
  Loader2,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { BRAND, getWhatsAppUrl } from '@/lib/brand.js';

const QUICK_QUESTIONS = [
  'What services does Raiwa offer?',
  'How do I learn React & Web Dev?',
  'How do you manage Amazon & TikTok stores?',
  'Can you build iOS and Android apps?',
];

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        "👋 Hello! I'm the **Raiwa AI Assistant**.\n\nYou can ask me about **Raiwa Technologies' services** (Ecommerce, Development, Marketing, Ads), or students can ask any **web development & programming questions** (HTML, CSS, JS, React, full-stack roadmap)!",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend) => {
    const query = (textToSend || input).trim();
    if (!query || loading) return;

    const userMsg = {
      id: Date.now().toString(),
      role: 'user',
      content: query,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const historyPayload = messages
        .filter((m) => m.id !== 'welcome')
        .slice(-6)
        .map((m) => ({ role: m.role, content: m.content }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          history: historyPayload,
        }),
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();
      const replyText =
        data.reply ||
        "I'm sorry, I couldn't process that question right now. Feel free to contact our team directly!";

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: replyText,
          sources: data.sources || [],
        },
      ]);
    } catch (err) {
      console.warn('Chat error:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content:
            "I'm currently unable to reach the knowledge server. You can always message our team directly on WhatsApp for an immediate answer: **" +
            BRAND.phoneDisplay +
            '**',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Toggle Button — Positioned at bottom-left */}
      <div className="fixed bottom-6 left-6 z-50">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="group flex items-center gap-2.5 rounded-full bg-[#171313] px-4 py-3.5 text-white shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-[#DA0807] focus:outline-none focus:ring-4 focus:ring-red-200"
          aria-label="Toggle AI Assistant"
        >
          <div className="relative flex h-6 w-6 items-center justify-center">
            {isOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <>
                <Bot className="h-5 w-5 text-white transition-transform group-hover:scale-110" />
                <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
                </span>
              </>
            )}
          </div>
          <span className="text-xs font-extrabold uppercase tracking-wider sm:text-sm">
            {isOpen ? 'Close' : 'Ask AI & Q/A'}
          </span>
        </button>
      </div>

      {/* Chat Popover Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 left-4 right-4 z-50 flex max-h-[580px] w-auto flex-col overflow-hidden rounded-2xl border border-[#171313]/15 bg-white shadow-2xl sm:left-6 sm:right-auto sm:w-[410px]"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 bg-[#171313] px-4 py-3.5 text-white">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#DA0807] text-white">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold leading-tight">Raiwa Assistant</h3>
                  <div className="flex items-center gap-1.5 text-[11px] text-white/70">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                    <span>Company & Student Q/A</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-1.5 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 space-y-3.5 overflow-y-auto p-4 text-sm" style={{ maxHeight: '380px' }}>
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 leading-relaxed ${
                      m.role === 'user'
                        ? 'bg-[#171313] text-white shadow-sm'
                        : 'border border-[#171313]/10 bg-[#F7F7F7] text-[#171313]'
                    }`}
                  >
                    <div className="text-xs sm:text-[13px] leading-relaxed [&_p]:mb-2 [&_p:last-child]:mb-0 [&_strong]:font-bold [&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:my-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:my-1 [&_code]:rounded [&_code]:bg-black/5 [&_code]:px-1">
  <ReactMarkdown>{m.content}</ReactMarkdown>
</div>

                    {m.sources && m.sources.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1 border-t border-black/5 pt-1.5 text-[10px] text-muted-foreground">
                        <span className="font-semibold">Sources:</span>
                        {m.sources.slice(0, 3).map((s, idx) => (
                          <span
                            key={idx}
                            className="rounded bg-black/5 px-1.5 py-0.5"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-2 rounded-2xl border border-[#171313]/10 bg-[#F7F7F7] px-4 py-2.5 text-xs text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin text-[#DA0807]" />
                    <span>Thinking & searching knowledge...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions (when only welcome message is present) */}
            {messages.length === 1 && (
              <div className="border-t border-black/5 bg-[#FAFAFA] p-3">
                <div className="mb-2 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  <Sparkles className="h-3 w-3 text-[#DA0807]" />
                  <span>Suggested Questions</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {QUICK_QUESTIONS.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(q)}
                      className="rounded-lg border border-black/10 bg-white px-2.5 py-1 text-left text-[11px] font-medium text-[#171313] transition-colors hover:border-[#DA0807] hover:text-[#DA0807]"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Bar */}
            <div className="border-t border-black/10 bg-white p-3">
              <div className="flex items-center gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about services or web development..."
                  disabled={loading}
                  className="h-10 text-xs sm:text-sm"
                />
                <Button
                  onClick={() => handleSend()}
                  disabled={loading || !input.trim()}
                  size="icon"
                  className="h-10 w-10 flex-shrink-0 bg-[#DA0807] text-white hover:bg-[#B80707]"
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>

              <div className="mt-2 flex items-center justify-between text-[11px] text-muted-foreground">
                <span>Raiwa Knowledge AI</span>
                <a
                  href={getWhatsAppUrl("Hi Raiwa Technologies, I'd like to speak with a specialist.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-[#DA0807] hover:underline"
                >
                  <span>WhatsApp Team</span>
                  <ExternalLink className="h-2.5 w-2.5" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
