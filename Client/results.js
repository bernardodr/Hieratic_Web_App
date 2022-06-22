/////////////////////////////
///// Get Image Results /////
/////////////////////////////

fetch('/results1')
    .then(response => {
        //console.log(response)
        return response;
    })
    .then(response => {
        //console.log(response)
        return response.blob();
    })
    .then(blob => {
        console.log(blob)
        document.getElementById('results1').src = URL.createObjectURL(blob);
    });

fetch('/results2')
    .then(response => {
        //console.log(response)
        return response;
    })
    .then(response => {
        //console.log(response)
        return response.blob();
    })
    .then(blob => {
        console.log(blob)
        document.getElementById('results2').src = URL.createObjectURL(blob);
    });

fetch('/results3')
    .then(response => {
        //console.log(response)
        return response;
    })
    .then(response => {
        //console.log(response)
        return response.blob();
    })
    .then(blob => {
        console.log(blob)
        document.getElementById('results3').src = URL.createObjectURL(blob);
    });

fetch('/results4')
    .then(response => {
        //console.log(response)
        return response;
    })
    .then(response => {
        //console.log(response)
        return response.blob();
    })
    .then(blob => {
        console.log(blob)
        document.getElementById('results4').src = URL.createObjectURL(blob);
    });

fetch('/results5')
    .then(response => {
        //console.log(response)
        return response;
    })
    .then(response => {
        //console.log(response)
        return response.blob();
    })
    .then(blob => {
        console.log(blob)
        document.getElementById('results5').src = URL.createObjectURL(blob);
    });


/////////////////////////////
////// Get Image Names //////
/////////////////////////////

fetch('/imageName1')
    .then(response => response.json())
    .then(data => {
        //console.log(data)
        return data
    })
    .then(data => {
            //console.log(data.image1)
            var imageName1 = data.image1
            var imageName2 = data.image2
            var imageName3 = data.image3
            var imageName4 = data.image4
            var imageName5 = data.image5
            // get filename 
            var filename1 = imageName1.split("/").pop();
            var filename2 = imageName2.split("/").pop();
            var filename3 = imageName3.split("/").pop();
            var filename4 = imageName4.split("/").pop();
            var filename5 = imageName5.split("/").pop();

            document.getElementById('imageName1').innerHTML = filename1;
            document.getElementById('imageName2').innerHTML = filename2;
            document.getElementById('imageName3').innerHTML = filename3;
            document.getElementById('imageName4').innerHTML = filename4;
            document.getElementById('imageName5').innerHTML = filename5;
            return console.log(data.image2);
    })
    
   

// fetch('/imageName1')
//     .then(response => {
//         console.log(response)
//         return response;
//     })
//     .then(response => {
//         console.log(response)
//         return response.toString();
//     })
//     .then(string => {
//         console.log(string)
//         document.getElementById('imageName1').innerHTML = string;
//     });
