## 2024-05-24 - Intl.NumberFormat Caching
**Learning:** Repeatedly instantiating `Intl.NumberFormat` inside a helper function (`money()`) causes significant overhead during frequent product renders (e.g., cart, shop, featured products).
**Action:** Always cache `Intl.NumberFormat` instances globally rather than creating them per-call, especially in rendering loops.

## 2026-10-25 - LocalStorage Read Caching
**Learning:** Synchronous operations like `localStorage.getItem` and `JSON.parse` block the main thread and can cause UI stutters when called repeatedly during state updates or rendering. In this codebase, actions like adding to cart trigger multiple reads (update UI, update bag count, re-render cart).
**Action:** Use an in-memory cache variable to store parsed state from localStorage. Read from localStorage once, then read/write from/to the memory cache for subsequent operations, syncing back to localStorage only on writes.
