---
name: unity-csharp-memory-stripping
description: Optimizes C# script compilation for WebGL, reducing the size of the final compiled WebAssembly binary by minimizing heavy dependencies and GC allocations.
---

# Unity C# Memory Stripping

This skill teaches how to write lightweight C# code that avoids compiling down to heavy WebAssembly instructions, strictly targeting WebGL playable ads.

## Core Rules
1. **YAGNI (You Aren't Gonna Need It)**: Do not use `System.Reflection`, dynamic generics, or LINQ. These force IL2CPP to generate thousands of lines of WebAssembly boilerplate.
2. **Defensive Programming & GC Optimization**: Avoid Garbage Collection (GC) spikes in `Update()`. Pre-allocate arrays and use struct-based Math (e.g., Unity's native `Vector3` instead of complex custom classes).
3. **Assembly Linker Configuration**: Use a strict `link.xml` file to explicitly preserve only the necessary components while allowing aggressive stripping of the rest of the Unity engine assemblies.
4. **Green Software Engineering**: Reduced WASM payload sizes directly translate to faster loading times and lower energy consumption.

## Reference Example

```csharp
// Anti-Pattern (Heavy WebAssembly generated due to LINQ and dynamic allocation)
using System.Linq;

void Update() {
    var activeEnemies = allEnemies.Where(e => e.isActive).ToList();
    // Heavy GC allocation every frame
}

// Optimized Pattern (Lightweight WASM, zero GC allocation)
void Update() {
    for (int i = 0; i < allEnemies.Length; i++) {
        if (allEnemies[i].isActive) {
            // Process directly
        }
    }
}
```

Example `link.xml` to protect essential scripts while stripping others:
```xml
<linker>
  <assembly fullname="UnityEngine">
    <type fullname="UnityEngine.MonoBehaviour" preserve="all"/>
  </assembly>
  <assembly fullname="Assembly-CSharp">
    <type fullname="GameController" preserve="all"/>
  </assembly>
</linker>
```
