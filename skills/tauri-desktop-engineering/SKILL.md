---
name: tauri-desktop-engineering
description: Engineers secure, cross-platform desktop applications using Tauri. Use when bridging web frontends with native Rust backends via IPC.
---

# Tauri Desktop Engineering

This skill governs the construction of highly secure desktop applications using Tauri (Rust + Web Frontend). It mandates strict Inter-Process Communication (IPC) boundaries and explicit system permission scopes.

## When to Use

- **Use when** bridging a Web Framework (Svelte/React) to the native OS (Rust).
- **Use when** accessing the local filesystem, spawning processes, or creating system trays.
- **NOT for** standard, browser-only web applications.

## Core Process

### Phase 1: IPC Security
- The web frontend must be treated as completely untrusted.
- Never pass raw system commands or SQL queries from the frontend to the Rust backend.
- Define explicit Rust Commands (`#[tauri::command]`) that perform single, validated actions.

### Phase 2: Allowlist Scoping
- Tauri v2 uses a strict capability system. Never use wildcard permissions (`fs:read-all`).
- Explicitly scope capabilities in the `tauri.conf.json` or `capabilities` folder to only allow access to necessary directories (e.g., `$APPDATA`).

### Phase 3: The Rust Backend
- Treat the Rust core exactly like a remote server. Validate all arguments received from the frontend.
- Handle state using Tauri's managed state (`app_handle.state::<MyState>()`), wrapped in `Mutex` or `RwLock` for thread safety.

## Common Rationalizations

| Rationalization | Reality |
|---|---|
| "I'll let the frontend send the exact file path it wants to delete." | This is a path traversal vulnerability. The frontend should send an ID, and the Rust backend resolves the path safely. |
| "I'll just enable all filesystem permissions to avoid headaches." | Enabling `**/*` filesystem access defeats Tauri's sandbox, turning any XSS vulnerability into a full system compromise. |

## Red Flags

- Tauri Commands accepting raw shell scripts or SQL queries from the JS client.
- Wildcard `*` capabilities defined in the Tauri configuration.

## Verification

Before concluding the Tauri architecture:
- [ ] Tauri capabilities are strictly scoped to the exact APIs and directories needed.
- [ ] Frontend-to-Backend IPC calls pass structured data, never raw system instructions.
- [ ] Rust Commands heavily validate all input before executing OS-level tasks.
