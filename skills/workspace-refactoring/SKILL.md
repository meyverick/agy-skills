---
name: workspace-refactoring
description: Conducts autonomous, full-workspace structural refactoring. Use when auditing architecture, combating technical debt, or enforcing SOLID principles globally.
---

# Workspace Refactoring

This skill guides the agent through an autonomous architectural audit and execution of structural refactoring. It enforces code quality improvements without altering the overarching business logic behavior.

## When to Use

- **Use when** paying down technical debt.
- **Use when** auditing the codebase against SOLID, DRY, and KISS principles.
- **Use when** migrating legacy file structures to Domain-Driven Design (DDD) module layouts.
- **NOT for** adding net-new business features.

## Core Process

### Phase 1: Architectural Audit
Examine the workspace to identify violations of the Foundational Pillars.
- **SRP Violations**: Look for "God classes" or files exceeding 500 lines.
- **Demeter Violations**: Look for deeply chained method calls (`a.b().c().d()`).
- **DRY Violations**: Look for copy-pasted configuration logic.

### Phase 2: Define Refactoring Scope
Refactoring must be bounded. 
- Target a specific module or specific principle (e.g., "Extracting data access logic from the UI layer").
- Do not attempt to rewrite the entire application in one pass.

### Phase 3: The Boy Scout Execution
"Leave the code better than you found it."
- Apply incremental changes.
- If applying Dependency Inversion, define the Interface first, then implement it.
- Ensure strict test coverage exists *before* modifying the core logic. 

### Phase 4: Validation
Refactoring alters structure, not behavior.
- Ensure the test suite passes perfectly after the changes.

## Common Rationalizations

| Rationalization | Reality |
|---|---|
| "I'll just rewrite this whole file from scratch, it's easier." | Rewrites introduce massive regressions. Refactoring is defined by *incremental, behavior-preserving* modifications. |
| "I don't have tests, but I'm sure this refactor is safe." | Refactoring without a test harness is just guessing. Write the tests first. |
| "It works, so I shouldn't touch it." | Code rots. Continuous application of the Boy Scout Rule is required to maintain velocity. |

## Red Flags

- Refactoring PRs that also sneak in new features.
- Massive single commits deleting and adding thousands of lines without tests.
- "Refactoring" that actually changes the system's observable outputs or API schema unexpectedly.

## Verification

Before finalizing the refactoring session, verify:
- [ ] The architectural change aligns with SOLID or DDD principles.
- [ ] Existing functionality remains entirely unchanged (100% test pass rate).
- [ ] Code complexity metrics (e.g., line count, cyclomatic complexity) have demonstrably decreased.
