/**
 * Given an object containing all the required data for a given page, fetch all the needed data and return it as properties to pass to a view.
 * @param state
 * @param request
 * @returns {Promise<{}>}
 */
export default function fetchData(state, request) {
    const promises = [];
    //TODO: this needs to be moved to a prop file or env variable
    const baseUri = BACKEND_HOST_URL;

    console.log(request);
    for (let pieceOfState of Object.keys(state)) {
        console.log(baseUri + state[pieceOfState].url);
        promises.push(
            fetch(baseUri + state[pieceOfState].url, request)
                .then(function (res) {
                    return res.json();
                }));
    }
    return Promise.all(promises).then(propsData => {
        const props = {};
        Object.keys(state).forEach((key, index) => {
            props[key] = propsData[index];
        });
        return props;
    });
}