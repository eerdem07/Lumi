import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import MiniPlayer from "../components/MiniPlayer/MiniPlayer";
import SideBar from "../components/SideBar/SideBar";
import TopBar from "../components/TopBar/TopBar";
import PlaylistModal from "../components/PlaylistModal";
import MediaCard from "../components/Card/MediaCard";
import { useSelector } from "react-redux";
const apiUrl = import.meta.env.VITE_API_BASE_URL;

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- Çalan şarkı state'i
  const [nowPlaying, setNowPlaying] = useState(null);

  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (!user) {
      window.location.href = "/login";
    }
  }, [user]);

  useEffect(() => {
    fetch(`${apiUrl}/tracks/all`)
      .then((res) => res.json())
      .then((data) => {
        setTracks(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="flex flex-col h-screen bg-black text-white">
      <PlaylistModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <div className="flex flex-1 overflow-hidden">
        <div className="hidden md:flex md:w-64 flex-shrink-0">
          <SideBar
            setIsModalOpen={setIsModalOpen}
            onTrackPlay={setNowPlaying}
          />
        </div>

        <div className="flex-1 bg-gradient-to-b from-zinc-900 to-black overflow-auto">
          <TopBar />

          <div className="p-4 sm:p-6">
            <div className="flex gap-2 mb-4 sm:mb-6">
              <button className="px-3 py-1 sm:px-4 sm:py-1.5 text-xs sm:text-sm font-medium bg-white text-black rounded-full">
                Tümü
              </button>
              <button className="px-3 py-1 sm:px-4 sm:py-1.5 text-xs sm:text-sm font-medium text-white bg-zinc-800 bg-opacity-40 rounded-full">
                Müzik
              </button>
              <button className="px-3 py-1 sm:px-4 sm:py-1.5 text-xs sm:text-sm font-medium text-white bg-zinc-800 bg-opacity-40 rounded-full">
                Podcast'ler
              </button>
            </div>

            {/* spacing güncellendi */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 mb-3 sm:mb-4">
              {loading && (
                <div className="col-span-full text-center py-8">
                  Yükleniyor...
                </div>
              )}

              {!loading && tracks.length === 0 && (
                <div className="col-span-full text-center py-8 text-zinc-400">
                  Hiç şarkı bulunamadı.
                </div>
              )}

              {tracks.map((track) => (
                <MediaCard
                  key={track._id}
                  image={track.coverImageUrl || "/music-cover.jpg"}
                  title={track.title}
                  subtitle={
                    typeof track.artist === "object"
                      ? track.artist.name
                      : track.artist
                  }
                  description={track.genre}
                  onClick={() => setNowPlaying(track)}
                  onPlayPause={() => setNowPlaying(track)}
                  isActive={nowPlaying?._id === track._id}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <MiniPlayer track={nowPlaying} />
    </div>
  );
}
