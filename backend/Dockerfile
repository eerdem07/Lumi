# 1. Node'un resmi imajı
FROM node:20

# 2. Çalışma dizini oluştur
WORKDIR /usr/src/app

# 3. package.json ve package-lock.json'u kopyala
COPY package*.json ./

# 4. Bağımlılıkları yükle
RUN npm install --omit=dev

# 5. Projedeki tüm dosyaları kopyala
COPY . .

# 6. Ortam değişkeni olarak prod PORT'u ayarla (isteğe bağlı, Cloud Run için genellikle 8080'dir)
ENV PORT=8080

# 7. Uygulamayı başlat
CMD ["npm", "start"]

# 8. Portu expose et
EXPOSE 8080
