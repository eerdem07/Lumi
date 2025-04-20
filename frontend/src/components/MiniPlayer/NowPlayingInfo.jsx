import { Heart } from "lucide-react";

function NowPlayingInfo({ imageUrl, title, artist }) {
  return (
    <div className="flex items-center w-1/3">
      <div className="w-14 h-14 bg-zinc-800 rounded mr-3 overflow-hidden">
        <img
          src={imageUrl}
          alt="Now playing"
          className="w-full h-full object-cover"
        />
      </div>
      <div>
        <div className="text-white text-sm font-medium">{title}</div>
        <div className="text-xs text-zinc-400">{artist}</div>
      </div>
      <button className="ml-6 text-zinc-400 hover:text-white">
        <Heart className="w-4 h-4" />
      </button>
    </div>
  );
}

export default NowPlayingInfo;
