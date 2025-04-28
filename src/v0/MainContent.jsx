import { useEffect, useState } from "react"
import { MoreHorizontal } from "lucide-react"
import { cn } from "../components/lib/utils"

const songImageMap = {
  "All Most Padipoyinde Pilla.mp3": "/songs/All Most Padipoyinde Pilla.jpg.jpg",
  "Bholaa Mania.mp3": "/songs/Bholaa Mania.jpg.jpg",
  "Boss Party.mp3": "/songs/Boss Party.jpg.jpg",
  "Chamkeela Angeelesi.mp3": "/songs/Chamkeela Angeelesi.jpg.jpg",
  "Dhoom Dhaam Dhosthaan.mp3": "/songs/Dhoom Dhaam Dhosthaan.jpg.jpg",
  "Endhe Endhe.mp3": "/songs/Endhe Endhe.jpg.jpg",
  "Guntur Kaaram.mp3": "/songs/Guntur Kaaram.jpg.jpg",
  "Hathavidi.mp3": "/songs/Hathavidi.jpg.jpg",
  "I Phone.mp3": "/songs/I Phone.jpg.jpg",
  "Jai Balayya.mp3": "/songs/Jai Balayya.jpg.jpg",
  "Jai Shriram.mp3": "/songs/Jai Shriram.jpg.jpg",
  "Kalallo.mp3": "/songs/Kalallo.jpg.jpg",
  "Maa Bava Manobhavalu.mp3": "/songs/Maa Bava Manobhavalu.jpg.jpg",
  "Malli Malli.mp3": "/songs/Malli Malli.jpg.jpg",
  "Mawa Bro.mp3": "/songs/Mawa Bro.jpg.jpg",
  "Monalisa Monalisa.mp3": "/songs/Monalisa Monalisa.jpg.jpg",
  "Monna Badilo.mp3": "/songs/Monna Badilo.jpg.jpg",
  "Na Roja Nuvve.mp3": "/songs/Na Roja Nuvve.jpg.jpg",
  "Nachavule Nachavule.mp3": "/songs/Nachavule Nachavule.jpg.jpg",
  "Neekemo Andamekkuva.mp3": "/songs/Neekemo Andamekkuva.jpg.jpg",
  "No No No.mp3": "/songs/No No No.jpg.jpg",
  "O Dollar Pillagaa.mp3": "/songs/O Dollar Pillagaa.jpg.jpg",
  "Oh Ammalaalo Ammalaalo.mp3": "/songs/Oh Ammalaalo Ammalaalo.jpg.jpg",
  "Ori Vaari.mp3": "/songs/Ori Vaari.jpg.jpg",
  "Poonakaalu Loading.mp3": "/songs/Poonakaalu Loading.jpg.jpg",
  "Priya Mithunam.mp3": "/songs/Priya Mithunam.jpg.jpg",
  "Ragile Jwaale.mp3": "/songs/Ragile Jwaale.jpg.jpg",
  "Ram Sita Ram.mp3": "/songs/Ram Sita Ram.jpg.jpg",
  "Rama Krishna.mp3": "/songs/Rama Krishna.jpg.jpg",
  "Ranjithame.mp3": "/songs/Ranjithame.jpg.jpg",
  "Shivoham.mp3": "/songs/Shivoham.jpg.jpg",
  "Silk Bar.mp3": "/songs/Silk Bar.jpg.jpg",
  "Sridevi Chiranjeevi.mp3": "/songs/Sridevi Chiranjeevi.jpg.jpg",
  "Suguna Sundari.mp3": "/songs/Suguna Sundari.jpg.jpg",
  "Wild Saala.mp3": "/songs/Wild Saala.jpg.jpg",
  "Yevarini Yevaritho.mp3": "/songs/Yevarini Yevaritho.jpg.jpg"
}

const SongCard = ({ name, image, onClick }) => (
  <div
    className="bg-white/[0.03] rounded-lg p-4 hover:bg-white/[0.08] transition-colors cursor-pointer flex flex-col items-center gap-3"
    onClick={onClick}
  >
    <img
      src={image || "/placeholder.svg"}
      alt={name}
      className="w-24 h-24 object-cover rounded-md"
    />
    <span className="text-white font-semibold truncate mt-2">{name}</span>
  </div>
)

export default function MainContent({ sidebarOpen, audioPlayer, setCurrentSong }) {
  const [songs, setSongs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    async function fetchSongs() {
      try {
        // Hardcoded list since direct file system access is not possible from frontend
        setSongs([
          "All Most Padipoyinde Pilla.mp3",
          "Bholaa Mania.mp3",
          "Boss Party.mp3",
          "Chamkeela Angeelesi.mp3",
          "Dhoom Dhaam Dhosthaan.mp3",
          "Endhe Endhe.mp3",
          "Guntur Kaaram.mp3",
          "Hathavidi.mp3",
          "I Phone.mp3",
          "Jai Balayya.mp3",
          "Jai Shriram.mp3",
          "Kalallo.mp3",
          "Maa Bava Manobhavalu.mp3",
          "Malli Malli.mp3",
          "Mawa Bro.mp3",
          "Monalisa Monalisa.mp3",
          "Monna Badilo.mp3",
          "Na Roja Nuvve.mp3",
          "Nachavule Nachavule.mp3",
          "Neekemo Andamekkuva.mp3",
          "No No No.mp3",
          "O Dollar Pillagaa.mp3",
          "Oh Ammalaalo Ammalaalo.mp3",
          "Ori Vaari.mp3",
          "Poonakaalu Loading.mp3",
          "Priya Mithunam.mp3",
          "Ragile Jwaale.mp3",
          "Ram Sita Ram.mp3",
          "Rama Krishna.mp3",
          "Ranjithame.mp3",
          "Shivoham.mp3",
          "Silk Bar.mp3",
          "Sridevi Chiranjeevi.mp3",
          "Suguna Sundari.mp3",
          "Wild Saala.mp3",
          "Yevarini Yevaritho.mp3"
        ])
        setLoading(false)
      } catch (err) {
        setError("Failed to load songs.")
        setLoading(false)
      }
    }
    fetchSongs()
  }, [])

  const handlePlaySong = (song) => {
    const url = `/songs/${encodeURIComponent(song)}`
    audioPlayer.loadTrack(url)
    audioPlayer.togglePlay()
    setCurrentSong({
      name: song.replace(/\.mp3$/, ""),
      image: songImageMap[song] || "/placeholder.svg"
    })
  }

  return (
    <div
      className={cn(
        "flex-1 overflow-hidden bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-indigo-500/[0.05]",
        "transition-all duration-300 ease-in-out",
      )}
    >
      <div className="h-full overflow-y-auto">
        <header className="sticky top-0 bg-[#030303]/80 backdrop-blur-md z-10 p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-white">Songs</h2>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-white/60 hover:text-white transition-colors">
              <MoreHorizontal size={24} />
            </button>
          </div>
        </header>
        <main className="p-6">
          {loading && <div className="text-white">Loading songs...</div>}
          {error && <div className="text-red-400">{error}</div>}
          <section className="mb-8">
            <h2 className="text-xl font-bold text-white mb-4">Available Songs</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {songs.map((song, idx) => (
                <SongCard
                  key={idx}
                  name={song.replace(/\.mp3$/, "")}
                  image={songImageMap[song]}
                  onClick={() => handlePlaySong(song)}
                />
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

