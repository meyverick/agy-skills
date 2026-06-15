---
name: architectural-alignment-validation
description: Evaluates and validates codebase architectural structure. Use when auditing SOLID, DRY, Demeter, or DDD decoupling principles.
---

# Architectural Alignment Validation

This skill enforces strict, mathematically verifiable adherence to software architecture principles (SOLID, DDD, SoC). It prevents technical debt accumulation by auditing boundary isolation.

## When to Use

- **Use when** reviewing pull requests or major feature additions.
- **Use when** mapping out a codebase refactoring plan.
- **NOT for** debating purely stylistic formatting preferences (like tabs vs spaces).

## Core Process

### Phase 1: The SOLID Audit
- **SRP**: Scan for God Classes (files > 500 lines or > 3 distinct responsibilities).
- **OCP**: Ensure new features extend existing interfaces rather than modifying core logic.
- **DIP**: Ensure high-level business logic depends on abstractions (Interfaces), never concrete database or UI implementations.

### Phase 2: Domain-Driven Design (DDD) Boundaries
- Group folders by business capability (`/billing`, `/user-management`), NOT by technical type (`/controllers`, `/models`).
- Ensure no domain module imports directly from another domain module's internal files. They must only interact through explicit exported interfaces (`index.ts` facades).

### Phase 3: Demeter & Coupling Checks
- Scan for Law of Demeter violations: `user.getAccount().getPlan().getLimits()`.
- Force the implementation of proxy methods on the immediate dependency.

## Common Rationalizations

| Rationalization | Reality |
|---|---|
| "It's a small app, we don't need DDD folder structures." | All apps grow. Organizing by technical type (`/models`) guarantees a tangled monolith. Enforce domain boundaries early. |
| "I'll just inject the Database instance directly into the UI controller." | Violates Dependency Inversion. The UI controller must rely on a `Repository` interface to allow unit testing. |

## Red Flags

- Files acting as "Managers" or "Handlers" with thousands of lines of mixed logic.
- Deeply chained object property accesses across module boundaries.

## Verification

Before finalizing the architectural validation:
- [ ] No module reaches deep into the internal directory of another module.
- [ ] Business logic layers are entirely devoid of SQL or HTTP specific code.
- [ ] Files adhere to strict Single Responsibility (typically < 300 lines).