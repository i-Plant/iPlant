import CreateView from "../createView.js";
import {getHeaders} from "../auth.js";

let reviews;
export default function Review(props) {
    const reviewsHTML = generateReviewsHTML(props.reviews);
    // save this for loading edits later
    reviews = props.reviews;
    const addReviewHTML = generateAddReviewHTML();

    return `
        
        <main>
            <div class="upper">
            ${addReviewHTML}
            </div>
            
            <div class="lower">
               
                <div class="container-m">
                    <div class="row review">
                        <h3 class="text-center">Customer Reviews</h3>
                        ${reviewsHTML}   
                    </div>
                </div>
            </div>
            
        </main>
  
    
`
}


function generateAddReviewHTML() {
    let addHTML = ``;

    addHTML = `<h3>Add a review</h3>
            <form>
                <div>
                    <label for="item">Product:</label>
                    <textarea id="item" name="item" placeholder="Enter product name"></textarea>
                    <label for="content">Content</label> 
                    <textarea id="content" class="form-control" name="content" rows="5" cols="50" placeholder="Enter content"></textarea>
                </div>
                <button data-id="0" id="saveReview" name="saveReview" type="button" class="my-button button btn-primary">Save Review</button>
            </form>`;
    return addHTML;
}


function generateReviewsHTML(reviews) {
    let reviewsHTML = `
    
    
    `;
    for (let i = 0; i < reviews.length; i++) {
        const review = reviews[i];


        let authorName = "";
        if(review.item) {
            authorName = review.item.name;
        }



        reviewsHTML += `
            <div class="col-4 single-review">
                <div class="card single-review">
                    <p class="card-text">${review.content}</p>
                    <label for="name">Product Name:</label>
                    <p>${review.item}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="user-about"> <span class="font-weight-bold d-block">${authorName}</span> 
                        </div>
                        <div class="user-image"> <img src="../assets/iplant-logo.png" class="rounded-circle"  alt="i-plant logo"> </div>
                    </div>
                    <button data-id=${review.id} class="button editReview">Edit</button>
                    <button data-id=${review.id} class="button deleteReview">Delete</button>
                </div>
            </div>`;
    }

    return reviewsHTML;
}





export function MessageBoardEvent(){
    setupSaveHandler();
    setupEditHandlers();
    setupDeleteHandlers();
    setupValidationHandlers();
    validateFields();


}

function setupValidationHandlers() {
    let input = document.querySelector("#item");
    input.addEventListener("keyup", validateFields);
    input = document.querySelector("#content");
    input.addEventListener("keyup", validateFields);
}


function validateFields() {
    let isValid = true;
    let input = document.querySelector("#item");
    if(input.value.trim().length < 1) {
        input.classList.add("is-invalid");
        input.classList.remove("is-valid");
        isValid = false;
    } else {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
    }

    input = document.querySelector("#content");
    if(input.value.trim().length < 1) {
        input.classList.add("is-invalid");
        input.classList.remove("is-valid");
        isValid = false;
    } else {
        input.classList.add("is-valid");
        input.classList.remove("is-invalid");
    }

    return isValid;
}

function setupEditHandlers() {
    // target all delete buttons
    const editButtons = document.querySelectorAll(".editReview");
    // add click handler to all delete buttons
    for (let i = 0; i < editButtons.length; i++) {
        editButtons[i].addEventListener("click", function(event) {

            // get the post id of the delete button
            const reviewId = parseInt(this.getAttribute("data-id"));

            loadReviewIntoForm(reviewId);

        });
    }
}

function loadReviewIntoForm(reviewId) {
    // go find the post in the review data that matches postId
    const review = fetchReviewById(reviewId);
    if(!review) {
        console.log("did not find post for id " + reviewId);
        return;
    }

    // load the post data into the form
    const itemField = document.querySelector("#item");
    const contentField = document.querySelector("#content");
    itemField.value = review.item;
    contentField.value = review.content;

    const saveButton = document.querySelector("#saveReview");
    saveButton.setAttribute("data-id", reviewId);
    console.log(saveButton);
}

function fetchReviewById(reviewId) {
    for (let i = 0; i < reviews.length; i++) {
        if(reviews[i].id === reviewId) {
            return reviews[i];
        }
        console.log(reviews[i]);

    }
    // didn't find it so return something falsy
    return false;
}


function setupDeleteHandlers() {
    // target all delete buttons
    const deleteButtons = document.querySelectorAll(".deleteReview");
    // add click handler to all delete buttons
    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener("click", function(event) {

            // get the post id of the delete button
            const reviewId = this.getAttribute("data-id");

            deleteReview(reviewId);
        });
    }
}


function deleteReview(reviewId) {
    const request = {
        method: "DELETE",
        headers: getHeaders(),
    }
    const url = REVIEW_API_BASE_URL + `/${reviewId}`;
    console.log(url);
    fetch(url, request)
        .then(function(response) {
            if(response.status !== 200) {
                console.log("fetch returned bad status code: " + response.status);
                console.log(response.statusText);
                return;
            }
            CreateView("/reviews");
        })
}


function setupSaveHandler() {
    const saveButton = document.querySelector("#saveReview");
    saveButton.addEventListener("click", function(event) {
        const reviewId = parseInt(this.getAttribute("data-id"));
        console.log(reviewId)
        saveReview(reviewId);

    });
}


function saveReview(reviewId) {
    // get the title and content for the new/updated post
    const itemField = document.querySelector("#item");
    const contentField = document.querySelector("#content");

    // don't allow save if title or content are invalid
    if(!validateFields()) {
        return;
    }

    // make the new/updated post object
    const review = {
        item: itemField.value,
        content: contentField.value
    }
    console.log(review)

    // make the request
    const request = {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(review)
    }
    let url = REVIEW_API_BASE_URL;
    console.log(request);


    // if we are updating a post, change the request and the url
    if(reviewId > 0) {
        request.method = "PUT";
        url += `/${reviewId}`;
    }
    console.log(request);

    fetch(url, request)
        .then(function(response) {
            if(response.status !== 200) {
                console.log("fetch returned bad status code: " + response.status);
                console.log(response.statusText);
                return;
            }
            CreateView("/reviews");

        })
}
