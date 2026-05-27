---
name: tauri-desktop-engineering
description: Engineers highly secure, cross-platform desktop applications by bridging web frontends with native Rust backends via Tauri's IPC and isolation patterns.
---

# Tauri Desktop Engineering

This skill bridges the gap between modern Web UIs and system-level Rust backends, focusing on creating lightweight and highly secure desktop executables.

## Core Rules
1. **Strict IPC Security (Pillar 12):** Treat the frontend Webview as an untrusted environment. Never accept raw database queries or arbitrary system commands from the frontend. Validate and sanitize all payloads passed to `#[tauri::command]` functions.
2. **Isolation Pattern:** Enable Tauri's Isolation Pattern to intercept and verify all IPC messages via an isolated secure iframe, preventing XSS payloads from executing native commands.
3. **Binary Size Optimization:** Keep the final binary size minimal by disabling unused Tauri features in `tauri.conf.json` and utilizing Cargo profile optimizations (`opt-level = "z"`, `lto = true`, `codegen-units = 1`, `strip = true`).
4. **State Management:** Use Tauri's Managed State (`tauri::State`) to safely inject shared resources (like database connection pools or configuration structs) into your IPC commands via Dependency Injection.

## Architecture Guidelines
Strictly adhere to Separation of Concerns (SoC). The frontend (React/Svelte) is solely responsible for rendering and UI state. The Rust backend is solely responsible for filesystem access, heavy computation, and native OS APIs.
