import {getUser, isLoggedIn} from "../../auth.js";

export default function Navbar(props) {
    if (isLoggedIn()) {
        const user = getUser();
        console.log(user.userName);
        return `
<nav class="nav-bar">
    <div class="container">
        <input type="checkbox" id="drop-down-cbox"/>
        <label for="drop-down-cbox">
            <span></span>
            <span></span>
            <span></span>
        </label>    
    
    <h1 class="site-logo">i·Plant</h1>
    
    <ul class="main-nav small-caps">
        <li><a data-link href="/">Home</a></li>
        <li><a data-link href="/products">Products</a></li>
        <li><a data-link href="/messageboard">Reviews</a></li>
        <li><a data-link href="/plantId">Plant Id</a></li>
<!--        <li><a data-link href="/checkout">Checkout</a></li>-->
        <li><a data-link href="/profile">Profile</a></li>
        <li><a data-link href="/logout">Logout</a></li>
        <li><a data-link href="/about">About Us</a></li>
        </ul>
    </div>
     <!--For the shopping cart-->
     <div>
        <a class="cart-icon" data-link href="/cart"><i data-passthru style="font-size: 27px" id="cart" class="fa-solid fa-cart-shopping"></i></a>
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
    
    <h1 class="site-logo">i·Plant</h1>
    
    <ul class="main-nav small-caps">
        <li><a data-link href="/">Home</a></li>
        <li><a data-link href="/products">Products</a></li>
        <li><a data-link href="/login">Login</a></li>
        <li><a data-link href="/messageboard">Reviews</a></li>
        <li><a data-link href="/plantId">Plant Id</a></li>
<!--        <li><a data-link href="/checkout">Checkout</a></li>-->
        <li><a data-link href="/profile">Profile</a></li>
<!--        <li><a data-link href="/logout">Logout</a></li>-->
        <li><a data-link href="/about">About Us</a></li>
        </ul>
    </div>  
    <!--For the shopping cart-->
     <div>
        <a class="cart-icon" data-link href="/cart"><i data-passthru style="font-size: 27px" id="cart" class="fa-solid fa-cart-shopping"></i></a>
        </div>
</nav>
 `;
    }
}
