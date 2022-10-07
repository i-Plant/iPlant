let images = [];
export default function PlantId(props) {
    images = props.images
    return `
    <header xmlns="http://www.w3.org/1999/html">
        <h1>Plant ID</h1>
    </header>
<form class="upload">
    <div class="mb-3">
  <label data-link for="formFile" class="form-label">Default file input example</label>
  <input data-link  name="uploadFile" class="form-control" type="file" id="formFile">
  <input type="submit">
</div>
</form>
<div>
<img src="" class="w3-border w3-padding" alt="Alps">
</div>
    
    `
}
export function PlantIdEvent() {
    const uploadImg = document.querySelector(".upload")
    uploadImg.addEventListener("submit", function (e){
        e.preventDefault()
        let file = e.target.uploadFile.files[0]
        let formData = new FormData()
        formData.append('file', file)


        fetch ('http://localhost:8080/plantId', {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then (data => {
                if (data.errors){
                alert(data.errors)
            }else{
                    console.log(data)
                }
            })

    })




    console.log("test");
}