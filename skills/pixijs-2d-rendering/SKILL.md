---
name: pixijs-2d-rendering
description: Engineers ultra-fast, high-performance 2D WebGL/WebGPU interactive graphics and HTML5 games using PixiJS.
---

# PixiJS 2D Rendering

This skill governs the creation of 2D visual applications, interactive media, and lightweight HTML5 games utilizing the PixiJS rendering engine. It emphasizes raw WebGL/WebGPU performance, memory management, and minimizing draw calls.

## Core Rules
1. **Texture Atlases:** Never load and render dozens of separate image files. Always pack visual assets into Texture Atlases (Spritesheets) to ensure PixiJS can batch render calls efficiently, drastically reducing WebGL context switches.
2. **Object Pooling (Pillar 17):** Do not continuously instantiate and destroy `PIXI.Sprite` or `PIXI.Graphics` objects during the render loop. Implement Object Pooling to reuse graphical instances, eliminating heavy Garbage Collection (GC) pauses.
3. **Memory Leak Prevention:** When a scene or component is unmounted, explicitly call `.destroy({ children: true, texture: true, baseTexture: true })` on the relevant containers to purge them from GPU memory.
4. **Culling and Visibility:** Do not allow PixiJS to render objects outside of the camera's viewport or the canvas bounds. Toggle `sprite.visible = false` or `sprite.renderable = false` for off-screen entities to bypass the rendering pipeline entirely.

## Architecture Guidelines
Decouple the game logic/state from the rendering layer. Pass pure data or state objects into PixiJS wrapper classes. The PixiJS components should strictly act as the "View" in an MVC architecture, updating only when the underlying state necessitates a graphical redraw.
