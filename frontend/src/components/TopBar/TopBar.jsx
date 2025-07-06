import React, { useState } from "react";
import { useSelector } from "react-redux";
import SearchBar from "./SearchBar";
import { Upload } from "lucide-react";
import UploadMusicModal from "../UploadMusic/UploadMusicModal";
import ProfileDropDown from "./ProfileDropDown";
import handleUploadMusic from "../../features/handleUploadMusic";

export default function TopBar() {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Redux’tan user objesini al
  const user = useSelector((state) => state.user.user);

  const handleModalUpload = async (musicData) => {
    setUploadError("");
    setUploadSuccess(false);
    try {
      await handleUploadMusic(musicData);
      setUploadSuccess(true);
    } catch (err) {
      setUploadError("Yükleme sırasında hata oluştu.");
    }
  };

  // Çıkış fonksiyonu
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  // Profil düzenleme fonksiyonu
  const handleEditProfile = () => {
    alert("Profil düzenleme yakında!");
  };

  return (
    <div className="sticky top-0 bg-zinc-900 bg-opacity-90 z-10 px-4 sm:px-6 py-2">
      <div className="flex items-center justify-between w-full">
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto">
          <SearchBar />
        </div>
        <div className="flex items-center gap-2 ml-4">
          {/* SADECE ARTIST/ADMIN GÖRSÜN */}
          {user?.role === "artist" || user?.role === "admin" ? (
            <>
              <button
                className="flex items-center gap-2 bg-zinc-800 bg-opacity-10 hover:bg-opacity-20 text-white rounded-full py-1 px-3"
                onClick={() => setShowUploadModal(true)}
              >
                <Upload className="w-4 h-4" />
                <span className="text-sm font-medium">Müzik Yükle</span>
              </button>
              <UploadMusicModal
                isOpen={showUploadModal}
                onClose={() => setShowUploadModal(false)}
                onSubmit={handleModalUpload}
              />
            </>
          ) : null}

          {/* Profil butonu */}
          <ProfileDropDown
            userImage={user?.profilePictureUrl || "/placeholder.svg"}
            userName={user?.name || "Bilinmeyen Kullanıcı"}
            userEmail={user?.email || "Bilinmiyor"}
            onLogout={handleLogout}
            onEditProfile={handleEditProfile}
          />
        </div>
      </div>
      {/* Dilersen yükleme durumu için mesaj gösterebilirsin */}
      {uploadError && (
        <div className="text-red-400 text-center text-sm mt-2">
          {uploadError}
        </div>
      )}
      {uploadSuccess && (
        <div className="text-green-400 text-center text-sm mt-2">
          Müzik başarıyla yüklendi!
        </div>
      )}
    </div>
  );
}
