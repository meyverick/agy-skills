---
name: fullstack-monorepo-initialization
description: Explicit command skill (/fullstack-monorepo-initialization) to bootstrap a SOTA decoupled full-stack monorepo utilizing the absolute latest versions of Encore.ts, Svelte, PixiJS, and Tauri.
---

# Full-Stack Monorepo Initialization Command

> [!IMPORTANT]
> **TRIGGER RULE:** ONLY execute this skill when the user explicitly issues the command: `/fullstack-monorepo-initialization`. Do not trigger this autonomously during standard conversational tasks.

**Future-Proofing Directive**: You must actively resolve and install the `@latest` stable versions of all frameworks, CLIs, and dependencies during execution. Do not rely on historical training data versions.

## Execution Protocol

**Step 0: Secure Version Control**: Before generating any framework code, initialize a local Git repository. Immediately create a `.gitignore` file using a highly secure default-deny pattern (explicitly blocking all files by default, then selectively allowlisting standard source code directories) to ensure no environment variables, keys, databases, or logs are ever tracked.

**Step 1: Workspace Initialization**: Initialize a high-performance full-stack monorepo using `pnpm` workspaces.

### 1. Backend (`/apps/backend`)

- **Stack**: Latest Encore.ts with the latest stable PostgreSQL container.
- **Requirements**: Initialize an Encore declarative `SQLDatabase` with a `/migrations` folder and a baseline `1_init.up.sql` file.

### 2. Frontend (`/apps/frontend`)

- **Stack**: Pure Svelte (latest version, enforcing modern paradigms) built with Vite, TanStack Query for caching, and PixiJS (latest version, targeting WebGPU).
- **Requirements**: Consume Encore's native type-safe TypeScript client SDK. Manage the PixiJS initialization and cleanup safely inside Svelte's modern effect lifecycle.

### 3. Client Shell (`/apps/tauri`)

- **Stack**: Latest Tauri (must support modern multi-platform desktop and mobile builds).
- **Requirements**: Package the frontend as a pure client shell for desktop (macOS/Windows/Linux) and mobile (iOS/Android). Configure Vite to dynamically load API base URLs via environment variables.

## Integration & Deployment

- **Unified Application Container**: Configure Vite to output Svelte production assets directly into the backend directory. Use Encore's native `api.static` route to serve the Svelte SPA alongside the API (ensuring `notFound` falls back to `index.html` with a `200` status).
- **Local Parity & Docker**: Generate a root `docker-compose.yml` and `infra.config.json`. These must spin up two containers: a local PostgreSQL database and the unified Encore+Svelte application image.
- **CapRover Deployment**: Generate a `captain-definition` file structured for an image-based deployment. The documented workflow must be: build image locally -> verify in local Docker Compose -> push to registry -> deploy prebuilt image to CapRover.
- **Instructional Context**: Generate a `GEMINI.md` file at the root of the project. The content of this file must be exactly:

  ```markdown
  # Full-Stack Monorepo Architecture Context

  ## Architecture

  This project is a high-performance, decoupled full-stack monorepo:

  - **Workspace**: Managed exclusively via `pnpm` workspaces.
  - **Backend (`/apps/backend`)**: Encore.ts with PostgreSQL.
  - **Frontend (`/apps/frontend`)**: Latest Svelte SPA built with Vite, TanStack Query for caching, and latest PixiJS for native WebGPU rendering.
  - **Client Shell (`/apps/tauri`)**: Latest Tauri, providing a secure pure client shell for desktop and mobile.

  ## Future-Proofing Directive

  - AI agents and developers must actively resolve and utilize the `@latest` stable versions of all frameworks, CLIs, and dependencies.
  - Legacy code patterns must be explicitly rejected in favor of modern paradigms.

  ## Unified Application Container

  - The Svelte frontend production assets are output directly into the backend directory.
  - Encore natively serves the Svelte SPA alongside the API using its high-performance `api.static` route, ensuring fallback to `index.html` with a `200 OK` status for client-side routing.

  ## Local Parity & Docker

  - The project uses a root `docker-compose.yml` and `infra.config.json` to spin up a local PostgreSQL database container alongside the unified Encore+Svelte application image.
  - This guarantees exact parity between local development testing and the production environment.

  ## CapRover Deployment

  - **Deployment Workflow**:
    1. Build the unified Docker image locally.
    2. Verify parity locally using Docker Compose.
    3. Push the compiled image to a private container registry.
    4. Deploy the prebuilt image to CapRover using the `captain-definition` file (Image-based deployment).

  ## Security & Version Control

  - **.gitignore**: Utilizes a highly secure default-deny pattern (blocking everything by default, then selectively allowlisting source directories) to strictly prevent the accidental commit of `.env` files, local configurations, API keys, and databases.
  ```
