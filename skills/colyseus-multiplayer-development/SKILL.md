---
name: colyseus-multiplayer-development
description: Builds real-time, authoritative multiplayer servers and synchronizes state using the Colyseus framework for Node.js.
---

# Colyseus Multiplayer Development

This skill designs secure, authoritative multiplayer environments using Colyseus, focusing on WebSocket state synchronization and schema definitions.

## Core Rules
1. **Authoritative Server**: All game logic, collision, and score validation must execute on the Colyseus Node.js server. The client is strictly a dumb terminal that renders the state and sends inputs.
2. **Schema Optimization**: Use `@colyseus/schema` efficiently. Group state data logically and minimize state updates to conserve bandwidth (Green Software principles).
3. **Fail-Fast Room Management**: Validate all incoming client messages strictly. If a client sends malformed data, drop the message or disconnect the client defensively.

## Reference Example

```typescript
import { Room, Client } from "colyseus";
import { Schema, type, MapSchema } from "@colyseus/schema";

// 1. Define strictly typed Schema
export class Player extends Schema {
    @type("number") x: number = 0;
    @type("number") y: number = 0;
}

export class GameState extends Schema {
    @type({ map: Player }) players = new MapSchema<Player>();
}

// 2. Define Authoritative Room
export class GameRoom extends Room<GameState> {
    onCreate(options: any) {
        this.setState(new GameState());

        // Fail-Fast input handling
        this.onMessage("move", (client, message) => {
            if (typeof message.x !== 'number' || typeof message.y !== 'number') return;
            const player = this.state.players.get(client.sessionId);
            if (player) {
                player.x = message.x;
                player.y = message.y;
            }
        });
    }

    onJoin(client: Client) {
        this.state.players.set(client.sessionId, new Player());
    }

    onLeave(client: Client) {
        this.state.players.delete(client.sessionId);
    }
}
```
