---
name: oops-framework-development
description: Architects robust game systems, MVC state management, and resource loading using Oops Framework for Cocos Creator 3.x.
---

# Oops Framework Development

This skill implements solid game architecture using the open-source Oops Framework, establishing standard MVC patterns and resource pipelines in Cocos Creator.

## Core Rules
1. **Modular Architecture (SoC)**: Strictly follow the framework's layered structure (`core`, `libs`, `module`). Keep game business logic entirely inside `module`, isolated from low-level libraries.
2. **Resource Management**: Always use the framework's internal `ResManager` (`oops.res.load`) to ensure resources are properly tracked, cached, and released safely.
3. **Event-Driven Communications**: Use the global message dispatcher (`oops.message.on`) to communicate between disconnected modules rather than direct coupling or singletons.

## Reference Example

```typescript
import { oops } from "../../core/Oops";
import { ecs } from "../../libs/ecs/ECS";
import { UIID } from "../common/config/GameUIConfig";

// Example of an Oops Framework ECS System handling UI
@ecs.register('InitializeSystem')
export class InitializeSystem extends ecs.ComblockSystem {
    
    init() {
        // 1. Listen for global events
        oops.message.on("EVENT_GAME_START", this.onGameStart, this);
    }
    
    private onGameStart(event: string, data: any) {
        // 2. Safely load resources and UI using framework managers
        oops.gui.open(UIID.GameMain);
        oops.audio.playMusic("audios/bgm");
    }

    onDestroy() {
        oops.message.off("EVENT_GAME_START", this.onGameStart, this);
    }
}
```
