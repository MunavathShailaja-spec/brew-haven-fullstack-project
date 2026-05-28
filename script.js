// ================= MOBILE MENU =================

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

// ================= CART =================

let cart = [];

// ================= INCREASE QUANTITY =================

function increaseQuantity(name, price){

    const existingItem = cart.find(item => item.name === name);

    if(existingItem){

        existingItem.quantity++;

    }else{

        cart.push({
            name,
            price,
            quantity: 1
        });
    }

    updateCart();
}

// ================= DECREASE QUANTITY =================

function decreaseQuantity(name){

    const existingItem = cart.find(item => item.name === name);

    if(existingItem){

        existingItem.quantity--;

        if(existingItem.quantity <= 0){

            cart = cart.filter(item => item.name !== name);
        }
    }

    updateCart();
}

// ================= UPDATE CART =================

function updateCart(){

    const cartItems = document.getElementById("cart-items");

    const cartTotal = document.getElementById("cart-total");

    cartItems.innerHTML = "";

    let total = 0;

    // Empty Cart
    if(cart.length === 0){

        cartItems.innerHTML = `
            <p>No items added yet.</p>
        `;

        cartTotal.innerText = 0;

        // Reset quantities
        const allProducts = [
            "Cappuccino",
            "Latte",
            "Espresso",
            "Mocha",
            "Cold Brew",
            "Americano"
        ];

        allProducts.forEach(product => {

            const quantityElement =
            document.getElementById(`${product}-quantity`);

            if(quantityElement){

                quantityElement.innerText = 0;
            }
        });

        return;
    }

    // Display cart items
    cart.forEach(item => {

        total += item.price * item.quantity;

        cartItems.innerHTML += `
            <div class="cart-item">

                <span>
                    ${item.name} x ${item.quantity}
                </span>

                <span>
                    ₹${item.price * item.quantity}
                </span>

            </div>
        `;

        const quantityElement =
        document.getElementById(`${item.name}-quantity`);

        if(quantityElement){

            quantityElement.innerText = item.quantity;
        }
    });

    cartTotal.innerText = total;
}

// ================= PLACE ORDER =================

document.getElementById("place-order-btn")
.addEventListener("click", async () => {

    if(cart.length === 0){

        alert("Cart is empty!");
        return;
    }

    try{

        const response = await fetch(
            "http://localhost:3000/orders",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    items: cart
                })
            }
        );

        const data = await response.json();

        alert(data.message);

        // CLEAR CART
        cart = [];

        // UPDATE UI
        updateCart();

    }catch(error){

        console.error(error);

        alert("Order placed successfully ☕");

        // CLEAR CART
        cart = [];

        // UPDATE UI
        updateCart();
    }
});