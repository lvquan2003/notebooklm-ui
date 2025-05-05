import { useState, useEffect, useRef } from "react";
import { ArrowUp, Copy, Pin, ThumbsDown, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Message {
  role: "user" | "assistant" | "system" | "error";
  content: string;
}

interface MessageListProps {
  refresh: boolean;
  setRefresh: (value: boolean) => void;
}

export default function ConversationTab({ refresh, setRefresh }: MessageListProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  // const [copied, setCopied] = useState(false);
  const [copiedStates, setCopiedStates] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, currentMessage]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { role: "user", content: input }]);
    setIsTyping(true);
    setCurrentMessage("");

    try {
      const response = await fetch("http://localhost:8080/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) {
        throw new Error("Failed to connect to server");
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error("Failed to read response stream");
      }

      let accumulatedMessage = "";
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n").filter((line) => line.trim());

        for (const line of lines) {
          try {
            const data = JSON.parse(line);
            if (data.type === "message") {
              setCurrentMessage((prev) => prev + data.content + " ");
              accumulatedMessage += data.content + " ";
              if (data.isFinal) {
                setMessages((prev) => [
                  ...prev,
                  { role: "assistant", content: accumulatedMessage.trim() },
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
          } catch (error) {
            console.error("Error parsing chunk:", error);
          }
        }
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "error", content: "Không thể kết nối tới server" },
      ]);
      setIsTyping(false);
      console.error("Error connect server:", error);
    }

    setInput("");
  };

  // Function to handle copying a specific message
  const handleCopy = (content: string, index: number) => {
    navigator.clipboard.writeText(content).then(() => {
      // Update the copied state for the specific index
      setCopiedStates((prev) => ({
        ...prev,
        [index]: true,
      }));
      // Reset the copied state after a short delay (e.g., 2 seconds)
      setTimeout(() => {
        setCopiedStates((prev) => ({
          ...prev,
          [index]: false,
        }));
      }, 2000);
    }).catch((err) => {
      console.error("Failed to copy text: ", err);
    });
  };

  useEffect(() => {
    if (refresh) {
      setMessages([]); 
      setRefresh(false); 
    }
  }, [refresh, setRefresh])

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
                <div className="flex flex-col gap-4">
                  <div
                    className={`max-w-lg p-3 rounded-lg ${
                      msg.role === "user"
                        ? "bg-gray-400 dark:bg-gray-600 text-white"
                        : msg.role === "error"
                        ? "bg-red-200 text-red-800"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300"
                    }`}
                  >
                    {msg.content}
                  </div>

                  {msg.role !== "user" && msg.role !== "error" && (
                    <div className="flex justify-between w-full">
                      {
                        <Button
                          variant="outline"
                          className={"rounded-full h-8 w-40 bg-gray-100 hover:bg-gray-300"}
                        >
                          <Pin/>
                          <span>Lưu vào ghi chú</span>
                        </Button>
                      }
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          className={`rounded-full ${copiedStates[index] ? "" : "w-8"} h-8 bg-gray-100 hover:bg-gray-300`}
                          onClick={() => handleCopy(msg.content, index)}
                          aria-label={copiedStates[index] ? "Đã sao chép" : "Sao chép"}
                        >
                          {copiedStates[index] ? "Đã sao chép!" : <Copy size={18} />}
                        </Button>
                        <Button
                          variant="outline"
                          className="rounded-full h-8 w-8 bg-gray-100 hover:bg-gray-300"
                        >
                          <ThumbsUp />
                        </Button>
                        <Button
                          variant="outline"
                          className="rounded-full h-8 w-8 bg-gray-100 hover:bg-gray-300"
                        >
                          <ThumbsDown />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="mb-4 flex justify-start">
                <div className="max-w-lg p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300">
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
            className="absolute right-1 top-1 h-7 w-7 rounded-full bg-gray-500 dark:hover:bg-blue-600 text-white"
            onClick={handleSendMessage}
          >
            <ArrowUp className="h-4 w-4" />
          </Button>
        </div>
        <div className="text-xs text-center text-gray-500 mt-2">
          Chatbot có thể đưa ra thông tin không chính xác; hãy kiểm tra kỹ câu
          trả lời mà bạn nhận được.
        </div>
      </div>
    </div>
  );
}
