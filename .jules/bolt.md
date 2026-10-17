## 2024-05-24 - Intl.NumberFormat Caching
**Learning:** Repeatedly instantiating `Intl.NumberFormat` inside a helper function (`money()`) causes significant overhead during frequent product renders (e.g., cart, shop, featured products).
**Action:** Always cache `Intl.NumberFormat` instances globally rather than creating them per-call, especially in rendering loops.

## 2026-10-17 - O(N^2) Product Lookups
**Learning:** Rendering loops containing O(N) array lookups (e.g., `PRODUCTS.find`) create O(N^2) anti-patterns that significantly slow down rendering.
**Action:** Use an O(1) hash map for repeated lookups within loops.
