import createView from './createView.js';


export default function init() {
    loadViewOnPageRequest();
    addListenerToNavLinks();
}
/**
 * When the DOM loads, build the view given the current endpoint.
 */
function loadViewOnPageRequest() {
    window.addEventListener('DOMContentLoaded', function() {
        //TODO: Switched to location.pathname so the route would be accurate to current view
        createView(location.pathname);
    });
}

/**
 * Add a listener that will change the view if a nav link is clicked.
 */
function addListenerToNavLinks() {
    document.addEventListener('click', e => {
        if(e.target.type && e.target.type === "checkbox") {
            return;
        }

        // STRIPE
        if(e.target.type && e.target.type === "submit") {
            return;
        }

        // console.log(e)
        if(e.target.type && e.target.type === "file") {
            return;
        }

        if(e.target.matches('label')) {
            return;
        }
        e.preventDefault();
        if (e.target.dataset['link'] !== undefined) {
            const URI = e.target.href.substring(location.origin.length);
            createView(URI);
        }
    });
}

