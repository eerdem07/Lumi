# 1. Build aşaması
FROM node:20 AS builder

WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm install
RUN npm run build

# 2. Serve aşaması
FROM node:20 AS runner

WORKDIR /app
RUN npm install -g serve
COPY --from=builder /app/dist ./dist

ENV PORT 8080
EXPOSE 8080

CMD ["serve", "-s", "dist", "-l", "8080"]
