---
name: cloud-native-infrastructure-optimization
description: Validates and optimizes Twelve-Factor app configurations. Use when configuring Docker, Kubernetes, database connection pools, or cache TTLs.
---

# Cloud-Native Infrastructure Optimization

This skill ensures applications strictly adhere to the Twelve-Factor App methodology for cloud-native deployment. It prevents local state assumptions, guarantees configuration portability, and optimizes infrastructure constraints like database connection pools and caching.

## When to Use

- **Use when** writing Dockerfiles or Kubernetes manifests.
- **Use when** configuring environment variable structures for CI/CD.
- **Use when** optimizing ORM queries (e.g., N+1 problems) and connection pools.
- **NOT for** writing frontend CSS or UI components.

## Core Process

### Phase 1: The Twelve-Factor Constraints
- **Config**: Externalize all configuration into the environment. Never hardcode secrets or environment-specific toggles in the codebase.
- **Stateless Processes**: Execute the app as one or more stateless processes. Any data that needs to persist must be stored in a stateful backing service (e.g., Postgres, Redis).
- **Disposability**: Maximize robustness with fast startup and graceful shutdown (listen for `SIGTERM` and close connections cleanly).

### Phase 2: Database & IO Optimization
- **Connection Pools**: Ensure database connections utilize pooling rather than creating a new connection per request.
- **Batching**: Prevent N+1 query problems by enforcing batching (e.g., DataLoader) at the ORM/Data layer.

### Phase 3: Cache Management
- Never implement infinite caching (`TTL = 0`) for highly volatile data.
- Ensure distributed caches (Redis) are used instead of local, in-memory caches to prevent state mismatch across horizontal pods.

## Common Rationalizations

| Rationalization | Reality |
|---|---|
| "I'll just save uploaded images to the local disk." | Containers are ephemeral. Local disk writes will be destroyed on the next deploy. Use block storage (S3). |
| "I don't need a connection pool, traffic is low." | Traffic spikes cause connection exhaustion, crashing the database. Pooling is mandatory. |
| "I'll hardcode the API key for now and change it later." | Hardcoded secrets inevitably leak. Strict environment variable injection is required from day one. |

## Red Flags

- Hardcoded configuration files specific to `production` or `staging` inside the codebase instead of pure `ENV` injection.
- Applications lacking a `SIGTERM` listener for graceful shutdown.
- Writing persistent state to local directories (e.g., `/tmp/uploads` intended for permanent storage).

## Verification

Before finalizing the infrastructure code, verify:
- [ ] The application is completely stateless and utilizes backing services for persistence.
- [ ] All configurations and secrets are passed strictly via Environment Variables.
- [ ] A graceful shutdown handler intercepts `SIGTERM` and closes I/O pools safely.