---
name: esengine-integration
description: Integrates ESEngine for modular TypeScript game systems like behavior trees, spatial indexing, and client-prediction networking across rendering engines.
---

# ESEngine Integration

This skill focuses on integrating the engine-agnostic ESEngine framework into JavaScript/TypeScript games (e.g., Cocos Creator, LayaAir, Phaser) to implement modular game AI, networking, and spatial structures without tightly coupling logic to the renderer.

## Core Rules
1. **Separation of Concerns (SoC)**: ESEngine modules must only contain logical data, states, and algorithms. Rendering operations must be isolated to the host engine (Cocos/Phaser) via an observer or event pattern.
2. **Modular Architecture**: Only import required modules (e.g., `esengine/ai/behaviortree`) rather than the entire framework to keep payloads minimal (Green Software principle).
3. **Defensive Programming**: Validate state transitions within ESEngine FSMs (Finite State Machines) to prevent undefined logic states.

## Reference Example

```typescript
import { BehaviorTree, Selector, Sequence, Action } from 'esengine/ai/behaviortree';

export class EnemyAI {
    private bt: BehaviorTree;

    constructor() {
        // Build behavior tree: Attack if in range, otherwise patrol
        this.bt = new BehaviorTree(
            new Selector([
                new Sequence([
                    new Condition(this.isPlayerInRange.bind(this)),
                    new Action(this.attackPlayer.bind(this))
                ]),
                new Action(this.patrol.bind(this))
            ])
        );
    }

    public tick(dt: number) {
        this.bt.tick(dt);
    }

    private isPlayerInRange(): boolean { /* Logic */ return false; }
    private attackPlayer(): void { /* Attack logic */ }
    private patrol(): void { /* Patrol logic */ }
}
```
