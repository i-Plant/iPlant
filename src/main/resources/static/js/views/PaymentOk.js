import {getUser} from "../auth.js";

let users = [];
export default function PaymentOk(props) {
    users = props.users
    const user = getUser();

    return `
        <header>
            <h1>Payment Successful</h1>
        </header>
        <main> 
         <div class="popup">
<!--            <button id="close">&times;</button>-->
            <h2>Payment Successful</h2>
            <img src="../../assets/paymentOk.png" alt="payment-ok">
             <p> Thanks You For Shopping With Us ${user.userName}, Come Back Soon!</p>            
            <a data-link href="/products" class="payment-ok">Shop More</a>
         </div>
            
        </main>
    `;

}

export function PaymentOkEvent() {
    window.addEventListener("load", function(){
        setTimeout(
            function open(event){
                document.querySelector(".popup").style.display = "block";
            },
            1000
        )
    });


    document.querySelector("#close").addEventListener("click", function(){
        document.querySelector(".popup").style.display = "none";
    });
}