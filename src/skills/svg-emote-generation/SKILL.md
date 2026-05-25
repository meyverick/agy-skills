---
name: svg-emote-generation
description: Designs production-ready, perfectly looping Scalable Vector Graphics (SVGs). Use when creating or modifying animated SVGs for emotes, verifying animation loop smoothness, or structuring optimized square aspect-ratio graphics.
license: Apache-2.0
---

# SVG Emote Generation

This skill outlines the process of designing production-ready, perfectly looping Scalable Vector Graphics (SVGs). It guides the creation of highly readable, responsive vector assets optimized for micro-scale UI integration.

## Activation Criteria

Use this skill when:
- Creating new animated emotes or UI indicators as SVGs.
- Modifying or optimizing existing animated SVGs.
- Writing, updating, or saving SVG file assets to the local filesystem.
- Auditing SVG animations for looping compliance, duration budgets, and micro-scale legibility.

---

## State Resolution Protocol (Execute First)

Before generating or modifying any SVG, you must establish state awareness to prevent destructive overrides:

1.  **Inventory Check**: Scan the destination directory (defaulting to `./src/lib/emotes/`) to retrieve the current inventory of existing SVG files.
2.  **Intent Routing**:
    *   **Create New**: If generating a new emote:
        *   Produce a unique kebab-case slug for the identifier.
        *   Compare this slug against the destination directory inventory.
        *   If a file with the same name exists, append a numerical suffix (e.g., `happy-face-2.svg`) to prevent overwriting existing assets.
    *   **Edit Existing**: If modifying an emote:
        *   Verify the file exists in the destination directory.
        *   If it exists, read the existing SVG code before applying any changes.

---

## SVG Design Constraints

### 1. Trimmed Square Aspect Ratio (Maximized Presence)
- The canvas must strictly maintain a 1:1 perfect square aspect ratio.
- Use only the `viewBox` attribute on the root `<svg>` tag (e.g., `viewBox="0 0 500 500"`). Do not use hardcoded `width` or `height` attributes.
- Perfectly trim the SVG to eliminate excessive dead space. Scale the main graphic to fill the canvas as much as possible to maximize visibility.

### 2. Dynamic Bounding Box Analysis
- Analyze the complete animation loop to calculate the maximum bounding box of all elements at their peak extension (e.g., the lowest point of a bounce, the widest point of a stretch, or the furthest reach of a moving element).
- Set the boundaries of the square `viewBox` to tightly encapsulate this maximum animated footprint.
- Ensure that zero clipping or cropping occurs during any frame of the movement while keeping margins to a minimum.

### 3. Transparent Background
- The background must be fully transparent.
- Do not include background `<rect>` elements or any background color filling layers covering the canvas.

### 4. Temporal Resolution & Frame Budgets
- Control the animation's mathematical density.
- Calculate duration (`dur`) and keyframe timings to enforce a target framerate of exactly 8 frames per second (FPS).
- The maximum number of keyframes (discrete values in `values` and `keyTimes` attributes within `<animate>` tags) must not exceed 60 frames under any circumstances to keep payload size optimal.

### 5. Perfect Looping
- Ensure all animations loop seamlessly (`repeatCount="indefinite"`).
- The start and end states of all keyframe animations must be identical.

### 6. High Quality & Smoothness
- Optimize vector paths and animation tags.
- Favor `calcMode="spline"` with appropriate `keySplines` (e.g., standard easing curves like `0.4 0 0.2 1`) over linear animations for professional easing between keyframe budgets.

### 7. Micro-Scale Legibility (28px Optimization)
Ensure emotes remain highly readable at tiny scales (112px, 56px, and 28px) by adhering to the following rules:
- **Silhouette First**: Design outer contours so the graphic remains identifiable when filled with a single flat color.
- **Exaggerated Proportions**: Enlarge key expressive features (such as eyes or mouth) while aggressively minimizing body/auxiliary elements.
- **High Contrast & Bold Lines**: Use saturated colors and thick, bold strokes to separate components.
- **Minimalist Shading**: Avoid complex gradients, soft shadows, or thin strokes that become muddy at 28px.
- **Text Constraints**: Exclude text completely unless it consists of a maximum of two thick, massive letters.

### 8. Self-Containment
- Embed all styles within an internal `<style>` block inside the SVG or apply them as inline attributes on elements.

---

## Reference Example

Below is a compliant, production-ready example of a perfectly looping, optimized, and legible SVG emote (mask jitter with eye glow). It showcases correct use of unescaped attributes, CSS keyframes, 8 FPS timing budget, and a bold micro-legible silhouette.

