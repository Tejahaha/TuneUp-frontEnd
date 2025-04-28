import { Play, Pause, SkipBack, SkipForward, Volume2, Repeat, Shuffle } from "lucide-react"

import TiltedCard from "../blocks/Components/TiltedCard/TiltedCard"

export default function PlayerControls({ audioPlayer, currentSongImage, currentSongName, currentSongArtist }) {
  const { isPlaying, duration, currentTime, volume, togglePlay, seek, setAudioVolume } = audioPlayer

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <div className="flex flex-col bg-[#030303] border-t border-white/[0.08] sticky bottom-0 z-10">
      <div className="flex justify-center items-center p-4">
        <TiltedCard
          imageSrc={currentSongImage || "https://picsum.photos/250"}
          altText={`${currentSongName || "Song Name"} album cover`}
          captionText={`${currentSongName || "Song Name"} - ${currentSongArtist || "Artist Name"}`}
          containerHeight="250px"
          containerWidth="250px"
          imageHeight="250px"
          imageWidth="250px"
          rotateAmplitude={12}
          scaleOnHover={1.2}
          showMobileWarning={false}
          showTooltip={true}
          displayOverlayContent={true}
          overlayContent={
            <p className="text-white text-lg font-medium">
              {currentSongName || "Song Name"} - {currentSongArtist || "Artist Name"}
            </p>
          }
        />
      </div>
      <div className="h-20 flex flex-col items-center px-4">
        <div className="flex-1 flex flex-col items-center">
        <div className="flex items-center gap-4 mb-2">
          <button className="text-white/60 hover:text-white transition-colors">
            <Shuffle size={20} />
          </button>
          <button className="text-white/60 hover:text-white transition-colors">
            <SkipBack size={24} />
          </button>
          <button
            className="bg-white rounded-full p-2 text-black hover:scale-105 transition-transform"
            onClick={togglePlay}
          >
            {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
          </button>
          <button className="text-white/60 hover:text-white transition-colors">
            <SkipForward size={24} />
          </button>
          <button className="text-white/60 hover:text-white transition-colors">
            <Repeat size={20} />
          </button>
        </div>
        <div className="w-full max-w-md flex items-center gap-2">
          <span className="text-xs text-white/60">{formatTime(currentTime)}</span>
          <input
            type="range"
            min={0}
            max={duration}
            value={currentTime}
            onChange={(e) => seek(Number.parseFloat(e.target.value))}
            className="flex-1 h-1 bg-white/20 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
          />
          <span className="text-xs text-white/60">{formatTime(duration)}</span>
        </div>
      </div>
      <div className="flex-1 flex justify-end items-center">
        <Volume2 size={24} className="text-white/60 mr-2" />
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(e) => setAudioVolume(Number.parseFloat(e.target.value))}
          className="w-24 h-1 bg-white/20 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
        />
      </div>
    </div>
    </div>
  )
}

