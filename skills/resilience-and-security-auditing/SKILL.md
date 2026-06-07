---
name: resilience-and-security-auditing
description: Conducts security audits, threat modeling, error-path validation, concurrency checks, and distributed systems resilience checks. Activate this skill when evaluating codebase security, input sanitization, error propagation, thread safety, or network fault tolerance. Matches queries about security, defensive programming, fail-fast, concurrency, immutability, idempotency, or circuit breakers.
license: Apache-2.0
compatibility: Requires Python 3.10+ to execute validation scripts, workspace access, and optional security scan tools (e.g., Bandit, Semgrep, or Pip-audit).
---

# Resilience and Security Auditing

This skill enforces defensive coding practices, input validation, robust error handling, concurrency safety, and distributed system resilience.

## Activation Criteria

Use this skill when:

- Designing API endpoints, database interactions, or external service integrations.
- Reviewing error-handling logic, try-catch blocks, and exception raising.
- Auditing multi-threaded, asynchronous, or concurrent execution pathways.
- Reviewing distributed system interactions (retries, timeouts, fallback strategies).
- Investigating potential security vulnerabilities, data leaks, or input injection vectors.

## Core Pillars & Audit Protocols

### 1. Defensive Programming & Zero Trust

- **Input Validation:** Validate boundaries, schemas, patterns, and payload sizes at the outermost boundary (e.g., API gateway, controller, middleware) before routing to internal layers.
- **Sanitization:** Strictly escape or sanitize inputs to prevent SQL Injection, Command Injection, Cross-Site Scripting (XSS), and Path Traversal. Use parameterized queries exclusively.
- **Least Privilege & Secure Defaults:** Restrict permissions, file handles, and database connections to the minimum required. Default to secure configurations.

### 2. Fail-Fast & FEAR (Fail Early, Assert Relentlessly)

- **Immediate Termination:** Throw descriptive, strongly-typed exceptions immediately upon detecting invalid parameters or inconsistent state.
- **Prevent Data Corruption:** Halt execution immediately if placeholder or corrupted data is detected. Prevent corrupt states from propagating to relational databases or persistent storage.

### 3. Concurrency, Immutability & Thread Safety

- **Immutable Structures:** Default to read-only/immutable variables and data structures to eliminate race conditions.
- **Pure Functions:** Maximize pure functions (no side effects, deterministic output for the same input) to guarantee safe concurrent execution.
- **Race Condition Prevention:** Verify correct usage of thread-safe collections, locks, semaphores, or atomic operations when shared mutable state is unavoidable.

### 4. Distributed Resilience & Idempotency

- **Resilient Network Calls:** Wrap all external API and network requests with:
  - **Timeouts:** Avoid infinite hangs; define strict connection and read timeouts.
  - **Exponential Backoff with Jitter:** Ensure retries have increasing delays and randomized jitter to prevent overwhelming downstream services.
  - **Circuit Breakers:** Fail fast when a dependency is down, preventing resource exhaustion (e.g., thread pools, memory).
- **Idempotency:** Ensure mutative operations (e.g., payments, database creations) can be safely retried. Verify the presence of idempotency keys and state guards before executing mutations.

---

## Step-by-Step Audit Procedure

### Phase 1: Context & Security Analysis

1. **Identify External Boundaries:** Map all external dependencies, third-party APIs, database connections, and user input entry points.
2. **Review Concurrent Paths:** Map threads, asynchronous processes, or tasks accessing shared memory.
3. **Ingest Security Scans:** If available, run static security analysis tools (such as `bandit`, `semgrep`, or dependency checkers) and analyze their warnings.

### Phase 2: Audit Checklist & Severity Assessment

Evaluate the codebase and categorize findings into **BLOCKING** or **ADVISORY**:

- **BLOCKING Violations (Must resolve before deployment):**
  - [ ] **Raw Parameter Injection:** Are raw string concatenations used in SQL statements, shell execution, or HTML generation instead of parameterized/escaped bindings? (Pillar 12)
  - [ ] **Missing Input Validation:** Are external inputs accepted without boundary, schema, or type validation? (Pillar 10)
  - [ ] **Swallowed Exceptions:** Are raw exceptions caught and ignored (e.g., `except Exception: pass` or empty catch blocks) without logging or rethrowing? (Pillar 11)
  - [ ] **Missing Network Timeouts:** Do external API or database calls lack explicit timeout parameters? (Pillar 14)
  - [ ] **Non-Idempotent Mutations:** Do mutative endpoints (e.g., financial transactions, asset creation) lack idempotency keys or state verification guards? (Pillar 14)
  - [ ] **Thread-Safety Hazards:** Is shared mutable state accessed by concurrent processes without locks, synchronization barriers, or thread-safe atomic types? (Pillar 7)

- **ADVISORY Violations (Recommend resolving to improve robust operations):**
  - [ ] **Custom Resiliency Code:** Are retries and backoffs rolled manually using loops rather than standardized, proven libraries (e.g., `tenacity` or `backoff`)? (Pillar 14)
  - [ ] **Vulnerable Third-Party Dependencies:** Are dependencies flagged by package vulnerability scanners present in the environment? (Pillar 12)
  - [ ] **Verbose Error Messages:** Do error payloads return raw system stack traces, paths, or database schemas to end-users? (Pillar 12)

---

## Output Format

Your final report must follow this markdown structure:

```markdown
# Resilience & Security Audit Report

## Audit Summary

[Provide a brief, objective overview of the component's security posture, resilience characteristics, and static security scanner findings if available]

## Findings & Recommendations

### [Finding Name, e.g., Unparameterized SQL Query] - **[BLOCKING / ADVISORY]**

- **Location:** `path/to/file.py:L142-L148`
- **Description:** [Explain the exact vulnerability or resilience risk and how it impacts operations]
- **Remediation:** [Provide exact, step-by-step instructions to secure or stabilize the path]
- **Refactored Code:**

```python
# Insert secure/resilient implementation here
```
```
