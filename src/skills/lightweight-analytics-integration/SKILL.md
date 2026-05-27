---
name: lightweight-analytics-integration
description: Integrates mandatory third-party analytics suites into playable ads by manually stripping native abstractions and utilizing minified core JS layers.
---

# Lightweight Analytics Integration

This skill focuses on the niche requirement of integrating bulky analytics tools (like GameAnalytics) into strict playable ad environments (< 2MB) where standard npm packages or full SDKs are prohibited due to payload size.

## Core Rules
1. **Strict Minification:** Never install full publisher SDK node modules. Extract and use only the raw, minified Web/JS SDK layer (~20-30 KB).
2. **Strip Mobile Abstractions:** Manually remove any native iOS/Android bridge abstractions from the SDK, as playable ads run purely in sandboxed web views.
3. **Manual Engine Wrapping:** Wrap the raw, stripped SDK manually inside a custom Cocos component or HTML5 singleton, exposing only the required milestone triggers to the game logic.
4. **Fail-Fast & FEAR:** Initialize the analytics tracker within a `try...catch` block. If the core library fails to load due to ad network sandboxing, it must fail silently without blocking the rendering loop.

## Architecture Guidelines
Initialize the stripped SDK at the earliest possible lifecycle event (e.g., `window.onload`), but defer all non-essential network pinging until after the `ad_loaded` milestone to preserve the First Contentful Paint (FCP) metric.
