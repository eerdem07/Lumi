import { Heart } from "lucide-react";

function NowPlayingInfo({ imageUrl, title, artist }) {
  return (
    <div className="flex items-center overflow-hidden">
      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-zinc-800 rounded mr-2 sm:mr-3 overflow-hidden flex-shrink-0">
        <img
          src={imageUrl}
          alt="Now playing"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-shrink min-w-0">
        <div className="text-white text-sm font-medium truncate">{title}</div>
        <div className="text-xs text-zinc-400 truncate">{artist}</div>
      </div>
      <button className="ml-3 sm:ml-4 text-zinc-400 hover:text-white hidden sm:inline-flex flex-shrink-0">
        <Heart className="w-4 h-4" />
      </button>
    </div>
  );
}

export default NowPlayingInfo;
