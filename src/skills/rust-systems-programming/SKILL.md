---
name: rust-systems-programming
description: Engineers high-performance, memory-safe backend systems and libraries using idiomatic Rust, enforcing strict borrow-checking, lifetimes, and zero-cost abstractions.
---

# Rust Systems Programming

This skill governs the writing of core Rust logic. It ensures adherence to Rust's unique memory-management paradigms and type-safe invariants, avoiding common pitfalls and `unsafe` blocks.

## Core Rules
1. **Zero-Cost Abstractions:** Leverage Rust's traits and generics to build abstractions that compile down to highly optimized machine code without runtime overhead.
2. **Strict Ownership & Lifetimes:** Explicitly manage memory through the Borrow Checker. Avoid cloning data (`.clone()`) merely to appease the compiler; structure your data and lifetimes to pass references efficiently.
3. **Fearless Error Handling:** Never use `unwrap()` or `expect()` in production code. Always use the `Result<T, E>` and `Option<T>` types. Propagate errors idiomatically using the `?` operator and define custom error enums using crates like `thiserror`.
4. **No Unsafe Code:** Strictly avoid the `unsafe` keyword unless interfacing directly with C-FFI or hardware intrinsics, and only then with extreme validation.

## Architecture Guidelines
Follow Domain-Driven Design (DDD) by isolating business logic into pure Rust libraries (`lib.rs` modules) that do not depend on the execution environment (CLI, API, or GUI).
