---
name: pnpm-workspace-management
description: Manages monorepo workspaces, strict dependency resolution, and optimized lockfiles using pnpm to ensure reproducible, space-efficient builds.
---

# pnpm Workspace Management

This skill governs the use of `pnpm` as the primary ecosystem tool for dependency management and workspace orchestration. It strictly enforces `pnpm` usage over legacy alternatives like `npm` or `yarn` to maximize runtime performance and installation velocity (Global Rule 1).

## Core Rules
1. **Strict Monorepo Workspaces:** Explicitly manage multi-package repositories using `pnpm-workspace.yaml`. Ensure all local packages reference each other via `workspace:*` protocols to prevent version desync.
2. **Phantom Dependency Prevention:** Rely on `pnpm`'s strict `node_modules` symlinking structure. Do not assume dependencies of dependencies are accessible; explicitly declare every imported package in `package.json`.
3. **Reproducible Builds:** Always commit `pnpm-lock.yaml`. CI/CD pipelines must strictly use `pnpm install --frozen-lockfile` to prevent drift.
4. **Script Standardization:** Prefix all execution scripts with `pnpm` (e.g., `pnpm dev`, `pnpm build`). Avoid global installations; utilize `pnpm dlx` or `pnpm exec` for one-off binary executions.

## Architecture Guidelines
Organize workspaces by Domain-Driven Design (DDD). Applications should reside in `apps/`, while shared libraries, configurations, and core infrastructure logic should reside in `packages/`.
