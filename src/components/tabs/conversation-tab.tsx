// import { ArrowUp, Upload } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"

// export default function ConversationTab() {
//   return (
//     <div className="h-full flex flex-col overflow-auto">
//       <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
//         <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mb-4">
//           <Upload className="h-5 w-5 text-blue-500" />
//         </div>
//         <h3 className="text-lg font-medium mb-2">Thêm một nguồn để bắt đầu</h3>
//         <Button variant="outline" className="mt-4 rounded-full">
//           Tải nguồn lên
//         </Button>
//       </div>

//       <div className="p-4 border-t">
//         <div className="relative">
//           <Input placeholder="Tải một nguồn lên để bắt đầu" className="pr-10 bg-white rounded-full" disabled />
//           <Button size="icon" className="absolute right-1 top-1 h-7 w-7 rounded-full bg-blue-500 text-white" disabled>
//             <ArrowUp className="h-4 w-4" />
//           </Button>
//         </div>
//         <div className="text-xs text-center text-gray-500 mt-2">
//           NotebookLM có thể đưa ra thông tin không chính xác; hãy kiểm tra kỹ câu trả lời mà bạn nhận được.
//         </div>
//       </div>
//     </div>
//   )
// }


import { useState, useEffect, useRef } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Define the type for a message
interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

export default function ConversationTab() {
  // State for chat messages with explicit type
  const [messages, setMessages] = useState<Message[]>([]);
  // State for the current input
  const [input, setInput] = useState<string>("");
  // State for the streaming message
  const [currentMessage, setCurrentMessage] = useState<string>("");
  // State for typing indicator
  const [isTyping, setIsTyping] = useState<boolean>(false);
  // Ref for WebSocket with explicit type
  const wsRef = useRef<WebSocket | null>(null);
  // Ref to scroll to the latest message with explicit type
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
        }
        if (data.isFinal) {
          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: currentMessage.trim() },
          ]);
          setCurrentMessage("");
          setIsTyping(false);
        }
      };
  
      ws.onclose = () => {
        console.log("WebSocket disconnected, reconnecting...");
        setTimeout(connect, 1000);
      };
  
      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
      };
    };
  
    connect();
  
    return () => {
      wsRef.current?.close();
    };
  }, []);

  // Scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, currentMessage]);

  // Handle sending a message
  const handleSendMessage = () => {
    if (!input.trim()) return;

    // Add user's message to the chat history
    setMessages((prev) => [...prev, { role: "user", content: input }]);

    // Send message via WebSocket
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ message: input }));
    }

    // Clear input
    setInput("");
  };

  return (
    <div className="h-full flex flex-col overflow-auto">
      {/* Chat History */}
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

      {/* Input Area */}
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