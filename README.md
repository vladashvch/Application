# Application

A full-stack event management system. Users can register, browse public events, create and manage their own events, and join or leave other events. The calendar view lets each user track their upcoming events by week or month.

## Architecture

```
├── backend/     # NestJS REST API + Prisma + PostgreSQL
├── frontend/    # React 19 SPA + Vite + Tailwind CSS
└── docker-compose.yml
```

All three services (database, backend, frontend) are orchestrated with Docker Compose and communicate on an internal `application-network`.

## Tech stack

| Layer          | Technology                                      |
| -------------- | ----------------------------------------------- |
| Frontend       | React 19, Vite, Tailwind CSS v4, Zustand, Axios |
| Backend        | NestJS 11, TypeScript, Yup, Swagger             |
| ORM            | Prisma 7 + `@prisma/adapter-pg`                 |
| Database       | PostgreSQL 16                                   |
| Auth           | JWT access + refresh tokens, bcrypt             |
| Infrastructure | Docker, Nginx (frontend reverse proxy)          |

## Pages

| Page            | Route key       | Description                                            |
| --------------- | --------------- | ------------------------------------------------------ |
| Login           | `login`         | Sign in with email + password                          |
| Register        | `register`      | Create a new account                                   |
| Discover Events | `events`        | Paginated, searchable list of public events            |
| My Events       | `my-events`     | Weekly / monthly calendar of organised & joined events |
| Event Details   | `event-details` | Full info, join / leave                                |
| Create Event    | `create-event`  | Form to create a new event                             |
| Edit Event      | `edit-event`    | Edit an existing event (organizer only)                |

## Quick start (Docker)

**1. Copy and configure the environment file `.env` base on `.env.example`:**

```bash
cp .env.example .env   # then edit values if needed
```

**2. Start all services:**

```bash
docker-compose up --build
```

| Service     | Default URL                |
| ----------- | -------------------------- |
| Frontend    | http://localhost:80        |
| Backend API | http://localhost:3000      |
| Swagger UI  | http://localhost:3000/docs |
| PostgreSQL  | localhost:5432             |

The backend container runs `prisma migrate deploy` automatically on startup.

**3. Seed demo data:**

```bash
docker exec backend_application node dist/prisma/seed.js
# creates 4 users (user1@example.com … user4@example.com, password: password123)
# + 4 events + 3 participants
```

## Environment variables

All variables live in a single `.env` at the project root and are consumed by Docker Compose:

```dotenv
# Database
POSTGRES_PORT=5432
POSTGRES_USER=user
POSTGRES_PASSWORD=password
POSTGRES_DB=application_db

# Frontend
FRONTEND_PORT=80

# Backend
BACKEND_PORT=3000
JWT_SECRET=access_secret
JWT_EXPIRES_IN=1h
JWT_REFRESH_SECRET=refresh_secret
JWT_REFRESH_EXPIRES_IN=30d
```

## Run services individually

```bash
# Terminal 1 — database
docker-compose up database

# Terminal 2 — backend
cd backend && npm install && npm run start:dev

# Terminal 3 — frontend
cd frontend && npm install && npm run dev
```

See [backend/README.md](backend/README.md) and [frontend/README.md](frontend/README.md) for detailed per-service docs.
