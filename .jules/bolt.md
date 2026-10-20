## 2024-05-24 - Intl.NumberFormat Caching
**Learning:** Repeatedly instantiating `Intl.NumberFormat` inside a helper function (`money()`) causes significant overhead during frequent product renders (e.g., cart, shop, featured products).
**Action:** Always cache `Intl.NumberFormat` instances globally rather than creating them per-call, especially in rendering loops.

## 2024-05-24 - IntersectionObserver Cleanup
**Learning:** IntersectionObservers were being used to apply one-time reveal animations (`.reveal`), but were never unobserved. This meant that every time elements entered or left the viewport during scrolling, the observer callback fired and scheduled `setTimeout`s unnecessarily, contributing to scroll overhead.
**Action:** Always call `io.unobserve(e.target)` after the first intersection if the observer is only intended to trigger a one-time effect (like an initial reveal animation).
