## 2024-05-24 - Intl.NumberFormat Caching
**Learning:** Repeatedly instantiating `Intl.NumberFormat` inside a helper function (`money()`) causes significant overhead during frequent product renders (e.g., cart, shop, featured products).
**Action:** Always cache `Intl.NumberFormat` instances globally rather than creating them per-call, especially in rendering loops.

## 2026-10-21 - IntersectionObserver Memory Optimization
**Learning:** Using IntersectionObserver for one-way reveal animations without unobserving elements causes redundant callback executions and main-thread overhead on every scroll event when elements re-enter/leave the viewport.
**Action:** Always call `observer.unobserve(element)` inside the callback once the target state (e.g., visibility) is achieved and no further tracking is necessary.
