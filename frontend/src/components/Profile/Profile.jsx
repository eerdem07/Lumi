import React from "react";
import ProfileHeader from "./ProfileHeader";
import ProfileOptionsButton from "./ProfileOptionsButton";
import MostListenedArtists from "./MostListenedArtists";
import ArtistGrid from "./ArtistGrid";

export default function Profile() {
  const artists = [
    {
      name: "Mezdeke",
      image: "assets/albums/disturbed?height=120&width=120",
    },
    { name: "Disturbed", image: "/placeholder.svg?height=120&width=120" },
    { name: "Linkin Park", image: "/placeholder.svg?height=120&width=120" },
    { name: "Indila", image: "/placeholder.svg?height=120&width=120" },
    { name: "John Williams", image: "/placeholder.svg?height=120&width=120" },
    { name: "Klaus Badelt", image: "/placeholder.svg?height=120&width=120" },
    { name: "Sagopa Kajmer", image: "/placeholder.svg?height=120&width=120" },
    { name: "John Powell", image: "/placeholder.svg?height=120&width=120" },
    {
      name: "Michael Giacchino",
      image: "/placeholder.svg?height=120&width=120",
    },
    { name: "Brian Tyler", image: "/placeholder.svg?height=120&width=120" },
  ];

  const profileInfo = {
    imageUrl: "/placeholder.svg?height=192&width=192",
    displayName: "Emre Erdem",
    publicPlaylistsCount: 10,
    followersCount: 1,
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black text-white">
      <ProfileHeader {...profileInfo} />
      <ProfileOptionsButton />
      <MostListenedArtists />
      <ArtistGrid artists={artists} />
    </div>
  );
}
