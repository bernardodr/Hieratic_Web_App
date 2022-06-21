

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

    
    fetch('/results1')
        .then(response => {
            //console.log(response)
            return response;
        })
        .then(response =>{
            //console.log(response)
            return response.blob();
        })
        .then(blob =>{
            console.log(blob)
            document.getElementById('results1').src = URL.createObjectURL(blob);
        });

    fetch('/results2')
        .then(response => {
            //console.log(response)
            return response;
        })
        .then(response =>{
            //console.log(response)
            return response.blob();
        })
        .then(blob =>{
            console.log(blob)
            document.getElementById('results2').src = URL.createObjectURL(blob);
        });

    fetch('/results3')
        .then(response => {
            //console.log(response)
            return response;
        })
        .then(response =>{
            //console.log(response)
            return response.blob();
        })
        .then(blob =>{
            console.log(blob)
            document.getElementById('results3').src = URL.createObjectURL(blob);
        });

    fetch('/results4')
        .then(response => {
            //console.log(response)
            return response;
        })
        .then(response =>{
            //console.log(response)
            return response.blob();
        })
        .then(blob =>{
            console.log(blob)
            document.getElementById('results4').src = URL.createObjectURL(blob);
        });

    fetch('/results5')
        .then(response => {
            //console.log(response)
            return response;
        })
        .then(response =>{
            //console.log(response)
            return response.blob();
        })
        .then(blob =>{
            console.log(blob)
            document.getElementById('results5').src = URL.createObjectURL(blob);
        });
    

};

// ///////////////////
// //// TEST POST ////
// ///////////////////



// const submitFunction = async function(){
  
//     const options = {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'multipart/form-data'
//             },
//         body: ''
//     };
    
//     const response = await fetch('/upload', options);
//     const data = await response.json();
//     console.log(data);
    
    
// };

