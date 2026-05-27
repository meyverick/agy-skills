---
name: pinus-server-development
description: Architects scalable, distributed multi-process game servers for MMORPGs and high-concurrency games using the Pinus (Pomelo) framework in TypeScript.
---

# Pinus Server Development

This skill engineers large-scale, distributed server architectures. It utilizes the Pinus framework (TypeScript modernization of Pomelo) to handle RPCs, routing, and horizontal scaling.

## Core Rules
1. **Multi-Process Architecture (SoC)**: Strictly divide responsibilities among specific server types (e.g., `connector` for maintaining WebSocket connections, `chat` for messaging, `area` for gameplay logic).
2. **Asynchronous Resilience**: Pinus utilizes Promises/Async-Await. Handle all RPC (Remote Procedure Call) failures using `try/catch` and exponential backoffs or circuit breakers.
3. **Stateless Logic**: Handlers must remain as stateless as possible to allow horizontal scaling. Use Redis or external databases to maintain global state.

## Reference Example

```typescript
import { Application, FrontendSession } from 'pinus';

// Handler for the 'connector' server
export default function (app: Application) {
    return new EntryHandler(app);
}

export class EntryHandler {
    constructor(private app: Application) {}

    // Async handler invoked by clients
    async enter(msg: { username: string }, session: FrontendSession) {
        if (!msg.username) {
            return { code: 500, error: 'Username required' };
        }

        try {
            // Bind session to a user ID securely
            await session.abind(msg.username);
            session.on('closed', this.onUserLeave.bind(this, this.app));

            // Perform RPC call to 'chat' server to register user
            await this.app.rpc.chat.chatRemote.add(session, msg.username, session.frontendId);

            return { code: 200, msg: `Welcome ${msg.username}` };
        } catch (e) {
            console.error('Enter failed:', e);
            return { code: 500, error: 'Internal Server Error' };
        }
    }

    private onUserLeave(app: Application, session: FrontendSession) {
        if (!session || !session.uid) return;
        // Broadcast leave event
    }
}
```
