# agy-skills

A collection of elite, modular, and validated AI agent skills and system rules designed to enforce core engineering, security, cloud-native, and quality-assurance standards in codebase environments.

## Installation

### Core Installation
To install the core plugin along with all 34 primary skills and global system rules, run:
```bash
bunx github:meyverick/agy-skills
```

### Full Installation (Including External Skills)
To install the core plugin, global rules, and optional external skills (`modern-web-guidance`, `chrome-extensions`, and `find-skills`) fetched dynamically from their upstream repositories, run:
```bash
bunx github:meyverick/agy-skills extra
```

On Windows, the skills and rules are installed at:
`%userprofile%/.gemini/config/plugins/agy-skills/`

On Linux/macOS, the skills and rules are installed at:
`~/.gemini/config/plugins/agy-skills/`

---

## Included Agent Skills

This plugin installs 40 highly cohesive, validated skills complying with the Agent Skills specification, grouped by domain:

### 1. Core Standards & Orchestration
*   **`architectural-alignment-validation`**: Evaluates layout and design against SOLID, DRY, KISS, SoC, YAGNI, Law of Demeter, Composition, and Domain-Driven Design (DDD).
*   **`resilience-and-security-auditing`**: Audits codebase structures for defensive programming, input validation, fail-fast mechanics, thread-safety/concurrency, and distributed resiliency (circuit breakers, exponential backoff).
*   **`cloud-native-infrastructure-optimization`**: Validates configuration, N+1 query elimination, database connection management, caching TTLs, non-blocking asynchronous I/O, multi-stage Docker builds, and carbon footprint minimization.
*   **`quality-assurance-and-observability-validation`**: Validates structured JSON logging, correlation IDs, unit test coverage, mock injection patterns, OpenAPI/gRPC API contracts, and Semantic Versioning (SemVer) compatibility.
*   **`workspace-refactoring`**: Conducts automated structural audits and refactoring across the workspace.
*   **`secure-gitignore-management`**: Manages and audits `.gitignore` files using a secure default-deny pattern.
*   **`pnpm-workspace-management`**: Manages monorepo workspaces, strict dependency resolution, and optimized lockfiles using pnpm.

### 2. Systems, Backend & Deployment
*   **`rust-systems-programming`**: Core Rust systems paradigms (Borrow Checker, lifetimes, zero-cost abstractions).
*   **`tokio-async-architecture`**: Asynchronous runtimes, thread pool optimization, channels (`mpsc`), concurrency, and preventing thread starvation.
*   **`tauri-desktop-engineering`**: Tauri application lifecycle, IPC security (Isolation pattern), command validation, and minimal executable payloads.
*   **`encore-ts-backend-engineering`**: Type-safe backend microservices and APIs using Encore.ts (infrastructure-from-code).
*   **`caprover-cli-deployment`**: Automates deployment pipelines via the CapRover CLI and `captain-definition` formats.

### 3. Playable Ads & Monetization
*   **`playable-ad-packaging`**: Compresses assets and inline packages HTML5 games for ad networks (AppLovin, IronSource, Voodoo).
*   **`mraid-ad-integration`**: Embeds MRAID standard logic for interactive playable viewability and CTA handling.
*   **`playable-ad-telemetry`**: Low-payload custom telemetry and event mapping without heavy third-party SDKs.
*   **`playable-ad-design-research`**: Evaluates modern interactive designs, reverse-engineered playables, and systems.
*   **`lightweight-analytics-integration`**: Stripped, minified analytics suites for quick integration.
*   **`unity-ads-integration`**: Configures first-party Unity Ads SDK parameters.
*   **`monetization-sdk-integration`**: Mediations and networks logic (consent flows, ad states, exponential retry cycles).

### 4. Game Development & Architecture
*   **`pixijs-2d-rendering`**: Ultra-fast WebGL/WebGPU 2D rendering, texture batching, and object pooling optimizations.
*   **`unity-webgl-pruning`**: Custom configurations to prune and reduce WebGL assembly footprints.
*   **`unity-csharp-memory-stripping`**: Script stripping and memory profiling to avoid GC pressure.
*   **`unity-javascript-bridge-integration`**: High-performance browser integrations via custom `.jslib` scripts.
*   **`unity-dots-programming`**: Employs Entity Component System (ECS) architectures inside Unity.
*   **`unity-burst-optimization`**: Harnesses LLVM-backed Burst compilers for multithreaded performance jobs.
*   **`cocos-playbuild-integration`**: Decoupled macros mapping for playable builds out of Cocos Creator.
*   **`oops-framework-development`**: Implements OOP MVC architectures and modules inside Cocos.
*   **`html5-game-migration`**: Migrates full-scale game architectures (Unity/Cocos) to responsive HTML5 engines.
*   **`colyseus-multiplayer-development`**: Client-server state sync multiplayer configurations.
*   **`pinus-server-development`**: Authoritative MMORPG distributed server orchestrations.
*   **`esengine-integration`**: TypeScript-based modular engines integrating prediction-physics architectures.
*   **`biteecs-optimization`**: Bare-metal, high-performance data-oriented ECS loops using `bitECS`.
*   **`fairygui-integration`**: Decouples UI structures, layout logic, and asset payloads.

### 5. Web, Motion & Interactive Engineering
*   **`sveltekit-fullstack-architecture`**: Scalable full-stack SvelteKit applications (server endpoints, form actions, routing).
*   **`svelte-game-development`**: Manages interactive HTML5 Canvas and WebGL game rendering states in Svelte 5.
*   **`svelte-ui-engineering`**: UI movement orchestrations utilizing Svelte 5 runes (`$state`, `$derived`, `$effect`).
*   **`tanstack-query-architecture`**: Asynchronous data fetching, strict caching TTLs, optimistic updates, and server state synchronization.
*   **`vite-build-optimization`**: Vite HMR configurations, Rollup chunk splitting, lazy-loading, and secure env variables.
*   **`svg-emote-generation`**: Perfectly looping Vector Graphics optimization and styling.
*   **`virtual-avatar-engineering`**: High-performance WebGL/Canvas visual avatars utilizing MediaPipe ML models in web workers.

---

## Repository Structure

*   `src/skills/`: The source directories for each Agent Skill.
*   `src/rules/`: Global agent rules and directives (e.g. `GEMINI.md`) installed to enforce system-wide core engineering pillars.
*   `references/agentskills/`: Git submodule referencing the official `agentskills` reference library specification.
*   `cli.js`: Portable installation script.

---

## License

Licensed under the Apache License, Version 2.0. See the `LICENSE.md` file for details.
