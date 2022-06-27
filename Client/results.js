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

fetch('/imageName2')
    .then(response => response.json())
    .then(data => {
        console.log(data)
        return data
    })
    // .then(data => {  
        
    //     return console.log(data.image2);
    // })

