// components/LikedTracksList.jsx
import LikedTrackCard from "./LikedTrackCard";

export default function LikedTracksList({ tracks, loading, onTrackClick }) {
  if (loading)
    return <div className="text-xs text-zinc-400 py-3">Yükleniyor...</div>;
  if (!tracks.length)
    return (
      <div className="text-xs text-zinc-400 py-3">Beğendiğin şarkı yok.</div>
    );

  return (
    <div className="py-2">
      <div className="font-bold text-sm mb-1">Beğenilen Şarkılar</div>
      <div className="space-y-1">
        {tracks.map((track) => (
          <LikedTrackCard
            key={track._id}
            track={track}
            onClick={onTrackClick}
          />
        ))}
      </div>
    </div>
  );
}
