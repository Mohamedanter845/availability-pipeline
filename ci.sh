#!/bin/bash
set -e  
echo "🚀 Starting CI Pipeline..."

# 0. Cleanup
echo "🧹 Cleaning up old containers and images..."
docker-compose down || true
docker rm -f my-node-container 2>/dev/null || true
docker rmi -f my-node-app:latest 2>/dev/null || true
docker image prune -f || true

# 1. Linting
echo "🔍 Running ESLint..."
npx eslint . || { echo "❌ ESLint failed"; exit 1; }

# 2. Prettier check
echo "✨ Checking Prettier formatting..."
npx prettier --check . || { echo "❌ Prettier check failed"; exit 1; }

# 3. Run tests
echo "🧪 Running tests..."
npm test || { echo "❌ Tests failed"; exit 1; }

# 4. Build Docker image
echo "🐳 Building Docker image..."
docker build -t my-node-app:latest .

# 5. Run with Docker Compose
echo "📦 Starting services with Docker Compose..."
docker-compose up -d --build

echo "✅ CI Pipeline completed successfully!"
