---
name: pinus-server-development
description: Architects multi-process Pomelo/Pinus servers. Use when building highly concurrent MMORPG backends, RPC boundaries, or real-time distributed state.
---

# Pinus Server Development

This skill governs the architecture of highly scalable, distributed Node.js/TypeScript game servers using the Pinus (formerly Pomelo) framework. It enforces strict separation of concerns between state-holding backend servers and purely routing frontend connectors.

## When to Use

- **Use when** developing real-time MMORPG server topologies.
- **Use when** defining RPC (Remote Procedure Call) boundaries between node clusters.
- **Use when** scaling WebSocket connections across multiple machines.
- **NOT for** standard stateless REST API backends.

## Core Process

### Phase 1: The Connector / Backend Boundary
- **Connectors**: Frontend connector servers MUST be entirely stateless. Their only responsibility is maintaining the WebSocket session and routing packets to the correct backend node.
- **Backend Servers**: All game logic and state mutation must occur here.

### Phase 2: State Isolation
- State must be strictly partitioned by server type (e.g., `chat`, `area`, `combat`).
- A player's session state on the connector must only hold routing metadata (e.g., `serverId`), never game-critical mutable data like `health` or `inventory`.

### Phase 3: RPC Efficiency
- Avoid "chatty" RPCs between backend servers. Group state updates or use pub/sub mechanisms for broadcast data.
- Ensure all RPC boundaries utilize strict TypeScript interfaces to prevent runtime crashes from misaligned data structures.

## Common Rationalizations

| Rationalization | Reality |
|---|---|
| "I'll just put the combat logic on the connector to save an RPC hop." | Connectors must remain stateless. Putting logic on connectors destroys horizontal scalability and locks player state to a single machine. |
| "I'll store the player's full inventory in the session object." | Session objects are broadcast across the cluster. Heavy state causes massive memory leaks and network congestion. |

## Red Flags

- State mutation logic existing within `servers/connector/handler`.
- Heavy, frequent blocking operations (like synchronous DB queries) inside the main Pinus event loop.
- Lack of strict typings on the `app.rpc` definitions.

## Verification

Before finalizing the Pinus server code, verify:
- [ ] Connectors are strictly stateless routing layers.
- [ ] Backend servers do not share mutable state directly.
- [ ] RPC schemas are explicitly typed via TypeScript interfaces.
