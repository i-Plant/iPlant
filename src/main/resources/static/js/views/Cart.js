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
 <div class="cart-btn">+</div>
 <div class="count">2</div>
 <div class="cart-btn">-</div>
 </div>
`
}

let addItemId = 0
export function addToCartEvent() {
    function clickCounter() {
        const addBtn = document.getElementById("add");
        const subtractBtn = document.getElementById("subtract");
        const count = document.getElementById("count")
        //need to limit product value to 9

        addBtn.addEventListener("click", function () {
            // let count = 0;
            if (count.innerHTML < 10) {//Do NOT parseInt the if conditional, i.e., if(parseInt(count.innerHTML < 10)), only the action you take below.
                parseInt(count.innerText++);
            }
        })

        //need to limit product value to 0
        subtractBtn.addEventListener("click", function () {
            if (count.innerHTML > 0) {
                parseInt(count.innerText--);
            }
        })


    }

}

function clickCart() {
    addItemId += 1;
    const cartBtn = document.getElementById("cart");
    cartBtn.addEventListener("click", function(){
        createView("/cart")
    })
}
