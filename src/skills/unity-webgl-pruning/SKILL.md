---
name: unity-webgl-pruning
description: Optimizes and prunes Unity WebGL exports to meet strict playable ad file size limits. Removes unused modules and enforces compression.
---

# Unity WebGL Pruning

This skill reduces the footprint of Unity WebGL builds for playable ads, ensuring compliance with strict ad network file size limits (often <3MB or <5MB) and Green Software Engineering principles.

## Core Rules
1. **Module Stripping**: Strip unused Unity engine code (e.g., Physics2D/3D if not used, UI modules) via Unity Player Settings (Strip Engine Code).
2. **Asset Compression**: Enforce Crunch compression or ASTC for textures, and force Mono over IL2CPP if it yields a smaller uncompressed size (or vice versa depending on the Unity version).
3. **Cross-Platform Tooling**: If using post-build scripts to remove `.br` or `.gz` files or inline the WebGL loader, use OS-agnostic tools (e.g., Node.js `fs` module) rather than Unix shell scripts.
4. **Green Software Engineering**: Optimize wire payloads. Smaller builds reduce energy consumption over millions of ad impressions.

## Reference Example
An OS-agnostic Node.js script to inline the Unity framework `.js` into the `index.html`:

```javascript
const fs = require('fs');
const path = require('path');

const buildDir = path.join(__dirname, 'Build');
const indexHtmlPath = path.join(__dirname, 'index.html');

let htmlContent = fs.readFileSync(indexHtmlPath, 'utf8');
const frameworkPath = path.join(buildDir, 'game.framework.js');

if (fs.existsSync(frameworkPath)) {
    const frameworkCode = fs.readFileSync(frameworkPath, 'utf8');
    htmlContent = htmlContent.replace('<script src="Build/game.framework.js"></script>', `<script>${frameworkCode}</script>`);
    fs.writeFileSync(indexHtmlPath, htmlContent);
}
```
