---
name: svelte-ui-engineering
description: Engineers high-performance user interfaces and advanced motion design using Svelte and SvelteKit. Uses Svelte 5 runes ($state, $derived, $effect), reactive UI architecture, and seamless page transitions. Leverages native Svelte transition/animation modules or external libraries (Motion One, GSAP) for complex orchestration.
license: Apache-2.0
---

# Svelte UI Engineering

This skill outlines the process of designing and building high-performance, fluid, and reactive user interfaces using Svelte 5 and SvelteKit. It focuses on the strict adoption of Svelte 5 runes, performant motion design, and robust validation protocols.

## Activation Criteria

Use this skill when:
- Creating or refactoring Svelte components, specifically migrating to or using Svelte 5.
- Implementing reactive state management using runes (`$state`, `$derived`, `$effect`).
- Designing complex micro-interactions, animations, and SvelteKit page transitions.
- Auditing UI components for rendering performance, layout thrashing, and accessibility.

---

## 1. Svelte 5 Runes Protocol (Reactivity)

Enforce strict adoption of Svelte 5 paradigms. Legacy Svelte 4 reactivity is deprecated in this context.

*   **State (`$state`)**: Use `$state` for all reactive variables. Do not use standard `let` declarations for reactive state.
*   **Derived State (`$derived`)**: Use `$derived` for computed values based on `$state`. Avoid recalculating values inside template markup if they can be cached via `$derived`.
*   **Props (`$props`)**: Destructure component props using `$props()`. Do not use `export let`.
*   **Effects (`$effect`)**: Use `$effect` for side effects. 
    *   **Cleanup**: Always return a cleanup function from `$effect` if listeners, intervals, or external subscriptions are created, preventing memory leaks (Defensive Programming).
*   **Snippets**: Prefer snippets (`{#snippet ...}`) over slots for component composition and reusable markup chunks.

---

## 2. Motion & Animation Architecture

*   **Native Svelte Modules**: For standard UI interactions (fade, slide, fly, crossfade), default to Svelte's native `svelte/transition` and `svelte/animate`.
*   **Springs & Tweens**: Use `svelte/motion` (`spring`, `tweened`) for fluid, physics-based UI state changes (e.g., following a cursor, draggable elements).
*   **Complex Orchestration**: When animations require complex timelines, sequencing, or SVG morphing beyond native capabilities, integrate external libraries like **Motion One** (optimized bundle size) or **GSAP**.
*   **SvelteKit View Transitions**: Use the native View Transitions API within SvelteKit's `onNavigate` hook to create seamless, app-like page navigations.

---

## 3. Payload & Performance Optimization (Green Software Engineering)

Minimize UI rendering overhead and carbon footprint by optimizing payload and execution:

*   **Hardware Acceleration**: Force hardware acceleration for animated elements using CSS `will-change: transform, opacity` or `transform: translateZ(0)`.
*   **Avoid Layout Thrashing**: Animate only compositing properties (`transform`, `opacity`). Never animate `width`, `height`, `margin`, `padding`, or `top`/`left` directly. Use the FLIP technique for layout changes.
*   **Conditional Rendering**: Use `{#if}` blocks to completely remove hidden elements from the DOM rather than hiding them via CSS `display: none` or `opacity: 0` (unless animation requires it), saving memory.

---

## 4. Self-Validation Protocol (Defensive Programming)

Before finalizing any Svelte UI component, verify against this checklist:

- [ ] **Runes Syntax Validity**: Ensure no legacy reactivity (`export let`, `$:`) is present. All reactive state must use runes.
- [ ] **Effect Cleanup**: Confirm all `$effect` blocks containing side effects return a cleanup function.
- [ ] **Accessibility (A11y)**: Ensure animations respect user preferences using `@media (prefers-reduced-motion: reduce)`. Disable or significantly reduce motion when this preference is active.
- [ ] **Event Modifier Safety**: Use Svelte's native event modifiers (e.g., `|preventDefault`, `|stopPropagation`) instead of imperative JS calls inside handlers.
- [ ] **Type Safety**: Ensure TypeScript is strictly typed within `<script lang="ts">`, typing all `$props()` interfaces.

---

## 5. Common Edge Cases & Troubleshooting

*   **Hydration Mismatches**: If animations trigger during Server-Side Rendering (SSR), it can cause visual glitches during client hydration. Ensure entry animations only fire after the component has mounted on the client, or disable SSR for highly dynamic, non-SEO motion components.
*   **Stale State in Closures**: When using external animation libraries (like GSAP) inside `$effect`, ensure the animation logic correctly reacts to `$state` changes by explicitly referencing the state inside the effect block, allowing Svelte to track the dependency.

---

## Reference Example

Below is a compliant Svelte 5 component demonstrating runes, native spring motion, and proper effect cleanup.

```svelte
<script lang="ts">
	import { spring } from 'svelte/motion';
	import { fade } from 'svelte/transition';

	// Svelte 5 Runes
	let { initialX = 0, initialY = 0 } = $props<{
		initialX?: number;
		initialY?: number;
	}>();

	let isHovered = $state(false);

	// Physics-based motion
	let coords = spring(
		{ x: initialX, y: initialY },
		{ stiffness: 0.1, damping: 0.25 }
	);

	let size = $derived(isHovered ? 1.2 : 1);

	// Defensive Programming: Cleanup in effect
	$effect(() => {
		const handleGlobalClick = () => {
			coords.set({ x: 0, y: 0 }); // Reset on global click
		};
		window.addEventListener('click', handleGlobalClick);

		// Cleanup function
		return () => window.removeEventListener('click', handleGlobalClick);
	});
</script>

<!-- Accessibility: Disable hover effects if user prefers reduced motion (handled in CSS usually, but state is tracked here) -->
<button
	class="motion-button"
	onmouseenter={() => (isHovered = true)}
	onmouseleave={() => (isHovered = false)}
	style="transform: translate({$coords.x}px, {$coords.y}px) scale({size})"
	in:fade={{ duration: 300 }}
>
	Interactive Element
</button>

<style>
	.motion-button {
		will-change: transform; /* Hardware acceleration */
		padding: 1rem 2rem;
		background: #000;
		color: #fff;
		border: none;
		border-radius: 8px;
		cursor: pointer;
	}

	@media (prefers-reduced-motion: reduce) {
		.motion-button {
			/* Disable hardware accelerated scale in CSS for a11y */
			transition: none;
			transform: none !important;
		}
	}
</style>
```
