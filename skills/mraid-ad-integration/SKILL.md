---
name: mraid-ad-integration
description: Integrates the MRAID (Mobile Rich Media Ad Interface Definitions) API into HTML5 playable ads. Handles viewability, orientation changes, and the mandatory close/CTA mechanisms.
---

# MRAID Ad Integration

This skill safely integrates the MRAID API into playable ads to communicate with the host mobile application.

## Core Rules
1. **Defensive Programming**: Always check if `mraid` is defined before calling it (`typeof mraid !== 'undefined'`).
2. **State Management**: Listen for the `mraid.addEventListener('ready', ...)` and `mraid.addEventListener('viewableChange', ...)` events to pause/resume the game appropriately.
3. **Call-To-Action (CTA)**: Use `mraid.open(url)` for the final outbound click. 
4. **Cross-Platform Readiness**: Ensure the integration doesn't throw errors when tested in standard desktop browsers (mock MRAID if needed).

## Reference Example

```javascript
function initMraid() {
  if (typeof mraid === 'undefined') {
    console.warn("MRAID not found, running in web mode.");
    startGame();
    return;
  }

  if (mraid.getState() === 'loading') {
    mraid.addEventListener('ready', onMraidReady);
  } else {
    onMraidReady();
  }
}

function onMraidReady() {
  mraid.addEventListener('viewableChange', function(viewable) {
    if (viewable) {
      resumeGame();
    } else {
      pauseGame();
    }
  });
  startGame();
}

function triggerCTA(storeUrl) {
  if (typeof mraid !== 'undefined') {
    mraid.open(storeUrl);
  } else {
    window.open(storeUrl, '_blank');
  }
}
```
