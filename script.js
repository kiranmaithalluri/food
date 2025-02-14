// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
function viewCanteen(canteenId) {
    // Navigate to the specific canteen page (to be created)
    window.location.href = `${canteenId}.html`;
}

  function redirectToPage(canteen) {
    window.location.href = `${canteen}.html`; // Redirect to specific canteen's page
  }
let cart = [];

function increaseQuantity(button) {
  const quantityElement = button.parentElement.querySelector(".quantity");
  let quantity = parseInt(quantityElement.textContent);
  quantityElement.textContent = quantity + 1;
}

function decreaseQuantity(button) {
  const quantityElement = button.parentElement.querySelector(".quantity");
  let quantity = parseInt(quantityElement.textContent);
  if (quantity > 1) {
    quantityElement.textContent = quantity - 1;
  }
}

function addToCart(button) {
  const card = button.parentElement;
  const name = card.dataset.name;
  const price = parseInt(card.dataset.price);
  const quantity = parseInt(card.querySelector(".quantity").textContent);

  // Check if the item already exists in the cart
  const existingItem = cart.find(item => item.name === name);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ name, price, quantity });
  }

  updateCart();
  resetQuantity(card);
}

function resetQuantity(card) {
  const quantityElement = card.querySelector(".quantity");
  quantityElement.textContent = 1; // Reset quantity to 1 after adding to cart
}

function updateCart() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  cartItems.innerHTML = ""; // Clear the cart items display
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;

    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `
      <p>${item.name} (x${item.quantity})</p>
      <p>₹${item.price * item.quantity}</p>
    `;
    cartItems.appendChild(cartItem);
  });

  cartTotal.textContent = total;
}

function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  alert(`Your total is ₹${document.getElementById("cart-total").textContent}. Proceeding to checkout...`);
  cart = [];
  updateCart();
}
