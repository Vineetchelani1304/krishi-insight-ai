import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageSquare, Send, Bot, User, Globe, Mic, Languages, Lightbulb } from "lucide-react";

const AIAssistant = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      content: "Hello! I'm your AI agricultural assistant. I can help you with farming questions in multiple languages. How can I assist you today?",
      timestamp: "10:30 AM",
      language: "English"
    }
  ]);
  
  const [currentMessage, setCurrentMessage] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [isTyping, setIsTyping] = useState(false);

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "hi", name: "Hindi", flag: "🇮🇳" },
    { code: "es", name: "Spanish", flag: "🇪🇸" },
    { code: "fr", name: "French", flag: "🇫🇷" },
    { code: "pt", name: "Portuguese", flag: "🇧🇷" },
    { code: "ar", name: "Arabic", flag: "🇸🇦" }
  ];

  const quickQuestions = [
    "What's the best fertilizer for tomatoes?",
    "How to control pest in rice crops?",
    "When should I harvest wheat?",
    "Organic farming techniques for vegetables",
    "Soil pH requirements for different crops",
    "Weather impact on crop yield"
  ];

  const handleSendMessage = () => {
    if (!currentMessage.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      type: "user" as const,
      content: currentMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      language: languages.find(lang => lang.code === selectedLanguage)?.name || "English"
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        type: "bot" as const,
        content: generateResponse(currentMessage),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        language: languages.find(lang => lang.code === selectedLanguage)?.name || "English"
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const generateResponse = (question: string) => {
    const responses = [
      "Based on your soil conditions and current weather patterns, I recommend applying nitrogen-rich fertilizer during the vegetative growth stage. The optimal ratio would be 120-60-40 NPK per hectare.",
      "For effective pest control in rice, implement integrated pest management (IPM). Use pheromone traps for early detection, maintain proper water levels, and apply neem-based organic pesticides during evening hours.",
      "Wheat harvest timing is crucial for maximum yield. Check for grain moisture content below 14%, golden color, and firm grain texture. In your region, this typically occurs 110-130 days after sowing.",
      "Organic farming focuses on soil health and biodiversity. Use compost, green manures, crop rotation, and biological pest control. Avoid synthetic chemicals and maintain soil microorganism balance."
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleQuickQuestion = (question: string) => {
    setCurrentMessage(question);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-3 bg-gradient-to-br from-warning/10 to-warning/20 rounded-lg">
            <MessageSquare className="h-6 w-6 text-warning" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">AI Agricultural Assistant</h1>
            <p className="text-muted-foreground">Multilingual RAG-powered chatbot for instant farming guidance</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Chat Interface */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center">
                <Bot className="h-5 w-5 mr-2 text-primary" />
                Chat with AgriSense AI
              </CardTitle>
              <div className="flex items-center space-x-2">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code}>
                        <span className="flex items-center">
                          <span className="mr-2">{lang.flag}</span>
                          {lang.name}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <CardDescription>
              Ask questions about crops, diseases, weather, market prices, and farming techniques
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {/* Messages */}
            <div className="h-96 overflow-y-auto mb-4 space-y-4 p-4 border border-border rounded-lg bg-muted/20">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                    message.type === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-card border border-border"
                  }`}>
                    <div className="flex items-start space-x-2">
                      {message.type === "bot" && (
                        <Bot className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                      )}
                      {message.type === "user" && (
                        <User className="h-4 w-4 mt-0.5 text-primary-foreground flex-shrink-0" />
                      )}
                      <div className="flex-1">
                        <p className="text-sm">{message.content}</p>
                        <div className="flex justify-between items-center mt-2 text-xs opacity-70">
                          <span>{message.timestamp}</span>
                          <Badge variant="outline" className="text-xs">
                            {message.language}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="max-w-xs lg:max-w-md px-4 py-3 rounded-lg bg-card border border-border">
                    <div className="flex items-center space-x-2">
                      <Bot className="h-4 w-4 text-primary" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-100"></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-200"></div>
                      </div>
                      <span className="text-sm text-muted-foreground">AI is thinking...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Message Input */}
            <div className="flex space-x-2">
              <div className="relative flex-1">
                <Input
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  placeholder="Ask me anything about farming..."
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="pr-12"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-2 h-6 w-6 p-0"
                >
                  <Mic className="h-4 w-4 text-muted-foreground" />
                </Button>
              </div>
              <Button onClick={handleSendMessage} disabled={!currentMessage.trim() || isTyping}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Questions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Lightbulb className="h-5 w-5 mr-2 text-warning" />
                Quick Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {quickQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="w-full justify-start text-left h-auto p-3 hover:bg-muted/50"
                    onClick={() => handleQuickQuestion(question)}
                  >
                    <div className="text-sm">{question}</div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AI Capabilities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Bot className="h-5 w-5 mr-2 text-primary" />
                AI Capabilities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-success rounded-full mt-2"></div>
                  <span>Crop disease identification & treatment</span>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-success rounded-full mt-2"></div>
                  <span>Soil analysis & fertilizer recommendations</span>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-success rounded-full mt-2"></div>
                  <span>Weather-based farming advice</span>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-success rounded-full mt-2"></div>
                  <span>Market price trends & analysis</span>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-success rounded-full mt-2"></div>
                  <span>Organic farming techniques</span>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-success rounded-full mt-2"></div>
                  <span>Government scheme information</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Language Support */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Languages className="h-5 w-5 mr-2 text-accent" />
                Language Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-2">
                {languages.map((lang) => (
                  <div key={lang.code} className="flex items-center space-x-2 text-sm">
                    <span>{lang.flag}</span>
                    <span className={selectedLanguage === lang.code ? "font-medium text-primary" : "text-muted-foreground"}>
                      {lang.name}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Usage Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Today's Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Questions Asked</span>
                  <span className="font-medium">12</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>AI Responses</span>
                  <span className="font-medium">12</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Languages Used</span>
                  <span className="font-medium">3</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Satisfaction</span>
                  <span className="font-medium text-success">98%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;