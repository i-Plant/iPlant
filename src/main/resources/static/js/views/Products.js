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
           <
</div>
           
           </div>
           </div> 
        `
    }
}
export function ProductsEvent(){
    console.log("test");
}