---
name: rust-systems-programming
description: Engineers high-performance backend systems in Rust. Use when building memory-safe libraries, enforcing borrow-checking, or utilizing zero-cost abstractions.
---

# Rust Systems Programming

This skill governs the construction of highly performant, memory-safe backend systems using idiomatic Rust. It strictly enforces the borrow checker, explicit lifetimes, and prohibits the excessive use of cloning or dynamic dispatch unless absolutely architecturally required.

## When to Use

- **Use when** developing core backend libraries or microservices in Rust.
- **Use when** handling unmanaged memory, FFI, or critical path execution loops.
- **NOT for** rapid prototyping of unstructured scripts.

## Core Process

### Phase 1: Ownership & Borrowing
- Default to passing data by reference (`&T` or `&mut T`).
- Do not blindly add `.clone()` to appease the compiler. Resolve the ownership topology explicitly.

### Phase 2: Error Handling & Saftey
- Never use `.unwrap()` or `.expect()` in production code. Always use the `?` operator and `Result<T, E>`.
- Use custom Error enums (via libraries like `thiserror` or `anyhow`) to propagate context.

### Phase 3: Zero-Cost Abstractions
- Prefer static dispatch (generics with trait bounds `impl Trait`) over dynamic dispatch (`Box<dyn Trait>`) to avoid runtime vtable overhead, unless dealing with heterogeneous collections.
- Isolate any `unsafe` blocks into tiny, heavily audited, and explicitly documented modules.

## Common Rationalizations

| Rationalization | Reality |
|---|---|
| "The borrow checker is yelling, I'll just `.clone()` this massive string." | Cloning is a runtime performance penalty. You must restructure the lifetime or borrowing topology instead of hiding it. |
| "I'll use `.unwrap()` because this should never fail." | "Should never fail" is an assumption that causes panics in production. All errors must be handled gracefully via `Result`. |
| "I'll use `Box<dyn Trait>` everywhere for flexibility." | Dynamic dispatch incurs a performance cost. Use generics (`impl Trait`) unless dynamic collections are required. |

## Red Flags

- Heavy usage of `.clone()` on non-`Copy` types in performance-critical loops.
- Instances of `.unwrap()` outside of unit tests.
- Broad usage of `unsafe` blocks without detailed `// SAFETY:` explanatory comments.

## Verification

Before finalizing the Rust module, verify:
- [ ] `cargo clippy` passes with zero warnings.
- [ ] No `.unwrap()` or `.expect()` calls exist in the production source.
- [ ] `unsafe` code is strictly localized and commented.
