import { Volume2 } from "lucide-react";

function VolumeControls({ volume, onVolumeChange }) {
  return (
    <div className="flex items-center gap-2">
      <Volume2 className="w-4 h-4 text-zinc-400" />
      <input
        type="range"
        className="h-1 w-24 bg-zinc-700 rounded-full appearance-none cursor-pointer"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={onVolumeChange}
      />
    </div>
  );
}

export default VolumeControls;
