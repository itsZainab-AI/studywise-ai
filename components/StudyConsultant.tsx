
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { getStudyGuideResponse } from '../services/geminiService';

const SYSTEM_PROMPT = `You are StudyWise AI, a free, expert-level study abroad assistant built specifically for Indian students.
Your role is to guide students step-by-step in studying abroad.
Ask clear, minimal questions before giving recommendations.
Prioritize budget-friendly and high-ROI options (Germany, public unis, Ireland, etc.).
Structure SOP/LOR advice with line-by-line improvement.
Be strict, transparent, and accurate like a real international education expert.
If a student's goal is unrealistic (e.g. low GPA for Ivy League), explain why honestly.`;

export const StudyConsultant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Namaste! I am StudyWise AI. To help you better, could you tell me your current academic background and your dream study destination?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: ChatMessage = { role: 'user', text: input };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const responseText = await getStudyGuideResponse(newMessages, SYSTEM_PROMPT);
      setMessages([...newMessages, { role: 'model', text: responseText }]);
    } catch (error) {
      setMessages([...newMessages, { role: 'model', text: 'Oops, something went wrong. Let me try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] md:h-[calc(100vh-4rem)] max-w-4xl mx-auto bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl p-4 ${
              msg.role === 'user' 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-slate-50 text-slate-800 border border-slate-100'
            }`}>
              <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-.3s]" />
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-.5s]" />
            </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      <div className="p-4 border-t border-slate-100 bg-slate-50/50">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Tell me about your GPA, budget, or destination..."
            className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
          <button
            onClick={handleSend}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-6 py-3 rounded-xl font-medium transition-colors"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};
