---
name: cocos-playbuild-integration
description: Configures Cocos Creator macro-build exports. Use when bundling Cocos mechanics into single-file playable ads.
---

# Cocos Playbuild Integration

This skill standardizes the export of a Cocos Creator 3.x project into a single-file, highly compressed HTML payload for playable ads, using specific macro overrides and build templates.

## When to Use

- **Use when** exporting a playable ad from Cocos Creator.
- **Use when** hooking Cocos input events to external MRAID wrappers.
- **NOT for** standard PC or mobile app exports.

## Core Process

### Phase 1: Engine Stripping (Macros)
- In `Project Settings -> Macro Config`, explicitly disable `ENABLE_WEBGL_ANTIALIAS`, `ENABLE_WEBGL_DEPTH_TEXTURE`, and `ENABLE_PHYSICS_3D` if the ad is 2D.
- Enable `CLEANUP_IMAGE_CACHE`.

### Phase 2: Single-File Bundling
- Utilize a custom build template (`build-templates/web-mobile`) that explicitly base64 encodes the generated `cocos-js` engine and asset bundle.
- Ensure the build pipeline injects all generated code into a single `index.html`.

### Phase 3: The PlayBuildLibrary Interface
- Do not write raw `mraid` calls directly inside Cocos TypeScript components.
- Write a slim `PlayBuildLibrary.ts` interface that emits standard events (`GAME_START`, `GAME_END`, `CTA_CLICKED`). The external HTML wrapper listens to these events to trigger network-specific SDKs.

## Common Rationalizations

| Rationalization | Reality |
|---|---|
| "I'll just manually copy-paste the JS into the HTML after building." | Manual steps fail and are not reproducible. You must use Cocos `build-templates` to automate the single-file injection. |
| "I'll call `mraid.open()` inside the Cocos button click handler." | This hardcodes the game to one network. You must emit a `CTA_CLICKED` event to the wrapper instead. |

## Red Flags

- Missing custom `build-templates` forcing manual HTML post-processing.
- Heavy 3D physics macros left enabled for simple 2D games.

## Verification

Before finalizing the Cocos integration:
- [ ] The export pipeline automatically generates a standalone `index.html` file.
- [ ] The `PlayBuildLibrary` acts as the sole bridge between Cocos TS and the outer DOM.
- [ ] Engine macros are aggressively stripped for performance.
