---
name: tanstack-query-architecture
description: Architects robust server state management using TanStack Query. Use when configuring caching TTLs, optimistic updates, and SSR hydration.
---

# TanStack Query Architecture

This skill manages server state using TanStack Query (React Query / Svelte Query). It ensures aggressive caching, prevents unnecessary network spam, and governs strict optimistic UI updates.

## When to Use

- **Use when** fetching, caching, synchronizing, or updating server state in frontend frameworks.
- **Use when** implementing infinite scrolling or paginated data fetching.
- **NOT for** global client state (like a dark mode toggle); use standard Context/Stores for that.

## Core Process

### Phase 1: Query Keys & Caching
- Treat Query Keys strictly as dependency arrays. If the query function relies on a variable (e.g., `userId`), that variable MUST be in the query key array `['user', userId]`.
- Define explicit `staleTime` and `gcTime`. The default `staleTime` is 0, which means every re-render causes a background fetch. Configure this to a sensible default (e.g., `1000 * 60 * 5` for 5 minutes).

### Phase 2: Optimistic Updates
- When mutating data, update the UI immediately before the server responds to create a fast UX.
- In the `onMutate` callback, cancel outgoing queries for that key, snapshot the previous value, and manually set the query data using `queryClient.setQueryData`.
- In `onError`, rollback the cache to the snapshot.

### Phase 3: SSR Hydration
- When using Next.js or SvelteKit, fetch data on the server during SSR and use `HydrationBoundary` or `dehydrate()` to pass the cache to the client to prevent a loading spinner on the initial paint.

## Common Rationalizations

| Rationalization | Reality |
|---|---|
| "I'll use a `useEffect` to fetch data and store it in React State." | `useEffect` for data fetching causes race conditions, lack of caching, and duplicate requests. TanStack Query replaces it entirely. |
| "I don't need optimistic updates, the API is fast." | Network latency is unpredictable. Optimistic updates are mandatory for a premium, snappy UX. |

## Red Flags

- Utilizing `useEffect` or Svelte `$effect` to perform raw `fetch` calls.
- Missing `staleTime` configuration on `QueryClient`, causing massive API spam.

## Verification

Before finalizing the query architecture:
- [ ] All API fetches occur exclusively through `useQuery` or `createQuery`.
- [ ] Mutations implement optimistic cache updates and rollback mechanisms.
- [ ] Query keys correctly reflect all variables used inside the fetch function.
