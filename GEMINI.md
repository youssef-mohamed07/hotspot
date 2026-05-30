# Project Overview: Hotspot

HotSpot is a modern web application built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS 4**. It serves as a high-impact marketing landing page, likely for a creative or logistics agency focusing on the Saudi Arabian (KSA) market, featuring interactive elements like a "Cybertruck scene" and a multi-step client brief wizard.

## Tech Stack
- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Library:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Icons:** Custom SVG icons in `src/components/icons.tsx`

## Architecture & Structure
The project follows a modular architecture typical of Next.js App Router applications:

- **`src/app/`**: Contains the main routing logic, layouts, and global styles (`globals.css`).
- **`src/components/`**:
  - **`sections/`**: Modular, high-level sections (e.g., `Hero`, `CaseStudiesSection`, `ProcessSection`) used to compose the main page.
  - **`brief-wizard/`**: A complex, multi-step form for capturing client requirements.
  - **`layout/`**: Shared layout components like `Header` and `Footer`.
  - **`ui/`**: Reserved for low-level, reusable UI primitives.
- **`src/data/`**: Centralized static data (JSON-like TypeScript files) for content management (e.g., `cities.ts`, `case-studies.ts`).
- **`src/types/`**: Shared TypeScript interfaces and types.
- **`src/lib/`**: Utility functions and logic (e.g., KSA map SVG path data).

## Getting Started

### Prerequisites
- Node.js (version supported by Next.js 16)
- npm, yarn, pnpm, or bun

### Commands
| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the development server at `http://localhost:3000`. |
| `npm run build` | Compiles the application for production. |
| `npm run start` | Starts the production server after a build. |
| `npm run lint` | Runs ESLint to check for code quality and style issues. |

## Development Conventions

- **Modular Sections:** When adding new content to the home page, create a new component in `src/components/sections/` and import it into `src/app/page.tsx`.
- **Data Separation:** Keep content (text, lists, configuration) in `src/data/` to keep components clean and maintainable.
- **Type Safety:** Always define types for new data structures in `src/types/`.
- **Client Components:** Use the `"use client"` directive only when necessary for interactivity or using React hooks.
- **Styling:** Use Tailwind CSS 4 utility classes. Prefer CSS variables for theme-specific colors if defined in `globals.css`.

## Key Files & Directories
- `src/app/page.tsx`: The main entry point for the landing page.
- `src/components/brief-wizard/`: Logic for the client inquiry flow.
- `src/data/cities.ts`: Contains geographic data for the KSA map.
- `src/lib/ksa-map.ts`: SVG path definitions for the interactive Saudi Arabia map.
