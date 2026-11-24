import { articles, categories, products } from './source/catalog.mjs';

const productById = new Map(products.map(product => [product.id, product]));
const money = new Intl.NumberFormat('en-IN', {
  style: 'currency', currency: 'INR', maximumFractionDigits: 0,
});
const bagKey = 'auren_cart';
const quantityLimit = 99;
let memoryBag = [];
let useMemoryBag = false;

function readBag() {
  if (useMemoryBag) return memoryBag;
  let rows;
  try {
    rows = JSON.parse(localStorage.getItem(bagKey) || '[]');
  } catch {
    return memoryBag;
  }
  if (!Array.isArray(rows)) return [];
  const quantities = new Map();
  for (const row of rows) {
    if (!productById.has(row?.id) || !Number.isSafeInteger(row.qty) || row.qty < 1) continue;
    quantities.set(row.id, Math.min(quantityLimit, (quantities.get(row.id) || 0) + row.qty));
  }
  return Array.from(quantities, ([id, qty]) => ({ id, qty }));
}

function updateQuantity(id, amount) {
  if (!productById.has(id)) return;
  const bag = new Map(readBag().map(row => [row.id, row.qty]));
  const next = amount === 'remove' ? 0 : Math.min(quantityLimit, (bag.get(id) || 0) + amount);
  if (next > 0) bag.set(id, next);
  else bag.delete(id);
  memoryBag = Array.from(bag, ([productId, qty]) => ({ id: productId, qty }));
  try {
    localStorage.setItem(bagKey, JSON.stringify(memoryBag));
  } catch {
    useMemoryBag = true;
  }
  renderBag(memoryBag);
}

function bagLine(row, mode) {
  const product = productById.get(row.id);
  const href = `products/${product.id}.html`;
  const controls = mode === 'review'
    ? `<p>Quantity ${row.qty}</p>`
    : `<div class="bag-quantity" aria-label="Quantity">
        <button type="button" data-id="${row.id}" data-change="-1" aria-label="Decrease quantity of ${product.name}">−</button>
        <span aria-live="polite">${row.qty}</span>
        <button type="button" data-id="${row.id}" data-change="1" aria-label="Increase quantity of ${product.name}" ${row.qty === quantityLimit ? 'disabled' : ''}>+</button>
      </div><button type="button" class="remove-button" data-id="${row.id}" data-change="remove" aria-label="Remove ${product.name}">Remove</button>`;
  return `<article class="bag-line">
    <a href="${href}" tabindex="-1" aria-hidden="true"><img src="assets/catalog/${product.id}.webp" alt=""></a>
    <div><h3><a href="${href}">${product.name}</a></h3><p>${product.color} · ${money.format(product.price)} each</p>${controls}</div>
    <strong>${money.format(product.price * row.qty)}</strong>
  </article>`;
}

function renderBag(bag = readBag()) {
  const count = bag.reduce((total, row) => total + row.qty, 0);
  const subtotal = bag.reduce((total, row) => total + productById.get(row.id).price * row.qty, 0);
  const trigger = document.querySelector('[data-open-bag]');
  const previous = document.activeElement;
  const previousList = previous?.closest('[data-bag-items]');
  trigger.setAttribute('aria-label', `Shopping bag, ${count} ${count === 1 ? 'item' : 'items'}`);
  trigger.querySelector('[data-bag-count]').textContent = count;
  for (const element of document.querySelectorAll('[data-subtotal]')) {
    element.textContent = money.format(subtotal);
  }
  for (const list of document.querySelectorAll('[data-bag-items]')) {
    list.innerHTML = bag.length
      ? bag.map(row => bagLine(row, list.dataset.bagItems)).join('')
      : `<div class="empty-state"><h2>${list.dataset.bagItems === 'review' ? 'Your selection is empty' : 'Your bag is empty'}</h2><p>Explore the collection to save an object.</p><a class="text-link" href="shop.html">Browse the collection <span class="arrow" aria-hidden="true"></span></a></div>`;
  }
  for (const link of document.querySelectorAll('[data-checkout], .drawer-bottom')) {
    link.hidden = count === 0;
  }
  if (previousList) {
    const controls = Array.from(previousList.querySelectorAll('[data-change]:not(:disabled)'));
    const match = controls.find(control => control.dataset.id === previous.dataset.id && control.dataset.change === previous.dataset.change);
    (match || controls[0] || previousList.querySelector('a'))?.focus();
  }
}

