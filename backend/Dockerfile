ARG NODE_VERSION=25.8-alpine3.22
FROM node:${NODE_VERSION} AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:${NODE_VERSION} AS production
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.ts ./ 
RUN npx prisma generate
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/src/main"]
