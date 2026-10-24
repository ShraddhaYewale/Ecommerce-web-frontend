// ---------------------------------------------------------------------------
// Product catalog (shared by every page - replace with API later)
// ---------------------------------------------------------------------------
const IMG = (id, w = 600) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

const PRODUCTS = [
  {id:1, name:"Wireless Earbuds Pro", price:3499, mrp:4999, category:"Electronics", desc:"Active noise cancellation", rating:4.5, reviews:128, badge:"Bestseller",
   photos:["1590658268037-6bf12165a8df","1600294037681-c80b4cb5b434","1572569511254-d8f925fe2cbb","1606220588913-b3aacb4d2f46"]},
  {id:2, name:"Smart Fitness Band", price:2499, mrp:3299, category:"Electronics", desc:"Heart rate + steps", rating:4.3, reviews:96,
   photos:["1575311373937-040b8e1fd5b6","1557438159-51eec7a6c9e8"]},
  {id:3, name:"Portable Blender", price:1899, mrp:2499, category:"Home & Kitchen", desc:"USB rechargeable", rating:4.2, reviews:64, badge:"New",
   photos:["1585237672814-8f85a8118bf6"]},
  {id:4, name:"Leather Backpack", price:4599, mrp:5999, category:"Fashion", desc:"15\" laptop compartment", rating:4.6, reviews:212,
   photos:["1553062407-98eeb64c6a62"]},
  {id:5, name:"Running Shoes", price:3499, mrp:4499, category:"Sports", desc:"Breathable mesh", rating:4.7, reviews:341, badge:"Trending",
   photos:["1542291026-7eec264c27ff"]},
  {id:6, name:"4K Action Camera", price:7999, mrp:9999, category:"Electronics", desc:"Waterproof 30m", rating:4.4, reviews:87,
   photos:["1502920917128-1aa500764cbd","1564466809058-bf4114d55352"]},
  {id:7, name:"Silk Pillowcase", price:999, mrp:1499, category:"Home & Kitchen", desc:"Anti-aging hair & skin", rating:4.1, reviews:45,
   photos:["1584100936595-c0654b55a2e2"]},
  {id:8, name:"Bluetooth Speaker", price:2999, mrp:3999, category:"Electronics", desc:"360° sound", rating:4.5, reviews:158,
   photos:["1608043152269-423dbba4e7e1"]},
  {id:9, name:"Over-Ear Headphones", price:5499, mrp:6999, category:"Electronics", desc:"40h battery, deep bass", rating:4.6, reviews:203,
   photos:["1505740420928-5e560c06d30e"]},
  {id:10, name:"Classic Smartwatch", price:6999, mrp:8999, category:"Electronics", desc:"AMOLED display, GPS", rating:4.4, reviews:119,
   photos:["1546868871-7041f2a55e12","1523275335684-37898b6baf30"]},
  {id:11, name:"Makeup Essentials Kit", price:1599, mrp:2199, category:"Beauty", desc:"Brushes, blush & highlighter", rating:4.3, reviews:77,
   photos:["1596462502278-27bfdc403348","1522335789203-aabd1fc54bc9"]},
  {id:12, name:"Daily Skincare Set", price:1299, mrp:1799, category:"Beauty", desc:"Cleanser + moisturiser", rating:4.2, reviews:58,
   photos:["1571781926291-c477ebfd024b"]},
].map(p => ({...p, image: IMG(p.photos[0]), gallery: p.photos.map(id => IMG(id, 900))}));

const CATEGORIES = [
  {slug:"electronics", name:"Electronics", image:IMG("1603791440384-56cd371ee9a7")},
  {slug:"fashion", name:"Fashion", image:IMG("1558769132-cb1aea458c5e")},
  {slug:"home-kitchen", name:"Home & Kitchen", image:IMG("1556911220-bff31c812dba")},
  {slug:"beauty", name:"Beauty", image:IMG("1596462502278-27bfdc403348")},
  {slug:"sports", name:"Sports", image:IMG("1517836357463-d25dfeac3438")},
  {slug:"books", name:"Books", image:IMG("1495446815901-a7297e633e8d")},
];

const PLACEHOLDER_IMG = 'data:image/svg+xml;utf8,' + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600"><rect width="100%" height="100%" fill="#eef1f6"/>' +
  '<text x="50%" y="50%" fill="#9aa3b2" font-family="sans-serif" font-size="28" text-anchor="middle" dominant-baseline="middle">ShopNow</text></svg>');

const formatINR = n => '₹' + n.toLocaleString('en-IN');
const getProduct = id => PRODUCTS.find(p => p.id === Number(id));
const categorySlug = name => (CATEGORIES.find(c => c.name === name) || {}).slug || '';

