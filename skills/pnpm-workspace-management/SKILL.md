---
name: pnpm-workspace-management
description: Manages monorepo workspaces and strict dependency resolution using pnpm. Use when configuring workspaces, lockfiles, or resolving ghost dependencies.
---

# PNPM Workspace Management

This skill governs the configuration and strict dependency resolution of `pnpm` monorepos. It prevents "ghost dependency" leaks and guarantees deterministic, highly cached builds across environments.

## When to Use

- **Use when** initializing a new monorepo `pnpm-workspace.yaml`.
- **Use when** adding dependencies across multiple shared packages (`pnpm --filter`).
- **NOT for** standard `npm` or `yarn` repositories.

## Core Process

### Phase 1: Strict Boundaries
- `pnpm` uses a symlinked `node_modules` structure to prevent ghost dependencies (packages accessible without being explicitly in `package.json`).
- If a package needs a dependency, it MUST be explicitly installed in that specific package's `package.json`, not just at the monorepo root.

### Phase 2: Workspace Filtering
- Never `cd` into a directory to run an install.
- Always use workspace filtering from the root: `pnpm --filter @my-org/frontend add lodash`.

### Phase 3: Lockfile Integrity
- The `pnpm-lock.yaml` is the ultimate source of truth. Never manually edit it.
- In CI/CD pipelines, always run `pnpm install --frozen-lockfile` to ensure deterministic builds.

## Common Rationalizations

| Rationalization | Reality |
|---|---|
| "I'll just run `npm install` because `pnpm` is throwing an error." | Mixing package managers destroys the lockfile and creates bizarre symlink errors. In a pnpm workspace, `npm install` is strictly forbidden. |
| "It works locally, so the dependency must be there." | Ghost dependencies work locally if hoisted by accident. CI will fail. Explicitly define all imports in `package.json`. |

## Red Flags

- The existence of a `package-lock.json` or `yarn.lock` inside a pnpm workspace.
- Using `cd packages/api && pnpm install` instead of `pnpm --filter`.

## Verification

Before concluding workspace management:
- [ ] Only a single `pnpm-lock.yaml` exists at the root.
- [ ] All packages define their exact dependencies explicitly (no relying on root hoisting).
- [ ] CI scripts enforce `--frozen-lockfile`.
