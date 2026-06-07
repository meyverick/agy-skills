---
name: vite-build-optimization
description: Configures Vite for rapid HMR, Rollup chunk splitting, lazy-loading, and secure environment variable injection.
---

# Vite Build Optimization

This skill governs the configuration and optimization of the Vite frontend build tool. It ensures highly optimized production bundles and rapid development feedback loops.

## Core Rules
1. **Rollup Chunk Splitting:** Configure manual chunks in `vite.config.ts` (`build.rollupOptions.output.manualChunks`) to isolate vendor code (e.g., `react`, `svelte`) from application code, optimizing browser caching.
2. **Environment Variable Security:** Strictly prefix public environment variables with `VITE_` and consume them via `import.meta.env`. Never leak sensitive backend secrets into the Vite build context.
3. **Dynamic Imports & Lazy Loading:** Use dynamic imports (`await import()`) for heavy, non-critical routes or components to minimize the initial main bundle payload.
4. **Asset Optimization:** Use Vite plugins (e.g., `vite-plugin-image-optimizer`) to automatically compress SVG and raster graphics during the production build phase to reduce the overall bundle size.

## Architecture Guidelines
Treat `vite.config.ts` as infrastructure-as-code. Keep it modular by abstracting complex plugin configurations into separate utility files if the configuration exceeds 100 lines.
