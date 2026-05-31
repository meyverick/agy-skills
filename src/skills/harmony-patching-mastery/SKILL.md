---
name: harmony-patching-mastery
description: Explicit guidance on authoring safe, non-destructive C# runtime patches for Unity/Mono games using the Harmony library. Trigger this skill when patching game binaries or developing Rust mods.
---

# Harmony Patching Mastery

> [!IMPORTANT]
> This skill defines the strict architectural constraints and syntax rules for developing C# runtime patches using the Harmony library. It must be adhered to when writing mods for games like Rust or other Unity/Mono environments.

## Execution Protocol

When developing Harmony patches, you must enforce context-aware execution and prioritize safety and compatibility over destructive overrides.

### 1. Progressive Disclosure of Reference Logic
For the complete technical breakdown of injected parameters (`__instance`, `__result`, `__state`, etc.) and the detailed behaviors of Prefixes, Postfixes, and Transpilers, you **MUST read the reference documentation**:
See [the Harmony Technical Reference](references/REFERENCE.md) for details.

### 2. Architectural Mandates
- **Idempotency & Isolation**: Patches must not crash the original game if they encounter an unexpected state. Use defensive programming (`null` checks) explicitly.
- **Mandatory Static Methods**: All patch methods inside a `[HarmonyPatch]` class must be declared as `static`. The original context must be accessed via injected arguments (like `__instance`), never through `this`.
- **Prefer Postfixes**: If you only need to modify a return value or perform a side-effect after the original logic runs, use a `Postfix`. This ensures maximum compatibility with other mods.
- **Skipping Originals Carefully**: Use a `Prefix` returning `false` ONLY when it is absolutely critical to completely suppress the original method's execution. Be aware this prevents other mods' Prefixes (that run later) from affecting the original.

### 3. Syntax Patterns
Construct patches declaratively using class annotations:

```csharp
[HarmonyPatch(typeof(TargetClass))]
[HarmonyPatch("TargetMethodName")]
public static class TargetClass_TargetMethodName_Patch
{
    // Prefixes run BEFORE the original method
    [HarmonyPrefix]
    public static bool Prefix(TargetClass __instance, ref float ___privateField)
    {
        // Return true to allow original to run, false to skip it
        return true;
    }

    // Postfixes run AFTER the original method
    [HarmonyPostfix]
    public static void Postfix(TargetClass __instance, ref int __result)
    {
        // Modify the return value
        __result += 10;
    }
}
```

### 4. Transpiler Caution
- **Transpilers** (IL instruction manipulation) should be used strictly as a last resort when targeted surgical precision is required (e.g., bypassing a specific branch logic without skipping the entire method).
- When writing a Transpiler, do not rely on fixed opcode indices. Scan for unique anchor instruction patterns before making insertions or deletions to ensure resilience against future game updates.

## Failure & Debugging Protocol
If a patch fails or causes the target application to crash:
- Verify that the target method name and argument signatures exactly match the compiled CIL.
- Ensure all injected `ref` fields (like `___fieldName`) perfectly match the spelling of the private fields.
- Instruct the user to enable Harmony's `FileLog` via `Harmony.DEBUG = true;` or the `HARMONY_LOG_FILE` environment variable for detailed IL generation debugging.
