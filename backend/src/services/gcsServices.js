const path = require("path");
const { Storage } = require("@google-cloud/storage");

const storage = new Storage({
  keyFilename: path.join(__dirname, "../../src/config/gcsKey.json"), // Yolunu dosya konumuna göre ayarla!
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
});
const bucketName = process.env.GOOGLE_CLOUD_STORAGE_BUCKET;

// Yükleme
async function uploadFile(destination, buffer, mimetype) {
  return new Promise((resolve, reject) => {
    const bucket = storage.bucket(bucketName);
    const file = bucket.file(destination);
    const stream = file.createWriteStream({
      metadata: { contentType: mimetype },
      resumable: false,
    });

    stream.on("error", (err) => reject(err));
    stream.on("finish", async () => {
      // await file.makePublic(); // BUNU SİL veya YORUM SATIRI YAP!
      const publicUrl = getPublicUrl(destination);
      resolve(publicUrl);
    });

    stream.end(buffer);
  });
}

// Silme
async function deleteFile(destination) {
  const bucket = storage.bucket(bucketName);
  await bucket.file(destination).delete();
}

// Dosya URL'si
function getPublicUrl(destination) {
  return `https://storage.googleapis.com/${bucketName}/${destination}`;
}

module.exports = {
  uploadFile,
  deleteFile,
  getPublicUrl,
};
