import { Home, Search, Library, PlusSquare, Heart, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "../components/lib/utils"
import Logo from "../components/Logo"
const SidebarItem = ({ icon: Icon, text, collapsed }) => (
  <button
    className={cn(
      "flex items-center gap-4 text-white/60 hover:text-white transition-colors px-4 py-2 w-full text-left",
      collapsed && "justify-center",
    )}
  >
    <Icon size={24} />
    {!collapsed && <span>{text}</span>}
  </button>
)

export default function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <div
      className={cn(
        "bg-[#030303] border-r border-white/[0.08] flex flex-col transition-all duration-300 ease-in-out",
        isOpen ? "w-64" : "w-20",
      )}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          {isOpen && <h1 className="text-2xl font-bold text-white"><Logo/></h1>}
          <button onClick={toggleSidebar} className="text-white/60 hover:text-white transition-colors">
            {isOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
          </button>
        </div>
        <nav className="space-y-2">
          <SidebarItem icon={Home} text="Home" collapsed={!isOpen} />
          <SidebarItem icon={Search} text="Search" collapsed={!isOpen} />
          <SidebarItem icon={Library} text="Your Library" collapsed={!isOpen} />
        </nav>
      </div>
      {isOpen && (
        <div className="mt-8 p-6 border-t border-white/[0.08]">
          <button className="flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-4">
            <PlusSquare size={24} />
            <span>Create Playlist</span>
          </button>
          <button className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
            <Heart size={24} />
            <span>Liked Songs</span>
          </button>
        </div>
      )}
    </div>
  )
}

