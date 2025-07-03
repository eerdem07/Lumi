import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { User, LogOut, ChevronDown } from "lucide-react";
import ProfileFormModal from "./ProfileFormModal";
import { logout } from "../../features/userSlice";
import defaultProfilePic from "../../assets/profile-pic.png";

export default function ProfileDropdown({
  className = "",
  showUserInfo = true,
  position = "bottom-right",
}) {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        buttonRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    const handleEscape = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  // Kullanıcı yoksa buton render etme
  if (!user) return null;

  const userImage = user.profilePictureUrl || defaultProfilePic;
  const userName = user.name || "Kullanıcı";
  const userEmail = user.email || "-";

  const positionClasses = {
    "bottom-right": "right-0 top-full",
    "bottom-left": "left-0 top-full",
    "bottom-center": "left-1/2 transform -translate-x-1/2 top-full",
  };

  const handleLogout = () => {
    setIsOpen(false);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(logout());
    window.location.href = "/login";
  };

  return (
    <div className={`relative ${className}`}>
      {/* Açılır Menü Butonu */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex items-center gap-2 p-1 rounded-full hover:bg-zinc-800 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-black ${
          isOpen ? "bg-zinc-800" : ""
        }`}
        aria-label="User menu"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-zinc-700 hover:border-zinc-600 transition-colors">
          <img
            src={userImage}
            width={32}
            height={32}
            alt="Profile picture"
            className="w-full h-full object-cover"
          />
        </div>
        <ChevronDown
          className={`w-4 h-4 text-zinc-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          } hidden sm:block`}
        />
      </button>

      {/* Dropdown Menü */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className={`absolute ${positionClasses[position]} mt-2 w-64 bg-zinc-900 border border-zinc-800 rounded-lg shadow-2xl z-50 animate-in fade-in-0 zoom-in-95 duration-200`}
          role="menu"
          aria-orientation="vertical"
        >
          {showUserInfo && (
            <div className="px-4 py-3 border-b border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-zinc-700">
                  <img
                    src={userImage}
                    width={40}
                    height={40}
                    alt="Profile picture"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {userName}
                  </p>
                  <p className="text-xs text-zinc-400 truncate">{userEmail}</p>
                </div>
              </div>
            </div>
          )}

          <div className="py-2">
            {/* Profili Düzenle */}
            <button
              onClick={() => {
                setShowProfileModal(true);
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-white hover:bg-zinc-800 transition-colors focus:outline-none focus:bg-zinc-800"
              role="menuitem"
            >
              <User className="w-4 h-4 text-zinc-400" />
              <span>Profili Düzenle</span>
            </button>
            {/* Çıkış Yap */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-white hover:bg-zinc-800 transition-colors focus:outline-none focus:bg-zinc-800"
              role="menuitem"
            >
              <LogOut className="w-4 h-4 text-zinc-400" />
              <span>Çıkış Yap</span>
            </button>
          </div>
          <div className="px-4 py-2 border-t border-zinc-800">
            <p className="text-xs text-zinc-500">Spotify Clone v1.0</p>
          </div>
        </div>
      )}

      {/* Profil Düzenleme Modalı */}
      <ProfileFormModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
      />
    </div>
  );
}
