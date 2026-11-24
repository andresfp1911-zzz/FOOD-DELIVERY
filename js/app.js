const products = [
  { id: 1, name: "Burger Clasica", category: "Hamburguesas", description: "Carne a la parrilla, queso, vegetales frescos y salsa de la casa.", price: 7.50, image: "imagenes/burger-clasica.jpg", details: "Pan brioche suave, carne de res de 150 g, queso fundido, tomate, lechuga y cebolla morada.", allergens: "Gluten, lacteos y huevo" },
  { id: 2, name: "Burger Doble", category: "Hamburguesas", description: "Dos carnes jugosas, queso doble y vegetales en pan artesanal.", price: 9.90, image: "imagenes/burger-doble.jpg", details: "Dos medallones de 150 g, queso cheddar, pepinillos, tomate, lechuga y salsa cremosa especial.", allergens: "Gluten, lacteos y huevo" },
  { id: 3, name: "Burger Picante", category: "Hamburguesas", description: "Burger intensa con jalapenos, queso y salsa picante.", price: 8.75, image: "imagenes/burger-picante.jpg", details: "Carne de res, queso cheddar, jalapenos, cebolla morada y salsa picante hecha al momento.", allergens: "Gluten, lacteos y huevo" },
  { id: 4, name: "Pollo Crujiente", category: "Pollo", description: "Pechuga empanizada y dorada con ensalada fresca.", price: 8.50, image: "imagenes/pollo-crujiente.jpg", details: "Pechuga de pollo crujiente, lechuga, tomate, pepinillos y mayonesa de hierbas.", allergens: "Gluten y huevo" },
  { id: 5, name: "Nuggets", category: "Pollo", description: "Tiras crujientes de pollo con salsa de ajo para compartir.", price: 6.25, image: "imagenes/nuggets.jpg", details: "8 piezas de pollo empanizadas, doradas al momento y acompañadas de salsa de ajo.", allergens: "Gluten y lacteos" },
  { id: 6, name: "Papas Clasicas", category: "Papas", description: "Papas fritas doradas con queso parmesano y perejil.", price: 3.50, image: "imagenes/papas.jpg", details: "Papas cortadas al momento, fritas hasta quedar crocantes y terminadas con parmesano y perejil.", allergens: "Lacteos" },
  { id: 7, name: "Papas con Queso", category: "Papas", description: "Papas crocantes cubiertas con queso fundido y cebollin.", price: 4.75, image: "imagenes/papas-queso.jpg", details: "Porcion generosa de papas doradas con mezcla de quesos, cebollin y especias.", allergens: "Lacteos" },
  { id: 8, name: "Coctel de Frutas", category: "Bebidas", description: "Bebida refrescante servida en copa con frutas y hielo.", price: 2.25, image: "imagenes/gaseosa.jpg", details: "Coctel sin alcohol preparado con frutas, hielo y hierbas frescas. Consultar disponibilidad del dia.", allergens: "Sin alergenos principales" },
  { id: 9, name: "Limonada Natural", category: "Bebidas", description: "Limonada fresca con rodajas de limon y hielo.", price: 3.25, image: "imagenes/limonada.jpg", details: "Limon natural, agua, hielo y endulzante al gusto. Disponible en vaso de 16 oz.", allergens: "Sin alergenos principales" },
  { id: 10, name: "Helado Deluxe", category: "Postres", description: "Helado cremoso con brownie, galletas y chocolate.", price: 3.75, image: "imagenes/helado.jpg", details: "Copa con helado de vainilla, brownie, trozos de galleta, crema batida y salsa de chocolate.", allergens: "Lacteos, gluten y huevo" },
  { id: 11, name: "Brownie", category: "Postres", description: "Brownie tibio de chocolate con trozos crujientes.", price: 4.25, image: "imagenes/brownie.jpg", details: "Porcion tibia con chocolate semi amargo, nueces opcionales y una suave capa crujiente.", allergens: "Gluten, lacteos y nueces" },
  { id: 12, name: "Combo Royal", category: "Promociones", description: "Burger doble, papas grandes y bebida.", price: 12.99, image: "imagenes/burger-doble.jpg", details: "Incluye una Burger Doble, papas grandes y una bebida de 16 oz.", allergens: "Gluten, lacteos y huevo" },
  { id: 13, name: "Duo Clasico", category: "Promociones", description: "Dos burgers clasicas con salsa especial.", price: 21.50, image: "imagenes/burger-clasica.jpg", details: "Dos burgers clasicas con queso, vegetales y salsa de la casa.", allergens: "Gluten, lacteos y huevo" },
  { id: 14, name: "Combo Pollo", category: "Promociones", description: "Pollo crujiente, papas y limonada natural.", price: 11.75, image: "imagenes/pollo-crujiente.jpg", details: "Incluye un pollo crujiente, papas clasicas y limonada natural de 16 oz.", allergens: "Gluten, lacteos y huevo" },
  { id: 15, name: "Copa Dulce", category: "Promociones", description: "Helado con brownie, galletas y salsa de chocolate.", price: 8.50, image: "imagenes/helado.jpg", details: "Copa dulce con helado de vainilla, brownie tibio, galleta y chocolate.", allergens: "Lacteos, gluten y huevo" }
];

