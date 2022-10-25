//I need to display the carts in Jalopy
import {getHeaders} from "../auth.js";
import createView from "../createView.js";

let basket = [];
let products;
export default function addToCart(props) {
    basket.push(props.order);
    // console.log(basket);

    let myOrder;
    console.log(basket);
    for (let i = 0; i < basket.length; i++) {

        myOrder = basket[i];
        let total = 0;
        let cardsHTML = ``;
        //conditional for an empty cart is in else statement

        if (myOrder.length > 0 || myOrder.products.length > 0 ) {


                cardsHTML += `
            <!--For the checkout button-->
            <div class="container cart-container">
                <div class="delete-cart">
                    <h2>Total Bill: $</h2>
                    <button data-passthru id="checkoutBtn" class="checkout">Checkout</button>
                    <button data-id="${myOrder.id}" class="removeAll">Clear Cart</button>
                </div>
            `;
                products = myOrder.products;
                for (let j = 0; j < products.length; j++) {

                    cardsHTML += `       
                           
                 <div class="cart-item">                
                     <img src="${products[j].item.imageURL}" alt="A plant" style="width:35%" >
                     <div class="details">
                        <div class="title-price-x">
                            <h4 class="title-price">
                                <!--product name-->
                                <h5>${products[j].item.name}</h5>
                                <p>$ <span class="cart-item-price">${(products[j].item.price).toFixed(2)}</span></p>
                            </h5>
                            <i data-id="${products[j].id}" style="margin-bottom: 25px" class="fa-solid fa-x removeItem"></i>
                        </div>   
                        <div class="cart-buttons">
                            <i data-id="${products[j].id}" class="fa-solid fa-minus decrement-Btn"></i>
                            <div data-id="${products[j].id}" class="quantity">${products[j].quantity}
                            </div>     
                            <i data-id="${products[j].id}" class="fa-solid fa-plus increment-Btn"></i>
                        </div>   
                        <!--This multiplies the item quantity by the price of the item-->
                        <h3 >$ <span class="price">${((products[j].item.price) * products[j].quantity).toFixed(2)}</span></h3>      
                                  
                    </div>
            </div>
                `;
                }
                    for (let k = 0; k < products.length; k++) {
                        total += products[k].quantity;
                    }
                    cardsHTML += `
                    <!--For the shopping cart icon-->
                    <div class="cart">
                        <a data-link href="/cart"><i data-passthru id="cart" class="fa-solid fa-cart-shopping"></i></a>
                        <!--This is the cart total item counter-->
                        <div class="cart-amount">${total}</div>
                    </div>
            
                
                `;



        } else {
            cardsHTML += `
                <div class="empty-cart">
                  <h2 >Cart is Empty</h2>
                  <a style="margin-top: 150px" data-link href="/products">
                      <button data-link class="productsEmpty">Back to shopping</button>
                  </a> 
                </div>               
                `;
            }
        return cardsHTML;
        }

}
//I need to fill the  basket from the backend (orders), not localStorage because Jalopy sucks!
// basket = JSON.parse(localStorage.getItem("data")) || [];
// console.log(basket);

export function addToCartEvent() {

    //  totalAmount();
    checkout();
    clearCart();
    addIncrementDecrementHandlers();
    setupDeleteHandlers();

}

