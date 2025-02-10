"use client"
import { Home, Search, Library, PlusSquare, Heart, ChevronLeft, ChevronRight } from "lucide-react"

export default function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <div className={`bg-gray-800 flex-shrink-0 transition-all duration-300 ease-in-out ${isOpen ? "w-64" : "w-16"}`}>
      <div className="p-4 flex flex-col h-full">
        <button onClick={toggleSidebar} className="mb-8 text-yellow-300 hover:text-yellow-200 self-end">
          {isOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
        </button>
        <nav className={`flex-1 ${isOpen ? "" : "items-center"}`}>
          <ul className="space-y-4">
            <SidebarItem icon={Home} text="Home" isOpen={isOpen} />
            <SidebarItem icon={Search} text="Search" isOpen={isOpen} />
            <SidebarItem icon={Library} text="Your Library" isOpen={isOpen} />
          </ul>
        </nav>
        <div className={`mt-auto ${isOpen ? "" : "flex flex-col items-center"}`}>
          <SidebarItem icon={PlusSquare} text="Create Playlist" isOpen={isOpen} />
          <SidebarItem icon={Heart} text="Liked Songs" isOpen={isOpen} />
        </div>
      </div>
    </div>
  )
}

function SidebarItem({ icon: Icon, text, isOpen }) {
  return (
    <li>
      <a href="#" className="flex items-center text-gray-300 hover:text-yellow-300 transition-colors duration-200">
        <Icon size={24} />
        {isOpen && <span className="ml-4">{text}</span>}
      </a>
    </li>
  )
}

