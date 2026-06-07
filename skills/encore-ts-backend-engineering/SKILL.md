---
name: encore-ts-backend-engineering
description: Engineers type-safe backend microservices and APIs using Encore.ts, employing infrastructure-from-code and declarative architectures.
---

# Encore.ts Backend Engineering

This skill governs the creation of robust, scalable backend architectures utilizing the Encore.ts framework. It aligns with the "Everything as Code" and "Cloud-Native" foundational pillars.

## Core Rules
1. **Infrastructure from Code:** Never manually provision cloud resources (Databases, Pub/Sub, Cron Jobs). Declare them programmatically using Encore's native modules (`encore.dev/storage/sqldb`, `encore.dev/pubsub`, etc.).
2. **Strict API Contracts (Pillar 22):** Define explicit TypeScript interfaces for all API request/response schemas. Encore uses these schemas to automatically generate OpenAPI documentation and type-safe frontend clients.
3. **Environment Context:** Utilize Encore's built-in environment primitives (`encore.meta.env()`) for distinguishing between development, staging, and production environments. Do not rely on `.env` files for core cloud integrations.
4. **Distributed Tracing (Pillar 19):** Leverage Encore's automatic distributed tracing. Ensure all logging includes context by passing the `ctx` object properly through asynchronous operations.

## Architecture Guidelines
Adopt Domain-Driven Design (DDD). Services must be self-contained within their respective Encore directories. Cross-service communication must occur exclusively via explicit Encore service calls (e.g., `~encore/clients/serviceName`), never through direct database access.
