import React, { useState } from "react";
import { Play, Pause } from "lucide-react";

const sizeClasses = {
  small: "w-32 h-32",
  medium: "w-40 h-40",
  large: "w-48 h-48",
};

const borderRadiusClasses = {
  none: "rounded-none",
  small: "rounded-sm",
  medium: "rounded-md",
  large: "rounded-lg",
  full: "rounded-full",
};

export default function MediaCard({
  image,
  title,
  subtitle,
  description,
  onPlayPause,
  onClick,
  className = "",
  size = "medium",
  showPlayButton = true,
  isActive = false,
  loading = false,
  imageAlt,
  playButtonColor = "bg-green-500",
  showOverlay = true,
  borderRadius = "medium",
}) {
  const [isHovered, setIsHovered] = useState(false);

  const handlePlayPause = (e) => {
    e.stopPropagation();
    if (onPlayPause) onPlayPause(true);
  };

  const handleCardClick = () => {
    if (onClick) onClick();
  };

  const cardSizeClass = sizeClasses[size];
  const borderRadiusClass = borderRadiusClasses[borderRadius];

  return (
    <div
      className={`group cursor-pointer transition-all duration-300 ${className}`}
    >
      {/* Card Container */}
      <div
        className={`relative ${cardSizeClass} ${borderRadiusClass} overflow-hidden bg-zinc-800 transition-all duration-300 hover:bg-zinc-700 ${
          isActive ? "ring-2 ring-green-500" : ""
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleCardClick}
        role="button"
        tabIndex={0}
        aria-label={`${title}${subtitle ? ` - ${subtitle}` : ""}`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleCardClick();
          }
        }}
      >
        {/* Image */}
        <div
          className={`relative w-full h-full ${borderRadiusClass} overflow-hidden`}
        >
          {loading ? (
            <div className="w-full h-full bg-zinc-700 animate-pulse flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-zinc-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <img
              src={image || "/placeholder.svg"}
              alt={imageAlt || title}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
              draggable={false}
            />
          )}

          {/* Overlay */}
          {showOverlay && (
            <div
              className={`absolute inset-0 bg-black transition-opacity duration-300 ${
                isHovered || isActive ? "opacity-20" : "opacity-0"
              }`}
            />
          )}

          {/* Title and Subtitle Overlay */}
          {(title || subtitle) && (
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
              {/* {subtitle && (
                <div className="text-xs font-medium text-yellow-400 mb-1 uppercase tracking-wide">
                  {subtitle}
                </div>
              )} */}
              {title && (
                <div className="text-sm font-bold text-white truncate">
                  {title}
                </div>
              )}
            </div>
          )}

          {/* Play/Pause Button */}
          {showPlayButton && (
            <div
              className={`absolute bottom-2 right-2 transition-all duration-300 ${
                isHovered || isActive
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-2"
              }`}
            >
              <button
                onClick={handlePlayPause}
                className={`w-12 h-12 ${playButtonColor} hover:scale-105 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:shadow-xl`}
                aria-label={isActive ? "Pause" : "Play"}
                disabled={loading}
              >
                {isActive ? (
                  <Pause className="w-5 h-5 text-black" />
                ) : (
                  <Play className="w-5 h-5 text-black ml-0.5" />
                )}
              </button>
            </div>
          )}

          {/* Playing Indicator */}
          {isActive && (
            <div className="absolute top-2 right-2">
              <div className="flex items-center gap-1">
                <div className="w-1 h-3 bg-green-500 rounded-full animate-pulse" />
                <div className="w-1 h-4 bg-green-500 rounded-full animate-pulse" />
                <div className="w-1 h-2 bg-green-500 rounded-full animate-pulse" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      {description && (
        <div className="mt-3 px-1">
          <p className="text-sm text-zinc-400 line-clamp-2 leading-relaxed">
            {description}
          </p>
        </div>
      )}
    </div>
  );
}
