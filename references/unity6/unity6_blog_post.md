# Unity 6 is here: See what's new

[Unity Blog](/blog)

# Unity 6 is here: See what's new

![Martin Best](/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Ffuvbjjlp%2Fproduction%2F1972ed22c565c475596ae43c24f2dee15b9117ba-500x500.jpg&w=128&q=75)

MARTIN BEST / UNITY Product Architect

Oct 17, 2024|13:42 MinProgramming and DevOps

![Unity 6 is now available](/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Ffuvbjjlp%2Fproduction%2F194a4db74ba04548b4a0158a49ae88278041ebc8-1920x1080.jpg&w=3840&q=75)

Hi everyone, I'm Martin Best, Product Architect here at Unity, and I’m excited to announce that Unity 6 is now available for [download](/releases/unity-6).

Unity 6 represents the beginning of the next generation of the Unity Engine and is the new official version name for what was previously referred to as Unity 2023 LTS. Our teams have been hard at work to deliver you the most stable and performant release to date in order to bring you new features that will enhance your creativity in the Editor.

To learn more about Unity 6's stability, performance, and our support commitment, hear directly from our CEO, Matt Bromberg, [here](/blog/introducing-unity-6-launch).

With Unity 6, you’ll get access to faster rendering, advanced lighting options, seamless multiplayer workflows, enhanced AI capabilities, and improved support for mobile web runtimes. You can find more details in the [official release notes](/releases/editor/whats-new/6000.0.23#notes).

All of us at Unity are incredibly proud of this release and excited to see the creative possibilities it unlocks for you, the community. To give you more insight on what’s in Unity 6, we asked our product teams to share the features they hear the community is most excited about with you.

### **Boost rendering performance**

Hi, I’m Oliver Schnabel, Senior Technical Product Manager for Graphics.

Unity 6 is delivering many performance improvements to both URP and HDRP, and I am really proud of the optimizations we have made to both render pipelines. We’re introducing a series of optimizations aimed at speeding up production across platforms, reducing performance overhead, and enabling smoother, more intricate scenes.

**GPU Resident Drawer** will allow you to efficiently render larger, more detailed worlds across all platforms including, high-end mobile, PC, and consoles. It optimizes the CPU cost by transferring static objects from CPU to GPU without complicated manual optimization. **GPU Occlusion Culling** boosts performance by reducing the overdraw per frame, making sure you’re not rendering things that aren’t visible. Our cross-platform temporal upscaler called **Spatial Temporal Post-Processing (STP)** takes frames rendered at a lower resolution and upscales them, producing a high-quality, temporally antialiased image.

We’ve tested these features and have seen more than 2X more performance thanks to the GPU Resident Drawer (when lots of instances are used) or STP (when the GPU is bound by full-screen effects or fill rate).

We’ve also received great feedback about **Render Graph**. Mobile developers will appreciate it for its memory and energy efficiency, while PC and console developers will value its high level of customization. We’ve seen significantly lowered memory bandwidth by up to 50%, which improves battery consumption and reduces heat. The **Split Graphics Jobs** for DirectX12 allows us to multithread the processing of graphics commands, boosting performance – particularly in larger projects with intricate environments. We tested Split Jobs using internal benchmarks and real game productions and measured up to a 40% reduction in CPU latency. We also introduced DX12 Graphics Jobs support in Editor, improving rendering performance in the Scene and Game views.

One of the best ways to experience many of these features is through our [**Fantasy Kingdom in Unity 6**](/demos/fantasy-kingdom) URP Demo, now available to download through the Asset Store.

This content is hosted by a third party provider that does not allow video views without acceptance of Targeting Cookies. Please set your cookie preferences for Targeting Cookies to yes if you wish to view videos from these providers.

Cookie settings

We look forward to having you join us in our [**Graphics Discussions**](https://discussions.unity.com/lists/graphics), where you can access feature support and ask us questions directly. We’d love for you to share your experience, as well as the amazing things you create with us.  

### **Simplify multiplayer game creation**

Hi everyone, I’m Laurent Gibert, Director of Product Management for DOTS & Multiplayer.

I am really excited by what the team has accomplished with Multiplayer in the last 2 years. Unity 6 is stepping up with an incredible end-to-end multiplayer platform where everything is seamlessly integrated, making it faster and easier for you and your teams to start creating.

**Multiplayer Center** is going to be your hub for success. It offers a curated list of all multiplayer tools and services relevant to your project, available whenever you need them. It eliminates the complicated task of having to choose which multiplayer feature tech to implement by recommending it for you. The **Multiplayer Widgets** are pre assembled UI – small, configurable, and customizable templates – that allow you to easily add multiplayer features, whether it’s a lobby, a session connection, or voice chat.

![Multiplayer Center in Unity 6](/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Ffuvbjjlp%2Fproduction%2Fd01a034ded515b1a5b7f8413086d38bb65d931a9-3456x2234.png&w=3840&q=75)
Multiplayer Center in Unity 6

When it’s time to validate your gameplay, deployment can sometimes slow down iteration, and we wanted to solve this. **Multiplayer Play Mode** is so convenient because it helps streamline this process by allowing you to validate your gameplay instantly, launching up to four independent, lightweight editor processes from the same assets on disk. For the most ambitious server-hosted projects, **Play Mode Scenarios** allows you to configure deployment steps, including the build of your dedicated server, and its upload straight to your Multiplay Hosting servers.

Another feature I’m excited about is **Distributed Authority (Beta).** Client-hosted games limit costs but put the game at the mercy of host disconnections or latency issues. Distributed Authority (Beta) in Netcode for GameObjects is a scalable, cost-effective solution that manages client ownership and enables advanced latency strategies for seamless scaling.

![Asteroid sample using Distributed Authority (Beta) in Unity 6](/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Ffuvbjjlp%2Fproduction%2Fcbaa1e7a938696ca416340d56f749268d72c30e1-2842x1572.png&w=3840&q=75)
Asteroid sample using Distributed Authority (Beta) in Unity 6

Download the updated **[Megacity Metro demo](/demos/megacity-competitive-action-sample)** to explore its multiplayer mechanics and its implementation of multiplayer services. You can also experiment with all the new Unity 6 features. These are just a few of the Multiplayer features we are delivering in Unity 6.

Read more about all of the solutions here. We look forward to connecting with you on our **[Multiplayer Discussions](https://discussions.unity.com/lists/multiplayer)** community channel.

### **Expand multiplatform reach**

**Unity Web**  
  
Hey there, this is Ben Craven, a Staff Technical Product Manager at Unity, and I look after our web platform.

Unity 6 is packing some killer features for Unity Web.

First up, let's talk about performance. Unity has included SIMD for a while, and now we have web assembly SIMD support, which will improve CPU performance in web projects. We are also throwing C and C++ multithreading into the mix, which opens up the potential for even better native code performance inside browsers.

Have you ever been annoyed by the 2GB memory limit on web projects? If so, you'll be happy to hear that the next generation Web Assembly in Unity 6 is doubling it to 4GB. More memory means more room for your ideas to come to life.

But here's the real game-changer: Unity is finally bringing web to mobile devices. You can now run your Unity projects right inside mobile browsers and have official support backed by Unity. The mobile web story doesn't stop there. You can also embed your projects in native apps using web views, or even use a progressive web app template to make your web apps feel more like native mobile apps with device storage and their own home screen shortcuts.

Expand your audience across the web with your mobile games by leveraging Unity’s fully-featured engine to create rich cross-device experiences.

Unity 6 is upping the ante in the web space. I can't wait for you to get your hands on these new features and see what kind of magic you can create. In fact, we’re so excited to see what kind of web games you come up with that we’re sponsoring the [Crazy Web Game Jam 2024](https://jam.crazygames.com) with our friends over at Crazy Games. The jam kicks off on November 1. Until then, Unity will be rolling out a bunch of web development tips and goodies, including Asset Store bundles for this game jam. Make sure to check it out!

![A banner for Crazy Web Game Jam 2024 sponsored by Unity, available at jam.crazygames.com](/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Ffuvbjjlp%2Fproduction%2F15517a39f60834e585b92c04ef851ae67938c7cd-692x389.jpg&w=1920&q=75)
Sign up for the Crazy Web Game Jam 2024!

**Unity multiplatform features (Build Profiles, Platform Browser)**

Hi, I’m Thom Hopper, Staff Technical Product Manager for Unity Multiplatform.

I'm looking forward to the general release of Unity 6, when folks will be able to get their hands on the Build Profile window and the Platform Browser. These new windows provide a significantly better way to discover platforms and configure builds compared to older editor versions. The new workflow unlocks possibilities that previously required custom editor scripting to achieve.

Developers are going to be able to create multiple Build Profiles for any platform they have access to, each with their own build settings and data, and share these build profiles assets with their team using their version control system of choice. No more fiddling with checkboxes when we want to change build target or package type.

![ screen capture of the new Build Profile window within the Unity Editor.](/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Ffuvbjjlp%2Fproduction%2F0990d97e36484387917e9e4f3fbdc9cb33399716-1374x931.png&w=3840&q=75)
The new Build Profile window unlocks a new workflow with new configuration options.

I’m eager to see how developers will use Build Profiles, especially given how customizable they are. Aside from the platform build settings, each can have unique scene lists for including different content in the game. They can have custom scripting defines for changing script behavior for different profiles and player settings overrides that let developers customize all player settings per profile. This really lets a build profile describe much more than just a development, debug, or release target (although they can do that too).

You can read more about all of the solutions here. We are looking forward to connecting with you on our **[Target Platforms Discussions](https://discussions.unity.com/lists/target-platforms)** community channel.

### **Achieve more engaging visuals**

I’m Steven Kent, a product manager supporting our Unity Engine Graphics teams, and I’m excited about the advancements we’ve delivered for you to **achieve more engaging visuals** in Unity 6.

**Adaptive Probe Volumes (APV)**, a standout feature in Unity 6, automates probe placement, streamlining the process for faster iteration of light-probe-based indirect diffuse lighting.

APVs also elevate visuals with stunning lighting effects, enabling seamless transitions through **Sky Occlusion** and **Scenario Blending.** Unity's new **Light Baking Architecture** now powers lighting data generation, optimized to run efficiently even on devices with low-memory GPUs.

This content is hosted by a third party provider that does not allow video views without acceptance of Targeting Cookies. Please set your cookie preferences for Targeting Cookies to yes if you wish to view videos from these providers.

Cookie settings

We've upgraded **VFX Graph** for ease of use, extensibility, and URP/HDRP feature parity. HDRP now features Volumetric Fog Output and URP supports 6-way lighting for deeper, more realistic environments. Additionally, **Shader Graph’s** UI Canvas target allows UI artists to craft custom UI widgets using an SDF-based workflow, making them resolution independent and dynamic, as well as advanced background processing such as blur.

I’m also excited about the high-definition features and upgrades that will enable you to build high-fidelity 3D experiences. **HDRP's enhancement to environmental effects** through atmospheric scattering, ozone layer simulation, and the ability to depict realistic water, as well as enhancements to character hair and skin rendering, takes visual fidelity to the next level. You can now also harness the **Ray Tracing API**, which is officially production-ready on supported platforms, including Windows, Xbox Series X|S, and PlayStation®5.

This content is hosted by a third party provider that does not allow video views without acceptance of Targeting Cookies. Please set your cookie preferences for Targeting Cookies to yes if you wish to view videos from these providers.

Cookie settings

Explore the new Unity 6 Time Ghost Demo, now available for download on the Asset Store. This demo showcases the latest advancements in HDRP, enhanced lighting capabilities with APVs, Scenario Blending, and more.  
  
Also to get you started, Unity 6 eases new users into mastering tools like Shader Graph, VFX Graph, and new features in HDRP with intuitive learning resources and new sample sets made available in the Package Manager.You can read more about the new Unity 6 Global Illumination [here](/blog/engine-platform/new-ways-of-applying-global-illumination-in-unity-6), or join us in [**Graphics Discussions**](https://discussions.unity.com/lists/graphics).

### **Unlock possibilities with Runtime AI**

Hi everyone, I’m Bill Cullen, a Principal Product Manager of AI.

It’s amazing to see what developers have done with runtime AI models during the Sentis beta and how it’s unlocked new ways to interact with players that were previously impossible. Here’s a look at some of our favorite projects:

This content is hosted by a third party provider that does not allow video views without acceptance of Targeting Cookies. Please set your cookie preferences for Targeting Cookies to yes if you wish to view videos from these providers.

Cookie settings

**Real-world interactions:** New player interactions can be driven by real-world inputs like the camera, microphone, and motion sensors. The example below uses VR device motion sensor data to generate complementary character animations.

  

![Unity Sentis Real-world interactions](/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Ffuvbjjlp%2Fproduction%2Faf498f045f98cb857003330009c7b1ea5a0798fa-2040x1148.png&w=3840&q=75)
Unity Sentis Real-world interactions

**Smarter gameplay**: Build nuanced in-game mechanics, like automated game opponents and game outcome predictions. The example below evaluates poker game moves given the player's current card hand.

![Unity Sentis Smarter gameplay](/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Ffuvbjjlp%2Fproduction%2F4bbe1d079d08c8a0a1e9517339df2c964b7ae0c2-2040x1148.png&w=3840&q=75)
Unity Sentis Smarter gameplay

**Game effects:** Enhance player experiences with new types of animations and rendering techniques. The example below guides and controls a satellite docking maneuver with reinforcement learning.

![Unity Sentis Game effects](/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Ffuvbjjlp%2Fproduction%2F5c1815d7f5953d0ecfac714ea4ddac191fd3c552-2040x1148.png&w=3840&q=75)
Unity Sentis Game effects

Custom-trained AI models and open-source AI models from communities like [Hugging Face](https://huggingface.co/models?library=unity-sentis&sort=trending) enable these use cases. With Sentis automatically optimizing AI models for the Unity 6 runtime, it is much easier to achieve these features compared to previous solutions like a local Python server or cloud-hosted inferences.

To learn more, join us in [AI Discussions](https://discussions.unity.com/tag/Sentis).

### **Enhance productivity and functionality**

Unity 6 comes with several new and updated tools to enhance your productivity and functionality. Below, Peter Hall and Benoit Dupuis will share what they are most excited about when it comes to Profiling and the UI Toolkit.

**Optimizations with higher impact**

Hi, I am Peter Hall, Senior Manager, Profiler and Optimization team and I realize creating games doesn’t always go to plan. Unity 6 includes a new Profiler Highlights module that shows optimization focus areas (CPU or GPU) instantly. The improved Memory Profiler provides accurate resident memory usage, with a detailed breakdown of graphics memory for quicker, higher impact optimizations. With these features, you can create better-performing games, and I’m excited to play them!

![The Unity 6 Memory Profiler now breaks down your graphics memory by resource](/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Ffuvbjjlp%2Fproduction%2Fbe6392a775e4dc0cd631ca45c1fc2e811bd3fd2c-2560x1440.png&w=3840&q=75)
The Unity 6 Memory Profiler now breaks down your graphics memory by resource

**Accelerated UI development**

Hi, I am Benoit Dupuis, Senior Product Manager for UI Toolkit, and I know that producing extensive UI content can often be time-consuming and complex. In Unity 6, we've made significant improvements to UI Toolkit, speeding up the creation of custom UI controls. Developers can now customize how these controls are configured within the UI Builder, making them easier to use. Additionally, our new, fully extensible data binding system further streamlines interface design. I can't wait to see the innovative UIs you’ll create.

![UI Builder: Custom inspectors, UXMLObjects editing, and visual workflows for data bindings](/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Ffuvbjjlp%2Fproduction%2F4da690f1cf32c54c6157b9edf4c321dae61fdac0-5120x2830.png&w=3840&q=75)
UI Builder: Custom inspectors, UXMLObjects editing, and visual workflows for data bindings

### **Get the most out of Unity 6 with these learning resources**

Dive into the latest tools and features with updated demos, in-depth best practice guides, and more.

![ A collage of the technical e-books available on the Unity best practices hub](/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Ffuvbjjlp%2Fproduction%2Fc5074c06f0b5a702c80d043906ba7d7e1ec6f85b-2960x1664.png&w=3840&q=75)
A collage of the technical e-books available on the Unity best practices hub

You can find all of our technical e-books for advanced Unity developers and creators in [the Unity best practices hub](/how-to) or the [Advanced best practice guides section](https://docs.unity3d.com/Manual/best-practice-guides.html) of the Unity Documentation. Choose from over 30 guides that cover programming, project optimization, art, animation, lighting, graphics, DevOps, and game and level design.

You can also accelerate your Unity 6 development with [Unity Learn](https://learn.unity.com?utm_source=unity-blog&utm_medium=blog&utm_campaign=unity-6-launch-blog&utm_content=learn-lp). Our online learning platform provides creators at all skill levels with guided learning and interactive courses in Unity. Access project-based learning in areas such as game development, AR/VR, C# programming, and real-time graphics.

Here are some of the resources ready for Unity 6 creators today:

1.  [**_Introduction to the Universal Render Pipeline for advanced Unity creators_**](/resources/introduction-to-urp-advanced-creators-unity-6): Get in-depth guidance on how to set up URP for a new project, how to work with URP Quality Settings, Adaptive Probe Volumes, URP and custom shaders, HLSL includes, and much more.   
    
2.  [**_Optimize your game performance for mobile, XR, and Unity Web in Unity_**](/resources/mobile-xr-web-game-performance-optimization-unity-6): This guide features all latest and best mobile, XR, and Unity Web performance optimization tips for Unity 6.  
    
3.  [**_Optimize your game performance for consoles and PCs in Unity_**](/resources/console-pc-game-performance-optimization-unity-6): This guide includes all the latest and best PC and console performance optimization tips available for Unity 6.  
    
4.  **_[Get Started with Netcode for GameObjects](https://learn.unity.com/tutorial/get-started-with-netcode-for-gameobjects?utm_source=unity-blog&utm_medium=blog&utm_campaign=unity-6-launch-blog&utm_content=learn-netcode-gameobjects):_** Learn how to set up a simple co-op game, including player movement and user interfaces for different game modes.   
    
5.  **_[Getting started with Unity Web](https://learn.unity.com/tutorial/getting-started-with-unity-web):_** Level up your web development skills with the new features in Unity 6.

We'll be developing many more resources in the coming weeks. Be sure to [bookmark this link](/campaign/unity-6-resources) to easily access all the Unity 6 learning content.

### **We want to hear from you**

To support your journey into Unity 6, we will host six Office Hours in Unity Discussions and the Unity Discord server, where our engineering and product teams will be available to answer your questions and respond to your feedback. Each Office Hours event will focus on one of the key themes of this release.  

[Find all the details about the Unity 6 Office Hours in our official topic on Unity Discussions](https://discussions.unity.com/t/office-hours/1529142).

Check out the Unity 6 [release notes](/releases/editor/whats-new/6000.0.23#notes) for a comprehensive list of features and the [Unity Manual](https://docs.unity3d.com/6000.0/Documentation/Manual/index.html) for details on how to use them. We’re always eager to hear your feedback, questions, and ideas regarding the Unity 6 release. Join the community on [Unity Discussions](https://discussions.unity.com/), or share your feedback directly with our product team through the [Unity Engine Roadmap](/roadmap/unity-platform).

![Unity 6 logo](/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Ffuvbjjlp%2Fproduction%2Ff139fd06314dc205cb4bd4c8150aa42f052ed62c-2304x1296.png&w=3840&q=75)

## Embedded Content