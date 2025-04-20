import React, { useState, useRef, useEffect } from "react";
import { ListMusic } from "lucide-react";
import NowPlayingInfo from "./NowPlayingInfo";
import PlaybackControls from "./PlaybackControls";
import ProgressBar from "./ProgressBar";
import VolumeControls from "./VolumeControls";

const VOLUME_STORAGE_KEY = "audioVolume";

export default function MiniPlayer() {
  const audioRef = useRef(null);
  const initialVolume = localStorage.getItem(VOLUME_STORAGE_KEY);
  const [volume, setVolume] = useState(
    initialVolume ? parseFloat(initialVolume) : 1
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isRepeating, setIsRepeating] = useState(false);
  const audioSource = "src/assets/musics/sensiz-olamam.mp3";
  const trackInfo = {
    imageUrl: "/placeholder.svg",
    title: "Sensiz Olamam",
    artist: "İmtizar",
  };

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const formatTime = (time) => {
    if (isNaN(time)) {
      return "0:00";
    }
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const handleSeek = (e) => {
    const seekTime = (parseFloat(e.target.value) / 100) * duration;
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    localStorage.setItem(VOLUME_STORAGE_KEY, newVolume.toString());
  };

  const toggleRepeat = () => {
    setIsRepeating(!isRepeating);
    if (audioRef.current) {
      audioRef.current.loop = !isRepeating;
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.loop = isRepeating;
    }
  }, [audioRef, volume, isRepeating]);

  return (
    <div className="h-20 bg-zinc-900 border-t border-zinc-800 flex items-center px-4">
      <NowPlayingInfo {...trackInfo} />
      <div className="flex flex-col items-center w-1/3">
        <PlaybackControls
          isPlaying={isPlaying}
          onPlayPause={togglePlay}
          isRepeating={isRepeating}
          onRepeat={toggleRepeat}
        />
        <ProgressBar
          currentTime={currentTime}
          duration={duration}
          onSeek={handleSeek}
          formatTime={formatTime}
        />
      </div>
      <div className="flex items-center justify-end w-1/3 gap-3">
        <button className="text-zinc-400 hover:text-white">
          <ListMusic className="w-4 h-4" />
        </button>
        <VolumeControls volume={volume} onVolumeChange={handleVolumeChange} />
      </div>
      <audio
        ref={audioRef}
        src={audioSource}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        loop={isRepeating}
      />
    </div>
  );
}
