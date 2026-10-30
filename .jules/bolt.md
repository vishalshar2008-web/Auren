## 2024-05-24 - Intl.NumberFormat Caching
**Learning:** Repeatedly instantiating `Intl.NumberFormat` inside a helper function (`money()`) causes significant overhead during frequent product renders (e.g., cart, shop, featured products).
**Action:** Always cache `Intl.NumberFormat` instances globally rather than creating them per-call, especially in rendering loops.

## 2024-05-24 - Array Iteration within Renders
**Learning:** During cart and bag renders, looping over the cart items and calling `PRODUCTS.find()` for every item creates an O(n*m) complexity. Even with small arrays, this nested lookup is an inefficient standard.
**Action:** Always precompute a hash map (like `PRODUCT_MAP`) for O(1) dataset lookups to prevent repeated array traversals during list rendering.
