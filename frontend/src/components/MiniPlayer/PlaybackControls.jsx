import {
  Play,
  Repeat,
  Repeat1,
  Shuffle,
  SkipBack,
  SkipForward,
} from "lucide-react";

function PlaybackControls({ isPlaying, onPlayPause, isRepeating, onRepeat }) {
  return (
    <div className="flex items-center gap-4 mb-2">
      <button className="text-zinc-400 hover:text-white">
        <Shuffle className="w-4 h-4" />
      </button>
      <button className="text-zinc-400 hover:text-white">
        <SkipBack className="w-4 h-4" />
      </button>
      <button
        className="w-8 h-8 rounded-full bg-white flex items-center justify-center"
        onClick={onPlayPause}
      >
        {isPlaying ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-4 h-4 text-black"
          >
            <path
              fillRule="evenodd"
              d="M6 5a1 1 0 00-1 1v12a1 1 0 102 0V6a1 1 0 00-1-1zm8 0a1 1 0 00-1 1v12a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <Play className="w-4 h-4 text-black" />
        )}
      </button>
      <button className="text-zinc-400 hover:text-white">
        <SkipForward className="w-4 h-4" />
      </button>
      <button className="text-zinc-400 hover:text-white" onClick={onRepeat}>
        {isRepeating ? (
          <Repeat1 className="w-4 h-4 text-white" />
        ) : (
          <Repeat className="w-4 h-4" />
        )}
      </button>
    </div>
  );
}

export default PlaybackControls;
