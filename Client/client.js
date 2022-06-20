

//function to display uploaded image. Access 'image input' id tag in html form, and displays chosen image in html img tag 'preview'
function previewImage(){
      var file = document.getElementById("image_input").files;
      if (file.length>0){
          var reader=new  FileReader();
          reader.onload = function(event){
              document.getElementById("preview").setAttribute("src", event.target.result);
          }
          reader.readAsDataURL(file[0]);
      }

}




/////////////////////////////
///// Get Image Results /////
/////////////////////////////

const showData = function(){

    
    fetch('/results')
        .then(response => {
            console.log(response)
            return response;
        })
        .then(response =>{
            console.log(response)
            return response.blob();
        })
        .then(blob =>{
            console.log(blob)
            document.getElementById('results').src = URL.createObjectURL(blob);
        });
    
 
   
    
};

