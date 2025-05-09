import { useEffect, useState } from "react";
import { MoreVertical, Home } from "lucide-react";
import { cn } from "../components/lib/utils";

const scrollbarHideStyle = `
  * {
    -ms-overflow-style: none !important;
    scrollbar-width: none !important;
  }
  *::-webkit-scrollbar {
    display: none !important;
    width: 0 !important;
    background: transparent !important;
  }
`;

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
};

export default function MainContent({ 
  sidebarOpen, 
  audioPlayer, 
  setCurrentSong 
}) {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [menuOpenIdx, setMenuOpenIdx] = useState(null);

  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = scrollbarHideStyle;
    document.head.appendChild(styleElement);
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  useEffect(() => {
    async function fetchSongs() {
      try {
        setSongs(Object.keys(songImageMap));
        setLoading(false);
      } catch (err) {
        setError("Failed to load songs.");
        setLoading(false);
      }
    }
    fetchSongs();
  }, []);

  const handlePlaySong = (song) => {
    const url = `/songs/${encodeURIComponent(song)}`;
    audioPlayer.loadTrack(url);
    audioPlayer.togglePlay();
    setCurrentSong({
      name: song.replace(/\.mp3$/, ""),
      image: songImageMap[song] || "/placeholder.svg"
    });
  };

  const handleSongMenu = (e, idx) => {
    e.stopPropagation();
    setMenuOpenIdx(menuOpenIdx === idx ? null : idx);
  };

  return (
    <div className="h-screen overflow-y-auto flex flex-col bg-gradient-to-br from-black-900/30 via-black to-black-900/30">
      <header className="sticky top-0 bg-zinc-900/90 backdrop-blur-md z-10 p-6 flex justify-between items-center border-b border-zinc-800">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-white">Songs</h2>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-white/60 hover:text-white transition-colors">
            <MoreVertical size={24} />
          </button>
        </div>
      </header>

      <main className="p-6 flex-1 overflow-y-auto pb-24">
        {loading && <div className="text-white">Loading songs...</div>}
        {error && <div className="text-red-400">{error}</div>}

        <section className="mb-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {songs.map((song, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center gap-2 cursor-pointer group relative"
                onClick={() => handlePlaySong(song)}
                onMouseLeave={() => setMenuOpenIdx(null)}
              >
                <img
                  src={songImageMap[song] || "/placeholder.svg"}
                  alt={song.replace(/\.mp3$/, "")}
                  className="w-40 h-40 object-cover rounded-lg shadow-lg transition-transform duration-200 hover:scale-105 bg-zinc-900 p-2 group-hover:ring-2 group-hover:ring-indigo-500"
                />
                <span className="mt-2 text-center text-white text-base font-medium truncate w-36" title={song.replace(/\.mp3$/, "")}>{song.replace(/\.mp3$/, "")}</span>
                <span className="absolute top-4 right-4 z-10">
                  <button
                    className="opacity-0 group-hover:opacity-100 text-white/80 hover:text-indigo-400 transition-colors rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    onClick={(e) => handleSongMenu(e, idx)}
                  >
                    <MoreVertical size={22} />
                  </button>
                  </span>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
  );
}
