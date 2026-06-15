---
name: secure-gitignore-management
description: Manages and audits .gitignore files. Use when evaluating codebase security to strictly enforce a default-deny pattern for tracking files.
---

# Secure Gitignore Management

This skill enforces a highly secure "default-deny" Git ignore strategy. It prevents accidental credential leaks, environmental configuration leaks, and compilation artifact bloat by strictly allowing only verified source files into the index.

## When to Use

- **Use when** initializing a new repository (`git init`).
- **Use when** auditing the repository for accidentally committed credentials.
- **Use when** modifying the project's build toolchain or adding new environment variable architectures.
- **NOT for** modifying `.git/` internal core configurations.

## Core Process

### Phase 1: The Default-Deny Architecture
Instead of listing everything you *don't* want, a secure `.gitignore` lists everything, then selectively allows what you *do* want.
- Add `*` to the very top of `.gitignore` to ignore everything.
- Add `!*/` to allow directories.

### Phase 2: Selective Allow-Listing
Specifically allow your source code directories and configuration files.
- `!src/`
- `!docs/`
- `!package.json`
- `!README.md`

### Phase 3: Explicit Security Blocks
Even within allow-listed directories, ensure absolute strict bans on sensitive patterns:
- `**/*.env`
- `**/*.pem`
- `**/*_rsa`
- `**/*.sqlite` (unless explicitly intended for distribution)

### Phase 4: Git Index Verification
Verify what Git is actually tracking to ensure no secrets slipped through before the policy was enacted.
- Execute `git ls-files` to audit currently tracked files.
- If a sensitive file is tracked, execute `git rm --cached <file>` immediately.

## Common Rationalizations

| Rationalization | Reality |
|---|---|
| "A default-deny gitignore is too annoying to maintain." | Accidentally leaking AWS keys or database credentials is far more painful. Explicit tracking forces intentional engineering. |
| "I'll just add `.env` to the end of the file." | Without a default-deny pattern, developers inevitably name a secret `.env.local` or `.env.test` which slips through the standard blocklist. |

## Red Flags

- `.gitignore` files that do not start with a universal block (`*`).
- Tracking files named `secrets.json`, `.env`, or ending in `.key`.
- Committing heavy compilation artifacts (e.g., `node_modules/`, `dist/`).

## Verification

Before finalizing Gitignore management, verify:
- [ ] `.gitignore` implements a default-deny `*` rule.
- [ ] `git ls-files` returns zero sensitive credentials, API keys, or `.env` files.
- [ ] Explicit allow-lists cover only necessary source and configuration files.
