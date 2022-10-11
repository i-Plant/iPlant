export default function Navbar(props) {
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
        <li><a data-link href="/login">Login</a></li>
        <li><a data-link href="/messageboard">Reviews</a></li>
        <li><a data-link href="/plantId">Plant Id</a></li>
        <li><a data-link href="/checkout">Checkout</a></li>
        <li><a data-link href="/profile">Profile</a></li>
        <li><a data-link href="/logout">Logout</a></li>
        <li><a data-link href="/about">About Us</a></li>
        </ul>
    </div>
     <!--For the shopping cart-->
     <div>
        <a data-link href=""><i style="font-size: 27px" class="fa-solid fa-cart-shopping cart-icon"></i></a>
        </div>
</nav>
        
        
    `;
}
