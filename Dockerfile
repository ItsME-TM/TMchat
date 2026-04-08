# Stage 1: Build dependencies and frontend assets
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies first for better layer caching
COPY backend/package.json backend/package-lock.json ./backend/
COPY frontend/package.json frontend/package-lock.json ./frontend/
RUN npm ci --omit=dev --prefix backend
RUN npm ci --prefix frontend

# Copy only the source needed for build/runtime (no full-context COPY)
COPY backend/src ./backend/src
COPY frontend ./frontend

# Build frontend static assets
RUN npm run build --prefix frontend

# Stage 2: Runtime image
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Backend runtime files
COPY --from=builder /app/backend/package.json ./backend/package.json
COPY --from=builder /app/backend/node_modules ./backend/node_modules
COPY --from=builder /app/backend/src ./backend/src

# Built frontend assets served by backend
COPY --from=builder /app/frontend/dist ./frontend/dist

EXPOSE 3000

# Secrets are injected at runtime (Render environment variables)
CMD ["node", "backend/src/server.js"]
