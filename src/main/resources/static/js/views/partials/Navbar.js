import {getUser, isLoggedIn} from "../../auth.js";
export default function Navbar(props) {
    if (isLoggedIn()) {
        return `
<nav class="nav-bar" xmlns="http://www.w3.org/1999/html" xmlns="http://www.w3.org/1999/html">
    <div class="container">
        <input type="checkbox" id="drop-down-cbox"/>
        <label for="drop-down-cbox">
            <span></span>
            <span></span>
            <span></span>
        </label> 
        
<!--        <label>-->
<!--           light/dark mode-->
<!--<body>-->

<!--light/dark mode-->
    <div class="check">
        <input type="checkbox">
    </div>

    <h1 class="site-logo"><a data-link href="/">i·Plant</a></h1>
    
    <ul class="main-nav small-caps"> 
        <li><a data-link href="/products">Products</a></li>
        <li><a data-link href="/reviews">Reviews</a></li>
        <li><a data-link href="/plantId">Plant Id</a></li>
        <li><a data-link href="/about">About Us</a></li>
<!--        <li><a data-link href="/logout">Logout</a></li>-->
    </ul>
    <a data-link href="/logout" class="logOut">Logout</a>
    </div>
   
</nav>`;
  } else {
       return ` <nav class="nav-bar">
    <div class="container">
    <input type="checkbox" id="drop-down-cbox"/>
    <label for="drop-down-cbox">
        <span></span>
        <span></span>
        <span></span>
    </label>    

 <h1 class="site-logo"><a data-link href="/">i·Plant</a></h1>
    
    <ul class="main-nav small-caps">
        <li><a data-link href="/products">Products</a></li>
        <li><a data-link href="/reviews">Reviews</a></li>
<!--    <li><a data-link href="/plantId">Plant Id</a></li>-->
        <li><a data-link href="/about">About Us</a></li>
<!--          <li><a data-link href="/login">Login</a></li>-->
    </ul>
    <a data-link href="/login" class="logIn">Login</a>
    </div> 
</nav>
 `;
    }
}

// localStorage.setItem("cart",cartArray);
