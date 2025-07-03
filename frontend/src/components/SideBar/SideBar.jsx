import React, { useEffect, useState } from "react";
import AppLogo from "./AppLogo";
import TopNavigation from "./TopNavigation";
import CreatePlaylistButton from "./CreatePlaylistButton";
import LibraryFilters from "./LibraryFilters";
import RecentlyPlayed from "./RecentlyPlayed";
import PlaylistList from "./PlaylistList";
import LikedTracksList from "./LikedTracksList";
const apiUrl = import.meta.env.VITE_API_BASE_URL;

export default function SideBar({ setIsModalOpen, onTrackPlay }) {
  const [likedTracks, setLikedTracks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token"); // veya hangi storage'da tutuyorsan
    fetch(`${apiUrl}/tracks/liked`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: "include", // gerekirse, genellikle gerekmez ama auth cookie kullanıyorsan bırakabilirsin
    })
      .then((res) => res.json())
      .then((data) => {
        setLikedTracks(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const playlists = [
    {
      id: "liked",
      name: "Beğenilen Şarkılar",
      songCount: likedTracks.length,
      type: "liked",
    },
    // Diğer playlistleri ekle
  ];

  return (
    <div className="w-20 md:w-64 h-screen flex flex-col bg-black text-white transition-all duration-300 ease-in-out">
      <div className="p-3 md:p-6 space-y-3 md:space-y-6">
        <AppLogo />
        <TopNavigation />
      </div>

      <div className="px-3 flex-grow overflow-hidden flex flex-col">
        <CreatePlaylistButton setIsModalOpen={setIsModalOpen} />

        <LibraryFilters />
        <LikedTracksList
          tracks={likedTracks}
          loading={loading}
          onTrackClick={onTrackPlay}
        />
        {/* <RecentlyPlayed /> */}
        {/* <PlaylistList playlists={playlists} /> */}
      </div>
    </div>
  );
}
