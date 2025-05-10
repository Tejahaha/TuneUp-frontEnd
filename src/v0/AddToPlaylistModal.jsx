import { X, Loader2, Check, Music } from "lucide-react";
import { useEffect, useState } from "react";

export default function AddToPlaylistModal({ currentSong, isOpen, onClose }) {
  const [playlists, setPlaylists] = useState([]);
  const [userId] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (isOpen) fetchUserPlaylists();
  }, [isOpen]);

  const fetchUserPlaylists = async () => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:8080/api/playlists/user/${userId}`);
      if (!res.ok) throw new Error("Failed to fetch playlists");
      const data = await res.json();
      setPlaylists(data);
    } catch (err) {
      setError("Error loading playlists: " + err.message);
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
      const res = await fetch("http://localhost:8080/api/playlists/addSong", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          playlistName,
          songName: currentSong.name,
        }),
      });

      if (!res.ok) throw new Error("Failed to add song to playlist");
      setSuccess(`Added "${currentSong.name}" to "${playlistName}"`);
      setError("");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-zinc-900 p-6 rounded-lg w-96 shadow-2xl border border-zinc-700 z-[10000]">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white">Add to Playlist</h3>
          <button onClick={onClose} className="text-white/60 hover:text-white">
            <X size={20} />
          </button>
        </div>

        {currentSong?.name && (
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
                      {playlist.songs?.length ?? 0} songs
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
            onClick={onClose}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md"
          >
            Done
          </button>
        </div>

        {success && (
          <div className="mt-4 bg-green-900/20 border border-green-700 text-green-300 p-2 rounded-md">
            <Check size={16} className="inline mr-2" />
            {success}
          </div>
        )}
      </div>
    </div>
  );
}
