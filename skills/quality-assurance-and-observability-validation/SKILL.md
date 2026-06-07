---
name: quality-assurance-and-observability-validation
description: Enforces structured JSON logging, test suites, API schema contracts, semantic versioning checks, and Architectural Decision Records (ADRs). Activate this skill when writing/updating unit tests, setting up logging systems, reviewing OpenAPI/gRPC schemas, checking for breaking changes, or compiling system documentation.
license: Apache-2.0
compatibility: Requires Python 3.10+ to execute validation scripts, workspace access, and optional tool dependencies (e.g., Pytest, Spectral, or Structlog).
---

# Quality Assurance and Observability Validation

This skill enforces structured logging, robust testing and QA practices, API contract compliance, Semantic Versioning, and architectural documentation standards (ADRs).

## Activation Criteria

Use this skill when:

- Designing or modifying API endpoints and schemas (OpenAPI, gRPC, Protobuf).
- Implementing loggers, diagnostic tracing, or error boundaries in application code.
- Writing unit, integration, or end-to-end (E2E) tests.
- Proposing structural design shifts or technical stack changes requiring an Architectural Decision Record (ADR).
- Managing package releases, adjusting version numbers, or introducing API deprecation schedules.

## Core Pillars & Audit Protocols

### 1. Structured Logging & Diagnostics

- **Format:** Ensure logs are emitted as canonical, single-line JSON or logfmt events upon transaction termination.
- **Tracing Context:** Propagate a unique correlation identifier (e.g., `request_id` or `correlation_id`) across system boundaries.
- **Telemetry Safety:** Identify and mask all PII (Personally Identifiable Information) and PHI (Protected Health Information) from logs. Ensure exceptions are safely serialized without exposing raw directory paths, local environment values, or raw memory locations.

### 2. Testing & Quality Assurance

- **Dependency Injection (DI):** Confirm that classes and functions accept abstract dependencies or interfaces to enable mocking.
- **Robust Failure Modes:** Ensure test suites cover boundary values, network timeouts, database connection losses, and input validation failures, rather than only testing success paths.
- **Deterministic Runs:** Prevent flaky tests. External API endpoints must be stubbed or mocked. System-time dependencies should utilize frozen-time providers.

### 3. Documentation & ADRs

- **The "Why" Rule:** Ensure comments document the rationale behind complex operations or workarounds, not merely what the syntax does.
- **Architectural Decision Records (ADRs):** Document significant architectural or technology stack shifts using a version-controlled markdown ADR template.

### 4. API Contracts (API Schema Compliance)

- **Schema Validation:** Define strict API models using OpenAPI (Swagger) or Protobuf/gRPC schemas.
- **Standardized Methods:** Align operations with standard HTTP methods and standard response codes (e.g., 200/201 for success, 400 for validation, 404 for missing resources).
- **Error Formatting:** Return machine-readable, standardized error responses following RFC 7807 (Problem Details for HTTP APIs), verifying fields like `type`, `title`, `status`, `detail`, and `instance`.

### 5. Evolutionary Architecture & Semantic Versioning

- **Semantic Versioning (SemVer):** Strictly follow `MAJOR.MINOR.PATCH` rules based on changes introduced.
- **Graceful Deprecation:** Check for Sunset headers or clear deprecation comments before removing or changing legacy endpoints abruptly.

---

## Step-by-Step Audit Procedure

### Phase 1: Ingestion & Environment Context

1. **Identify Test Suites & Tooling:** Locate testing frameworks (e.g., `pytest.ini`, `jest.config.js`) and log configuration files.
2. **Review API Contracts:** Access OpenAPI schemas (`openapi.yaml`) or proto files (`*.proto`).
3. **Execute Static Scans:** If available, run contract linters (e.g., `spectral lint openapi.yaml`) or check test coverage metrics.

### Phase 2: Audit Checklist & Severity Assessment
Evaluate the codebase and categorize findings into **BLOCKING** or **ADVISORY**:

- **BLOCKING Violations (Must resolve before deployment):**
  - [ ] **Unstructured Logging:** Are logging systems using raw string interpolation (e.g., `logger.info(f"User {id} saved")`) instead of structured JSON fields? (Pillar 19)
  - [ ] **PII/PHI Exposure:** Are raw passwords, secrets, credit card numbers, or physical addresses written directly to log streams without masking or filtering middleware? (Pillar 19)
  - [ ] **Non-Deterministic Tests:** Do tests connect to external live APIs, write to shared local environments, or rely on mutable system-time functions without mocking? (Pillar 20)
  - [ ] **SemVer Breaking Changes:** Are breaking API changes introduced in minor or patch releases without a major version bump or a documented deprecation schedule? (Pillar 23)
  - [ ] **Generic API Errors:** Do API error handlers return plain text or raw 500 stack traces instead of the standardized RFC 7807 JSON format? (Pillar 22)
- **ADVISORY Violations (Recommend resolving to improve testability and documentation):**
  - [ ] **Missing Dependency Injection:** Are database clients or HTTP connectors hardcoded inside business services instead of injected, preventing unit testing? (Pillar 20)
  - [ ] **Redundant Code Comments:** Do comments describe the obvious syntax operations rather than documenting the "Why" behind design decisions? (Pillar 21)
  - [ ] **Undocumented Key Decisions:** Were major tech stacks or structural changes introduced without a corresponding Architectural Decision Record (ADR)? (Pillar 21)

---

## Output Format

Your final report must follow this markdown structure:

```markdown
# QA & Observability Audit Report

## Audit Overview

[Provide a brief, objective summary of test coverage status, logging configurations, schema validations, and static analysis outputs if available]

## Findings & Recommendations

### [Finding Name, e.g., Unstructured Logging in API Handlers] - **[BLOCKING / ADVISORY]**

- **Target File/Interface:** `path/to/file.ts:L34-45`
- **Description of Lack:** [Explain why this violates testing, telemetry safety, or contract standards]
- **Resolution:** [Provide explicit steps to implement structured formats, mocks, or schemas]
- **Refactored Code Example:**

```typescript
// Insert correct implementation here
```
```
