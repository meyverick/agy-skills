---
name: mraid-ad-integration
description: Integrates the MRAID API into HTML5 playable ads. Use when handling ad viewability, orientation changes, and mandatory store CTA hooks.
---

# MRAID Ad Integration

This skill enforces the strict integration of the MRAID (Mobile Rich Media Ad Interface Definitions) API. MRAID is mandatory for in-app HTML5 playable ads.

## When to Use

- **Use when** building playable ads requiring MRAID wrappers.
- **Use when** handling the final Call To Action (CTA) click out to the App Store.
- **NOT for** standard desktop browser web games.

## Core Process

### Phase 1: MRAID Initialization
- Check if MRAID exists: `typeof mraid !== 'undefined'`.
- Do not start the heavy game loop (rendering, audio) until `mraid.getState() === 'default'` AND `mraid.isViewable() === true`.
- Listen for the `ready` and `viewableChange` events.

### Phase 2: The Call to Action (CTA)
- Playable ads exist solely to drive clicks to the App Store.
- The final user click must trigger `mraid.open(storeUrl)`. Do not use `window.open`.

### Phase 3: Resize and Orientation
- Listen to `mraid.addEventListener("sizeChange", ...)`.
- Ensure the Canvas resizes seamlessly based on the MRAID container dimensions, not `window.innerWidth`.

## Common Rationalizations

| Rationalization | Reality |
|---|---|
| "I'll just start the game immediately on script load." | The ad may load off-screen in the background. Starting audio or heavy rendering before `mraid.isViewable()` violates ad network policies and drains battery. |
| "I'll use `<a href='...'>` for the install button." | In-app environments hijack standard links poorly. You must bind click events directly to `mraid.open(url)`. |

## Red Flags

- Missing `mraid.isViewable()` checks before initiating `requestAnimationFrame` loops.
- Audio playing unconditionally before the user interacts or the ad is fully visible.

## Verification

Before finalizing the MRAID integration:
- [ ] The game loop pauses and resumes based on `mraid.viewableChange` events.
- [ ] Store redirects are routed explicitly through `mraid.open()`.
- [ ] `window.mraid` null checks are wrapped around all MRAID logic to prevent testing crashes in desktop browsers.
