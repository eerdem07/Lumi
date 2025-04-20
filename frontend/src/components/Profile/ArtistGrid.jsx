import React from "react";
import ArtistCard from "./ArtistCard";

function ArtistGrid({ artists }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-6">
      {artists.map((artist, index) => (
        <ArtistCard key={index} artist={artist} />
      ))}
    </div>
  );
}

export default ArtistGrid;
