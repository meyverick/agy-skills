---
name: fairygui-integration
description: Integrates the FairyGUI UI framework into game engines. Use when decoupling visual layout creation from gameplay logic to minimize UI payloads.
---

# FairyGUI Integration

This skill enforces strict MVC (Model-View-Controller) decoupling when using FairyGUI in engines like Unity or Cocos. It mandates that UI layouts remain exclusively in the FairyGUI Editor, with code acting only as a binding layer.

## When to Use

- **Use when** loading and binding `.fui` packages.
- **Use when** hooking up button listeners or dynamic text to UI elements.
- **NOT for** animating game sprites or handling physics.

## Core Process

### Phase 1: Pure Binding
- Fetch UI elements strictly via their FairyGUI export names (`view.GetChild("btn_start")`).
- Never attempt to manually alter X/Y coordinates, colors, or anchors in code unless absolutely required for dynamic procedural generation.

### Phase 2: Event Delegation
- Bind clicks using FairyGUI's event system (`btn.onClick.Add(...)`).
- Keep the callback logic out of the View class. Route events back to the main Game Controller.

### Phase 3: Package Management
- Ensure `.fui` binary packages and their associated atlases are loaded asynchronously before attempting to instantiate a `UIPanel`.

## Common Rationalizations

| Rationalization | Reality |
|---|---|
| "I'll just move the button 50 pixels to the right in the code." | UI layout MUST remain in the FairyGUI Editor. Altering coordinates in code breaks the designer-programmer contract and makes maintenance impossible. |
| "I'll put the game logic inside the UI Button click handler." | UI components must remain dumb. They should only emit events to the overarching GameController. |

## Red Flags

- Hardcoded layout mathematics (changing widths, anchors, or rotations) inside C#/TS scripts.
- Synchronous package loading blocking the main thread.

## Verification

Before finalizing the FairyGUI integration:
- [ ] Zero layout logic exists in the codebase; it is strictly an event-binding layer.
- [ ] Packages are loaded asynchronously via `UIPackage.AddPackageAsync`.
- [ ] UI components emit events to controllers rather than mutating game state directly.
