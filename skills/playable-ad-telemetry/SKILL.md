---
name: playable-ad-telemetry
description: Implements custom interaction tracking for playable ads. Use when logging user interactions without relying on heavy third-party SDKs.
---

# Playable Ad Telemetry

This skill governs the integration of lightweight, custom telemetry and event tracking directly into the playable ad, avoiding the payload bloat associated with heavy SDKs like Firebase or Amplitude.

## When to Use

- **Use when** tracking "First Interaction", "Level Complete", or "Fail State" events in a playable ad.
- **Use when** firing custom tracking pixels.
- **NOT for** integrating massive, full-stack analytics suites.

## Core Process

### Phase 1: The Lightweight Pixel
- Most playable ad telemetry is tracked via a simple `fetch()` or `Image()` pixel request.
- `const img = new Image(); img.src = "https://tracker.com/event?type=click";`

### Phase 2: Non-Blocking Execution
- Telemetry must NEVER block the game rendering loop.
- Execute network calls asynchronously, and immediately discard errors to prevent the game from crashing if the tracker goes down.

### Phase 3: Network Agnosticism
- Different networks (AppLovin, IronSource) have different macros (e.g., `{DEVICE_ID}`). 
- Ensure your telemetry strings safely replace or ignore unresolved macros without crashing.

## Common Rationalizations

| Rationalization | Reality |
|---|---|
| "I'll install the Google Analytics SDK via npm." | Full SDKs add 100KB+ to the payload. Playable ads only need lightweight pixel tracking. Use raw JS `fetch` or `Image` beacons. |
| "I'll await the telemetry response before showing the CTA." | Telemetry is fire-and-forget. Awaiting the response will lock the ad if the user has a poor connection, costing you a conversion. |

## Red Flags

- `await fetch()` calls on telemetry endpoints inside critical UI interactions.
- Importing massive third-party analytics libraries (`amplitude-js`, `firebase`).

## Verification

Before finalizing the telemetry integration:
- [ ] The tracking is executed via lightweight HTTP calls (Image pixels or async fetch).
- [ ] No `await` blocks or synchronous code hold up the game loop for telemetry.
- [ ] The total code footprint for telemetry is under 100 lines.
