import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ChatMessage({ message }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`flex items-start space-x-2 ${
          isUser ? "flex-row-reverse" : ""
        }`}
      >
        <Avatar className={isUser ? "bg-blue-500" : "bg-green-500"}>
          <AvatarFallback>{isUser ? "U" : "AI"}</AvatarFallback>
          {!isUser && <AvatarImage src="/ai-avatar.png" alt="AI Avatar" />}
        </Avatar>
        <div
          className={`max-w-md p-3 rounded-lg ${
            isUser ? "bg-blue-100 text-blue-900" : "bg-gray-100 text-gray-900"
          }`}
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            className="prose prose-sm max-w-none"
          >
            {message.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
