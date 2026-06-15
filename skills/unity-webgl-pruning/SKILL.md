---
name: unity-webgl-pruning
description: Optimizes and prunes Unity WebGL exports. Use when reducing final build payload sizes to meet strict playable ad limits (e.g., < 5MB).
---

# Unity WebGL Pruning

This skill dictates the aggressive stripping of Unity engine modules and asset compression to generate minimal WebAssembly (Wasm) builds suitable for HTML5 Playable Ads.

## When to Use

- **Use when** configuring Player Settings for a WebGL export.
- **Use when** the final `.wasm.br` or `.data` files exceed 5MB.
- **NOT for** PC/Console standalone builds where size is unlimited.

## Core Process

### Phase 1: Code Stripping
- Set `Managed Stripping Level` to **High**.
- Disable unused engine modules in `Player Settings -> Built-in Packages` (e.g., disable Physics 3D if the game is 2D, disable Unity UI if using HTML/DOM UI).

### Phase 2: Texture & Audio Compression
- Force all textures to ASTC or Crunch compression. Ensure `Max Size` is restricted to 512 or 1024.
- Force all audio clips to `Force To Mono` and compress as MP3/Vorbis at a low bitrate (e.g., 64kbps).

### Phase 3: WebAssembly Optimization
- Enable **Brotli** compression.
- Disable **Exceptions** (set to `None`).
- Disable **Auto Graphics API** and explicitly select only WebGL 2.0 (fallback to 1.0 if strictly required by the ad network).

## Common Rationalizations

| Rationalization | Reality |
|---|---|
| "I'll leave Physics 3D enabled just in case." | Every unused module adds hundreds of kilobytes to the Wasm binary. You must explicitly strip everything not actively used. |
| "High stripping level breaks my reflection code." | You must use `link.xml` to preserve specific classes rather than lowering the stripping level globally. |

## Red Flags

- `Managed Stripping Level` set to `Low` or `Minimal`.
- Textures importing at `2048x2048` without compression overrides.

## Verification

Before concluding the WebGL optimization, verify:
- [ ] Stripping level is set to `High`.
- [ ] Unused Built-in Packages (Physics, UI, AI) are explicitly disabled.
- [ ] Exceptions are disabled and Brotli compression is active.
