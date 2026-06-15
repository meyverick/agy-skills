---
name: html5-game-migration
description: Migrates mechanics from full-scale games (Unity, Cocos) into lightweight HTML5/JavaScript implementations suitable for playable ads.
---

# HTML5 Game Migration

This skill governs the architectural migration from heavy 3D game engines into ultra-lightweight 2D HTML5/Canvas implementations to satisfy the strict payload limits (< 5MB) of playable ad networks.

## When to Use

- **Use when** rewriting a Unity or Cocos mechanic into vanilla JS or PixiJS.
- **Use when** faking 3D physics using 2D math (orthographic projections).
- **NOT for** porting complete MMOs or heavy 3D WebGL scenes.

## Core Process

### Phase 1: Mechanic Abstraction
Identify the core loop. Strip away all unnecessary metagame systems.
- If the original game uses 3D physics, convert it to simplified 2D AABB or Circle collision logic.
- Do not attempt to import massive physics engines like Ammo.js or Box2D unless absolutely required.

### Phase 2: Asset Downsampling
- Convert all 3D models into pre-rendered 2D sprite sheets.
- Crush sprite sheets using TinyPNG or equivalent prior to base64 encoding.

### Phase 3: The Vanilla Loop
- Implement a strict `requestAnimationFrame` loop.
- Decouple logical state updates from the rendering context.

## Common Rationalizations

| Rationalization | Reality |
|---|---|
| "I'll just export the Unity project to WebGL." | Unity WebGL often exceeds ad network payload limits and loads slowly. Complete vanilla JS rewrites are often required for premium ad performance. |
| "I need to include Box2D for accurate bouncing." | Playable ads require "fun", not accuracy. Fake the bounce with a simple sine wave or explicit math interpolation (LERP) to save 200KB of payload. |

## Red Flags

- Importing heavy external physics or math libraries for simple logic.
- Using the DOM (`<div>`) to render hundreds of moving particles instead of the Canvas API.

## Verification

Before finalizing the migration:
- [ ] The core mechanic functions entirely on 2D Canvas or lightweight WebGL (PixiJS).
- [ ] Heavy 3D assets have been successfully replaced with optimized 2D sprites.
- [ ] The entire application, fully base64 encoded, sits comfortably under network payload limits.
