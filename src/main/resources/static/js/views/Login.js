export default function Login(props) {
    return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8"/>
    <title>Log In</title>
</head>
<body>
<h1>Log In/Register</h1>


<div class="container">
    <div class="row">
        <div class="col-12-sm">
            <form id="login-form">
            
                <label for="username">Username</label>
                <input id="username" name="username" type="text"/>
                
                <label for="email">Email</label>
                <input id="email" name="email" type="text"/>
                
                <label for="password">Password</label>
                <input id="password" name="password" type="password"/>
                <input id="login-btn" type="submit" value="Log In"/>
                
            </form>
            <a href="/" data-link>Forgot Password</a>
        </div>
    </div>
</div>
</body>
<footer>
<a href="/about" data-link>I.Plant About Us</a>
</footer>
</html>`;

}


