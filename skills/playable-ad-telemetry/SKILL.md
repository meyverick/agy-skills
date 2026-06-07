---
name: playable-ad-telemetry
description: Implements custom interaction tracking and network-specific telemetry events for playable ads without relying on heavy third-party SDKs.
---

# Playable Ad Telemetry

This skill implements lightweight, custom event tracking within playable ads to provide the network (e.g., Voodoo, Meta, AppLovin) with granular data on user interactions (first click, level complete, CTA click).

## Core Rules
1. **Discrete State Triggers:** Do not log continuous telemetry data (such as ticking scores or exact pixel tracking) inside the `update()` loop. Isolate telemetry strictly to discrete user state shifts (e.g., `ad_loaded`, `tutorial_completed`, `first_interaction`, `core_loop_win_loss`, `cta_clicked`).
2. **Zero-Weight Beacons:** Prioritize `navigator.sendBeacon()` for asynchronous data transfer to avoid blocking the main rendering loop or adding payload weight.
3. **Fail-Fast & FEAR**: Wrap telemetry calls in `try...catch` blocks to ensure that tracking failures do not crash the ad or interrupt the user experience.
4. **Defensive Programming**: Validate network endpoints and ensure objects like `window.webkit.messageHandlers` or `mraid` exist before invoking them.
5. **No Heavy Dependencies**: Do not include heavy SDKs. Use native `fetch()`, `sendBeacon()`, or the specific ad network's JS bridge.
6. **Data Privacy**: Strictly mask PII/PHI. Never track device IDs directly from the web view.

## Reference Example

```javascript
class MicroAnalytics {
    static ENDPOINT = "https://your-telemetry-sink.com/v1/track";

    static logMilestone(step, eventName, payload = {}) {
        try {
            const eventData = { ts: Date.now(), step, act: eventName, ...payload };
            
            // 1. Zero-allocation check for MRAID/Network tracking environments
            if (typeof window !== 'undefined' && window.mraid) {
                if (window.mraid.logEvent) window.mraid.logEvent(eventName);
            }
            // 2. iOS WebKit bridge fallback
            else if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.tracking) {
                window.webkit.messageHandlers.tracking.postMessage(JSON.stringify(eventData));
            } 
            // 3. Custom REST Beacon (Zero-Weight Telemetry)
            else if (navigator.sendBeacon) {
                navigator.sendBeacon(this.ENDPOINT, JSON.stringify(eventData));
            } 
            // 4. High-performance asynchronous fetch fallback
            else if (typeof fetch !== 'undefined') {
                fetch(this.ENDPOINT, { 
                    method: "POST", 
                    body: JSON.stringify(eventData), 
                    mode: "no-cors" 
                }).catch(e => { /* Ignore network errors */ });
            }
        } catch (e) {
            console.error("Telemetry failed safely:", e);
        }
    }
}

// Usage: Triggered strictly on discrete state shifts
MicroAnalytics.logMilestone(1, "ad_loaded");
MicroAnalytics.logMilestone(2, "first_interaction", { x: 120, y: 300 });
```
