import React from "react";
import { ChevronDown, ChevronUp, Play } from "lucide-react";

const Queue = ({ queue, currentIndex, playSong, isOpen, toggleQueue }) => {
  return (
    <div className={`bg-black/90 text-white rounded-lg shadow-md transition-all duration-300 ${isOpen ? "max-h-screen" : "max-h-0"} overflow-hidden`}>
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 cursor-pointer" onClick={toggleQueue}>
        <h3 className="text-xl font-bold">Up Next</h3>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </div>
      {isOpen && (
        <ul className="p-4 space-y-3">
          {queue.map((song, index) => (
            <li
              key={index}
              className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition ${
                currentIndex === index
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600"
                  : "hover:bg-white/10"
              }`}
              onClick={() => playSong(index)}
            >
              <div>
                <p className="font-medium">{song.name}</p>
                <p className="text-sm text-white/60">{song.artist}</p>
              </div>
              <Play size={18} className="text-white/60 hover:text-white" />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Queue;
