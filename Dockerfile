# ---- Build ----
FROM node:22 AS builder
WORKDIR /app

# pnpm@9 matches pnpm-lock.yaml lockfileVersion 9.0
RUN npm install -g pnpm@9

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# pnpm-workspace.yaml has no packages: field which breaks pnpm run
# remove it so pnpm treats this as a single-package project
RUN rm pnpm-workspace.yaml && pnpm install

COPY . .

# npm run build — does not go through pnpm workspace machinery
RUN npm run build

# ---- Serve ----
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
