import AppLogo from "./AppLogo";
import TopNavigation from "./TopNavigation";
import CreatePlaylistButton from "./CreatePlaylistButton";
import LibraryFilters from "./LibraryFilters";
import RecentlyPlayed from "./RecentlyPlayed";
import PlaylistList from "./PlaylistList";

const examplePlaylists = [
  { id: 1, name: "Beğenilen Şarkılar", songCount: 1473 },
  // ... daha fazla çalma listesi
];

export default function SideBar({ setIsModalOpen }) {
  return (
    <div className="w-64 flex flex-col bg-black">
      <div className="p-6 space-y-6">
        <AppLogo />
        <TopNavigation />
      </div>

      <div className="mt-2 px-2">
        <CreatePlaylistButton setIsModalOpen={setIsModalOpen} />
        <LibraryFilters />
        <RecentlyPlayed />
        <PlaylistList playlists={examplePlaylists} />
      </div>
    </div>
  );
}
