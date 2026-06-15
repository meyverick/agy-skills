---
name: svelte-game-development
description: Engineers high-performance web-based games using Svelte 5. Use when managing rendering loops, WebGL contexts, or Canvas via Svelte components.
---

# Svelte Game Development

This skill governs the integration of Svelte 5 for game development and high-performance Canvas/WebGL rendering. It rigorously enforces the "Concurrency & Immutability" pillar, explicitly decoupling Svelte's reactive DOM system from the 60FPS `requestAnimationFrame` game loop.

## When to Use

- **Use when** building UI layers over a PixiJS, Three.js, or Canvas element in Svelte.
- **Use when** managing global game state (score, health) via Svelte Runes.
- **NOT for** rendering thousands of moving sprites using raw HTML `<div>` tags.

## Core Process

### Phase 1: The Rendering Boundary & Game Loop Decoupling
- Svelte is highly optimized for DOM updates, but the DOM is too slow for 60FPS game rendering.
- The `requestAnimationFrame` (RAF) loop must run independently of Svelte's reactivity.
- Never use Svelte `#each` blocks to render game entities (like bullets or enemies) as DOM nodes. Use a `<canvas>` element and render them natively.

### Phase 2: Non-Deep Reactivity ($state.raw)
- Svelte 5 `$state` creates a deep reactive proxy. Applying this to a massive array of game entities or a 3D engine instance causes catastrophic performance overhead.
- **Mandatory Upgrade:** If a massive object or array only needs to be reassigned (not deeply mutated), or if it holds a third-party engine instance (like a PixiJS App), you MUST use `$state.raw()`. This completely eliminates proxy overhead while preserving top-level reactivity.

### Phase 3: Canvas Integration
- Use `bind:this={canvasElement}` to grab the Canvas reference in `onMount`.
- Pass the canvas reference to your pure JS game engine class, keeping the engine entirely unaware of Svelte.

## Common Rationalizations

| Rationalization | Reality |
|---|---|
| "I'll put the 10,000-particle array inside `$state` so the UI can read it." | `$state` will proxy all 10,000 items, destroying the framerate. You must use `$state.raw` or keep the array out of the reactive graph entirely. |
| "I'll run `$state.score++` inside `requestAnimationFrame`." | Reactivity triggers component checks. Throttling state syncs or bypassing Svelte for hot loops is required. |

## Red Flags

- Rendering game objects using `<div>` tags and inline `style="transform: translate(...)""` bound to Svelte state.
- Storing third-party game engine instances (like `new THREE.Scene()`) inside a standard `$state` instead of `$state.raw`.

## Verification

Before finalizing the Svelte Game component:
- [ ] The game loop executes purely in JS/Canvas, completely decoupled from Svelte's `$effect` reactivity.
- [ ] Massive game collections or engine instances strictly utilize `$state.raw()`.
- [ ] No game entities are rendered as HTML DOM nodes.
