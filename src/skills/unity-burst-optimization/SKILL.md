---
name: unity-burst-optimization
description: Writes highly optimized, multithreaded unmanaged C# jobs targeting the LLVM-backed Burst Compiler.
---

# Unity Burst Optimization

This skill focuses on writing code that flawlessly compiles through the Burst Compiler to produce highly optimized native CPU assembly.

## Core Rules
1. **Strict Unmanaged Context**: Burst code must be `[BurstCompile]` and cannot reference any managed memory (classes, `string`, `int[]`). Use `NativeArray<T>`, `NativeList<T>`, or `FixedString32Bytes`.
2. **Explicit Memory Lifecycles**: All native collections must have explicit allocator lifecycles (`Allocator.Temp`, `Allocator.TempJob`, `Allocator.Persistent`). Fail-fast: ensure all native allocations are `Dispose()`'d to prevent severe memory leaks.
3. **Dependency Chains**: When scheduling C# Jobs, correctly pass the `JobHandle` dependencies to prevent thread race conditions.
4. **Fail-Fast Mathematics**: Use the `Unity.Mathematics` library instead of `UnityEngine.Mathf`. `Unity.Mathematics` maps directly to SIMD (Single Instruction, Multiple Data) intrinsics for massive performance gains.

## Reference Example

```csharp
using Unity.Burst;
using Unity.Collections;
using Unity.Jobs;
using Unity.Mathematics;

[BurstCompile]
public struct VelocityJob : IJobParallelFor
{
    public float DeltaTime;

    // Must be a Native container
    public NativeArray<float3> Positions;
    
    [ReadOnly]
    public NativeArray<float3> Velocities;

    public void Execute(int index)
    {
        // Unity.Mathematics operations (SIMD optimized)
        Positions[index] += Velocities[index] * DeltaTime;
    }
}

// Scheduling Example
public void UpdateVelocities()
{
    var positions = new NativeArray<float3>(1000, Allocator.TempJob);
    var velocities = new NativeArray<float3>(1000, Allocator.TempJob);

    var job = new VelocityJob
    {
        DeltaTime = 0.016f,
        Positions = positions,
        Velocities = velocities
    };

    // Schedule across available CPU cores
    JobHandle handle = job.Schedule(1000, 64);
    
    // Complete the job to safely access the data on the main thread
    handle.Complete();

    // Prevent memory leaks
    positions.Dispose();
    velocities.Dispose();
}
```
