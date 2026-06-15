---
name: project-documentation-mastery
description: Guides agents through project documentation architecture. Use when creating, reviewing, or updating a project's README or Wiki documentation.
---

# Project Documentation Mastery

This skill equips agents to properly organize project documentation by strictly isolating high-level promotional showcases from deep technical implementations. It enforces a strict Separation of Concerns (SoC) between the `README.md` and the GitHub Wiki submodule.

## When to Use

- **Use when** initializing a new repository.
- **Use when** updating project documentation, guides, or API specs.
- **Use when** writing the `README.md`.
- **NOT for** writing inline code comments or function docstrings.

## Core Process

### 1. Determine the Documentation Domain
Evaluate the intent of the documentation:
- Is it for the general public, non-technical readers, or a project overview? **Target:** `README.md`.
- Is it for developers, API consumers, architecture deep-dives, or installation guides? **Target:** `wiki/` submodule.

### 2. Enforce the Promotional README (KISS/SoC)
The `README.md` located at the root of the project repository must serve **strictly as a high-level promotional showcase**.
- Omit ALL technical details.
- Purge any installation commands, architecture diagrams, or API references.
- Focus exclusively on the "Why", features, benefits, screenshots, and links pointing to the technical Wiki.

### 3. Manage the Technical Wiki Submodule (Everything as Code)
All comprehensive technical documentation must reside within a dedicated `wiki` directory at the project root.
- Determine the repository's GitHub Wiki URL (typically `https://github.com/<USERNAME>/<REPOSITORY>.wiki.git`).
- If the `wiki` directory does not exist or is not a submodule, initialize it:
  ```bash
  git submodule add <REPO_WIKI_URL> wiki
  ```

### 4. Author Technical Content
Create and update technical files within the `wiki/` submodule.
- Use standard Markdown formatting.
- Avoid illegal characters in filenames: `\ / : * ? " < > |`.
- Commit changes from within the submodule, then update the submodule reference in the parent repository.

## Common Rationalizations

| Rationalization | Reality |
|---|---|
| "I'll just add these quick installation steps to the README to save time." | This violates the strict SoC. The README must remain non-technical. Move it to the Wiki and link to it. |
| "A submodule is overkill for just one API spec." | Everything as Code dictates the Wiki must be versioned alongside the project. A submodule guarantees single-source-of-truth parity. |
| "I'll create a `docs/` folder instead of a Wiki." | GitHub Wiki is the standard target for this skill. Deviating requires explicit user permission. |

## Red Flags

- Terminal blocks (`bash`, `shell`) containing `npm install` or `apt-get` appearing in `README.md`.
- Architecture diagrams or code schemas located anywhere other than the `wiki/` directory.
- `wiki/` exists but is a standard directory instead of a Git submodule.

## Verification

After completing documentation updates, confirm:
- [ ] `README.md` contains absolutely zero technical implementation details or terminal commands.
- [ ] `wiki/` directory exists and is recognized by Git as a valid submodule.
- [ ] All technical additions were placed in the `wiki/` directory.
- [ ] Wiki filenames do not contain restricted characters.
