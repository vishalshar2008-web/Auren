import { mkdirSync, writeFileSync } from 'node:fs';
import { articles, categories, products } from './catalog.mjs';

const origin = 'https://auren-uoxc.vercel.app';
const tagline = 'Designed for the Everyday Extraordinary.';
const money = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });
const pages = [];
const byId = new Map(products.map(product => [product.id, product]));
const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const productUrl = id => `products/${id}.html`;
const articleUrl = id => `journal/${id}.html`;
const catalogUrl = category => `shop.html?category=${category}`;
const productImage = id => `assets/catalog/${id}.webp`;
const editorialImage = id => `assets/editorial/${id}.webp`;
const image = (src, alt, options = '') => `<img src="${src}" alt="${escape(alt)}" ${options || 'loading="lazy"'}>`;
const link = (href, label, classes = 'text-link') => `<a class="${classes}" href="${href}">${label}<span class="arrow" aria-hidden="true"></span></a>`;
const label = text => `<p class="eyebrow">${text}</p>`;
const intro = (kicker, title, summary) => `<section class="wrap page-intro">${label(kicker)}<h1>${title}</h1><p class="lede">${summary}</p></section>`;
const icons = {
  search: '<circle cx="10.5" cy="10.5" r="5.5"/><path d="m15 15 4 4"/>',
  bag: '<path d="M5 8h14l1 12H4L5 8Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/>',
  close: '<path d="m6 6 12 12M18 6 6 18"/>',
  menu: '<path d="M4 8h16M4 16h16"/>',
  zoom: '<circle cx="10.5" cy="10.5" r="5.5"/><path d="m15 15 4 4M8 10.5h5m-2.5-2.5v5"/>',
};
const icon = name => `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true">${icons[name]}</svg>`;
const nav = [['shop.html','Shop'],['collections.html','Collections'],['journal.html','Journal'],['about.html','Our story']];
const navigation = active => nav.map(([path, name]) => `<a href="${path}"${active === path ? ' aria-current="page"' : ''}>${name}</a>`).join('');

