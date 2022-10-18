import createView from "../createView.js";

let products = [];
export default function Products(props) {
    products = props.products
   let html = `
<!--For the shopping cart icon-->
     <div class="cart">
        <a data-link href="/cart"><i data-passthru id="cart" class="fa-solid fa-cart-shopping"></i></a>
        <div class="cart-amount">0</div>
     </div>

<div id='label' class='text-center'></div>
<div class="shopping-cart" id="shopping-cart"></div>
    <div>
        <h1>Our Plants</h1>
    </div>
    <main>
    
   `
    for (let i = 0; i < products.length; i++){
        html += `
              <div class="flip-card">
    <div class="flip-card-inner">
        <div class="flip-card-front">
             <img class="card-img-top" src="${products[i].imageURL}" alt="plant-image">
            <div class="plantName">
             <h6 class="nameTitle">${products[i].name}</h6>
             <h5 class="nameTitle">$ ${products[i].price}</h5>
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
`
    }

    return html+= `</main>`;
}

export function ProductsEvent(){
    let cartArray = [];
    let addToCart = document.querySelectorAll(".addToCart");
    for (let i = 0; i < addToCart.length; i++) {
        addToCart[i].addEventListener("click", (e) => {
            e.preventDefault();
            let item = addToCart[i].getAttribute("data-id");
            cartArray.push(item);
            console.log(cartArray);
        })
    }

}



// <div class="card">
//                       <img class="card-img-top" src="${products[i].imageURL}" alt="plant-image">
// <!--                     style="object-fit: fill;width: 100%; height: 250px-->
//                       <div class="card-body">
//
//                         <h2>${products[i].name}</h2>
//                         <p class="products-card-text">${products[i].details}</p>
//                         <h4>${products[i].category}</h4>
//                         <h5>$ ${products[i].price}</h5>
//
//                       </div>
//                        <button data-id="${products[i].id}" class="btn btn-primary addToCart">Add to Cart</button>
//                     </div>