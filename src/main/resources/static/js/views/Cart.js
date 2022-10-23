//I need to display the carts in Jalopy
//I need to push to a new array (basket) and display those cards in the cart(basket) when I add them
import {getHeaders} from "../auth.js";
import CreateView from "../createView.js";
import createView from "../createView.js";

let basket = [];
let products;
export default function addToCart(props) {
    basket.push(props.order);
    // console.log(basket);

    let myOrder;
    for (let i = 0; i < basket.length; i++) {

        // if (basket[i].buyer.id !== 1) {
        //     continue;
        // } else {
        //     myOrder = basket[i];
        // }
        myOrder = basket[i];
        let cardsHTML = `
        <!--For the checkout button-->
        <a data-link href="/checkout" id="checkout-btn"><i data-passthru class="fa-solid fa-dollar-sign">Checkout</i></a>
         
        <div class="container cart-container">`;
        products = myOrder.products;
        for (let j = 0; j < products.length; j++) {
            //Here, should I push to an array to store all items?

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
        cardsHTML += `
 <!--For the shopping cart icon-->
     <div class="cart">
        <a data-link href="/cart"><i data-passthru id="cart" class="fa-solid fa-cart-shopping"></i></a>
        <div class="cart-amount">${products[i].quantity}</div>
     </div>
     
     <div id='label' class='text-center'></div>
     <div class="shopping-cart" id="shopping-cart"></div>
     `;
        //     cardsHTML += `</div>`;
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
            let quan= parseFloat(itemQuantity[i].innerHTML);
            let price= parseFloat(itemPrice[i].innerHTML);
            let cost = parseFloat(costPrice[i].innerHTML);
            quan++;
            // console.log(price);
            // console.log(quan);
            // console.log(cost);
            itemQuantity[i].innerHTML++;
            itemPrice[i].innerText = (cost * quan).toFixed(2);
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
            let quan= parseFloat(itemQuantity[i].innerHTML);
            let price= parseFloat(itemPrice[i].innerHTML);
            let cost = parseFloat(costPrice[i].innerHTML);
            quan--;
            // console.log(price);
            console.log(quan);
            console.log(cost);
            itemQuantity[i].innerHTML--;
            itemPrice[i].innerText = (cost * quan).toFixed(2);
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
// function pseudoDelete () {
//     const deleteX = document.querySelectorAll(".cart-item")
//     for(let i = 0; i < deleteX.length; i++) {
//         deleteX[i].addEventListener("click", function () {
//             deleteX[i].classList.toggle("remove-item")
//         })
//     }
// }





//Add all the product items as a total sum of items to be displayed where needed, i.e., the cart badge, the total sum,


// //If cart is empty do NOT allow checkout button --> checkout page and inform the user
// function validateCheckout() {
//     let isValid = true;
//     let completeCheckout = document.querySelector("#checkout-btn");
//     if(completeCheckout.length < 1) {
//         completeCheckout.classList.add("order is-invalid");
//         completeCheckout.classList.remove("is-valid");
//         isValid = false;
//     } else {
//        completeCheckout.classList.add("is-valid");
//         completeCheckout.classList.remove("order is-invalid");
//     }
//
//     return isValid;
// }
// if (!validateCheckout()) {
//     return;
// }




let generateCartItems = () => {
    let label = document.querySelector(".label");
    let shoppingCart = document.querySelector(".shopping-cart");
    //I want to target these products and create an array for the cart that is displayed in the cart view
    let cartOrder = BACKEND_HOST_URL + "/api/orders";
    if (basket.length !== 0) {
        return shoppingCart.innerHTML = basket.map((x) => {
            let {id, item} = x;
            //I need to access the products database here
            let search = cartOrder.find((y) => y.id === id) || []; //if you find it, cool, if not return an empty array; Also, y.id is the id from the database
            let {img, name, price} = search; //lets destructure so I don't have type: search.img, or search.price, or search.name.
            return `
             <div class="cart-item">
                 <img width="100" src=${img} alt=""
             <div class="details">
             <div class="title-price-x">
                 <h4 class="title-price">
                     <!--product name-->
                     <p>${name}</p>
                     <p class="cart-item-price">${price}</p>
                 </h4>
                 <!--Id like to remove the entire product card when I click this "X"  -->
                 <i data-passthru onclick="removeItem()" class="fa-solid fa-x"></i>
             </div>
             <div class="buttons">
                 <i onclick="decrement(${id})" class="fa-solid fa-minus"></i>
                 <div id=${id} class="quantity">${item}</div>
                 <i onclick="increment(${id})" class="fa-solid fa-plus"></i>
             </div>
             <h3>${item * price}</h3>
             </div>
             `;
        })
            .join("")
    } else {
        shoppingCart.innerHTML = ``;
        label.innerHTML = `
             <h2>Cart is Empty</h2>
             <a style="margin-top: 50px" data-link href="/products">
                 <button data-link class="products">Back to shopping</button>
             </a>
             `;
    }
}

// shoppingCart.innerHTML = ``;
// label.innerHTML = `
//          <h2>Cart is Empty</h2>
//          <a style="margin-top: 50px" data-link href="/products">
//              <button data-link class="products">Back to shopping</button>
//          </a>
//          `;


//Id like to tell the user they can't checkout when cart is empty

// function setupValidationHandlers() {
//     let checkout = document.querySelector("")
//     checkout.addEventListener("click", validateOrder);
//
// }
// //If cart is empty do NOT allow checkout button --> checkout page and inform the user
// function validateCheckout() {
//     let isValid = true;
//     let completeCheckout = document.querySelector("#checkout-btn");
//     if(completeCheckout.length < 1) {
//         completeCheckout.classList.add("order is-invalid");
//         completeCheckout.classList.remove("is-valid");
//         isValid = false;
//     } else {
//        completeCheckout.classList.add("is-valid");
//         completeCheckout.classList.remove("order is-invalid");
//     }
//
//     return isValid;
// }
// if (!validateCheckout()) {
//     return;
// }




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

//TODO: this function works with front end storage.
// let increment = (id) => {
//     let search = basket.find((x) => x.props.orders.id === props.orders.id);
//     //if the product is already in the basket, dont push the entire object, rather increment only the item#
//     if(search === undefined){basket.push({
//         id: props.orders.id,
//         item: 1,
//     })
//     } else {
//         search.item += 1;
//     }
//     //saving the increment to local storage immediately; same is done to decrement.
//     update(props.orders.id);
//     //rerender the cart after the updates
//     generateCartItems();
//     localStorage.setItem("data", JSON.stringify(basket));
// }
//I want decrement to remove quantity of items and then complete;ly remove the card when it reaches 0
// let decrement = (id) => {
//     let search = basket.find((x) => x.id === selectedItem.id);
//     //if the product is not in the basket, don't decrement anymore.
//     if (search === undefined) return
//     else if (search.item === 0) return;
//     else {
//         search.item -= 1;
//     }
//     update(selectedItem.id);
//     //while there are no items do not display
//     basket = basket.filter((x) => x.item !== 0);
//
//     generateCartItems();
//     localStorage.setItem("data", JSON.stringify(basket));
// }

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

}