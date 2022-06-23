
document.getElementById("submit").style.visibility="hidden"

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
        viewMode: 1,
        
    });
    //to access and display cropped image below
    document.getElementById('crop_button').addEventListener('click', function () {

        cropped_image_url = cropper.getCroppedCanvas({
            
            imageSmoothingEnabled: false,
            imageSmoothingQuality: 'high',
        }).toDataURL(('image/jpeg', 1));
        cropped_image_div = new Image();
        cropped_image_div.setAttribute("id", "cropped_image");
        cropped_image_div.src = cropped_image_url
        cropped_image_div.onload=function(){
            binarizeCroppedImage(cropped_image_div)
        }
        
        
        //document.getElementById("cropped_image_display").appendChild(cropped_image_div);
    })
}

function binarizeCroppedImage(image){
    canvas=document.getElementById('canvas');
    context=canvas.getContext('2d');
    canvas.width = image.width;
    canvas.height = image.height;
    context.drawImage(image, 0, 0);
    img_data=context.getImageData(0,0, canvas.width, canvas.height);
    for (i = 0; i < img_data.data.length; i += 4) {
        let count = img_data.data[i] + img_data.data[i + 1] + img_data.data[i + 2];
        let colour = 0;
        if (count > 127.5){ 
            colour = 255;
        }
        
    
        img_data.data[i] = colour;
        img_data.data[i + 1] = colour;
        img_data.data[i + 2] = colour;
        img_data.data[i + 3] = 255;

    }
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



const colorElement = document.getElementsByName("colorRadio");
let color;
colorElement.forEach((c) => {
  if (c.checked) color = c.value;
});
colorElement.forEach((c) => {
  c.onclick = () => {
    color = c.value;
  };
});


/////////////////////////////
///// POST Image Upload /////
/////////////////////////////


