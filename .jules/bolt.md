## 2024-05-24 - Intl.NumberFormat Caching
**Learning:** Repeatedly instantiating `Intl.NumberFormat` inside a helper function (`money()`) causes significant overhead during frequent product renders (e.g., cart, shop, featured products).
**Action:** Always cache `Intl.NumberFormat` instances globally rather than creating them per-call, especially in rendering loops.

## 2026-10-18 - IntersectionObserver unobserve optimization
**Learning:** For run-once CSS transition reveals via IntersectionObserver, leaving observed elements in memory after they have become visible continues triggering callbacks on scrolling, wasting CPU cycles and memory.
**Action:** Always call `observer.unobserve(element)` inside the `isIntersecting` check when the scroll trigger is only meant to happen once.
