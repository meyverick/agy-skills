---
name: fs-sveltekit-init
description: Explicit command skill (/fs-sveltekit-init) to bootstrap a SOTA high-performance full-stack app utilizing Bun, SvelteKit, Drizzle ORM, PostgreSQL, and Automated GHCR + CapRover CI/CD.
---

# Full-Stack SvelteKit Initialization Command

> [!IMPORTANT]
> **TRIGGER RULE:** ONLY execute this skill when the user explicitly issues the command: `/fs-sveltekit-init`. Do not trigger this autonomously during standard conversational tasks.

**Future-Proofing Directive**: You must actively resolve and install the `@latest` stable versions of all frameworks, CLIs, and dependencies during execution. Do not rely on historical training data versions. Apply modern paradigms natively.

## Execution Protocol

**Step 0: System Prerequisites Installation**: Before generating any files or running commands, verify if the required system CLI tools (`git`, `bun`, `docker` with the Compose plugin, and `caprover` CLI) are installed and running on the host machine.

- **Failure Protocol**: If any prerequisite installation fails, immediately halt execution. Report the error and provide the solution, and instruct the user to re-execute the skill once the issue is resolved.

**Step 1: Secure Version Control**: Initialize a local Git repository. Immediately create a `.gitignore` file using a highly secure default-deny pattern (explicitly blocking all files by default, then selectively allowlisting standard source code directories, including `.github/workflows/`) to ensure no `.env` files, database credentials, or logs are ever tracked.

**Step 2: Framework Initialization**: Initialize a SvelteKit project using Bun.

### 1. Core Stack

- **Runtime & Package Manager**: Bun.
- **Meta-Framework**: SvelteKit (configured with TypeScript).
- **Database ORM**: Drizzle ORM + `drizzle-kit` for schema migrations.
- **Database**: PostgreSQL.

### 2. Architecture & Security Requirements

- **Server Isolation**: Drizzle ORM database connections, schemas, and queries MUST be strictly isolated inside SvelteKit's `$lib/server/` directory to prevent accidental exposure of database logic to the client bundle.
- **Environment Variables**: Configure a `.env` file for the `DATABASE_URL`. Use SvelteKit's `$env/dynamic/private` or `$env/static/private` modules strictly inside server-side code.
- **Migrations**: Generate a `drizzle.config.ts` file and configure `bunx drizzle-kit` scripts in `package.json` to handle database schema migrations.

## Integration & Deployment

- **Containerization**: Generate a highly optimized, multi-stage `Dockerfile` using the official `oven/bun` image. It must build the SvelteKit app using `svelte-adapter-bun` and expose it as a standalone web server.
- **Local Parity & Docker**: Generate a root `docker-compose.yml`. This must spin up two containers: a local PostgreSQL database and the SvelteKit application image.
- **CI/CD Pipeline (GitHub Actions)**: Generate a `.github/workflows/docker-publish.yml` file. This GitHub Action must trigger on a push to the `main` branch and perform three steps:
  1. Log in to the GitHub Container Registry (`ghcr.io`).
  2. Build the `Dockerfile` and push the tagged image to GHCR.
  3. Execute a CapRover deployment using the CapRover CLI action, configured securely via GitHub Secrets and targeting the newly built `ghcr.io` image.
- **CapRover Definition**: Generate a `captain-definition` file structured for an image-based deployment (pointing to the `ghcr.io` image) as a local reference.

**Instructional Context**: Generate a `GEMINI.md` file at the root of the project. The content of this file must be exactly:

  ```markdown
  # SvelteKit Full-Stack Architecture Context

  ## Architecture

  This project is a high-performance, unified full-stack application:

  - **Runtime & Package Manager**: Bun.
  - **Framework**: SvelteKit.
  - **Database & ORM**: PostgreSQL managed via Drizzle ORM.
  - **Security**: Database connections and sensitive logic are strictly confined to `$lib/server/`.

  ## Future-Proofing Directive

  - Legacy code patterns must be explicitly rejected in favor of modern paradigms.

  ## Local Parity & Docker

  - The project uses a root `docker-compose.yml` to spin up a local PostgreSQL database container alongside the SvelteKit application.

  ## CI/CD & CapRover Deployment

  - **Automated Pipeline**: Pushing to the `main` branch automatically triggers a GitHub Action. The action builds the multi-stage Bun/SvelteKit Docker image, pushes it to the GitHub Container Registry (`ghcr.io`), and uses the CapRover CLI to automatically trigger a live server deployment.

  ```
