---
name: unity-ads-integration
description: Integrates Unity's first-party ad network (Unity Ads SDK) into Unity projects, focusing on placement IDs, initialization sequences, and specific C# Advertisement APIs.
---

# Unity Ads Integration

This skill focuses on the implementation of the Unity Ads SDK in Unity C# projects, typically used when a project relies exclusively on Unity's first-party network without external mediation.

## Core Rules
1. **Asynchronous Initialization:** Always initialize the Unity Ads SDK asynchronously (`Advertisement.Initialize`) and implement the `IUnityAdsInitializationListener` interface to catch initialization failures.
2. **Pre-loading Constraints:** Never attempt to show an ad without first explicitly loading the specific placement ID (`Advertisement.Load`) and awaiting the `IUnityAdsLoadListener` success callback.
3. **Defensive Callbacks:** Implement `IUnityAdsShowListener` meticulously. Handle `OnUnityAdsShowFailure` gracefully (e.g., granting no rewards but allowing the game to continue without blocking UI) and only disburse rewarded items on `UnityAdsShowCompletionState.COMPLETED`.
4. **Environment Separation:** Use compiler directives (`#if UNITY_IOS`, `#if UNITY_ANDROID`) to automatically switch between iOS and Android Game IDs at runtime. Ensure `testMode` is strictly disabled in production builds.

## Architecture Guidelines
Wrap all Unity Ads API calls within a single centralized `AdManager` singleton or dependency-injected service. Never scatter `Advertisement.Show()` calls across various gameplay scripts.
