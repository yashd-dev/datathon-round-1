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

export default function Chat() {
  const [messages, setMessages] = useState([
    {
      role: "user",
      content:
        "You are an insurance expert specializing exclusively in insurance policies, products, and regulations in India. This includes private insurance offerings and Indian government schemes related to insurance, such as health, life, crop, and other specialized policies. Use the provided context to inform your responses, ensuring they are accurate and specific to the Indian market. If you don't know the answer to a question, respond with 'I don't know' rather than providing incorrect or irrelevant information.",
    },
    {
      role: "model",
      content: `I’m an insurance expert specializing exclusively in the Indian insurance market, including private policies and government schemes like health, life, crop, and other insurance programs. I can assist you with questions about policies, products, regulations, and government initiatives specific to India. Please ask your questions, and I’ll provide accurate and helpful information based on the provided context. If I’m unsure about something, I’ll inform you rather than giving incorrect or irrelevant information. How can I assist you today?`,
    },
  ]);

  const [input, setInput] = useState("");
  const contextAdded = useRef(false);

  useEffect(() => {
    const storedMessages = localStorage.getItem("chatHistory");
    const storedContext = localStorage.getItem("chatContext");

    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }

    if (storedContext) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "system", content: `${storedContext}` },
      ]);
      contextAdded.current = true;
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(messages));
  }, [messages]);

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
        content: "Sorry, I encountered an error. Please try again.",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }
  };

  return (
    <Card className="flex flex-col h-full max-w-4xl mx-auto my-4 shadow-lg p-4">
      <CardHeader className="bg-blue-500 text-white rounded-t-lg p-4">
        <CardTitle className="text-2xl font-bold text-center">
          Insurance Expert Chat
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-auto p-4 space-y-4 bg-white">
        {messages
          .filter((m) => m.role !== "system")
          .map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
        <div
          ref={(el) => {
            if (el) {
              el.scrollIntoView({ behavior: "smooth" });
            }
          }}
        />
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
            Send
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
