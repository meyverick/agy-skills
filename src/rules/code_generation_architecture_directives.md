# Code Generation & Architecture Directives

## Primary Mandate

All code generation, system design, and refactoring tasks must strictly adhere to the foundational software engineering principles outlined below.

---

# FOUNDATIONAL PILLARS (SYSTEM DIRECTIVES)

## Part 1: Core Engineering Principles

1. **SOLID Compliance:** Adhere to Single Responsibility (SRP), Open-Closed (OCP), Liskov Substitution (LSP), Interface Segregation (ISP), and Dependency Inversion (DIP).
2. **DRY (Don't Repeat Yourself):** Abstract redundant logic and hardcoded values into single authoritative sources of truth.
3. **KISS (Keep It Simple, Stupid):** Prioritize cognitive simplicity and readable execution over convoluted patterns.
4. **SoC (Separation of Concerns):** Strictly isolate distinct behaviors (state, UI, data) to prevent cross-domain interference.
5. **YAGNI (You Aren't Gonna Need It):** Avoid speculative engineering; build only what is explicitly required.
6. **Law of Demeter:** Enforce strict encapsulation; modules must only interact with immediate dependencies.
7. **Concurrency & Immutability:** Default to immutable data structures. Maximize pure functions for inherently safe, thread-friendly concurrent execution.
8. **Composition Over Inheritance:** Compose smaller independent interfaces for reuse to avoid fragile base classes and rigid hierarchies.
9. **Domain-Driven Design (DDD):** Use business "Ubiquitous Language" for naming. Group modules by business capability (e.g., `Billing`), not technical layers.

## Part 2: Resilience & Security

10. **Defensive Programming:** Anticipate anomalies; systematically validate boundaries, inputs, and API responses. Explicitly handle edge cases, nulls, and timeouts.
11. **Fail-Fast & FEAR:** Throw explicit exceptions immediately upon detecting invalid states. Halt execution to prevent corrupted data from propagating.
12. **Security & Privacy by Design:** Implement Zero Trust and Least Privilege. Strictly sanitize all inputs to prevent injection attacks. Opt for the most restrictive secure defaults.

## Part 3: Cloud-Native Architecture & Data Systems

13. **Cloud-Native & 12-Factor:** Externalize configurations via environment variables. Design stateless, disposable processes. Ensure graceful startup and shutdown (e.g., intercepting SIGTERM).
14. **Distributed Resilience & Idempotency:** Ensure mutative operations are safely retriable. Wrap external calls with Circuit Breakers, Exponential Backoff, and Timeouts.
15. **Data Management:** Ensure ACID compliance for relational databases via explicit transaction blocks. Design distributed/NoSQL networks for Eventual Consistency (BASE).
16. **Caching:** Implement strict TTLs and explicit invalidation strategies. Never cache highly volatile transactional data without real-time invalidation.
17. **Performance & Async I/O:** Mandate non-blocking I/O. Use connection pools for DBs/networks. Prioritize Big-O efficiency and batch operations to avoid N+1 queries.
18. **Everything as Code:** Fully codify infrastructure (IaC), CI/CD, and configurations to ensure strictly reproducible, version-controlled environments.

## Part 4: Observability, Quality & Evolution

19. **Structured Logging:** Emit canonical wide events (JSON/logfmt) upon transaction termination. Propagate unique `request_id`s across boundaries. Safely serialize exceptions. Standardize measurement units and strictly mask PII/PHI.
20. **Testing & QA:** Design for testability using Dependency Injection. Focus coverage on critical business logic and failure modes. Ensure automated, deterministic testing.
21. **Documentation:** Comment the *why*, not the *what*. Use standard docstrings for public APIs. Document architectural shifts via Architectural Decision Records (ADRs).
22. **API Contracts:** Communicate via strict, version-controlled schemas (OpenAPI/gRPC). Standardize HTTP methods and use machine-readable error formats (RFC 7807).
23. **Evolutionary Architecture:** Adhere to Semantic Versioning. Favor graceful deprecation via sunset schedules over abrupt breaking changes.
24. **Continuous Refactoring:** Follow the Boy Scout Rule (leave code better than you found it). Incrementally resolve technical debt during feature work.

## Part 5: Context & Ecosystem

25. **Green Software Engineering:** Minimize carbon footprint (e.g., event-driven over polling, optimizing wire payloads). Schedule heavy batch jobs during periods of high grid-renewable energy when possible.
26. **2026 Ecosystem & Empirical Verification:** Proactively cross-reference methodologies with 2026 state-of-the-art practices and empirical data to strictly prevent AI hallucination.
