"use client";

import { useState } from "react";
import { Plus, FileText, Upload, X, Link, FileIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";

interface SourceTabProps {
  isCollapsed: boolean;
}

export default function SourceTab({ isCollapsed }: SourceTabProps) {
  const [showAddSourceDialog, setShowAddSourceDialog] = useState(false);

  return (
    <div className="h-full flex flex-col overflow-auto">
      {isCollapsed ? (
        <div
          className="mx-auto my-4"
          onClick={() => setShowAddSourceDialog(true)}
        >
          <Plus
            strokeWidth={1.5}
            className="hover:bg-gray-300 hover:rounded-full"
          />
        </div>
      ) : (
        <>
          {/* All parts that render when !isCollapsed */}
          <div className="p-4">
            <Button
              variant="outline"
              className="w-full justify-center gap-2 rounded-full bg-white"
              onClick={() => setShowAddSourceDialog(true)}
            >
              <Plus className="h-4 w-4" />
              <span>Thêm</span>
            </Button>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center mb-4">
              <FileText className="h-8 w-8 text-gray-500" />
            </div>
            <h3 className="text-lg font-medium mb-2">
              Các nguồn đã lưu sẽ xuất hiện ở đây
            </h3>
            <p className="text-sm text-gray-500 mb-6 max-w-xs">
              Nhấp vào Thêm nguồn ở trên để thêm tệp PDF, trang web, văn bản,
              video hoặc tệp âm thanh. Hoặc nhập một tệp ngay trên Google Drive.
            </p>

            <Button
              variant="outline"
              className="gap-2 rounded-full"
              onClick={() => setShowAddSourceDialog(true)}
            >
              <Upload className="h-4 w-4" />
              <span>Tải nguồn lên</span>
            </Button>
          </div>
        </>
      )}

      <Dialog open={showAddSourceDialog} onOpenChange={setShowAddSourceDialog}>
        <DialogContent className="sm:max-w-[1000px] p-0 gap-0">
          <DialogHeader className="p-6 pb-2">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center">
                <span className="text-white text-xs">N</span>
              </div>
              <span className="font-medium">NotebookLM</span>
            </div>
            <DialogTitle className="text-xl font-medium">
              Thêm nguồn
            </DialogTitle>
            <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogClose>
          </DialogHeader>

          <div className="px-6 py-2">
            <p className="text-sm text-gray-700 mb-4">
              Các nguồn giúp NotebookLM đưa ra câu trả lời dựa trên những thông
              tin quan trọng nhất đối với bạn.
              <br />
              (Ví dụ: kế hoạch tiếp thị, nội dung khóa học, ghi chú nghiên cứu,
              bản chép lời cuộc họp, tài liệu bán hàng, v.v.)
            </p>

            <div className="border border-dashed border-gray-300 rounded-lg p-8 mb-6">
              <div className="flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                  <Upload className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="text-lg font-medium mb-2">Tải nguồn lên</h3>
                <p className="text-sm text-gray-500 mb-2">
                  Kéo và thả hoặc{" "}
                  <span className="text-blue-500">chọn tệp</span> để tải lên
                </p>
                <p className="text-xs text-gray-400">
                  Các loại tệp được hỗ trợ: PDF, txt, Markdown, Âm thanh (ví dụ:
                  mp3)
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <Card className="border rounded-lg overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 12.75C13.63 12.75 15.07 13.14 16.24 13.65C17.32 14.13 18 15.21 18 16.38V17C18 17.55 17.55 18 17 18H7C6.45 18 6 17.55 6 17V16.39C6 15.21 6.68 14.13 7.76 13.66C8.93 13.14 10.37 12.75 12 12.75ZM4 13C5.1 13 6 12.1 6 11C6 9.9 5.1 9 4 9C2.9 9 2 9.9 2 11C2 12.1 2.9 13 4 13ZM5.13 14.1C4.76 14.04 4.39 14 4 14C3.01 14 2.07 14.21 1.22 14.58C0.48 14.9 0 15.62 0 16.43V17C0 17.55 0.45 18 1 18H4.5V16.39C4.5 15.56 4.73 14.78 5.13 14.1ZM20 13C21.1 13 22 12.1 22 11C22 9.9 21.1 9 20 9C18.9 9 18 9.9 18 11C18 12.1 18.9 13 20 13ZM24 16.43C24 15.62 23.52 14.9 22.78 14.58C21.93 14.21 20.99 14 20 14C19.61 14 19.24 14.04 18.87 14.1C19.27 14.78 19.5 15.56 19.5 16.39V18H23C23.55 18 24 17.55 24 17V16.43ZM12 6C13.66 6 15 7.34 15 9C15 10.66 13.66 12 12 12C10.34 12 9 10.66 9 9C9 7.34 10.34 6 12 6Z"
                          fill="#5F6368"
                        />
                      </svg>
                    </div>
                    <span className="text-sm font-medium">Google Drive</span>
                    <Button
                      variant="outline"
                      className="w-full text-sm h-8 mt-2"
                    >
                      Google Tài liệu
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border rounded-lg overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                      <Link className="h-4 w-4 text-gray-500" />
                    </div>
                    <span className="text-sm font-medium">Liên kết</span>
                    <div className="flex gap-2 mt-2 w-full">
                      <Button variant="outline" className="flex-1 text-sm h-8">
                        Trang web
                      </Button>
                      <Button variant="outline" className="flex-1 text-sm h-8">
                        YouTube
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border rounded-lg overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                      <FileIcon className="h-4 w-4 text-gray-500" />
                    </div>
                    <span className="text-sm font-medium">Dán văn bản</span>
                    <Button
                      variant="outline"
                      className="w-full text-sm h-8 mt-2"
                    >
                      Văn bản đã sao chép
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}