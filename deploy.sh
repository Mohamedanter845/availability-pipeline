#!/bin/bash
echo "🚀 Starting deployment..."


cd /home/mohamedanter/TeamavailTest


echo "⬇️ Pulling latest image from Docker Hub..."
docker pull mohamedanter845/availability-app:latest
echo "🛑 Stopping old container..."
docker stop availability-app || true
docker rm availability-app || true


echo "🚢 Starting new container..."
docker run -d -p 3000:3000 --name availability-app mohamedanter845/availability-app:latest

echo "✅ Deployment complete!"

