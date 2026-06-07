# agy-skills

A collection of elite, modular, and validated AI agent skills and system rules designed to enforce core engineering, security, cloud-native, and quality-assurance standards in codebase environments.

## Installation

### Rule Synchronization (Default)

By default, executing the package synchronizes global system rules without installing skills:

```bash
bunx github:meyverick/agy-skills
```

### Targeted Skill Installation

To install specific skills, taxonomic groups (e.g., `core`, `web`), or the remote external skills group (`extra`), utilize the `--skills=` parameter with a comma-separated list:

```bash
bunx github:meyverick/agy-skills --skills=core,rust-systems-programming,web
bunx github:meyverick/agy-skills --skills=extra
bunx github:meyverick/agy-skills --skills=all
```

### Updating Existing Skills

To update previously installed skills (both local and dynamically fetched `extra` skills) without mutating uninstalled directories, run:

```bash
bunx github:meyverick/agy-skills update
```

### Checking for Updates

To check if your installed skills, rules, or hooks are up to date against the remote repository without applying changes, run:

```bash
bunx github:meyverick/agy-skills check
```

On Windows, the rules, hooks, and skills are installed under:
- **Rules:** `%userprofile%\.gemini\GEMINI.md`
- **Hooks:** `%userprofile%\.gemini\hooks.json` (keys merged)
- **Skills:** `%userprofile%\.gemini\skills\`

On Linux/macOS, they are installed under:
- **Rules:** `~/.gemini/GEMINI.md`
- **Hooks:** `~/.gemini/hooks.json` (keys merged)
- **Skills:** `~/.gemini/skills/`

---

## Included Agent Skills

This plugin provides 41 highly cohesive, validated skills complying with the Agent Skills specification, grouped by domain:

### 1. Core Standards & Orchestration (`--skills=core`)

- **`fullstack-monorepo-initialization`**: Explicit macro command to bootstrap a SOTA decoupled full-stack monorepo (Encore, Svelte 5, Tauri, PixiJS).
- **`architectural-alignment-validation`**: Evaluates layout and design against SOLID, DRY, KISS, SoC, YAGNI, Law of Demeter, Composition, and Domain-Driven Design (DDD).
- **`resilience-and-security-auditing`**: Audits codebase structures for defensive programming, input validation, fail-fast mechanics, thread-safety/concurrency, and distributed resiliency (circuit breakers, exponential backoff).
- **`cloud-native-infrastructure-optimization`**: Validates configuration, N+1 query elimination, database connection management, caching TTLs, non-blocking asynchronous I/O, multi-stage Docker builds, and carbon footprint minimization.
- **`quality-assurance-and-observability-validation`**: Validates structured JSON logging, correlation IDs, unit test coverage, mock injection patterns, OpenAPI/gRPC API contracts, and Semantic Versioning (SemVer) compatibility.
- **`workspace-refactoring`**: Conducts automated structural audits and refactoring across the workspace.
- **`secure-gitignore-management`**: Manages and audits `.gitignore` files using a secure default-deny pattern.
- **`pnpm-workspace-management`**: Manages monorepo workspaces, strict dependency resolution, and optimized lockfiles using pnpm.

### 2. Systems, Backend & Deployment (`--skills=backend`)

- **`rust-systems-programming`**: Core Rust systems paradigms (Borrow Checker, lifetimes, zero-cost abstractions).
- **`tokio-async-architecture`**: Asynchronous runtimes, thread pool optimization, channels (`mpsc`), concurrency, and preventing thread starvation.
- **`tauri-desktop-engineering`**: Tauri application lifecycle, IPC security (Isolation pattern), command validation, and minimal executable payloads.
- **`encore-ts-backend-engineering`**: Type-safe backend microservices and APIs using Encore.ts (infrastructure-from-code).
- **`caprover-cli-deployment`**: Automates deployment pipelines via the CapRover CLI and `captain-definition` formats.

### 3. Playable Ads & Monetization (`--skills=adtech`)

- **`playable-ad-packaging`**: Compresses assets and inline packages HTML5 games for ad networks (AppLovin, IronSource, Voodoo).
- **`mraid-ad-integration`**: Embeds MRAID standard logic for interactive playable viewability and CTA handling.
- **`playable-ad-telemetry`**: Low-payload custom telemetry and event mapping without heavy third-party SDKs.
- **`playable-ad-design-research`**: Evaluates modern interactive designs, reverse-engineered playables, and systems.
- **`lightweight-analytics-integration`**: Stripped, minified analytics suites for quick integration.
- **`unity-ads-integration`**: Configures first-party Unity Ads SDK parameters.
- **`monetization-sdk-integration`**: Mediations and networks logic (consent flows, ad states, exponential retry cycles).

### 4. Game Development & Architecture (`--skills=gamedev`)

- **`pixijs-2d-rendering`**: Ultra-fast WebGL/WebGPU 2D rendering, texture batching, and object pooling optimizations.
- **`unity-webgl-pruning`**: Custom configurations to prune and reduce WebGL assembly footprints.
- **`unity-csharp-memory-stripping`**: Script stripping and memory profiling to avoid GC pressure.
- **`unity-javascript-bridge-integration`**: High-performance browser integrations via custom `.jslib` scripts.
- **`unity-dots-programming`**: Employs Entity Component System (ECS) architectures inside Unity.
- **`unity-burst-optimization`**: Harnesses LLVM-backed Burst compilers for multithreaded performance jobs.
- **`harmony-patching-mastery`**: Guides safe, non-destructive C# runtime patches for Unity/Mono games using the Harmony library.
- **`cocos-playbuild-integration`**: Decoupled macros mapping for playable builds out of Cocos Creator.
- **`oops-framework-development`**: Implements OOP MVC architectures and modules inside Cocos.
- **`html5-game-migration`**: Migrates full-scale game architectures (Unity/Cocos) to responsive HTML5 engines.
- **`colyseus-multiplayer-development`**: Client-server state sync multiplayer configurations.
- **`pinus-server-development`**: Authoritative MMORPG distributed server orchestrations.
- **`esengine-integration`**: TypeScript-based modular engines integrating prediction-physics architectures.
- **`biteecs-optimization`**: Bare-metal, high-performance data-oriented ECS loops using `bitECS`.
- **`fairygui-integration`**: Decouples UI structures, layout logic, and asset payloads.

### 5. Web, Motion & Interactive Engineering (`--skills=web`)

- **`sveltekit-fullstack-architecture`**: Scalable full-stack SvelteKit applications (server endpoints, form actions, routing).
- **`svelte-game-development`**: Manages interactive HTML5 Canvas and WebGL game rendering states in Svelte 5.
- **`svelte-ui-engineering`**: UI movement orchestrations utilizing Svelte 5 runes (`$state`, `$derived`, `$effect`).
- **`tanstack-query-architecture`**: Asynchronous data fetching, strict caching TTLs, optimistic updates, and server state synchronization.
- **`vite-build-optimization`**: Vite HMR configurations, Rollup chunk splitting, lazy-loading, and secure env variables.
- **`svg-emote-generation`**: Perfectly looping Vector Graphics optimization and styling.
- **`virtual-avatar-engineering`**: High-performance WebGL/Canvas visual avatars utilizing MediaPipe ML models in web workers.

### 6. Dynamic & External Extensions (`--skills=extra`)

These skills are fetched dynamically from remote repositories during synchronization:

> [!NOTE]
> These external extensions are integrated into this project to circumvent installation failures and runtime bugs encountered when attempting to retrieve them directly from their original upstream repositories.

- **`modern-web-guidance`**: Search tool and best practices reference for modern Web API developments. Cloned from [GoogleChrome/modern-web-guidance](https://github.com/GoogleChrome/modern-web-guidance).
- **`chrome-extensions`**: Guidelines and API specifications for Manifest V3 extension engineering. Cloned from [GoogleChrome/modern-web-guidance](https://github.com/GoogleChrome/modern-web-guidance).
- **`find-skills`**: Discoverability helper utilities to search and install external agent skills. Cloned from [vercel-labs/skills](https://github.com/vercel-labs/skills).

---

## Repository Structure

- `src/skills/`: The source directories for each Agent Skill.
- `src/rules/`: Global agent rules and directives (e.g. `GEMINI.md`) installed to enforce system-wide core engineering pillars.
- `references/agentskills/`: Git submodule referencing the official `agentskills` reference library specification.
- `cli.js`: Portable installation script.

---

## License

Licensed under the Apache License, Version 2.0. See the `LICENSE.md` file for details.
