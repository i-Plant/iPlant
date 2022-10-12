import {getUser} from "../auth.js";
import createView from "../createView.js";

export default function Home(props) {
    const loggedInUser = getUser();

    return `
        <header>
            <h1>Welcome</h1>
        </header>
        <main>
            <div>
                <p>
                    This is the home page text.
                </p>    
            </div>
        </main>
    `;
}
//I want to display the username with a welcome message for 3 seconds after logging in
export function welcomeHome() {
    window.setTimeout(function () {
    }, 3)
}