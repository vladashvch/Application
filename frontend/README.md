# Frontend

## Description

React 19 SPA for the Event Management System. Built with **Vite**, **Tailwind CSS v4**, **Zustand**, and **Axios**.

## Tech stack

| Tool                  | Purpose                          |
| --------------------- | -------------------------------- |
| React 19 + TypeScript | UI                               |
| Vite                  | Dev server & bundler             |
| Tailwind CSS v4       | Styling                          |
| Zustand               | Auth & navigation state          |
| Axios                 | HTTP client with JWT interceptor |
| Lucide React          | Icons                            |

## Project structure

```
src/
├── api/           # Axios instance, API route functions, types
├── components/    # Reusable UI components (Card, Input, …)
├── pages/         # Route-level page components
├── store/         # Zustand stores (auth, navigation)
└── utils/         # Date/time formatters, helpers
```

## Environment variables

Create a `.env` file based on `.env.example`:

```dotenv
cp .env.example .env
```

File .env includes:

```dotenv
VITE_API_URL=http://localhost:3000   # backend base URL (used by Vite dev proxy)
```

In production the variable is injected by Docker Compose via `nginx.conf`.

## Run locally

```bash
npm install
npm run dev          # starts at http://localhost:5173
```

> The Vite dev server proxies all `/api` requests to `VITE_API_URL`.

## Run via Docker

Frontend is served by Nginx on port `$FRONTEND_PORT` (default `80`).

## Available scripts

```bash
npm run dev       # development server with HMR
npm run build     # TypeScript check + Vite production build  → dist/
npm run preview   # preview the production build locally
npm run lint      # ESLint
```
