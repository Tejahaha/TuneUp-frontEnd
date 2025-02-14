import { MoreHorizontal } from "lucide-react"
import { cn } from "../components/lib/utils"

const PlaylistCard = ({ name, description, imageUrl, onClick }) => (
  <div
    className="bg-white/[0.03] rounded-lg p-4 hover:bg-white/[0.08] transition-colors cursor-pointer"
    onClick={onClick}
  >
    <img
      src={imageUrl || "/placeholder.svg"}
      alt={name}
      className="w-full aspect-square object-cover rounded-md mb-4"
    />
    <h3 className="text-white font-semibold mb-1">{name}</h3>
    <p className="text-white/60 text-sm">{description}</p>
  </div>
)

export default function MainContent({ sidebarOpen, audioPlayer }) {
  const playlists = [
    {
      name: "Discover Weekly",
      description: "Your weekly mixtape of fresh music",
      imageUrl: "https://picsum.photos/200",
      trackUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    },
    {
      name: "Daily Mix 1",
      description: "Personalized mix for you",
      imageUrl: "https://picsum.photos/201",
      trackUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    },
    {
      name: "Chill Hits",
      description: "Kick back to the best new and recent chill hits",
      imageUrl: "https://picsum.photos/202",
      trackUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    },
    {
      name: "Release Radar",
      description: "Catch all the latest music from artists you follow",
      imageUrl: "https://picsum.photos/203",
      trackUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    },
    {
      name: "Your Top Songs 2023",
      description: "The songs you loved most this year",
      imageUrl: "https://picsum.photos/204",
      trackUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    },
  ]

  return (
    <div
      className={cn(
        "flex-1 overflow-hidden bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05]",
        "transition-all duration-300 ease-in-out",
      )}
    >
      <div className="h-full overflow-y-auto">
        <header className="sticky top-0 bg-[#030303]/80 backdrop-blur-md z-10 p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-white">Good afternoon</h2>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-white/60 hover:text-white transition-colors">
              <MoreHorizontal size={24} />
            </button>
          </div>
        </header>
        <main className="p-6">
          <section className="mb-8">
            <h2 className="text-xl font-bold text-white mb-4">Your Playlists</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {playlists.map((playlist, index) => (
                <PlaylistCard
                  key={index}
                  name={playlist.name}
                  description={playlist.description}
                  imageUrl={playlist.imageUrl}
                  onClick={() => audioPlayer.loadTrack(playlist.trackUrl)}
                />
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

