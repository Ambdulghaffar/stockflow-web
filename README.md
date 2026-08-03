# StockFlow — Web

[![CI Frontend](https://github.com/Ambdulghaffar/stockflow-web/actions/workflows/ci.yml/badge.svg)](https://github.com/Ambdulghaffar/stockflow-web/actions/workflows/ci.yml)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-15-000000?logo=next.js&logoColor=white)

StockFlow is an inventory and sales management platform. This repository holds the frontend: a Next.js (App Router) application that serves both a **public storefront** (product catalog, cart, checkout) and a **role-based admin dashboard** (products, stock, suppliers, orders, users, reports) for `ADMIN`, `MANAGER`, and `CLIENT` roles. It talks to a separate Spring Boot backend ([stockflow-api](https://github.com/Ambdulghaffar/stockflow-api)) over REST.

## Key Features

- **Authentication** via NextAuth — email/password (`Credentials` provider against the backend's `/auth/login`) and Google OAuth, JWT session strategy with automatic access-token refresh.
- **Role-based dashboard** — navigation and route access driven by role (`ADMIN`, `MANAGER`, `CLIENT`), enforced by an edge `middleware.ts` on `/dashboard/*` as a UX guard; real authorization is enforced by the backend.
- **Public catalog** — product listing and detail pages with search, category, price-range, and sort filters, server-rendered with pagination.
- **Cart** — persisted with Redux Toolkit (`store/cart.slice.ts`) and a custom `localStorage` middleware, so it survives page reloads and navigation.
- **Recently viewed products** — implemented with React Context (`features/products/context/recently-viewed-context.tsx`) instead of Redux: this is local, ephemeral, single-purpose UI state, deliberately kept out of the global store where cart state (shared, mutated from multiple entry points) belongs.
- **Orders** — checkout flow, order history, and order detail views for both customers (account orders) and staff (sales orders).
- **Stock management** — stock levels and stock movement tracking for managers/admins.
- **Suppliers** — supplier directory and supplier order management.
- **Reports** — sales and stock reports with Recharts-based charts (`components/dashboard/sales-chart.tsx`) and date-range filtering.
- **Profile management** — account profile page with avatar upload to Cloudinary via a signed, server-issued upload (`lib/uploads/use-cloudinary-upload.ts`).

## Tech Stack

| Category | Library | Version |
|---|---|---|
| Framework | Next.js | ^15.5.12 |
| UI | React | 19.1.0 |
| Auth | NextAuth | ^4.24.13 |
| State | Redux Toolkit / React Redux | ^2.12.0 / ^9.3.0 |
| Forms | React Hook Form + `@hookform/resolvers` | ^7.63.0 / ^5.2.2 |
| Validation | Zod | ^4.1.11 |
| Charts | Recharts | ^3.8.1 |
| Styling | Tailwind CSS | ^4 |
| Components | Radix UI primitives / shadcn-style `components/ui` | ^1.x–2.x |
| HTTP | Axios | ^1.12.2 |
| Media Upload | Cloudinary — direct signed upload via native `fetch` (no SDK) | — |
| Testing | Jest, React Testing Library | ^30.4.2, ^16.3.2 |
| Language | TypeScript | ^5 |

## Architecture

- **Server Components for data fetching** — pages under `app/` (e.g. the product catalog, dashboard list pages) are `async` server components that call feature-level `services/*.ts` directly.
- **Server Actions for mutations** — creates/updates/deletes go through `"use server"` action modules (`features/*/actions/*.ts`), which call the corresponding service and `revalidatePath` the affected route.
- **State separation by scope** — Redux Toolkit is used only where state is shared and mutated across the app (`store/cart.slice.ts`); React Context is used for localized, single-consumer state (recently viewed products). This is a deliberate split, not a default.
- **Middleware as a UX guard, not a security boundary** — `src/middleware.ts` reads the NextAuth JWT and redirects unauthenticated or under-privileged users on `/dashboard/*`, per the role map in `constants/route-permissions.ts`. Real authorization is enforced server-side by the Spring Boot backend.
- **Feature-based structure** — each domain (`auth`, `cart`, `categories`, `orders`, `products`, `reports`, `stock`, `suppliers`, `users`) owns its own `actions/`, `services/`, `schemas/` (Zod), `types/`, and `components/`.
- **Reusable hooks** — `usePaginatedList` (URL-driven search/pagination with debounce), `useCloudinaryUpload` (signed client-side upload flow), `useDebounce`.

## Getting Started

### Prerequisites

- Node.js 20+
- A running instance of [stockflow-api](https://github.com/Ambdulghaffar/stockflow-api) (or a compatible backend URL)

### Environment variables

Create a `.env` file at the project root:

```bash
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=

NEXT_PUBLIC_INV_MGT_BASEURL=http://localhost:8080/api
NEXT_PUBLIC_HTTP_TIMEOUT=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
```

### Install & run

```bash
npm ci
npm run dev
```

The app runs at [http://localhost:3000](http://localhost:3000).

## Testing

```bash
npm run test
```

The suite currently covers 5 test files: a custom hook (`useDebounce`), utility functions (`formatDate`, `truncateText`), Zod schema validation (`categorySchema`), and a component test with simulated user interaction (`ConfirmationDialog`), using Jest with `jest-environment-jsdom` and React Testing Library.

## Docker

```bash
docker build \
  --build-arg NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=<cloud_name> \
  --build-arg NEXT_PUBLIC_HTTP_TIMEOUT=<timeout_ms> \
  --build-arg NEXT_PUBLIC_INV_MGT_BASEURL=<backend_base_url> \
  -t stockflow-web .
```

The image is a multi-stage build producing a Next.js `standalone` output, running as a non-root user on port `3000`.

## Project Structure

```
src/
├── app/            # App Router routes: (public) storefront + dashboard, grouped by role/feature
├── components/     # Shared UI components (shadcn-style primitives, dashboard/shop widgets)
├── config/         # Runtime environment/config resolution
├── constants/      # Routes, nav items, role-route permission map, breadcrumbs
├── custom.d.ts     # Ambient type declarations
├── data/           # Static/reference data
├── features/       # Domain modules: auth, cart, categories, orders, products, reports, stock, suppliers, users
│   └── <feature>/  #   actions/ (Server Actions), services/, schemas/ (Zod), types/, components/
├── hooks/          # Reusable hooks (usePaginatedList, useCloudinaryUpload, useDebounce, ...)
├── lib/            # Auth (NextAuth options), uploads, other cross-cutting logic
├── middleware.ts   # Route-level auth/role UX guard for /dashboard/*
├── providers/      # Client-side providers (Redux, NextAuth session)
└── store/          # Redux Toolkit store, cart slice, localStorage persistence middleware
```

## Related Repositories

- [stockflow-api](https://github.com/Ambdulghaffar/stockflow-api) — Spring Boot backend
- [stockflow-infra](https://github.com/Ambdulghaffar/stockflow-infra) — infrastructure / deployment configuration
