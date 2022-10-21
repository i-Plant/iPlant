import createView from "../createView.js";
import {getHeaders} from "../auth.js";


let products = [];
export default function Products(props) {
    products = props.products
//   sortProductsByName();
    let html = `
<!--For the shopping cart icon-->
     <div class="cart">
        <a data-link href="/cart"><i data-passthru id="cart" class="fa-solid fa-cart-shopping"></i></a>
        <div class="cart-amount">0</div>
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
             <button id="addToCart" data-id="${products[i].id}" class="btn btn-primary addToCart">Add to Cart</button>
        </div> 
    </div>

</div>   
                   
`;
    }

    return html += `</main>`;

}


export function ProductsEvent(){
    pushToCart();
    //saveOrder();

}

function pushToCart() {

    let addToCart = document.querySelectorAll(".addToCart");
    for (let i = 0; i < addToCart.length; i++) {
        addToCart[i].addEventListener("click", (e) => {
            e.preventDefault();
            let itemId = addToCart[i].getAttribute("data-id");
            let orderId = 0;
            //if there's already an order id in local storage use that order
            if(window.localStorage.getItem("order-id") ) {
                orderId = window.localStorage.getItem("order-id")
            }

            const orderProduct = {
                id: 0,
                order: {
                    id: orderId
                },
                item: {
                    id: itemId
                }
            }
            // make the request
            const request = {
                method: "POST",
                headers: getHeaders(),
                body: JSON.stringify(orderProduct)
            }
            let url = BACKEND_HOST_URL + "/api/orders/" + `${orderId}` +"/products/";
            console.log(request);

            fetch(url, request)
                .then(function (response) {
                    if (response.status !== 200) {
                        console.log("fetch returned bad status code: " + response.status);
                        console.log(response.statusText);
                    }
                    return response.json()
                }).then(function(data){
                console.log(data);
                orderId = data.order.id;
                window.localStorage.setItem("order-id", orderId)
            })

        })
    }
    //I need to change the counter in the cart when I add a product to the cart
}





// function saveOrder(orderId) {
//     // get the order-id for the new order
//     const item = document.querySelector("#item");
//     // don't allow checkout if cart is empty
//
// }
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