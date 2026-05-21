# MEDXPRESS — Web Frontend

A telemedicine marketplace web app: patients find doctors, book consultations,
and meet by video or chat. Built with **Next.js 16 (App Router)**, **Tailwind
CSS v4**, **Redux Toolkit**, and **next-themes**.

This is the **frontend only** — it runs on mock data (`src/lib/data.ts`) with no
backend yet. A Node/Express + PostgreSQL API and the React Native mobile app are
planned next.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Demo accounts

The login screen has one-tap demo buttons, or sign in with any valid email and a
6+ character password after picking a role:

| Role    | Lands on  |
| ------- | --------- |
| Patient | `/home`   |
| Doctor  | `/doctor` |
| Admin   | `/admin`  |

## Key features

- **Splash / Onboarding** — animated intro, 3-slide walkthrough.
- **Auth** — login & register with inline validation, role selector.
- **Home / Discovery** — search bar, specialty grid, doctor listing cards with
  price and availability visible up front, sky-blue skeleton loaders.
- **Doctor profile** — credentials, reviews, real-time availability calendar.
- **Booking & payments** — slot picker, Paystack / Stripe, animated red
  confirmation checkmark.
- **Video / chat consultation** — full-screen call UI, patient overlay, chat
  sidebar, prescription notepad.
- **Patient dashboard** — health metrics, appointments, prescriptions, results.
- **Doctor dashboard** — queue, schedule manager, patients, earnings, profile.
- **Admin panel** — doctor verification, user management, analytics charts.
- **Light & dark mode**, fully responsive — the mobile view uses a bottom tab
  bar and a persistent red emergency button for an app-like feel.

## Design tokens

Brand colours live in `src/app/globals.css`: Sky Blue `#38B6FF`, Medical Red
`#E84040`, Navy `#0D1B2A`, off-white background `#F7F9FC`.
