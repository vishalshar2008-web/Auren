## 2024-05-24 - Intl.NumberFormat Caching
**Learning:** Repeatedly instantiating `Intl.NumberFormat` inside a helper function (`money()`) causes significant overhead during frequent product renders (e.g., cart, shop, featured products).
**Action:** Always cache `Intl.NumberFormat` instances globally rather than creating them per-call, especially in rendering loops.

## 2024-05-14 - IntersectionObserver Continuous Firing
**Learning:** For one-time reveal animations, `IntersectionObserver` will continue to fire its callback every time an element enters or leaves the viewport even after the element has been revealed. If the observer is tracking many items, this creates a hidden scroll tax that causes main thread jank, especially on mobile.
**Action:** Always call `observer.unobserve(element)` immediately inside the callback once the intended state change (like adding an `.is-visible` class) is complete.
