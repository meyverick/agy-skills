---
name: unity-burst-optimization
description: Writes highly optimized, multithreaded unmanaged C# jobs. Use when compiling mathematics, physics, or ECS loops through the LLVM Burst Compiler.
---

# Unity Burst Optimization

This skill enforces strict unmanaged memory rules required to successfully compile C# code through Unity's LLVM-backed Burst Compiler, preventing automatic fallbacks to slow managed execution.

## When to Use

- **Use when** writing `IJob`, `IJobParallelFor`, or `ISystem` update loops.
- **Use when** allocating native memory via `NativeArray` or `NativeHashMap`.
- **NOT for** garbage-collected standard C# scripts.

## Core Process

### Phase 1: Unmanaged Constraints
- Burst cannot compile anything that touches the Garbage Collector.
- You must exclusively use blittable types (primitives, and structs composed only of primitives).
- Banned types: `class`, `string`, `char[]`, `object`, `delegate`.

### Phase 2: Native Allocations
- Use `Unity.Collections` (e.g., `NativeArray<T>`) for collections.
- You MUST pair every `Allocator.Temp` or `Allocator.Persistent` with an explicit `.Dispose()` call. Failure to do so results in a memory leak.

### Phase 3: Mathematics
- Use `Unity.Mathematics` (e.g., `float3`, `quaternion`) instead of `UnityEngine.Mathf` or `Vector3`, as it is explicitly mapped to SIMD hardware instructions by Burst.

## Common Rationalizations

| Rationalization | Reality |
|---|---|
| "I'll just pass this C# string into the job to print it." | Strings are managed classes. Burst will either fail to compile or throw a safety error. Use `FixedString32Bytes`. |
| "I don't need `[BurstCompile]`, the multithreading alone is fast enough." | Burst compilation often yields a 10x-50x speedup over standard C# multithreading due to LLVM SIMD vectorization. |

## Red Flags

- Utilizing `UnityEngine.Vector3` inside a Burst job instead of `float3`.
- Allocating a `NativeArray` without a corresponding `Dispose()` or dependency management.

## Verification

Before finalizing the Burst job, verify:
- [ ] The `[BurstCompile]` attribute is present on the struct/system.
- [ ] Zero managed types (classes, strings) are referenced inside the job.
- [ ] All native collections are explicitly disposed to prevent memory leaks.
