import { useState } from "react";
import { Heart } from "lucide-react";
import MiniPlayer from "../components/MiniPlayer/MiniPlayer";
import SideBar from "../components/SideBar/SideBar";
import TopBar from "../components/TopBar/TopBar";
import PlaylistModal from "../components/PlaylistModal";

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-black text-white">
      <PlaylistModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <div className="flex flex-1 overflow-hidden">
        <div className="hidden md:flex md:w-64 flex-shrink-0">
          <SideBar setIsModalOpen={setIsModalOpen} />
        </div>

        <div className="flex-1 bg-gradient-to-b from-zinc-900 to-black overflow-auto">
          <TopBar />

          <div className="p-4 sm:p-6">
            <div className="flex gap-2 mb-4 sm:mb-6">
              <button className="px-3 py-1 sm:px-4 sm:py-1.5 text-xs sm:text-sm font-medium bg-white text-black rounded-full">
                Tümü
              </button>
              <button className="px-3 py-1 sm:px-4 sm:py-1.5 text-xs sm:text-sm font-medium text-white bg-zinc-800 bg-opacity-40 rounded-full">
                Müzik
              </button>
              <button className="px-3 py-1 sm:px-4 sm:py-1.5 text-xs sm:text-sm font-medium text-white bg-zinc-800 bg-opacity-40 rounded-full">
                Podcast'ler
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
              <div className="bg-zinc-800 bg-opacity-40 rounded-lg flex items-center overflow-hidden hover:bg-zinc-700 transition-colors group">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-purple-700 flex items-center justify-center">
                  <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
                <div className="p-2 sm:p-4">
                  <h3 className="text-sm sm:text-base font-bold">
                    Beğenilen Şarkılar
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <MiniPlayer />
    </div>
  );
}
