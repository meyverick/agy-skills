---
name: unity-ads-integration
description: Integrates Unity's first-party ad network into Unity projects. Use when handling Unity Ads SDK placement IDs, initialization sequences, and C# Advertisement APIs.
---

# Unity Ads Integration

This skill standardizes the implementation of the first-party Unity Ads SDK. It enforces the strict lifecycle of initialization, loading, and showing, leveraging the standard `IUnityAdsInitializationListener` and `IUnityAdsLoadListener` interfaces.

## When to Use

- **Use when** integrating `UnityEngine.Advertisements` into a mobile Unity project.
- **Use when** triggering rewarded videos or interstitial ads natively.
- **NOT for** building HTML5 playable ads or integrating AppLovin MAX.

## Core Process

### Phase 1: Interface Adherence
- The ad manager script MUST implement `IUnityAdsInitializationListener`, `IUnityAdsLoadListener`, and `IUnityAdsShowListener`.
- Do not attempt to poll the SDK state manually in `Update()`.

### Phase 2: The Load & Show Lifecycle
- **Initialize**: Call `Advertisement.Initialize()`. Wait for `OnInitializationComplete`.
- **Load**: Call `Advertisement.Load(placementId)`. Wait for `OnUnityAdsAdLoaded`.
- **Show**: Only call `Advertisement.Show(placementId)` if the ad has successfully loaded.

### Phase 3: Reward State Verification
- Inside `OnUnityAdsShowComplete`, explicitly check `showCompletionState == UnityAdsShowCompletionState.COMPLETED` before granting the player their reward.

## Common Rationalizations

| Rationalization | Reality |
|---|---|
| "I'll just call `Advertisement.Show()` and catch the error if it fails." | Unity Ads will throw hard exceptions or lock the UI if `Show()` is called before `OnUnityAdsAdLoaded`. You must respect the lifecycle. |
| "I'll grant the reward as soon as the video starts." | Users will immediately close the app or skip the ad. Rewards must strictly be granted in the `COMPLETED` state callback. |

## Red Flags

- Missing interface implementations on the AdManager class.
- Calling `Advertisement.Load()` immediately after `Advertisement.Initialize()` without waiting for the completion callback.

## Verification

Before finalizing the Unity Ads integration:
- [ ] The manager script implements all 3 core Unity Ads listeners.
- [ ] `Load()` is only triggered after `OnInitializationComplete`.
- [ ] Rewards are strictly tied to the `COMPLETED` enum state.
