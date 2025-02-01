import React, { useState, useEffect, useRef } from 'react';
import Sidebar from './components/sidebarComponents/Sidebar';
import Header from './components/Header';
import MainContent from './components/MainContent';
import Player from './components/Player';

const TuneUpLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sidebarRef = useRef(null);
  const mouseTimeoutRef = useRef(null);
  const lastMouseXRef = useRef(0);

  // Audio player state
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);

  // Song queue
  const queue = [
    { name: "Song 1", artist: "Artist 1", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
    { name: "Song 2", artist: "Artist 2", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
    { name: "Song 3", artist: "Artist 3", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
  ];

  const playSong = (index) => {
    setCurrentIndex(index);
    setIsPlaying(true);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleSeek = (e) => {
    const newTime = e.target.value;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
    if (newVolume > 0) setIsMuted(false);
  };

  const toggleMute = () => {
    if (isMuted) {
      audioRef.current.volume = volume;
    } else {
      audioRef.current.volume = 0;
    }
    setIsMuted(!isMuted);
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      const currentX = e.clientX;
      const movingTowards = currentX < lastMouseXRef.current;
      lastMouseXRef.current = currentX;

      if (mouseTimeoutRef.current) {
        clearTimeout(mouseTimeoutRef.current);
      }

      if (currentX <= 100 || (movingTowards && currentX <= 150)) {
        setSidebarOpen(true);
        return;
      }

      if (currentX > 288) {
        mouseTimeoutRef.current = setTimeout(() => {
          setSidebarOpen(false);
        }, 200);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (mouseTimeoutRef.current) {
        clearTimeout(mouseTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="h-screen bg-black text-white flex overflow-hidden font-sans">
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={queue[currentIndex]?.src} // Dynamically set the current song
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
        controls={false}
      />

      <Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} sidebarRef={sidebarRef} />
      <div className="flex-1 flex flex-col bg-gradient-to-b from-neutral-900 to-black">
        <Header />
        <MainContent togglePlayPause={togglePlayPause} />
        <Player
          audioRef={audioRef} // Pass the audioRef as a prop
          isPlaying={isPlaying}
          togglePlayPause={togglePlayPause}
          currentTime={currentTime}
          duration={duration}
          handleSeek={handleSeek}
          formatTime={(time) => {
            const minutes = Math.floor(time / 60);
            const seconds = Math.floor(time % 60).toString().padStart(2, "0");
            return `${minutes}:${seconds}`;
          }}
          isMuted={isMuted}
          toggleMute={toggleMute}
          volume={volume}
          handleVolumeChange={handleVolumeChange}
        />
      </div>
    </div>
  );
};

export default TuneUpLayout;
