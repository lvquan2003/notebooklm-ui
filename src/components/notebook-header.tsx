import { Share, Settings, MoreVertical, Grid, CircleHelp, MessageSquareWarning, MessagesSquare, Sun, Moon, SunMoon, BookPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
} from "@/components/ui/dropdown-menu"

export default function NotebookHeader() {
  return (
    <header className="flex items-center justify-between p-4 bg-white border-b">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center">
          <span className="text-white text-sm">N</span>
        </div>
        <h1 className="text-xl font-medium">Untitled notebook</h1>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" className="hidden md:flex gap-1">
          <Share className="h-4 w-4" />
          <span>Chia sẻ</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {/* <Button variant="outline">Open</Button> */}
            <Button variant="ghost" size="sm" className="hidden md:flex gap-1">
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
                  {/* <DropdownMenuItem> */}
                    <Sun size={16} strokeWidth={1} className="mr-2"/>
                    Chế độ sáng
                  {/* </DropdownMenuItem> */}
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>
                        <Sun />
                        Chế độ sáng
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Moon />
                      Chế độ tối
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <SunMoon/>
                      Thiết bị
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BookPlus/>
                Nâng cấp lên plus
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="ghost" size="icon" className="hidden md:flex">
          <Grid className="h-5 w-5" />
        </Button>

        <Button variant="ghost" size="icon" className="md:hidden">
          <MoreVertical className="h-5 w-5" />
        </Button>

        <Avatar className="h-8 w-8">
          <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
