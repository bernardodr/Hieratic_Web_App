
//function to display uploaded image. Access 'image input' id tag in html form, and displays chosen image in html img tag 'preview'
function previewImage() {
    var file = document.getElementById("image_input").files;
    if (file.length > 0) {
        var reader = new FileReader();
        reader.onload = function (event) {
            document.getElementById("preview").setAttribute("src", event.target.result);
        }
        reader.readAsDataURL(file[0]);
    }
}

/////////////////////////////////////////
////////// GET Zip of Database //////////
/////////////////////////////////////////


function downloadZIP() {
    fetch('/download') 
        //converts buffer object sent from server to blob object (imutable data)
        .then((res) => { return res.blob() })
        //creates url string of object
        .then(blob =>window.URL.createObjectURL(blob))
        //donwloads on client side
        .then(url=>window.location.assign(url))
       
}


function sendGlyphtoVisualise(){

    data = {
        glyph:document.getElementById('Gardiner').value
    }
   
    options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }

    fetch ('/visualisation', options).then(response => {
        console.log(response)
        return response;
    })
    .then(response => {
        //console.log(response)
        return response.toURL();
    })
    .then(response => {
        console.log(response)
        window.open(response);
        //document.getElementById('results1').src = URL.createObjectURL(blob);
    });


}
