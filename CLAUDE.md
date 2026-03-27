# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server on http://localhost:3000
npm run build    # Production build (also type-checks)
npm run start    # Serve production build
npm run lint     # ESLint
```

No test suite configured yet.

## Stack

- **Next.js 16** (App Router, TypeScript)
- **Tailwind CSS v4** — no `tailwind.config.ts`; all tokens live in `src/app/globals.css` under `@theme inline`
- **shadcn/ui** — components in `src/components/ui/`, config in `components.json`
- **Prisma 7** — schema at `prisma/schema.prisma`, client output to `src/generated/prisma`. `prisma.config.ts` is excluded from tsconfig to avoid build errors. No migrations run yet; DB not connected.

## Route Architecture

Two independent layout trees via route groups:

```
src/app/
├── layout.tsx              # Root: fonts (Playfair Display + Inter) + globals.css only. No Navbar/Footer.
├── (main)/                 # Public site — adds Navbar + Footer via (main)/layout.tsx
│   ├── page.tsx            # Home
│   ├── about/
│   ├── services/
│   │   └── [slug]/         # SSG via generateStaticParams over services array
│   ├── booking/            # booking-page-client.tsx wraps BookingStepper in <Suspense>
│   ├── contact/            # contact-form.tsx is "use client"
│   └── news/
└── admin/                  # Admin panel — own layout with fixed sidebar, no public Navbar/Footer
    ├── page.tsx            # Dashboard
    ├── services/
    ├── payments/
    └── users/
```

The split into `(main)` and `admin` is intentional: route groups don't affect URLs but allow different layouts.

## Styling Conventions

Tailwind v4 uses `@theme inline` in `globals.css` instead of a config file. Custom tokens:

- Colors: `--color-cream`, `--color-gold` (`#C4956A`), `--color-gold-dark`, `--color-gold-fill` (`#D4AF37`), `--color-text-dark`, `--color-text-muted`
- Utility classes: `.section-padding` (`py-10 md:py-16`), `.container-spa` (`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`), `.font-playfair`
- Hardcoded hex values (`#C4956A`, `#E2D9CF`, `#1A1A1A`, etc.) are used directly in JSX when Tailwind utility classes aren't available for a given token — this is intentional and consistent throughout.
- Buttons and form inputs use `rounded-none` (square corners) to match the luxury brand aesthetic.
- No dark mode implemented.

## Data Layer

All data is static mock data in `src/lib/data/`:
- `services.ts` — 8 services with `slug`, `category`, `price`, `duration`, `benefits[]`, `image`
- `team.ts` — 4 therapists (used in booking step 3 and about page)
- `testimonials.ts` — 6 reviews
- `news.ts` — 3 articles

`getServiceBySlug()` and `generateStaticParams()` consume `services` directly from this file.

## Booking Flow

`BookingStepper` in `src/components/booking/` manages a single `BookingData` state object passed down to 5 step components:
1. `step-service.tsx` — card grid selection
2. `step-datetime.tsx` — shadcn `Calendar` + time slot buttons
3. `step-therapist.tsx` — team cards + "sin preferencia" option
4. `step-personal.tsx` — contact form inputs
5. `step-confirmation.tsx` — summary + fake submit (sets local `submitted` state)

`useSearchParams` pre-selects a service when navigating from `/services/[slug]` with `?service=slug`. The stepper is wrapped in `<Suspense>` in `booking-page-client.tsx` because of this hook.

## Admin Panel

All admin pages (`/admin/*`) are UI-only with hardcoded mock data arrays at the top of each file. No API calls. Interactive elements (search filters, dialogs for add/edit) use local `useState`. The sidebar uses `usePathname` to highlight the active route.

## Server/Client Boundary Rules

- Pages default to Server Components
- Add `"use client"` only when using hooks or browser events
- Forms and interactive components are split into separate `*-client.tsx` or `*-form.tsx` files imported by the server page

## Convenciones del proyecto

- Para crear/editar datos usa **páginas dedicadas**, no modales
- Usa **Route Handlers** (`app/api/*/route.ts`), no Server Actions
- Estado global → **Zustand**
- Formularios → **react-hook-form** + **zod**