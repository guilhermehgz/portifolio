const products = [
  {
    id: 1,
    name: "Relógio Elegante",
    price: 299.9,
    img: "https://via.placeholder.com/180x150?text=Relógio",
  },
  {
    id: 2,
    name: "Smartphone Moderno",
    price: 1599.0,
    img: "https://via.placeholder.com/180x150?text=Smartphone",
  },
  {
    id: 3,
    name: "Fone de Ouvido Sem Fio",
    price: 249.0,
    img: "https://via.placeholder.com/180x150?text=Fone+de+Ouvido",
  },
];

let cart = [];

const cartModal = document.getElementById("cart-modal");
const checkoutModal = document.getElementById("checkout-modal");
const btnOpenCart = document.getElementById("btn-open-cart");
const btnCloseCart = document.getElementById("btn-close-cart");
const btnCloseCheckout = document.getElementById("btn-close-checkout");
const cartItemsContainer = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");
const btnCheckout = document.getElementById("btn-checkout");
const checkoutForm = document.getElementById("checkout-form");

// Atualiza contagem do carrinho e itens
function updateCartUI() {
  cartCount.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Seu carrinho está vazio.</p>";
    btnCheckout.disabled = true;
    cartTotal.textContent = "Total: R$ 0,00";
    return;
  }

  btnCheckout.disabled = false;

  cartItemsContainer.innerHTML = "";
  cart.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <span>${item.name}</span>
      <input type="number" class="cart-item-quantity" min="1" value="${item.quantity}" data-id="${item.id}" />
      <span>R$ ${(item.price * item.quantity).toFixed(2)}</span>
      <button class="cart-item-remove" data-id="${item.id}" aria-label="Remover ${item.name}">&times;</button>
    `;
    cartItemsContainer.appendChild(div);
  });

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  cartTotal.textContent = `Total: R$ ${total.toFixed(2)}`;
}

// Adiciona produto ao carrinho
function addToCart(id) {
  const product = products.find((p) => p.id === id);
  if (!product) return;

  const cartItem = cart.find((item) => item.id === id);
  if (cartItem) {
    cartItem.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  updateCartUI();
}

// Remove produto do carrinho
function removeFromCart(id) {
  cart = cart.filter((item) => item.id !== id);
  updateCartUI();
}

// Atualiza quantidade no carrinho
function updateQuantity(id, quantity) {
  if (quantity < 1) return;
  const item = cart.find((i) => i.id === id);
  if (item) {
    item.quantity = quantity;
    updateCartUI();
  }
}

// Eventos

// Abrir carrinho
btnOpenCart.addEventListener("click", () => {
  cartModal.classList.remove("hidden");
});

// Fechar carrinho
btnCloseCart.addEventListener("click", () => {
  cartModal.classList.add("hidden");
});

// Fechar checkout
btnCloseCheckout.addEventListener("click", () => {
  checkoutModal.classList.add("hidden");
});

// Botões comprar
document.querySelectorAll(".btn-buy").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const productId = parseInt(e.target.closest(".product").dataset.id);
    addToCart(productId);
  });
});

// Interações no carrinho
cartItemsContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("cart-item-remove")) {
    const id = parseInt(e.target.dataset.id);
    removeFromCart(id);
  }
});

cartItemsContainer.addEventListener("change", (e) => {
  if (e.target.classList.contains("cart-item-quantity")) {
    const id = parseInt(e.target.dataset.id);
    const quantity = parseInt(e.target.value);
    if (!isNaN(quantity)) {
      updateQuantity(id, quantity);
    }
  }
});

// Botão finalizar compra
btnCheckout.addEventListener("click", () => {
  cartModal.classList.add("hidden");
  checkoutModal.classList.remove("hidden");
});

// Formulário checkout
checkoutForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!checkoutForm.checkValidity()) {
    checkoutForm.reportValidity();
    return;
  }

  // Aqui poderia enviar para backend ou serviço de pagamento
  alert(`Obrigado pela compra, ${checkoutForm.name.value}!`);

  // Limpar tudo
  cart = [];
  updateCartUI();
  checkoutForm.reset();
  checkoutModal.classList.add("hidden");
});

// Inicializa interface
updateCartUI();
