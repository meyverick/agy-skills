---
name: project-documentation-mastery
description: Guides agents through project documentation architecture. Use when creating, reviewing, or updating a project's README or Wiki documentation.
---

# Project Documentation Mastery

This skill equips agents to properly organize project documentation by strictly isolating high-level promotional showcases from deep technical implementations. It enforces a strict Separation of Concerns (SoC) between the `README.md` and the GitHub Wiki.

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

### 3. Manage the Technical Wiki (Everything as Code)
All comprehensive technical documentation must reside within a dedicated `wiki/` directory at the project root.
- This directory must be tracked natively within the main project repository (not as a Git submodule) to ensure atomic commits and avoid submodule friction.
- The contents of this directory map 1:1 with the GitHub Wiki repository (`https://github.com/<USERNAME>/<REPOSITORY>.wiki.git`).

### 4. Author Technical Content
Create and update technical files within the `wiki/` directory.
- Use standard Markdown formatting.
- Avoid illegal characters in filenames: `\ / : * ? " < > |`.
- When changes are finalized, commit them to the main repository.
- To sync with the GitHub Wiki, either rely on a CI/CD GitHub Action, or manually push via a temporary Git initialization inside the `wiki/` folder:
  ```bash
  cd wiki/ && rm -rf .git && git init && git remote add origin <REPO_WIKI_URL> && git add . && git commit -m "sync: update wiki from main repository" && git push --force origin main
  ```

## Common Rationalizations

| Rationalization | Reality |
|---|---|
| "I'll just add these quick installation steps to the README to save time." | This violates the strict SoC. The README must remain non-technical. Move it to the Wiki and link to it. |
| "Maintaining two git histories for the same files is overkill." | Everything as Code dictates the Wiki must be versioned alongside the project. Tracking the `wiki/` folder natively guarantees single-source-of-truth parity in atomic commits without submodule headaches. |
| "I'll create a `docs/` folder instead of a Wiki." | GitHub Wiki is the standard target for this skill. Deviating requires explicit user permission. |

## Red Flags

- Terminal blocks (`bash`, `shell`) containing `npm install` or `apt-get` appearing in `README.md`.
- Architecture diagrams or code schemas located anywhere other than the `wiki/` directory.
- `wiki/` exists as a Git submodule instead of a standard tracked directory.

## Verification

After completing documentation updates, confirm:
- [ ] `README.md` contains absolutely zero technical implementation details or terminal commands.
- [ ] `wiki/` directory exists and is recognized by Git as a standard tracked directory, not a submodule.
- [ ] All technical additions were placed in the `wiki/` directory.
- [ ] Wiki filenames do not contain restricted characters.
