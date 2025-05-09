import { useState, useEffect } from "react";
import { Play, MoreVertical, ArrowLeft, Music, Trash2, Loader2 } from "lucide-react";

export default function PlaylistView({ 
  userId = 1, 
  audioPlayer, 
  setCurrentSong, 
  onBack,
  songImageMap 
}) {
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [playlistSongs, setPlaylistSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUserPlaylists();
  }, []);

  const fetchUserPlaylists = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:8080/api/playlists/user/" + userId);
      if (!response.ok) throw new Error("Failed to fetch playlists");
      const data = await response.json();
      setPlaylists(data);
    } catch (err) {
      setError("Error loading playlists: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchPlaylistDetails = async (playlistName) => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:8080/api/playlists/get?userId=" + userId + "&playlistName=" + encodeURIComponent(playlistName));
      if (!response.ok) throw new Error("Failed to fetch playlist details");
      
      const data = await response.json();
      setSelectedPlaylist(data);
      setPlaylistSongs(data.songs || []);
    } catch (err) {
      setError("Error loading playlist: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePlaySong = (song) => {
    // Get the full song name with extension
    const fullSongName = Object.keys(songImageMap).find(
      (key) => key.replace(/\.mp3$/, "") === song
    );
    
    if (fullSongName) {
      const url = `/songs/${encodeURIComponent(fullSongName)}`;
      audioPlayer.loadTrack(url);
      audioPlayer.togglePlay();
      setCurrentSong({
        name: song,
        image: songImageMap[fullSongName] || "/placeholder.svg"
      });
    }
  };

  const handleBackToPlaylists = () => {
    setSelectedPlaylist(null);
    setPlaylistSongs([]);
  };

  // Find a song image by name (without extension)
  const findSongImage = (songName) => {
    const fullSongName = Object.keys(songImageMap).find(
      (key) => key.replace(/\.mp3$/, "") === songName
    );
    return fullSongName ? songImageMap[fullSongName] : "/placeholder.svg";
  };

  return (
    <div className="h-full flex flex-col">
      <header className="sticky top-0 bg-zinc-900/90 backdrop-blur-md z-10 p-6 flex justify-between items-center border-b border-zinc-800">
        {selectedPlaylist ? (
          <div className="flex items-center gap-4">
            <button 
              onClick={handleBackToPlaylists}
              className="text-white/60 hover:text-white transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            <h2 className="text-2xl font-bold text-white truncate">
              {selectedPlaylist.playlistName}
            </h2>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="text-white/60 hover:text-white transition-colors">
              <ArrowLeft size={24} />
            </button>
            <h2 className="text-2xl font-bold text-white">Your Playlists</h2>
          </div>
        )}
      </header>

      <main className="p-6 flex-1 overflow-y-auto pb-24">
        {loading && (
          <div className="flex justify-center py-12">
            <Loader2 size={32} className="animate-spin text-indigo-500" />
          </div>
        )}
        
        {error && (
          <div className="p-4 bg-red-900/30 border border-red-800 rounded-md">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {/* Playlists Grid View */}
        {!selectedPlaylist && !loading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {playlists.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-white/60 text-lg">No playlists yet</p>
                <p className="text-white/40 mt-2">Start by creating a playlist and adding songs to it.</p>
              </div>
            ) : (
              playlists.map((playlist) => (
                <div
                  key={`${playlist.userId}-${playlist.playlistName}`}
                  className="bg-zinc-800/50 p-4 rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer"
                  onClick={() => fetchPlaylistDetails(playlist.playlistName)}
                >
                  <div className="aspect-square bg-zinc-700 rounded-md mb-3 flex items-center justify-center relative overflow-hidden">
                    {/* Show up to 4 song images in a grid if songs exist */}
                    {playlist.songs && playlist.songs.length > 0 ? (
                      <div className="grid grid-cols-2 w-full h-full">
                        {playlist.songs.slice(0, 4).map((song, idx) => (
                          <div key={idx} className="overflow-hidden">
                            <img 
                              src={findSongImage(song)} 
                              alt={song}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                        {/* Fill empty slots with placeholders */}
                        {Array(Math.max(0, 4 - (playlist.songs?.length || 0))).fill(0).map((_, idx) => (
                          <div key={`empty-${idx}`} className="bg-zinc-800"></div>
                        ))}
                      </div>
                    ) : (
                      <Music size={32} className="text-white/30" />
                    )}
                    <div className="absolute bottom-2 right-2 p-2 bg-indigo-600 rounded-full opacity-0 group-hover:opacity-100 shadow-lg transition-opacity">
                      <Play size={16} fill="white" />
                    </div>
                  </div>
                  <h3 className="font-medium text-white truncate">{playlist.playlistName}</h3>
                  <p className="text-sm text-white/60">
                    {playlist.songs ? `${playlist.songs.length} songs` : "0 songs"}
                  </p>
                </div>
              ))
            )}
          </div>
        )}

        {/* Playlist Songs List View */}
        {selectedPlaylist && !loading && (
          <div className="mt-4">
            {playlistSongs.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-white/60 text-lg">No songs in this playlist</p>
                <p className="text-white/40 mt-2">Add songs while playing them.</p>
              </div>
            ) : (
              <div className="space-y-1">
                {playlistSongs.map((song, idx) => (
                  <div
                    key={`${song}-${idx}`}
                    className="flex items-center gap-4 p-3 hover:bg-zinc-800/70 rounded-md group cursor-pointer"
                    onClick={() => handlePlaySong(song)}
                  >
                    <div className="w-12 h-12 bg-zinc-800 rounded overflow-hidden flex-shrink-0">
                      <img 
                        src={findSongImage(song)} 
                        alt={song}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium truncate">{song}</p>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="text-white/60 hover:text-white p-2">
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}