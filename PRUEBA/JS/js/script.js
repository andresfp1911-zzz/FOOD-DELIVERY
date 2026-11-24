
const products = [
    {
        id: 1,
        name: "Burger Doble",
        category: "Hamburguesas",
        description: "Doble carne, queso cheddar y salsa especial.",
        price: 24900,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500"
    },
    {
        id: 2,
        name: "Cheese Burger",
        category: "Hamburguesas",
        description: "Carne jugosa, queso y vegetales frescos.",
        price: 18900,
        image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=500"
    },
    {
        id: 3,
        name: "Burger Especial",
        category: "Hamburguesas",
        description: "Hamburguesa con queso, tomate y lechuga.",
        price: 21900,
        image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=500"
    },
    {
        id: 4,
        name: "Pollo Crispy",
        category: "Pollo",
        description: "Pollo crujiente con una receta especial.",
        price: 22900,
        image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=500"
    },
    {
        id: 5,
        name: "Alitas BBQ",
        category: "Pollo",
        description: "Alitas de pollo con salsa BBQ.",
        price: 19900,
        image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=500"
    },
    {
        id: 6,
        name: "Papas Clásicas",
        category: "Papas",
        description: "Papas fritas doradas y crujientes.",
        price: 8900,
        image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500"
    },
    {
        id: 7,
        name: "Papas Especiales",
        category: "Papas",
        description: "Papas con queso y salsa especial.",
        price: 13900,
        image: "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=500"
    },
    {
        id: 8,
        name: "Gaseosa",
        category: "Bebidas",
        description: "Bebida refrescante de 400 ml.",
        price: 5500,
        image: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=500"
    },
    {
        id: 9,
        name: "Malteada",
        category: "Bebidas",
        description: "Malteada cremosa de chocolate.",
        price: 10900,
        image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500"
    },
    {
        id: 10,
        name: "Helado",
        category: "Postres",
        description: "Delicioso helado de vainilla.",
        price: 6900,
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500"
    },
    {
        id: 11,
        name: "Brownie",
        category: "Postres",
        description: "Brownie de chocolate suave.",
        price: 8500,
        image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500"
    }
];

const SHIPPING_COST = 5000;

let cart = JSON.parse(localStorage.getItem("foodCart")) || [];
let selectedCategory = "Todos";

const productsGrid = document.getElementById("products-grid");
const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const searchInput = document.getElementById("search-input");

const money = (value) => {
    return new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        maximumFractionDigits: 0
    }).format(value);
};

// MOSTRAR PRODUCTOS

function renderProducts() {
    const search = searchInput.value.toLowerCase();

    const filteredProducts = products.filter(product => {
        const matchesCategory =
            selectedCategory === "Todos" ||
            product.category === selectedCategory;

        const matchesSearch =
            product.name.toLowerCase().includes(search) ||
            product.description.toLowerCase().includes(search);

        return matchesCategory && matchesSearch;
    });

    if (filteredProducts.length === 0) {
        productsGrid.innerHTML =
            '<p class="no-products">No encontramos productos.</p>';
        return;
    }

    productsGrid.innerHTML = filteredProducts.map(product => `
        <article class="product-card">
            <img
                src="${product.image}"
                alt="${product.name}"
                loading="lazy"
            >

            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>

                <div class="product-bottom">
                    <span class="price">${money(product.price)}</span>

                    <button
                        class="add-button"
                        onclick="addToCart(${product.id})"
                    >
                        + Agregar
                    </button>
                </div>
            </div>
        </article>
    `).join("");
}

// FILTRAR CATEGORÍAS

document.querySelectorAll(".category").forEach(button => {
    button.addEventListener("click", () => {
        document.querySelectorAll(".category").forEach(item => {
            item.classList.remove("active");
        });

        button.classList.add("active");

        selectedCategory = button.dataset.category;
        renderProducts();
    });
});

// BUSCADOR

searchInput.addEventListener("input", renderProducts);

// GUARDAR CARRITO

function saveCart() {
    localStorage.setItem("foodCart", JSON.stringify(cart));
}

// AGREGAR PRODUCTOS

function addToCart(id) {
    const product = products.find(item => item.id === id);

    const existingProduct = cart.find(item => item.id === id);

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }

    saveCart();
    renderCart();
    showToast(`${product.name} agregado al carrito`);
}

