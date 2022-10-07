import {setTokens} from '../auth.js'
import createView from "../createView.js";
import {isLoggedIn} from "../auth.js";
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
    //console.log("Encoded JWT ID token: " + response.credential);
    //write to local storage:
    const loggedInUser = response.credential;
    console.log(loggedInUser);
    setTokens(response.credential)
    //redirect the user to home when log in is successful
    // if(loggedInUser) {
    //     window.location = "http://localhost:8080/"
    // }
   return isLoggedIn;
}