let productId;
function addIncrementDecrementHandlers() {
    const incrementBtns = document.querySelectorAll(".increment-Btn")
    const decrementBtns = document.querySelectorAll(".decrement-Btn")
    //looping through the increment buttons
    for (let i = 0; i < incrementBtns.length; i++) {
        // console.log(incrementBtns[i]);
        incrementBtns[i].addEventListener("click", function(e) {
            let orderProductId = this.getAttribute("data-id");
            const itemQuantity = document.querySelectorAll(".quantity");
            const itemPrice = document.querySelectorAll(".price");
            const costPrice = document.querySelectorAll(".cart-item-price");
            const cartCounter = document.querySelector(".cart-amount")
            let quan= parseFloat(itemQuantity[i].innerHTML);

            let cost = parseFloat(costPrice[i].innerHTML);

            quan++;
            // console.log(price);
            // console.log(quan);
            // console.log(cost);
            //console.log(totalCartQuantity);

            itemQuantity[i].innerHTML++;
            itemPrice[i].innerText = (cost * quan).toFixed(2);
            cartCounter.innerText++;
            // console.log(itemPrice[i].innerText);
            // increment(orderProductId);
            const request = {
                method: "PUT",
                headers: getHeaders(),
            }
            let url = BACKEND_HOST_URL + "/api/orders/products/" + `${orderProductId}`+ "/quantity-increment";
            // console.log(url);
            fetch(url, request)
                .then(function(response) {
                    if(response.status !== 200) {
                        console.log("fetch returned bad status code: " + response.status);
                        console.log(response.statusText);
                    }

                })


        });

    }
    //looping through the decrement buttons
    for (let i = 0; i < decrementBtns.length; i++) {
        decrementBtns[i].addEventListener("click", function(e) {
            let orderProductId = this.getAttribute("data-id");
            const itemQuantity = document.querySelectorAll(".quantity");
            const itemPrice = document.querySelectorAll(".price");
            const costPrice = document.querySelectorAll(".cart-item-price");
            const cartCounter = document.querySelector(".cart-amount")
            let quan= parseFloat(itemQuantity[i].innerHTML);
            let price= parseFloat(itemPrice[i].innerHTML);
            let cost = parseFloat(costPrice[i].innerHTML);

            //lets add a const and function that increments/decrements the item quantity in the cart badge
            quan--;
            // console.log(price);
            console.log(quan);
            console.log(cost);
            itemQuantity[i].innerHTML--;
            itemPrice[i].innerText = (cost * quan).toFixed(2);
            cartCounter.innerText--;
            console.log(itemPrice[i].innerText);
            const request = {
                method: "PUT",
                headers: getHeaders(),
            }
            let url = BACKEND_HOST_URL + "/api/orders/products/" + `${orderProductId}` + "/quantity-decrement";
            // console.log(url);
            fetch(url, request)
                .then(function(response) {
                    if(response.status !== 200) {
                        console.log("fetch returned bad status code: " + response.status);
                        console.log(response.statusText);
                    }
                })

        });

    }

}

function setupDeleteHandlers() {
    // target all delete buttons
    const deleteButtons = document.querySelectorAll(".removeItem");
    // add click handler to all delete buttons
    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener("click", function(event) {

            // get the post id of the delete button
            let orderProductId = this.getAttribute("data-id");

            //      deleteOrder(orderId);

            const request = {
                method: "DELETE",
                headers: getHeaders(),
            }
            let url = BACKEND_HOST_URL + "/api/orders/products/" + `${orderProductId}`;
            console.log(url);
            fetch(url, request)
                .then(function(response) {
                    if(response.status !== 200) {
                        console.log("fetch returned bad status code: " + response.status);
                        console.log(response.statusText);
                    }
                    //createView("/cart")

                })
            deleteButtons[i].parentElement.parentElement.parentElement.outerHTML = ""
        });
    }
}
function checkout() {
   const checkoutBtn = document.querySelector(".checkout");
   checkoutBtn.addEventListener("click", function(){
       createView("/checkout")
   })
}

let clearCart = () => {
    let banish =  document.querySelector(".removeAll")
    banish.addEventListener("click", function(){
        let items = document.querySelectorAll(".cart-item");
        // get the post id of the delete button
        let orderProductId = this.getAttribute("data-id");

        const request = {
            method: "DELETE",
            headers: getHeaders(),
        }
        let url = BACKEND_HOST_URL + "/api/orders/delete/" + `${orderProductId}`;
        console.log(url);
        fetch(url, request)
            .then(function(response) {
                if(response.status !== 200) {
                    console.log("fetch returned bad status code: " + response.status);
                    console.log(response.statusText);
                }
                //createView("/cart")

            })

        items.forEach( item =>
        item.outerHTML = "");

        window.localStorage.setItem(order-id, "0" );
    })
}

//increment and decrement functions
// let bucket;
// function increment(productId) {
//
//     for(let i=0; i < products.length; i++) {
//         // console.log(products);
//         if(products[i].id == productId) {
//
//             bucket = products[i];
//         }
//     }
//     bucket.quantity++;
//     bucket.price
//
// }

// function decrement() {
//     for(let i=0; i < products.length; i++) {
//         if(products[i].id == productId) {
//
//             bucket = products[i];
//         }
//     }
//     bucket.quantity--;
// }



let totalAmount = () => {
    if (basket.products.length !== 0) {
        let amount = products.map((x) => {
            let {item, id} = x;
            let search = products.find((y) => y.id === id) || [];
            return item * products.item.price;
        }).reduce((x, y) => x + y, 0);
        label.innerHTML = `
         <h2>Total Bill: $ ${amount}</h2>
         <button class="checkout">Checkout</button>
         <button onclick="clearCart()" class="removeAll">Clear Cart</button>
         `;
    }

}