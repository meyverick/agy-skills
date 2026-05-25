---
name: svg-emote-generation
description: Designs production-ready, perfectly looping Scalable Vector Graphics (SVGs) and packages them into a strict JSON payload. Use when creating or modifying animated SVGs for emotes, verifying animation loop smoothness, or structuring optimized square aspect-ratio graphics.
license: Apache-2.0
---

# SVG Emote Generation

This skill outlines the process of designing production-ready, perfectly looping Scalable Vector Graphics (SVGs) and packaging them into a strict JSON payload. It guides the creation of highly readable, responsive vector assets optimized for micro-scale UI integration.

## Activation Criteria

Use this skill when:
- Creating new animated emotes or UI indicators as SVGs.
- Modifying or optimizing existing animated SVGs.
- Packaging SVG graphics into a structured JSON database or API payload.
- Auditing SVG animations for looping compliance, duration budgets, and micro-scale legibility.

---

## State Resolution Protocol (Execute First)

Before generating or modifying any SVG, you must establish state awareness to prevent destructive overrides:

1.  **Inventory Check**: Scan the destination directory (defaulting to `./src/lib/emotes/`) to retrieve the current inventory of existing emote files.
2.  **Intent Routing**:
    *   **Create New**: If generating a new emote:
        *   Produce a unique kebab-case slug for the identifier.
        *   Compare this slug against the destination directory inventory.
        *   If a file with the same name exists, append a numerical suffix (e.g., `happy-face-2.json`) to prevent overwriting existing assets.
    *   **Edit Existing**: If modifying an emote:
        *   Verify the file exists in the destination directory.
        *   If it exists, read the existing JSON state and SVG code before applying any changes.

---

## Critical I/O Constraints

1.  **Strict File Location**: Save files exclusively to the target directory (e.g., `./src/lib/emotes/`). Generate a filename matching the kebab-case slug and ending in `.json` (e.g., `happy-face.json`).
2.  **Strict JSON Schema**: Output a valid JSON structure conforming precisely to this schema:
    ```json
    {
      "id": "<the-unique-kebab-case-slug>",
      "name": "<Human Readable Name>",
      "updatedAt": <current_unix_timestamp_in_milliseconds>,
      "svgCode": "<THE_ESCAPED_SVG_STRING>"
    }
    ```
3.  **JSON String Escaping**: The `svgCode` field must contain a valid, escaped string. Minimize the SVG to a single line, strip unnecessary whitespace, and escape all double quotes (`"`) as `\"` (or use single quotes for SVG attributes) to ensure the overall JSON payload remains parseable.

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
