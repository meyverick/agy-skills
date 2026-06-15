---
name: biteecs-optimization
description: Engineers high-performance ECS architectures using bitECS in JS/TS. Use when migrating away from OOP to maximize data locality in HTML5 games.
---

# bitECS Optimization

This skill implements pure Data-Oriented Design (DOD) in JavaScript/TypeScript using the lightweight `bitECS` library. It enforces the usage of typed arrays (Structure of Arrays) to maximize CPU cache locality and prevent Garbage Collection (GC) pauses.

## When to Use

- **Use when** architecting HTML5 game loops handling thousands of entities.
- **Use when** migrating legacy Object-Oriented JS game code.
- **NOT for** standard DOM manipulation or generic React state.

## Core Process

### Phase 1: Typed Component Definition
bitECS components are not objects. They are typed arrays (SoA).
- Define components strictly using `defineComponent({ x: Types.f32, y: Types.f32 })`.
- Never store strings or JS objects in bitECS components.

### Phase 2: System Execution
- Systems must be pure functions that query entities using `defineQuery`.
- Iterate through the query array explicitly using a `for` loop. Do not use `.forEach()` or `.map()` as they introduce function call overhead in the hot loop.

### Phase 3: GC Elimination
- Pre-allocate all entity pools globally.
- Do not use `new` or create object literals `{}` inside system update loops.

## Common Rationalizations

| Rationalization | Reality |
|---|---|
| "I'll just add a string 'name' to this bitECS component." | bitECS relies on SharedArrayBuffer and TypedArrays. You cannot store JS strings. Use an external map indexed by Entity ID if absolutely necessary. |
| "I'll use `.forEach` to iterate the query because it's cleaner." | `.forEach` inside a hot game loop (e.g., 10,000 entities at 60fps) kills performance. Standard `for (let i = 0; i < ents.length; i++)` is mandatory. |

## Red Flags

- Defining components with JS Objects or Arrays instead of `bitECS.Types`.
- Instantiating objects (`new Vector3()`) inside a system loop.

## Verification

Before concluding the bitECS architecture, verify:
- [ ] All components exclusively use typed arrays (`Types.f32`, `Types.ui8`).
- [ ] Queries are iterated using highly performant `for` loops.
- [ ] Zero object allocations occur inside the system's `return` function.
