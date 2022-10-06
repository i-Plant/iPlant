export default function Navbar(props) {
    return `
<!--Navbar-->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">


<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>

<!--<nav>-->
<!--            <a href="/" data-link>Home</a>-->
<!--            <a href="/products" data-link>Products</a>-->
<!--            <a href="/login" data-link>Login</a>-->
<!--            <a href="/register" data-link>Register</a>-->
<!--            <a href="/messageboard" data-link>Message Board</a>-->
<!--            <a href="/plantId" data-link>PlantId</a>-->
<!--            <a href="/checkout" data-link>checkout</a>-->
<!--            <a href="/profile" data-link>Profile</a>-->
<!--            <a href="/logout" data-link>Logout</a>-->
<!--            <a href="/about" data-link>About Us</a>-->
<!--        </nav>-->
        
<nav class="navbar navbar-expand-lg navbar-light">
  <div class="container-fluid">
    <a class="navbar-brand" >i·Plant</a>

    <button class="navbar-toggler" style="margin-right:5px !important;" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
                <span class="navbar-toggler-icon"></span>
              </button>
    <div class="collapse navbar-collapse top_nav" id="navbarSupportedContent">
      <ul class="navbar-nav mx-auto ">
        <li class="nav-item">
          <a href="/" class="data-link">Home</a>
          <hr class="hr_nav">
        </li>
        
<!--        <li class="nav-item "><a href="/products" class="nav-link">Products</a>-->
<!--        </li>-->

        <li class="nav-item "><a href="/login" class="nav-link">Login</a>
        </li>
        <li class="nav-item "><a href="/register" class="nav-link">Register</a>
        </li>
        <li class="nav-item "><a href="/messageboard" class="nav-link">Message Board</a>
        </li>
        <li class="nav-item "><a href="/plantId" class="nav-link">PlantId</a>
        </li>
        <li class="nav-item "><a href="/checkout" class="nav-link">Checkout</a>
        </li>
        <li class="nav-item "><a href="/profile" class="nav-link">Profile</a>
        </li>
        <li class="nav-item "><a href="/logout" class="nav-link">Logout</a>
        </li>
        <li class="nav-item "><a href="/about" class="nav-link">About Us</a>
        </li>
      </ul>
      <ul class="navbar navbar-nav navbar-right" style="display:flex;">
        <li>
          <button class="btn top_login">
                    Login
                </button>
        </li>
        <li>
          <button class="btn sign_btn">
                    SignUp
                </button>
        </li>
      </ul>
    </div>
  </div>
</nav>
    `;
}