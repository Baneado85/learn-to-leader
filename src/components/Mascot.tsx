"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useTranslation } from "@/lib/i18n/useTranslation";
import { Send, X, User, Bot } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useGameStore } from "@/store/useGameStore";
import ReactMarkdown from "react-markdown";

import { getAssetUrl } from "@/lib/assetUrl";

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

export default function Mascot() {
  const { t, language } = useTranslation();
  const { geminiApiKey } = useGameStore();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initialize with greeting
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        { id: Date.now(), text: t('chat.initialMessage'), sender: 'bot' }
      ]);
    }
  }, [t]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping, isChatOpen]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim() || isTyping) return;

    const userText = inputValue;
    const userMsg: Message = { id: Date.now(), text: userText, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInputValue("");
    
    setIsTyping(true);
    try {
      // 1. First attempt: call our API Route
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText, language }),
      });

      const data = await response.json();
      
      if (!response.ok || data.error) {
        throw new Error(data.error || "Route failed");
      }

      const botMsg: Message = { id: Date.now() + 1, text: data.text, sender: 'bot' };
      setMessages(prev => [...prev, botMsg]);
    } catch (error: any) {
      console.warn("API Route failed, trying direct client fallback...", error);
      
      // 2. Second attempt: Call Gemini DIRECTLY from browser if route fails
      if (geminiApiKey) {
        try {
          const genAI = new GoogleGenerativeAI(geminiApiKey);
          const model = genAI.getGenerativeModel({ 
            model: "gemini-3.1-flash-lite", // Confirmed GA in 2026
            systemInstruction: `You are the AI Coach for "Learn to Leader". Respond in ${language === 'es' ? 'Spanish' : language === 'pt' ? 'Portuguese' : 'English'}. Be concise. Use markdown formatting like bold for emphasis.`
          });
          const result = await model.generateContent(userText);
          const botMsg: Message = { id: Date.now() + 1, text: result.response.text(), sender: 'bot' };
          setMessages(prev => [...prev, botMsg]);
        } catch (directError: any) {
          console.error("Direct call failed:", directError);
          setMessages(prev => [...prev, { 
            id: Date.now() + 1, 
            text: "He tenido un problema con mi base de datos. ¿Podrías intentar enviarme el mensaje otra vez?", 
            sender: 'bot' 
          }]);
        }
      } else {
        setMessages(prev => [...prev, { 
          id: Date.now() + 1, 
          text: "Lo siento, la conexión falló. Por favor, asegúrate de haber configurado tu API Key correctamente.", 
          sender: 'bot' 
        }]);
      }
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 w-full max-w-md pointer-events-none z-40">
      <div className="relative w-full h-full px-6 flex flex-col items-end">
        
        {/* Chat Window Pop-up */}
        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="pointer-events-auto mb-4 w-full max-w-[320px] bg-white border-2 border-brand-primary rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[400px]"
            >
              {/* Header */}
              <div className="bg-brand-primary p-4 flex justify-between items-center text-white">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center border border-white/30">
                    <Bot size={18} />
                  </div>
                  <span className="font-fredoka font-bold">{t('chat.title')}</span>
                </div>
                <button 
                  onClick={() => setIsChatOpen(false)}
                  className="p-1 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Messages Area */}
              <div 
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 bg-brand-light/20 scroll-smooth"
              >
                {messages.map((msg) => (
                  <div 
                    key={msg.id}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`
                      max-w-[90%] p-3 rounded-2xl text-sm font-medium shadow-sm
                      ${msg.sender === 'user' 
                        ? 'bg-brand-primary text-white rounded-br-none' 
                        : 'bg-white text-brand-dark border border-brand-light rounded-bl-none'}
                    `}>
                      <div className="markdown-content">
                        <ReactMarkdown 
                          components={{
                            ul: ({node, ...props}) => <ul className="list-disc ml-4 mt-1" {...props} />,
                            ol: ({node, ...props}) => <ol className="list-decimal ml-4 mt-1" {...props} />,
                            p: ({node, ...props}) => <p className="mb-1 last:mb-0" {...props} />,
                          }}
                        >
                          {msg.text}
                        </ReactMarkdown>
                      </div>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-brand-light p-3 rounded-2xl rounded-bl-none shadow-sm flex gap-1">
                      <span className="w-1.5 h-1.5 bg-brand-primary rounded-full animate-bounce"></span>
                      <span className="w-1.5 h-1.5 bg-brand-primary rounded-full animate-bounce [animation-delay:0.2s]"></span>
                      <span className="w-1.5 h-1.5 bg-brand-primary rounded-full animate-bounce [animation-delay:0.4s]"></span>
                    </div>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <form 
                onSubmit={handleSend}
                className="p-3 bg-white border-t border-brand-light flex gap-2"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={t('chat.placeholder')}
                  className="flex-1 bg-brand-light/30 border-2 border-transparent focus:border-brand-primary rounded-xl px-4 py-2 text-sm outline-none transition-all font-medium"
                />
                <button 
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="bg-brand-primary text-white p-2 rounded-xl hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 transition-all"
                >
                  <Send size={18} />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mascot Floating Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          animate={{ 
            y: isChatOpen ? 0 : [0, -8, 0],
          }}
          transition={{ 
            y: { repeat: Infinity, duration: 3, ease: "easeInOut" },
            scale: { type: "spring", stiffness: 400, damping: 10 }
          }}
          onClick={() => setIsChatOpen(!isChatOpen)}
          className={`
            pointer-events-auto w-16 h-16 rounded-full border-4 shadow-xl overflow-hidden relative
            transition-colors duration-300
            ${isChatOpen ? 'border-brand-primary rotate-12' : 'border-white'}
          `}
        >
          <img 
            src={getAssetUrl("/assets/images/ChatBotLogo.webp")} 
            alt="AI Coach" 
            className="w-full h-full object-cover"
          />
          {/* Unread badge or indicator if needed */}
          {!isChatOpen && (
            <div className="absolute top-0 right-0 w-4 h-4 bg-brand-accent rounded-full border-2 border-white animate-pulse"></div>
          )}
        </motion.button>
      </div>
    </div>
  );
}
