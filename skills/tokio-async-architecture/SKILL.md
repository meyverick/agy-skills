---
name: tokio-async-architecture
description: Architects scalable asynchronous runtimes using Tokio. Use when optimizing thread pools, mpsc channels, and preventing async thread starvation.
---

# Tokio Async Architecture

This skill governs the proper architecture of non-blocking, asynchronous runtimes using the Tokio framework in Rust. It prevents thread starvation and ensures optimal message-passing topologies.

## When to Use

- **Use when** configuring Tokio runtimes for web servers or I/O bound systems.
- **Use when** implementing inter-task communication via `mpsc` or `broadcast` channels.
- **Use when** integrating synchronous legacy code into an async runtime.

## Core Process

### Phase 1: The Non-Blocking Boundary
- The Tokio runtime loop must never be blocked.
- Any CPU-bound, computationally expensive, or synchronous I/O operations (like legacy C-bindings) MUST be explicitly pushed to the blocking thread pool using `tokio::task::spawn_blocking`.

### Phase 2: Task Spawning & Channels
- Spawn independent concurrent work using `tokio::spawn`.
- Use `tokio::sync::mpsc` for standard many-to-one communication. Ensure channel capacities are bounded to prevent Out-Of-Memory (OOM) crashes under backpressure.
- Avoid sharing state via `Arc<Mutex<T>>` when message passing (channels) can accomplish the same goal with less contention.

### Phase 3: Graceful Shutdown
- Always architect long-running tasks to listen for a cancellation token (e.g., `tokio_util::sync::CancellationToken` or standard `mpsc` drop signals).
- Ensure the runtime awaits the completion of critical tasks during SIGTERM.

## Common Rationalizations

| Rationalization | Reality |
|---|---|
| "This hash calculation is fast, I'll just run it directly in the async function." | CPU-bound tasks stall the executor. If it takes more than 10-100 microseconds, it must go to `spawn_blocking`. |
| "I'll use an unbounded channel so I don't have to handle backpressure." | Unbounded channels guarantee memory leaks under high load. You must use bounded channels and handle `SendError`. |
| "I'll just share this huge struct with `Arc<Mutex<T>>` everywhere." | Mutex contention destroys async performance. Use actor patterns and channels instead. |

## Red Flags

- Synchronous `std::fs` or `std::thread::sleep` calls inside `async` functions (instead of `tokio::fs` or `tokio::time::sleep`).
- `mpsc::unbounded_channel` usage in production code.
- Tasks spawned without any cancellation listening mechanism.

## Verification

Before concluding the Tokio architecture phase, verify:
- [ ] No synchronous, blocking calls exist inside `async` execution blocks.
- [ ] All channels possess explicit capacity bounds to enforce backpressure.
- [ ] A graceful shutdown mechanism is implemented and listens for termination signals.
