import Home, {welcomeHome} from "./views/Home.js";
import About from "./views/About.js";
import Error404 from "./views/Error404.js";
import Loading from "./views/Loading.js";

import Login, {LoginEvent} from "./views/Login.js";
//import LoginEvent from "./auth.js";
import Register from "./views/Register.js";
import {RegisterEvent} from "./views/Register.js";


import Review, {MessageBoardEvent}  from "./views/Review.js";
import Products, {ProductsEvent} from "./views/Products.js";
import Profile, {ProfileEvent} from "./views/Profile.js";
import Checkout, {CheckoutEvent} from "./views/Checkout.js";
import PlantId, {PlantIdEvent} from "./views/PlantId.js";
import Logout, {LogoutEvent} from "./views/Logout.js";
import PaymentOk, {PaymentOkEvent} from "./views/PaymentOk.js";
import addToCart, {addToCartEvent} from "./views/Cart.js";

/**
 * Returns the route object for a specific route based on the given URI
 * @param URI
 * @returns {*}
 */
export default function router(URI) {
    let orderId;
    //if there's already an order id in local storage use that order
    if(window.localStorage.getItem("order-id") ) {
        orderId = window.localStorage.getItem("order-id")
        console.log("orderId",orderId);
    }

    const routes = {
        '/': {
            returnView: Home,
            state: {},
            uri: '/',
            title: 'Home',
            viewEvent: welcomeHome
        },
        '/login': {
            returnView: Login,
            state: {},
            uri: '/login',
            title: "Login",
            viewEvent: LoginEvent
        },
        '/logout': {
            returnView: Logout,
            state: {},
            uri: '/logout',
            title: "Logout",
            viewEvent: LogoutEvent
        },
        '/register': {
            returnView: Register,
            state: {},
            uri: '/register',
            title: 'Register',
            viewEvent: RegisterEvent
        },
        '/reviews': {
            returnView: Review,
            state: {
                reviews: {
                    url: "/api/reviews"
                }
            },
            uri: '/reviews',
            title: 'All Reviews',
            viewEvent: MessageBoardEvent
        },
        '/cart': {
            returnView: addToCart,
            state: {
                order:{
                    url: '/api/orders/' + orderId
                }
            },
            uri: '/cart',
            title: 'Cart',
            viewEvent: addToCartEvent
        },
        '/checkout': {
            returnView: Checkout,
            state: {
                products: {
                    url: '/api/checkout'
                }
            },
            uri: '/checkout',
            title: 'Checkout',
            viewEvent: CheckoutEvent
        },
        '/products': {
            returnView: Products,
            state: {
                products: {
                    url: '/api/products'
                },
                orders:{
                    url:'/api/orders/' + orderId
                }
            },
            uri: '/products',
            title: 'Products',
            viewEvent: ProductsEvent
        },
        '/profile': {
            returnView: Profile,
            state: {
                // user
            },
            uri: '/profile',
            title: 'Profile',
            viewEvent: ProfileEvent
        },

        '/plantId': {
            returnView: PlantId,
            state: {},
            uri: '/plantId',
            title: 'PlantId',
            viewEvent: PlantIdEvent
        },
        '/about': {
            returnView: About,
            state: {},
            uri: '/about',
            title: 'About',
        },
        '/error': {
            returnView: Error404,
            state: {},
            uri: location.pathname,
            title: ' ERROR',
        },
        '/loading': {
            returnView: Loading,
            state: {},
            uri: location.pathname,
            title: 'Loading...',
        },
        '/paymentOk': {
            returnView: PaymentOk,
            state: {},
            uri: '/paymentOk',
            title: 'PaymentOkay',
            viewEvent: PaymentOkEvent
        }

    };

    return routes[URI];
}
