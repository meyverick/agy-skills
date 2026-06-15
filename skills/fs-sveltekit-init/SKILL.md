---
name: fs-sveltekit-init
description: Scaffolds new SvelteKit projects autonomously. Use when initializing a brand new Svelte codebase via headless CLI.
---

# SvelteKit Headless Initialization

This skill executes the completely headless (non-interactive) scaffolding of a new SvelteKit project. It complies with the "Everything as Code" (IaC) foundational pillar, ensuring reproducible, automated creation of project structures without manual terminal intervention.

## When to Use

- **Use when** the user requests a new Svelte application to be built from scratch.
- **NOT for** modifying an existing Svelte codebase.

## Core Process

### Phase 1: Modern Svelte Scaffolding (sv)
Do not attempt to create the `+page.svelte` files manually.
You must use the modern `sv` scaffolding tool in strictly non-interactive mode.
Execute the following command, replacing `<APP_NAME>`:
```bash
npx sv create <APP_NAME> --template minimal --types ts --no-add-ons
```

### Phase 2: Deterministic Package Management (pnpm)
To ensure lockfile integrity and deterministic builds (Everything as Code), use `pnpm` rather than `npm` if available.
```bash
cd <APP_NAME>
pnpm install
```

### Phase 3: Immediate Verification
Verify the initialization succeeded by building the application:
```bash
pnpm run build
```

## Common Rationalizations

| Rationalization | Reality |
|---|---|
| "I will just `mkdir` and manually write `package.json` and `vite.config.ts`." | Manual scaffolding leads to outdated configurations and missing `svelte.config.js` setups. Always use the official CLI. |
| "I'll run `npm create svelte` without flags." | The process will hang indefinitely waiting for user TTY input. You must use headless flags via `npx sv create`. |

## Red Flags

- Creating boilerplate files (`app.html`, `vite.config.js`) manually via `write_to_file`.
- Commands hanging in the background because of interactive prompts.

## Verification

Before concluding the initialization:
- [ ] The official `npx sv create` scaffolding command was used in headless mode.
- [ ] Dependencies were installed via `pnpm` to ensure deterministic resolution.
- [ ] `pnpm install` and `pnpm run build` completed with code 0.