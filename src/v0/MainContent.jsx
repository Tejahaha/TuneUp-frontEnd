import { useEffect, useState } from "react";
import { MoreVertical, Home, PlusSquare } from "lucide-react"; // Added PlusSquare
import { cn } from "../components/lib/utils";
import PlaylistView from './PlaylistView'; // Added import

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

const songArtistMap = {
  "All Most Padipoyinde Pilla.mp3": "Sid Sriram",
  "Bholaa Mania.mp3": "Vishal Mishra",
  "Boss Party.mp3": "Nakash Aziz",
  "Chamkeela Angeelesi.mp3": "Dheekshith, Hema Chandra",
  "Dhoom Dhaam Dhosthaan.mp3": "Kaala Bhairava",
  "Endhe Endhe.mp3": "Sid Sriram",
  "Guntur Kaaram.mp3": "Shilpa Rao, Sri Krishna, Anurag Kulkarni",
  "Hathavidi.mp3": "Anurag Kulkarni",
  "I Phone.mp3": "Ram Miriyala",
  "Jai Balayya.mp3": "Rahul Sipligunj, Geetha Madhuri",
  "Jai Shriram.mp3": "Ajay-Atul, Chorus",
  "Kalallo.mp3": "Sid Sriram",
  "Maa Bava Manobhavalu.mp3": "Ram Miriyala, Rahul Sipligunj, Roll Rida",
  "Malli Malli.mp3": "Anurag Kulkarni",
  "Mawa Bro.mp3": "Anirudh Ravichander, Rahul Sipligunj",
  "Monalisa Monalisa.mp3": "Anurag Kulkarni",
  "Monna Badilo.mp3": "Sid Sriram",
  "Na Roja Nuvve.mp3": "Hesham Abdul Wahab",
  "Nachavule Nachavule.mp3": "Anurag Kulkarni",
  "Neekemo Andamekkuva.mp3": "Sid Sriram",
  "No No No.mp3": "Shreya Ghoshal, Anurag Kulkarni",
  "O Dollar Pillagaa.mp3": "Ram Miriyala, Sahithi Chaganti",
  "Oh Ammalaalo Ammalaalo.mp3": "Shankar Mahadevan, Vishal Mishra",
  "Ori Vaari.mp3": "Santhosh Narayanan",
  "Poonakaalu Loading.mp3": "Ram Miriyala, Roll Rida",
  "Priya Mithunam.mp3": "Sid Sriram",
  "Ragile Jwaale.mp3": "Shreya Ghoshal, Anurag Kulkarni",
  "Ram Sita Ram.mp3": "Sachet Tandon, Parampara Tandon",
  "Rama Krishna.mp3": "Anurag Kulkarni",
  "Ranjithame.mp3": "Ranjith Govind, M M Manasi",
  "Shivoham.mp3": "Ajay-Atul, Chorus",
  "Silk Bar.mp3": "Anurag Kulkarni",
  "Sridevi Chiranjeevi.mp3": "S. P. Charan, Anurag Kulkarni",
  "Suguna Sundari.mp3": "Anurag Kulkarni",
  "Wild Saala.mp3": "Anurag Kulkarni",
  "Yevarini Yevaritho.mp3": "Sid Sriram"
};

export default function MainContent({ 
  sidebarOpen, 
  audioPlayer, 
  setCurrentSong, 
  activeView, // Added prop
  onSwitchToSongsView, // Added prop
  onOpenPlaylistManagerModal // Added new prop for signaling playlist manager
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

  const handleInitiateAddToPlaylist = (songFile) => {
    setCurrentSong({
      name: songFile.replace(/\.mp3$/, ""),
      image: songImageMap[songFile] || "/placeholder.svg"
    });
    if (onOpenPlaylistManagerModal) {
      onOpenPlaylistManagerModal();
    }
    setMenuOpenIdx(null); // Close the song-specific menu
  };

  if (activeView === 'playlists') {
    return (
      <PlaylistView 
        audioPlayer={audioPlayer} 
        setCurrentSong={setCurrentSong} 
        onBack={onSwitchToSongsView} 
        songImageMap={songImageMap} 
      />
    );
  }

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
                <span className="absolute top-4 right-4 z-10 relative"> {/* Added relative positioning for the dropdown menu */}
                  <button
                    className="opacity-0 group-hover:opacity-100 text-white/80 hover:text-indigo-400 transition-colors rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    onClick={(e) => handleSongMenu(e, idx)}
                  >
                    <MoreVertical size={22} />
                  </button>
                  {menuOpenIdx === idx && (
                    <div className="absolute top-full mt-1 right-0 bg-zinc-800 shadow-lg rounded-md p-1 z-20 w-48 border border-zinc-700">
                      <div className="px-3 py-2 text-xs text-indigo-400 font-semibold border-b border-zinc-700 mb-1">
                        Artist: {songArtistMap[song] || "Unknown"}
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent song play or other parent clicks
                          handleInitiateAddToPlaylist(song);
                        }}
                        className="w-full text-left px-3 py-2 text-sm text-white/80 hover:bg-zinc-700 hover:text-white rounded-md flex items-center gap-2"
                      >
                        <PlusSquare size={16} className="mr-2" />
                        Add to Playlist
                      </button>
                      {/* Future menu items can be added here */}
                    </div>
                  )}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
  );
}