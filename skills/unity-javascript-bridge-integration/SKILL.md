---
name: unity-javascript-bridge-integration
description: Integrates WebGL JS libraries (.jslib) into Unity C# scripts. Use when safely communicating with browser-level APIs like MRAID or custom telemetry.
---

# Unity JavaScript Bridge Integration

This skill governs the secure memory marshaling and bridging between Unity's C# WebAssembly environment and the native browser JavaScript DOM via `.jslib` plugins.

## When to Use

- **Use when** calling browser `window` APIs from Unity C# (e.g., MRAID `open()`).
- **Use when** passing data (strings, arrays) from JS into Unity `SendMessage`.
- **NOT for** standard Unity game logic.

## Core Process

### Phase 1: JSLIB Definition
- Create `.jslib` files in the `Assets/Plugins/WebGL` directory.
- Wrap all functions in `mergeInto(LibraryManager.library, { ... });`.

### Phase 2: Memory Marshaling (Strings)
WebAssembly uses a linear memory model. Passing strings requires explicit memory allocation.
- **C# to JS**: C# strings are passed as memory pointers. You must use `UTF8ToString(ptr)` on the JS side to read them.
- **JS to C#**: Returning a string from JS to C# requires allocating memory in the Wasm heap using `_malloc`, writing the string via `stringToUTF8`, and returning the pointer.

### Phase 3: P/Invoke Architecture
- Define the external functions in C# using `[DllImport("__Internal")]`.
- Do not call these functions if `Application.platform != RuntimePlatform.WebGLPlayer`. It will crash the editor.

## Common Rationalizations

| Rationalization | Reality |
|---|---|
| "I'll just return a JS string directly to C#." | Wasm cannot read JS objects. You must allocate memory (`_malloc`) and pass a pointer. Failing to do so causes immediate memory corruption. |
| "I don't need to check the platform before calling the `[DllImport]`." | Calling `.jslib` functions in the Unity Editor throws `EntryPointNotFoundException`. Always wrap calls in platform checks. |

## Red Flags

- Returning raw JS strings from `.jslib` functions instead of `_malloc` pointers.
- Failing to call `_free` on the C# side after receiving an allocated string pointer from JS.

## Verification

Before finalizing the JS bridge, verify:
- [ ] All `[DllImport]` calls are wrapped in WebGL platform checks.
- [ ] Strings returned from JS are allocated via `_malloc`.
- [ ] C# code safely handles or frees memory pointers received from the bridge.
