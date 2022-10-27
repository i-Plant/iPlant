//I need to display the carts in Jalopy
//I need to push to a new array (basket) and display those cards in the cart(basket) when I add them
import {getHeaders} from "../auth.js";
import CreateView from "../createView.js";
import createView from "../createView.js";

let basket = [];
let products;
let totalCost = 0;
export default function addToCart(props) {
    basket.push(props.order);
    console.log(basket);

    let myOrder;
    for (let i = 0; i < basket.length; i++) {

        myOrder = basket[i];

        let cardsHTML = ``;
        //conditional for an empty cart is in else statement
        if(myOrder.products.length !== 0 ) {

            cardsHTML += `
            <!--For the checkout button-->
            <a data-link href="/checkout" id="checkout-btn"><i data-passthru class="fa-solid fa-dollar-sign">Checkout</i></a>
             
            <div class="container cart-container" style="background-image(src:(https://shop-static.arborday.org/media/0003288_weeping-willow_510.jpeg))">`;
            products = myOrder.products;
            for (let j = 0; j < myOrder.length; j++) {

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
            let total = 0;
            for (let k = 0; k < products.length; k++) {
                total += products[k].quantity;
            }
            cardsHTML +=`
            <!--For the shopping cart icon-->
            <div class="counter">
                <div class="cart">
                    <a data-link href="/cart"><i data-passthru id="cart" class="fa-solid fa-cart-shopping"></i></a>
                <!--This is the cart total item counter-->
                    <div class="cart-amount">${total}</div>
                </div>
                <div id='label' class='text-center'></div>
                <div class="shopping-cart" id="shopping-cart"></div>
            </div>
                `;

            } else {
                cardsHTML = `
                <div class="empty-cart">
                  <h2>Cart is Empty</h2>
                  <a style="margin-top: 50px" data-link href="/products">
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
    //  calculation();
    //  totalAmount();
     // update();
    //  clearCart();
     addIncrementDecrementHandlers();
     setupDeleteHandlers();
   //  pseudoDelete();
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
           // let counter= parseFloat(cartCounter[i].innerHTML);
            let cost = parseFloat(costPrice[i].innerHTML);

            quan++;
            // console.log(price);
            // console.log(quan);
            // console.log(cost);
            //console.log(totalCartQuantity);

            itemQuantity[i].innerHTML++;
            itemPrice[i].innerText = (cost * quan).toFixed(2);
            cartCounter.innerText ++;
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

            addCounterHTML();
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
                    createView("/cart")
                })

        });
    }
}
//for the badge counter in the cart
function calculation() {
    let cartCounter = document.querySelector(".cart-amount");
    cartCounter.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
}

let update = (productId) => {
    let search = basket.find((x) => x.id === id);
    document.querySelector("#id").innerHTML = search.item;

    calculation();
    totalAmount();
}
let removeItem = (id) => {
    // console.log(id.id);
    basket = basket.filter((x) => x.id !== id.id);

    generateCartItems();
    totalAmount();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));
}

let clearCart = () => {
    //clearing the basket by making it equal to an empty array
    basket = [];
    // generateCartItems();
    // calculation();
    // localStorage.setItem("data", JSON.stringify(basket));
}

let totalAmount = () => {
    if (basket.length !== 0) {
        let amount = basket.map((x) => {
            let {item, id} = x;
            let search = productsAPI.find((y) => y.id === id) || [];
            return item * search.price;
        }).reduce((x, y) => x + y, 0);
        label.innerHTML = `
         <h2>Total Bill: $ ${amount}</h2>
         <button class="checkout">Checkout</button>
         <button onclick="clearCart()" class="removeAll">Clear Cart</button>
         `;
    }
function calculatetotalCost(){
        let totalItemPrice = document.querySelectorAll(".price");
        for (let h = 0; h < totalItemPrice.length; h++) {

            totalCost += totalItemPrice[h].innerHTML;
        }
    }
}