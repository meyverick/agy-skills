---
name: colyseus-multiplayer-development
description: Builds real-time, authoritative multiplayer servers using Colyseus. Use when synchronizing complex game state or defining client-server schemas.
---

# Colyseus Multiplayer Development

This skill governs the architecture of authoritative multiplayer game servers using Colyseus. It enforces strict server-side validation and optimized delta-state synchronization to prevent cheating and minimize bandwidth.

## When to Use

- **Use when** defining Colyseus `@type()` schemas.
- **Use when** handling client messages and game state mutations in a `Room`.
- **NOT for** building standard REST APIs.

## Core Process

### Phase 1: Schema Definition & Types
- State must be strictly defined using `@colyseus/schema`.
- Keep the schema as flat as possible. Deeply nested arrays or maps incur higher CPU serialization overhead.
- Use explicit types (`type("number")`, `type(["string"])`).

### Phase 2: Authoritative Mutation
- Clients NEVER mutate the State directly.
- Clients send Messages (`this.onMessage("move", (client, data) => {...})`).
- The Server validates the message (e.g., "Is the move legal? Is the player alive?"), and ONLY THEN does the server mutate the Schema State.

### Phase 3: Client Prediction & Interpolation
- Because the server is authoritative, network latency will cause input lag.
- The client must predict the movement instantly, and gracefully interpolate to match the server's state when the delta arrives.

## Common Rationalizations

| Rationalization | Reality |
|---|---|
| "I'll let the client send its new X/Y position to the server to update the state." | This is Client-Authoritative and trivially hackable. The client must send an *Intent* ("Move Right"). The server calculates the new X/Y. |
| "I'll just put the whole player object in an `any` type map." | Untyped state prevents Colyseus from calculating binary deltas, forcing it to serialize and send the entire object every tick, destroying bandwidth. |

## Red Flags

- `onMessage` handlers that blindly trust and apply client payload data.
- Deeply nested Schema trees > 3 levels deep.

## Verification

Before finalizing the Colyseus Room logic:
- [ ] All mutable state is strictly typed with `@type()`.
- [ ] The server validates all incoming `onMessage` payloads before applying state changes.
- [ ] The architecture explicitly prevents clients from dictating exact coordinates or health values.
