---
name: tokio-async-architecture
description: Architects scalable, non-blocking asynchronous runtimes using Tokio, optimizing thread pools, mpsc channels, and preventing thread starvation.
---

# Tokio Async Architecture

This skill governs the asynchronous execution layer of Rust applications using the Tokio runtime, which is critical for high-concurrency network services.

## Core Rules
1. **Never Block the Async Executor:** Never call synchronous, blocking operations (like standard `std::fs` I/O, heavy CPU computations, or `std::thread::sleep`) inside an `async fn`. This starves the Tokio worker threads. Use `tokio::task::spawn_blocking` for heavy CPU work and `tokio::fs` for I/O.
2. **Safe Concurrency:** Use Tokio's `mpsc` (Multi-Producer, Single-Consumer) or `broadcast` channels to pass messages between asynchronous tasks safely instead of sharing state with `Arc<Mutex<T>>` where possible.
3. **Graceful Shutdown (Pillar 13):** Intercept OS signals (e.g., `tokio::signal::ctrl_c`) to implement graceful shutdowns. Await the completion of in-flight tasks before exiting the runtime.
4. **Timeouts and Backoff (Pillar 14):** Wrap all external network calls in `tokio::time::timeout` blocks to prevent hanging tasks. Implement exponential backoff for retries.

## Architecture Guidelines
When sharing state is absolutely necessary across tasks, prefer `Arc<tokio::sync::RwLock<T>>` over standard `Mutex` for read-heavy workloads to minimize lock contention across the async pool.