function shell(page, main) {
  const { path, title, description, active, social = 'assets/editorial/hero.webp', noindex = false, canonical = path, json } = page;
  const url = `${origin}/${canonical === 'index.html' ? '' : canonical}`;
  return `<!doctype html>
<html lang="en-IN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="theme-color" content="#f8f5ef">
<title>${escape(title)}</title>
<meta name="description" content="${escape(description)}">
${noindex ? '<meta name="robots" content="noindex,follow">' : ''}
<link rel="canonical" href="${url}">
<meta property="og:type" content="${json?.['@type'] === 'Article' ? 'article' : 'website'}">
<meta property="og:site_name" content="AUREN">
<meta property="og:title" content="${escape(title)}">
<meta property="og:description" content="${escape(description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${origin}/${social}">
<meta name="twitter:card" content="summary_large_image">
${path === '404.html' ? '<base href="/">' : path.includes('/') ? '<base href="../">' : ''}
<link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
<link rel="preload" href="assets/fonts/cormorant.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="styles.css">
<script type="module" src="script.js"></script>
${json ? `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', ...json }).replaceAll('<', '\\u003c')}</script>` : ''}
</head>
<body${page.legacy ? ` data-legacy="${page.legacy}"` : ''}>
<a class="skip-link" href="${path === '404.html' ? '#main' : path + '#main'}">Skip to content</a>
<header class="site-header">
  <div class="wrap header-inner">
    <button class="icon-button mobile-trigger" type="button" data-show="menu-dialog" aria-label="Open menu">${icon('menu')}</button>
    <nav class="desktop-nav" aria-label="Primary">${navigation(active)}</nav>
    <a class="wordmark" href="index.html" aria-label="AUREN home">AUREN<span aria-hidden="true">.</span></a>
    <div class="header-actions">
      <button class="icon-button" type="button" data-show="search-dialog" aria-label="Search collection">${icon('search')}</button>
      <a class="icon-button bag-trigger" href="bag.html" data-open-bag aria-label="Shopping bag">${icon('bag')}<span data-bag-count aria-hidden="true">0</span></a>
    </div>
  </div>
</header>
<main id="main" tabindex="-1">
${main}
</main>
<footer class="site-footer">
  <div class="wrap footer-inner">
    <div class="footer-brand"><a class="wordmark" href="index.html" aria-label="AUREN home">AUREN<span aria-hidden="true">.</span></a><p>${tagline}</p></div>
    <nav aria-label="Explore"><h2>Explore</h2>${nav.slice(0, 3).map(([href, name]) => `<a href="${href}">${name}</a>`).join('')}</nav>
    <nav aria-label="Information"><h2>Information</h2><a href="about.html">Our story</a><a href="faq.html">Help &amp; FAQ</a><a href="contact.html">Contact</a></nav>
  </div>
  <div class="wrap footer-bottom"><span>© 2026 AUREN · Storefront concept</span><div><a href="privacy.html">Privacy</a><a href="terms.html">Terms</a></div><span>India · INR ₹</span></div>
</footer>
<dialog class="dialog search-dialog" id="search-dialog" aria-labelledby="search-title">
  <div class="dialog-heading"><h2 id="search-title">Find an object</h2><button class="icon-button" type="button" data-close aria-label="Close search">${icon('close')}</button></div>
  <form class="search-form" action="shop.html" method="get"><label class="sr-only" for="site-search">Search products</label><input type="search" name="q" id="site-search" placeholder="Try “wallet” or “canvas”" required maxlength="100" autofocus><button class="button" type="submit">Search</button></form>
</dialog>
<dialog class="dialog menu-dialog" id="menu-dialog" aria-labelledby="menu-title">
  <div class="dialog-heading"><h2 id="menu-title">Menu</h2><button class="icon-button" type="button" data-close aria-label="Close menu">${icon('close')}</button></div>
  <nav aria-label="Mobile">${navigation(active)}<a href="faq.html">Help &amp; FAQ</a></nav>
</dialog>
<dialog class="dialog bag-dialog" id="bag-dialog" aria-labelledby="bag-dialog-title">
  <div class="dialog-heading"><h2 id="bag-dialog-title">Your bag</h2><button class="icon-button" type="button" data-close aria-label="Close bag">${icon('close')}</button></div>
  <div class="drawer-items" data-bag-items="compact"></div>
  <div class="drawer-bottom"><div class="summary-line"><span>Subtotal</span><strong data-subtotal>₹0</strong></div><a class="button" href="bag.html">Review bag <span class="arrow" aria-hidden="true"></span></a></div>
</dialog>
</body>
</html>
`;
}

function add(path, title, description, main, options = {}) {
  const page = { path, title: `${title} | AUREN`, description, ...options };
  pages.push(page);
  writeFileSync(path, shell(page, main));
}

function productCard(p) {
  return `<article class="product-card" data-product="${p.id}">
    <a href="${productUrl(p.id)}" class="product-link">
      <div class="product-image">${image(productImage(p.id), p.name)}<span class="card-arrow" aria-hidden="true"><span class="arrow"></span></span></div>
      <div class="product-meta"><h3>${p.name}</h3><span>${money.format(p.price)}</span></div><p class="product-colour">${p.color}</p>
    </a>
  </article>`;
}

function collectionCard(category) {
  return `<article class="collection-card"><a href="${catalogUrl(category.id)}">
    <div class="collection-image">${image(editorialImage(category.image), '')}</div>
    <div class="collection-caption"><div><h3>${category.label}</h3><p>${category.description}</p></div><span class="arrow" aria-hidden="true"></span></div>
  </a></article>`;
}

function articleCard(article) {
  return `<article class="journal-card"><a href="${articleUrl(article.id)}">
    <div class="journal-image">${image(editorialImage(article.image), '')}</div>
    <div class="journal-copy">${label(article.category)}<h3>${article.title}</h3><p>${article.summary}</p><span class="text-link">Read the story <span class="arrow" aria-hidden="true"></span></span></div>
  </a></article>`;
}

function breadcrumb(entries, current) {
  return `<nav class="breadcrumbs" aria-label="Breadcrumb"><ol>${entries.map(([href, name]) => `<li><a href="${href}">${name}</a></li>`).join('')}<li aria-current="page">${current}</li></ol></nav>`;
}

function accordion(title, copy, id = '') {
  return `<details${id ? ` id="${id}"` : ''}><summary>${title}</summary><div class="details-copy">${copy}</div></details>`;
}

const collectionGrid = `<div class="collection-grid">${categories.map(collectionCard).join('')}</div>`;
const featured = ['meridian-wallet', 'no-07-sunglasses', 'form-travel-case', 'weekend-set'].map(id => byId.get(id));

add('index.html', 'Considered Everyday Accessories', 'Explore AUREN’s collection of wallets, sunglasses, travel cases and gifts. Designed for the Everyday Extraordinary.', `
<section class="hero">
  <div class="hero-copy">
    ${label('Everyday accessories')}
    <h1>Good things<br>to <em>carry.</em></h1>
    <p>Wallets, frames and travel essentials with useful details and understated silhouettes.</p>
    ${link('shop.html','Explore the collection','button')}
  </div>
  <figure class="hero-media">${image(editorialImage('hero'), 'Espresso leather wallet, black sunglasses and khaki travel case on sunlit stone', 'fetchpriority="high" srcset="assets/editorial/hero-mobile.webp 768w, assets/editorial/hero.webp 1536w" sizes="(max-width: 700px) 100vw, 58vw"')}</figure>
</section>
<nav class="category-bar" aria-label="Shop by collection"><div class="wrap category-links">${categories.map(c => link(catalogUrl(c.id), c.label, 'category-link')).join('')}</div></nav>
<section class="wrap section" aria-labelledby="edit">
  <div class="section-head"><div>${label('The collection')}<h2 id="edit">The everyday edit</h2></div>${link('shop.html','View all objects')}</div>
  <div class="product-grid">${featured.map(productCard).join('')}</div>
</section>
<section class="feature">
  <div class="feature-image">${image(editorialImage('carry'), 'Close view of the Meridian Wallet’s leather grain and stitched edge on travertine')}</div>
  <div class="feature-copy">${label('The Meridian Wallet')}<h2>A smaller<br><em>everyday carry.</em></h2><p>Six cards, folded notes and a compact bifold that slips easily into a front pocket.</p>${link(productUrl('meridian-wallet'),'Discover the Meridian','button button-light')}</div>
</section>
<section class="wrap section" aria-labelledby="collections">
  <div class="section-head"><h2 id="collections">Shop by collection</h2></div>${collectionGrid}
</section>
<section class="journal-band"><div class="wrap section" aria-labelledby="journal-title">
  <div class="section-head"><h2 id="journal-title">The AUREN Journal</h2>${link('journal.html','Read the journal')}</div>
  <div class="journal-grid">${articles.map(articleCard).join('')}</div>
</div></section>`, {
  title: 'AUREN | Considered Everyday Accessories',
  json: { '@type': 'WebSite', name: 'AUREN', url: `${origin}/` },
});

add('shop.html', 'Shop the Collection', 'Browse AUREN wallets, sunglasses, travel essentials and gifts. Filter by collection or find an object by name or material.', `
${intro('AUREN objects','The collection','Considered accessories for the workweek, the weekend and the plans in between.')}
<section class="wrap shop-section" aria-label="Product catalogue">
  <form class="catalog-filters" action="shop.html" method="get" id="catalog-filters">
    <div class="filter-tabs" aria-label="Collections"><button type="submit" name="category" value="all" aria-pressed="true">All objects</button>${categories.map(c => `<button type="submit" name="category" value="${c.id}" aria-pressed="false">${c.label}</button>`).join('')}</div>
    <div class="sort-field"><label for="sort">Sort</label><select name="sort" id="sort"><option value="featured">Featured</option><option value="low">Price, low to high</option><option value="high">Price, high to low</option></select></div>
  </form>
  <div class="catalog-results"><p id="result-count" role="status">${products.length} objects</p><a class="text-link" href="shop.html" data-reset-search hidden>Clear search</a></div>
  <div class="product-grid" id="catalog-grid">${products.map(productCard).join('')}</div>
  <div class="empty-state" id="catalog-empty" hidden><h2>No objects found</h2><p>Try a different search or browse the full collection.</p>${link('shop.html','See all objects','button')}</div>
</section>`, { active: 'shop.html' });

add('collections.html', 'Collections', 'Explore the four AUREN collections, from leather carry and daily wear to travel organisation and considered gifts.', `
${intro('Collections','Four ways to carry the day','Start with how you move, what you reach for, or the person you have in mind.')}
<section class="wrap section collections-page" aria-label="AUREN collections">${collectionGrid}</section>`, { active: 'collections.html' });

mkdirSync('products', { recursive: true });
for (const p of products) {
  const category = categories.find(c => c.id === p.category);
  const related = [...products.filter(x => x.id !== p.id && x.category === p.category), ...products.filter(x => x.category !== p.category)].slice(0, 3);
  const photos = [{ src: productImage(p.id), alt: p.name + ' in ' + p.color }];
  if (p.editorial) photos.push({src: editorialImage(p.editorial), alt: p.name + ' in an editorial setting'});
  add(productUrl(p.id), p.name, p.summary, `
<section class="wrap product-section">
  ${breadcrumb([['shop.html','Shop'],[catalogUrl(p.category),category.label]],p.name)}
  <div class="product-layout">
    <div class="gallery">
      <button class="gallery-main" type="button" data-show="image-dialog" aria-label="Enlarge product image">${image(photos[0].src, photos[0].alt, 'fetchpriority="high"')}<span class="gallery-zoom">${icon('zoom')}</span></button>${photos.length > 1 ? `<div class="gallery-thumbs" aria-label="Product views">${photos.map(({ src, alt }, i) => `<button type="button" data-gallery-image="${src}" data-image-alt="${escape(alt)}" aria-label="${i ? 'Editorial view' : 'Studio view'}" aria-pressed="${!i}">${image(src, '')}</button>`).join('')}</div>` : ''}
    </div>
    <div class="product-info">
      ${label(category.label)}<h1>${p.name}</h1><p class="product-price">${money.format(p.price)}</p><p class="product-description">${p.summary}</p>
      <p class="finish"><strong>Colour</strong> ${p.color}</p>
      <button class="button add-button" type="button" data-add="${p.id}">Add to bag <span aria-hidden="true">+</span></button>
      <p class="purchase-note">Collection preview · No payment required</p>
      <div class="details-list">
        ${accordion('Product details',`<dl class="specs"><div><dt>Material</dt><dd>${p.material}</dd></div><div><dt>Size</dt><dd>${p.size}</dd></div><div><dt>Design</dt><dd>${p.details}</dd></div></dl>`)}
        ${accordion('Care','<p>' + p.care + '</p>')}
        ${accordion('Availability','<p>This piece is part of the AUREN design concept. You can save it to your bag and preview the order review.</p><a class="text-link" href="faq.html#orders">See ordering FAQ <span class="arrow" aria-hidden="true"></span></a>')}
      </div>
    </div>
  </div>
</section>
<section class="wrap section related" aria-labelledby="related-title"><div class="section-head"><h2 id="related-title">Objects to pair it with</h2>${link('shop.html','Explore all objects')}</div><div class="product-grid related-grid">${related.map(productCard).join('')}</div></section>
<dialog class="dialog image-dialog" id="image-dialog" aria-label="Expanded product image"><button class="icon-button" type="button" data-close aria-label="Close image">${icon('close')}</button><img data-zoom-image src="${photos[0].src}" alt=""></dialog>`, {
    active: 'shop.html', social: productImage(p.id),
    json: { '@type': 'Product', name: p.name, description: p.summary, image: photos.map(photo => `${origin}/${photo.src}`), color: p.color, material: p.material, brand: { '@type': 'Brand', name: 'AUREN' }, sku: p.id },
  });
}

add('journal.html', 'The Journal', 'Practical guides on everyday carry, choosing a wallet and building a collection of useful accessories.', `
${intro('The Journal','A closer look at the everyday','Useful reads on the things we carry and the details worth paying attention to.')}
<section class="wrap section journal-page" aria-label="Latest articles"><div class="journal-grid">${articles.map(articleCard).join('')}</div></section>`, { active: 'journal.html' });

mkdirSync('journal', { recursive: true });
for (const article of articles) {
  const p = byId.get(article.product);
  add(articleUrl(article.id), article.title, article.summary, `
<article class="wrap article-page">
  ${breadcrumb([['journal.html','Journal']],article.category)}
  <header>${label(article.category)}<h1>${article.title}</h1><p class="lede">${article.summary}</p></header>
  <div class="article-cover">${image(editorialImage(article.image), 'AUREN accessories in a sunlit editorial setting', 'fetchpriority="high"')}</div>
  <div class="prose">${article.sections.map(([title, text]) => `<section><h2>${title}</h2><p>${text}</p></section>`).join('')}
  <div class="article-cta">${link(productUrl(p.id),'Explore the ' + p.name)}${link('journal.html','Back to the journal')}</div></div>
</article>`, { active: 'journal.html', social: editorialImage(article.image), json: {
    '@type': 'Article', headline: article.title, description: article.summary, image: `${origin}/${editorialImage(article.image)}`,
    author: { '@type': 'Organization', name: 'AUREN' },
  } });
}

add('about.html', 'Our Story', 'AUREN is a lifestyle accessories design concept centred on proportion, useful details and the things we carry every day.', `
<section class="wrap story-layout">
  <div class="story-copy">${label('Our story')}<h1>Everyday by design.</h1><p class="lede">AUREN started with a simple brief: look at what we carry every day and give each object a clear reason to be there.</p>
  <p>The Meridian is sized around a few cards and folded notes. The Form case keeps the little things together when you change bags. Each object begins with a specific routine, from the morning commute to a weekend away.</p>${link('collections.html','Explore the collections','button')}</div>
  <div class="story-image">${image(editorialImage('travel'), 'A khaki travel case and folded cotton shirt on a sunlit bench','fetchpriority="high"')}</div>
</section>
<section class="wrap section story-principles"><h2>What we look for</h2><div>
<article><h3>Proportion</h3><p>Size, weight and shape should make sense in a hand, a pocket or a bag.</p></article>
<article><h3>Material</h3><p>Leather, canvas and acetate each bring their own texture and feel.</p></article>
<article><h3>Use</h3><p>A pocket, closure or seam should help the object do its job.</p></article>
</div></section>
<section class="wrap story-note" id="contact"><p>AUREN is a design concept for a lifestyle accessories brand.</p>${link('contact.html','Contact information')}</section>`, { active: 'about.html' });

add('faq.html', 'Help and FAQ', 'Answers about the AUREN collection preview, the shopping bag, product care and pricing.', `
${intro('Help','Frequently asked questions','Find practical details about the collection, the bag and caring for everyday accessories.')}
<section class="wrap info-section"><div class="details-list faq-list">
  ${accordion('Can I place an order?', '<p>AUREN is a storefront concept. You can save items and preview the order review. Live orders, delivery and returns would become available with a commercial launch.</p>', 'orders')}
  ${accordion('What currency are the prices in?', '<p>Prices are shown in Indian rupees (INR). They are illustrative catalog prices.</p>')}
  ${accordion('Where is my bag saved?', '<p>Your bag is saved in your browser so you can return to it on the same device. Clearing site data will empty it.</p>')}
  ${accordion('Where can I find product dimensions and care guidance?', '<p>Open any product and expand Product details or Care. Each page lists the intended dimensions, materials and care notes.</p>')}
  ${accordion('Are the product images photographs of stock on hand?', '<p>The images are digitally generated visuals of the design concept. They show the intended form, finish and palette.</p>')}
</div></section>`);

add('contact.html', 'Contact', 'Find answers to product and storefront questions about the AUREN concept.', `
${intro('Information','Contact AUREN','Customer care will open with a commercial launch. In the meantime, explore the product details and help centre.')}
<section class="wrap info-section contact-options"><article><h2>Product details</h2><p>Find dimensions, materials and care notes on each object’s page.</p>${link('shop.html','Browse the collection')}</article>
<article><h2>Bag and ordering</h2><p>Learn how the bag saves your selection and how the order preview works.</p>${link('faq.html','Read the FAQ')}</article></section>`);

add('bag.html', 'Your Bag', 'Review the AUREN objects saved in your browser and adjust your quantities.', `
${intro('Collection preview','Your bag','Review your selection before previewing the order.')}
<section class="wrap bag-layout">
  <div data-bag-items="full"><noscript><p>Enable JavaScript to view your saved bag.</p></noscript></div>
  <aside class="bag-summary" aria-labelledby="summary-title"><h2 id="summary-title">Summary</h2><div class="summary-line"><span>Subtotal</span><strong data-subtotal>₹0</strong></div><a class="button" href="checkout.html" data-checkout hidden>Preview checkout <span class="arrow" aria-hidden="true"></span></a><p>For browsing and order preview only. No payments are collected.</p></aside>
</section>`, { noindex: true });

add('checkout.html', 'Order Preview', 'Review an illustrative AUREN order without payment or personal information.', `
${intro('Collection preview','Order preview','Review your items and subtotal. This preview does not place an order or collect payment details.')}
<section class="wrap bag-layout">
  <div data-bag-items="review"><noscript><p>Enable JavaScript to view your saved selection.</p></noscript></div>
  <aside class="bag-summary"><h2>Order summary</h2><div class="summary-line"><span>Illustrative subtotal</span><strong data-subtotal>₹0</strong></div><p>Shipping and taxes are outside this preview.</p>${link('bag.html','Back to your bag','button')}</aside>
</section>`, { noindex: true });

add('privacy.html', 'Privacy', 'How the AUREN storefront concept stores your shopping bag and handles data.', `
${intro('Information','Privacy','How this storefront preview handles your information.')}
<div class="wrap info-section prose"><h2>Your saved bag</h2><p>The storefront saves product identifiers and quantities in your browser’s local storage. Clear this site’s data in your browser settings to remove the saved bag.</p><h2>Personal information</h2><p>The storefront does not ask for a name, address, email or payment details.</p></div>`, { noindex: true });

add('terms.html', 'Terms', 'Terms of the AUREN storefront preview and its illustrative catalog.', `
${intro('Information','Storefront terms','AUREN is a fictional lifestyle accessories design concept.')}
<div class="wrap info-section prose"><h2>Products and prices</h2><p>Product descriptions, images and prices illustrate the concept. They do not represent current inventory or an offer for sale.</p><h2>Bag and order preview</h2><p>Saving or reviewing a selection does not create an order, charge a payment or reserve stock.</p></div>`, { noindex: true });

add('product.html', 'Product Collection', 'Find an AUREN product in the accessories collection.', intro('AUREN objects','Find an object','Browse the current collection.') + `<div class="wrap info-section">${link('shop.html','View all objects','button')}</div>`, { legacy: 'product', noindex: true, canonical: 'shop.html' });
add('article.html', 'Journal', 'Explore the latest articles from AUREN.', intro('The Journal','Read the AUREN Journal','Explore our guides on carry, materials and everyday accessories.') + `<div class="wrap info-section">${link('journal.html','View the journal','button')}</div>`, { legacy: 'article', noindex: true, canonical: 'journal.html' });
add('404.html', 'Page Unavailable', 'Find your way back to the AUREN collection.', intro('Page unavailable','A different way back.','This page may have moved. The collection is a good place to start.') + `<div class="wrap info-section">${link('/shop.html','Explore the collection','button')}</div>`, { noindex: true });

writeFileSync('robots.txt', `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);
writeFileSync('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.filter(p => !p.noindex).map(p => `  <url><loc>${origin}/${p.path === 'index.html' ? '' : p.path}</loc></url>`).join('\n')}\n</urlset>\n`);