```xml
<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" data-duration="2.0" data-fps="8">
  <style>
    .mask-group {
      transform-origin: 256px 256px;
      animation: stalk-jitter 2.0s infinite ease-in-out;
    }
    .glare {
      opacity: 0;
      animation: eye-glow 2.0s infinite linear;
    }
    @keyframes stalk-jitter {
      0% { transform: translate(0, 0) rotate(0deg); }
      15% { transform: translate(-15px, -10px) rotate(-3deg); }
      30% { transform: translate(0, -20px) rotate(0deg); }
      45% { transform: translate(15px, -10px) rotate(3deg); }
      60% { transform: translate(0, 0) rotate(0deg) scale(1); }
      62% { transform: translate(8px, -8px) scale(1.05); }
      64% { transform: translate(-8px, 8px) scale(0.95); }
      66% { transform: translate(10px, 5px) scale(1.07); }
      68% { transform: translate(-10px, -5px) scale(0.93); }
      70% { transform: translate(8px, -10px) scale(1.05); }
      72% { transform: translate(-8px, 8px) scale(0.97); }
      74% { transform: translate(0, 0) scale(1.02); }
      76% { transform: translate(0, 0) scale(1); }
      100% { transform: translate(0, 0) rotate(0deg); }
    }
    @keyframes eye-glow {
      0%, 58% { opacity: 0; }
      60% { opacity: 0.6; }
      63% { opacity: 1; }
      72% { opacity: 1; }
      75% { opacity: 0.2; }
      80%, 100% { opacity: 0; }
    }
  </style>
  <!-- Background Shadow -->
  <path d="M215 28.084c-41.58 6.557-73.571 23.214-96.637 46.28C89.316 103.41 74.133 142.997 73.066 187H105v82H80.191c7.48 41.377 20.766 83.17 39.75 118.766C151.043 446.08 196.125 487 256 487s104.957-40.92 136.059-99.234c18.984-35.596 32.27-77.389 39.75-118.766H407v-82h31.934c-1.067-44.002-16.25-83.59-45.297-112.637C370.57 51.298 338.58 34.641 297 28.084V73h-82V28.084z" fill="#09090b" opacity="0.35" transform="translate(0, 16)"/>
  <!-- Animated Group -->
  <g class="mask-group">
    <rect x="215" y="28" width="82" height="45" fill="#111113" stroke="#111113" stroke-width="8" stroke-linejoin="round"/>
    <rect x="73" y="187" width="32" height="82" fill="#111113" stroke="#111113" stroke-width="8" stroke-linejoin="round"/>
    <rect x="407" y="187" width="32" height="82" fill="#111113" stroke="#111113" stroke-width="8" stroke-linejoin="round"/>
    <ellipse cx="176" cy="224" rx="49" ry="41" fill="#000000"/>
    <ellipse cx="336" cy="224" rx="49" ry="41" fill="#000000"/>
    <rect class="glare" x="146" y="214" width="60" height="20" rx="10" fill="#ef4444"/>
    <rect class="glare" x="306" y="214" width="60" height="20" rx="10" fill="#ef4444"/>
    <path d="M215 28.084c-41.58 6.557-73.571 23.214-96.637 46.28C89.316 103.41 74.133 142.997 73.066 187H105v82H80.191c7.48 41.377 20.766 83.17 39.75 118.766C151.043 446.08 196.125 487 256 487s104.957-40.92 136.059-99.234c18.984-35.596 32.27-77.389 39.75-118.766H407v-82h31.934c-1.067-44.002-16.25-83.59-45.297-112.637C370.57 51.298 338.58 34.641 297 28.084V73h-82V28.084zM191 64a9 9 0 0 1 9 9 9 9 0 0 1-9 9 9 9 0 0 1-9-9 9 9 0 0 1 9-9zm130 0a9 9 0 0 1 9 9 9 9 0 0 1-9 9 9 9 0 0 1-9-9 9 9 0 0 1 9-9zM187 96a9 9 0 0 1 9 9 9 9 0 0 1-9 9 9 9 0 0 1-9-9 9 9 0 0 1 9-9zm138 0a9 9 0 0 1 9 9 9 9 0 0 1-9 9 9 9 0 0 1-9-9 9 9 0 0 1 9-9zm-142 39a9 9 0 0 1 9 9 9 9 0 0 1-9 9 9 9 0 0 1-9-9 9 9 0 0 1 9-9zm48 0a9 9 0 0 1 9 9 9 9 0 0 1-9 9 9 9 0 0 1-9-9 9 9 0 0 1 9-9zm50 0a9 9 0 0 1 9 9 9 9 0 0 1-9 9 9 9 0 0 1-9-9 9 9 0 0 1 9-9zm48 0a9 9 0 0 1 9 9 9 9 0 0 1-9 9 9 9 0 0 1-9-9 9 9 0 0 1 9-9zm-137 29h128l-64 28-64-28zm-16 19c25.983 0 49 17.247 49 41s-23.017 41-49 41-49-17.247-49-41 23.017-41 49-41zm160 0c25.983 0 49 17.247 49 41s-23.017 41-49 41-49-17.247-49-41 23.017-41 49-41zM208 304l-48 48h-20l68-48zm16 0h64s-16.915 32-32 32-32-32-32-32zm80 0 68 48h-20l-48-48zm-80 64a9 9 0 0 1 9 9 9 9 0 0 1-9 9 9 9 0 0 1-9-9 9 9 0 0 1 9-9zm64 0a9 9 0 0 1 9 9 9 9 0 0 1-9 9 9 9 0 0 1-9-9 9 9 0 0 1 9-9zm-96 16a9 9 0 0 1 9 9 9 9 0 0 1-9 9 9 9 0 0 1-9-9 9 9 0 0 1 9-9zm128 0a9 9 0 0 1 9 9 9 9 0 0 1-9 9 9 9 0 0 1-9-9 9 9 0 0 1 9-9zm-96 16a9 9 0 0 1 9 9 9 9 0 0 1-9 9 9 9 0 0 1-9-9 9 9 0 0 1 9-9zm64 0a9 9 0 0 1 9 9 9 9 0 0 1-9 9 9 9 0 0 1-9-9 9 9 0 0 1 9-9zm-119 7a9 9 0 0 1 9 9 9 9 0 0 1-9 9 9 9 0 0 1-9-9 9 9 0 0 1 9-9zm174 0a9 9 0 0 1 9 9 9 9 0 0 1-9 9 9 9 0 0 1-9-9 9 9 0 0 1 9-9zm-119 25a9 9 0 0 1 9 9 9 9 0 0 1-9 9 9 9 0 0 1-9-9 9 9 0 0 1 9-9zm64 0a9 9 0 0 1 9 9 9 9 0 0 1-9 9 9 9 0 0 1-9-9 9 9 0 0 1 9-9z" fill="#ffffff" stroke="#111113" stroke-width="8" stroke-linejoin="round"/>
    <path d="M187 164h128l-64 28-64-28z" fill="#dc2626"/>
    <path d="M208 304l-48 48h-20l68-48z" fill="#dc2626"/>
    <path d="M304 304l68 48h-20l-48-48z" fill="#dc2626"/>
    <circle cx="256" cy="50" r="10" fill="#ffffff" stroke="#111113" stroke-width="4"/>
    <circle cx="89" cy="228" r="10" fill="#ffffff" stroke="#111113" stroke-width="4"/>
    <circle cx="423" cy="228" r="10" fill="#ffffff" stroke="#111113" stroke-width="4"/>
  </g>
</svg>
```

