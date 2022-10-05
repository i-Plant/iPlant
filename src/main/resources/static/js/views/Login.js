export default function Login(props) {
    return `
    <div id="buttonDiv" data-link></div>
`;

}

export function LoginEvent() {
    google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse
    });
    google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        { theme: "outline", size: "large" }  // customization attributes
    );
    google.accounts.id.prompt();
}

function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    //write to local storage:

}

