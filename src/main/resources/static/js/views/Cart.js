//I need to display the carts in Jalopy
//I need to push to a new array (basket) and display those cards in the cart(basket) when I add them
let basket = [];
export default function addToCart() {

let cartIcon =  `
<!--For the shopping cart icon-->
    <div class="cart">
       <a data-link href="/cart"><i data-passthru id="cart" class="fa-solid fa-cart-shopping"></i></a>
       <div class="cart-amount">0</div>
    </div>

    <div id='label' class='text-center'></div>
    <div class="shopping-cart" id="shopping-cart"></div>
    
`;

}

basket = JSON.parse(localStorage.getItem("data")) || [];
console.log(basket);

export function addToCartEvent() {
    calculation();
    totalAmount();
    clearCart();
}
let label = document.getElementById("label");
let shoppingCart = document.getElementById("shopping-cart");
//I want to target these products and create an array for the cart that is displayed in the cart view
let productsAPI = "api/products";


//add all the product items as a total sum of items to be displayed where needed, i.e., the cart badge, the total sum,
function calculation() {
    let cartIcon = document.getElementById("cart-amount");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x+y, 0);
}

let generateCartItems = () => {
    if (basket.length !== 0) {
        return shoppingCart.innerHTML = basket.map((x) => {
            let {id, item} = x;
            //I need to access the products database here
            let search = productsAPI.find((y) => y.id === id) || []; //if you find it, cool, if not return an empty array; Also, y.id is the id from the database
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
                <i onclick="removeItem(${id})" class="fa-solid fa-x"></i>
            </div>
            
            <div class="buttons">
                <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                <div id=${id} class="quantity">${item}</div>            
                <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
            </div>
            
            <h3>${item * search.price}</h3>
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

let increment = (id) => {
    let search = basket.find((x) => x.id === selectedItem.id);
    //if the product is already in the basket, dont push the entire object, rather increment only the item#
    if(search === undefined){basket.push({
        id: id.id,
        item: 1,
    })
    } else {
        search.item += 1;
    }
    //saving the increment to local storage immediately; same is done to decrement.
    update(selectedItem.id);
    //rerender the cart after the updates
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(basket));
}
let decrement = (id) => {
    let search = basket.find((x) => x.id === selectedItem.id);
    //if the product is not in the basket, don't decrement anymore.
    if (search === undefined) return
    else if (search.item === 0) return;
    else {
        search.item -= 1;
    }
    update(selectedItem.id);
    //while there are no items do not display
    basket = basket.filter((x) => x.item !== 0);

    generateCartItems();
    localStorage.setItem("data", JSON.stringify(basket));
}
let update = (id) => {
    let search = basket.find((x) => x.id === id);
    document.getElementById("id").innerHTML = search.item;

    calculation();
    totalAmount();
}
let removeItem = (id) => {
    console.log(id.id);
    basket = basket.filter((x) =>x.id !== id.id);

    generateCartItems();
    totalAmount();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));
}

let clearCart = () => {
    //clearing the basket by making it equal to an empty array
    basket = []
    generateCartItems();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));
}

let totalAmount = () => {
    if(basket.length !== 0){
        let amount = basket.map((x) =>{
            let {item, id} = x;
            let search = productsAPI.find((y) => y.id === id) || [];
            return item * search.price;
        }).reduce((x,y) =>x+y, 0);
        label.innerHTML = `
        <h2>Total Bill: $ ${amount}</h2>
        <button class="checkout">Checkout</button>
        <button onclick="clearCart()" class="removeAll">Clear Cart</button>
        `;
    }

}


