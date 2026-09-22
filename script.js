const PRODUCTS = [
  {id:'card-holder', name:'Atelier Card Holder', code:'A01', cat:'Carry', price:2490, descriptor:'Slim leather carry', image:'card-holder.svg', href:'product.html?id=card-holder'},
  {id:'meridian-wallet', name:'Meridian Wallet', code:'A02', cat:'Carry', price:3490, descriptor:'6-card everyday wallet', image:'wallet.svg', href:'product.html?id=meridian-wallet'},
  {id:'no-07-sunglasses', name:'No. 07 Sunglasses', code:'A03', cat:'Wear', price:4990, descriptor:'Soft-square acetate frame', image:'sunglasses.svg', href:'product.html?id=no-07-sunglasses'},
  {id:'form-travel-case', name:'Form Travel Case', code:'A04', cat:'Travel', price:3990, descriptor:'Structured travel organizer', image:'travel-case.svg', href:'product.html?id=form-travel-case'},
  {id:'axis-watch', name:'Axis Field Watch', code:'A05', cat:'Wear', price:7290, descriptor:'Minimal automatic-inspired dial', image:'watch.svg', href:'product.html?id=axis-watch'},
  {id:'chapter-tote', name:'Chapter Tote', code:'A06', cat:'Carry', price:6490, descriptor:'Structured daily tote', image:'bag.svg', href:'product.html?id=chapter-tote'},
  {id:'weekend-set', name:'Weekend Carry Set', code:'A07', cat:'Gift', price:8990, descriptor:'Wallet + travel case set', image:'bag.svg', href:'product.html?id=weekend-set'},
  {id:'belt-01', name:'No. 01 Belt', code:'A08', cat:'Wear', price:3190, descriptor:'Full-grain leather belt', image:'wallet.svg', href:'product.html?id=belt-01'}
];

const productDetails = {
  'meridian-wallet': {material:'Vegetable-tanned leather', capacity:'6 cards + folded notes', dimensions:'105 × 75 mm', story:'Designed for those who prefer to carry only what matters.', more:'A compact profile with a soft-touch finish for everyday carry.'},
  'card-holder': {material:'Vegetable-tanned leather', capacity:'4 cards + central slot', dimensions:'100 × 68 mm', story:'A compact silhouette for the essentials.', more:'An intentionally slim card holder with a disciplined profile.'},
  'no-07-sunglasses': {material:'Acetate frame + CR39 lenses', capacity:'Protective case included', dimensions:'52–19–145 mm', story:'A quieter frame, made for daily rotation.', more:'Soft-squared forms that feel relaxed and refined.'},
  'form-travel-case': {material:'Waxed canvas + vegetable-tanned leather', capacity:'Cables, cards, passport & small essentials', dimensions:'220 × 120 × 55 mm', story:'A place for the small things you carry with you.', more:'Structured compartments for travel without visual noise.'},
  'axis-watch': {material:'Brushed steel + leather strap', capacity:'3 ATM everyday wear', dimensions:'38 mm case', story:'A calm dial for busy days.', more:'A proportion-first design with a restrained, refined silhouette.'},
  'chapter-tote': {material:'Cotton canvas + leather handles', capacity:'13-inch laptop + daily carry', dimensions:'410 × 320 × 110 mm', story:'A considered tote for everything between the door and the desk.', more:'A thoughtful carry for objects, work and movement.'},
  'weekend-set': {material:'Leather + waxed canvas', capacity:'2-piece set', dimensions:'Varies by piece', story:'Two everyday objects, composed as one gift.', more:'A paired set built around carry and calm.'},
  'belt-01': {material:'Full-grain leather', capacity:'Adjustable fit', dimensions:'35 mm width', story:'A clean line that finishes the everyday.', more:'A single-piece leather belt with a low-profile finish.'}
};

