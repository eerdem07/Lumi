const apiUrl = import.meta.env.VITE_API_BASE_URL;

const handleUploadMusic = async ({
  title,
  album,
  genre,
  audioFile,
  coverImageUrl,
}) => {
  const token = localStorage.getItem("token");
  const formData = new FormData();
  formData.append("title", title);
  formData.append("album", album);
  formData.append("genre", genre);
  formData.append("coverImageUrl", coverImageUrl || "");
  formData.append("audioFile", audioFile);

  const res = await fetch(`${apiUrl}/media/upload-audio`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      // Content-Type ayarlama! fetch FormData ile otomatik ayarlıyor.
    },
    body: formData,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(res);
  }

  // if (!res.ok) {
  //   throw new Error(data.message || "Yükleme sırasında hata oluştu.");
  // }

  // Başarıyla biterse veriyi dönebilir veya sadece return yapabilirsin
  return data;
};

export default handleUploadMusic;
