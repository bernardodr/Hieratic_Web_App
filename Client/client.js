//function to display uploaded image. Access 'image input' id tag in html form, and displays chosen image in html img tag 'preview'
function previewImage(){
      var file =document.getElementById("image_input").files;
      if (file.length>0){
          var reader=new  FileReader();
          reader.onload = function(event){
              document.getElementById("preview").setAttribute("src", event.target.result);
          }
          reader.readAsDataURL(file[0]);
      }

}


/////////////////////////////
///// POST Image Upload /////
/////////////////////////////




/////////////////////////////
///// Get Image Results /////
/////////////////////////////



const showData = function(){

    fetch('/results').then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
    
    // fetch('/upload/results')
    // .then(res => {
    //     if (res.ok){
    //         console.log("Successful fetch")
    //     } else{
    //         console.log("Failed fetch")
    //     }
    //     res.json()
    // })
    // .then(data => console.log(data))
    // .catch(error => console.error(error))
};