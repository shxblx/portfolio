"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SendIcon, XIcon, MessageSquareIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { getGeminiResponse } from "@/lib/gemini-api";
import { useTheme } from "next-themes";

const INITIAL_MESSAGE =
  "Hi there! I'm ShibliBot, Shibli's AI assistant. How can I help you today? You can ask me about his skills, projects, experience, or anything else about his professional background.";

type Message = {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  isTyping?: boolean;
  fullText?: string;
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isInitialPopupOpen, setIsInitialPopupOpen] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContentRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  const isBotTyping = messages.some((msg) => msg.isTyping);

  useEffect(() => {
    const timer = setTimeout(() => {
      addNewMessage(INITIAL_MESSAGE, "bot");
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        chatContentRef.current &&
        !chatContentRef.current.contains(event.target as Node) &&
        !(event.target as Element).closest('[data-chat-toggle="true"]')
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const simulateTyping = (text: string, messageId: string) => {
    const typingSpeed = 25;
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i <= text.length) {
        setMessages((messages) =>
          messages.map((msg) =>
            msg.id === messageId
              ? {
                  ...msg,
                  text: text.substring(0, i),
                  isTyping: i < text.length,
                }
              : msg
          )
        );
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, typingSpeed);

    return () => clearInterval(typingInterval);
  };

  const addNewMessage = (text: string, sender: "user" | "bot") => {
    const newMessageId = Date.now().toString();

    if (sender === "bot") {
      setMessages((prev) => [
        ...prev,
        {
          id: newMessageId,
          text: "",
          fullText: text,
          sender,
          timestamp: new Date(),
          isTyping: true,
        },
      ]);

      simulateTyping(text, newMessageId);
    } else {
      setMessages((prev) => [
        ...prev,
        {
          id: newMessageId,
          text,
          sender,
          timestamp: new Date(),
        },
      ]);
    }

    return newMessageId;
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();

    if (!input.trim() || isLoading || isBotTyping) return;

    addNewMessage(input, "user");
    const currentInput = input;
    setInput("");
    setIsLoading(true);

    const chatHistory = messages.slice(-5).map((msg) => ({
      text: msg.fullText || msg.text,
      sender: msg.sender,
    }));

    try {
      const response = await getGeminiResponse(currentInput, chatHistory);
      addNewMessage(response.text, "bot");
    } catch (error) {
      addNewMessage(
        "Sorry, I couldn't process your request. Please try again.",
        "bot"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const closeInitialPopup = () => {
    setIsInitialPopupOpen(false);
  };

  return (
    <>
      <AnimatePresence>
        {isInitialPopupOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-24 right-6 max-w-xs bg-card rounded-lg shadow-lg border border-primary/20 p-4 z-40"
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 h-6 w-6"
              onClick={closeInitialPopup}
            >
              <XIcon className="h-3 w-3" />
            </Button>
            <p className="text-sm">
              Hi there! 👋 I'm ShibliBot, Muhammed Shibli's AI assistant. Chat
              with me to learn more about his skills and experience!
            </p>
            <Button
              className="w-full mt-3"
              size="sm"
              onClick={() => {
                setIsOpen(true);
                closeInitialPopup();
              }}
            >
              Start chatting
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        className="fixed bottom-6 right-6 bg-primary text-primary-foreground p-4 rounded-full shadow-lg hover:shadow-xl z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        data-chat-toggle="true"
      >
        <MessageSquareIcon className="h-6 w-6" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 right-6 w-80 md:w-96 z-50"
            ref={chatContentRef}
          >
            <Card className="shadow-xl border-primary/20 overflow-hidden h-[500px] flex flex-col">
              <CardHeader className="bg-primary/10 py-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-md font-medium flex items-center gap-2">
                    <MessageSquareIcon className="h-5 w-5 text-primary" />
                    Chat with ShibliBot
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setIsOpen(false)}
                  >
                    <XIcon className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="flex-1 overflow-y-auto py-4 px-3">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        "flex flex-col max-w-[80%] rounded-lg p-3",
                        message.sender === "user"
                          ? "bg-primary text-primary-foreground ml-auto"
                          : "bg-muted self-start"
                      )}
                    >
                      <p className="text-sm break-words">
                        {message.text}
                        {message.isTyping && (
                          <span className="inline-block animate-pulse">▌</span>
                        )}
                      </p>
                      <span
                        className={cn(
                          "text-xs mt-1",
                          message.sender === "user"
                            ? "text-primary-foreground/70 text-right"
                            : "text-muted-foreground"
                        )}
                      >
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex items-center space-x-2 bg-muted self-start rounded-lg p-3 max-w-[80%]">
                      <div className="flex space-x-1">
                        <div
                          className="w-2 h-2 bg-primary/40 rounded-full animate-bounce"
                          style={{ animationDelay: "0s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-primary/40 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-primary/40 rounded-full animate-bounce"
                          style={{ animationDelay: "0.4s" }}
                        ></div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </CardContent>

              <CardFooter className="p-3 bg-muted/40 border-t">
                <form
                  onSubmit={handleSendMessage}
                  className="flex w-full gap-2"
                >
                  <Input
                    placeholder="Type your message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 bg-background"
                    disabled={isLoading || isBotTyping}
                  />
                  <Button
                    type="submit"
                    size="icon"
                    disabled={isLoading || isBotTyping || !input.trim()}
                  >
                    <SendIcon className="h-4 w-4" />
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
