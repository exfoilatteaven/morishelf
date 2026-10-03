/* ================================
   SEARCH
================================ */

const searchBtn = document.getElementById("searchBtn");
const searchBox = document.getElementById("searchBox");
const searchInput = document.getElementById("searchInput");

searchBtn.addEventListener("click", () => {

    searchBox.classList.toggle("active");

    if (searchBox.classList.contains("active")) {
        searchInput.focus();
    }

});


/* SEARCH PRODUCT */

searchInput.addEventListener("input", () => {

    const keyword = searchInput.value.toLowerCase();

    const products = document.querySelectorAll(".product-card");

    products.forEach(product => {

        const productName =
            product.querySelector("h3")
            .textContent
            .toLowerCase();

        if (productName.includes(keyword)) {
            product.style.display = "";
        } else {
            product.style.display = "none";
        }

    });

});


/* ================================
   PRODUCT FILTER
================================ */

const filterButtons =
    document.querySelectorAll(".filter-btn");

const productCards =
    document.querySelectorAll(".product-card");


filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const filter =
            button.dataset.filter;

        productCards.forEach(card => {

            if (
                filter === "all" ||
                card.dataset.category === filter
            ) {
                card.style.display = "";
            } else {
                card.style.display = "none";
            }

        });

    });

});


/* ================================
   CATEGORY BUTTON
================================ */

const categoryButtons =
    document.querySelectorAll(".category-card");

categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

        const category =
            button.dataset.category;

        document
            .querySelector("#products")
            .scrollIntoView({
                behavior: "smooth"
            });

        filterButtons.forEach(btn => {

            btn.classList.remove("active");

            if (
                btn.dataset.filter === category
            ) {
                btn.classList.add("active");
            }

        });

        productCards.forEach(card => {

            if (
                card.dataset.category === category
            ) {
                card.style.display = "";
            } else {
                card.style.display = "none";
            }

        });

    });

});


/* ================================
   WISHLIST
================================ */

const wishlistButtons =
    document.querySelectorAll(".wishlist");

wishlistButtons.forEach(button => {

    button.addEventListener("click", () => {

        button.classList.toggle("active");

        if (button.classList.contains("active")) {
            button.textContent = "♥";
        } else {
            button.textContent = "♡";
        }

    });

});


/* ================================
   SHOPPING CART
================================ */

let cart = [];


const cartCount =
    document.getElementById("cartCount");

const cartModal =
    document.getElementById("cartModal");

const cartItems =
    document.getElementById("cartItems");

const cartTotal =
    document.getElementById("cartTotal");

const cartBtn =
    document.getElementById("cartBtn");

const closeCart =
    document.getElementById("closeCart");


/* PRODUCT PRICE */

const prices = {

    "Daily Notes Journal": 39000,

    "Campus Daily Tote": 79000,

    "Study Buddy Tumbler": 69000,

    "Study Mode Headphones": 129000

};


/* ADD TO CART */

const addButtons =
    document.querySelectorAll(".add-cart");


addButtons.forEach(button => {

    button.addEventListener("click", () => {

        const product =
            button.dataset.product;

        cart.push(product);

        updateCart();

        button.textContent = "✓";

        setTimeout(() => {
            button.textContent = "+";
        }, 1000);

    });

});


/* UPDATE CART */

function updateCart() {

    cartCount.textContent = cart.length;

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Your cart is empty.
            </p>
        `;

        cartTotal.textContent = "Rp0";

        return;
    }


    cartItems.innerHTML = "";


    let total = 0;


    cart.forEach((product, index) => {

        total += prices[product];


        const item =
            document.createElement("div");

        item.className = "cart-item";

        item.innerHTML = `
            <div>
                <p>${product}</p>
                <span>
                    Rp${prices[product].toLocaleString("id-ID")}
                </span>
            </div>

            <button
                class="remove-item"
                onclick="removeCartItem(${index})"
            >
                Remove
            </button>
        `;

        cartItems.appendChild(item);

    });


    cartTotal.textContent =
        `Rp${total.toLocaleString("id-ID")}`;

}


/* REMOVE CART */

function removeCartItem(index) {

    cart.splice(index, 1);

    updateCart();

}


/* OPEN CART */

cartBtn.addEventListener("click", () => {

    cartModal.classList.add("active");

});


/* CLOSE CART */

closeCart.addEventListener("click", () => {

    cartModal.classList.remove("active");

});


/* CLICK OUTSIDE CART */

cartModal.addEventListener("click", (event) => {

    if (event.target === cartModal) {
        cartModal.classList.remove("active");
    }

});


/* ================================
   MOBILE MENU
================================ */

const menuBtn =
    document.getElementById("menuBtn");

const navMenu =
    document.querySelector(".nav-menu");


menuBtn.addEventListener("click", () => {

    navMenu.classList.toggle("mobile-active");

});


/* ================================
   CHECKOUT
================================ */

const checkoutBtn =
    document.querySelector(".checkout-btn");

checkoutBtn.addEventListener("click", () => {

    if (cart.length === 0) {

        alert("Keranjang kamu masih kosong 😭");

        return;
    }

    alert(
        "Thank you for shopping at Morishelf! 🌧️📚"
    );

});