# Fullstack Template: Next.js + Node.js

Starter fullstack template with:

- `client/`: Next.js + TypeScript frontend (port `3000`)
- `server/`: Express + TypeScript backend (port `8000`)
- The server uses a Postgres (SQL) database
- Docker support for local containerized development

## 1. Setup

### Environment configuration

Example server env file: (`server/.env.example`):

Example client env file: (`client/.env.example`):

## 2. Run

### Option A: Run locally with npm

Set up your own Postgres database and update the relevant database `.env` variable.

Terminal 1 (server):

```bash
cd server
npm install
npm run dev
```

Terminal 2 (client):

```bash
cd client
npm install
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

## 4. Deployment

1. You can deploy with Docker.
2. You can set up your own Postgres database and build and run the client and server.
