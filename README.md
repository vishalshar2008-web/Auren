# AUREN

AUREN is a fictional Indian lifestyle accessories brand, presented as a publishable static storefront. The site includes eight product pages, four collections, three journal articles, catalog search and sorting, a saved shopping bag and a read-only order preview.

## Edit and preview

Edit product and article content in `source/catalog.mjs`, page templates in `source/build.mjs`, and styles in `styles.css`. Regenerate the checked-in HTML and sitemap after changing templates or content.

```sh
node source/build.mjs
python3 -m http.server 8000
```

Open `http://localhost:8000`. The GitHub repository can continue to deploy as a static site from its root without a build step. Existing `product.html?id=…` and `article.html?post=…` links redirect to their dedicated pages. Change the canonical origin in `source/build.mjs` if the hosting domain changes.

## Release scope

The storefront is ready to publish as a concept. The product imagery is generated and the prices and specifications are illustrative. The bag saves only product IDs and quantities in browser storage. The order preview does not create orders or collect personal or payment information.

To launch a commercial shop, confirm actual products, imagery, prices and support details, connect inventory and hosted payment/order handling, and publish the approved delivery, return and privacy policies.
