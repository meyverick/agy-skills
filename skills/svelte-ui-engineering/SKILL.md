---
name: svelte-ui-engineering
description: Engineers high-performance user interfaces using Svelte 5 runes and snippets. Use when building UI components, orchestrating complex animations, or architecting reactive state.
---

# Svelte UI Engineering

This skill governs the construction of modern, highly reactive user interfaces using Svelte 5. It strictly enforces the usage of Runes for state management, Svelte 5 Snippets for layout composition, and immutable architectural patterns (SOLID/KISS/SoC) to prevent prop-drilling and spaghetti state.

## When to Use

- **Use when** creating new `.svelte` components or updating existing UI layouts.
- **Use when** implementing client-side state management.
- **Use when** choreographing layout transitions and micro-animations.
- **NOT for** server-side data fetching or database mutations.

## Core Process

### Phase 1: State Management via Runes
Svelte 5 mandates Runes. Avoid all legacy `let` reactive declarations.
- Use `$state()` for deep reactivity.
- Use `$derived()` for computed values based on `$state`.
- Use `$effect()` sparingly, and strictly for DOM interactions or third-party library synchronization.

### Phase 2: Component Architecture & Snippets (Composition)
Keep components extremely small and modular (KISS principle).
- **Snippets:** Use Svelte 5 Snippets (`{@render snippet()}` and `{#snippet child()}`) to compose complex UIs. Do not use the legacy `<slot>` syntax.
- **Event Handlers:** Use the Svelte 5 lowercase event attribute syntax (`onclick={handler}`). Do not use the legacy `on:click` syntax.
- Encapsulate scoped CSS strictly within the `<style>` block.

### Phase 3: Motion & Interactions
Modern UIs demand fluid motion.
- Default to Svelte's native `svelte/transition` (fade, slide, fly) for enter/exit animations.
- Use `svelte/animate` (`flip`) for list reordering.
- For complex orchestration (e.g., staggering, path following), fallback to external libraries like Motion One or GSAP.

## Common Rationalizations

| Rationalization | Reality |
|---|---|
| "I'll just use Svelte 4 `<slot>` and `on:click`, it still works." | Svelte 5 Snippets and `onclick` provide superior type safety and performance. Legacy syntax must be explicitly avoided in new engineering. |
| "I'll handle this animation in standard CSS classes." | Native Svelte transitions are hardware-accelerated, guarantee cleanup, and sync perfectly with the component lifecycle. |

## Red Flags

- Using `$: variable = ...` instead of `$derived()`.
- Using `<slot>` instead of `{#snippet}`.
- Using `on:click` instead of `onclick`.
- Extensive `$effect()` blocks triggering infinite re-renders.

## Verification

Before finalizing the UI component, verify:
- [ ] All reactive state utilizes `$state`, `$derived`, or `$props`.
- [ ] Layout composition strictly utilizes Svelte 5 Snippets (`{@render}`).
- [ ] All event handlers use the modern lowercase syntax (`onclick`, `onkeydown`).
- [ ] Styles are scoped and do not leak globally.
