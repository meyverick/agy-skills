---
name: tanstack-query-architecture
description: Architects robust server state management using TanStack Query, emphasizing strict caching TTLs, optimistic updates, and SSR hydration.
---

# TanStack Query Architecture

This skill governs asynchronous data fetching, caching, and server state synchronization using TanStack Query, replacing global state managers (like Redux) for remote data.

## Core Rules
1. **Strict Caching TTLs (Pillar 16):** Explicitly define `staleTime` and `gcTime` for every query. Do not rely on defaults for highly volatile transactional data. Set infinite `staleTime` only for immutable lookup data.
2. **Optimistic Updates:** Improve perceived performance for mutative operations (mutations) by optimistically updating the query cache via `onMutate` and rolling back on failure (`onError`).
3. **Query Invalidation:** Strictly manage cache invalidation. Upon successful mutations, explicitly invalidate relevant queries (`queryClient.invalidateQueries()`) to ensure eventual consistency.
4. **Key Factories:** Abstract query keys into centralized Key Factories to prevent typos and ensure consistent caching layers (e.g., `users.all()`, `users.detail(id)`). Do not hardcode query keys in components.

## Architecture Guidelines
Separate concerns: UI components should only consume custom hooks (e.g., `useUserQuery()`) that wrap `useQuery`. The raw `fetch` or `axios` implementation details must be decoupled from the component layer.
