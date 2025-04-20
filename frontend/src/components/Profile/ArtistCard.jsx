import React from "react";

function ArtistCard({ artist }) {
  return (
    <div className="flex flex-col items-center group">
      <div className="w-full aspect-square rounded-full overflow-hidden mb-3 cursor-pointer">
        <img
          src={artist.image}
          alt={artist.name}
          className="w-full h-full object-cover group-hover:opacity-70 transition-opacity"
        />
      </div>
      <span className="text-sm font-medium text-center">{artist.name}</span>
      <span className="text-xs text-zinc-400">Sanatçı</span>
    </div>
  );
}

export default ArtistCard;
