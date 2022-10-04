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
           <div class = "flip-card">      
                <div class="flip-card-inner">
                    <div class="flip-card-front">
                        <img src="../../assets/${products[i].id}.jpg" alt="avatar" class="images">
                    </div>
                        <div class="flip-card-back">
                            <p class="productInfo">
                                <h1>${products[i].name}</h1>
                                <h3>${products[i].scientific_name}</h3>
                                <h4>${products[i].description}</h4>
                            </p>
                        </div>
                </div>
           </div> 
        `
    }
    return html;
}
export function ProductsEvent(){
    // fetch("https://www.growstuff.org/api/v1/crops").then((re) => re.json()).then((data) => console.log(data))


}




