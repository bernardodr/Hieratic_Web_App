
//function to display uploaded image (for database) and to perform cropping functionality 
function previewImageCrop() {
    var file = document.getElementById("image_input1").files;
    if (file.length > 0) {
        var reader = new FileReader();
        reader.onload = function (event) {
            document.getElementById("crop1").setAttribute("src", event.target.result);
        }
        reader.readAsDataURL(file[0]);
        //waits 1000 milliseconds before calling imageCrop function. Lets image load in html so as not to return null error
        setTimeout(imageCrop, 1000);
    }

}

//function to crop image using cropperjs 
function imageCrop() {
    image = document.getElementById("crop1");
    const cropper = new Cropper(image, {
        autoCropArea: 1,
        viewMode: 3,
        preview: '.preview'
    });
}

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

/////////////////////////////
///// POST Image Upload /////
/////////////////////////////

