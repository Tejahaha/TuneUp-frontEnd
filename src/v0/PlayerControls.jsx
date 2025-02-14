import { Play, Pause, SkipBack, SkipForward, Volume2, Repeat, Shuffle } from "lucide-react"

export default function PlayerControls({ audioPlayer }) {
  const { isPlaying, duration, currentTime, volume, togglePlay, seek, setAudioVolume } = audioPlayer

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <div className="h-20 bg-[#030303] border-t border-white/[0.08] flex items-center px-4">
      <div className="flex-1 flex items-center">
        <img src="https://picsum.photos/56" alt="Now playing" className="w-14 h-14 rounded mr-4" />
        <div>
          <h4 className="text-white font-medium">Song Name</h4>
          <p className="text-white/60 text-sm">Artist Name</p>
        </div>
      </div>
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
  )
}

