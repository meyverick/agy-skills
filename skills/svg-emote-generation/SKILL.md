---
name: svg-emote-generation
description: Designs production-ready, perfectly looping SVGs. Use when generating animated emotes, loaders, or math-driven vector graphics.
---

# SVG Emote Generation

This skill governs the creation of perfectly looping, animated SVG (Scalable Vector Graphics) emotes. It explicitly mandates mathematical precision over disjointed keyframing to ensure buttery smooth rendering across all browsers.

## When to Use

- **Use when** creating loaders, spinners, or animated emotes.
- **Use when** modifying SMIL (`<animateTransform>`) or CSS-based SVG animations.
- **NOT for** complex narrative animations or character rigging (use Rive/Spine instead).

## Core Process

### Phase 1: Perfect Looping
- Ensure the start and end states of the animation are mathematically identical.
- For CSS keyframes, 0% and 100% must have the exact same property values. Do not rely on browser extrapolation to bridge gaps.

### Phase 2: Viewport & Scaling
- SVGs must be perfectly scalable. Use `viewBox="0 0 100 100"` (or another square ratio) instead of hardcoding `width` and `height` in pixels.
- Use percentage-based or relative transformations (`transform-origin: center`) rather than absolute pixel coordinates for rotation and scaling.

### Phase 3: Animation Technologies
- Prefer CSS `@keyframes` over SMIL (`<animate>`) where possible, as SMIL is deprecated in some environments and highly unoptimized.
- If using SMIL, ensure `repeatCount="indefinite"` is applied.

## Common Rationalizations

| Rationalization | Reality |
|---|---|
| "The animation has a slight jerk at the end, but it's fine." | A jerk means the loop is mathematically imperfect. You must align the 0% and 100% keyframes flawlessly. |
| "I'll hardcode the SVG to be `500px` by `500px`." | SVGs must scale to the container. Omit absolute pixel dimensions on the root tag and rely exclusively on the `viewBox`. |

## Red Flags

- Missing `viewBox` attribute on the root `<svg>` tag.
- Relying on Javascript (`requestAnimationFrame`) to animate an SVG when CSS keyframes are perfectly capable of doing it.

## Verification

Before finalizing the SVG emote:
- [ ] The `viewBox` is square and correctly encapsulates all paths.
- [ ] The animation loops flawlessly without any visual popping or jerking.
- [ ] CSS `@keyframes` or SMIL nodes define identical start and end states.