// CAMBIAR CANTIDADES

function changeQuantity(id, amount) {
    const item = cart.find(product => product.id === id);

    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {
        cart = cart.filter(product => product.id !== id);
    }

    saveCart();
    renderCart();
}

// ELIMINAR PRODUCTO

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);

    saveCart();
    renderCart();

    showToast("Producto eliminado");
}

// CALCULAR TOTALES

function getSubtotal() {
    return cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );
}

// MOSTRAR CARRITO

function renderCart() {
    const totalProducts = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const subtotal = getSubtotal();
    const shipping = subtotal > 0 ? SHIPPING_COST : 0;
    const total = subtotal + shipping;

    cartCount.textContent = totalProducts;

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <p class="empty-cart">
                Todavía no has agregado productos.
            </p>
        `;
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">

                <div class="cart-item-info">
                    <strong>${item.name}</strong>
                    <small>${money(item.price * item.quantity)}</small>
                </div>

                <div class="quantity-controls">

                    <button
                        onclick="changeQuantity(${item.id}, -1)"
                        aria-label="Quitar una unidad de ${item.name}"
                    >−</button>

                    <span>${item.quantity}</span>

                    <button
                        onclick="changeQuantity(${item.id}, 1)"
                        aria-label="Agregar una unidad de ${item.name}"
                    >+</button>

                    <button
                        class="remove-button"
                        onclick="removeFromCart(${item.id})"
                        aria-label="Eliminar ${item.name}"
                    >×</button>

                </div>
            </div>
        `).join("");
    }

    document.getElementById("subtotal").textContent =
        money(subtotal);

    document.getElementById("shipping").textContent =
        money(shipping);

    document.getElementById("total").textContent =
        money(total);
}

// ABRIR CARRITO

document.getElementById("cart-button").addEventListener("click", () => {
    document.getElementById("checkout").scrollIntoView({
        behavior: "smooth"
    });
});

// MENÚ PARA CELULARES

document.getElementById("menu-toggle").addEventListener("click", () => {
    document.getElementById("navbar").classList.toggle("open");
});

document.querySelectorAll(".navbar a").forEach(link => {
    link.addEventListener("click", () => {
        document.getElementById("navbar").classList.remove("open");
    });
});

// NOTIFICACIONES

let toastTimer;

function showToast(message) {
    const toast = document.getElementById("toast");

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}

// CONFIRMAR PEDIDO

document.getElementById("delivery-form").addEventListener(
    "submit",
    function(event) {
        event.preventDefault();

        const confirmation =
            document.getElementById("confirmation-message");

        if (cart.length === 0) {
            confirmation.textContent =
                "Agrega al menos un producto antes de continuar.";

            return;
        }

        const name = document.getElementById("name").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const address = document.getElementById("address").value.trim();
        const notes = document.getElementById("notes").value.trim();

        const payment = document.querySelector(
            'input[name="payment"]:checked'
        );

        if (!name || !phone || !address || !payment) {
            confirmation.textContent =
                "Completa todos los campos obligatorios.";

            return;
        }

        const subtotal = getSubtotal();
        const shipping = SHIPPING_COST;
        const total = subtotal + shipping;

        const orderSummary = cart.map(item =>
            `${item.name} x${item.quantity}`
        ).join(", ");

        const orderNumber = Math.floor(1000 + Math.random() * 9000);

        alert(`
¡PEDIDO CONFIRMADO!

Pedido #${orderNumber}

Cliente: ${name}
Teléfono: ${phone}
Dirección: ${address}

Productos:
${orderSummary}

Subtotal: ${money(subtotal)}
Envío: ${money(shipping)}
TOTAL: ${money(total)}

Método de pago: ${payment.value}

Observaciones: ${notes || "Ninguna"}

¡Gracias por elegir FOOD DELIVERY!
        `);

        confirmation.textContent =
            `¡Gracias, ${name}! Tu pedido #${orderNumber} ha sido registrado.`;

        cart = [];
        saveCart();
        renderCart();

        this.reset();

        confirmation.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });
    }
);

// INICIAR PÁGINA

renderProducts();
renderCart();
