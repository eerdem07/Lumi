import React from "react";

function MostListenedArtists() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold">
            Bu ayın en çok dinlenen sanatçıları
          </h2>
          <p className="text-sm text-zinc-400">Yalnızca sana görünür</p>
        </div>
        {/* <button className="text-sm font-bold text-zinc-400 hover:text-white hover:underline">
          Tümünü göster
        </button> */}
      </div>
    </div>
  );
}

export default MostListenedArtists;
