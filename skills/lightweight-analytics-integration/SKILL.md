---
name: lightweight-analytics-integration
description: Integrates mandatory third-party analytics suites into ads by stripping abstractions. Use when raw, minified core JS layers are required to bypass payload limits.
---

# Lightweight Analytics Integration

This skill dictates the process of stripping massive analytics SDKs down to their absolute core REST/HTTP layers. It allows the integration of complex tracking systems into hyper-constrained environments (like Playable Ads) without blowing up the payload size.

## When to Use

- **Use when** a client mandates a specific analytics provider (e.g., Mixpanel, Amplitude) but the official SDK exceeds 100KB.
- **Use when** tracking custom funnels directly via REST endpoints.
- **NOT for** standard web/mobile apps with no payload limits.

## Core Process

### Phase 1: SDK Deconstruction
- Do not use `npm install <analytics-sdk>`.
- Read the provider's REST API documentation directly. 

### Phase 2: The Custom HTTP Wrapper
- Write a 50-line custom wrapper utilizing the native `fetch` API.
- Construct the JSON payload exactly as the REST API expects it.
- E.g., `fetch('https://api.amplitude.com/2/httpapi', { method: 'POST', body: JSON.stringify(payload) });`

### Phase 3: Session & ID Management
- Official SDKs handle UUID generation and session tracking automatically. You must implement this manually.
- Generate a lightweight UUIDv4 or use `crypto.randomUUID()`.
- Store the session ID in local variables for the duration of the ad lifecycle.

## Common Rationalizations

| Rationalization | Reality |
|---|---|
| "I'll just import the core module of the SDK, it should be small." | Even core modules often bundle polyfills, heavy JSON parsers, and retry queues. A custom `fetch` wrapper is the only way to guarantee a < 5KB footprint. |
| "I don't need a session ID for these events." | Analytics dashboards cannot stitch together user journeys without a consistent Session ID or User ID sent with every custom HTTP request. |

## Red Flags

- `package.json` containing heavyweight analytics dependencies for a playable ad.
- Fetch wrappers failing to send a consistent `session_id` across multiple events.

## Verification

Before finalizing the lightweight analytics integration:
- [ ] The integration bypasses the official NPM SDK in favor of a raw `fetch` or `Image` pixel.
- [ ] A custom Session ID is generated and attached to all events.
- [ ] The total byte footprint of the analytics script is under 5KB.
