// const apiUrl = import.meta.env.VITE_API_BASE_URL;

const apiUrl = "https://lumi-287286640888.europe-west1.run.app/api";

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
  return data;
};

export default handleUploadMusic;
