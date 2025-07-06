import React, { useState } from "react";
import { X } from "lucide-react";

export default function PlaylistModal({ isOpen, onClose }) {
  const [playlistName, setPlaylistName] = useState("Yeni Çalma Listesi");
  const [description, setDescription] = useState("");
  const [isPublic, setIsPublic] = useState(true);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ playlistName, description, isPublic });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 sm:p-6 md:p-8 lg:p-10">
      <div className="bg-zinc-900 rounded-lg max-w-md w-full max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center p-4 sm:p-5 border-b border-zinc-800">
          <h2 className="text-lg sm:text-xl font-bold">
            Yeni çalma listesi oluştur
          </h2>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white p-1 rounded-full hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-700"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-5">
          <div className="flex gap-4 mb-4 sm:mb-6">
            <div className="w-24 h-24 sm:w-32 sm:h-32 bg-zinc-800 flex-shrink-0 rounded shadow-lg overflow-hidden">
              <img
                src="/placeholder.svg?height=160&width=160"
                alt="Playlist cover"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col flex-1 gap-3 sm:gap-4">
              <div>
                <label
                  htmlFor="playlist-name"
                  className="block text-sm text-zinc-400 mb-1"
                >
                  Ad
                </label>
                <input
                  id="playlist-name"
                  type="text"
                  value={playlistName}
                  onChange={(e) => setPlaylistName(e.target.value)}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                  placeholder="Çalma listesi adı"
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm text-zinc-400 mb-1"
                >
                  Açıklama
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500 resize-none text-sm"
                  placeholder="Çalma listesi açıklaması ekle (isteğe bağlı)"
                  rows={2}
                  sm:rows={3}
                />
              </div>
            </div>
          </div>

          <div className="mb-4 sm:mb-6">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
                className="w-4 h-4 accent-green-500"
              />
              <span className="text-sm">Herkese açık çalma listesi</span>
            </label>
            <p className="text-xs text-zinc-400 mt-1 ml-7">
              Herkes bu çalma listesini görebilir
            </p>
          </div>

          <div className="flex justify-end gap-3 mt-4 sm:mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-white bg-transparent hover:bg-zinc-800 rounded-full focus:outline-none focus:ring-2 focus:ring-zinc-700"
            >
              İptal
            </button>
            <button
              type="submit"
              className="px-6 py-2 text-sm font-medium text-black bg-green-500 hover:bg-green-400 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Oluştur
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
