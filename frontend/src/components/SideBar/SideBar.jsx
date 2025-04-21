import React from "react";
import AppLogo from "./AppLogo";
import TopNavigation from "./TopNavigation";
import CreatePlaylistButton from "./CreatePlaylistButton";
import LibraryFilters from "./LibraryFilters";
import RecentlyPlayed from "./RecentlyPlayed";
import PlaylistList from "./PlaylistList";

const examplePlaylists = [
  { id: "liked", name: "Beğenilen Şarkılar", songCount: 1473, type: "liked" },
  { id: 1, name: "Ağır Siklet Çalışma", owner: "Emre Erdem", songCount: 50 },
  { id: 2, name: "Kodlama Modu", owner: "Spotify", songCount: 120 },
  { id: 3, name: "Yolculuk Şarkıları", owner: "Emre Erdem", songCount: 75 },
  { id: 4, name: "Film Müzikleri", owner: "Emre Erdem", songCount: 250 },
];

export default function SideBar({ setIsModalOpen }) {
  return (
    <div className="w-20 md:w-64 h-screen flex flex-col bg-black text-white transition-all duration-300 ease-in-out">
      <div className="p-3 md:p-6 space-y-3 md:space-y-6">
        <AppLogo />

        <TopNavigation />
      </div>

      <div className="px-3 flex-grow overflow-hidden flex flex-col">
        <CreatePlaylistButton setIsModalOpen={setIsModalOpen} />

        <LibraryFilters />

        <RecentlyPlayed />

        <PlaylistList playlists={examplePlaylists} />
      </div>
    </div>
  );
}
