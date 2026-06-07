---
name: architectural-alignment-validation
description: Evaluates and validates codebase architectural structure, code design, and decoupling principles. Activate this skill when writing, reviewing, or refactoring codebase layout, module structures, interface boundaries, and class design. It covers SOLID, DRY, KISS, Separation of Concerns (SoC), YAGNI, Law of Demeter, Composition, Domain-Driven Design (DDD), and Continuous Refactoring.
license: Apache-2.0
compatibility: Requires Python 3.10+ to execute validation scripts, abstract syntax tree (AST) parsers, and workspace access.
---

# Architectural Alignment Validation

This skill enforces high-quality software engineering principles, structural cleanliness, and domain-driven design alignment in codebases.

## Activation Criteria

Use this skill when:

- Designing new modules, classes, interfaces, or folder structures.
- Reviewing pull requests or existing code for code smells, high coupling, or rule violations.
- Refactoring complex or legacy components to improve maintainability.
- Making architectural decisions regarding encapsulation, inheritance, or abstraction layers.

## Core Pillars & Audit Protocols

### 1. SOLID Compliance

- **Single Responsibility Principle (SRP):** Verify that every class, function, or module has exactly one reason to change. Split modules that combine distinct responsibilities (e.g., business logic mixed with database transactions).
- **Open-Closed Principle (OCP):** Ensure code is open for extension but closed for modification. Prefer polymorphism, interfaces, abstract classes, or callbacks over hardcoded type-checking switch/if-else blocks.
- **Liskov Substitution Principle (LSP):** Subtypes must be substitutable for their base types without altering program correctness. Ensure subclasses do not weaken preconditions or strengthen postconditions.
- **Interface Segregation Principle (ISP):** Prefer small, client-specific interfaces over large, general-purpose ones. Prevent clients from depending on methods they do not use.
- **Dependency Inversion Principle (DIP):** Depend on abstractions, not concretions. Inject dependencies via constructors or factories.

### 2. DRY (Don't Repeat Yourself) & KISS (Keep It Simple, Stupid)

- **DRY:** Consolidate duplicated logic into reusable components or helper libraries to establish a single source of truth.
- **KISS:** Choose direct, readable code structures over clever, convoluted patterns. Do not introduce abstractions prematurely.

### 3. Separation of Concerns (SoC) & Law of Demeter

- **SoC:** Isolate state management, business rules, presentation (UI), and data access into distinct layers or modules.
- **Law of Demeter (Least Knowledge):** A module should interact only with its immediate neighbors. Avoid deep nested navigation chains (e.g., `customer.getInvoice().getAddress().getZipCode()`).

### 4. Composition Over Inheritance & YAGNI

- **Composition Over Inheritance:** Avoid deep class hierarchies. Compose smaller, independent components to build complex behaviors.
- **YAGNI (You Aren't Gonna Need It):** Do not write code or abstractions for hypothetical future features. Build only what is requested by the current requirements.

### 5. Domain-Driven Design (DDD)

- **Ubiquitous Language:** Align class names, variables, and function names directly with the business domain terminology.
- **Bounded Contexts:** Group code by business capability (e.g., `billing`, `shipping`, `catalog`) rather than technical layers (e.g., `controllers`, `services`, `models`).

---

## Step-by-Step Audit Procedure

### Phase 1: Context Gathering & Input Verification

1. **Identify Target Files:** Locate the specific modules, files, or directories to be analyzed.
2. **Determine Language & Paradigm:** Adjust expectations based on the programming language (e.g., dynamic typing in Python versus static typing in Go or TypeScript).
3. **Run Static Diagnostics:** If available, run static analysis tools (e.g., AST parsers, `radon` for complexity, or `pylint`) to gather objective metrics such as line count and complexity scores.

### Phase 2: Analysis & Code Smell Detection

Evaluate the target code against the following checks. Categorize findings as **BLOCKING** or **ADVISORY**:

- **BLOCKING Violations (Must resolve before merging):**
  - [ ] **SRP:** Does a module or class combine multiple domain responsibilities (e.g., business rules mixed with HTTP client instantiation or DB queries)? (DIP/SRP violation)
  - [ ] **LSP:** Do subclasses throw `NotImplementedError`, return null/empty values unexpectedly, or alter base-class method signatures? (LSP violation)
  - [ ] **ISP:** Are clients forced to implement interface methods they do not use? (ISP violation)
  - [ ] **DRY:** Is identical business logic repeated across multiple core files? (DRY violation)
- **ADVISORY Violations (Recommend resolving if it does not violate KISS/YAGNI):**
  - [ ] **Law of Demeter:** Are classes navigating nested relationships to retrieve data? (Demeter violation; evaluate if a delegation method simplifies readability)
  - [ ] **Size Metrics:** Does a single function exceed 50 lines or a class exceed 300 lines? (Possible SRP indicator)
  - [ ] **KISS/YAGNI:** Is the design over-abstracted for the current requirements? (Possible over-engineering)

### Phase 3: Remediation & Continuous Refactoring

- Adhere to the **Boy Scout Rule**: always leave code better than you found it.
- Draft refactoring suggestions with clear, reproducible code blocks.
- If a proposed change alters the broader architecture, document the decision using an Architectural Decision Record (ADR) format.

---

## Output Format

Your final report must follow this markdown structure:

```markdown
# Architectural Alignment Assessment

## Summary of Findings
[Provide a brief, objective overview of the module health, coupling level, and static complexity metrics if available]

## Violations & Issues

### [Pillar Name, e.g., Single Responsibility Principle (SRP)] - **[BLOCKING / ADVISORY]**

- **Location:** `file_path.py:L12-45`
- **Description:** [Explain why this code violates the design principle]
- **Remediation:** [Explain how to restructure the code to resolve the issue]

## Refactoring Proposal

[Include step-by-step instructions. Provide the proposed changes using Unified Diff format or Before/After code blocks to ensure they can be applied cleanly]

### Proposed Code Changes

```python
# Before (Line Reference or Brief Snippet)
...
# After
...
```
```