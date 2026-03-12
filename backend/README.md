# Backend

NestJS REST API for the Event Management System. Uses **Prisma** with PostgreSQL, **JWT** access/refresh auth, and **Swagger** for API docs.

## Tech stack

| Tool                            | Purpose                        |
| ------------------------------- | ------------------------------ |
| NestJS 11 + TypeScript          | Framework                      |
| Prisma 7 + `@prisma/adapter-pg` | ORM & migrations               |
| PostgreSQL 16                   | Database                       |
| `@nestjs/jwt` + bcrypt          | Auth (access + refresh tokens) |
| Yup                             | Request validation             |
| Swagger (`@nestjs/swagger`)     | API documentation              |

## Project structure

```
src/
├── common/            # Shared decorators, guards, pipes, DTOs, error messages
├── infrastructure/    # DB module (Prisma), config helpers, Swagger setup
└── modules/
    ├── auth/          # Register / login / refresh / logout
    ├── events/        # CRUD + join / leave
    └── users/         # My events (weekly / monthly calendar view)
prisma/
├── schema.prisma      # Data models: User, Event, Participant
├── migrations/        # SQL migration history
├── seed.ts            # Dev seed (4 users, 4 events, 3 participants)
└── data/              # Seed fixture data
```

## Data models

- **User** — `id`, `email` (unique), `password` (bcrypt), `name`, `refreshToken?`
- **Event** — `id`, `title`, `description`, `date`, `location`, `capacity?`, `isPublic`, `organizerId`
- **Participant** — `userId` + `eventId` (unique pair, cascade-deletes with event)

## Environment variables

Create a `.env` file based on `.env.example`:

```dotenv
cp .env.example .env
```

File .env includes:

```dotenv
DATABASE_URL=postgresql://user:password@localhost:5432/application_db
HTTP_PORT=3000
HTTP_HOST=http://localhost:3000  // as HTTP_PORT
HTTP_CORS=http://localhost:5173  // frontend port
JWT_SECRET=access_secret
JWT_EXPIRES_IN=1h
JWT_REFRESH_SECRET=refresh_secret
JWT_REFRESH_EXPIRES_IN=30d
```

## Run locally

```bash
npm install
npx prisma generate          # generate Prisma client
npx prisma migrate deploy    # apply migrations
npx prisma db seed           # optional: seed demo data
npm run start:dev            # starts at http://localhost:3000
```

> Swagger UI is available at `http://localhost:3000/docs`.

## Run via Docker

The container automatically runs `prisma migrate deploy` before starting the server.

## Available scripts

```bash
npm run start:dev    # watch mode
npm run start:debug  # watch + debugger on port 9229
npm run build        # compile to dist/
npm run start:prod   # run compiled dist/src/main
npm run lint         # ESLint + auto-fix
npm run format       # Prettier
```

## Run tests

```bash
# unit tests
$ npm run test

# watch mode
$ npm run test:watch

# e2e tests
$ npm run test:e2e

# coverage report
$ npm run test:cov
```

## API overview

| Method | Path                                          | Auth                   | Description                            |
| ------ | --------------------------------------------- | ---------------------- | -------------------------------------- |
| POST   | `/auth/register`                              | —                      | Register a new user                    |
| POST   | `/auth/login`                                 | —                      | Login, returns access + refresh tokens |
| POST   | `/auth/refresh`                               | refresh JWT            | Get a new access token                 |
| POST   | `/auth/logout`                                | access JWT             | Invalidate refresh token               |
| GET    | `/events?search=&page=&limit=`                | access JWT             | List public events (paginated)         |
| GET    | `/events/:id`                                 | access JWT             | Get single event                       |
| POST   | `/events`                                     | access JWT             | Create event                           |
| PATCH  | `/events/:id`                                 | access JWT (organizer) | Update event                           |
| DELETE | `/events/:id`                                 | access JWT (organizer) | Delete event                           |
| POST   | `/events/:id/join`                            | access JWT             | Join event                             |
| POST   | `/events/:id/leave`                           | access JWT             | Leave event                            |
| GET    | `/users/me/events?view=monthly\|weekly&date=` | access JWT             | My events calendar                     |
