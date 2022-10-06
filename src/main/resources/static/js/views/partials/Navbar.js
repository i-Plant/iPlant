export default function Navbar(props) {
    return `
<!--Navbar-->
<!--<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>-->
<!--<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">-->


<!--<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>-->

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
        <li><a href="/">Home</a></li>
        <li><a href="/products">Products</a></li>
        <li><a href="/login">Login</a></li>
        <li><a href="/messageboard">Reviews</a></li>
        <li><a href="/plantId">Plant Id</a></li>
        <li><a href="/checkout">Checkout</a></li>
        <li><a href="/profile">Profile</a></li>
        <li><a href="/logout">Logout</a></li>
        <li><a href="/about">About Us</a></li>
        </ul>
    </div>
</nav>
        
        
    `;
}