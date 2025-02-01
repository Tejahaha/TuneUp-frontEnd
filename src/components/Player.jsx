import React from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Heart } from 'lucide-react';

const Player = ({
  isPlaying,
  togglePlayPause,
  currentTime,
  duration,
  handleSeek,
  formatTime,
  isMuted,
  toggleMute,
  volume,
  handleVolumeChange
}) => (
  <div className="h-24 border-t border-white/10 bg-black/95 backdrop-blur-xl">
    <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-6">
      {/* Track Info */}
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 bg-white/10 rounded-lg" />
        <div>
          <h4 className="font-medium">Demo Track</h4>
          <p className="text-sm text-white/40">SoundHelix</p>
        </div>
        <Heart size={20} className="text-white/40 hover:text-white cursor-pointer" />
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center space-y-2">
        <div className="flex items-center space-x-6">
          <SkipBack size={22} className="text-white/60 hover:text-white cursor-pointer" />
          <button
            onClick={() => {
              try {
                togglePlayPause();
              } catch (error) {
                if (error.name !== 'AbortError') {
                  console.error('Error during play:', error);
                }
              }
            }}
            className="p-3 bg-white rounded-full hover:bg-white/90 transition-colors"
          >
            {isPlaying ? 
              <Pause size={22} className="text-black" /> : 
              <Play size={22} className="text-black" fill="black" />
            }
          </button>
          <SkipForward size={22} className="text-white/60 hover:text-white cursor-pointer" />
        </div>
        <div className="flex items-center space-x-2 w-96">
          <span className="text-xs text-white/40">{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white cursor-pointer"
          />
          <span className="text-xs text-white/40">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Volume */}
      <div className="flex items-center space-x-3">
        <button onClick={toggleMute} className="hover:text-white">
          {isMuted ? <VolumeX size={20} className="text-white/40" /> : <Volume2 size={20} className="text-white/40" />}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={isMuted ? 0 : volume}
          onChange={handleVolumeChange}
          className="w-24 h-1 bg-white/10 rounded-full overflow-hidden appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white cursor-pointer"
        />
      </div>
    </div>
  </div>
);

export default Player;
