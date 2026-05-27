---
name: html5-game-migration
description: Migrates mechanics from full-scale games (Unity, Cocos) into lightweight HTML5/JavaScript implementations suitable for playable ads.
---

# HTML5 Game Migration

This skill focuses on taking core mechanics from existing mobile games and recreating them in lightweight HTML5 frameworks (like Phaser, PixiJS, or Vanilla Canvas) or Svelte for playable ads.

## Core Rules
1. **KISS (Keep It Simple, Stupid)**: Do not port the entire game. Identify the "core loop" or "hook" and migrate only that specific interaction.
2. **Separation of Concerns**: Keep game logic independent from the rendering layer to allow easy swapping between Canvas and WebGL contexts.
3. **Asset Pruning**: Recreate complex 3D assets as pre-rendered 2D sprites or simple SVGs to drastically reduce payload size.
4. **Cross-Platform**: Ensure the resulting build toolchain runs on Windows, macOS, and Linux without native binary dependencies.

## Reference Example
A simple Vanilla JS structure for a lightweight migrated game loop:

```javascript
class PlayableAd {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.lastTime = 0;
        this.state = 'idle'; // idle, playing, endcard
    }

    start() {
        this.state = 'playing';
        requestAnimationFrame(this.loop.bind(this));
    }

    loop(timestamp) {
        if (this.state !== 'playing') return;
        const dt = timestamp - this.lastTime;
        this.lastTime = timestamp;
        
        this.update(dt);
        this.render();
        
        requestAnimationFrame(this.loop.bind(this));
    }

    update(dt) { /* Game Logic */ }
    render() { /* Drawing Logic */ }
}
```
