function LibraryFilters() {
  return (
    <div className="bg-zinc-900 rounded-lg p-2 mb-2">
      <div className="flex gap-2 mb-4">
        <button className="px-3 py-1 text-sm font-medium bg-zinc-800 text-white rounded-full">
          Playlists
        </button>
        <button className="px-3 py-1 text-sm font-medium text-white rounded-full">
          Sanatçılar
        </button>
      </div>
    </div>
  );
}

export default LibraryFilters;
