"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ChatMessage from "@/components/chat-message";
import { Send } from "lucide-react";

export default function Chat() {
  const [messages, setMessages] = useState([
    {
      role: "model",
      content: `Namaste! I'm your AI Insurance Expert, specializing in Indian insurance policies, products, and regulations. I can assist you with information about private insurance offerings and government schemes related to health, life, crop, and other specialized policies in India. How may I help you today?`,
    },
  ]);

  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const contextAdded = useRef(false);

  useEffect(() => {
    const storedMessages = localStorage.getItem("chatHistory");
    const storedContext = localStorage.getItem("chatContext");

    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }

    if (storedContext && !contextAdded.current) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "system", content: `Context: ${storedContext}` },
      ]);
      contextAdded.current = true;
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messagesEndRef]); //Corrected dependency

  const handleSend = async () => {
    if (input.trim() === "") return;

    const newMessage = { role: "user", content: input };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInput("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          history: messages,
          message: input,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response from API");
      }

      const data = await response.json();
      const botMessage = { role: "model", content: data.response };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error:", error);
      const errorMessage = {
        role: "model",
        content:
          "I apologize, but I encountered an error. Could you please try again?",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Card className="flex flex-col h-[90%] w-full max-w-4xl my-5 mx-auto shadow-lg">
        <CardHeader className="bg-blue-500 text-white rounded-t-lg p-4">
          <CardTitle className="text-2xl font-bold text-center">
            Indian Insurance Expert
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-grow overflow-y-auto p-4 space-y-4 bg-white">
          {messages
            .filter((m) => m.role !== "system")
            .map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))}
          <div ref={messagesEndRef} />
        </CardContent>
        <CardFooter className="bg-gray-50 p-4">
          <div className="flex items-center w-full space-x-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about insurance policies in India..."
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              className="flex-grow"
            />
            <Button
              onClick={handleSend}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
