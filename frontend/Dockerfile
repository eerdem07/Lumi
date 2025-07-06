FROM node:20 AS builder

WORKDIR /app

COPY package*.json ./
COPY .env.production ./

COPY . .

RUN npm install
RUN npm run build

FROM node:20 AS runner

WORKDIR /app
RUN npm install -g serve
COPY --from=builder /app/dist ./dist

ENV PORT 8080
EXPOSE 8080

CMD ["serve", "-s", "dist", "-l", "8080"]
