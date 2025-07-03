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

# 6. (İsteğe bağlı) Default portu ayarla (ama Cloud Run yine kendi PORT'u override eder)
ENV PORT=8080

# 7. Portu dışa aç
EXPOSE 8080

# 8. Uygulamayı başlat
CMD ["npm", "start"]
