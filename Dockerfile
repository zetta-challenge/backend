# * Image vulnerability checked: 6th/Jun/2025 - 0 vulnerabilities
# https://hub.docker.com/layers/library/node/22-alpine/images/sha256-11d923cca2138d844282dc0c333132bba72deb913d635c3c33e54523b455a4da
# TODO: Convert to pnpm
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nestjs -u 1001
COPY --from=builder --chown=nestjs:nodejs /app/dist ./dist
COPY --from=builder --chown=nestjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nestjs:nodejs /app/package.json ./package.json

USER nestjs
ENV PORT=8080
EXPOSE 8080
CMD ["node", "dist/main.js"]
# TODO: Add a docker compose using a prebuilt FE image (corresponding env) to run a local dev environment