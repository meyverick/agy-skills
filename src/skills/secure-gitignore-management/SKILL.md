---
name: secure-gitignore-management
description: Manages and audits .gitignore files using a highly secure default-deny pattern. Enforces explicit security blocks on environment files (.env), keys, credentials, and logs. Uses git ls-files to verify that no sensitive files are tracked in the Git index, and excludes common compilation artifacts.
license: Apache-2.0
---

# Secure Gitignore Management

This skill outlines the process of designing, maintaining, and auditing `.gitignore` configurations using a security-first "default-deny" architecture to prevent accidental leaks of credentials, environment configurations, and build artifacts.

## Activation Criteria

Use this skill when:
- Creating a new `.gitignore` file or auditing an existing one.
- Setting up security policies for repository commits.
- Verifying whether sensitive files are accidentally tracked in the Git index.
- Excluding build artifacts, cache files, and system junk from version control.

---

## 1. Default-Deny Architecture

Default-deny means everything in the workspace is ignored by default (`*`), and only explicitly designated files or folders are allowed (`!`). This guarantees that newly created files (like local secrets or scratch scripts) cannot be accidentally staged.

### Allowlisting Rules:
1. **Global Ignore**: Start with `*` to ignore all files and directories at the repository root.
2. **Directory Allowlisting**: To allow files inside a folder, you must first allowlist the folder itself, then allowlist its contents. Git cannot traverse into an ignored directory.
3. **Allowlist Order**: Allowlist specific files (like `package.json`, `tsconfig.json`) and specific directories (like `src/`, `public/`).

---

## 2. Explicit Security Blocks

Even with a default-deny pattern, you must explicitly declare security blocks to protect against accidental overrides (e.g., if a developer uses a wildcard allowlist or runs `git add --force`).

Ensure the following patterns are explicitly blocked and never allowlisted:

*   **Environment Files**: `.env`, `.env.*`, `.env.local`
*   **Credentials & Keys**: `*.pem`, `*.key`, `*.pub`, `id_rsa`, `*.pfx`, `*.cer`
*   **API Tokens & Client Secrets**: `client_secret*.json`, `*.credentials`, `credentials.json`
*   **Logs**: `*.log`, `npm-debug.log*`, `yarn-error.log*`, `pnpm-debug.log*`
*   **Database Files**: `*.db`, `*.sqlite`, `*.sqlite3`
*   **OS Junk**: `.DS_Store`, `Thumbs.db`

---

## 3. Verification Protocol (Defensive Programming)

Just because a file is added to `.gitignore` does not mean it is safe. If a file was tracked *before* it was added to `.gitignore`, Git will continue tracking it. You must audit the Git index.

### Step-by-Step Index Auditing:

1.  **Check for Tracked Secrets**: Run `git ls-files` and filter for environment or key patterns to ensure no secrets are stored in the index cache.
    ```bash
    git ls-files | grep -E "\.env|\.key|\.pem|credentials|secret"
    ```
2.  **Remove Ignored Files from Index**: If any ignored file (like node_modules or a build directory) is currently tracked, untrack it without deleting it from your local disk:
    ```bash
    git rm --cached <file-path>
    # Or to clean everything that should be ignored:
    git rm -r --cached .
    git add .
    ```
3.  **Validate Git Status**: Confirm that the only changes staged for commit are those explicitly intended.

---

## 4. Common Edge Cases & Gotchas

*   **Empty Folders**: Git does not track empty folders. You cannot allowlist an empty folder unless it contains a dummy file (like `.gitkeep`) that is also allowlisted.
*   **Allowlisting Subdirectories**: If you ignore everything (`*`) and want to allow a file deep in a nested folder, you must unignore all parent directories in the path:
    ```gitignore
    # Ignore everything
    *
    
    # Allow the path down to the file
    !parent/
    !parent/child/
    !parent/child/target-file.txt
    ```

---

## Reference Example

Below is a secure, production-ready `.gitignore` template using the default-deny strategy.

```gitignore
# ==============================================================================
# 1. DEFAULT-DENY RULE
# ==============================================================================
# Ignore everything by default
*
# But track this .gitignore itself
!.gitignore

# ==============================================================================
# 2. EXPLICIT SECURITY BLOCKS (Do not override these!)
# ==============================================================================
# Environment files
.env
.env.*
!.env.example # Allow committing example configs only

# Secrets & Certificates
*.pem
*.key
*.pub
*.pfx
*.p12
*.crt
*.der
credentials.json
client_secret*.json

# Database and store files
*.db
*.sqlite
*.sqlite3
*.csv
*.xlsx

# Logs and debug files
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# System junk
.DS_Store
Thumbs.db
ehthumbs.db
Desktop.ini

# IDE Settings (explicit block)
.vscode/
.idea/

# ==============================================================================
# 3. ALLOWLIST RULES (Explicitly permit project files)
# ==============================================================================
# Allow package & config files
!package.json
!package-lock.json
!pnpm-lock.yaml
!yarn.lock
!tsconfig.json
!svelte.config.js
!vite.config.ts
!vite.config.js
!cli.js
!README.md
!LICENSE

# Allow source code directories
!src/
!src/**

# Allow rules and configurations
!.agents/
!.agents/**
!references/
!references/**
```
