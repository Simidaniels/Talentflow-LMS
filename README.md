# TalentFlow LMS

TalentFlow LMS is a modern learning management system prototype built with Next.js, TypeScript, and CSS Modules. It is designed as a polished internship and cohort-based learning platform with learner dashboards, course tracking, assignments, discussion threads, profile management, and responsive layouts across desktop and mobile.

This project currently focuses on the learner experience and front-end product flow, with reusable navigation, lightweight local session handling, interactive page states, and presentation-first UI.

## Overview

TalentFlow includes:

- authentication entry screens for sign in and sign up
- a responsive learner dashboard
- a course experience under My Learning
- an interactive assignments workspace with slide-in detail panels
- a progress analytics page
- a discussion board with thread and reply layouts
- profile, settings, announcements, and resources pages

The app uses the Next.js App Router and plain CSS Modules instead of a UI component library, so the product styling stays fully custom and easy to control.

## Tech Stack

- Next.js
- React
- TypeScript
- CSS Modules
- AOS for lightweight scroll animations

## Key Features

- Responsive learner dashboard with sidebar navigation
- Mobile hamburger navigation for smaller screens
- Sign-up and login flow backed by browser local storage
- Session-aware profile name and initials across the app
- Course overview, curriculum, and review tabs
- Assignment cards with custom detail drawers
- Progress tracking with stat cards, heatmaps, streaks, and skill visuals
- Discussion board with channels, thread list, detail view, and reply composer
- Editable profile about section
- Working toggle controls in profile settings
- Real sign-out flow in profile and settings
- Shared app shell with breadcrumb navigation and adaptive search UI

## Current Routes

The app currently includes these routes:

- `/login`
- `/sign-up`
- `/dashboard`
- `/my-learning`
- `/assignments`
- `/progress`
- `/discussion-board`
- `/announcements`
- `/resources`
- `/profile`
- `/settings`

The root route `/` currently redirects into the authentication flow before dashboard access.

## Project Structure

```text
app/
  announcements/
    page.tsx
  assignments/
    page.tsx
  components/
    AosProvider.tsx
    AppShell.tsx
    DashboardContent.tsx
    SimplePage.tsx
  dashboard/
    page.tsx
  discussion-board/
    page.tsx
  login/
    page.tsx
  my-learning/
    page.tsx
  profile/
    page.tsx
  progress/
    page.tsx
  resources/
    page.tsx
  settings/
    page.tsx
  sign-up/
    page.tsx
  auth-storage.ts
  data.ts
  globals.css
  layout.tsx
  page.module.css
  page.tsx
```

## Important Files

- `app/layout.tsx`
  Root layout for the application.

- `app/page.tsx`
  Root route behavior.

- `app/page.module.css`
  Shared styling layer for the application pages and components.

- `app/components/AppShell.tsx`
  Shared shell used across authenticated pages, including sidebar, top navigation, breadcrumbs, avatar, and responsive mobile menu.

- `app/components/DashboardContent.tsx`
  Main learner dashboard content.

- `app/auth-storage.ts`
  Local storage helpers for session and profile data.

- `app/data.ts`
  Shared app seed data such as sidebar items and learner metadata.

## Authentication Behavior

This project currently uses a front-end prototype auth flow rather than a real backend.

Current behavior:

- sign-up stores user details in browser local storage
- login checks local stored account data
- successful login routes the user to `/dashboard`
- the signed-in user name and initials are reflected in the dashboard, navbar, and profile page
- sign-out clears the active session and returns the user to `/login`

Because this is a prototype flow:

- there is no real API authentication yet
- there is no database persistence
- data is tied to the current browser storage

## Running the Project

Install dependencies:

```bash
pnpm install
```

Start the development server:

```bash
pnpm dev
```

Open:

```text
http://localhost:3000
```

Build for production:

```bash
pnpm build
```

Start production server:

```bash
pnpm start
```

## Available Scripts

- `pnpm dev`
  Runs the app in development mode.

- `pnpm build`
  Creates the production build.

- `pnpm start`
  Starts the production server.

- `pnpm lint`
  Runs the configured lint script if available in the current setup.

## Styling Approach

The project uses a shared CSS Modules file for most product styling:

- page-level layout
- navigation
- dashboard cards
- course experience
- assignment drawers
- progress analytics
- discussion board
- profile and settings
- responsive breakpoints

This keeps visual consistency high across the app while still allowing full control over each screen.

## Responsive Design

Responsive behavior already implemented includes:

- sidebar collapsing into a hamburger menu on smaller screens
- dashboard stat blocks adapting into mobile grids
- My Learning mobile stacking for hero, tabs, and curriculum
- Assignments mobile drawer and card layout
- Progress mobile single-column layout
- Discussion Board mobile stacked layout
- Profile mobile tab and card layout
- Login and sign-up mobile responsiveness

## Animations

The project includes AOS-based entrance animation support for selected screens and sections, especially around auth pages and presentation blocks.

## Current Limitations

This is still a prototype-oriented front-end project. Current limitations include:

- no real backend or API integration
- no server-side authentication
- no database
- no file upload backend
- no real notification delivery system
- some pages are still presentation-focused rather than data-driven

## Recommended Next Steps

Suggested next improvements:

1. Add real authentication and route protection
2. Connect profile, course, assignment, and discussion data to an API
3. Build reusable screen-state components for loading, empty, error, and success states
4. Expand into admin and system screens
5. Add form validation and server-side persistence
6. Add testing for route flows and shared components

## Notes

- This repository is currently optimized for UI implementation and product prototyping.
- The app is built to be easy to extend into a full LMS product.
- Most UI is already structured in a way that can be connected to real services later without redesigning the core experience.
