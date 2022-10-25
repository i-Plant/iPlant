// let products = [];
export default function Checkout(props) {
    // products = props.products
    return `
        
<main class="bg-light-blue">
<div class="jumbotron jumbotron-3 d-flex justify-content-center">
    <div class="inner-content text-center text-white bg-steelblue p-5">
        <h2 class="text uppercase">Thank you for shopping with us, are you sure you wish to checkout?</h2>
        <p style="color: white; font-size: 20px"  >Shipping: $10.00</p>
        <p style="color: white; font-size: 20px" class="checkout-total" >Total: $100.50</p>
        <form>
            <a data-link href="/products" class="checkout-redirect">Continue Shopping</a>
            <a data-link href="/cart" class="checkout-redirect">Go Back To Cart</a>
           
        </form>
    </div>
</div>
<hr style="height:2px;border-width:0;color:gray;background-color:gray">

<div class="container-checkout">
<img src="../../assets/iplant-logo.png" alt="logo" sizes="" srcset="" class="checkout-logo">
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

<form id="payment-form">
                <div id="payment-element">
                    <!-- Elements will create form elements here -->
                </div>
                <button id="submit" class="confirm-payment">Confirm Payment</button>
                <div id="error-message">
                    <!-- Display error message to your customers here -->
                </div>
            </form> 

    </main>
    
    `
}
export async function CheckoutEvent() {
    let stripe = Stripe(STRIPE_KEY, {
        apiVersion: '2020-08-27',
    });
    // const publishableKey = "YOUR STRIPE KEY";

    // On page load, we create a PaymentIntent on the server so that we have its clientSecret to
    // initialize the instance of Elements below. The PaymentIntent settings configure which payment
    // method types to display in the PaymentElement.
    const {
        error: backendError,
        clientSecret
    } = await fetch('/api/stripe/create-payment-intent').then(r => r.json());
    if (backendError) {
        console.log(backendError.message);
    }
    console.log(`Client secret returned.`);

    // Initialize Stripe Elements with the PaymentIntent's clientSecret,
    // then mount the payment element.
    // const clientSecret = "TEST";
    const elements = stripe.elements({clientSecret});
    const paymentElement = elements.create('payment');
    paymentElement.mount('#payment-element');

    // When the form is submitted...
    const form = document.getElementById('payment-form');
    let submitted = false;
    form.addEventListener('submit', async (e) => {
        console.log("submitting payment!");

        e.preventDefault();

        // Disable double submission of the form
        if (submitted) {
            return;
        }
        submitted = true;
        form.querySelector('button').disabled = true;

        const nameInput = document.querySelector('#name');

        // Confirm the card payment given the clientSecret
        // from the payment intent that was just created on
        // the server.
        const {error: stripeError} = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/paymentOk`,
            }
        });

        if (stripeError) {
            console.log(stripeError.message);

            // reenable the form.
            submitted = false;
            form.querySelector('button').disabled = false;
            return;
        }
    });
}
//TODO: I want Gabby Jay to say, "Yay"
// let a = document.querySelector("#gabby");
// a.classList.add("jay");
// setTimeout(function() {
//     a.classList.remove("jay")
// }, 1E4)
// onclick();
//
// function onclick(event) {
//     document.getElementById('yay').play();
// }
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