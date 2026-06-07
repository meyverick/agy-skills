---
name: svelte-game-development
description: Engineers high-performance web-based games and interactive real-time applications using Svelte 5 and SvelteKit. Specializes in managing rapid rendering loops, structuring maintainable game architecture, state synchronization, asset preloading, and building high-performance UIs over HTML5 Canvas or WebGL contexts without dropping frames.
license: Apache-2.0
---

# Svelte Game Development & Real-Time Interactive Architecture

This skill outlines the process of designing and building high-performance, real-time interactive applications and games using Svelte 5 and SvelteKit. It focuses on decoupling high-frequency game rendering loops from reactive UI updates to maintain consistent 60+ FPS frame rates.

## Activation Criteria

Use this skill when:
- Building browser-based HTML5 games, interactive simulations, or WebGL overlay UIs.
- Managing high-frequency state updates (e.g., 60 times a second).
- Implementing raw `requestAnimationFrame` loops alongside Svelte components.
- Designing asset preloading pipelines in SvelteKit for heavy media (images, audio, 3D models).

---

## 1. Game Architecture & State Management

Isolate core game logic from UI reactivity to prevent Svelte's reactivity engine from becoming a bottleneck during high-frequency updates.

*   **Decoupled Game State**: Store critical game state (physics, entity positions) in standard TypeScript classes or simple POJOs. Do not make the entire game state reactive.
*   **Targeted Reactivity**: Use Svelte 5 `$state.raw` or selectively wrap specific UI-bound properties (like Score, Health) in `$state`.
*   **Immutable Structures for Reactivity**: When synchronizing complex objects to the UI, prefer immutable updates or granular `$state` properties to minimize reactivity diffing overhead.

---

## 2. Rendering Loops & Synchronization

Never run a core game loop purely through Svelte reactivity or `$effect` dependencies that trigger UI re-renders on every frame.

*   **The Render Loop**: Manage the `requestAnimationFrame` (rAF) loop manually. Access the Canvas context securely using Svelte's `bind:this={canvasElement}`.
*   **Throttled UI Synchronization**: A game may run physics/rendering at 60 or 144 FPS, but the UI (e.g., a score counter or minimap) only needs to update 10-15 times a second. Throttle or debounce state synchronization from the game loop to the Svelte UI to save CPU cycles.
*   **Event-Driven Updates**: Instead of polling for UI changes in the game loop, emit events from the game engine to notify Svelte components when a significant state change requires a UI update.

---

## 3. SvelteKit Asset Preloading Pipelines

Ensure games load seamlessly without pop-in or stuttering.

*   **SvelteKit `load` Functions**: Utilize server/universal `load` functions in `+page.ts`/`+layout.ts` to pre-fetch critical asset metadata or initial game configuration.
*   **`<svelte:head>` Preloading**: Dynamically inject `<link rel="preload">` tags for critical textures, models, or audio files to instruct the browser to fetch them early.
*   **Asset Managers**: Build an AssetManager class that returns Promises for fully loaded Images/Audio buffers before initializing the game loop.

---

## 4. Performance & Payload Optimization (Green Software Engineering)

*   **Zero Garbage Collection (GC) Stutters**: In the main game loop, avoid allocating new objects, arrays, or closures on every frame. Reuse existing object pools (Object Pooling) to minimize GC pauses.
*   **OffscreenCanvas**: For complex rendering, consider delegating the Canvas rendering to a Web Worker using `OffscreenCanvas` to free up the main thread entirely for Svelte UI and input handling.
*   **DOM Overlay Minimization**: Keep the DOM tree layered over the Canvas as shallow as possible. Complex CSS compositing over a constantly updating Canvas can cause GPU performance degradation.

---

## 5. Self-Validation Protocol (Defensive Programming)

Before finalizing any Svelte Game UI component, verify against this checklist:

- [ ] **Loop Termination**: Ensure every `requestAnimationFrame` has a corresponding `cancelAnimationFrame` within an `$effect` cleanup function or `onDestroy` hook to prevent memory leaks when the component unmounts.
- [ ] **Canvas Context Security**: Handle `null` contexts defensively if `getContext('2d')` or `getContext('webgl')` fails.
- [ ] **Reactivity Isolation**: Confirm that `$effect` blocks do not inadvertently depend on high-frequency game variables, which would cause the UI to thrash.
- [ ] **Stale Closure Prevention**: If attaching DOM event listeners (e.g., keyboard input) that interact with the game loop, ensure they reference the latest game state without creating stale closures.

---

## Reference Example

Below is a compliant Svelte 5 component demonstrating a decoupled game loop, canvas binding, and throttled UI state synchronization.

```svelte
<script lang="ts">
	let canvasElement: HTMLCanvasElement;
	let animationFrameId: number;
	
	// Game Engine State (NOT reactive)
	class GameEngine {
		x = 0;
		score = 0;
		update() {
			this.x = (this.x + 2) % 500;
			this.score += 0.1;
		}
		draw(ctx: CanvasRenderingContext2D) {
			ctx.clearRect(0, 0, 500, 500);
			ctx.fillStyle = 'red';
			ctx.fillRect(this.x, 250, 50, 50);
		}
	}
	
	const engine = new GameEngine();

	// UI State (Reactive, throttled synchronization)
	let uiScore = $state(0);
	let lastSyncTime = 0;

	$effect(() => {
		const ctx = canvasElement.getContext('2d');
		if (!ctx) return; // Defensive: Context might fail

		const loop = (timestamp: number) => {
			// 1. Core Update & Render (60+ FPS)
			engine.update();
			engine.draw(ctx);

			// 2. Throttled UI Sync (e.g., 10 times a second max)
			if (timestamp - lastSyncTime > 100) {
				uiScore = Math.floor(engine.score);
				lastSyncTime = timestamp;
			}

			animationFrameId = requestAnimationFrame(loop);
		};

		// Start loop
		animationFrameId = requestAnimationFrame(loop);

		// Defensive Programming: Loop termination
		return () => {
			cancelAnimationFrame(animationFrameId);
		};
	});
</script>

<div class="game-container">
	<!-- High-performance Canvas -->
	<canvas 
		bind:this={canvasElement} 
		width="500" 
		height="500"
		class="game-canvas"
	></canvas>

	<!-- Reactive UI Overlay -->
	<div class="ui-overlay">
		<h2>Score: {uiScore}</h2>
	</div>
</div>

<style>
	.game-container {
		position: relative;
		width: 500px;
		height: 500px;
		background: #111;
	}
	
	.game-canvas {
		display: block;
	}

	.ui-overlay {
		position: absolute;
		top: 10px;
		left: 10px;
		color: white;
		pointer-events: none; /* Let clicks pass through to canvas if needed */
		will-change: content; /* Hint to browser for UI updates */
	}
</style>
```
