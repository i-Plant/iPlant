let products = [];
export default function Products(props) {
    products = props.products
   let html = `
    <div>
        <h1>Our Plants</h1>
    </div>
    <main>
    
   `
    for (let i = 0; i <products.length; i++){
        html += `
                    <div class="card" class="d-flex flex-wrap align-content-center" style="width:18rem; z-index: 20;">
                      <img class="card-img-top" src="${products[i].imageURL}" alt="plant-image" style="object-fit: fill;width: 100%; height: 250px"class="images">
                      <div class="card-body">
                        <h2>${products[i].name}</h2>
                        <p class="card-text">${products[i].details}</p>
                        <h4>${products[i].category}</h4>
                        <h5>$ ${products[i].price}</h5> 
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                      </div>
                    </div>
               
`
    }

    return html+= `</main>`;
}
//<main class="d-flex flex-wrap align-content-center" id="main">
export function ProductsEvent(){

}


// <main>
//     <div className="flip-card">
//         <div className="flip-card-inner">
//             <div className="flip-card-front">
//                 <img src="../../assets/${products[i].id}.jpg" alt="avatar" style="width:300px;height:300px class="
//                      images">
//             </div>
//                 <div class=" flip-card-back">
//                     <p class=" productInfo">
//                         <h1>${products[i].name}</h1>
//                         <h3>${products[i].category}</h3>
//                         <h4>${products[i].price}</h4>
//                         <h4>${products[i].petFriendly}</h4>
//                     </p>
//                 </div>
//         </div>
//    </div>
// {/*</main>*/}