function starRating(rating) {
  let html = '';
  for (let i = 1; i <= 5; i++) {
    html += `<i class="${rating >= i ? 'fas fa-star' : rating >= i - 0.5 ? 'fas fa-star-half-alt' : 'far fa-star'}"></i>`;
  }
  return `<span class="stars">${html}</span>`;
}

// Reusable product card markup
function productCard(p, colClass = 'col-6 col-md-4 col-lg-3') {
  const off = p.mrp ? Math.round((1 - p.price / p.mrp) * 100) : 0;
  return `
    <div class="${colClass}">
      <div class="product-card h-100">
        <a href="product.html?id=${p.id}" class="product-media">
          ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
          ${off ? `<span class="discount-badge">-${off}%</span>` : ''}
          <img src="${p.image}" alt="${p.name}" loading="lazy">
        </a>
        <div class="product-body">
          <span class="product-category">${p.category}</span>
          <h6 class="product-title"><a href="product.html?id=${p.id}">${p.name}</a></h6>
          <div class="product-rating">${starRating(p.rating)}<small>(${p.reviews})</small></div>
          <div class="product-price">
            <span class="price">${formatINR(p.price)}</span>
            ${p.mrp ? `<span class="mrp">${formatINR(p.mrp)}</span>` : ''}
          </div>
          <button class="btn btn-primary add-to-cart w-100 mt-auto"
                  data-id="${p.id}" data-name="${p.name}" data-price="${p.price}" data-image="${p.image}">
            <i class="fas fa-cart-plus me-2"></i>Add to Cart
          </button>
        </div>
      </div>
    </div>`;
}

// ---------------------------------------------------------------------------
// Shared header / footer
// ---------------------------------------------------------------------------
function renderHeader() {
  const el = document.getElementById('site-header');
  if (!el) return;
  const page = location.pathname.split('/').pop() || 'index.html';
  const link = (href, label) =>
    `<li class="nav-item"><a class="nav-link${page === href ? ' active' : ''}" href="${href}">${label}</a></li>`;
  const q = new URLSearchParams(location.search).get('q') || '';

  el.outerHTML = `
  <div class="topbar d-none d-md-block">
    <div class="container d-flex justify-content-between">
      <span><i class="fas fa-truck-fast me-2"></i>Free delivery on orders over ₹999</span>
      <span><i class="fas fa-headset me-2"></i>support@shopnow.in &nbsp;•&nbsp; +91 98765 43210</span>
    </div>
  </div>
  <nav class="navbar navbar-expand-lg sticky-top site-navbar">
    <div class="container">
      <a class="navbar-brand" href="index.html"><span class="brand-mark"><i class="fas fa-bag-shopping"></i></span>Shop<span>Now</span></a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          ${link('index.html', 'Home')}
          ${link('shop.html', 'Shop')}
          ${link('categories.html', 'Categories')}
          ${link('orders.html', 'Track Order')}
        </ul>
        <form class="nav-search me-lg-3 mb-2 mb-lg-0" role="search" action="shop.html">
          <i class="fas fa-search"></i>
          <input class="form-control" type="search" name="q" id="searchInput" value="${q.replace(/"/g, '&quot;')}" placeholder="Search products..." aria-label="Search">
        </form>
        <ul class="navbar-nav nav-icons">
          <li class="nav-item"><a class="nav-link" href="wishlist.html" title="Wishlist"><i class="far fa-heart"></i></a></li>
          <li class="nav-item"><a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#authModal" title="Account"><i class="far fa-user"></i></a></li>
          <li class="nav-item">
            <a class="nav-link position-relative" href="cart.html" title="Cart">
              <i class="fas fa-shopping-cart"></i>
              <span id="cart-count" class="cart-badge">0</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>`;

  if (!document.getElementById('authModal')) {
    document.body.insertAdjacentHTML('beforeend', `
    <div class="modal fade" id="authModal" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content auth-modal">
          <div class="modal-header border-0">
            <h5 class="modal-title">Welcome to ShopNow</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body pt-0">
            <ul class="nav nav-pills nav-fill mb-4">
              <li class="nav-item"><button class="nav-link active" data-bs-toggle="tab" data-bs-target="#login">Login</button></li>
              <li class="nav-item"><button class="nav-link" data-bs-toggle="tab" data-bs-target="#register">Register</button></li>
            </ul>
            <div class="tab-content">
              <div class="tab-pane fade show active" id="login">
                <form>
                  <div class="mb-3"><input type="email" class="form-control" placeholder="Email" required></div>
                  <div class="mb-3"><input type="password" class="form-control" placeholder="Password" required></div>
                  <button type="submit" class="btn btn-primary w-100">Sign In</button>
                </form>
              </div>
              <div class="tab-pane fade" id="register">
                <form>
                  <div class="mb-3"><input type="text" class="form-control" placeholder="Full Name" required></div>
                  <div class="mb-3"><input type="email" class="form-control" placeholder="Email" required></div>
                  <div class="mb-3"><input type="password" class="form-control" placeholder="Password" required></div>
                  <button type="submit" class="btn btn-primary w-100">Create Account</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`);
  }
}

