import {setTokens} from '../auth.js'
import createView from "../createView.js";
import {isLoggedIn} from "../auth.js";
import {getUser} from "../auth.js";


export default function Login(props) {
    return `
    <!--Google sign-in-->
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
    //write to local storage:
    const loggedInUser = response.credential;
    setTokens(loggedInUser)
    // const userName = window.localStorage.getItem("user");
    // const profilePic = window.localStorage.getItem("profilePic");
    // console.log(userName); //these
    // console.log(profilePic);//were null

    //redirect the user to home when login is successful
    createView('/');
}

