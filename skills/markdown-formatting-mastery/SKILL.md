---
name: markdown-formatting-mastery
description: Enforces strict, standardized Markdown formatting. Use when writing documentation, generating reports, formatting code blocks, or creating wikis.
---

# Markdown Formatting Mastery

This skill strictly enforces standard GitHub Flavored Markdown (GFM) formatting rules. It guarantees consistency across all generated artifacts, wikis, and system documentation.

## When to Use

- **Use when** authoring or modifying `.md` files.
- **Use when** generating reports, readmes, or artifact summaries.
- **Use when** structuring complex tables or technical data.

## Core Process

### Phase 1: Document Structure & Hierarchy
- Maintain a strict heading hierarchy. Never skip heading levels (e.g., don't jump from `H1` to `H3`).
- Only use a single `# H1` at the very top of the document.

### Phase 2: Lists & Syntax
- Use the hyphen `-` for unordered lists. Do not use `*`.
- Ensure standard spacing: One blank line above and below all lists, code blocks, and blockquotes.

### Phase 3: Code Formatting
- Always specify the language identifier for fenced code blocks (e.g., ` ```typescript ` or ` ```bash `).
- Do not use `>` blockquotes for code. Use fenced backticks.
- Link to specific files using valid markdown URI schema `[name](file:///path)`.

### Phase 4: Tabular Data
- Use standard GFM tables to present multi-dimensional data.
- Ensure columns are aligned logically to improve raw-text readability.

## Common Rationalizations

| Rationalization | Reality |
|---|---|
| "I'll just paste this code as raw text." | Code without fenced syntax highlighting is difficult for humans to read. Language identifiers are mandatory. |
| "I'll use `*` for lists because it's easier." | `*` can conflict with bolding syntax or cause inconsistent rendering in some parsers. Always standardize on `-`. |

## Red Flags

- Fenced code blocks lacking language tags (e.g., just ` ``` ` instead of ` ```json `).
- Skipped heading levels or multiple `H1` tags in a single document.
- Dense walls of text instead of chunked, easily scannable sections.

## Verification

Before saving the markdown document, verify:
- [ ] The document strictly adheres to heading hierarchy.
- [ ] All lists use hyphens (`-`).
- [ ] Every code block possesses a correct language identifier.
- [ ] Links and URIs are correctly formatted without breaking backticks.