const state = {
  category: "Todos",
  search: "",
  cart: JSON.parse(localStorage.getItem("foodDeliveryCart") || "[]")
};

const productsGrid = document.getElementById("products-grid");
const emptyState = document.getElementById("empty-state");
const cartOverlay = document.getElementById("cart-overlay");
const cartItems = document.getElementById("cart-items");
const cartEmpty = document.getElementById("cart-empty");
const cartSummary = document.getElementById("cart-summary");
const cartCount = document.getElementById("cart-count");
const checkoutDialog = document.getElementById("checkout-dialog");
const successModal = document.getElementById("success-modal");
const toast = document.getElementById("toast");

function formatMoney(value) {
  return `$${value.toFixed(2)}`;
}

function renderProducts() {
  const filtered = products.filter((product) => {
    const matchesCategory = state.category === "Todos" ||
      (state.category === "Promociones" ? product.category === "Promociones" : product.category === state.category);
    const matchesSearch = product.name.toLowerCase().includes(state.search) ||
      product.description.toLowerCase().includes(state.search);
    return matchesCategory && matchesSearch;
  });

  productsGrid.innerHTML = filtered.map((product) => `
    <article class="product-card" data-detail="${product.id}" tabindex="0" role="button" aria-label="Ver detalles de ${product.name}">
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
      </div>
      <div class="product-info">
        <span class="product-category">${product.category}</span>
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <div class="product-footer">
          <strong class="product-price">${formatMoney(product.price)}</strong>
          <button class="add-button" type="button" data-add="${product.id}" aria-label="Agregar ${product.name}">+</button>
        </div>
      </div>
    </article>
  `).join("");

  emptyState.hidden = filtered.length !== 0;
  setupScrollAnimations();
}

function saveCart() {
  localStorage.setItem("foodDeliveryCart", JSON.stringify(state.cart));
}

function getCartQuantity() {
  return state.cart.reduce((sum, item) => sum + item.quantity, 0);
}

