let products = [];
export default function Products(props) {
    products = props.products
   let html = `
    <div>
        <h1>Our Plants</h1>
    </div>
   `
    for (let i = 0; i <products.length; i++){
        html += `
        <main>
           <div class = "flip-card">      
                <div class="flip-card-inner">
                    <div class="flip-card-front">
                        <img src="../../assets/${products[i].id}.jpg" alt="avatar" style="width:300px;height:300px class="images">
                    </div>
                        <div class="flip-card-back">
                            <p class="productInfo">
                                <h1>${products[i].name}</h1>
                                <h3>${products[i].category}</h3>
                                <h4>${products[i].price}</h4>
                                <h4>${products[i].petFriendly}</h4> 
                            </p>
                        </div>
                </div>
           </div> 
        </main>
        `
    }
    return html;
}
export function ProductsEvent(){

}







