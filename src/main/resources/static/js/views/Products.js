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
                    <div class="card" class="d-flex flex-wrap align-content-center" style="width:18rem; z-index: 20">
                      <img class="card-img-top" src="${products[i].imageURL}" alt="plant-image" style="object-fit: fill;width: 100%; height: 250px"class="images">
                      <div class="card-body">
                        <h2>${products[i].name}</h2>
                        <p class="card-text">${products[i].details}</p>
                        <h4>${products[i].category}</h4>
                        <h5>$ ${products[i].price}</h5> 
                        <h1>${products[i].id}</h1>
                        <button data-id="${products[i].id}" class="btn btn-primary addToCart">Add to Cart</button>
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