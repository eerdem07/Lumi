function ProgressBar({ currentTime, duration, onSeek, formatTime }) {
  const percent =
    duration > 0 && !isNaN(duration) ? (currentTime / duration) * 100 : 0;

  return (
    <div className="flex items-center gap-2 w-full">
      <span className="text-xs text-zinc-400">{formatTime(currentTime)}</span>
      <input
        type="range"
        className="h-1 flex-1 bg-zinc-700 rounded-full appearance-none cursor-pointer"
        min="0"
        max="100"
        value={isNaN(percent) ? 0 : percent}
        onChange={onSeek}
        aria-label="İlerleme Çubuğu"
      />
      <span className="text-xs text-zinc-400">{formatTime(duration)}</span>
    </div>
  );
}

export default ProgressBar;
