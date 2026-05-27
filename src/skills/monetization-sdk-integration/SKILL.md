---
name: monetization-sdk-integration
description: Architects robust multi-network Ad Mediation integrations (e.g., AppLovin MAX, IronSource), handling consent flows, ad state machines, and exponential backoff retries.
---

# Monetization SDK Integration

This skill architects the integration of comprehensive Ad Mediation platforms (like AppLovin MAX, Unity LevelPlay, or AdMob) to maximize eCPM by managing multiple ad networks simultaneously across engines (Unity, Cocos, native).

## Core Rules
1. **Consent First (Privacy by Design):** Never initialize the mediation SDK until explicit user consent (GDPR, CCPA, ATT) has been gathered or verified. Integrating consent management platforms (CMPs) is a strict prerequisite.
2. **Robust State Machines:** Ad loading is highly volatile. Implement a strict state machine for ad availability (e.g., `None`, `Loading`, `Ready`, `Showing`, `Cooldown`).
3. **Exponential Backoff:** If an ad fails to load, never retry immediately in a tight loop. Implement exponential backoff (e.g., retry after 2s, 4s, 8s, 16s, up to a max cap) to prevent rate-limiting and battery drain.
4. **Impression-Level Revenue Data (ILRD):** Hook into the SDK's impression success callbacks to extract revenue data and forward it to your analytics pipeline (e.g., AppsFlyer, Firebase) for accurate ROAS (Return on Ad Spend) calculation.

## Architecture Guidelines
Decouple the game logic from the specific mediation SDK. Expose a generic interface (e.g., `IMonetizationService.ShowRewardedAd(Action onSuccess, Action onFailure)`) so the underlying mediation provider can be swapped without rewriting game code.
