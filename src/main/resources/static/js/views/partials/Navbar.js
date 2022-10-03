export default function Navbar(props) {
    return `
        <nav>
            <a href="/" data-link>Home</a>
            <a href="/products" data-link>Products</a>
            <a href="/login" data-link>Login</a>
            <a href="/register" data-link>Register</a>
            <a href="/messageboard" data-link>Message Board</a>
            <a href="/plantId" data-link>PlantId</a>
            <a href="/checkout" data-link>checkout</a>
            <a href="/profile" data-link>Profile</a>
            <a href="/logout" data-link>Logout</a>
            <a href="/about" data-link>About Us</a>
        </nav>
    `;
}