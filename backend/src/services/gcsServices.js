const { Storage } = require("@google-cloud/storage");

const credentials = JSON.parse(process.env.GCS_KEY_JSON);

const storage = new Storage({
  credentials,
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID, // .env'de olmalı
});

const bucketName = process.env.GOOGLE_CLOUD_STORAGE_BUCKET;

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
      // await file.makePublic(); // Açık bırakmak istemiyorsan YORUMDA KALSIN
      const publicUrl = getPublicUrl(destination);
      resolve(publicUrl);
    });

    stream.end(buffer);
  });
}

async function deleteFile(destination) {
  const bucket = storage.bucket(bucketName);
  await bucket.file(destination).delete();
}

function getPublicUrl(destination) {
  return `https://storage.googleapis.com/${bucketName}/${destination}`;
}

module.exports = {
  uploadFile,
  deleteFile,
  getPublicUrl,
};
