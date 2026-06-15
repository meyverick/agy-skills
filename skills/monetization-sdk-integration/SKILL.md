---
name: monetization-sdk-integration
description: Architects multi-network Ad Mediation integrations. Use when integrating AppLovin MAX, IronSource, or handling ad state machines and callbacks.
---

# Monetization SDK Integration

This skill standardizes the robust integration of complex Ad Mediation SDKs (e.g., AppLovin MAX, IronSource, AdMob). It explicitly mandates exponential backoff retries and explicit state machine handling to prevent unhandled ad failures and null-reference crashes.

## When to Use

- **Use when** initializing third-party Ad SDKs.
- **Use when** defining callbacks for rewarded video or interstitial ads.
- **Use when** implementing consent flows (GDPR/CCPA/ATT).
- **NOT for** creating playable ad game logic.

## Core Process

### Phase 1: Explicit Initialization
- Ad networks require network callbacks. Never assume `Init()` finishes instantly.
- Create an explicit state machine for Ad State: `Uninitialized -> Initializing -> Ready -> Loading -> Showing -> Completed`.

### Phase 2: Exponential Backoff Retries
- Ad load failures are common due to poor network connectivity.
- Do not immediately retry `LoadAd()` upon a failure callback. Implement exponential backoff (e.g., 2s, 4s, 8s) to prevent hammering the ad server and getting rate-limited.

### Phase 3: Reward Fulfillment
- Rewards must only be granted inside the `OnAdRewarded` (or equivalent) callback.
- Do not grant rewards immediately upon clicking the ad.

## Common Rationalizations

| Rationalization | Reality |
|---|---|
| "I'll just call `LoadAd()` immediately after `Init()`." | Initialization is asynchronous. Calling `LoadAd()` before the `OnInitComplete` callback fires will result in a hard crash. |
| "If the ad fails to load, I'll just call `LoadAd()` again immediately." | This creates an infinite loop if the user has no internet. You MUST implement an exponential backoff timer. |

## Red Flags

- Missing exponential backoff logic in the `OnAdLoadFailed` callback.
- Assuming the SDK is initialized synchronously within the `Start()` method.

## Verification

Before finalizing the integration:
- [ ] `Init()` strictly utilizes callback delegates before allowing `LoadAd()`.
- [ ] The `LoadFailed` callback triggers an exponential backoff Coroutine/Timer, not a direct retry.
- [ ] Consent structures (GDPR) are passed into the SDK before initialization.
