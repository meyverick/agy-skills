---
name: encore-ts-backend-engineering
description: Engineers type-safe backend microservices using Encore.ts. Use when orchestrating declarative architectures and infrastructure-from-code topologies.
---

# Encore.ts Backend Engineering

This skill manages the creation of distributed, type-safe backends using Encore.ts. It enforces strict Infrastructure-from-Code (IfC) paradigms, ensuring that architecture and deployment topologies are inferred directly from TypeScript code.

## When to Use

- **Use when** creating new backend services or RPC endpoints using Encore.ts.
- **Use when** defining declarative infrastructure (Databases, Pub/Sub, Cron jobs).
- **NOT for** modifying traditional Express.js or NestJS APIs.

## Core Process

### Phase 1: API Endpoint Definition
- Define API contracts directly via exported functions wrapped in `api()`.
- Ensure request/response schemas are heavily typed with explicit interfaces.
- Do not write manual OpenAPI schemas; Encore infers them from the TypeScript AST.

### Phase 2: Declarative Infrastructure
Never manually provision databases or queues in an external console or IaC tool (like Terraform) if Encore supports it natively.
- Use `import { SQLDatabase } from "encore.dev/storage/sqldb"` for databases.
- Use `import { Topic, Subscription } from "encore.dev/pubsub"` for event-driven boundaries.
- Ensure all resources are bound directly to the code that utilizes them.

### Phase 3: Service Communication
- Services must communicate via strictly typed, native function calls (e.g., `serviceA.endpointB()`).
- Do not hardcode URLs or manual `fetch` calls to communicate between internal Encore services.

## Common Rationalizations

| Rationalization | Reality |
|---|---|
| "I'll just define the Postgres database manually in AWS." | Encore's Infrastructure-from-Code automatically handles local, testing, and production provisioning. Manual IaC splits the truth. |
| "I'll write an Express middleware for this validation." | Encore handles request validation at the compile-time schema level. Standard middleware paradigms often bypass these guarantees. |

## Red Flags

- Manual HTTP `fetch` requests pointing to internal cluster services.
- Creating resources in cloud consoles instead of utilizing `encore.dev/storage/sqldb`.
- Hand-written OpenAPI/Swagger definitions.

## Verification

Before finalizing the Encore service, verify:
- [ ] All APIs are wrapped in the `api()` directive with strict TypeScript interfaces.
- [ ] Infrastructure (DBs, PubSub) is defined natively within the code.
- [ ] Internal service calls utilize type-safe direct imports, not manual HTTP routing.
