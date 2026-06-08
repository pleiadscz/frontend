# Multi-stage build for Open WebUI frontend

# ---- Build Stage ----
FROM node:22-slim AS builder

WORKDIR /app

# Install git (needed by svelte.config.js version detection)
RUN apt-get update && apt-get install -y git --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# Install pnpm v9 (matches pnpm-lock.yaml lockfileVersion 9.0)
RUN npm install -g pnpm@9

# Copy lockfile + manifest first for layer caching
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source and build
COPY . .
RUN pnpm run build

# ---- Runtime Stage ----
FROM nginx:alpine

# Copy built static files
COPY --from=builder /app/build /usr/share/nginx/html

# Copy nginx config for SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