function renderFooter() {
  const el = document.getElementById('site-footer');
  if (!el) return;
  el.outerHTML = `
  <footer class="site-footer">
    <div class="container">
      <div class="row g-4">
        <div class="col-lg-4">
          <a class="navbar-brand footer-brand" href="index.html"><span class="brand-mark"><i class="fas fa-bag-shopping"></i></span>Shop<span>Now</span></a>
          <p class="mt-3">Secure, fast and enjoyable online shopping. Quality products, honest prices and doorstep delivery across India.</p>
          <div class="social">
            <a href="#" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
            <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
            <a href="#" aria-label="X"><i class="fab fa-x-twitter"></i></a>
            <a href="#" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
          </div>
        </div>
        <div class="col-6 col-lg-2">
          <h6>Shop</h6>
          <ul class="list-unstyled">
            <li><a href="shop.html">All Products</a></li>
            <li><a href="shop.html?category=electronics">Electronics</a></li>
            <li><a href="shop.html?category=fashion">Fashion</a></li>
            <li><a href="shop.html?category=home-kitchen">Home & Kitchen</a></li>
          </ul>
        </div>
        <div class="col-6 col-lg-2">
          <h6>Account</h6>
          <ul class="list-unstyled">
            <li><a href="profile.html">My Account</a></li>
            <li><a href="orders.html">Orders</a></li>
            <li><a href="wishlist.html">Wishlist</a></li>
            <li><a href="cart.html">Cart</a></li>
          </ul>
        </div>
        <div class="col-lg-4">
          <h6>Get in Touch</h6>
          <p class="mb-1"><i class="fas fa-envelope me-2"></i>support@shopnow.in</p>
          <p><i class="fas fa-phone me-2"></i>+91 98765 43210</p>
          <div class="payments">
            <i class="fab fa-cc-visa"></i><i class="fab fa-cc-mastercard"></i><i class="fab fa-cc-amex"></i><i class="fab fa-google-pay"></i><i class="fab fa-cc-paypal"></i>
          </div>
        </div>
      </div>
      <div class="footer-bottom">© 2026 ShopNow. All rights reserved.</div>
    </div>
  </footer>`;
}

// ---------------------------------------------------------------------------
// Cart management (localStorage for now - replace with API later)
// ---------------------------------------------------------------------------
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Refresh images of previously saved items from the catalog
cart.forEach(item => {
  const p = getProduct(item.id);
  if (p) item.image = p.image;
});

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartCount() {
  const countEl = document.getElementById('cart-count');
  if (countEl) {
    countEl.textContent = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  }
}

function showToast(message) {
  let wrap = document.getElementById('toast-wrap');
  if (!wrap) {
    wrap = document.createElement('div');
    wrap.id = 'toast-wrap';
    document.body.appendChild(wrap);
  }
  const t = document.createElement('div');
  t.className = 'shop-toast';
  t.innerHTML = `<i class="fas fa-circle-check me-2"></i>${message}`;
  wrap.appendChild(t);
  setTimeout(() => t.classList.add('hide'), 2200);
  setTimeout(() => t.remove(), 2600);
}

function addToCart(product, qty = 1) {
  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.quantity = (existing.quantity || 1) + qty;
  } else {
    cart.push({ ...product, quantity: qty });
  }
  saveCart();
  updateCartCount();
  showToast(`${product.name} added to cart`);
}

renderHeader();
renderFooter();

// Swap any image that fails to load for a neutral placeholder
document.addEventListener('error', e => {
  const img = e.target;
  if (img.tagName === 'IMG' && img.src !== PLACEHOLDER_IMG) img.src = PLACEHOLDER_IMG;
}, true);

// Run on every page load
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();

  // Delegate add-to-cart clicks
  document.addEventListener('click', e => {
    const btn = e.target.closest('.add-to-cart');
    if (btn) {
      e.preventDefault();
      const qtyInput = btn.dataset.qtyFrom && document.querySelector(btn.dataset.qtyFrom);
      const product = {
        id: parseInt(btn.dataset.id),
        name: btn.dataset.name,
        price: parseFloat(btn.dataset.price),
        image: btn.dataset.image
      };
      addToCart(product, qtyInput ? Math.max(1, parseInt(qtyInput.value) || 1) : 1);
    }
  });
});
