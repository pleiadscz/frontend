# Multi-stage build for Open WebUI frontend
# GHCR-compatible Dockerfile

# ---- Build Stage ----
FROM node:22-slim AS builder

WORKDIR /app

# Install git (needed for version fallback in svelte.config.js)
RUN apt-get update && apt-get install -y git --no-install-recommends && rm -rf /var/lib/apt/lists/*

# Copy package files first for better caching
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# ---- Runtime Stage ----
FROM nginx:alpine-slim

# Copy built static files
COPY --from=builder /app/build /usr/share/nginx/html

# Copy custom nginx config for SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD curl -fs http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
