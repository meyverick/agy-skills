---
name: quality-assurance-and-observability-validation
description: Validates testing, logging, and observability standards. Use when writing tests, setting up logging systems, reviewing API schemas, or compiling system documentation.
---

# Quality Assurance & Observability Validation

This skill ensures software artifacts meet stringent testing and observability standards, focusing on structured logging, determinism via Dependency Injection, and strict API schemas.

## When to Use

- **Use when** writing or updating unit and integration tests.
- **Use when** configuring logging, telemetry, or tracing systems.
- **Use when** reviewing OpenAPI/gRPC schemas for breaking changes.
- **Use when** documenting architectural decisions (ADRs).
- **NOT for** generic code linting or syntax formatting.

## Core Process

### Phase 1: Test Strategy & Determinism
Ensure all tests are strictly deterministic. Avoid side-effects.
- **Dependency Injection**: Verify components accept dependencies rather than instantiating them, allowing for clean mocks.
- **Coverage**: Target critical business logic and explicit failure modes over arbitrary coverage percentages.

### Phase 2: Telemetry & Observability
Ensure the system emits actionable, canonical wide events.
- **Structured JSON/logfmt**: Verify logs are structured and queryable.
- **Request Tracing**: Ensure `request_id` propagates across all network boundaries.
- **GDPR Compliance**: Assert that all PII/PHI fields are strictly masked or redacted in logs.

### Phase 3: Contract Verification
- **API Schemas**: Verify OpenAPI/gRPC schemas for strict types.
- **Semantic Versioning**: Assert changes gracefully handle deprecation via SemVer, preferring sunset schedules over breaking changes.

## Common Rationalizations

| Rationalization | Reality |
|---|---|
| "I'll add the tests later." | Tests are the proof of implementation. Code without tests is prototype code. |
| "A simple console log is fine for this feature." | Observability requires structured telemetry. Plain text logs cannot be easily aggregated or alerted on. |
| "We don't need a `request_id` because the system is small." | All systems grow. Tracing must be foundational, not retrofitted. |

## Red Flags

- Tests containing `setTimeout` or arbitrary sleeps instead of deterministic mocks.
- Logs emitting unstructured strings (`console.log("user did a thing")`).
- Breaking changes to public schemas without bumping major SemVer.

## Verification

Before concluding the QA validation, verify:
- [ ] Tests execute deterministically without flakes.
- [ ] Logs are structured JSON and `request_id` is propagated.
- [ ] PII is demonstrably masked in logging payloads.
- [ ] API schema changes pass backward compatibility checks.
