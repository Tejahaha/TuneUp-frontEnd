"use client"

import { useState, useEffect, useRef } from "react"
import { Play, Pause, SkipBack, SkipForward, Repeat, Shuffle, Volume2, VolumeX, Heart, Share2 } from "lucide-react"

export default function NowPlaying({ currentSong, onNextSong, onPreviousSong }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [volume, setVolume] = useState(0.5)
  const [isMuted, setIsMuted] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [isRepeat, setIsRepeat] = useState(false)
  const [isShuffle, setIsShuffle] = useState(false)
  const [showVolumeSlider, setShowVolumeSlider] = useState(false)

  const audioRef = useRef(new Audio(currentSong?.audioUrl))

  useEffect(() => {
    if (currentSong) {
      audioRef.current.src = currentSong.audioUrl
      if (isPlaying) audioRef.current.play()
    }
  }, [currentSong, isPlaying]) // Added isPlaying to dependencies

  useEffect(() => {
    audioRef.current.volume = isMuted ? 0 : volume
  }, [volume, isMuted])

  useEffect(() => {
    const audio = audioRef.current
    const updateProgress = () => setProgress((audio.currentTime / audio.duration) * 100)
    audio.addEventListener("timeupdate", updateProgress)
    return () => audio.removeEventListener("timeupdate", updateProgress)
  }, [])

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleProgressChange = (e) => {
    const newTime = (e.target.value / 100) * audioRef.current.duration
    audioRef.current.currentTime = newTime
    setProgress(e.target.value)
  }

  const handleVolumeChange = (e) => {
    const newVolume = Number.parseFloat(e.target.value)
    setVolume(newVolume)
    setIsMuted(newVolume === 0)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
    if (isMuted) {
      setVolume(0.5)
    }
  }

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  if (!currentSong) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 p-4 z-50">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between">
        <div className="flex items-center w-1/4">
          <img
            src={currentSong.imageUrl || "/placeholder.svg"}
            alt={currentSong.title}
            className="w-16 h-16 mr-4 rounded-md"
          />
          <div>
            <h3 className="font-semibold text-white">{currentSong.title}</h3>
            <p className="text-gray-400">{currentSong.artist}</p>
          </div>
        </div>

        <div className="flex flex-col items-center w-1/2">
          <div className="flex items-center space-x-4 mb-2">
            <button
              onClick={() => setIsShuffle(!isShuffle)}
              className={`text-gray-400 hover:text-yellow-300 transition-colors duration-200 ${isShuffle ? "text-yellow-300" : ""}`}
            >
              <Shuffle size={20} />
            </button>
            <button
              onClick={onPreviousSong}
              className="text-gray-400 hover:text-yellow-300 transition-colors duration-200"
            >
              <SkipBack size={24} />
            </button>
            <button
              onClick={togglePlay}
              className="bg-yellow-300 text-gray-900 rounded-full p-2 hover:bg-yellow-200 transition-colors duration-200"
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>
            <button onClick={onNextSong} className="text-gray-400 hover:text-yellow-300 transition-colors duration-200">
              <SkipForward size={24} />
            </button>
            <button
              onClick={() => setIsRepeat(!isRepeat)}
              className={`text-gray-400 hover:text-yellow-300 transition-colors duration-200 ${isRepeat ? "text-yellow-300" : ""}`}
            >
              <Repeat size={20} />
            </button>
          </div>
          <div className="w-full flex items-center space-x-2">
            <span className="text-xs text-gray-400">{formatTime(audioRef.current.currentTime)}</span>
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleProgressChange}
              className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-xs text-gray-400">{formatTime(audioRef.current.duration || 0)}</span>
          </div>
        </div>

        <div className="flex items-center space-x-4 w-1/4 justify-end">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={`text-gray-400 hover:text-yellow-300 transition-colors duration-200 ${isLiked ? "text-yellow-300" : ""}`}
          >
            <Heart size={20} />
          </button>
          <button className="text-gray-400 hover:text-yellow-300 transition-colors duration-200">
            <Share2 size={20} />
          </button>
          <div
            className="relative"
            onMouseEnter={() => setShowVolumeSlider(true)}
            onMouseLeave={() => setShowVolumeSlider(false)}
          >
            <button onClick={toggleMute} className="text-gray-400 hover:text-yellow-300 transition-colors duration-200">
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
            {showVolumeSlider && (
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-32 bg-gray-800 p-2 rounded-md">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}