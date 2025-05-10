import Sidebar from "./v0/Sidebar";
import MainContent from "./v0/MainContent";
import PlayerControls from "./v0/PlayerControls";
import AddToPlaylistModal from "./v0/AddToPlaylistModal"; // ⬅️ Import the new modal
import { useAudioPlayer } from "./hooks/useAudioPlayer";
import { useSidebar } from "./hooks/useSidebar";
import { useState, useCallback } from "react";

export default function AppLayout() {
  const audioPlayer = useAudioPlayer();
  const { isOpen, toggleSidebar } = useSidebar();
  const [currentSong, setCurrentSong] = useState({ name: null, image: null });
  const [isAddToPlaylistModalOpen, setIsAddToPlaylistModalOpen] = useState(false);

  const handleOpenAddToPlaylistModal = useCallback(() => {
    setIsAddToPlaylistModalOpen(true);
  }, []);

  const handleCloseAddToPlaylistModal = useCallback(() => {
    setIsAddToPlaylistModalOpen(false);
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col bg-black relative">
      {/* Main content area - takes full height minus player controls height */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - fixed position */}
        <div className="sticky top-0 h-screen">
          <Sidebar 
            isOpen={isOpen} 
            toggleSidebar={toggleSidebar} 
            audioPlayer={audioPlayer}
            currentSong={currentSong}
            isAddToPlaylistModalOpen={isAddToPlaylistModalOpen}
            onOpenAddToPlaylistModal={handleOpenAddToPlaylistModal}
            onCloseAddToPlaylistModal={handleCloseAddToPlaylistModal}
          />
        </div>

        {/* Main content - scrollable */}
        <div className="flex-1 overflow-hidden">
          <MainContent
            sidebarOpen={isOpen}
            audioPlayer={audioPlayer}
            setCurrentSong={setCurrentSong}
            onOpenPlaylistManagerModal={handleOpenAddToPlaylistModal}
          />
        </div>
      </div>

      {/* Player controls - fixed at bottom */}
      <PlayerControls
        audioPlayer={audioPlayer}
        currentSongImage={currentSong.image}
        currentSongName={currentSong.name}
        currentSongArtist={""}
      />

      {/* Global Add to Playlist Modal - rendered on top of all content */}
      <AddToPlaylistModal
        currentSong={currentSong}
        isOpen={isAddToPlaylistModalOpen}
        onClose={handleCloseAddToPlaylistModal}
      />
    </div>
  );
}
