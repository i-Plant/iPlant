import CreateView from "../createView.js";
import {getHeaders} from "../auth.js";

let reviews;
export default function Review(props) {
    const reviewsHTML = generateReviewsHTML(props.reviews);
    // save this for loading edits later
    reviews = props.reviews;

    return `
        <header>
            <h1>Reviews</h1>
        </header>
        <main>
              
            
            <h3>Create a Review</h3>
            <form>
<!--                <div>-->
<!--                    <label for="title">Title</label><br>-->
<!--                    <input id="title" name="title" class="form-control" type="text" placeholder="Enter title">-->
<!--&lt;!&ndash;                    <div class="invalid-feedback">&ndash;&gt;-->
<!--&lt;!&ndash;                        Title cannot be blank.&ndash;&gt;-->
<!--&lt;!&ndash;                    </div>&ndash;&gt;-->
<!--&lt;!&ndash;                    <div class="valid-feedback">&ndash;&gt;-->
<!--&lt;!&ndash;                        Your title is ok!&ndash;&gt;-->
<!--&lt;!&ndash;                    </div>&ndash;&gt;-->
<!--                </div>-->
                
                <div>
                    <label for="content">Content</label><br>
                    <textarea id="content" class="form-control" name="content" rows="10" cols="50" placeholder="Enter content"></textarea>
<!--                    <div class="invalid-feedback">-->
<!--                        Content cannot be blank.-->
<!--                    </div>-->
<!--                    <div class="valid-feedback">-->
<!--                        Content is ok!-->
<!--                    </div>-->
                </div>
                
               <button data-id="0" id="saveReview" name="saveReview" class="button btn-primary">Save Post</button>
            </form>
            
            <h3>Customer Reviews</h3>
            <div>
                ${reviewsHTML}   
            </div>
            
        </main>
  
    
`
}


function generateReviewsHTML(reviews) {
    let reviewsHTML = `
        <div class="all-reviews">
<!--            <th scope="col">Title</th>-->
            <h1>Content</h1>
            <hr>
           
        
    `;
    for (let i = 0; i < reviews.length; i++) {
        const review = reviews[i];


        let authorName = "";
        if(review.author) {
            authorName = review.author.userName;
        }

        reviewsHTML += `<div class="single-review">
            <h4>${review.content}</h4>
            <h4>${authorName}</h4>
            <button data-id=${review.id} class="button btn-primary editReview">Edit</button>
            <button data-id=${review.id} class="button btn-danger deleteReview">Delete</button>
            </div>`;
    }
    reviewsHTML += `</div>`;
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
    // let input = document.querySelector("#title");
    // input.addEventListener("keyup", validateFields);
    let input = document.querySelector("#content");
    input.addEventListener("keyup", validateFields);
}


function validateFields() {
    let isValid = true;
    // let input = document.querySelector("#title");
    // if(input.value.trim().length < 1) {
    //     input.classList.add("is-invalid");
    //     input.classList.remove("is-valid");
    //     isValid = false;
    // } else {
    //     input.classList.add("is-valid");
    //     input.classList.remove("is-invalid");
    // }

    let input = document.querySelector("#content");
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
    // const titleField = document.querySelector("#title");
    const contentField = document.querySelector("#content");
    // titleField.value = review.title;
    contentField.value = review.content;

    const saveButton = document.querySelector("#savePost");
    saveButton.setAttribute("data-id", reviewId);
}

function fetchReviewById(reviewId) {
    for (let i = 0; i < reviews.length; i++) {
        if(reviews[i].id === reviewId) {
            return reviews[i];
        }

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
        saveReview(reviewId);
    });
}


function saveReview(reviewId) {
    // get the title and content for the new/updated post
    // const titleField = document.querySelector("#title");
    const contentField = document.querySelector("#content");

    // don't allow save if title or content are invalid
    if(!validateFields()) {
        return;
    }

    // make the new/updated post object
    const review = {
        // title: titleField.value,
        content: contentField.value
    }

    // make the request
    const request = {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(review)
    }
    let url = REVIEW_API_BASE_URL;

    // if we are updating a post, change the request and the url
    if(reviewId > 0) {
        request.method = "PUT";
        url += `/${reviewId}`;
    }

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