---

## Self-Validation Protocol (Defensive Programming)

Before saving or presenting the generated SVG, you must verify the code against the following rules:

- [ ] **XML Compliance**: Run a syntax check or dry-run parse. Verify all open tags (e.g., `<svg>`, `<g>`, `<path>`, `<style>`) have exact matching closing tags.
- [ ] **Zero External Dependencies**: Ensure all fonts, styles, and vector paths are entirely self-contained. No external web font imports (`@import url(...)`), external SVGs (`<use href="http..."/>`), or images are allowed.
- [ ] **Aspect Ratio Rules**: Confirm that the root tag has a 1:1 `viewBox` (e.g. `viewBox="0 0 512 512"`) and does not specify a static `width="..."` or `height="..."`.
- [ ] **Temporal Grid Alignment**: Verify the animation timeline duration (`dur` or CSS animation duration) and keyframe sequence match the target budget (e.g., 8 FPS).
- [ ] **Seamless Loop Equation**: Confirm that the values at `0%` and `100%` in `@keyframes` or keytimes lists are mathematically equivalent to avoid frames skipping.

---

## Payload & Wire Optimization (Green Software Engineering)

Minimize network bandwidth and carbon footprint by optimizing SVG asset files:

1.  **Coordinate Rounding**: Do not write overly precise floating-point values. Round coordinates and Bezier control points to at most 1–2 decimal places (e.g., use `28.1` instead of `28.084`).
2.  **Structural Compacting**: Remove empty layers, redundant grouping groups (`<g>`), editor comments, metadata, and unused `<defs>`.
3.  **Primitive Optimization**: Prefer basic vector primitives (`<circle>`, `<rect>`, `<ellipse>`) where appropriate to reduce path mathematical description length.

---

## Common Edge Cases & Troubleshooting

- **Stroke Border Clipping**: If shapes translate near the margins of the `viewBox`, add a safety margin equal to at least half the `stroke-width` of the outline to prevent the border from clipping at peak extension.
- **Subpixel Blur**: Avoid using half-pixels for initial coordinates (e.g. use `x="12"` instead of `x="12.5"`). Non-integer coordinates cause anti-aliasing blur when scaled to 28px.
- **GPU Acceleration**: For heavy translation/scale animations, declare `will-change: transform` or `transform: translate3d(0,0,0)` in CSS classes to force hardware rendering path.
