"use client"

import { Home, Search, Library, Heart, ChevronLeft, ChevronRight, Music, Headphones, Settings } from "lucide-react"
import { cn } from "../components/lib/utils"
import Logo from "../components/Logo"
import PlaylistManager from "./PlaylistManager"
import { useState } from "react"

const SidebarItem = ({ icon: Icon, text, collapsed, onClick, active = false }) => (
  <button
    className={cn(
      "flex items-center gap-4 text-white/60 hover:text-white transition-colors px-4 py-3 w-full text-left rounded-xl hover:bg-white/5",
      collapsed && "justify-center",
      active && "bg-white/5 text-white font-medium",
    )}
    onClick={onClick}
  >
    <div
      className={cn(
        "flex items-center justify-center w-9 h-9 rounded-lg",
        active ? "bg-gradient-to-br from-purple-600 to-pink-600" : "bg-white/5",
      )}
    >
      <Icon size={18} />
    </div>
    {!collapsed && <span>{text}</span>}
  </button>
)

const Sidebar = ({
  isOpen,
  toggleSidebar,
  audioPlayer,
  currentSong,
  isAddToPlaylistModalOpen,
  onOpenAddToPlaylistModal,
  onCloseAddToPlaylistModal,
  onViewPlaylists,
}) => {
  const [activeItem, setActiveItem] = useState("home")

  return (
    <div
      style={{ height: "100vh", overflowY: "auto" }}
      className="scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
    >
      <div
        className={cn(
          "bg-gradient-to-b from-zinc-900 to-black border-r border-white/5 flex flex-col transition-all duration-300 ease-in-out h-full",
          isOpen ? "w-64" : "w-20",
        )}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-8 p-2">
            {isOpen && (
              <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                <Logo />
              </div>
            )}
            <button
              onClick={toggleSidebar}
              className="text-white/60 hover:text-white transition-colors p-2 rounded-full hover:bg-white/5"
            >
              {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
            </button>
          </div>

          <nav className="space-y-2">
            <SidebarItem
              icon={Home}
              text="Home"
              collapsed={!isOpen}
              active={activeItem === "home"}
              onClick={() => setActiveItem("home")}
            />
            <SidebarItem
              icon={Search}
              text="Search"
              collapsed={!isOpen}
              active={activeItem === "search"}
              onClick={() => setActiveItem("search")}
            />
            <SidebarItem
              icon={Library}
              text="Your Library"
              collapsed={!isOpen}
              active={activeItem === "library"}
              onClick={() => setActiveItem("library")}
            />
            <SidebarItem
              icon={Headphones}
              text="Now Playing"
              collapsed={!isOpen}
              active={activeItem === "playing"}
              onClick={() => setActiveItem("playing")}
            />
          </nav>
        </div>

        <div className="mt-4 p-4 border-t border-white/5 flex-1 flex flex-col">
          <div className="mb-4">
            <div className="flex items-center justify-between px-2 py-1">
              <h3 className={cn("text-sm font-medium text-white/60 uppercase tracking-wider", !isOpen && "sr-only")}>
                Playlists
              </h3>
              {isOpen && (
                <button
                  onClick={onViewPlaylists}
                  className="text-white/60 hover:text-white transition-colors rounded-md hover:bg-white/5 p-1"
                >
                  <Music size={16} />
                </button>
              )}
            </div>
          </div>

          {isOpen && (
            <PlaylistManager
              audioPlayer={audioPlayer}
              currentSong={currentSong}
              isAddToPlaylistModalOpen={isAddToPlaylistModalOpen}
              onOpenAddToPlaylistModal={onOpenAddToPlaylistModal}
              onCloseAddToPlaylistModal={onCloseAddToPlaylistModal}
            />
          )}

          <div className="mt-auto space-y-2">
            <div
              className={cn(
                "p-4 rounded-xl bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-white/5",
                !isOpen && "p-2",
              )}
            >
              {isOpen ? (
                <>
                  <h4 className="text-white font-medium mb-1">Listening Now</h4>
                  <p className="text-white/60 text-sm truncate">{currentSong?.name || "Not playing"}</p>
                  <div className="mt-3 w-full bg-white/10 h-1 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-full w-1/3"></div>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center">
                  <Headphones size={24} className="text-white/60" />
                </div>
              )}
            </div>

            <button className="flex items-center gap-2 text-white/60 hover:text-white transition-colors p-2.5 w-full rounded-lg hover:bg-white/5">
              <Heart size={18} />
              {!isOpen ? null : <span>Liked Songs</span>}
            </button>

            <button className="flex items-center gap-2 text-white/60 hover:text-white transition-colors p-2.5 w-full rounded-lg hover:bg-white/5">
              <Settings size={18} />
              {!isOpen ? null : <span>Settings</span>}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
