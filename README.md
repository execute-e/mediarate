<div align="center">

# 🎬 MediaRate

**A full-stack app for rating media (Movies, TV shows, books, comics)**

![Next.js](https://img.shields.io/badge/Next_js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![NestJS](https://img.shields.io/badge/Nest_JS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

![Status](https://img.shields.io/badge/status-in%20development-yellow?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)

</div>

---

## About

MediaRate lets users discover media (powered by the [TMDB API](https://developer.themoviedb.org/docs/getting-started)), and rate them.

## Features

- **Authentication** - JWT (access + refresh tokens in httpOnly cookies)
- **SSR-aware auth** - authenticated requests work both on the client and in the Next.js server components
- **User profiles** - avatar and banner uploads, profile editing

## Architecture

**Frontend** - Next.js (App router) with FSD architecture

**Backend** - Nest.js with layered architecture

## Getting started

### Prerequisites

- Node.js
- Docker (with docker-compose)
- A free TMDB api key

### 1. Clone the repository

```bash
git clone https://github.com/execute-e/mediarate.git
cd mediarate
```

### 2. Backend

```bash
cd mediarate-backend
pnpm install
pnpm prisma:generate
docker compose up -d
pnpm prisma:migrate:dev
docker compose stop
pnpm dev
```

### 3. Frontend

```bash
cd ../mediarate-frontend
pnpm install
cp .env.development.local.example .env.development.local # add your tmdb api key here
pnpm gen:api-types # with running backend
pnpm dev
```

Default development settings are already in `.env.development` — no extra setup needed.

## Roadmap

- [x] Project setup & architecture
- [x] Authentication (JWT + refresh tokens, SSR support)
- [x] User profiles
- [ ] Media
- [ ] Ratings & reviews
- [ ] Search & filters
- [ ] Other types of media support
- [ ] Deployment
- [ ] Tests

## License
 
MIT

