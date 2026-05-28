---
name: fullstack-monorepo-initialization
description: Explicit command skill (/fullstack-monorepo-initialization) to bootstrap a SOTA decoupled full-stack monorepo with Encore.ts, Svelte 5, PixiJS, and Tauri v2.
---

# Full-Stack Monorepo Initialization Command

> [!IMPORTANT]
> **TRIGGER RULE:** This skill acts strictly as a macro command. It must ONLY be executed when the user explicitly issues the command: `/fullstack-monorepo-initialization`. Do not trigger this autonomously during standard conversational tasks.

<h2>Execution Protocol</h2>

When explicitly triggered by the user, immediately initialize a new high-performance, decoupled full-stack monorepo project using a `pnpm` workspace structure. The project must be strictly organized under the following components, targeting the 2026 SOTA ecosystem:

### 1. Backend (`/apps/backend`)
*   **Engine**: Encore.ts.
*   **Requirements**: 
    *   Implement strict schema-based input validation for all endpoints.
    *   Integrate PostgreSQL using Encore's declarative database primitive (`new SQLDatabase`). 
    *   Establish a dedicated SQL migrations folder (`/apps/backend/migrations/`) containing a baseline schema migration (e.g., `1_init.up.sql`).
    *   Utilize explicit transaction blocks (`db.withTx`) for all database mutations to maintain strict ACID compliance.
    *   Externalize all system credentials and database connection strings via 12-Factor environment variables.

### 2. Frontend (`/apps/frontend`)
*   **Engine**: Pure Svelte 5 Single-Page Application (SPA) built with Vite.
*   **State Management**: Isolate UI state using Svelte 5 Runes (`$state`, `$derived`). Integrate TanStack Query for caching server state.
*   **Graphics Integration**: Integrate PixiJS v8 (utilizing native WebGPU rendering) wrapped in a custom Svelte component. You must manage the Pixi application's initialization and disposal strictly inside a Svelte 5 `$effect` cleanup return function to prevent WebGL memory leaks.

### 3. Client Shell (`/apps/tauri`)
*   **Engine**: Tauri v2.
*   **Requirements**: Package the Svelte frontend into a secure, pure client shell supporting both desktop (macOS, Windows, Linux) and mobile (iOS, Android) platforms. The frontend must dynamic-load its target API base URL via Vite environment variables to transition smoothly between local development and remote production backends.

<h2>Integration Patterns</h2>

When generating the architecture and code for this monorepo, adhere strictly to the following integration patterns:

*   **API Contracts**: Generate and consume Encore's native type-safe TypeScript client SDK within the Svelte frontend to enforce strict compiler-level API contracts.
*   **Observability**: Ensure all frontend requests originating from Tauri or the web client propagate structured trace parent and unique `request_id` headers to feed Encore's native structured logging engine.
*   **CapRover Single-Container Build**: Configure Vite to output Svelte production assets directly into the backend directory. Utilize Encore's high-performance native Rust `api.static` route with a fallback path (`/!path`) to host the SPA assets directly from the compiled Encore binary. Explicitly set `notFound` to `index.html` and `notFoundStatus` to `200` to allow client-side routing fallback.
*   **PostgreSQL & CapRover DB Mapping**: Provide a root-level `infra.config.json` template configured for self-hosting. Map Encore's logical database declaration to an external, self-hosted PostgreSQL container inside CapRover (utilizing the environment variable mapping `ENCORE_DB_CONN_<db_name>` pointing to a CapRover-managed PostgreSQL instance).
*   **Local Setup & Repository**: Provide the exact terminal shell scripts utilizing the GitHub CLI (`gh`) to initialize Git local to the workspace, set `main` as the primary branch, and create a remote private GitHub repository named exactly after the workspace folder. Initialize a `.gitignore` file using a highly secure default-deny pattern, enforcing explicit security blocks on environment files (`.env`), keys, credentials, and logs. Instruct the user to use `git ls-files` to verify that no sensitive files are tracked in the Git index, and exclude common compilation artifacts.
*   **Autonomous Dependency Management**: Verify missing dependencies (e.g., CLIs, packages) prior to execution and directly execute shell commands to install them autonomously. Do not ask the user for permission when installing missing dependencies except if required. If permission is required, provide a one-liner command that the user can copy-paste to install the missing dependency, and only proceed with execution after confirming installation.
*   **Instructional Context Generation**: Generate a `GEMINI.md` file at the root of the project to serve as the master instructional context for AI assistants during future maintenance cycles. This file must explicitly document the monorepo architecture, the exact technologies used (including PostgreSQL migration paths), and core maintenance constraints.