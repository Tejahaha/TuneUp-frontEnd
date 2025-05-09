import { Home, Search, Library, PlusSquare, Heart, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "../components/lib/utils"
import Logo from "../components/Logo"

const SidebarItem = ({ icon: Icon, text, collapsed, onClick }) => (
  <button
    className={cn(
      "flex items-center gap-4 text-white/60 hover:text-white transition-colors px-4 py-3 w-full text-left rounded-md hover:bg-zinc-800",
      collapsed && "justify-center",
    )}
    onClick={onClick}
  >
    <Icon size={24} />
    {!collapsed && <span>{text}</span>}
  </button>
)

export default function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <div
      className={cn(
        "bg-zinc-900 border-r border-zinc-800 flex flex-col transition-all duration-300 ease-in-out h-full",
        isOpen ? "w-64" : "w-20",
      )}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-6 p-2 bg-black/20 rounded-md">
          {isOpen && <h1 className="text-2xl font-bold text-white"><Logo/></h1>}
          <button onClick={toggleSidebar} className="text-white/60 hover:text-white transition-colors p-2 rounded-full hover:bg-zinc-800">
            {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>
        <nav className="space-y-1">
          <SidebarItem icon={Home} text="Home" collapsed={!isOpen} />
          <SidebarItem icon={Search} text="Search" collapsed={!isOpen} />
          <SidebarItem icon={Library} text="Your Library" collapsed={!isOpen} />
        </nav>
      </div>
      
      <div className="mt-2 p-4 border-t border-zinc-800">
        <div className="bg-zinc-800/50 rounded-md p-2">
          <button className="flex items-center gap-2 text-white/60 hover:text-white transition-colors p-2 w-full rounded-md hover:bg-zinc-700">
            <Heart size={20} />
            {!isOpen ? null : <span>Liked Songs</span>}
          </button>
        </div>
      </div>
    </div>
  )
}