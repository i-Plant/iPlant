let users = [];
export default function PaymentOk(props) {
    users = props.user
    return `
        <header>
            <h1>Payment Success</h1>
        </header>
        <main> 
            <div>
                <p> Thanks!!! Come Back ${users.id}</p>            
            </div>
        </main>
    `;
}