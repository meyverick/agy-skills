---
name: playable-ad-packaging
description: Packages HTML5 games into a single HTML file with inline assets (base64) for ad networks like Voodoo, AppLovin, or IronSource. Ensures Green Software minimum payload constraints.
---

# Playable Ad Packaging

This skill orchestrates the packaging of HTML5 games into a single `.html` file, a strict requirement for playable ad networks. It relies on base64 encoding for images and audio, and inline `<style>` and `<script>` tags.

## Core Rules
1. **Single File Output**: Everything must be merged into one `index.html` file. No external requests are allowed (except authorized telemetry/MRAID).
2. **Green Software Engineering**: Minimize payload size. Compress images (WebP/TinyPNG equivalents) and minify CSS/JS before inlining.
3. **Cross-Platform Compatibility**: Use OS-agnostic Node.js scripts or standard tools instead of Unix-specific pipes (`grep`, `sed`, `awk`) when building scripts for this process.

## Reference Example
Here is a Node.js snippet demonstrating OS-agnostic file reading and base64 encoding:

```javascript
const fs = require('fs');
const path = require('path');

// Read an image and convert to base64
const imagePath = path.join(__dirname, 'assets', 'sprite.png');
const imageBuffer = fs.readFileSync(imagePath);
const base64Image = `data:image/png;base64,${imageBuffer.toString('base64')}`;

console.log(`<img src="${base64Image}" />`);
```
