
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, X, Send, Bot, User, Sparkles, Mic, MicOff, Volume2, VolumeX } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

// TypeScript declarations for Web Speech API
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your AI health assistant. How can I help you today? 🩺',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const recognitionRef = useRef<any>(null);
  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (speechSynthesisRef.current) {
        speechSynthesis.cancel();
      }
    };
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const speakText = (text: string) => {
    if (!voiceEnabled || !('speechSynthesis' in window)) return;

    // Cancel any ongoing speech
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 0.8;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    speechSynthesisRef.current = utterance;
    speechSynthesis.speak(utterance);
  };

  const toggleVoice = () => {
    setVoiceEnabled(!voiceEnabled);
    if (isSpeaking) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const sendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot response with typing indicator
    setTimeout(() => {
      const botResponseText = getBotResponse(inputMessage);
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponseText,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
      
      // Speak the bot response if voice is enabled
      if (voiceEnabled) {
        speakText(botResponseText);
      }
    }, 1500);
  };

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('appointment') || input.includes('schedule')) {
      return "🏥 I can help you schedule an appointment! Navigate to the AME Schedule section where you can select dates, therapy types, and provide symptoms. The enhanced scheduling system will guide you through each step including therapy selection, disease categories, time slots, and priority levels for a comprehensive booking experience.";
    }
    
    if (input.includes('health') || input.includes('medical') || input.includes('prediction')) {
      return "🩺 For health insights, try our AI Health Prediction feature! It analyzes symptoms and provides health predictions, precautions, and medication suggestions. You can also check your Health Records for comprehensive medical history and vital signs tracking.";
    }
    
    if (input.includes('document') || input.includes('upload') || input.includes('analyze')) {
      return "📋 Our Document Upload system uses advanced NLP to extract detailed medical information! Upload any medical document and click 'View Details' to see comprehensive analysis including vital signs, lab results, imaging findings, vaccination records, and AI-generated medical reports with insights.";
    }
    
    if (input.includes('symptom') || input.includes('pain') || input.includes('fever') || input.includes('headache')) {
      return "🔍 Based on your symptoms, I recommend using our AI Health Prediction tool for detailed analysis. You can also schedule an appointment with the appropriate specialist through our enhanced booking system. Would you like me to guide you to these features?";
    }
    
    if (input.includes('emergency') || input.includes('urgent') || input.includes('critical')) {
      return "🚨 For emergency situations, please contact emergency services immediately! For urgent but non-emergency health concerns, you can schedule a priority appointment through our booking system with urgent priority level.";
    }
    
    if (input.includes('medication') || input.includes('prescription') || input.includes('drug')) {
      return "💊 Our AI Health Prediction system can suggest medications based on symptoms and health conditions. However, always consult with healthcare professionals before taking any medication. Your medical history in Health Records can also provide prescription information.";
    }
    
    if (input.includes('voice') || input.includes('speak') || input.includes('talk')) {
      return "🎙️ Great! I support voice interaction. You can speak to me by clicking the microphone button, and I can read responses aloud using the voice toggle. This makes our conversation more natural and accessible!";
    }
    
    if (input.includes('therapy') || input.includes('treatment')) {
      return "🏥 Our appointment system now includes detailed therapy selection! You can choose from General Consultation, Cardiology, Dermatology, Orthopedics, Neurology, and more. Each therapy type has specialized forms to capture relevant health information.";
    }
    
    if (input.includes('help') || input.includes('support') || input.includes('guide')) {
      return "🤖 I'm your comprehensive AI health assistant! I can help with:\n• 📅 Enhanced appointment scheduling with therapy types and disease categories\n• 🏥 AI health predictions and symptom analysis\n• 📄 Advanced document analysis with NLP extraction\n• 📊 Health record management and vital tracking\n• 🎯 Navigation and feature guidance\n\nWhat would you like to explore?";
    }
    
    return "👋 Hello! I'm your advanced AI health assistant with voice capabilities! I can help with intelligent appointment scheduling (now with therapy selection and disease categories), AI-powered health predictions, sophisticated document analysis with NLP, and comprehensive health management. How can I assist you today?";
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 rounded-full w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg transition-all duration-300 transform hover:scale-110 ${
          !isOpen ? 'animate-pulse' : ''
        }`}
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <div className="relative">
            <MessageCircle className="h-6 w-6 text-white" />
            <Sparkles className="h-3 w-3 text-white absolute -top-1 -right-1 animate-pulse" />
          </div>
        )}
      </Button>

      {/* Chatbot Window */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 z-40 w-96 h-[32rem] shadow-2xl border-0 animate-scale-in">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg p-4">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Bot className="h-6 w-6" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                </div>
                <div>
                  <span className="text-lg font-semibold">Health Assistant</span>
                  <p className="text-xs text-blue-100 font-normal">Powered by AI</p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={toggleVoice}
                className="text-white hover:bg-blue-700"
                title={voiceEnabled ? "Disable voice" : "Enable voice"}
              >
                {voiceEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              </Button>
            </CardTitle>
          </CardHeader>
          
          <CardContent className="flex flex-col h-full p-0">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                >
                  <div
                    className={`max-w-xs px-4 py-3 rounded-2xl text-sm shadow-sm ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-sm'
                        : 'bg-white text-gray-800 border border-gray-200 rounded-bl-sm'
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      {message.sender === 'bot' && (
                        <Bot className="h-4 w-4 mt-0.5 flex-shrink-0 text-blue-600" />
                      )}
                      {message.sender === 'user' && (
                        <User className="h-4 w-4 mt-0.5 flex-shrink-0 text-white opacity-80" />
                      )}
                      <span className="leading-relaxed">{message.text}</span>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start animate-fade-in">
                  <div className="bg-white text-gray-800 border border-gray-200 px-4 py-3 rounded-2xl rounded-bl-sm shadow-sm">
                    <div className="flex items-center space-x-2">
                      <Bot className="h-4 w-4 text-blue-600" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="border-t bg-white p-4">
              <div className="flex space-x-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={isListening ? "Listening..." : "Type or speak your health question..."}
                  className="flex-1 border-gray-300 focus:border-blue-500 rounded-full px-4"
                  disabled={isTyping || isListening}
                />
                {recognitionRef.current && (
                  <Button 
                    onClick={toggleListening}
                    size="sm"
                    variant={isListening ? "destructive" : "outline"}
                    className={`rounded-full w-10 h-10 p-0 ${isListening ? "bg-red-600 hover:bg-red-700" : ""}`}
                    title={isListening ? "Stop listening" : "Start voice input"}
                  >
                    {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                  </Button>
                )}
                <Button 
                  onClick={sendMessage} 
                  size="sm"
                  disabled={!inputMessage.trim() || isTyping || isListening}
                  className="rounded-full w-10 h-10 p-0 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200 hover:scale-105"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              {isSpeaking && (
                <div className="mt-2 text-sm text-blue-600 flex items-center justify-center">
                  <Volume2 className="h-3 w-3 mr-1 animate-pulse" />
                  Speaking response...
                </div>
              )}
              <p className="text-xs text-gray-500 mt-2 text-center">
                AI assistant to help with your health queries
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default Chatbot;
