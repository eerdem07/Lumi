import React from "react";
import { MoreHorizontal } from "lucide-react";

export default function Profile() {
  const artists = [
    { name: "Disturbed", image: "/placeholder.svg?height=120&width=120" },
    { name: "Metallica", image: "/placeholder.svg?height=120&width=120" },
    { name: "Rammstein", image: "/placeholder.svg?height=120&width=120" },
    {
      name: "System Of A Down",
      image: "/placeholder.svg?height=120&width=120",
    },
    { name: "Slipknot", image: "/placeholder.svg?height=120&width=120" },
    { name: "Iron Maiden", image: "/placeholder.svg?height=120&width=120" },
    { name: "Linkin Park", image: "/placeholder.svg?height=120&width=120" },
    { name: "Nirvana", image: "/placeholder.svg?height=120&width=120" },
    {
      name: "Red Hot Chili Peppers",
      image: "/placeholder.svg?height=120&width=120",
    },
    { name: "Queen", image: "/placeholder.svg?height=120&width=120" },
    // Daha fazla sanatçı eklenebilir
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-black text-white">
      <div className="pt-8 px-6 sm:px-8 md:px-12 lg:px-24 pb-6 flex items-center gap-4 sm:gap-6">
        <div className="w-32 h-32 sm:w-48 sm:h-48 rounded-full overflow-hidden border-2 sm:border-4 border-zinc-700 flex-shrink-0">
          <img
            src="/placeholder.svg?height=192&width=192"
            alt="Profile picture"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col flex-grow">
          <span className="text-sm text-zinc-400 mb-1 sm:mb-2">Profil</span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-3 sm:mb-4 md:mb-6">
            Emre Erdem
          </h1>
          <div className="text-sm text-zinc-400">
            Herkese Açık 10 Çalma Listesi • Takip Edilen: 1
          </div>
        </div>

        {/* Daha fazla seçenek ikonu, sağ üst köşeye yaslanacak şekilde ayarlandı */}
        <div className="ml-auto">
          <button className="p-2 rounded-full hover:bg-zinc-800">
            <MoreHorizontal className="w-5 h-5 sm:w-6 sm:h-6 text-zinc-400" />
          </button>
        </div>
      </div>

      <div className="px-6 sm:px-8 md:px-12 lg:px-24 py-4">
        <div className="flex justify-between items-center mb-3 sm:mb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold">
              Bu ayın en çok dinlenen sanatçıları
            </h2>
            <p className="text-sm text-zinc-400">Yalnızca sana görünür</p>
          </div>
          <button className="text-sm font-bold text-zinc-400 hover:text-white hover:underline">
            Tümünü göster
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-8 xl:grid-cols-10 gap-4 sm:gap-6">
          {artists.map((artist, index) => (
            <div key={index} className="flex flex-col items-center group">
              <div className="w-full aspect-square rounded-full overflow-hidden mb-2 sm:mb-3 cursor-pointer">
                <img
                  src={artist.image}
                  alt={artist.name}
                  className="w-full h-full object-cover group-hover:opacity-70 transition-opacity"
                />
              </div>
              <span className="text-xs sm:text-sm font-medium text-center">
                {artist.name}
              </span>
              <span className="text-xs text-zinc-400">Sanatçı</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
