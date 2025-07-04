import { Heart } from "lucide-react";
import { useState } from "react";
const apiUrl = import.meta.env.VITE_API_BASE_URL;

function NowPlayingInfo({
  imageUrl,
  title,
  artist,
  trackId,
  initiallyLiked = false,
}) {
  const [liked, setLiked] = useState(initiallyLiked);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLike = async () => {
    if (!trackId || loading) return;
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${apiUrl}/tracks/${trackId}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      if (response.ok) {
        setLiked(result.liked);
      } else {
        setError(result.message || "Bir hata oluştu");
      }
    } catch (e) {
      setError("Sunucuya bağlanırken hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center overflow-hidden">
      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-zinc-800 rounded mr-2 sm:mr-3 overflow-hidden flex-shrink-0">
        <img
          src={imageUrl || "/music-cover.jpg"}
          alt={title || "Şarkı resmi"}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-shrink min-w-0">
        <div className="text-white text-sm font-medium truncate">
          {title || "Bilinmeyen Şarkı"}
        </div>
        <div className="text-xs  truncate">
          {artist || "Bilinmeyen Sanatçı"}
        </div>
      </div>
      <button
        className={`ml-3 sm:ml-4 ${
          liked ? "text-red-500" : "text-zinc-400"
        } hover:text-white hidden sm:inline-flex flex-shrink-0 transition relative`}
        onClick={handleLike}
        disabled={loading}
        aria-label={liked ? "Beğenmekten vazgeç" : "Beğen"}
      >
        {/* Loading durumunda kalp döner */}
        <span className={loading ? "animate-spin" : ""}>
          <Heart
            className={`w-4 h-4 ${liked ? "fill-red-500 text-red-500" : ""}`}
          />
        </span>
      </button>
      {error && <span className="ml-2 text-xs text-red-500">{error}</span>}
    </div>
  );
}

export default NowPlayingInfo;
