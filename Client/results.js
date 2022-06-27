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

            // get Gardiner sign
            var muller1 = filename1.split('_')[0];
            var muller2 = filename2.split('_')[0];
            var muller3 = filename3.split('_')[0];
            var muller4 = filename4.split('_')[0];
            var muller5 = filename5.split('_')[0];

            document.getElementById('imageName1').innerHTML = muller1;
            document.getElementById('imageName2').innerHTML = muller2;
            document.getElementById('imageName3').innerHTML = muller3;
            document.getElementById('imageName4').innerHTML = muller4;
            document.getElementById('imageName5').innerHTML = muller5;

            // get Facsimile Maker 
            var facsimileMaker1 = filename1;
            var facsimileMaker2 = filename2;
            var facsimileMaker3 = filename3;
            var facsimileMaker4 = filename4;
            var facsimileMaker5 = filename5;

            // get Provenance
            var provenance1 = filename1;
            var provenance2 = filename2;
            var provenance3 = filename3;
            var provenance4 = filename4;
            var provenance5 = filename5;

            // get Text 

            // get Time Period

            // get Author


            
            return console.log(data.image2);
    })
    
