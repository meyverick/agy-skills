---
name: sveltekit-fullstack-architecture
description: Architects scalable full-stack applications using SvelteKit, focusing on server-side endpoints, form actions, and strict routing boundaries.
---

# SvelteKit Full-Stack Architecture

This skill governs the structure and implementation of SvelteKit applications, specifically focusing on server-side logic, routing architectures, and data hydration, complementing the `svelte-ui-engineering` skill.

## Core Rules
1. **Data Loading Isolation:** Use `+page.server.ts` exclusively for data fetching that requires secure backend credentials or direct database access. Pass data to the frontend via the `load` function.
2. **Form Actions & Progressive Enhancement:** Handle mutative state changes using SvelteKit Form Actions (`export const actions`) within `+page.server.ts`. Ensure forms degrade gracefully without JavaScript using `use:enhance`.
3. **API Endpoints (Pillar 22):** Design dedicated REST-like API endpoints in `+server.ts` for operations consumed by external clients or specific client-side logic. Standardize JSON error responses.
4. **Environment Secrets (Pillar 12):** Strictly differentiate between public (`$env/static/public`) and private (`$env/static/private`) environment variables. Never import a private variable in a `.svelte` or `+page.ts` file.

## Architecture Guidelines
Adhere strictly to SvelteKit's filesystem-based routing. Abstract complex business logic out of the `+page.server.ts` route handlers into dedicated backend modules (`lib/server/`) to ensure the routing layer remains thin and testable.
