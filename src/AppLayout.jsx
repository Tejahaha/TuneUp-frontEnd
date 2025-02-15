import Sidebar from "./v0/Sidebar"
import MainContent from "./v0/MainContent"
import PlayerControls from "./v0/PlayerControls"
import { useAudioPlayer } from "./hooks/useAudioPlayer"
import { useSidebar } from "./hooks/useSidebar"

export default function AppLayout() {
  const audioPlayer = useAudioPlayer()
  const { isOpen, toggleSidebar } = useSidebar()

  return (
    <div className="min-h-screen w-full flex flex-col bg-[#030303]">
      <div className="flex-1 flex overflow-hidden">
        <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
        <MainContent sidebarOpen={isOpen} audioPlayer={audioPlayer} />
      </div>
      <PlayerControls audioPlayer={audioPlayer} />
    </div>
  )
}

