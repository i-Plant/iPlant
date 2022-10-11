

let images = [];
export default function PlantId(props) {
    images = props.images
    return `
    <header xmlns="http://www.w3.org/1999/html">
        <h1>Plant ID</h1>
    </header>
    <form class="upload" method="post" enctype="multipart/form-data">
     <div class="mb-3">
   <label data-link for="formFile" class="form-label">Default file input example</label>
   <input data-link  name="uploadFile" class="form-control" type="file" id="formFile">
   <input type="submit" onclick="PlantRequest">
 </div>
 </form>

    `
}



export function PlantIdEvent() {
    const  API_KEY = 'api-key=2b10JbtYGuH8jrVGLFbP9vMUe'
    const uploadImg = document.querySelector(".upload")
    uploadImg.addEventListener("submit", function (e) {
        e.preventDefault()
        const image = '/data/media/image_1.jpeg';
        let file = e.target.uploadFile.files[0]
        let form = new FormData()
        form.append('file', file)
        console.log(file)

        fetch(`https://my-api.plantnet.org/v2/identify/all?include-related-images=false&no-reject=false&lang=en&${API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            body: JSON.stringify(form)
        })
            .then(res => res.json())
            .then(data => {
                if (data.errors) {
                    alert(data.errors)
                } else {
                }
            })
    })
}



