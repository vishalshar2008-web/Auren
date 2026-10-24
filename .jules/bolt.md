## 2024-05-24 - Intl.NumberFormat Caching
**Learning:** Repeatedly instantiating `Intl.NumberFormat` inside a helper function (`money()`) causes significant overhead during frequent product renders (e.g., cart, shop, featured products).
**Action:** Always cache `Intl.NumberFormat` instances globally rather than creating them per-call, especially in rendering loops.

## 2025-05-17 - Replace O(N) Array Search with O(1) Hash Map
**Learning:** During cart rendering (`renderCart` and `renderBagPage`), the original implementation relied on `PRODUCTS.find()` inside the `cart.map` and `cart.reduce` loops to get product details based on ID. This resulted in O(N) lookups inside an array iteration, creating an O(M*N) bottleneck (where M is cart items and N is total products). As the product catalog grows, this could become a significant performance issue.
**Action:** Created a `productMap` utilizing `Object.fromEntries()` to pre-compute a hash map of products by their ID. This reduces the lookup time during cart rendering to O(1), improving the overall efficiency of rendering operations to O(M). Look out for nested array search patterns and refactor them using hash maps for constant-time lookups.
