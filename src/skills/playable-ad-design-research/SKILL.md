---
name: playable-ad-design-research
description: Equips agents with search queries, heuristics, and framework checklists for finding, reverse-engineering, and applying the most effective modern playable ad systems and interactive trends.
---

# Playable Ad Design Research

This skill directs the agent on how to research market trends and translate them into highly-converting playable ad designs. It bridges the gap between what is currently popular in user acquisition and how to technically structure it.

## Phase 1: Trend Analysis (The "What")
1. **Identify Top Creatives:** Search for recent publications, tear-downs, and case studies from mobile intelligence platforms (e.g., Mobile Action, Sensor Tower, SocialPeta, AppLovin Creative Labs).
2. **Determine Core Hooks:** Look for recurring mechanics (e.g., choice-based fail states, ASMR puzzle mechanics, merge progression, multiplier gates).
3. **Analyze Target Audience:** Note whether the trend appeals to hyper-casual, mid-core, or puzzle demographics, adjusting visual contrast and interaction pacing accordingly.

## Phase 2: Design Heuristics (The "How")
When implementing the researched mechanics, strictly adhere to these conversion-optimized design rules:
1. **The 3-Second Hook:** The player must understand the goal and initiate their first interaction within 3 seconds of the ad loading. Minimize text; rely heavily on animated visual pointers (e.g., a bouncing, high-contrast hand cursor).
2. **Frictionless Onboarding:** Eliminate negative states in the first few seconds. Ensure the first interaction is an automatic success to trigger dopamine and secure engagement.
3. **Dynamic Difficulty Adjustment (DDA):** If the player is struggling or idle, invisibly adjust parameters (e.g., widen hitboxes, slow down enemies, flash the correct answer) to prevent abandonment before the CTA.
4. **The CTA Transition:** Structure the experience to end after a brief loop (typically 15-25 seconds). Trigger the End Card / Call To Action exactly when the player encounters a major cliffhanger, a near-miss fail state, or a euphoric win state.

## Best Practices
* **Thematic Consistency:** While "fake ads" are a popular trend, attempt to weave the trending mini-game mechanic into the core game's actual theme to improve Day-1 Retention (D1) post-install.
* **A/B Testing Architecture:** Output playable ad code in a way that allows easy parameter tweaking. Centralize variables like `tutorialSpeed`, `pointerScale`, and `winThreshold` into a single configuration object so publishers can rapidly A/B test creative variations.
