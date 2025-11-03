# Use lightweight Node LTS
FROM node:18-slim

# Create app dir
WORKDIR /usr/src/app

# Copy package files first (cache layer)
COPY package*.json ./

# Install only production dependencies
RUN npm ci --omit=dev && npm cache clean --force

# Copy app source code
COPY . .

# Expose app port
EXPOSE 3000

# Start the app
CMD ["node", "server.js"]




