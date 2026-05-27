---
name: cocos-playbuild-integration
description: Configures Cocos Creator macro-build exports for playable ads, bundling network APIs and mapping telemetry via slim interfaces like PlayBuildLibrary.ts.
---

# Cocos PlayBuild Integration

This skill focuses on configuring and optimizing the export pipeline for playable ads built with Cocos Creator 3.x, utilizing tools like PlayBuild or CreatePlayAd. 

## Core Rules
1. **Network API Bridging:** Always map engine-level gameplay funnel events into the network's native event hooks (e.g., `mraid.reportDOMEvent()`, `window.gameReady()`) during the macro-build step.
2. **PlayBuildLibrary Abstraction:** Use ultra-slim interfaces like `PlayBuildLibrary.ts` (< 5 KB) to decouple Cocos game logic from the destination ad network's proprietary entry points (`Playable.InstallGame()`).
3. **Green Software Compliance:** Ensure the final macro-build strictly adheres to ad network size constraints (typically < 2MB to 5MB), stripping out unused engine modules during the build pipeline.
4. **Defensive Programming:** Always check for the existence of platform-specific window objects (`window.mraid`, etc.) before triggering telemetry to prevent breaking the web view if testing locally.

## Architecture Guidelines
When setting up the macro-build, isolate all network-specific wrappers outside of the main Cocos `assets/scripts/` folder if possible, injecting them at compile time into the final `index.html` template.
