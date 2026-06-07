---
name: virtual-avatar-engineering
description: Engineers real-time web-based virtual avatars, computer vision pipelines, and high-performance interactive graphics using Svelte 5 and SvelteKit. Orchestrates local ML execution via MediaPipe Tasks Vision, WebAssembly optimization, mathematical animations (LERP, EAR), and Web Worker isolation to drive seamless WebGL/Canvas overlays without dropping frames.
license: Apache-2.0
---

# Virtual Avatar Engineering & Real-Time Computer Vision

This skill outlines the process of building high-performance, real-time virtual avatars and computer vision pipelines using Svelte 5 and SvelteKit. It focuses on isolating heavy Machine Learning (ML) inference from the main UI thread, applying mathematical biomechanical calculations, and ensuring stable 60+ FPS broadcast-quality rendering.

## Activation Criteria

Use this skill when:
- Developing web-based VTuber avatars or Face/Hand/Holistic tracking pipelines using MediaPipe.
- Implementing low-latency device streams (`getUserMedia`) and processing raw video frames.
- Integrating 2D (Canvas), 2.5D (Live2D), or 3D (VRM/Three.js) avatars driven by real-time sensor data.
- Isolating heavy computational workloads using Web Workers and WebAssembly.

---

## 1. Computer Vision & WebWorker Isolation

Computer vision inference (like MediaPipe) blocks the main thread, causing severe UI jank and dropped frames in avatar rendering.

*   **Worker Isolation**: Always execute ML models and computer vision pipelines inside a dedicated Web Worker. The main thread should only handle the Svelte UI and the WebGL/Canvas rendering loop.
*   **Zero-Copy Transfers**: Use `ImageBitmap` and `postMessage` with Transferable Objects to send video frames to the Web Worker without duplicating memory.
*   **Execution Delegates**: Explicitly configure execution delegates (CPU vs. GPU) depending on the environment. For broadcast setups (e.g., OBS Studio browser sources), CPU delegates often perform better because OBS heavily saturates the GPU.

---

## 2. Mathematical Animation & Biomechanics

Raw tracking data from computer vision models is inherently noisy and jittery. It must be smoothed before driving avatar rigs.

*   **Linear Interpolation (LERP)**: Apply LERP to all positional data (x, y, z coordinates) and rotational data (quaternions/Eulers) to smooth out camera micro-jitters.
    ```typescript
    // LERP Function
    const lerp = (start, end, amt) => (1 - amt) * start + amt * end;
    ```
*   **Biomechanical Metrics**: Compute relational metrics rather than absolute coordinates to handle varying face distances.
    *   **Eye Aspect Ratio (EAR)**: Calculate EAR to determine if an eye is open or closed, triggering blink animations.
    *   **Mouth Open Factor (MOF)**: Calculate the vertical distance between inner lip landmarks divided by face height to drive the avatar's jaw bone.
*   **Geometric Clamping**: Clamp tracking metrics to strict upper and lower bounds to prevent avatars from contorting unnaturally when landmarks fail.

---

## 3. Svelte 5 Rendering Architecture

Separate the reactive UI state from the 60+ FPS rendering context.

*   **Runes Protocol**: Use Svelte 5 `$state` and `$derived` strictly for UI configurations (e.g., selecting a microphone, toggling debug overlays, changing avatars).
*   **Decoupled Rendering**: The Canvas or WebGL context (Three.js/PixiJS) must be updated inside a pure `requestAnimationFrame` loop. *Do not* bind high-frequency avatar bone transforms directly to Svelte reactive state variables.
*   **Immutable Config Sync**: When UI configuration changes (e.g., user selects a new accessory), sync the data to the render loop using immutable references to prevent deep-diffing overhead.

---

## 4. Device Streams & Defensive Programming

Hardware access is highly volatile. The application must gracefully handle stream failures and permission denials.

*   **Permission Handling**: Wrap `navigator.mediaDevices.getUserMedia` in `try/catch` blocks. Provide clear Svelte UI fallback states if permissions are denied or hardware is missing.
*   **Stream Cleanup**: If a component unmounts or a user switches cameras, you must explicitly call `track.stop()` on all MediaStream tracks.
*   **WASM Teardown**: MediaPipe WASM instances consume significant memory. Ensure the Web Worker receives a teardown message to run `.close()` on tasks when the avatar session ends.

