---
name: unity-javascript-bridge-integration
description: Integrates WebGL JS libraries (.jslib) into Unity C# scripts to safely communicate with browser-level APIs like MRAID or custom telemetry.
---

# Unity JavaScript Bridge Integration

This skill focuses on the exact technical integration layer required to pass data between Unity's C# (WASM) and the browser's JavaScript environment without causing memory leaks.

## Core Rules
1. **SoC (Separation of Concerns)**: Keep all browser interaction within `.jslib` files in the `Plugins/WebGL` directory. Do not scatter `[DllImport]` across gameplay scripts.
2. **Defensive Memory Marshalling**: When passing strings from C# to JS, convert the memory pointers safely using `UTF8ToString()`. 
3. **Fail-Fast & FEAR**: Ensure Unity-to-JS calls catch exceptions in JS. If the browser API (like MRAID) is missing, it must not crash the WASM application.
4. **Bidirectional Communication**: Use `SendMessage(objectName, methodName, value)` from JS to send callbacks back to Unity.

## Reference Example

**1. The JavaScript Library (Plugins/WebGL/AdBridge.jslib)**
```javascript
mergeInto(LibraryManager.library, {
  CallMraidOpen: function (urlPtr) {
    var url = UTF8ToString(urlPtr);
    try {
      if (typeof mraid !== 'undefined') {
        mraid.open(url);
      } else {
        window.open(url, '_blank');
      }
    } catch (e) {
      console.error("Failed to open MRAID link", e);
    }
  },
  
  // Example of calling back to Unity
  TriggerUnityEvent: function() {
    try {
      // Ensure the GameObject 'AdManager' has a method 'OnBrowserEvent'
      SendMessage('AdManager', 'OnBrowserEvent', 'success');
    } catch (e) {
      console.warn("Could not send message to Unity", e);
    }
  }
});
```

**2. The C# Wrapper**
```csharp
using UnityEngine;
using System.Runtime.InteropServices;

public class WebGLAdBridge : MonoBehaviour
{
    // YAGNI: Only import what is strictly needed for the ad network
    [DllImport("__Internal")]
    private static extern void CallMraidOpen(string url);

    public void OpenStoreLink(string storeUrl)
    {
        #if UNITY_WEBGL && !UNITY_EDITOR
        CallMraidOpen(storeUrl);
        #else
        Application.OpenURL(storeUrl);
        #endif
    }

    // Called from JS via SendMessage
    public void OnBrowserEvent(string status)
    {
        Debug.Log("Event from browser: " + status);
    }
}
```
