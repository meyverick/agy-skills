---
name: bug-resolution-reporting
description: Generates structured bug resolution reports. Use when hunting, isolating, fixing, and reporting software defects.
---

# Bug Resolution Reporting

This skill enforces a strict, five-step diagnostic triage workflow for finding, fixing, and reporting bugs. It prevents aimless guessing and ensures defects are permanently eliminated.

## When to Use

- **Use when** investigating unexpected behavior or failing tests.
- **Use when** builds break or production errors occur.
- **NOT for** planning new features or writing initial specs.

## Core Process

### Phase 1: Reproduce
You cannot fix what you cannot consistently reproduce.
- Identify the exact inputs, environment, and steps required to trigger the bug.
- Gather logs and trace the `request_id`.

### Phase 2: Localize
Use backward slicing to isolate the exact line of code or module causing the error.
- Start at the symptom (the error log or UI bug) and trace the execution path backward.

### Phase 3: Reduce
Simplify the inputs until you have the absolute minimal reproduction case.
- Strip away unrelated systems, frameworks, and network calls.

### Phase 4: Fix
Apply the code correction strictly targeting the localized failure point.
- Do not refactor unrelated code during a bug fix.

### Phase 5: Guard
Prevent the bug from ever returning.
- Write a regression test targeting the specific minimal reproduction case.

## Common Rationalizations

| Rationalization | Reality |
|---|---|
| "I think I know what it is, I'll just change this line." | Guessing leads to regressions. You must successfully reproduce and localize the error first. |
| "I fixed it, but I don't know how to write a test for it." | If you cannot write a test for the bug, you have not sufficiently isolated it. |
| "I'll refactor this whole file while I fix the bug." | Conflating bug fixes with refactoring makes PRs impossible to safely review and rollback. |

## Red Flags

- Modifying source code before producing a failing test case or verifying logs.
- PRs for bug fixes that lack accompanying regression tests.

## Verification

Before finalizing the bug resolution report, verify:
- [ ] The exact root cause is documented.
- [ ] A minimal reproducible test case was created and failed initially.
- [ ] The fix was applied cleanly without unrelated refactoring.
- [ ] The regression test now passes consistently.
