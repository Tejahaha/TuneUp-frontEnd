"use client"

import { useState } from "react"
import { Plus } from "lucide-react"

const mockSongs = [
  [
  {
    "id": 1,
    "title": "Bohemian Rhapsody",
    "artist": "Queen",
    "imageUrl": "https://i.scdn.co/image/ab67616d0000b273dd9b9fd2bd3c15ab76c0774e"
  },
  {
    "id": 2,
    "title": "Stairway to Heaven",
    "artist": "Led Zeppelin",
    "imageUrl": "https://i.scdn.co/image/ab67616d0000b2736a922a01d3fb1c53873b1f9d"
  },
  {
    "id": 3,
    "title": "Imagine",
    "artist": "John Lennon",
    "imageUrl": "https://i.scdn.co/image/ab67616d0000b27318550999e0fa01158e1b1368"
  },
  {
    "id": 4,
    "title": "Smells Like Teen Spirit",
    "artist": "Nirvana",
    "imageUrl": "https://i.scdn.co/image/ab67616d0000b273a9222db9b57a982272e13800"
  },
  {
    "id": 5,
    "title": "Billie Jean",
    "artist": "Michael Jackson",
    "imageUrl": "https://i.scdn.co/image/ab67616d0000b273b179915f0a5d3ccf21c8eb3f"
  }
]
]

export default function MainContent({ playSong, addToQueue, searchQuery }) {
  const [playlists, setPlaylists] = useState([])
  const [newPlaylistName, setNewPlaylistName] = useState("")

  // Remove the filteredSongs method
  // const filteredSongs = mockSongs.filter(song => song.title.toLowerCase().includes(searchQuery.toLowerCase()))

  const createPlaylist = () => {
    if (newPlaylistName.trim()) {
      setPlaylists([...playlists, { name: newPlaylistName, songs: [] }])
      setNewPlaylistName("")
    }
  }

  return (
    <div className="p-8">
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-yellow-300">Trending</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {mockSongs[0].map((song) => (
            <SongCard key={song.id} song={song} playSong={playSong} addToQueue={addToQueue} />
          ))}
        </div>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-yellow-300">All Time Hits</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {mockSongs[0].map((song) => (
            <SongCard key={song.id} song={song} playSong={playSong} addToQueue={addToQueue} />
          ))}
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-bold mb-4 text-yellow-300">Your Playlists</h2>
        <div className="flex items-center mb-4">
          <input
            type="text"
            value={newPlaylistName}
            onChange={(e) => setNewPlaylistName(e.target.value)}
            placeholder="New playlist name"
            className="bg-gray-700 text-white px-3 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-yellow-300"
          />
          <button
            onClick={createPlaylist}
            className="bg-yellow-300 text-gray-900 px-4 py-2 rounded-r-md hover:bg-yellow-200 transition-colors duration-200"
          >
            <Plus size={20} />
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {playlists.map((playlist, index) => (
            <div key={index} className="bg-gray-800 p-4 rounded-lg">
              <h3 className="font-semibold text-white">{playlist.name}</h3>
              <p className="text-gray-400">{playlist.songs.length} songs</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

function SongCard({ song, playSong, addToQueue }) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg transition-transform duration-200 hover:scale-105">
      <img
        src={song.imageUrl || "/placeholder.svg"}
        alt={song.title}
        className="w-full aspect-square object-cover mb-2 rounded"
      />
      <h3 className="font-semibold text-white">{song.title}</h3>
      <p className="text-gray-400">{song.artist}</p>
      <div className="mt-2 flex justify-between">
        <button
          onClick={() => playSong(song)}
          className="text-yellow-300 hover:text-yellow-200 transition-colors duration-200"
        >
          Play
        </button>
        <button
          onClick={() => addToQueue(song)}
          className="text-gray-400 hover:text-white transition-colors duration-200"
        >
          Add to Queue
        </button>
      </div>
    </div>
  )
}