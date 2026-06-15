---
name: pixijs-2d-rendering
description: Engineers high-performance 2D WebGL/WebGPU graphics using PixiJS. Use when building HTML5 games, batched rendering, or particle systems.
---

# PixiJS 2D Rendering

This skill governs the architecture of high-performance 2D rendering using PixiJS. It maximizes WebGL/WebGPU batching and sprite pooling to ensure 60FPS execution on low-end mobile devices.

## When to Use

- **Use when** building 2D Canvas/WebGL games or interactive web toys.
- **Use when** handling thousands of moving sprites or particles.
- **NOT for** standard DOM UI (React/Svelte/HTML).

## Core Process

### Phase 1: Texture Atlases
- Never load individual `.png` files.
- Combine all game assets into a single Texture Atlas (Sprite Sheet) using tools like TexturePacker. Load the `.json` atlas in PixiJS.
- This allows PixiJS to batch all draw calls into a single GPU operation.

### Phase 2: Object Pooling
- Never use `new PIXI.Sprite()` inside the main update loop (e.g., for bullets or particles).
- Pre-allocate a pool of sprites on startup. Toggle `.visible = false` and `.renderable = false` when they "die", and recycle them when needed.

### Phase 3: Container Hierarchy
- Group logically bound sprites into `PIXI.Container` objects.
- Move the Container instead of iterating through and moving each child sprite individually.

## Common Rationalizations

| Rationalization | Reality |
|---|---|
| "I'll just load 50 different images directly into sprites." | This breaks WebGL batching, resulting in 50 draw calls per frame instead of 1. You MUST pack them into a Texture Atlas. |
| "I'll instantiate a new bullet sprite when the player shoots." | Instantation causes GC pauses and frame drops. You MUST use an object pool for high-frequency entities. |

## Red Flags

- Multiple `PIXI.Texture.from('image.png')` calls for individual loose files.
- `app.ticker.add()` loops containing `new Sprite` or `sprite.destroy()` logic.

## Verification

Before finalizing the PixiJS implementation:
- [ ] Assets are loaded strictly via Texture Atlases.
- [ ] High-frequency objects (bullets, particles) utilize pre-allocated object pools.
- [ ] The draw call count remains consistently low (ideally < 10) via effective batching.
