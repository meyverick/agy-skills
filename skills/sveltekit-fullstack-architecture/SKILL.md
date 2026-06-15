---
name: sveltekit-fullstack-architecture
description: Architects scalable full-stack applications using SvelteKit. Use when configuring routing, writing server endpoints, handling form actions, or defining SSR strategies.
---

# SvelteKit Fullstack Architecture

This skill enforces strict boundaries between the client and server within a SvelteKit application. It guarantees secure data fetching, mutation via Actions, optimal Server-Side Rendering (SSR), and strictly adheres to the 12-Factor App and Defensive Programming pillars.

## When to Use

- **Use when** creating new routes (`+page.svelte`, `+layout.svelte`).
- **Use when** fetching data securely from a database (`+page.server.ts`).
- **Use when** mutating data via forms (`+page.server.ts` actions).
- **NOT for** complex client-side animation logic.

## Core Process

### Phase 1: Routing & 12-Factor Boundaries
- Ensure every route has a distinct purpose. Group related routes using `(directories)` following Domain-Driven Design (DDD).
- **Secrets Management:** All environment variables must be externalized. Server-only secrets MUST be imported via `$env/static/private`. Never expose these to the client bundle.

### Phase 2: Secure Data Fetching (Load Functions)
- **Server-Only**: If data requires secrets, database access, or API keys, it MUST be fetched in `+page.server.ts`.
- **Universal**: Only use `+page.ts` if the data fetching can safely execute on the client-side (e.g., public APIs, static markdown parsing).

### Phase 3: Data Mutation & Fail-Fast Defensive Design
- Never use manual `fetch` calls to REST endpoints for standard data mutations. Define `actions` inside `+page.server.ts`.
- **Fail-Fast Exception Handling:** If an action receives invalid boundaries or an unauthorized state, throw an explicit SvelteKit `error(400, "message")` immediately. Do not return soft `{ success: false }` payloads for hard system failures.
- Enhance forms using SvelteKit's `enhance` action (`<form method="POST" use:enhance>`).

## Common Rationalizations

| Rationalization | Reality |
|---|---|
| "I'll just return `{ error: 'Not Found' }` from my form action." | Soft errors swallow HTTP status codes. Defensive programming mandates explicitly throwing SvelteKit's `error()` or `fail()` to trigger the `+error.svelte` boundary correctly. |
| "I'll fetch the database records directly in `+page.ts`." | `+page.ts` runs on the client. Database queries will leak secrets. Always use `+page.server.ts`. |

## Red Flags

- Secrets (`$env/static/private`) imported into `.svelte` files or `+page.ts`.
- Client-side `fetch` POST requests replacing native `<form>` actions.
- Returning soft JSON errors instead of explicitly throwing `error()` for system-level faults.

## Verification

Before finalizing the SvelteKit architecture, verify:
- [ ] Sensitive data and database queries are strictly confined to `*.server.ts` files and utilize `$env/static/private`.
- [ ] Data mutations utilize Form Actions with `use:enhance`.
- [ ] Invalid boundary states instantly throw an `error()` to fail fast.
