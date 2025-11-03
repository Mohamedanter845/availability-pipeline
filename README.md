# 🧩 Teamavail Platform – Fullstack DevOps Project

A complete **Fullstack + DevOps** demonstration project built from scratch — featuring a modern **React frontend**, a **Node.js backend**, and a fully containerized environment managed through **Docker & GitHub Actions CI/CD**, integrated with **Prometheus + Grafana monitoring**.

---

## 🚀 Project Overview

This project showcases a full development and deployment pipeline:

- **Frontend:** React + Vite + TailwindCSS
- **Backend:** Node.js + Express
- **Containerization:** Docker & Docker Compose
- **CI/CD:** GitHub Actions (build, lint, test, push Docker images)
- **Monitoring:** Prometheus + Grafana
- **Future-ready for Cloud Deployment:** AWS / Azure / GCP

---

## ⚙️ Architecture

+-------------------+           +--------------------+
|   Frontend (React)|  --->     | Backend (Express)  |
|   http://localhost:80         | http://backend:4000 |
+-------------------+           +--------------------+
|
v
Docker Compose Network

**Services:**
- `frontend`: React app served via Nginx
- `backend`: Node.js API server with REST endpoints
- `ci.sh`: local CI pipeline script
- `deploy.sh`: deployment automation script

---

## 🐳 Docker Setup

Build and start everything:

```bash
docker-compose up -d --build

----------------

Access the app:

Frontend → http://localhost:80

Backend → http://localhost:4000/api/status

```bash
docker-compose down

<div style="display: flex; gap: 10px; flex-wrap: wrap;"> <div style="flex: 1;"> <b>Frontend UI</b><br> <img src="./assets/api.PNG" width="300"/> </div> <div style="flex: 1;"> <b>Backend /metrics</b><br> <img src="./assets/promethus.PNG" width="300"/> </div> <div style="flex: 1;"> <b>Docker Compose running</b><br> <img src="./assets/dockerps.PNG" width="300"/> </div> </div>

-------------------
```bash
🔁 CI/CD with GitHub Actions
Pipeline includes:
✅ Checkout code
⚙️ Setup Node.js
🧹 Run ESLint + Prettier
🧪 Run tests
🐳 Build Docker images
☁️ Push image to Docker Hub

````
<div style="display: flex; gap: 10px;"> <div style="flex: 1;"> <b>GitHub Actions</b><br> <img src="./assets/githubaction.PNG" width="300"/> </div> </div>
`````````
```bash

📊 Monitoring (Prometheus + Grafana)

Prometheus scrapes backend metrics: http://backend:4000/metrics

Grafana visualizes metrics from Prometheus

Dashboards include: HTTP Requests, CPU, Memory, Event Loop Lag

<div style="display: flex; gap: 10px; flex-wrap: wrap;"> <div style="flex: 1;"> <b>Grafana Dashboard 1</b><br> <img src="./assets/dashboard1.PNG" width="300"/> </div> <div style="flex: 1;"> <b>Grafana Dashboard 2</b><br> <img src="./assets/dashboard2.PNG" width="300"/> </div> <div style="flex: 1;"> <b>Prometheus Metrics</b><br> <img src="./assets/promethus.PNG" width="300"/> </div> </div>
````
--------------------------------------
```bash
🧠 Key Learnings

Built a multi-service architecture with Docker Compose

Connected services through an internal Docker network

Automated build, lint, and test stages with GitHub Actions

Managed Docker image publishing via CI/CD

Integrated Prometheus + Grafana monitoring

Prepared setup for future AWS/GCP deployment
````````
----------------------------------------

