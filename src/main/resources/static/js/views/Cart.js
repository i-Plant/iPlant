import createView from "../createView.js";

export default function addToCart() {
    return `
<body class="body" >
 <div class="Cart-Container"></div>
</body>
<!--Card header-->
<div class="Header">
 <h3 class="Heading">Shopping Cart</h3>
 <h5 class="Action">Remove all</h5>
 </div>
 <!--cart items-->
 <div class="Cart-Items">
 <div class="image-box">
 <img src="/assets/1.jpg" style="height:120px" alt="plant in a pot"/>
 </div>
 <div class="about">
 <h1 class="title">Flower Pot</h1>
 <h3 class="subtitle">Gallon size</h3>
 <img src="/assets/1.jpg" style="height:30px" alt="plant in a pot"/>
 </div>
 <div class="counter"></div>
 <div class="prices"></div>
 </div> 
 
<!--Product counter-->
 <div class="counter">
 <div class="btn">+</div>
 <div class="count">2</div>
 <div class="btn">-</div>
 </div>
`
}

let addItemId = 0
export function addToCartEvent() {
    //clickCart();

}

function clickCart() {
    addItemId += 1;
    const cartBtn = document.getElementById("cart");
    cartBtn.addEventListener("click", function(){
        createView("/cart")
    })
}