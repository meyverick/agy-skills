---
name: fairygui-integration
description: Integrates the FairyGUI UI framework into game engines (Unity, Cocos) to decouple visual layout creation from gameplay logic and minimize UI payloads.
---

# FairyGUI Integration

This skill focuses on integrating FairyGUI binary asset packages into a project and handling UI logic efficiently.

## Core Rules
1. **Decoupling (SoC)**: All layout, anchors, tween animations, and nested structures are designed inside the FairyGUI Editor. Code must only be used to bind data, set text, and add event listeners.
2. **Performance (KISS)**: Use FairyGUI's Virtual Lists for scrolling menus with hundreds of items to recycle nodes and drastically reduce draw calls and memory overhead.
3. **Cross-Platform Loaders**: Rely on the engine-specific FairyGUI SDK (e.g., `FairyGUI.UIPackage.AddPackage` in Unity or Cocos) to load the UI packages correctly from Asset Bundles or Resources.

## Reference Example

```typescript
// Example using FairyGUI in Cocos Creator or LayaAir
import * as fgui from "fairygui";

export class MainMenuUI {
    private view: fgui.GComponent;

    constructor() {
        // Load the generated package
        fgui.UIPackage.addPackage("UI/MainMenu");
        
        // Instantiate the window/component
        this.view = fgui.UIPackage.createObject("MainMenu", "MainUI").asCom;
        fgui.GRoot.inst.addChild(this.view);

        // Bind logic
        const startBtn = this.view.getChild("btn_start").asButton;
        startBtn.onClick(this.onStartGame, this);
    }

    private onStartGame(): void {
        console.log("Start button clicked!");
        // Play FairyGUI transition/tween defined in the editor
        this.view.getTransition("outAnim").play();
    }
}
```
