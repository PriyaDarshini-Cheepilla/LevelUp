import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, Send, Paperclip, Mic, X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatbotDrawerProps {
  onClose?: () => void;
}

const suggestedPrompts = [
  "Which skills do I need for Product Analyst at Google?",
  "What courses should I take for Data Science?",
  "How can I improve my resume?",
  "What's my career roadmap timeline?"
];

export function ChatbotDrawer({ onClose }: ChatbotDrawerProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi! I'm your AI Career Mentor. I can help you explore career paths, recommend skills to learn, find courses, and answer questions about your roadmap. How can I help you today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages([...messages, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: getAIResponse(input),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handlePromptClick = (prompt: string) => {
    setInput(prompt);
  };

  const getAIResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    if (lowerQuery.includes('product analyst') || lowerQuery.includes('google')) {
      return "For a Product Analyst role at Google, you'll need:\n\n1. **Data Analysis**: SQL, Python, Excel/Sheets\n2. **Product Metrics**: A/B testing, analytics tools (GA, Mixpanel)\n3. **Communication**: Stakeholder management, presentation skills\n4. **Business Acumen**: Market research, user research\n\nBased on your resume, you're missing SQL proficiency. I recommend the 'SQL for Data Analysis' course on Coursera (free audit available). Would you like me to add this to your roadmap?";
    }
    if (lowerQuery.includes('data science') || lowerQuery.includes('courses')) {
      return "Great choice! For Data Science, I recommend:\n\n1. **Python for Data Science** - Coursera (Free)\n2. **Machine Learning Basics** - edX (Free)\n3. **Statistics Fundamentals** - Khan Academy (Free)\n\nThese align with your current skills and will take approximately 12 weeks. Shall I add these to your learning roadmap?";
    }
    if (lowerQuery.includes('resume')) {
      return "I've analyzed your resume. Here are some suggestions:\n\n✓ **Strengths**: Good technical skills section, clear experience\n✗ **Improve**: Add quantifiable achievements (e.g., 'Increased efficiency by 30%')\n✗ **Missing**: Portfolio projects showcasing your skills\n\nWould you like specific examples for your field?";
    }
    return "That's a great question! Based on your profile, I can help you with career paths, skill development, course recommendations, and job matching. Could you provide more details about what you'd like to know?";
  };

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed right-0 top-0 h-full w-full sm:w-[480px] bg-white shadow-2xl z-50 flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-br from-[var(--accent-gradient-start)] to-[var(--accent-gradient-end)]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <MessageCircle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-white" style={{ fontWeight: 600 }}>AI Career Mentor</h3>
            <p className="text-xs text-white/80">Always here to help</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/20"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[var(--surface-muted)]">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`
                max-w-[80%] rounded-[var(--radius-md)] p-4
                ${message.role === 'user'
                  ? 'bg-gradient-to-br from-[var(--accent-gradient-start)] to-[var(--accent-gradient-end)] text-white'
                  : 'bg-white border border-gray-200'
                }
              `}
              style={message.role === 'assistant' ? { boxShadow: 'var(--shadow-card)' } : {}}
            >
              <p className="text-sm whitespace-pre-line">{message.content}</p>
              <p className={`text-xs mt-2 ${message.role === 'user' ? 'text-white/70' : 'text-[var(--text-muted)]'}`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </motion.div>
        ))}

        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="bg-white rounded-[var(--radius-md)] p-4 border border-gray-200">
              <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompts */}
      {messages.length === 1 && (
        <div className="px-4 py-3 border-t border-gray-200 bg-white">
          <p className="text-xs text-[var(--text-muted)] mb-2">Suggested questions:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedPrompts.map((prompt, index) => (
              <Badge
                key={index}
                variant="outline"
                className="cursor-pointer hover:bg-blue-50 hover:border-[var(--accent-solid)] text-xs py-1"
                onClick={() => handlePromptClick(prompt)}
              >
                {prompt}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="flex gap-2">
          <Button variant="outline" size="icon" className="rounded-lg flex-shrink-0">
            <Paperclip className="w-4 h-4" />
          </Button>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask me anything..."
            className="flex-1 rounded-lg"
          />
          <Button variant="outline" size="icon" className="rounded-lg flex-shrink-0">
            <Mic className="w-4 h-4" />
          </Button>
          <Button
            onClick={handleSend}
            size="icon"
            className="rounded-lg flex-shrink-0 bg-gradient-to-br from-[var(--accent-gradient-start)] to-[var(--accent-gradient-end)]"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-xs text-[var(--text-muted)] mt-2 text-center">
          AI can make mistakes. Verify important information.
        </p>
      </div>
    </motion.div>
  );
}
