# Fullstack Template: Next.js + Node.js

Starter fullstack template with:

- `client/`: Next.js frontend (port `3000`)
- `server/`: Express + TypeScript backend (port `8000`)
- Docker support for local containerized development

## 1. Setup

### Prerequisites

- Node.js `18+` (Node `20` recommended)
- npm `9+`
- Docker Desktop (optional, for Docker-based run/deploy)

### Install dependencies

From the repository root:

```bash
cd client
npm install

cd ../server
npm install
```

### Environment configuration

Example server env file: (`server/.env.example`):
Example client env file: (`client/.env.local`):

## 2. Run

### Option A: Run locally with npm

Use two terminals.

Terminal 1 (server):

```bash
cd server
npm run dev
```

Terminal 2 (client):

```bash
cd client
npm run dev
```

Open:

- Frontend: `http://localhost:3000`
- Backend healthcheck: `http://localhost:8000/healthcheck`
- Example API endpoint: `http://localhost:8000/api/items`

### Option B: Run with Docker Compose

From the repository root:

```bash
docker compose up --build
```

This starts both services:

- Client on `3000`
- Server on `8000`

Stop services:

```bash
docker compose down
```

## 3. Test

### Run all tests

Server:

```bash
cd server
npm test
```

Client:

```bash
cd client
npm test
```

### Watch mode

Server:

```bash
cd server
npm run test:watch
```

Client:

```bash
cd client
npm run test:watch
```

## 4. Deployment

You can deploy either with Docker or by building and running each app directly.

### A. Docker deployment (recommended)

1. Build images:

```bash
docker compose build
```

2. Run in detached mode:

```bash
docker compose up -d
```

3. Verify:

- `http://<your-host>:3000` (client)
- `http://<your-host>:8000/healthcheck` (server)

4. View logs:

```bash
docker compose logs -f
```

### B. Non-Docker deployment

#### Server (Express)

```bash
cd server
npm install
npm run build
npm start
```

#### Client (Next.js)

```bash
cd client
npm install
npm run build
npm start
```
