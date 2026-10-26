## 2024-05-24 - Intl.NumberFormat Caching
**Learning:** Repeatedly instantiating `Intl.NumberFormat` inside a helper function (`money()`) causes significant overhead during frequent product renders (e.g., cart, shop, featured products).
**Action:** Always cache `Intl.NumberFormat` instances globally rather than creating them per-call, especially in rendering loops.

## 2024-05-24 - IntersectionObserver Callbacks
**Learning:** IntersectionObserver for one-time animations (like `.reveal` classes on scroll) will continue to fire callbacks for every scroll event where an element enters or leaves the viewport if not unobserved. This unnecessarily utilizes CPU in this codebase for animations that only happen once.
**Action:** Always call `io.unobserve(e.target)` after the initial intersection logic for elements that only need a one-time entry animation.
