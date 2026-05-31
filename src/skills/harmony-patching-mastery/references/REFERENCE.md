# Harmony Technical Reference

This document provides in-depth technical references for Harmony patch creation. Use this information when constructing complex C# patches.

## Patching Mechanisms

Harmony replaces the original method pointer with a dynamic method where the flow is redirected through defined patch types:

### 1. Prefix
Executes *before* the original method.
- **Common uses**: Modify inputs/arguments, initialize shared `__state`, or completely **skip** the original method.
- **Skipping**: To skip the original method, the Prefix must return `false`. The first Prefix to return `false` aborts further Prefixes and the original method execution.

### 2. Postfix
Executes *after* the original method.
- **Common uses**: Read or modify the output result (`__result`), execute side effects that rely on the original's success, or retrieve `__state` passed down from a Prefix.
- **Pass Through**: A postfix can return the same type as the original's return type to replace the result directly.

### 3. Finalizer
Executes wrapped around everything (try/catch blocks).
- **Common uses**: Run cleanup code that must execute even if exceptions are thrown, suppress original exceptions by returning `null`, or throw new/modified exceptions.

### 4. Transpiler
Operates as a post-compiler stage before runtime execution. Instead of C#, it alters the underlying CIL (IL instructions) of the original method.
- **Input/Output**: Receives `IEnumerable<CodeInstruction>` and returns the modified sequence.
- **Common uses**: Deep, fine-grained surgery (e.g. replacing a single math operation or conditional jump) without rewriting or skipping the entire method.

## Annotations and Magic Arguments

Harmony heavily utilizes specific naming conventions for method parameters (Dependency Injection) to grant access to the original execution context:

- `__instance`: Provides access to `this` if the patched method is non-static.
- `__result` (or `ref __result`): The return value of the original method. To *modify* the result, it must be passed via `ref`.
- `___<fieldname>` (e.g., `ref int ___health`): Injects the value of a private field named `health`.
- `__state`: An arbitrary variable populated in the Prefix and read in the Postfix. (Only works if Prefix and Postfix are in the same class).
- `__args`: An `object[]` containing all arguments of the method.
- `__runOriginal`: A boolean indicating if the original method actually ran.

### Matching Arguments
To access or change one or several of the original method's arguments, simply repeat them with the same name in your patch method signature. If you intend to alter the argument's value before the original method executes (inside a Prefix), use `ref`.
