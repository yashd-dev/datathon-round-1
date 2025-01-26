import ReactMarkdown from "react-markdown";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ChatMessage({ message }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`flex items-start space-x-2 ${
          isUser ? "flex-row-reverse" : ""
        }`}
      >
        <Avatar className="w-8 h-8">
          <AvatarImage
            src={
              isUser
                ? "https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_3.png"
                : "https://github.com/shadcn.png"
            }
          />
          <AvatarFallback>{isUser ? "You" : "Bot"}</AvatarFallback>
        </Avatar>
        <div
          className={`p-3 rounded-lg  w-3/4 ${
            isUser
              ? "bg-blue-500 text-white"
              : "bg-white border border-gray-300"
          }`}
        >
          <ReactMarkdown>{message.content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
