# Use lightweight Node LTS
FROM node:18-slim

# Create app dir
WORKDIR /usr/src/app

# Copy package files first (cache)
COPY package*.json ./

# Install dependencies (production only)
RUN npm ci --omit=dev

# Copy source
COPY . .

# Expose port
EXPOSE 3000

# Start
CMD ["node", "server.js"]

