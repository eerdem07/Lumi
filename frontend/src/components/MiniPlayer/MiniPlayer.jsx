import React, { useState, useRef, useEffect } from "react";
import { ListMusic } from "lucide-react";
import NowPlayingInfo from "./NowPlayingInfo";
import PlaybackControls from "./PlaybackControls";
import ProgressBar from "./ProgressBar";
import VolumeControls from "./VolumeControls";

const VOLUME_STORAGE_KEY = "audioVolume";

export default function MiniPlayer({ track }) {
  const audioRef = useRef(null);
  const initialVolume = localStorage.getItem(VOLUME_STORAGE_KEY);
  const [volume, setVolume] = useState(
    initialVolume ? parseFloat(initialVolume) : 1
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isRepeating, setIsRepeating] = useState(false);

  const audioSource = track?.audioUrl || "";
  const trackInfo = track
    ? {
        imageUrl: track.coverImageUrl,
        title: track.title,
        artist:
          typeof track.artist === "object" ? track.artist.name : track.artist,
      }
    : null;

  // Track değiştiğinde şarkıyı otomatik başlat
  useEffect(() => {
    if (audioRef.current && track) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
      setIsPlaying(false);

      // Oynatıcıya programatik olarak play() çağır, tarayıcı otomatik başlatmaya izin verirse
      setTimeout(() => {
        audioRef.current.load();
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {}); // Autoplay engeli olabilir, kullanıcı Play'e tıklayınca tekrar çalacak
      }, 100);
    }
  }, [audioSource]); // Burada audioSource değişimini takip etmek daha güvenlidir

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((error) => {
          setIsPlaying(false);
          console.error("Play error:", error);
        });
    }
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!audioRef.current) return;
    setDuration(audioRef.current.duration);
    audioRef.current.volume = volume;
    audioRef.current.loop = isRepeating;
  };

  const formatTime = (time) => {
    if (isNaN(time) || time === Infinity) {
      return "0:00";
    }
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const handleSeek = (e) => {
    if (!audioRef.current || isNaN(duration) || duration === 0) return;
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
    const nextRepeatingState = !isRepeating;
    setIsRepeating(nextRepeatingState);
    if (audioRef.current) {
      audioRef.current.loop = nextRepeatingState;
    }
  };

  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement) {
      audioElement.volume = volume;
      audioElement.loop = isRepeating;

      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);

      audioElement.addEventListener("play", handlePlay);
      audioElement.addEventListener("pause", handlePause);
      audioElement.addEventListener("ended", () => {
        if (!audioElement.loop) {
          setIsPlaying(false);
          setCurrentTime(0);
        }
      });

      return () => {
        audioElement.removeEventListener("play", handlePlay);
        audioElement.removeEventListener("pause", handlePause);
      };
    }
  }, [audioRef, volume, isRepeating]);

  if (!track) {
    return (
      <div className="h-20 bg-zinc-900 border-t border-zinc-800 flex items-center justify-center text-zinc-400">
        Şarkı seçilmedi
      </div>
    );
  }

  return (
    <div className="h-20 bg-zinc-900 border-t border-zinc-800 flex items-center justify-between px-2 sm:px-4">
      <div className="w-[30%] md:w-[25%] max-w-[180px] sm:max-w-[220px] lg:max-w-[300px]">
        <NowPlayingInfo
          imageUrl={track.coverImageUrl}
          title={track.title}
          artist={
            typeof track.artist === "object" ? track.artist.name : track.artist
          }
          trackId={track._id}
          initiallyLiked={track.liked} // Eğer API'dan track.liked geliyorsa, yoksa false
        />
      </div>

      <div className="flex flex-col items-center flex-grow mx-2 sm:mx-4">
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

      <div className="flex items-center justify-end w-[30%] md:w-[25%] max-w-[180px] sm:max-w-[220px] lg:max-w-[300px] gap-2 sm:gap-3">
        <button className="text-zinc-400 hover:text-white hidden md:inline-flex">
          <ListMusic className="w-4 h-4 lg:w-5 lg:h-5" />
        </button>
        <VolumeControls volume={volume} onVolumeChange={handleVolumeChange} />
      </div>

      <audio
        ref={audioRef}
        src={audioSource}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        preload="metadata"
      />
    </div>
  );
}
