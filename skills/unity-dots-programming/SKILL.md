---
name: unity-dots-programming
description: Engineers high-performance DOD architectures using Unity ECS. Use when architecting systems, structuring components, or migrating away from MonoBehaviours.
---

# Unity DOTS Programming

This skill governs the Data-Oriented Design (DOD) architecture using Unity's Entity Component System (ECS). It explicitly forbids Object-Oriented paradigms (like `MonoBehaviour`) in performance-critical code to maximize cache locality.

## When to Use

- **Use when** simulating massive numbers of entities (e.g., thousands of units).
- **Use when** defining `IComponentData` structs or `ISystem` logic.
- **NOT for** standard UI logic or simple 2D prototypes.

## Core Process

### Phase 1: Pure Data Components
- Use `IComponentData` exclusively for state.
- Components must be strictly unmanaged (blittable structs). Do not store classes, arrays, or strings in ECS components.

### Phase 2: System Isolation
- Use `ISystem` (unmanaged systems) instead of `SystemBase` (managed systems) whenever possible to allow Burst compilation.
- Queries (`SystemAPI.Query`) must be extremely specific. Filter out entities using `WithNone` or `WithAll` to minimize iteration times.

### Phase 3: The MonoBehaviour Bridge
- If interaction with GameObjects is required (e.g., legacy UI), utilize `IComponentData` as a bridge, reading it from a managed system. Do not link GameObjects directly into pure ECS structural data.

## Common Rationalizations

| Rationalization | Reality |
|---|---|
| "I'll just add a reference to the `Transform` in my component data." | Managed references destroy cache locality and prevent Burst compilation. Use `LocalTransform` and sync them if absolutely necessary. |
| "I'll use `SystemBase` because it's easier to write." | `SystemBase` incurs garbage collection overhead. `ISystem` guarantees strict unmanaged performance. |

## Red Flags

- Components defined as `class` instead of `struct`.
- Using `GameObject.Find` inside any ECS system update loop.

## Verification

Before completing the ECS architecture, verify:
- [ ] All components are unmanaged blittable `struct`s.
- [ ] Systems inherit from `ISystem` and are decorated with `[BurstCompile]`.
- [ ] `SystemAPI.Query` explicitly limits iteration scopes.
