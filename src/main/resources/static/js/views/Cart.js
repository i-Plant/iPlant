import createView from "../createView.js";

export default function addToCart() {

return `
<!--For the shopping cart-->
     <div class="cart">
        <a data-link href="/cart"><i data-passthru id="cart" class="fa-solid fa-cart-shopping"></i></a>
        <div class="cart-amount">0</div>
     </div>

<div id='label' class='text-center'></div>
<div class="shopping-cart" id="shopping-cart"></div>
`

//     return `

// <body class="body" >
//  <div class="Cart-Container"></div>
// </body>
// <!--Card header-->
// <div class="Header">
//  <h3 class="Heading">Shopping Cart</h3>
//  <h5 style="margin-top: 20px" class="Action">Remove all</h5>
//  </div>
//  <!--cart items-->
//  <div class="cart-items">
//  <div class="image-box">
//  <img src="/assets/1.jpg" style="height: 150px" alt="plant in a pot"/>
//  </div>
//  <div class="about">
//  <h1 class="title">Flower Pot</h1>
//  <h3 class="subtitle">Gallon size</h3>
//  <img src="/assets/1.jpg" style="height:30px" alt="plant in a pot"/>
//  </div>
//  <div class="counter"></div>
//  <div class="prices"></div>
//  </div>
//
// <!--Product counter-->
//  <div class="counter">
//  <div id="subtract" class="cart-btn">-</div>
//  <div id="count" class="count">0</div>
//  <div id="add" class="cart-btn">+</div>
//
//  </div>
//  <!--prices-->
//  <div class=”prices”>
//  <div class=”amount”>$2.99</div>
//  <div class=”remove”><u>Remove</u></div>
//  </div>
//
//
// `
}

let basket = JSON.parse(localStorage.getItem("data")) || [];
console.log(basket);
export function addToCartEvent() {
    calculation();

//clickCounter();
//emptyCart();

}
let label = document.getElementById("label");
let shoppingCart = document.getElementById("shopping-cart");

function calculation() {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x+y, 0);
}


let products = "api/products";
let generateCartItem = () => {
    if (basket.length !== 0) {
        return shoppingCart.innerHTML = basket.map((x) => {
            let {id, item} = x;
            //y.id is the id from the database
            let search = products.find((y) => y.id === id) || []; //if you find it, cool, if not return an empty array
            return `
            <div class="cart-item">
                <img width="100" src=${search.img} alt=""
            <div class="details">
            
            <div class="title-price-x">
                <h4 class="title-price">
                    <!--product name-->
                    <p>${search.name}</p>
                    <p class="cart-item-price">${search.price}</p>
                </h4>
                <i class="fa-solid fa-x"></i>
            </div>
            
            <div class="buttons">
                <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                <div id=${id} class="quantity">${item}</div>            
                <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
            </div>
            
            <h3></h3>
            </div>
            `;
        })
            .join("")
    }else{
        shoppingCart.innerHTML = ``;
        label.innerHTML = `
            <h2>Cart is Empty</h2>
            <a data-link href="/products">
                <button data-link class="products">Back to Home</button>
            </a>
            `;
    }
}


