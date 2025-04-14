import { useState, useEffect, useRef } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Message {
  role: "user" | "assistant" | "system" | "error";
  content: string;
}

export default function ConversationTab() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const wsRef = useRef<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const connect = () => {
      const ws = new WebSocket("ws://localhost:8080");
      wsRef.current = ws;

      ws.onopen = () => {
        console.log("WebSocket connected");
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === "message") {
          setIsTyping(true);
          setCurrentMessage((prev) => prev + data.content + " ");
          if (data.isFinal) {
            setMessages((prev) => [
              ...prev,
              { role: "assistant", content: currentMessage.trim() + " " + data.content },
            ]);
            setCurrentMessage("");
            setIsTyping(false);
          }
        } else if (data.type === "error") {
          setMessages((prev) => [
            ...prev,
            { role: "error", content: data.content },
          ]);
          setIsTyping(false);
        }
      };

      ws.onclose = () => {
        console.log("WebSocket disconnected, reconnecting...");
        setTimeout(connect, 1000);
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
        setMessages((prev) => [
          ...prev,
          { role: "error", content: "WebSocket connection failed" },
        ]);
      };
    };

    connect();

    return () => {
      wsRef.current?.close();
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, currentMessage]);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { role: "user", content: input }]);

    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ message: input }));
    } else {
      setMessages((prev) => [
        ...prev,
        { role: "error", content: "Không thể kết nối tới server" },
      ]);
    }

    setInput("");
  };

  return (
    <div className="h-full flex flex-col overflow-auto">
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.length === 0 && !isTyping ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <h3 className="text-lg font-medium mb-2">Bắt đầu trò chuyện</h3>
            <p className="text-sm text-gray-500">
              Gửi một tin nhắn để bắt đầu trò chuyện với chatbot.
            </p>
          </div>
        ) : (
          <>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-4 flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-lg p-3 rounded-lg ${
                    msg.role === "user"
                      ? "bg-blue-500 text-white"
                      : msg.role === "error"
                      ? "bg-red-200 text-red-800"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="mb-4 flex justify-start">
                <div className="max-w-lg p-3 rounded-lg bg-gray-200 text-gray-800">
                  {currentMessage}
                  <span className="animate-pulse">...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      <div className="p-4 border-t">
        <div className="relative">
          <Input
            placeholder="Nhập tin nhắn của bạn..."
            className="pr-10 bg-white rounded-full"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <Button
            size="icon"
            className="absolute right-1 top-1 h-7 w-7 rounded-full bg-blue-500 text-white"
            onClick={handleSendMessage}
          >
            <ArrowUp className="h-4 w-4" />
          </Button>
        </div>
        <div className="text-xs text-center text-gray-500 mt-2">
          Chatbot có thể đưa ra thông tin không chính xác; hãy kiểm tra kỹ câu trả lời mà bạn nhận được.
        </div>
      </div>
    </div>
  );
}