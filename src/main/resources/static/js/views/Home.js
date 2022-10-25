import {getUser, isLoggedIn} from "../auth.js";
import createView from "../createView.js";

export default function Home(props) {
    //key for username is loggedInUser.userName
    //for profile pic is loggedInUser.profilePic
    let homeHTML =``;

    homeHTML += `
   <div class="welcome" id="welcome"></div>
   
   <div class="container-fluid">
       <div class="row">
           <div class="col-md-5">
                <image class="codey" src="../assets/HomeCodey.jpg"></image>
           </div>   
           <div class="col-md-3">
                <div>
                    <div class="center-top"></div>
                    <image class="home-red" src="../assets/Homered.jpg"></image>
                </div>
           </div>  
           <div class="col-md-4">
                <image class="right-top" src="../assets/HomeAloe.jpg"></image>
                <image class="right-mid" src="../assets/homecoding.jpg"></image>
                <div class="right-bottom"></div>
           </div> 
           
       </div>
   </div>
   `;
 return homeHTML
}

    // return `
    //     <body class="homeBody">
    //     <h1 class="homeLogo">Logo here</h1>
    //
    //     </body>
    // `;

//I want to display the username with a welcome message for 3 seconds after logging in
export function welcomeHome() {
    const greeting = document.getElementById("welcome");
    if (isLoggedIn()) {
         greeting.innerText = "Welcome, \n" + `${getUser().userName}`

        window.setTimeout(function () {
            document.getElementById("welcome").innerHTML = "";
        },3500)
    }
}