import { useState, useEffect } from "react";
import { Plus, Music, X, Check, Loader2 } from "lucide-react";

export default function PlaylistManager({ 
  audioPlayer, 
  currentSong,
  isAddToPlaylistModalOpen, // New prop
  onOpenAddToPlaylistModal, // New prop
  onCloseAddToPlaylistModal // New prop
}) {
  const [playlists, setPlaylists] = useState([]);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [userId, setUserId] = useState(1); // Default user ID, in a real app would come from auth
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch user playlists on component mount
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
      setError("Error loading playlists: " + (err.message.includes('Unexpected token') ? 'Server returned invalid JSON. Please check backend.' : err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePlaylist = async (e) => {
    e.preventDefault();
    if (!newPlaylistName.trim()) {
      setError("Please enter a playlist name");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("http://localhost:8080/api/playlists/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          playlistName: newPlaylistName,
        }),
      });

      if (!response.ok) throw new Error("Failed to create playlist");
      const newPlaylist = await response.json();
      setPlaylists([...playlists, newPlaylist]);
      setNewPlaylistName("");
      setSuccess("Playlist created successfully!");
      setError("");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Error creating playlist: " + (err.message.includes('Unexpected token') ? 'Server returned invalid JSON. Please check backend.' : err.message));
    } finally {
      setLoading(false);
    }
  };

  const addSongToPlaylist = async (playlistName) => {
    if (!currentSong || !currentSong.name) {
      setError("No song selected");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("http://localhost:8080/api/playlists/addSong", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          playlistName: playlistName,
          songName: currentSong.name,
        }),
      });

      if (!response.ok) throw new Error("Failed to add song to playlist");
      await fetchUserPlaylists(); // Refresh playlists
      setSuccess(`Added "${currentSong.name}" to "${playlistName}"`);
      setError("");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Error adding song to playlist: " + (err.message.includes('Unexpected token') ? 'Server returned invalid JSON. Please check backend.' : err.message));
      setTimeout(() => setError(""), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Button to open playlists section */}
      <button 
        onClick={onOpenAddToPlaylistModal} // Use prop to open modal
        disabled={!currentSong || !currentSong.name}
        className="flex items-center gap-2 text-white/60 hover:text-white transition-colors p-2 w-full rounded-md hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed"
        title={!currentSong || !currentSong.name ? "Select a song first" : "Add current song to playlist"}
      >
        <Plus size={20} />
        <span>Add to Playlist</span>
      </button>

      {/* Inline Create Playlist Form */}
      <div className="mt-4 mb-2 bg-zinc-900/80 rounded-md p-3 border border-zinc-800">
        <form onSubmit={handleCreatePlaylist} className="flex flex-col gap-2">
          <label htmlFor="playlistName" className="text-white/70 text-sm font-medium mb-1">Create New Playlist</label>
          <input
            id="playlistName"
            type="text"
            value={newPlaylistName}
            onChange={(e) => setNewPlaylistName(e.target.value)}
            placeholder="Playlist Name"
            className="flex-1 bg-zinc-800 border border-zinc-700 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading}
            className="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md flex items-center gap-1"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
            Create
          </button>
        </form>
        {error && (
          <div className="mt-2 p-2 bg-red-900/30 border border-red-800 rounded-md">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}
      </div>

      {/* Playlist List */}
      <div className="mb-4 max-h-60 overflow-y-auto">
        {loading ? (
          <div className="flex justify-center py-4">
            <Loader2 size={24} className="animate-spin text-indigo-500" />
          </div>
        ) : playlists.length === 0 ? (
          <p className="text-white/60 text-center py-4">No playlists yet</p>
        ) : (
          <ul className="space-y-2">
            {playlists.map((playlist) => (
              <li key={`${playlist.userId}-${playlist.playlistName}`}>
                <button
                  onClick={() => addSongToPlaylist(playlist.playlistName)}
                  className="flex items-center gap-3 w-full p-2 hover:bg-zinc-800 rounded-md text-left text-white"
                >
                  <Music size={16} className="text-indigo-400" />
                  <span className="truncate">{playlist.playlistName}</span>
                  <span className="ml-auto text-xs text-zinc-400">
                    {playlist.songs ? playlist.songs.length : 0} songs
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Add to Playlist Modal */}
      {isAddToPlaylistModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[9999] backdrop-blur-sm">
          <div className="bg-zinc-900 p-6 rounded-lg w-96 shadow-2xl border border-zinc-700 transform transition-all duration-300 ease-out scale-100 opacity-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">Add to Playlist</h3>
              <button onClick={onCloseAddToPlaylistModal} className="text-white/60 hover:text-white">
                <X size={20} />
              </button>
            </div>
            {currentSong && currentSong.name && (
              <div className="mb-4 p-2 bg-zinc-800 rounded-md">
                <p className="text-white truncate">
                  Adding: <span className="font-medium">{currentSong.name}</span>
                </p>
              </div>
            )}
            <div className="mb-4 max-h-60 overflow-y-auto">
              {loading ? (
                <div className="flex justify-center py-4">
                  <Loader2 size={24} className="animate-spin text-indigo-500" />
                </div>
              ) : playlists.length === 0 ? (
                <p className="text-white/60 text-center py-4">No playlists yet</p>
              ) : (
                <ul className="space-y-2">
                  {playlists.map((playlist) => (
                    <li key={`${playlist.userId}-${playlist.playlistName}`}>
                      <button
                        onClick={() => addSongToPlaylist(playlist.playlistName)}
                        className="flex items-center gap-3 w-full p-2 hover:bg-zinc-800 rounded-md text-left text-white"
                      >
                        <Music size={16} className="text-indigo-400" />
                        <span className="truncate">{playlist.playlistName}</span>
                        <span className="ml-auto text-xs text-zinc-400">
                          {playlist.songs ? playlist.songs.length : 0} songs
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {error && (
              <div className="mb-4 p-2 bg-red-900/30 border border-red-800 rounded-md">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}
            <div className="flex justify-end">
              <button
                onClick={onCloseAddToPlaylistModal}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success message */}
      {success && (
        <div className="fixed bottom-20 right-4 bg-green-900/80 text-white p-3 rounded-md shadow-lg z-50 flex items-center gap-2 max-w-xs">
          <Check size={16} className="text-green-400" />
          <p className="text-sm">{success}</p>
        </div>
      )}
    </div>
  );
}