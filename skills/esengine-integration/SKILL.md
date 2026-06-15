---
name: esengine-integration
description: Integrates ESEngine for modular TypeScript game systems. Use when implementing behavior trees, spatial indexing, or client-prediction networking.
---

# ESEngine Integration

This skill standardizes the usage of ESEngine (Entity System Engine) for creating decoupled, data-driven game systems in TypeScript. It enforces spatial partitioning for collisions and pure Behavior Trees for AI.

## When to Use

- **Use when** architecting complex AI using Behavior Trees.
- **Use when** optimizing 2D collisions with QuadTrees or Spatial Hash Grids.
- **NOT for** simple linear scripts or UI management.

## Core Process

### Phase 1: Spatial Indexing
- Never iterate over the entire entity array (`O(N^2)`) to check collisions or distances.
- Always insert entities with colliders into an ESEngine Spatial Grid. Query the grid for nearby neighbors before running heavy AABB/Math.dist calculations.

### Phase 2: Behavior Trees
- Construct AI logic using modular Behavior Tree nodes (`Selector`, `Sequence`, `Condition`, `Action`).
- Do not write massive `switch/case` state machines. State should be implicit in the Tree's execution context.

### Phase 3: Client Prediction
- Ensure systems are decoupled from rendering so they can be run "headlessly" on the server or fast-forwarded on the client for network reconciliation.

## Common Rationalizations

| Rationalization | Reality |
|---|---|
| "I'll just loop through all entities to find the closest enemy." | An `O(N^2)` loop destroys framerates when entities > 100. You MUST use a spatial query to fetch only the 5-10 nearby entities. |
| "I'll write the AI using a giant switch statement in the Update loop." | Complex AI states become unmaintainable. Behavior Trees allow modular, reusable logic nodes. |

## Red Flags

- Nested `for` loops checking `distance(A, B)` for every entity pair.
- Hardcoded AI logic bypassing the `BehaviorTree` builder.

## Verification

Before finalizing the ESEngine integration:
- [ ] Collision queries strictly utilize Spatial Hash Grids or QuadTrees.
- [ ] AI is constructed via reusable Behavior Tree nodes.
- [ ] Systems contain zero rendering logic (e.g., drawing to canvas directly).