function setupDialogs() {
  const bag = document.querySelector('#bag-dialog');
  const galleryImage = document.querySelector('.gallery-main img');
  const zoomImage = document.querySelector('[data-zoom-image]');

  document.addEventListener('click', event => {
    const button = event.target.closest('[data-show], [data-close], [data-add], [data-change], [data-open-bag], [data-gallery-image]');
    if (!button) return;

    if (button.hasAttribute('data-open-bag')) {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      renderBag();
      bag.showModal();
    } else if (button.hasAttribute('data-add')) {
      updateQuantity(button.dataset.add, 1);
      bag.showModal();
    } else if (button.hasAttribute('data-change')) {
      const amount = button.dataset.change;
      updateQuantity(button.dataset.id, amount === 'remove' ? amount : Number(amount));
    } else if (button.hasAttribute('data-show')) {
      const dialog = document.getElementById(button.dataset.show);
      if (dialog.id === 'image-dialog') {
        zoomImage.src = galleryImage.src;
        zoomImage.alt = galleryImage.alt;
      }
      dialog.showModal();
    } else if (button.hasAttribute('data-close')) {
      button.closest('dialog').close();
    } else {
      galleryImage.src = button.dataset.galleryImage;
      galleryImage.alt = button.dataset.imageAlt;
      for (const thumb of document.querySelectorAll('[data-gallery-image]')) {
        thumb.setAttribute('aria-pressed', String(thumb === button));
      }
    }
  });

  for (const dialog of document.querySelectorAll('dialog')) {
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const { left, right, top, bottom } = dialog.getBoundingClientRect();
      if (event.clientX < left || event.clientX > right || event.clientY < top || event.clientY > bottom) dialog.close();
    });
  }
}

function setupCatalog() {
  const form = document.querySelector('#catalog-filters');
  if (!form) return;
  const grid = document.querySelector('#catalog-grid');
  const cards = new Map(Array.from(grid.children, card => [card.dataset.product, card]));
  const count = document.querySelector('#result-count');
  const empty = document.querySelector('#catalog-empty');
  const reset = document.querySelector('[data-reset-search]');
  const filters = Array.from(form.querySelectorAll('button[name="category"]'));
  const sort = form.elements.sort;

  function renderCatalog() {
    const params = new URLSearchParams(location.search);
    const query = (params.get('q') || '').trim().slice(0, 100);
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    const category = categories.find(item => item.id.toLowerCase() === params.get('category')?.toLowerCase()
      || item.label.toLowerCase() === params.get('category')?.toLowerCase())?.id || 'all';
    const order = params.get('sort');
    sort.value = order === 'low' || order === 'high' ? order : 'featured';

    const matches = products.filter(product => {
      const searchable = `${product.name} ${product.category} ${product.color} ${product.summary} ${product.material}`.toLowerCase();
      return (category === 'all' || product.category === category) && terms.every(term => searchable.includes(term));
    });
    if (sort.value !== 'featured') {
      matches.sort((a, b) => sort.value === 'low' ? a.price - b.price : b.price - a.price);
    }

    filters.forEach(filter => filter.setAttribute('aria-pressed', String(filter.value === category)));
    grid.replaceChildren(...matches.map(product => cards.get(product.id)));
    empty.hidden = matches.length > 0;
    count.textContent = `${matches.length} ${matches.length === 1 ? 'object' : 'objects'}${query ? ` for “${query}”` : ''}`;
    reset.hidden = !query;
  }

  function setFilter(key, value, defaultValue) {
    const url = new URL(location.href);
    if (value === defaultValue) url.searchParams.delete(key);
    else url.searchParams.set(key, value);
    history.pushState(null, '', url);
    renderCatalog();
  }

  form.addEventListener('submit', event => {
    event.preventDefault();
    setFilter('category', event.submitter?.value || 'all', 'all');
  });
  sort.addEventListener('change', () => setFilter('sort', sort.value, 'featured'));
  window.addEventListener('popstate', renderCatalog);
  renderCatalog();
}

function redirectLegacy() {
  const params = new URLSearchParams(location.search);
  const page = document.body.dataset.legacy;
  if (page === 'product') {
    const id = params.get('id') || 'meridian-wallet';
    location.replace(productById.has(id) ? `products/${id}.html` : 'shop.html');
  } else if (page === 'article') {
    const id = params.get('post') || 'everyday-carry';
    location.replace(articles.some(article => article.id === id) ? `journal/${id}.html` : 'journal.html');
  }
  return Boolean(page);
}

if (!redirectLegacy()) {
  setupDialogs();
  document.querySelector('.skip-link').addEventListener('click', event => {
    event.preventDefault();
    document.getElementById('main').focus();
    document.getElementById('main').scrollIntoView();
  });
  setupCatalog();
  renderBag();
  window.addEventListener('storage', event => {
    if (event.key === bagKey || event.key === null) renderBag();
  });
  const fragment = location.hash.slice(1);
  const target = document.getElementById(fragment);
  if (target instanceof HTMLDetailsElement) target.open = true;
}
