// Cart management (localStorage for now - replace with API later)
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartCount() {
  const countEl = document.getElementById('cart-count');
  if (countEl) {
    countEl.textContent = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  }
}

function addToCart(product) {
  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.quantity = (existing.quantity || 1) + 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  saveCart();
  updateCartCount();
  alert(`${product.name} added to cart!`);
}

// Run on every page load
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();

  // Delegate add-to-cart clicks
  document.addEventListener('click', e => {
    if (e.target.classList.contains('add-to-cart')) {
      e.preventDefault();
      const btn = e.target;
      const product = {
        id: parseInt(btn.dataset.id),
        name: btn.dataset.name,
        price: parseFloat(btn.dataset.price),
        image: btn.dataset.image
      };
      addToCart(product);
    }
  });
});