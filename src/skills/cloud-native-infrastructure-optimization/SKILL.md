---
name: cloud-native-infrastructure-optimization
description: Validates and optimizes Twelve-Factor app configurations, database operations, cache TTLs, asynchronous I/O architectures, IaC scripts, and green software alignment. Activate this skill when configuring deployments, optimizing queries (preventing N+1 queries), defining caching strategies, checking Docker/Kubernetes/IaC code, or analyzing resource usage.
license: Apache-2.0
compatibility: Requires Python 3.10+ to execute validation scripts, workspace access, and optional CLI linter dependencies (e.g., Hadolint, TFlint, Checkov).
---

# Cloud-Native Infrastructure Optimization

This skill enforces Twelve-Factor App compliance, non-blocking I/O, database efficiency (preventing N+1 query patterns), caching policies, Infrastructure as Code (IaC) standards, and Green Software Engineering.

## Activation Criteria

Use this skill when:

- Designing database schemas, writing queries, ORM configurations, or database transactions.
- Designing API endpoints, response payloads, or wire formats.
- Configuring caching networks (e.g., Redis, Memcached) or defining cache eviction policies.
- Modifying Dockerfiles, Kubernetes manifests, Terraform configurations, or CI/CD pipelines.
- Auditing applications for memory, CPU usage, or network utilization (energy efficiency).

## Core Pillars & Audit Protocols

### 1. Cloud-Native & Twelve-Factor Methodology

- **Config:** Store configurations, secrets, and backing service credentials strictly in environment variables (never hardcoded in application repositories).
- **Processes:** Design applications as stateless, share-nothing processes. Persistent state must reside in managed backing services (databases, queues, object stores).
- **Disposability:** Ensure rapid startup and graceful shutdown. Application processes must intercept termination signals (`SIGTERM`, `SIGINT`) to finish active requests, flush transaction buffers, and close database connections cleanly.

### 2. Data Management & Performance Tuning

- **Relational Databases (ACID):** Ensure mutative operations are enclosed in explicit database transactions. Verify that connection pools are properly configured.
- **N+1 Query Prevention:** Identify nested loops executing database calls. Force the use of eager loading (e.g., SQL `JOIN`s, Django's `select_related`/`prefetch_related`, SQLAlchemy's `joinedload`, or Node's `populate`).
- **Asynchronous I/O:** Enforce non-blocking, asynchronous execution patterns for high-concurrency I/O workloads (e.g., network calls, external APIs).

### 3. Caching Strategies

- **Explicit TTLs (Time-To-Live):** Ensure cached items have explicit expiration windows to avoid memory bloating.
- **Invalidation Policies:** Match volatility to policy (e.g., write-through, write-behind, or event-driven invalidation). Highly volatile transactional data must not be cached without real-time invalidation handlers.

### 4. Everything as Code (IaC)

- Ensure container builds utilize multi-stage pipelines to minimize image sizes, reduce the attack surface, and exclude build-time dependencies.
- Verify infrastructure scripts utilize locked/pinned provider and module versions.

### 5. Green Software Engineering (Carbon & Energy Efficiency)

- **Payload Minimization:** Enforce pagination, compression (gzip/brotli), and efficient wire formats (Protobuf, gRPC) for high-traffic endpoints.
- **Event-Driven Patterns:** Favor webhooks, pub/sub, or message brokers over active polling architectures to minimize idle CPU overhead.
- **Green Scheduling:** Ensure heavy batch, analytic, or training tasks are designed to support time-shifting (allowing execution during peak renewable grid-energy periods).

---

## Step-by-Step Audit Procedure

### Phase 1: Context & Infrastructure Ingestion

1. **Identify Infrastructure Code:** Locate files like `Dockerfile`, `docker-compose.yml`, `Chart.yaml`, or `.tf` files.
2. **Identify Query Boundaries:** Map code paths interacting with ORMs, SQL queries, or third-party HTTP clients.
3. **Execute Static Linters:** If available, run static tools (e.g., `hadolint` for Dockerfiles, `tflint` or `checkov` for Terraform, `pylint-django` for database query validation) and ingest their outputs.

### Phase 2: Audit Checklist & Severity Assessment

Categorize findings into **BLOCKING** or **ADVISORY**:

- **BLOCKING Violations (Must resolve before deployment):**
  - [ ] **Hardcoded Secrets:** Are access tokens, passwords, or encryption keys hardcoded inside the repository or configuration files? (Pillar 13)
  - [ ] **N+1 Queries:** Do database queries execute inside code loops without eager loading? (Pillar 17)
  - [ ] **Missing Database Transactions:** Are mutative operations executing outside explicit transactions? (Pillar 15)
  - [ ] **Missing TTLs:** Is volatile data cached without an explicit Time-To-Live or eviction strategy? (Pillar 16)
  - [ ] **Lack of Signal Handlers:** Does the application lack code handling `SIGTERM`/`SIGINT` for graceful shutdown? (Pillar 13)
- **ADVISORY Violations (Recommend resolving to improve performance and efficiency):**
  - [ ] **Heavy Base Containers:** Does the Dockerfile pull from large, non-minimal images instead of `alpine` or `distroless` images? (Pillar 18)
  - [ ] **Sync Calls in Async Runtimes:** Are blocking operations used inside synchronous runtimes handling concurrent web requests? (Pillar 17)
  - [ ] **Active Polling:** Is the application using short-interval HTTP polling instead of webhooks or web sockets? (Pillar 25)
  - [ ] **Lack of Compression:** Are high-volume API payloads returned uncompressed or missing pagination limits? (Pillar 25)

---

## Output Format

Your final report must follow this markdown structure:

```markdown
# Infrastructure & Performance Optimization Report

## Optimization Overview

[Provide a brief, objective overview of configuration, query performance, and green metrics analyzed, including any static analysis tool outputs]

## Optimization Opportunities

### [Opportunity Name, e.g., N+1 Query Elimination in User Fetching] - **[BLOCKING / ADVISORY]**

- **Target File/Asset:** `path/to/repository/queries.py`
- **Current Issue:** [Explain the performance, scalability, or deployment limitation]
- **Recommended Action:** [E.g., modify to use select_related, prefetch_related, or minimize base image layers]
- **Refactored Code / Configuration:**

```python
# Insert optimized implementation or configuration block here
```
```