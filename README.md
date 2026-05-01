# Rocky Campus App

Netlify: https://rocky-campus-app.netlify.app/

A Next.js web application built for the Nature of Enterprise Computing CA3 assignment. This is a fictional campus companion portal for Rocky College students.

## Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Global CSS (globals.css)
- **Data:** Local JSON seed files in `/data` (no real student data used)
- **Deployment:** Netlify (free tier, Git-connected)

## Features

- **Home** — Dashboard with announcements and links to all sections
- **Events** — Browse upcoming campus events with tags and capacity info
- **Canteen** — Today's menu and opening hours
- **Helpdesk** — Submit support tickets and view existing ones
- **Lost & Found** — Browse items handed in to campus security
- **Event Recommender** — ML-powered event recommendations using KNN cosine similarity
- **Settings** — Accessibility options: text size, high contrast, reduced motion

## How to run locally

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

No environment variables are required — all data is loaded from local JSON files in the `/data` folder.

## Fictional seed data

All data is entirely fictional and does not represent any real person, place, or institution. Seed files are located in `/data/`:

- `events.json` — 10 fictional campus events
- `helpdesk.json` — 5 fictional helpdesk tickets
- `lostandfound.json` — 6 fictional lost and found items
- `users.json` — 7 fictional student profiles used for the ML recommender

## ML feature

The Event Recommender (`/recommend`) uses a **K-Nearest Neighbours approach with cosine similarity** on binary tag vectors. Each event and each user's interests are represented as vectors over a shared tag vocabulary. The top 3 most similar unattended events are recommended per user.

See `app/recommend/page.tsx` for the full implementation and inline explanation.

## Deployment

This app is deployed on Netlify via Git push-to-deploy.

- **Build command:** `npm run build`
- **Publish directory:** `.next`
- **Environment variables:** None required

## Accessibility

- `lang="en"` set on `<html>` element
- All form inputs have associated `<label>` elements
- Tables include `<caption>` elements
- Navigation uses `<nav>` with `aria-label`
- Buttons use `aria-pressed` for toggle states
- `role="alert"` used for dynamic status messages
- Keyboard navigation supported throughout
- Accessibility settings page allows font size, high contrast, and reduced motion adjustments
