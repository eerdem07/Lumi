import React from "react";

function LibraryFilters() {
  return (
    <div className="bg-zinc-900 rounded-lg p-2 mb-2">
      <div className="flex gap-2 mb-2 overflow-x-auto">
        <button className="px-3 py-1 text-sm font-medium bg-zinc-800 text-white rounded-full whitespace-nowrap">
          Playlists
        </button>
        <button className="px-3 py-1 text-sm font-medium text-white rounded-full whitespace-nowrap">
          Sanatçılar
        </button>
        {/* Diğer filtre butonları buraya eklenebilir */}
      </div>
    </div>
  );
}

export default LibraryFilters;
