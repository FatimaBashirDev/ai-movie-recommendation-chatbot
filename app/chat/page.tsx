'use client';
import Link from 'next/link';
import { useState, useRef, useEffect, FormEvent } from 'react';
import { Send, Loader2, Bot, User, Star, Calendar, Film } from 'lucide-react';

interface Movie {
  id: number;
  title: string;
  year: number;
  rating: number;
  genre: string[];
  poster: string;
  description: string;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  movies?: Movie[];
}

interface ChatHistoryItem {
  role: 'user' | 'assistant';
  content: string;
}

const suggestedPrompts = [
  'Recommend action movies like John Wick',
  'I want a comedy to watch with family',
  'Something like Inception',
  'Best sci-fi movies from the 90s',
  'Suggest romantic movies with a twist',
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: "Hi! I'm CineMatch AI 🎬. I can help you discover your next favorite movie. What kind of movie are you in the mood for?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = async (userMessage: string, history: ChatHistoryItem[]): Promise<{ message: string; movies?: Movie[] }> => {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage, history }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from AI');
      }

      const data = await response.json();
      return { message: data.message || "I'm having trouble connecting to my movie knowledge base. Please try again!", movies: data.movies };
    } catch (error) {
      console.error('Error generating response:', error);
      return { message: "I apologize, but I'm having trouble responding right now. Please try again!", movies: undefined };
    }
  };

  const handleSendMessage = async (message?: string) => {
    const messageToSend = message || inputValue.trim();
    if (!messageToSend || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageToSend,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Prepare conversation history (last 10 messages)
      const history: ChatHistoryItem[] = messages
        .slice(-10)
        .map((m) => ({
          role: m.role as 'user' | 'assistant',
          content: m.content,
        }));

      const { message: aiResponse, movies } = await generateResponse(messageToSend, history);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date(),
        movies: movies,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again!',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSendMessage();
  };

  const handleSuggestedPrompt = (prompt: string) => {
    handleSendMessage(prompt);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black pt-20">
      {/* Chat Messages */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
          {messages.map((message, index) => (
            <div
              key={message.id}
              className={`flex gap-4 ${message.role === 'user' ? 'flex-row-reverse' : ''} animate-fade-in`}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Avatar */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.role === 'user'
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500'
                    : 'bg-gradient-to-r from-purple-500 to-pink-500'
                }`}
              >
                {message.role === 'user' ? (
                  <User className="w-5 h-5 text-white" />
                ) : (
                  <Bot className="w-5 h-5 text-white" />
                )}
              </div>

              {/* Message Bubble */}
              <div className="max-w-[70%]" style={{ display: 'flex', flexDirection: 'column' }}>
                <div
                  className={`px-5 py-3 rounded-2xl ${
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-tr-sm'
                      : 'bg-white/10 backdrop-blur-lg text-white rounded-tl-sm border border-white/10'
                  }`}
                >
                  <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                </div>

                {/* Movie Cards */}
                {message.movies && message.movies.length > 0 && (
                  <div className="mt-4 grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
                    {message.movies.map((movie) => (
                      <div
                        key={movie.id}
                        className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 overflow-hidden hover:bg-white/15 transition-all duration-300"
                      >
                        <div className="flex">
                          <img
                            src={movie.poster}
                            alt={movie.title}
                            className="w-24 h-36 object-cover flex-shrink-0"
                          />
                          <div className="p-4 flex-1">
                            <h3 className="font-semibold text-white text-lg leading-tight">{movie.title}</h3>
                            <div className="flex items-center gap-3 mt-2 text-sm text-gray-400">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                <span>{movie.year}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-yellow-400" />
                                <span>{movie.rating}</span>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {movie.genre.map((g) => (
                                <span
                                  key={g}
                                  className="px-2 py-0.5 bg-purple-500/30 rounded-full text-xs text-purple-200"
                                >
                                  {g}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="px-4 pb-3">
                          <p className="text-sm text-gray-300 line-clamp-2">{movie.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex gap-4 animate-fade-in">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="bg-white/10 backdrop-blur-lg px-4 py-3 rounded-2xl rounded-tl-sm border border-white/10">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Prompts */}
        {!isLoading && messages.length < 5 && (
          <div className="max-w-4xl mx-auto px-4 pb-4">
            <p className="text-sm text-gray-400 mb-3 px-2">Suggested prompts:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedPrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestedPrompt(prompt)}
                  className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 text-sm text-gray-200 hover:bg-white/20 transition-all duration-200 hover:scale-105"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Input Area */}
      <footer className="sticky bottom-0 bg-black/20 backdrop-blur-lg border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <form onSubmit={handleSubmit} className="flex items-center gap-3">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask for movie recommendations..."
              className="flex-1 px-5 py-3 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400/50 focus:ring-2 focus:ring-purple-400/20 transition-all"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className="p-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-400 hover:to-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 disabled:hover:scale-100"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </footer>
    </div>
  );
}