---

## 5. Self-Validation Protocol

Before deploying or committing a virtual avatar component, verify:

- [ ] **Thread Safety**: Is the MediaPipe inference fully isolated in a Web Worker?
- [ ] **Memory Leaks**: Does the `$effect` teardown stop the video stream, cancel the `requestAnimationFrame`, and terminate the Web Worker?
- [ ] **Smoothing**: Is raw tracking data being smoothed via LERP or moving averages before being applied to the skeleton?
- [ ] **Fallback UI**: Is there a reactive Svelte UI state (`$state(error)`) indicating when a camera is inaccessible or the ML model failed to load?

---

## Reference Example

Below is a conceptual Svelte 5 component demonstrating stream initialization, worker isolation, and decoupled rendering.

```svelte
<script lang="ts">
	import { onDestroy } from 'svelte';

	let videoElement: HTMLVideoElement;
	let canvasElement: HTMLCanvasElement;
	
	let streamStatus = $state<'loading' | 'active' | 'error'>('loading');
	let errorMessage = $state('');

	let worker: Worker;
	let rAFId: number;
	let mediaStream: MediaStream | null = null;

	// Avatar State (Non-reactive for performance)
	const avatarState = {
		headYaw: 0,
		mouthOpen: 0,
		lerpFactor: 0.2
	};

	$effect(() => {
		// 1. Initialize Web Worker for ML isolation
		worker = new Worker(new URL('./vision-worker.ts', import.meta.url), { type: 'module' });
		
		worker.onmessage = (e) => {
			// Receive raw data, apply LERP smoothing
			const { rawYaw, rawMouth } = e.data;
			avatarState.headYaw = lerp(avatarState.headYaw, rawYaw, avatarState.lerpFactor);
			avatarState.mouthOpen = lerp(avatarState.mouthOpen, rawMouth, avatarState.lerpFactor);
		};

		// 2. Request Camera
		navigator.mediaDevices.getUserMedia({ video: { width: 640, height: 480 }, audio: false })
			.then((stream) => {
				mediaStream = stream;
				videoElement.srcObject = stream;
				videoElement.play();
				streamStatus = 'active';
				
				// 3. Start render loop
				startRenderLoop();
			})
			.catch((err) => {
				streamStatus = 'error';
				errorMessage = err.message;
			});

		// 4. Defensive Cleanup
		return () => {
			if (rAFId) cancelAnimationFrame(rAFId);
			if (worker) worker.terminate();
			if (mediaStream) {
				mediaStream.getTracks().forEach(track => track.stop());
			}
		};
	});

	function startRenderLoop() {
		const ctx = canvasElement.getContext('2d');
		
		const loop = () => {
			if (videoElement.readyState >= 2 && streamStatus === 'active') {
				// Send frame to worker (simplified concept, usually draw to OffscreenCanvas)
				worker.postMessage({ type: 'PROCESS_FRAME' });
				
				// Render Avatar to Canvas based on smoothed avatarState
				ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
				ctx.fillStyle = 'blue'; // Example mouth
				ctx.fillRect(150, 200, 100, avatarState.mouthOpen * 50);
			}
			rAFId = requestAnimationFrame(loop);
		};
		loop();
	}

	const lerp = (start: number, end: number, amt: number) => (1 - amt) * start + amt * end;
</script>

<div class="avatar-container">
	{#if streamStatus === 'loading'}
		<p>Initializing Camera and ML Models...</p>
	{:else if streamStatus === 'error'}
		<p class="error">Camera Error: {errorMessage}</p>
	{/if}

	<!-- Hidden video element for stream source -->
	<video bind:this={videoElement} style="display: none;" playsinline muted></video>
	
	<!-- Avatar Render Target -->
	<canvas bind:this={canvasElement} width="640" height="480"></canvas>
</div>

<style>
	.avatar-container { position: relative; }
	.error { color: red; }
</style>
```
