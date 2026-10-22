## 2024-05-24 - Intl.NumberFormat Caching
**Learning:** Repeatedly instantiating `Intl.NumberFormat` inside a helper function (`money()`) causes significant overhead during frequent product renders (e.g., cart, shop, featured products).
**Action:** Always cache `Intl.NumberFormat` instances globally rather than creating them per-call, especially in rendering loops.

## 2024-05-24 - O(n²) Nested Array Iterations
**Learning:** Using `.find()` inside `.map()` or `.reduce()` for repeated DOM rendering (like rendering cart items) creates an O(N*M) performance bottleneck, especially on frequent updates.
**Action:** Always create a hash map (e.g., `Object.fromEntries(data.map(item => [item.id, item]))`) for O(1) lookups before rendering array-based collections.
