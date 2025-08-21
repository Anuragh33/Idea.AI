# Idea.AI

Idea.AI is a lightweight Next.js starter focused on fast iteration for AI-powered product ideas. It’s bootstrapped with create-next-app, uses the App Router, and ships with TypeScript, next/font (Geist), and a clean structure so new features (APIs, auth, UI, AI providers) can be added without friction.

## What this project is

- A solid Next.js foundation to prototype AI product ideas quickly.
- Simple, typed, and ready for production hardening (linting, builds, deploys).
- Opinionated about basics (App Router, TypeScript, Geist), unopinionated about everything else.

What this really means is: start with a minimal, modern Next.js app and add integrations as the product takes shape.

## Features

- Next.js App Router (app directory)
- TypeScript-first
- next/font with Geist for fast, high-quality typography
- Hot reload and fast dev experience
- Clean file structure ready for API routes and UI components

## Getting started

Prerequisites:
- Node.js 18.17+ (or 20+)
- One package manager: pnpm, npm, yarn, or bun

Install dependencies:
```bash
pnpm install
# or
npm install
# or
yarn
# or
bun install
```

Run the dev server:
```bash
pnpm dev
# or
npm run dev
# or
yarn dev
# or
bun dev
```

Open http://localhost:3000

Start editing app/page.tsx — changes hot-reload instantly.

## Scripts

- dev: start local dev server
- build: create a production build
- start: run the production server
- lint: run ESLint

Example:
```bash
pnpm build && pnpm start
```

## Project structure

```
app/
  layout.tsx        # Root layout and metadata
  page.tsx          # Home page (edit here to start)
  globals.css       # Global styles
public/
  favicon.ico       # Static assets
next.config.js      # Next.js configuration
tsconfig.json       # TypeScript configuration
.eslintrc.*         # Linting rules
```

As features grow, consider:
```
app/api/            # Route handlers (server APIs)
components/         # Reusable UI components
lib/                # Utilities and server helpers
styles/             # Additional styles
```

## Configuration and environment

If you add APIs, auth, or external services, document the environment variables here. Example:

- NEXT_PUBLIC_API_BASE_URL
- AUTH_SECRET
- OPENAI_API_KEY

Create a .env.local file:
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
```

Never commit secrets.

## Deployment

Vercel (recommended):
1. Push to GitHub
2. Import the repo in Vercel
3. Configure environment variables (if any)
4. Deploy

Other platforms:
```bash
pnpm build
pnpm start
# Ensure PORT env var is respected by your host
```

## Code quality

- TypeScript strict mode is recommended
- Run lint before committing:
```bash
pnpm lint
```

Nice-to-add:
- Prettier for formatting
- Husky + lint-staged for pre-commit checks
- GitHub Actions for CI (build, lint, type-check)

## Roadmap (suggested)

- API routes under app/api/*
- Auth (NextAuth or custom)
- State management (Zustand or Redux Toolkit)
- UI kit and theming (e.g., Tailwind or CSS Modules + design tokens)
- Provider integrations (OpenAI, Anthropic, etc.)
- Testing (Vitest + React Testing Library)
- Analytics and logging

## Contributing

1. Fork and create a feature branch
2. Make focused commits with clear messages
3. Run dev, build, and lint locally
4. Open a PR describing the motivation and changes

## License

MIT — see LICENSE.

## Acknowledgements

- Next.js by Vercel
- Geist via next/font

If you want, I can tailor this further around any specific features you plan to add (APIs, model providers, UI framework, auth flows).

Sources
