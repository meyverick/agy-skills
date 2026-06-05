Hey <@&1013921269286187118> & <@&1013921175593824337> 

Here's a master list of what you might expect to be upgrading / adjusting to with the upgrade to Unity 6 and upcoming Rust forced wipe:

# Facepunch Changes
- The `OnTriggerStay` Unity event has been stripped and no longer executes for performance reasons
  - **Replacement:** Use `OnTriggerEnter` and `OnTriggerExit` to keep track of the collisions (or look into TriggerBase to understand Facepunches implementation for it, otherwise) use the `Update` / `LateUpdate` or `FixedUpdate`, depending on your need to gate the Stay events inside of it.
- ConsoleSystem: **StringView updates**
  - `Argument 2: cannot convert from 'Facepunch.StringView[]' to 'string[]' [CS1503]` 
    - This could be caused by plugins trying to cast directly the arguments to a string array. Ideally, adjust your code to use StringView[] instead, otherwise in the worst case scenario, do something like `arg.Args.Select(x => (string)x).ToArray()` if you still need the arguments as strings.
  - `float.Parse(arg.Args[2])` or `arg.Args[x].ToInt()`
    - This is old, bad practice of accessing type parsed arguments. Use `arg.GetString`, `arg.GetFloat`, `arg.GetULong` etc instead.
- Loading Messages Newline (`\n`)
  - Using `\n` for newlines doesn't work, use `<br>` instead.
- `ddraw.text` rich-text scaling
  - A problem where the text is spaced out the smaller the text size (set by rich-text `<size>`), no longer use rich-text to set it, instead use the 7th scale argument of the `ddraw` command (it defaults to `2`).

# Unity 6 Changes
If your previously-fine plugins stop compiling all of the sudden and you see (UnityUpgradeable) in the error, it's telling you what needs adjusted, often something easily do-able. Here's a list (might update in the future) with what you could be met with:
- `PhysicMaterial` / `PhysicMaterialCombine` is obsolete:
  - **Replacement:** Rename it to Physic**s**Material or  Physic**s**MaterialCombine respectively and you should be good (I don't know why Unity did this, I just work here)

Our staging branch is now up to date as well if you wanna check out how many hundreds of your plugins broke: 
https://github.com/CarbonCommunity/Carbon/releases/tag/rustbeta_staging_build

Feel free to keep me up to date if there's anything else that I'm missing in the thread 🙏 
Happy weekend!