function getSubtotal() {
  return state.cart.reduce((sum, item) => {
    const product = products.find((entry) => entry.id === item.id);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);
}

function addToCart(productId) {
  const existing = state.cart.find((item) => item.id === productId);
  if (existing) existing.quantity += 1;
  else state.cart.push({ id: productId, quantity: 1 });
  saveCart();
  renderCart();
  const product = products.find((item) => item.id === productId);
  showToast(`${product.name} agregado`);
}

function renderCart() {
  cartCount.textContent = getCartQuantity();
  cartEmpty.hidden = state.cart.length !== 0;
  cartSummary.hidden = state.cart.length === 0;

  cartItems.innerHTML = state.cart.map((item) => {
    const product = products.find((entry) => entry.id === item.id);
    if (!product) return "";
    return `
      <article class="cart-item">
        <div class="cart-item-icon"><img src="${product.image}" alt="" aria-hidden="true"></div>
        <div class="cart-item-info">
          <strong>${product.name}</strong>
          <small>${formatMoney(product.price)}</small>
          <div class="quantity">
            <button type="button" data-decrease="${product.id}" aria-label="Reducir ${product.name}">-</button>
            <span>${item.quantity}</span>
            <button type="button" data-increase="${product.id}" aria-label="Aumentar ${product.name}">+</button>
          </div>
        </div>
        <button class="remove-item" type="button" data-remove="${product.id}" aria-label="Eliminar ${product.name}">&#10005;</button>
      </article>
    `;
  }).join("");

  const subtotal = getSubtotal();
  const delivery = state.cart.length ? 2.50 : 0;
  const total = subtotal + delivery;
  document.getElementById("subtotal").textContent = formatMoney(subtotal);
  document.getElementById("delivery-cost").textContent = formatMoney(delivery);
  document.getElementById("total").textContent = formatMoney(total);
  document.getElementById("checkout-total").textContent = formatMoney(total);
}

function openCart() {
  cartOverlay.classList.add("open");
  cartOverlay.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  document.getElementById("close-cart").focus();
}

function closeCart() {
  cartOverlay.classList.remove("open");
  cartOverlay.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

let detailProductId = null;
const productDialog = document.getElementById("product-dialog");

function openProductDetail(productId) {
  const product = products.find((item) => item.id === productId);
  if (!product) return;
  detailProductId = productId;
  document.getElementById("detail-image").src = product.image;
  document.getElementById("detail-image").alt = product.name;
  document.getElementById("detail-category").textContent = product.category;
  document.getElementById("detail-name").textContent = product.name;
  document.getElementById("detail-description").textContent = product.description;
  document.getElementById("detail-preparation").textContent = product.details;
  document.getElementById("detail-allergens").textContent = product.allergens;
  document.getElementById("detail-price").textContent = formatMoney(product.price);
  productDialog.showModal();
}

productsGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-add]");
  if (button) {
    event.stopPropagation();
    addToCart(Number(button.dataset.add));
    return;
  }
  const card = event.target.closest("[data-detail]");
  if (card) openProductDetail(Number(card.dataset.detail));
});

productsGrid.addEventListener("keydown", (event) => {
  if (event.key !== "Enter" && event.key !== " ") return;
  const card = event.target.closest("[data-detail]");
  if (!card) return;
  event.preventDefault();
  openProductDetail(Number(card.dataset.detail));
});

document.getElementById("categories").addEventListener("click", (event) => {
  const button = event.target.closest("[data-category]");
  if (!button) return;
  state.category = button.dataset.category;
  document.querySelectorAll(".category").forEach((category) => category.classList.remove("active"));
  button.classList.add("active");
  renderProducts();
});

document.getElementById("search").addEventListener("input", (event) => {
  state.search = event.target.value.trim().toLowerCase();
  renderProducts();
});

cartItems.addEventListener("click", (event) => {
  const increaseButton = event.target.closest("[data-increase]");
  const decreaseButton = event.target.closest("[data-decrease]");
  const removeButton = event.target.closest("[data-remove]");
  let productId;
  if (increaseButton) productId = Number(increaseButton.dataset.increase);
  if (decreaseButton) productId = Number(decreaseButton.dataset.decrease);
  if (removeButton) productId = Number(removeButton.dataset.remove);
  if (!productId) return;

  const item = state.cart.find((entry) => entry.id === productId);
  if (!item) return;
  if (increaseButton) item.quantity += 1;
  if (decreaseButton) item.quantity -= 1;
  if (removeButton || item.quantity <= 0) {
    state.cart = state.cart.filter((entry) => entry.id !== productId);
  }
  saveCart();
  renderCart();
});

document.getElementById("open-cart").addEventListener("click", openCart);
document.getElementById("close-cart").addEventListener("click", closeCart);
document.getElementById("close-cart-backdrop").addEventListener("click", closeCart);

document.getElementById("menu-button").addEventListener("click", (event) => {
  const nav = document.getElementById("main-nav");
  const isOpen = nav.classList.toggle("open");
  event.currentTarget.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    document.querySelectorAll(".nav-link").forEach((item) => item.classList.remove("active"));
    link.classList.add("active");
    document.getElementById("main-nav").classList.remove("open");
  });
});

document.querySelectorAll("[data-promo]").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    addToCart(Number(button.dataset.promo));
  });
});

const promotionsGrid = document.querySelector(".promotions-grid");
promotionsGrid.addEventListener("click", (event) => {
  if (event.target.closest("[data-promo]")) return;
  const card = event.target.closest("[data-detail]");
  if (card) openProductDetail(Number(card.dataset.detail));
});
promotionsGrid.addEventListener("keydown", (event) => {
  if (event.key !== "Enter" && event.key !== " ") return;
  const card = event.target.closest("[data-detail]");
  if (!card) return;
  event.preventDefault();
  openProductDetail(Number(card.dataset.detail));
});

