# agy-skills

A collection of elite, modular, and validated AI agent skills designed to enforce core engineering, security, cloud-native, and quality-assurance standards in codebase environments.

## Installation

You can install the contents of the `src/` directory directly into your local Gemini configuration directory by running:

```bash
bunx github:meyverick/agy-skills
```

On Windows, the skills are installed at:
`%userprofile%/.gemini/config/plugins/refactorer/`

On Linux/macOS, the skills are installed at:
`~/.gemini/config/plugins/refactorer/`

---

## Included Agent Skills

This plugin installs six highly cohesive, validated skills complying with the Agent Skills specification:

1.  **`architectural-alignment-validation`**: Evaluates layout and design against SOLID, DRY, KISS, SoC, YAGNI, Law of Demeter, Composition, and Domain-Driven Design (DDD).
2.  **`resilience-and-security-auditing`**: Audits codebase structures for defensive programming, input validation, fail-fast mechanics, thread-safety/concurrency, and distributed resiliency (circuit breakers, exponential backoff).
3.  **`cloud-native-infrastructure-optimization`**: Validates configuration, N+1 query elimination, database connection management, caching TTLs, non-blocking asynchronous I/O, multi-stage Docker builds, and carbon footprint minimization.
4.  **`quality-assurance-and-observability-validation`**: Validates structured JSON logging, correlation IDs, unit test coverage, mock injection patterns, OpenAPI/gRPC API contracts, and Semantic Versioning (SemVer) compatibility.
5.  **`codebase-compliance-orchestration`**: Coordinates reviews and feature creation, orchestrating the four specialized skills across Generation and Evaluation lifecycles.
6.  **`workspace-refactoring`**: Conducts automated structural audits and refactoring across the workspace.

---

## Repository Structure

*   `src/skills/`: The source directories for each Agent Skill.
*   `references/agentskills/`: Git submodule referencing the official `agentskills` reference library specification.
*   `cli.js`: Portable installation script.

---

## License

Licensed under the Apache License, Version 2.0. See the `LICENSE.md` file for details.
