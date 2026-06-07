---
name: unity-dots-programming
description: Engineers high-performance Data-Oriented Design (DOD) architectures using Unity's Entity Component System (ECS).
---

# Unity DOTS Programming (ECS)

This skill engineers gameplay systems and core architecture using Unity's Entity Component System (ECS). It enforces Data-Oriented Design to maximize CPU cache locality.

## Core Rules
1. **Separation of Concerns (SoC)**: Strictly separate data (`IComponentData`) from logic (`ISystem`). Never place logic inside a component struct.
2. **Defensive Programming**: Use `EntityCommandBuffer` for any structural changes (creating/destroying entities, adding/removing components) during a system's `OnUpdate` to prevent race conditions and collection modification exceptions.
3. **No Managed Types**: Ensure `IComponentData` structs only contain unmanaged value types (blittable types). No classes or standard strings.
4. **Query Optimization**: Cache entity queries (`EntityQuery`) rather than creating them dynamically every frame.

## Reference Example

```csharp
using Unity.Entities;
using Unity.Transforms;
using Unity.Mathematics;

// 1. The Data (Component)
public struct SpeedComponent : IComponentData
{
    public float Value;
}

// 2. The Logic (System)
public partial struct MovementSystem : ISystem
{
    public void OnUpdate(ref SystemState state)
    {
        float deltaTime = SystemAPI.Time.DeltaTime;

        // Uses Source Generators for high-performance iteration
        foreach (var (transform, speed) in SystemAPI.Query<RefRW<LocalTransform>, RefRO<SpeedComponent>>())
        {
            transform.ValueRW = transform.ValueRO.Translate(new float3(0, 0, speed.ValueRO.Value * deltaTime));
        }
    }
}
```