document.getElementById("checkout-button").addEventListener("click", () => {
  closeCart();
  checkoutDialog.showModal();
});

document.getElementById("close-checkout").addEventListener("click", () => checkoutDialog.close());

document.getElementById("checkout-form").addEventListener("submit", (event) => {
  event.preventDefault();
  if (!event.currentTarget.checkValidity()) {
    event.currentTarget.reportValidity();
    return;
  }
  checkoutDialog.close();
  state.cart = [];
  saveCart();
  renderCart();
  successModal.classList.add("open");
  successModal.setAttribute("aria-hidden", "false");
  event.currentTarget.reset();
});

document.getElementById("close-success").addEventListener("click", () => {
  successModal.classList.remove("open");
  successModal.setAttribute("aria-hidden", "true");
});

document.getElementById("close-product-detail").addEventListener("click", () => productDialog.close());
document.getElementById("detail-add").addEventListener("click", () => {
  if (detailProductId) addToCart(detailProductId);
  productDialog.close();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && cartOverlay.classList.contains("open")) closeCart();
});

function getInitials(name) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function createReviewCard(review) {
  const card = document.createElement("article");
  card.className = "review-card";

  const top = document.createElement("div");
  top.className = "review-top";

  const avatar = document.createElement("span");
  avatar.className = "review-avatar";
  avatar.textContent = getInitials(review.name);

  const user = document.createElement("div");
  const name = document.createElement("strong");
  name.textContent = review.name;
  const date = document.createElement("small");
  date.textContent = "Publicado ahora";
  user.append(name, date);

  const stars = document.createElement("span");
  stars.className = "review-stars";
  stars.setAttribute("aria-label", `${review.rating} estrellas`);
  stars.textContent = "★".repeat(review.rating);

  const comment = document.createElement("p");
  comment.textContent = review.comment;
  top.append(avatar, user, stars);
  card.append(top, comment);
  return card;
}

function renderSubmittedReviews() {
  const grid = document.querySelector(".reviews-grid");
  const reviews = JSON.parse(localStorage.getItem("foodDeliveryReviews") || "[]");
  reviews.forEach((review) => {
    grid.prepend(createReviewCard(review));
  });
}

let scrollAnimationObserver;

function setupScrollAnimations() {
  if (!scrollAnimationObserver && "IntersectionObserver" in window) {
    scrollAnimationObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          scrollAnimationObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px" });
  }

  document.querySelectorAll(
    ".benefits article, .section-heading, .categories, .promotion-heading, .about-story, .reviews-header, .review-form"
  ).forEach((element) => {
    if (!element.classList.contains("reveal-target")) element.classList.add("reveal-target");
  });

  document.querySelectorAll(
    ".product-card, .promotion-card, .review-card"
  ).forEach((element, index) => {
    if (!element.classList.contains("scroll-reveal")) element.classList.add("scroll-reveal");
    element.style.setProperty("--delay", `${(index % 4) * 70}ms`);
  });

  const targets = document.querySelectorAll(".reveal-target, .scroll-reveal");
  targets.forEach((target) => {
    if (scrollAnimationObserver) {
      if (!target.classList.contains("revealed")) scrollAnimationObserver.observe(target);
    } else {
      target.classList.add("revealed");
    }
  });
}

document.getElementById("review-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const name = form.elements.name.value.trim();
  const comment = form.elements.comment.value.trim();
  const rating = Number(form.elements.rating.value);
  if (!name || !comment) return;

  const review = { name, comment, rating };
  const reviews = JSON.parse(localStorage.getItem("foodDeliveryReviews") || "[]");
  reviews.unshift(review);
  localStorage.setItem("foodDeliveryReviews", JSON.stringify(reviews.slice(0, 12)));

  const grid = document.querySelector(".reviews-grid");
  grid.prepend(createReviewCard(review));
  form.reset();
  setupScrollAnimations();
  showToast("Resena publicada");
});

renderSubmittedReviews();
renderProducts();
renderCart();
setupScrollAnimations();
