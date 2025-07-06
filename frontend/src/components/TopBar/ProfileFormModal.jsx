import React, { useState, useRef, useEffect } from "react";
import { X, Camera, User, Edit3, Save, Check, AlertCircle } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../features/userSlice";
import defaultProfilePic from "../../assets/profile-pic.png";

const apiUrl = import.meta.env.VITE_API_URL;

export default function ProfileFormModal({ isOpen, onClose }) {
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    profilePictureUrl: "",
  });

  useEffect(() => {
    if (user && isOpen) {
      setFormData({
        name: user.name || "",
        bio: user.bio || "",
        profilePictureUrl: user.profilePictureUrl || defaultProfilePic,
      });
    }
  }, [user, isOpen]);

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("idle");
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef(null);

  // Validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Ad gereklidir";
    return newErrors;
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
    if (submitStatus !== "idle") setSubmitStatus("idle");
  };

  // Fotoğraf seçimi (isteğe bağlı, backend işlemi yok)
  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({
          ...prev,
          profilePictureUrl: "Geçerli bir resim dosyası seçin",
        }));
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          profilePictureUrl: "Resim 5MB'dan küçük olmalı",
        }));
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData((prev) => ({
          ...prev,
          profilePictureUrl: e.target.result,
        }));
        setErrors((prev) => ({ ...prev, profilePictureUrl: "" }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    setErrors(formErrors);
    if (Object.keys(formErrors).length > 0) {
      setSubmitStatus("error");
      return;
    }
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const res = await fetch(`${apiUrl}/users/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          name: formData.name,
          bio: formData.bio,
          profilePictureUrl: formData.profilePictureUrl,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Güncelleme başarısız");
      dispatch(updateUser(data.user));
      setSubmitStatus("success");
      setIsEditing(false);
      setTimeout(() => {
        onClose();
        setSubmitStatus("idle");
      }, 1200);
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (isSubmitting) return;
    onClose();
    setIsEditing(false);
    setSubmitStatus("idle");
    setErrors({});
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-zinc-900 rounded-lg max-w-md w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Profil Bilgileri</h2>
              <p className="text-sm text-zinc-400">
                Kişisel bilgilerinizi düzenleyin
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white text-sm rounded-full transition-colors"
              >
                <Edit3 className="w-4 h-4" />
                Düzenle
              </button>
            )}
            <button
              onClick={handleClose}
              disabled={isSubmitting}
              className="text-zinc-400 hover:text-white p-2 rounded-full hover:bg-zinc-800 transition-colors disabled:opacity-50"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Profile Picture */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative group">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-zinc-700">
                <img
                  src={formData.profilePictureUrl || defaultProfilePic}
                  alt="Profile"
                  className="w-full h-full object-cover"
                  width={96}
                  height={96}
                />
              </div>
              {isEditing && (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Camera className="w-6 h-6 text-white" />
                </button>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            {errors.profilePictureUrl && (
              <p className="text-red-400 text-sm">{errors.profilePictureUrl}</p>
            )}
            {isEditing && (
              <p className="text-xs text-zinc-400 text-center">
                Profil fotoğrafınızı değiştirmek için tıklayın
                <br />
                (Maksimum 5MB, JPG/PNG formatında)
              </p>
            )}
          </div>

          {/* Ad */}
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Ad <span className="text-red-400">*</span>
            </label>
            {isEditing ? (
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className={`w-full bg-zinc-800 border rounded-lg px-4 py-2.5 text-base text-white focus:outline-none focus:ring-2 transition-colors ${
                  errors.name
                    ? "border-red-500 focus:ring-red-500"
                    : "border-zinc-600 focus:ring-green-500"
                }`}
                placeholder="Adınızı girin"
              />
            ) : (
              <div className="w-full bg-zinc-800 border border-zinc-600 rounded-lg px-4 py-2.5 text-base text-white">
                {formData.name}
              </div>
            )}
            {errors.name && (
              <p className="text-red-400 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* E-posta sadece gösteriliyor */}
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              E-posta Adresi
            </label>
            <div className="w-full bg-zinc-800 border border-zinc-600 rounded-lg px-4 py-2.5 text-base text-white">
              {user?.email}
            </div>
          </div>

          {/* Hakkında */}
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Hakkında
            </label>
            {isEditing ? (
              <textarea
                value={formData.bio}
                onChange={(e) => handleInputChange("bio", e.target.value)}
                rows={3}
                maxLength={500}
                className="w-full bg-zinc-800 border border-zinc-600 rounded-lg px-4 py-2.5 text-base text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors resize-none"
                placeholder="Kendiniz hakkında kısa bir açıklama yazın (isteğe bağlı)"
              />
            ) : (
              <div className="w-full bg-zinc-800 border border-zinc-600 rounded-lg px-4 py-2.5 text-base text-white min-h-[80px]">
                {formData.bio || "Henüz bir açıklama eklenmemiş"}
              </div>
            )}
            {isEditing && (
              <p className="text-xs text-zinc-400 mt-1">
                {formData.bio.length}/500 karakter
              </p>
            )}
          </div>

          {/* Submit Status */}
          {submitStatus === "success" && (
            <div className="flex items-center gap-2 p-3 bg-green-900 bg-opacity-30 rounded-lg border border-green-800">
              <Check className="w-5 h-5 text-green-400" />
              <p className="text-green-300">
                Profil bilgileriniz başarıyla güncellendi!
              </p>
            </div>
          )}
          {submitStatus === "error" && (
            <div className="flex items-center gap-2 p-3 bg-red-900 bg-opacity-30 rounded-lg border border-red-800">
              <AlertCircle className="w-5 h-5 text-red-400" />
              <p className="text-red-300">
                Profil güncellenirken bir hata oluştu. Lütfen tekrar deneyin.
              </p>
            </div>
          )}

          {/* Footer Butonları */}
          {isEditing && (
            <div className="flex justify-end gap-3 border-t border-zinc-800 pt-6">
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setErrors({});
                  setSubmitStatus("idle");
                }}
                disabled={isSubmitting}
                className="px-4 py-2 text-sm font-medium text-zinc-300 hover:text-white transition-colors disabled:opacity-50"
              >
                İptal
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex items-center gap-2 px-6 py-2 text-sm font-medium rounded-full transition-colors ${
                  isSubmitting
                    ? "bg-zinc-700 text-zinc-400 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-400 text-black"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-zinc-400 border-t-transparent rounded-full animate-spin" />
                    Kaydediliyor...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Değişiklikleri Kaydet
                  </>
                )}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
