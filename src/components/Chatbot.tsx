import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Minus, Maximize2 } from "lucide-react"; // Import Minus and Maximize2 icons
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useNavigate, useLocation } from "react-router-dom";

interface ChatMessage {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false); // New state for minimize functionality
  const [isScrolled, setIsScrolled] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      text: "Hello! I'm here to help you with your real estate needs. Please fill out our contact form and we'll get back to you as soon as possible!",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const messagesEndRef = useRef<HTMLDivElement>(null); // Ref for scrolling messages

  // Hide chatbot on admin panel
  if (location.pathname === '/admin') {
    return null;
  }

  // Effect for handling scroll to update button color
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Effect for scrolling to the latest message in the chat window
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [messages, isMinimized]); // Re-scroll when messages change or minimization state changes

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now(),
      text: inputMessage,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");

    // Add bot response after a short delay
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: Date.now() + 1,
        text: "Thank you for your message! We will contact you later. Please fill out our contact form for a detailed response, and our team will get back to you within 24 hours.",
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleContactFormRedirect = () => {
    setIsOpen(false);
    setIsMinimized(false); // Reset minimize state when closing or redirecting
    navigate('/contact');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // Function to toggle between minimized and full chat window
  const toggleMinimize = () => {
    setIsMinimized(prev => !prev);
  };

  // Function to close the chatbot entirely
  const closeChatbot = () => {
    setIsOpen(false);
    setIsMinimized(false); // Ensure minimize state is reset when closing
  };

  // Function to open the chatbot, ensuring it starts in a full (non-minimized) view
  const openChatbot = () => {
    setIsOpen(true);
    setIsMinimized(false); // Open to full view by default
  };

  return (
    <>
      {/* Chat Button (Visible only when the chatbot window is closed) */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            onClick={openChatbot} // Use openChatbot to handle state
            className={`h-14 w-14 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${
              isScrolled
                ? 'bg-[#006d4e] hover:bg-[#CFCB11]' // Color when scrolled
                : 'bg-[#CFCB11] hover:bg-brand-green/90' // Initial color
            }`}
            size="icon"
          >
            <MessageCircle className="h-6 w-6 text-white animate-bounce" />
          </Button>
        </div>
      )}

      {/* Chat Window (Visible when isOpen is true) */}
      {isOpen && (
        // Adjust the container's size dynamically based on isMinimized state
        <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ease-in-out
          ${isMinimized ? 'w-80 h-16' : 'w-80 sm:w-96 h-[400px]'}`}> {/* Added a fixed height for full view */}
          <Card className="shadow-xl border border-gray-200 h-full flex flex-col"> {/* Ensure card takes full height and uses flex for layout */}
            <CardHeader className="bg-brand-green text-white rounded-t-lg flex-shrink-0"> {/* flex-shrink-0 to prevent header from shrinking */}
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Real Estate Assistant</CardTitle>
                <div className="flex gap-1"> {/* Group minimize and close buttons */}
                  {/* Minimize/Maximize Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleMinimize}
                    className="text-white hover:bg-white/20 h-8 w-8"
                  >
                    {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minus className="h-4 w-4" />} {/* Toggle icon based on state */}
                  </Button>
                  {/* Close Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={closeChatbot} // Use the dedicated close function
                    className="text-white hover:bg-white/20 h-8 w-8"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            {/* Conditionally render chat content based on minimized state */}
            {!isMinimized && (
              <CardContent className="p-0 flex-grow flex flex-col"> {/* flex-grow to take remaining space */}
                {/* Messages Container */}
                <div ref={messagesEndRef} className="h-64 overflow-y-auto p-4 space-y-3 flex-grow"> {/* flex-grow for message area */}
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                    >
                      <div
                        className={`max-w-[80%] px-3 py-2 rounded-lg text-sm ${
                          message.isBot
                            ? 'bg-gray-100 text-gray-800'
                            : 'bg-[#006d4e] text-white' // User messages in brand green
                        }`}
                      >
                        {message.text}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Contact Form Button */}
                <div className="p-4 border-t bg-green-50 flex-shrink-0"> {/* flex-shrink-0 to prevent button from shrinking */}
                  <Button
                    onClick={handleContactFormRedirect}
                    className="w-full bg-[#006d4e] hover:bg-[#006d4e]/90 text-white mb-3 h-12 text-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    📞 Go to Contact Form
                  </Button>
                </div>

                {/* Input Area */}
                <div className="p-4 pt-0 border-t flex-shrink-0"> {/* flex-shrink-0 to keep input stable */}
                  <div className="flex gap-2">
                    <Input
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your message..."
                      className="flex-1"
                    />
                    <Button
                      onClick={handleSendMessage}
                      size="icon"
                      className="bg-[#006d4e] hover:bg-[#006d4e]/90 text-white"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      )}
    </>
  );
};

export default Chatbot;