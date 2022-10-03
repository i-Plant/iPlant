export default function Login(props) {
    return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8"/>
    <title>Log In</title>
</head>
<body>
<h1>Log In</h1>


<div class="container">
    <div class="row align-items-sm-center">
        <div class="col-12-sm">
            <form id="login-form">
            
<!--                <label for="username">Username</label>-->
                <input id="username" name="username" type="text" placeholder="Enter username"/>
<!--                <label for="password">Password</label>-->
                <input id="password" name="password" type="password" placeholder="Enter password"/>
                
                <input id="login-btn" type="submit" value="Log In"/>
                
            </form>
            <a href="/" data-link>Forgot Password</a>
        </div>
    </div>
</div>
</body>
<footer style="position: absolute; bottom: 10px; left: 10px">
<a href="/about" data-link>I.Plant About Us</a>
</footer>
</html>`;

}


