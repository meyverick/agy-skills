---
name: ai-referencing-optimization
description: Optimizes codebases for 2026 autonomous AI crawlers. Use when implementing Answer Engine Optimization (AEO), llms.txt routing, or OpenAPI contracts.
---

# AI Referencing Optimization

This skill ensures a web codebase or application is strictly optimized for ingestion by 2026 SOTA AI web crawlers and LLM retrieval engines (e.g., Perplexity, ChatGPT Search, Gemini).

## When to Use

- **Use when** setting up repository documentation routing (`llms.txt`).
- **Use when** defining application intents or manifest files for AI agent plugins.
- **NOT for** standard 2010s human-centric SEO (like keyword stuffing).

## Core Process

### Phase 1: The AI Router (`llms.txt`)
- The repository must serve an `llms.txt` at the root, directing AI agents to high-density context files.
- It must structurally separate `[System Constraints]` from `[Implementation Guides]`.

### Phase 2: Answer Engine Optimization (AEO)
- Human HTML semantics (`<h1>`, `<article>`) are not enough.
- You must inject explicit, dense JSON-LD microdata for every primary entity to feed knowledge graphs directly.
- Ensure critical data is not locked behind client-side React/Svelte hydration, as fast AI crawlers may not execute JS.

### Phase 3: Agentic API Contracts
- AI Agents consume APIs via strict schema interpretation.
- You must generate strict OpenAPI 3.1 specs with exhaustive `description` fields for every parameter. Omitted descriptions cause AI hallucination.

## Common Rationalizations

| Rationalization | Reality |
|---|---|
| "I'll just add some meta tags for SEO." | Legacy meta tags are ignored by semantic answer engines. You must implement JSON-LD and structured entity graphs. |
| "The LLM will figure out the API from the parameter names." | Agents hallucinate heavily without explicit enum definitions and verbose property descriptions in OpenAPI specs. |

## Red Flags

- Repositories lacking an `llms.txt` or `.well-known/ai-plugin.json`.
- OpenAPI definitions missing explicit `description` blocks on parameters.

## Verification

Before finalizing the AEO optimization:
- [ ] An `llms.txt` file exists and accurately maps the repository.
- [ ] The public API possesses an exhaustive OpenAPI spec.
- [ ] HTML outputs contain valid, dense JSON-LD graphs.
