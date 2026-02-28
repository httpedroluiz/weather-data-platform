import { useState } from "react"
import { LogOut, User } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ProfileModal } from "@/components/ProfileModal"

export function Navbar() {
  const [openProfile, setOpenProfile] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem("token")
    window.location.href = "/login"
  }

  const handleProfile = () => {
    setOpenProfile(true)
  }

  return (
    <>
      <header className="w-full h-16 px-6 flex items-center justify-end border-b border-slate-700 bg-slate-900">
        <DropdownMenu>
          <DropdownMenuTrigger>

            <Avatar className="cursor-pointer">
              <AvatarFallback>U</AvatarFallback>
            </Avatar>

          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">

            <DropdownMenuItem onClick={handleProfile}>
              <User className="mr-2 h-4 w-4" />
              Perfil
            </DropdownMenuItem>

            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>

          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      
      <ProfileModal
        open={openProfile}
        onOpenChange={setOpenProfile}
      />

    </>
  )
}