## 2024-05-24 - Intl.NumberFormat Caching
**Learning:** Repeatedly instantiating `Intl.NumberFormat` inside a helper function (`money()`) causes significant overhead during frequent product renders (e.g., cart, shop, featured products).
**Action:** Always cache `Intl.NumberFormat` instances globally rather than creating them per-call, especially in rendering loops.

## 2024-05-25 - IntersectionObserver Unobserve
**Learning:** Leaving elements observed in `IntersectionObserver` after their reveal animation fires causes unnecessary callbacks and CPU overhead on every subsequent scroll event.
**Action:** Always call `observer.unobserve(element)` once the initial animation or loading logic is triggered if continuous monitoring is not needed.
