// let products = [];
export default function Checkout(props) {
    // products = props.products
    return `
        
<main class="bg-light-blue">
<div class="container-checkout">
<div class="py-5 text-center">
<img class="mb-4 d block mx-auto" src="../../assets/1.jpg" alt="Logo" width="72" height="72">
<h2>Checkout</h2>
</div>
<div class="row">
  <div class="col-3">
    <label for="inputEmail4" class="form-label">First name</label>
    <input type="text" class="form-control" placeholder="First name" aria-label="First name">
  </div>
  <div class="col-3">
   <label for="inputEmail4" class="form-label">Last name</label>
    <input type="text" class="form-control" placeholder="Last name" aria-label="Last name">
  </div>
  <div class="col-6">
    <label for="inputEmail4" class="form-label">Email</label>
    <input type="email" class="form-control" id="inputEmail4" placeholder="Email" aria-label="Email">
  </div>
  <div class="col-6">
    <label for="inputAddress" class="form-label">Address</label>
    <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St">
  </div>

  <div class="col-sm-7">
    <label for="inputCity" class="form-label">City</label>
    <input type="text" class="form-control" placeholder="City" aria-label="City">
  </div>
  <div class="col-sm">
  <label for="inputState" class="form-label">State</label>
    <input type="text" class="form-control" placeholder="State" aria-label="State">
  </div>
  <div class="col-sm">
  <label for="inputZip" class="form-label">Zip</label>
    <input type="text" class="form-control" placeholder="Zip" aria-label="Zip">
  </div>

</div>
    </main>
    `
}
export function CheckoutEvent(){


    console.log("test");
}

// <div className="col">
//     <label htmlFor="inputCity" className="form-label">City</label>
//     <input type="text" className="form-control" id="inputCity">
// </div>
// <div className="col-3">
//     <label htmlFor="inputState" className="form-label">State</label>
//     <select id="inputState" className="form-select">
//         <option selected>Choose...</option>
//         <option>...</option>
//     </select>
// </div>
// <div className="col-3">
//     <label htmlFor="inputZip" className="form-label">Zip</label>
//     <input type="text" className="form-control" id="inputZip">
// </div>