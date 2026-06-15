---
name: resilience-and-security-auditing
description: Conducts security audits and resilience checks. Use when evaluating security, input sanitization, threat modeling, thread safety, or network fault tolerance.
---

# Resilience and Security Auditing

This skill orchestrates a comprehensive audit of code focusing strictly on security, concurrency, data boundaries, and distributed systems resilience.

## When to Use

- **Use when** handling user input, authentication, or authorization.
- **Use when** evaluating thread safety and concurrency models.
- **Use when** designing or modifying distributed/network systems.
- **NOT for** functional QA testing or visual UI reviews.

## Core Process

### Phase 1: Security & Defensive Programming
- **Zero Trust Boundaries**: Assume all inputs are malicious. Validate types, lengths, and formats.
- **Least Privilege**: Ensure the process runs with the minimum permissions required.
- **Input Sanitization**: Specifically test for SQLi, XSS, and path traversal vulnerabilities.
- **Fail-Fast (FEAR)**: Throw explicit exceptions upon detecting invalid states immediately; do not attempt to silently recover corrupt state.

### Phase 2: Resilience & Network Robustness
- **Idempotency**: Verify that mutative operations can be retried safely without side effects.
- **Circuit Breakers**: Ensure external API calls are wrapped in circuit breakers with timeouts and exponential backoff.
- **Timeouts**: No network call should execute indefinitely.

### Phase 3: Concurrency Safety
- **Immutability**: Assert that shared data structures default to immutable.
- **Pure Functions**: Verify that concurrent executions do not mutate shared state without strict thread safety.

## Common Rationalizations

| Rationalization | Reality |
|---|---|
| "This input comes from our frontend, it's safe." | Frontend validation is purely cosmetic. The backend must enforce Zero Trust and re-validate everything. |
| "A timeout isn't necessary, the internal service is fast." | Internal networks partition and stall. Missing timeouts lead to catastrophic thread exhaustion. |
| "I'll sanitize inputs later." | Security cannot be bolted on. Inputs must be sanitized at the boundary layer. |

## Red Flags

- Network requests (`fetch`, `axios`, DB drivers) without explicit timeout arguments.
- Mutable shared state in highly concurrent contexts.
- Controller/API endpoints that blindly pass raw request bodies to the database layer.

## Verification

Before passing the security audit, verify:
- [ ] All external dependencies and API calls possess explicit timeouts and retry mechanisms.
- [ ] User input boundaries perform explicit type and schema validation.
- [ ] Critical state updates are idempotent.
- [ ] Execution halts immediately (`throw`) upon detecting an invalid state.
