"use client";

import { useState } from "react";
import Sidebar from "./v0/Sidebar";
import Header from "./v0/Header";
import NowPlaying from "./v0/NowPlaying";
import MainContent from "./v0/MainContent";
import Queue from "./v0/Queue";

const mockSongs = [
  { id: 1, title: "Bohemian Rhapsody", artist: "Queen", albumArt: "https://placekitten.com/300/300", audioUrl: "https://example.com/bohemian-rhapsody.mp3" },
  { id: 2, title: "Stairway to Heaven", artist: "Led Zeppelin", albumArt: "https://placekitten.com/301/301", audioUrl: "https://example.com/stairway-to-heaven.mp3" },
  { id: 3, title: "Imagine", artist: "John Lennon", albumArt: "https://placekitten.com/302/302", audioUrl: "https://example.com/imagine.mp3" },
  { id: 4, title: "Smells Like Teen Spirit", artist: "Nirvana", albumArt: "https://placekitten.com/303/303", audioUrl: "https://example.com/smells-like-teen-spirit.mp3" },
  { id: 5, title: "Billie Jean", artist: "Michael Jackson", albumArt: "https://placekitten.com/304/304", audioUrl: "https://example.com/billie-jean.mp3" },
];

export default function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentSong, setCurrentSong] = useState(null);
  const [queue, setQueue] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const playSong = (song) => setCurrentSong(song);
  const addToQueue = (song) => setQueue([...queue, song]);
  const removeFromQueue = (index) => setQueue(queue.filter((_, i) => i !== index));
  const moveInQueue = (from, to) => {
    const newQueue = [...queue];
    const [movedSong] = newQueue.splice(from, 1);
    newQueue.splice(to, 0, movedSong);
    setQueue(newQueue);
  };
  const playNextSong = () => setCurrentSong(mockSongs[(mockSongs.findIndex(song => song.id === currentSong?.id) + 1) % mockSongs.length]);
  const playPreviousSong = () => setCurrentSong(mockSongs[(mockSongs.findIndex(song => song.id === currentSong?.id) - 1 + mockSongs.length) % mockSongs.length]);

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header setSearchQuery={setSearchQuery} />
        <div className="flex-1 overflow-y-auto pb-24">
          <MainContent playSong={playSong} addToQueue={addToQueue} searchQuery={searchQuery} />
        </div>
      </div>
      <Queue queue={queue} playSong={playSong} removeFromQueue={removeFromQueue} moveInQueue={moveInQueue} />
      <NowPlaying currentSong={currentSong} onNextSong={playNextSong} onPreviousSong={playPreviousSong} />
    </div>
  );
}
