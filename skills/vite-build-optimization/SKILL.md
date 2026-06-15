---
name: vite-build-optimization
description: Configures Vite for rapid HMR and optimized chunk splitting. Use when auditing build pipelines, configuring environment variables, or optimizing client payloads.
---

# Vite Build Optimization

This skill configures the Vite bundler to achieve lightning-fast Hot Module Replacement (HMR) during development and highly optimized, cache-efficient chunks for production deployment.

## When to Use

- **Use when** modifying `vite.config.ts` or `vite.config.js`.
- **Use when** the production build bundle sizes are too large.
- **Use when** configuring secure frontend environment variables.
- **NOT for** modifying server-side Node.js environment files without Vite involvement.

## Core Process

### Phase 1: Rapid HMR Configuration
- Ensure server configurations specifically define explicit paths or watcher settings if working inside heavy Docker containers.
- Avoid heavy runtime plugins that hook into every file transform unless absolutely necessary.

### Phase 2: Production Chunk Splitting
By default, Rollup bundles everything into a monolithic file. Break this down:
- Utilize `build.rollupOptions.output.manualChunks` to explicitly split vendor libraries (e.g., `react`, `svelte`, `three`) from application code.
- This allows browsers to cache stable dependencies while only downloading the latest application logic.

### Phase 3: Secure Environment Variable Injection
Vite exposes environment variables differently than Node.
- Only variables prefixed with `VITE_` are exposed to the client bundle.
- Ensure secrets are never prefixed with `VITE_`.
- Access variables securely via `import.meta.env.VITE_MY_VAR` (do not use `process.env`).

## Common Rationalizations

| Rationalization | Reality |
|---|---|
| "I'll just let Vite handle chunking automatically." | Default chunking often results in massive index files. Explicit manual chunking is required for high-performance delivery. |
| "I'll read this secret via `process.env` in my component." | `process.env` is not injected by Vite. If the secret is meant for the client, it must be prefixed with `VITE_` and accessed via `import.meta.env`. |

## Red Flags

- `vite.config.ts` lacking explicit `manualChunks` optimization for vendor libraries.
- Client-side code attempting to read non-prefixed `.env` variables.

## Verification

Before finalizing the build optimization:
- [ ] `npm run build` executes without Rollup warnings regarding chunk size limits.
- [ ] Vendor libraries are properly isolated into separate chunks.
- [ ] Client environment variables are correctly prefixed with `VITE_`.
