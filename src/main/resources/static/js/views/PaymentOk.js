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
            <div>
                <p> Thanks!!! Come Back ${user.userName}</p>            
            </div>
        </main>
    `;
}