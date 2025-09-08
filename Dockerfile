# syntax=docker/dockerfile:1.7

# Stage 1: Dependencies cache
FROM node:20-alpine AS deps
WORKDIR /app

# Salin file manifest untuk cache yang maksimal
COPY package.json package-lock.json* npm-shrinkwrap.json* ./
RUN npm ci --omit=dev=false

# Stage 2: Development (Vite dev server + HMR)
FROM node:20-alpine AS dev
WORKDIR /app

ENV NODE_ENV=development

# Salin node_modules dari stage deps
COPY --from=deps /app/node_modules ./node_modules
# Salin sumber kode
COPY src/pages .

# Expose port Vite
EXPOSE 5173
# Jalankan Vite dev server dengan host 0.0.0.0 agar bisa diakses dari container
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173", "--strictPort"]

# Stage 3: Build untuk production
FROM node:20-alpine AS build
WORKDIR /app

ENV NODE_ENV=production

COPY package.json package-lock.json* npm-shrinkwrap.json* ./
RUN npm ci --omit=dev
COPY src/pages .
# Build Vite
RUN npm run build

# Stage 4: Serve static via Nginx
FROM nginx:1.27-alpine AS prod
WORKDIR /usr/share/nginx/html

# Salin hasil build
COPY --from=build /app/dist ./

# Konfigurasi Nginx (SPA + proxy /api)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose HTTP
EXPOSE 80

# Perintah default Nginx
CMD ["nginx", "-g", "daemon off;"]
