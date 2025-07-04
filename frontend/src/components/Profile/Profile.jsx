import ProfileHeader from "./ProfileHeader";
import ProfileOptionsButton from "./ProfileOptionsButton";
import MostListenedArtists from "./MostListenedArtists";
import ArtistGrid from "./ArtistGrid";

export default function Profile() {
  const artists = [
    {
      name: "Disturbed",
      image: "/albums/disturbed.jpg?height=120&width=120",
    },
    {
      name: "Mezdeke",
      image: "/albums/mezdeke.jpg?height=120&width=120",
    },
    {
      name: "Indila",
      image: "/albums/indila.jpg?height=120&width=120",
    },
    {
      name: "Linkin Park",
      image: "/albums/linkin-park.jpg?height=120&width=120",
    },
    {
      name: "Intizar",
      image: "/albums/intizar.jpg?height=120&width=120",
    },
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
