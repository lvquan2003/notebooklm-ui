import {
  Settings,
  Grid,
  CircleHelp,
  MessageSquareWarning,
  MessagesSquare,
  Sun,
  Moon,
  SunMoon,
  BookPlus,
  X,
  Share2,
  Copy,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
// import { Card, CardContent } from "@/components/ui/card"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useState } from "react";
import { Input } from "./ui/input";
import { useTheme } from "next-themes"

export default function NotebookHeader() {
  const [showAddSourceDialog, setShowAddSourceDialog] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const { theme, setTheme } = useTheme()


  const handleCopyLink = () => {
    navigator.clipboard.writeText("https://example.com/resume");
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
  };

  return (
    <header className="flex items-center justify-between p-4 bg-inherit border-b">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center">
          <span className="text-white text-sm">NB</span>
        </div>
        <h1 className="text-xl font-medium hover:border-1 hover:border-black hover:rounded-sm p-1">
          NotebookLM
        </h1>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          className="hidden md:flex gap-1 border-1 hover:bg-gray-300"
          onClick={() => setShowAddSourceDialog(true)}
        >
          <Share2 className="h-4 w-4" />
          <span>Chia sẻ</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {/* <Button variant="outline">Open</Button> */}
            <Button
              variant="ghost"
              size="sm"
              className="hidden md:flex gap-1 border-1 hover:bg-gray-300"
            >
              <Settings className="h-4 w-4" />
              <span>Cài đặt</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <CircleHelp />
                Trợ giúp về NotebookLM
              </DropdownMenuItem>
              <DropdownMenuItem>
                <MessageSquareWarning />
                Gửi phản hồi
              </DropdownMenuItem>
              <DropdownMenuItem>
                <MessagesSquare />
                Discord
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  {theme === "light" && (
                    <div className="flex gap-2">
                      <Sun size={16} strokeWidth={1}/>
                      Chế độ sáng
                    </div>
                  )}
                  {theme === "dark" && (
                    <div className="flex gap-2">
                      <Moon size={16} strokeWidth={1}/>
                      Chế độ tối
                    </div>
                  )}
                  {theme === "system" && (
                    <div className="flex gap-2">
                      <SunMoon size={16} strokeWidth={1}/>
                      Thiết bị
                    </div>
                  )}
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem onClick={() => {setTheme("light")}}>
                      <Sun />
                      Chế độ sáng
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => {setTheme("dark")}}>
                      <Moon />
                      Chế độ tối
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => {setTheme("system")}}>
                      <SunMoon />
                      Thiết bị
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BookPlus />
                Nâng cấp lên plus
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant="ghost"
          size="icon"
          className="hidden md:flex hover:bg-gray-300"
        >
          <Grid className="h-5 w-5" />
        </Button>

        {/* <Button variant="ghost" size="icon" className="md:hidden hover:bg-gray-300">
          <MoreVertical className="h-5 w-5" />
        </Button> */}

        <Avatar className="h-8 w-8">
          <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
          <AvatarFallback className="bg-gray-300">S</AvatarFallback>
        </Avatar>
      </div>

      {/* Share Dialog */}
      <Dialog open={showAddSourceDialog} onOpenChange={setShowAddSourceDialog}>
        <DialogContent className="sm:max-w-[550px] p-0 gap-0">
          <DialogHeader className="p-6 pb-2">
            <DialogTitle className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-full flex items-center justify-center">
                <Share2 />
              </div>
              <span className="font-medium">Chia sẻ Notebook</span>
            </DialogTitle>
            <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogClose>
          </DialogHeader>

          <div className="py-4 px-2 border-y-1">
            <Input placeholder="Thêm người dùng và nhóm*" className="h-15" />
          </div>

          <div className="space-y-4 px-2 mt-4">
            <h3 className="text-md font-medium">
              Người dùng có quyền truy cập
            </h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src="/" />
                  <AvatarFallback>K</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">Kelvin</p>
                  <p className="text-xs text-muted-foreground">
                    kelvin@gmail...
                  </p>
                </div>
              </div>
              <Select defaultValue="owner">
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Chọn vai trò" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="owner">Chủ sở hữu</SelectItem>
                  <SelectItem value="editor">Biên tập</SelectItem>
                  <SelectItem value="viewer">Người xem</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-between py-4 px-2 border-t-1 mt-4">
            <Button
              variant="outline"
              className="hover:bg-gray-300"
              onClick={handleCopyLink}
            >
              {isCopied ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Đã sao chép
                </>
              ) : (
                <>
                  <Copy className="mr-2 h-4 w-4" />
                  Sao chép đường liên kết
                </>
              )}
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-800">Lưu</Button>
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
}
