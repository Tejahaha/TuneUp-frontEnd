import { Play, Pause, SkipBack, SkipForward, Volume2, Repeat, Shuffle } from "lucide-react"
import TiltedCard from "../blocks/Components/TiltedCard/TiltedCard"
import ElasticSlider from "../blocks/Components/ElasticSlider/ElasticSlider";

export default function PlayerControls({ audioPlayer, currentSongImage, currentSongName, currentSongArtist }) {
  const { isPlaying, duration, currentTime, volume, togglePlay, seek, setAudioVolume } = audioPlayer

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 flex bg-zinc-900 border-t border-zinc-800 z-20 shadow-lg">
      <div className="flex-none p-4 border-r border-zinc-800 hidden md:block">
        <TiltedCard
          imageSrc={currentSongImage || "https://picsum.photos/250"}
          altText={`${currentSongName || "Song Name"} album cover`}
          captionText={`${currentSongName || "Song Name"} - ${currentSongArtist || "Artist Name"}`}
          containerHeight="100px"
          containerWidth="100px"
          imageHeight="100px"
          imageWidth="100px"
          rotateAmplitude={8}
          scaleOnHover={1.1}
          showMobileWarning={false}
          showTooltip={true}
          displayOverlayContent={true}
        />
      </div>
      
      <div className="flex-1 flex flex-col justify-center px-6 py-3">
        <div className="flex items-center justify-center gap-6 mb-2">
          <button className="text-white/60 hover:text-white transition-colors bg-zinc-800/50 p-2 rounded-full">
            <Shuffle size={18} />
          </button>
          <button className="text-white/60 hover:text-white transition-colors bg-zinc-800/50 p-2 rounded-full">
            <SkipBack size={18} />
          </button>
          <button
            className="bg-white rounded-full p-3 text-black hover:scale-105 transition-transform shadow-md"
            onClick={togglePlay}
          >
            {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
          </button>
          <button className="text-white/60 hover:text-white transition-colors bg-zinc-800/50 p-2 rounded-full">
            <SkipForward size={18} />
          </button>
          <button className="text-white/60 hover:text-white transition-colors bg-zinc-800/50 p-2 rounded-full">
            <Repeat size={18} />
          </button>
        </div>
        <div className="w-full max-w-md mx-auto flex items-center gap-2">
          <span className="text-xs text-white/60">{formatTime(currentTime)}</span>
          <input
            type="range"
            min={0}
            max={duration}
            value={currentTime}
            onChange={(e) => seek(Number.parseFloat(e.target.value))}
            className="flex-1 h-1 bg-zinc-700 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
          />
          <span className="text-xs text-white/60">{formatTime(duration)}</span>
        </div>
      </div>
      
      <div className="flex-none flex items-center pr-4 border-l border-zinc-800 pl-4">
        {/* <Volume2 size={18} className="text-white/60 mr-2" />
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(e) => setAudioVolume(Number.parseFloat(e.target.value))}
          className="w-24 h-1 bg-zinc-700 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
        /> */}
        <ElasticSlider 
          leftIcon={<Volume2 size={18} className="text-white/60 mr-2" />} 
          rightIcon={<Volume2 size={18} className="text-white/60 mr-2" />} 
          startingValue={50} 
          defaultValue={volume * 1000} 
          maxValue={100} 
          isStepped 
          stepSize={10} 
          onChange={(value) => setAudioVolume(value / 1000)} 
        /> 
      </div>
    </div>
  )
}