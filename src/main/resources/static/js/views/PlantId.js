

let images = [];
export default function PlantId(props) {
    images = props.images
    return `
    <header xmlns="http://www.w3.org/1999/html">
        <h1>Plant ID</h1>
    </header>
    <main>
            <div>
                <form class="upload" id="myForm">
                    <div class="mb-3">
                        <label data-link for="flowerFile" class="form-label">Upload plant picture</label>
                        <input data-link  name="flower" class="form-control" type="file" id="flowerFile">
                        <input type="submit" id="uploadStuff" class="btn btn-primary" value="Identify">
                    </div>
                </form>
            </div>
            <div id="results">
           <label for="results"  class="form-label" id="allResults">Results</label>
            <pre id="results" style="white-space: break-spaces;">
            </pre>
        </div>
        </main>

    `
}



export function PlantIdEvent() {
    const API_KEY = '2b10JbtYGuH8jrVGLFbP9vMUe'

    const uploadImg = document.querySelector(".upload");
    uploadImg.addEventListener("submit", async function (e) {
        e.preventDefault();
        console.log("Uploading stuff...");
        //
        //     // const image = '/Users/markrobinson/Desktop/image_1.jpeg';
        let file = e.target.flowerFile.files[0];
        // let reader = new FileReader();
        // reader.onload = uploadTheFile;
        // reader.readAsDataURL(file);
        console.log(file)

        let formData = new FormData();

        formData.append('organs', 'flower');
        formData.append('images', file);
        fetch(`https://my-api.plantnet.org/v2/identify/all?api-key=${API_KEY}`, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                if (data.errors) {
                    alert(data.errors)
                } else {
                    console.log(data);
                    document.getElementById('results').innerHTML = `
                    
                    <h1>Name</h1>
                    <h3>${data.bestMatch}</h3>
                    <h1>${data.query.images}</h1>
                    <img src="${data.query.images}" alt="plant-img">
                    
                    
                    
                    `

                }
            });

    });
}

// document.addEventListener('DOMContentLoaded', () => {
//
//     const form = document.getElementById('myform');
//     form.addEventListener('submit', (evt) => {
//         evt.preventDefault();
//         PlantIdEvent();
//     });
// })
//old code
//const  API_KEY = 'api-key=2b10JbtYGuH8jrVGLFbP9vMUe'
//     const uploadImg = document.querySelector(".upload")
//     uploadImg.addEventListener("submit", function (e) {
//         e.preventDefault()
//         const image = '../data/image_1.jpeg';
//         let file = e.target.uploadFile.files[0]
//         let form = new FormData()
//         form.append('file', file)
//         console.log(file)
//
//         fetch(`https://my-api.plantnet.org/v2/identify/all?include-related-images=false&no-reject=false&lang=en&${API_KEY}`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'multipart/form-data'
//             },
//             body: JSON.stringify(form)
//         })
//             .then(res => res.json())
//             .then(data => {
//                 if (data.errors) {
//                     alert(data.errors)
//                 } else {
//                 }
//             })
//     })
//<form class="upload" method="post" enctype="multipart/form-data">
//      <div class="mb-3">
//    <label data-link for="formFile" class="form-label">Default file input example</label>
//    <input data-link  name="uploadFile" class="form-control" type="file" id="formFile">
//    <input type="submit" onclick="PlantRequest">
//  </div>
//  </form>

