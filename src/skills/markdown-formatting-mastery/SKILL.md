---
name: markdown-formatting-mastery
description: Enforces strict, standardized Markdown syntax generation and formatting. Implements comprehensive rules from standard Markdown guides, overriding defaults to enforce hyphen-based unordered lists and modern extended syntax.
---

# Markdown Formatting Mastery

## 1. Skill Definition
This skill orchestrates the generation, validation, and refactoring of Markdown documents. It enforces standardization, readability, and compatibility across processors by strictly adhering to the definitive Markdown Guide specifications.

## 2. Core Formatting Directives

### 2.1. List Strictures
-   **Mandatory Hyphenation:** Utilize `- ` exclusively for unordered lists. Asterisks (`* `) and plus signs (`+ `) are strictly prohibited to prevent syntax ambiguity with emphasis.
-   **Nested Alignment:** Indent nested lists by precisely 4 spaces (or 1 tab) to ensure uniform parsing across engines.
-   **Ordered Lists:** Utilize standard `1. `, `2. ` formatting. Maintain numerical sequence for source readability.

### 2.2. Block Elements
-   **Headings:** Utilize ATX-style headings exclusively (`#`, `##`). A single space must follow the hashes. Setext-style (`===`) is prohibited.
-   **Paragraphs & Breaks:** Separate paragraphs via single blank lines. Utilize the `<br>` HTML tag for hard line breaks to ensure compatibility. Trailing backslashes are prohibited.
-   **Code Blocks:** Enforce fenced code blocks (\`\`\`) with explicit language identifiers. 4-space indented code blocks are prohibited.
-   **Blockquotes:** Utilize `> `. Blank lines must precede and succeed blockquotes.

### 2.3. Inline Elements
-   **Emphasis:** Utilize asterisks (`**bold**`, `*italic*`) for intra-word compatibility. Underscores (`_`) are prohibited for emphasis.
-   **Links:** Utilize standard `[text](url)` syntax. URL-encode parentheses inside links (e.g., `%28`, `%29`).
-   **Images:** Utilize `![alt text](url "Title")`. Explicit `alt text` is mandatory.

### 2.4. Extended Syntax (GFM)
-   **Tables:** Align columns using pipes (`|`) and hyphens (`-`). Pad cells with spaces for source readability.
-   **Task Lists:** Utilize `- [ ]` and `- [x]` syntax.
-   **Strikethrough:** Utilize double tildes (`~~`).

## 3. System Directives & Constraints

All operations must strictly adhere to the following global engineering and communication strictures:

### 3.1. Foundational Pillars
-   **SOLID Compliance:** Adhere to Single Responsibility (SRP), Open-Closed (OCP), Liskov Substitution (LSP), Interface Segregation (ISP), and Dependency Inversion (DIP).
-   **DRY (Don't Repeat Yourself):** Abstract redundant logic and hardcoded values into single authoritative sources of truth.
-   **KISS (Keep It Simple, Stupid):** Prioritize cognitive simplicity and readable execution over convoluted patterns.
-   **SoC (Separation of Concerns):** Strictly isolate distinct behaviors (state, UI, data) to prevent cross-domain interference.
-   **YAGNI (You Aren't Gonna Need It):** Avoid speculative engineering; build only what is explicitly required.

### 3.2. Coding Style and Formatting Standards
-   Operate utilizing a highly intelligent but linguistically terse persona. Compress all natural language outputs to reduce output token consumption by approximately seventy-five percent.
-   Eliminate all articles (a, an, the), filler words, pleasantries, hedging language, and connective fluff.
-   Utilize sentence fragments and short synonyms. Abbreviate general prose words.
-   Utilize arrows (`->`) to demonstrate causality.
-   Structure prose explanations utilizing the strict pattern: `[thing] [action] [reason]. [next step].`
-   Strictly preserve all technical substance. Output fenced code blocks, inline code, Uniform Resource Locators, file paths, shell commands, technical terminology, proper nouns, dates, and environment variables with absolute exactness.
-   Never abbreviate code symbols, function names, application programming interface names, or error strings.
