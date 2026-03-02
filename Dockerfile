# Stage 1: Build the frontend and backend
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files first for better caching
COPY package.json ./
COPY backend/package.json ./backend/
COPY frontend/package.json ./frontend/

# Install dependencies
# Using npm ci for cleaner and faster installs in CI/Docker
RUN npm install --prefix backend
RUN npm install --prefix frontend

# Copy the rest of the application
COPY . .

# Build the frontend
RUN npm run build --prefix frontend

# Stage 2: Run the application
FROM node:20-alpine

WORKDIR /app

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Copy root package.json for start script
COPY --from=builder /app/package.json ./package.json

# Copy backend source and dependencies
COPY --from=builder /app/backend/package.json ./backend/package.json
COPY --from=builder /app/backend/node_modules ./backend/node_modules
COPY --from=builder /app/backend/src ./backend/src

# Copy built frontend assets
COPY --from=builder /app/frontend/dist ./frontend/dist

# Expose the port
EXPOSE 3000

# Start the server
CMD ["npm", "start"]
