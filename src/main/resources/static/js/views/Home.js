import {getUser} from "../auth.js";
import createView from "../createView.js";

export default function Home(props) {
    const loggedInUser = getUser();
    //key for username is loggedInUser.userName
    //for profile pic is loggedInUser.profilePic
    return `
        <body class="homeBody">
        <h1 class="homeLogo">Logo here</h1>
            <div>
                <p>
                    i·Plant corp
                </p>    
            </div>
        </body>
    `;
}
//I want to display the username with a welcome message for 3 seconds after logging in
export function welcomeHome() {
    window.setTimeout(function () {
    }, 3)
}