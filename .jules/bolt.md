## 2024-05-24 - Intl.NumberFormat Caching
**Learning:** Repeatedly instantiating `Intl.NumberFormat` inside a helper function (`money()`) causes significant overhead during frequent product renders (e.g., cart, shop, featured products).
**Action:** Always cache `Intl.NumberFormat` instances globally rather than creating them per-call, especially in rendering loops.

## 2024-05-24 - DOM Access in Animation Loops
**Learning:** Accessing DOM properties, even fast ones like `dataset`, inside high-frequency event listeners (like `scroll`) or `requestAnimationFrame` loops is much slower than reading a cached Javascript object property.
**Action:** When working with scroll or animation loops, cache all necessary static DOM values (like speeds or offsets) during initialization so the loop only executes Javascript calculations and the final DOM write.
