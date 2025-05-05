import { useState } from "react";
import {
  Key,
  Copy,
  Download,
  Clock,
  MessageSquare,
  Plus,
  FileText,
  Info,
  RefreshCw,
  EyeOff,
  Eye,
  NotepadText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import md5 from "md5";

interface StudioTabProps {
  isCollapsed: boolean;
}

const notes = [
  {
    id: 1,
    content: "Ghi chú mới 1"
  },
  {
    id: 2,
    content: "Ghi chú mới 2"
  },
]

export default function StudioTab({ isCollapsed }: StudioTabProps) {
  const [isExposed, setIsExposed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [apiKey, setApiKey] = useState(generateApiKey());
  const [hideAPI, setHideAPI] = useState(false);

  function generateApiKey() {
    const randomString = `sk-${Math.random()
      .toString(36)
      .substring(2, 15)}-${Date.now()}`;
    const hashedKey = md5(randomString);
    return hashedKey;
  }

  const handleExpose = () => {
    setIsExposed(true);
    setCopied(false);
  };

  // const handleCancel = () => {
  //   setIsExposed(false);
  //   setCopied(false);
  // };

  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleGenerateNewKey = () => {
    const newKey = generateApiKey();
    setApiKey(newKey);
    setCopied(false);
  };

  return (
    <div className="h-full overflow-y-auto p-4">
      {isCollapsed ? (
        <div className="w-full flex justify-center" onClick={() => {}}>
          <Plus
            strokeWidth={1.5}
            className="hover:bg-gray-300 hover:rounded-full p-1"
          />
        </div>
      ) : (
        <>
          {/* All parts that render when !isCollapsed */}
          <Card className="mb-6 border rounded-xl shadow-sm bg-inherit">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center">
                  <Key className="h-5 w-5 text-gray-500" />
                </div>
                <div>
                  <h4 className="font-medium">Khóa API</h4>
                  <p className="text-sm text-gray-500">
                    Tạo và quản lý khóa API của bạn để truy cập an toàn
                  </p>
                </div>
              </div>

              {isExposed ? (
                <div className="flex items-center justify-end gap-2 mt-4">
                  {hideAPI ? (
                    <div className="px-4 w-full bg-gray-100 dark:bg-inherit dark:text-white dark:border-1 rounded-md text-lg text-gray-800 mr-auto">
                      * * *
                    </div>
                  ) : (
                    <div className="flex-1 p-2 bg-gray-100 dark:bg-inherit dark:text-white dark:border-1 rounded-lg text-sm text-gray-800 truncate">
                      {apiKey}
                    </div>
                  )}
                  <Button
                    variant="outline"
                    className="rounded-full"
                    onClick={handleCopy}
                    aria-label={copied ? "Đã sao chép" : "Sao chép khóa API"}
                  >
                    {copied ? "Đã sao chép!" : <Copy className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-full"
                    onClick={handleGenerateNewKey}
                    aria-label="Tạo khóa API mới"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                  {!hideAPI && (
                    <Button
                      variant="outline"
                      className="rounded-full"
                      onClick={() => setHideAPI(true)}
                      aria-label="Tạo khóa API mới"
                    >
                      <EyeOff className="h-4 w-4" />
                    </Button>
                  )}
                  {hideAPI && (
                    <Button
                      variant="outline"
                      className="rounded-full"
                      onClick={() => setHideAPI(false)}
                      aria-label="Tạo khóa API mới"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ) : (
                <div className="flex gap-2 mt-4">
                  {/* <Button
                    variant="outline"
                    className="flex-1 rounded-full"
                    onClick={handleCancel}
                    aria-label="Hủy tạo khóa API"
                  >
                    Hủy
                  </Button> */}
                  <Button
                    className="flex-1 rounded-full bg-gray-200 dark:bg-blue-600 text-gray-800 dark:text-white hover:bg-gray-300"
                    onClick={handleExpose}
                    aria-label="Hiển thị khóa API"
                  >
                    Tạo key
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex items-center justify-between mb-4 ">
            <div className="flex items-center gap-2">
              <h3 className="font-medium">Tổng quan bằng âm thanh</h3>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 rounded-full"
              >
                <Info className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Card className="mb-6 border rounded-xl shadow-sm bg-inherit">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center">
                  <MessageSquare className="h-5 w-5 text-gray-500" />
                </div>
                <div>
                  <h4 className="font-medium">
                    Cuộc trò chuyện tìm hiểu chuyên sâu
                  </h4>
                  <p className="text-sm text-gray-500">
                    Hai người dẫn dắt (chỉ bằng tiếng Anh)
                  </p>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Button variant="outline" className="flex-1 rounded-full">
                  Tùy chỉnh
                </Button>
                <Button className="flex-1 rounded-full bg-gray-200 text-gray-800 hover:bg-gray-300">
                  Tạo
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium">Ghi chú</h3>
            <Button variant="ghost" size="icon">
              <span className="sr-only">More options</span>
              <span className="text-lg">⋮</span>
            </Button>
          </div>

          <Button
            variant="outline"
            className="w-full justify-center gap-2 mb-4 rounded-full"
          >
            <Plus className="h-4 w-4" />
            <span>Thêm ghi chú</span>
          </Button>

          {
            notes.length <= 0 &&
              <div className="flex flex-col items-center justify-center p-6 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center mb-4">
                  <FileText className="h-8 w-8 text-gray-500" />
                </div>
                <h3 className="text-lg font-medium mb-2">
                  Những ghi chú đã lưu sẽ xuất hiện ở đây
                </h3>
              </div>
          }
          

          <div className="flex flex-col">
            {
              notes.map((note, index) => (
                <div key={index} className="flex items-center gap-4 p-2 hover:bg-gray-200 rounded-md text-sm">
                  <NotepadText strokeWidth={2} size={16}/>
                  {/* <EllipsisVertical className="hidden"/> */}
                  <span>{note.content}</span>
                </div>
              ))
            }
              
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <Button
              variant="outline"
              className="justify-start gap-2 rounded-lg"
            >
              <Download className="h-4 w-4" />
              <span>Tài liệu tóm tắt</span>
            </Button>
            <Button
              variant="outline"
              className="justify-start gap-2 rounded-lg"
            >
              <Clock className="h-4 w-4" />
              <span>Dòng thời gian</span>
            </Button>
            <Button
              variant="outline"
              className="justify-start gap-2 rounded-lg"
            >
              <MessageSquare className="h-4 w-4" />
              <span>Câu hỏi thường gặp</span>
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
