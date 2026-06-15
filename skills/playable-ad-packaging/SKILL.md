---
name: playable-ad-packaging
description: Packages HTML5 games into a single HTML file. Use when generating final deliverables for Voodoo, AppLovin, or IronSource.
---

# Playable Ad Packaging

This skill enforces the stringent packaging requirements for modern playable ad networks, ensuring the entire HTML5 experience is contained within a single `index.html` file with zero external HTTP dependencies.

## When to Use

- **Use when** compiling or bundling the final playable ad output.
- **Use when** converting images or audio to base64.
- **NOT for** standard web deployment workflows (where CDNs are preferred).

## Core Process

### Phase 1: Inline Everything
Playable ad networks strictly ban external network requests during execution to prevent malicious tracking and guarantee offline performance.
- ALL JavaScript must be injected into `<script>` tags in the HTML body.
- ALL CSS must be injected into `<style>` tags in the HTML `<head>`.

### Phase 2: Base64 Asset Encoding
- ALL images (`.png`, `.jpg`, `.webp`) must be encoded to base64 and embedded directly as `data:image/png;base64,...`.
- ALL audio (`.mp3`, `.ogg`) must be encoded to base64 and embedded directly.

### Phase 3: Payload Minification
- The final `index.html` file must be aggressively minified using tools like HTMLMinifier or Terser.
- Remove all console logs, comments, and debug maps.

## Common Rationalizations

| Rationalization | Reality |
|---|---|
| "I'll just load this font from Google Fonts." | External network requests are blocked by ad networks. The font must be base64 encoded into the CSS or removed entirely. |
| "Base64 encoding increases file size by 33%, I'll use a zip file." | Networks require a raw `.html` file. The 33% base64 bloat is expected and factored into the 5MB limit. |

## Red Flags

- `http://` or `https://` strings anywhere in the final HTML document.
- `<script src="...">` tags pointing to external files.

## Verification

Before finalizing the package, verify:
- [ ] The entire project is compressed into exactly one `index.html` file.
- [ ] A grep search for `http` yields zero external asset URLs.
- [ ] All images and audio are embedded via base64 data URIs.
