## 2024-05-24 - Intl.NumberFormat Caching
**Learning:** Repeatedly instantiating `Intl.NumberFormat` inside a helper function (`money()`) causes significant overhead during frequent product renders (e.g., cart, shop, featured products).
**Action:** Always cache `Intl.NumberFormat` instances globally rather than creating them per-call, especially in rendering loops.
## 2026-10-28 - Array vs Map lookups
**Learning:** Nested array `.find()` in `.map()` or `.reduce()` creates O(N²) bottlenecks on renders.
**Action:** Use a Map to cache array items by ID for O(1) access when repeated lookups are needed.
