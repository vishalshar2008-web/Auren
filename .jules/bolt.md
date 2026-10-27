## 2024-05-24 - Intl.NumberFormat Caching
**Learning:** Repeatedly instantiating `Intl.NumberFormat` inside a helper function (`money()`) causes significant overhead during frequent product renders (e.g., cart, shop, featured products).
**Action:** Always cache `Intl.NumberFormat` instances globally rather than creating them per-call, especially in rendering loops.

## 2024-10-27 - IntersectionObserver Unobserve
**Learning:** For run-once animations (like reveal-on-scroll), leaving `IntersectionObserver` observing elements after they have animated causes unnecessary callbacks and main thread work every time those elements cross the viewport threshold.
**Action:** Always call `observer.unobserve(element)` immediately inside the callback once the intended condition (e.g., `isIntersecting`) is met for one-off events.
