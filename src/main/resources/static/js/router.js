import Home from "./views/Home.js";
import About from "./views/About.js";
import Error404 from "./views/Error404.js";
import Loading from "./views/Loading.js";
import Login from "./views/Login.js";
import LoginEvent from "./auth.js";
import Register, {RegisterEvent} from "./views/Register.js";
import MessageBoard, {MessageBoardEvent}  from "./views/MessageBoard.js";
import Products, {ProductsEvent} from "./views/Products.js";
import Profile, {ProfileEvent} from "./views/Profile.js";
import Checkout, {CheckoutEvent} from "./views/Checkout.js";
import PlantId, {PlantIdEvent} from "./views/PlantId.js"

/**
 * Returns the route object for a specific route based on the given URI
 * @param URI
 * @returns {*}
 */
export default function router(URI) {
    const routes = {
        '/': {
            returnView: Home,
            state: {},
            uri: '/',
            title: 'Home',
        },
        '/login': {
            returnView: Login,
            state: {},
            uri: '/login',
            title: "Login",
            viewEvent: LoginEvent
        },
        '/register': {
            returnView: Register,
            state: {},
            uri: '/register',
            title: 'Register',
            viewEvent: RegisterEvent
        },
        '/message': {
            returnView: MessageBoard,
            state: {
                // messages: '/api/messages'
            },
            uri: '/messages',
            title: 'All Messages',
            viewEvent: MessageBoardEvent
        },
        '/checkout': {
            returnView: Checkout,
            state: {
                // maybe orders?
            },
            uri: '/checkout',
            title: 'Checkout',
            viewEvent: CheckoutEvent
        },
        '/products': {
            returnView: Products,
            state: {
                // maybe products
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
            state: {
                // plants
            },
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
        }
    };

    return routes[URI];
}

