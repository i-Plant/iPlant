import createView from "../createView.js";
import {getHeaders} from "../auth.js";
import CreateView from "../createView.js";

let products = [];
export default function Products(props) {
    products = props.products
//   sortProductsByName();
        let html = `
<!--For the shopping cart icon-->
     <div class="cart">
        <a data-link href="/cart"><i data-passthru id="cart" class="fa-solid fa-cart-shopping"></i></a>
        <div class="cart-amount"></div>
     </div>
     `;

   html += `

    <div>
        <h1>Our Plants</h1>
    </div>
    <main>
`;
        for (let i = 0; i < products.length; i++) {

            html +=  `
            
<div class="flip-card">
    <div class="flip-card-inner">
        <div class="flip-card-front">
             <img class="card-img-top" src="${products[i].imageURL}" alt="plant-image">
            <div class="plantName">
             <h6 class="nameTitle">${products[i].name}</h6>
             <h5 class="nameTitle">$ ${(products[i].price).toFixed(2)}</h5>
             </div>
        </div>
        
        <div class="flip-card-back">
            <p class="card-info">
                <h6 class="products-card-text">${products[i].details}</h6>
                 <h4>${products[i].category}</h4>
            </p>
             <button data-id="${products[i].id}" class="btn btn-primary addToCart">Add to Cart</button>
        </div> 
    </div>
</div>   
                   
`;
        }

        return html += `</main>`;

}


export function ProductsEvent(){
    pushToCart();
}

let cartArray = [];
function pushToCart() {

    let addToCart = document.querySelectorAll(".addToCart");
    for (let i = 0; i < addToCart.length; i++) {
        addToCart[i].addEventListener("click", (e) => {
            e.preventDefault();
            let item = addToCart[i].getAttribute("data-id");
            cartArray.push(item);
            cartArray.sort();//should I sort before the loop?
            console.log(item);
        })
    }
    //I need to change the counter in the cart when I add a product to the cart
}
function setupValidationHandlers() {
    let checkout = document.querySelector("")
    checkout.addEventListener("click", validateOrder);

}
//If cart is empty do NOT allow checkout button --> checkout page and inform the user
function validateOrder() {
    let isValid = true;
    let completeCheckout = document.querySelector("#checkout-btn");
    if(completeCheckout.length < 1) {
        completeCheckout.classList.add("order is-invalid");
        completeCheckout.classList.remove("is-valid");
        isValid = false;
    } else {
       completeCheckout.classList.add("is-valid");
        completeCheckout.classList.remove("order is-invalid");
    }

    return isValid;
}

// function sortProductsByName(a, b) {
//     // Use toUpperCase() to ignore character casing
//     const nameA = a.name.toUpperCase();
//     const nameB = b.name.toUpperCase();
//
//     let comparison = 0;
//     if (nameA > nameB) {
//         comparison = 1;
//     } else if (nameA < nameB) {
//         comparison = -1;
//     }
//     return comparison;
// }
function saveOrder(orderId) {
    // get the order-id for the new order
    const item = document.querySelector("#item");

    // don't allow checkout if cart is empty
    if (!validateOrder()) {
        return;
    }

    // make the new order?
    const order = {
        item: item
    }
    console.log(order)

    // make the request
    const request = {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(order)
    }
    let url = BACKEND_HOST_URL + "/api/orders/${order-id}/products";
    console.log(request);

    fetch(url, request)
        .then(function (response) {
            if (response.status !== 200) {
                console.log("fetch returned bad status code: " + response.status);
                console.log(response.statusText);

                //I don't want to redirect to the cart page
                //          CreateView("/cart");
            }

        })
}

