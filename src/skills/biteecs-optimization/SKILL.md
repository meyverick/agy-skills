---
name: biteecs-optimization
description: Engineers ultra-high-performance data-oriented ECS architectures in JavaScript/TypeScript using the minimal bitECS library.
---

# bitECS Optimization

This skill focuses on utilizing bitECS for memory-efficient, cache-friendly game simulations running in browsers, suitable for playable ads, Phaser, or PixiJS.

## Core Rules
1. **Strict Data-Oriented Design**: Components must only consist of pure numeric data stored in contiguous typed arrays (e.g., `Float32Array`). Do not store object references or strings in components.
2. **KISS & SoC**: Systems iterate strictly over components via bitECS queries. No rendering code belongs inside systems; defer rendering to a phase after state calculation.
3. **Memory Reusability**: Preallocate maximum entity limits and component buffer sizes during initialization to eliminate Garbage Collection (GC) pauses during runtime.

## Reference Example

```typescript
import { createWorld, addEntity, addComponent, defineComponent, defineQuery, Types } from 'biteecs';

// 1. Define Component Schema (Typed Arrays)
export const Position = defineComponent({ x: Types.f32, y: Types.f32 });
export const Velocity = defineComponent({ x: Types.f32, y: Types.f32 });

const movementQuery = defineQuery([Position, Velocity]);

// 2. Define System
export const movementSystem = (world, delta) => {
    const ents = movementQuery(world);
    for (let i = 0; i < ents.length; i++) {
        const eid = ents[i];
        Position.x[eid] += Velocity.x[eid] * delta;
        Position.y[eid] += Velocity.y[eid] * delta;
    }
    return world;
};

// 3. Usage
const world = createWorld();
const eid = addEntity(world);
addComponent(world, Position, eid);
addComponent(world, Velocity, eid);
Velocity.x[eid] = 10;
```