function money(n){return new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:0}).format(n)}
function getCart(){return JSON.parse(localStorage.getItem('auren_cart')||'[]')}
function saveCart(cart){localStorage.setItem('auren_cart',JSON.stringify(cart)); updateBagCount()}
function updateBagCount(){const count=getCart().reduce((a,i)=>a+i.qty,0); document.querySelectorAll('[data-bag-count]').forEach(el=>el.textContent=count)}
function addToCart(id, qty=1){const cart=getCart(); const item=cart.find(i=>i.id===id); if(item)item.qty+=qty; else cart.push({id,qty}); saveCart(cart); openCart(); toast('Added to bag');}
function removeFromCart(id){saveCart(getCart().filter(i=>i.id!==id)); renderCart()}
function renderCart(){const wrap=document.querySelector('[data-cart-items]'); const totalEl=document.querySelector('[data-cart-total]'); if(!wrap)return; const cart=getCart(); if(!cart.length){wrap.innerHTML='<div class="empty-cart">Your bag is currently quiet.</div>'; if(totalEl) totalEl.textContent='₹0'; return;} wrap.innerHTML=cart.map(item=>{const p=PRODUCTS.find(x=>x.id===item.id); return p?`<div class="cart-item"><div class="cart-media"><img src="${p.image}" alt="${p.name}"></div><div class="cart-copy"><h4>${p.name}</h4><p>${money(p.price)} × ${item.qty}</p></div><button class="text-btn" data-remove="${p.id}">Remove</button></div>`:''}).join(''); if(totalEl) totalEl.textContent=money(cart.reduce((sum,item)=>sum+PRODUCTS.find(p=>p.id===item.id).price*item.qty,0)); wrap.querySelectorAll('[data-remove]').forEach(btn=>btn.addEventListener('click',()=>removeFromCart(btn.dataset.remove)));}
function openCart(){document.querySelector('[data-drawer]')?.classList.add('open'); renderCart()}
function closeCart(){document.querySelector('[data-drawer]')?.classList.remove('open')}
function toast(msg){const el=document.querySelector('.toast'); if(!el)return; el.textContent=msg; el.classList.add('show'); clearTimeout(window.__toast); window.__toast=setTimeout(()=>el.classList.remove('show'),1800);}
function setupGlobal(){
  updateBagCount();
  const header=document.querySelector('.site-header');
  const onScroll=()=>header?.classList.toggle('scrolled',window.scrollY>8); onScroll(); window.addEventListener('scroll',onScroll,{passive:true});
  document.querySelectorAll('[data-open-search]').forEach(b=>b.addEventListener('click',()=>document.querySelector('[data-search]').classList.add('open')));
  document.querySelectorAll('[data-close-search]').forEach(b=>b.addEventListener('click',()=>document.querySelector('[data-search]').classList.remove('open')));
  document.querySelectorAll('[data-open-cart]').forEach(b=>b.addEventListener('click',openCart));
  document.querySelectorAll('[data-close-cart]').forEach(b=>b.addEventListener('click',closeCart));
  document.querySelector('[data-drawer-backdrop]')?.addEventListener('click',closeCart);
  document.querySelectorAll('[data-mobile-toggle]').forEach(b=>b.addEventListener('click',()=>document.querySelector('.mobile-nav')?.classList.toggle('open')));
  document.querySelectorAll('[data-add]').forEach(b=>b.addEventListener('click',()=>addToCart(b.dataset.add,Number(b.dataset.qty||1))));
  document.querySelector('[data-search-form]')?.addEventListener('submit',e=>{e.preventDefault(); const q=new FormData(e.currentTarget).get('q').toString().trim(); if(q) window.location.href=`shop.html?q=${encodeURIComponent(q)}`;});
  document.querySelectorAll('.accordion-btn').forEach(b=>b.addEventListener('click',()=>b.closest('.accordion-item').classList.toggle('open')));
  const io=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&e.target.classList.add('is-visible')),{threshold:.12}); document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
}
function productCard(p){return `<article class="product-card reveal"><a href="${p.href}"><div class="product-media"><img src="${p.image}" alt="${p.name}" loading="lazy"><div class="product-overlay"><span>${p.cat}</span><span>${money(p.price)}</span></div></div><div class="product-copy"><h3>${p.name}</h3><p>${p.descriptor}</p></div></a></article>`;}
function renderFeatured(target='featured-products',filter=null){const el=document.getElementById(target); if(!el)return; let list=PRODUCTS.slice(0,4); if(filter)list=PRODUCTS.filter(p=>filter===p.cat); el.innerHTML=list.map(productCard).join('');}
function renderShop(){const grid=document.getElementById('shop-grid'); if(!grid)return; const params=new URLSearchParams(location.search); const q=(params.get('q')||'').toLowerCase(); const cat=(params.get('category')||'all').toLowerCase(); let list=PRODUCTS.filter(p=>q?`${p.name} ${p.descriptor}`.toLowerCase().includes(q):true); if(cat!=='all') list=list.filter(p=>p.cat.toLowerCase()===cat); grid.innerHTML=list.map(productCard).join('');}
function renderProduct(){const mount=document.getElementById('product-page'); if(!mount)return; const id=new URLSearchParams(location.search).get('id')||'meridian-wallet'; const p=PRODUCTS.find(x=>x.id===id) || PRODUCTS[1]; const d=productDetails[id] || productDetails[p.id]; mount.innerHTML=`<section class="product-page"><div class="container product-layout"><div class="product-gallery"><img src="${p.image}" alt="${p.name}"></div><div class="product-copy"><div class="eyebrow label">${p.cat}</div><h1 class="h1">${p.name}</h1><div class="price">${money(p.price)}</div><p>${d.story}</p><div class="product-actions"><button class="button primary" data-add="${p.id}">Add to bag</button></div><div class="details"><div><span>Material</span><strong>${d.material}</strong></div><div><span>Capacity</span><strong>${d.capacity}</strong></div><div><span>Dimensions</span><strong>${d.dimensions}</strong></div></div><p>${d.more}</p></div></div></section>`;}
function renderBagPage(){
  const mount=document.querySelector('[data-bag-items]'); const totalEl=document.querySelector('[data-bag-page-total]'); if(!mount)return;
  function render(){const cart=getCart(); if(!cart.length){mount.innerHTML='<div class="empty-cart" style="border-top:1px solid var(--line)">Your bag is currently quiet.<br><br><a href="shop.html">Shop the collection</a></div>'; if(totalEl) totalEl.textContent='₹0'; return;} mount.innerHTML=cart.map(item=>{const p=PRODUCTS.find(x=>x.id===item.id); return p?`<div class="bag-item"><div class="bag-media"><img src="${p.image}" alt="${p.name}"></div><div class="bag-info"><h3>${p.name}</h3><p>${p.descriptor}</p><div class="qty-row"><button data-decrease="${p.id}">−</button><span>${item.qty}</span><button data-increase="${p.id}">+</button></div></div><div class="bag-price">${money(p.price*item.qty)}</div></div>`:''}).join(''); if(totalEl) totalEl.textContent=money(cart.reduce((sum,item)=>sum+(PRODUCTS.find(p=>p.id===item.id)?.price||0)*item.qty,0)); mount.querySelectorAll('[data-increase]').forEach(btn=>btn.addEventListener('click',()=>{const cart=getCart(); const i=cart.find(x=>x.id===btn.dataset.increase); if(i) i.qty++; saveCart(cart); render();})); mount.querySelectorAll('[data-decrease]').forEach(btn=>btn.addEventListener('click',()=>{const cart=getCart(); const i=cart.find(x=>x.id===btn.dataset.decrease); if(i){if(i.qty>1) i.qty--; else return removeFromCart(i.id);} saveCart(cart); render();})); }
  render();
}
function setupModal(){const m=document.querySelector('[data-modal]'); if(!m)return; m.addEventListener('click',()=>m.classList.remove('open')); const img=m.querySelector('img'); img?.addEventListener('click',e=>e.stopPropagation());}

document.addEventListener('DOMContentLoaded',()=>{setupGlobal(); renderFeatured(); renderShop(); renderProduct(); renderBagPage(); setupModal(); renderCart();});
