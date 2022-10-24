

let images = [];
export default function PlantId(props) {
    images = props.images
    return `
    <header xmlns="http://www.w3.org/1999/html">
        <h1>Plant ID</h1>
    </header>
    <main class="mainPlantId">
            <div>
                <form class="upload" id="myForm">
                    <div class="mb-3">
                        <label data-link for="flowerFile" class="form-label">Upload plant picture</label>
                        <input data-link  name="flower" class="form-control" type="file" id="flowerFile">
                        <input type="submit" id="uploadStuff" class="btn btn-primary" value="Identify">
                    </div>
                </form>
            </div>
           
            <div class="cardImageHolder" class="d-flex flex-wrap align-content-center" style="width:18rem" id="results">
       
            </div>
            
        </div>
       
        </main>
 <div class="instructions">
                <h3>Instructions</h3>
           </div>
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
        fetch(`https://my-api.plantnet.org/v2/identify/all?include-related-images=true&no-reject=false&lang=en&api-key=${API_KEY}`, {
            method: 'POST',
            // headers: {
            //     "Content-Type": "undefined"
            // },
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                if (data.errors) {
                    alert(data.errors)
                } else {
                    console.log(data);
                    document.getElementById('results').innerHTML = `

                   
                    
                   
                    <img class="card-img-top" src="${data.results[0].images[0].url.m}" alt="plant-image" class="images">
                      <div class="card-body" style="width: 100%">
                      <h4><i><u>${data.results[0].species.family.scientificName}</u></i></h4>
                      <h5><strong>${data.bestMatch}</strong></h5>   
                      <h6><small>Common Names:</small></h6>
                      <h4>${data.results[0].species.commonNames[0]}</h4> 
                      <h6>${data.query.organs[0]}</h6>
                       
                        
<!--                        <a href="#" class="btn btn-primary">buy</a>-->

                      </div>
                    
                    `

                }
            });

    });
}
//width: 100%; height: 250px pic side
//style="object-fit: fill"
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

//<!--                         <p class="card-text">${products[i].details}</p>-->
// <!--                         <h4>${products[i].category}</h4>-->
// <!--                         <h5>$ ${products[i].price}</h5> -->