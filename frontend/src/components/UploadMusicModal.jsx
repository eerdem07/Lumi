import React, { useState } from "react";
import { X } from "lucide-react";

export default function UploadMusicModal({ isOpen, onClose, onSubmit }) {
  const [title, setTitle] = useState("");
  const [album, setAlbum] = useState("");
  const [genre, setGenre] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState(""); // Kapak görseli URL olarak
  const [audioFile, setAudioFile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!title || !album || !genre || !audioFile) {
      setError("Tüm alanları doldurun ve mp3 seçin.");
      return;
    }
    setLoading(true);
    try {
      await onSubmit({ title, album, genre, coverImageUrl, audioFile });
      onClose();
      // Temizle
      setTitle("");
      setAlbum("");
      setGenre("");
      setCoverImageUrl("");
      setAudioFile(null);
    } catch (err) {
      setError("Yükleme sırasında hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 sm:p-6 md:p-8 lg:p-10">
      <div className="bg-zinc-900 rounded-lg max-w-md w-full max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center p-4 sm:p-5 border-b border-zinc-800">
          <h2 className="text-lg sm:text-xl font-bold">Müzik Ekle</h2>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white p-1 rounded-full hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-700"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
        <form
          onSubmit={handleSubmit}
          className="p-4 sm:p-5 flex flex-col gap-4"
        >
          <div>
            <label className="block text-sm text-zinc-400 mb-1">
              Parça Adı
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
              placeholder="Parça adı girin"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Albüm</label>
            <input
              type="text"
              value={album}
              onChange={(e) => setAlbum(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
              placeholder="Albüm adı girin"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Tür</label>
            <input
              type="text"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
              placeholder="Müzik türü girin"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">
              Kapak Görseli (URL)
            </label>
            <input
              type="url"
              value={coverImageUrl}
              onChange={(e) => setCoverImageUrl(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
              placeholder="Kapak görseli URL'si"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">
              MP3 Dosyası
            </label>
            <input
              type="file"
              accept=".mp3,audio/mp3,audio/mpeg"
              onChange={(e) => setAudioFile(e.target.files[0])}
              className="w-full bg-zinc-800 border border-zinc-700 rounded p-2 text-white text-sm file:bg-green-600 file:text-white file:rounded-full file:px-3 file:py-1 file:font-medium"
              required
            />
            {audioFile && (
              <span className="text-xs text-green-400 mt-1 block">
                Seçilen dosya: {audioFile.name}
              </span>
            )}
          </div>
          {error && (
            <div className="text-red-400 text-center text-sm">{error}</div>
          )}
          <div className="flex justify-end gap-3 mt-2">
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
              disabled={loading}
            >
              {loading ? "Yükleniyor..." : "Ekle"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
