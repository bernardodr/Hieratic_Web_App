
document.getElementById("submit").style.visibility = "hidden"
canvas = document.getElementById('canvas');
context = canvas.getContext('2d');
var drawing_
var image;
var width;
var height;
var pixel_values;

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




//function to crop image using cropperjs. Function called in previewImageCrop()
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
        }).toDataURL(('image/png', 1));
        cropped_image_div = new Image();
        cropped_image_div.setAttribute("id", "cropped_image");
        cropped_image_div.src = cropped_image_url
        cropped_image_div.onload = function () {
            binarizeCroppedImage(cropped_image_div)
        }


        
    })
    drawing();
}

//function to turn image into black and white after cropping. Function called in imageCrop()
function binarizeCroppedImage(image) {

    // setting canvas aspects relative to image. They are enlarged by 3.5 to allow for drawing capabilities
    canvas.width = image.width * 3.5;
    canvas.height = image.height * 3.5;
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    //getimagedata() returns the pixel data of the image drawn to the canvas
    img_data = context.getImageData(0, 0, canvas.width, canvas.height);
    //i+=4 to loop over every pixel value (rgba)
    for (i = 0; i < img_data.data.length; i += 4) {
        let count = img_data.data[i] + img_data.data[i + 1] + img_data.data[i + 2];
        //setting colour variable to black (0) or white (255) according to Tabin split 
        let colour = 0;
        if (count > 127.5) {
            colour = 255;
        }
        //set each value of pixel to colour variable
        img_data.data[i] = colour;
        img_data.data[i + 1] = colour;
        img_data.data[i + 2] = colour;
        img_data.data[i + 3] = 255;
    }
    //draws binarized image to canvas
    context.putImageData(img_data, 0, 0, 0, 0, canvas.width, canvas.height);
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


function drawing() {


    //access colour value from html input type radio
    const colourElement = document.getElementsByName("colourP");
    let colour;
    colourElement.forEach((x) => {
        if (x.checked) colour = x.value;
    });
    colourElement.forEach((x) => {
        x.onclick = () => {
            colour = x.value;
        };
    });

    //accesses size value from html input type range
    const sizeElement = document.querySelector("#size_range");
    let size = sizeElement.value;
    sizeElement.oninput = (s) => {
        size = s.target.value;
    };
    //the following occurs when user clicks on canvas html element
    canvas.onmousedown = (e) => {
        drawing_ = true;
        //starts new path
        context.beginPath();
        context.lineWidth = size;
        context.strokeStyle = colour;
        context.lineJoin = "round";
        context.lineCap = "round";
    }

    canvas.onmousemove = (e) => {
        //if statement checks that user has already clicked on canvas
        if (drawing_ == true) {
            //getboundingclientrect() returns coordinates relative to viewport - taking it away from clientX property ensures accurate cursor position 
            context.lineTo(e.clientX - canvas.getBoundingClientRect().left, e.clientY - canvas.getBoundingClientRect().top);
            //method which actually draws path 
            context.stroke();
        }
    };

    canvas.onmouseup = function () {
        drawing_ = false;
        context.closePath();
    };
}


function clearDrawing() {

    context.clearRect(0, 0, canvas.width, canvas.height)
}

function autoCropToContainBlackPixels() {
    var canvas = context.canvas;
        width = canvas.width;
        height = canvas.height;
        pixel = { x: [], y: [] };
        image_data2 = context.getImageData(0, 0, width, height)

    //nested loop to access pixel position
    for (y = 0; y < height; y++) {
        for (x = 0; x < width; x++) {
            //formula to access pixel position in array returned by getImageData()
            index = (y * width + x) * 4;
            //checks if R,G,B value in array is black and pushes x, y value to pixel object 
            if ( image_data2.data[index] == 0 &&  image_data2.data[index + 1] == 0 &&  image_data2.data[index + 2] == 0) {
                pixel.x.push(x);
                pixel.y.push(y);
            }
        }
    }
    //sorts x and y array in size order
    pixel.x.sort(function (a, b) { return a - b });
    pixel.y.sort(function (a, b) { return a - b });
    
    
    var last_element_in_array = pixel.x.length - 1;

    //calculate the width and height of new canvas by subtracting the two furthest black pixel (horizontally/vertically) from each other
    width = pixel.x[last_element_in_array] - pixel.x[0] +1;
    height = pixel.y[last_element_in_array] - pixel.y[0] + 1;
    var updated_cropped_canvas = context.getImageData(pixel.x[0], pixel.y[0], width, height);

    canvas.width = width;
    canvas.height = height;
    context.putImageData(updated_cropped_canvas, 0, 0);
   
    document.getElementById('clear').disabled=true;
    document.getElementById('autocrop').disabled=true;
    
    
   // return width, height;

    
}

function imageUpload(){
 
    data={
    gardiner:document.getElementById('Gardiner').value,
    facsimile:document.getElementById('Facsimile').value,
    text:document.getElementById('Text').value,
    instance:document.getElementById('Instance').value,
    provenance:document.getElementById('Provenance').value,
    period:document.getElementById('Period').value,
    image:canvas.toDataURL().split(',')[1],
    x:document.getElementById('x').value,
    y:document.getElementById('y').value
}


options={method: 'POST',
headers:{'Content-Type':'application/json'},
body:JSON.stringify(data)}

    fetch('/image_upload', options)  
    .then(res=>res.text())
    .then(text=>console.log(text))

}

function jsonUpload(){

    data={
        gardiner:document.getElementById('Gardiner').value,
        facsimile:document.getElementById('Facsimile').value,
        text:document.getElementById('Text').value,
        instance:document.getElementById('Instance').value,
        provenance:document.getElementById('Provenance').value,
        period:document.getElementById('Period').value,
        image:canvas.toDataURL().split(',')[1],
        x:document.getElementById('x').value,
        y:document.getElementById('y').value
    }
    options={method: 'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify(data)}

    fetch('/json_upload', options)  
    .then(res=>res.text())
    .then(text=>console.log(text))

}
/*
function aspectRatioUpdate() {


    aspect_ratio = height / width;
    console.log(aspect_ratio);
    body={
        aspect_Ratio:aspect_ratio
    }

    options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    }

    fetch('/aspectRatio', options)  


}
*/