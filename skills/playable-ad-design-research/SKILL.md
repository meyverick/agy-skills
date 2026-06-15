---
name: playable-ad-design-research
description: Equips agents with search heuristics for finding and applying modern playable ad systems and interactive trends.
---

# Playable Ad Design Research

This skill governs the research protocols required when conceptualizing or modifying playable ads. It prevents the AI from hallucinating outdated UI trends and mandates explicit search strategies to locate current SOTA playable ad mechanics.

## When to Use

- **Use when** asked to design a new playable ad concept.
- **Use when** reverse-engineering competitor ad mechanics.
- **NOT for** writing the actual game code.

## Core Process

### Phase 1: Research Execution
- Do not guess what makes a playable ad successful.
- Query current trends for hyper-casual mechanics (e.g., "ASMR sorting puzzle playable ad", "2026 hypercasual playable ad CTA trends").
- Locate case studies from ironSource, AppLovin, or Voodoo.

### Phase 2: Mechanic Definition
- Successful playable ads are incredibly simple. Define the core loop in exactly 3 steps (e.g., Hook -> Interaction -> Fail State -> CTA).
- Ensure the time-to-first-interaction is less than 3 seconds.

### Phase 3: Friction Engineering
- A playable ad MUST incorporate a "Fail State" or high friction immediately prior to the CTA. 
- The user must feel the urge to click the CTA to resolve the friction (the "Zeigarnik effect").

## Common Rationalizations

| Rationalization | Reality |
|---|---|
| "I'll just design a full 60-second RPG level." | Playable ads have a strict 15-30s lifecycle. Anything longer than 3 seconds to the first interaction will cause users to scroll past. |
| "I'll make the game impossible to lose so the user feels good." | Failing builds frustration which drives store conversions. A near-miss or intentional fail state is statistically proven to increase CTR. |

## Red Flags

- Proposing complex tutorials or text-heavy explanations in the ad.
- Designing game loops without a forced interrupt leading to the CTA.

## Verification

Before finalizing the research document:
- [ ] The mechanic is distilled into a 3-step maximum interaction loop.
- [ ] A forced friction or fail-state is explicitly designed to drive the CTA.
- [ ] Time-to-first-interaction is proven to be under 3 seconds.
