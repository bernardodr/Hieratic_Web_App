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
        console.log(data.Gardiner_Sign)
        return data
})
.then(data => {
    
    //Gardiner sign
    var Gardiner1 = data.Gardiner_Sign
    document.getElementById('Gardiner1').innerHTML = "Gardiner Sign: "+Gardiner1;

    // image id 
    var id1 = data.id
    document.getElementById('id1').innerHTML = "Image ID: "+id1;

    //instance in Facsimile 
    var instance1 = data.Instance_In_Facsimile
    document.getElementById('intance1').innerHTML = "Instance: "+instance1;

    //XY Coordinates
    var coordinates1 = data.xy_coordinates
    document.getElementById('coordinates1').innerHTML = " XY Coordinates: "+coordinates1;


    // //Facsimile Maker
    // var Facsimile_Maker_1 = data.Facsimile_Maker
    // document.getElementById('Facsimile_Maker_1').innerHTML ="Facsimile Maker: "+ Facsimile_Maker_1;
    // //Provenance
    // var Provenance_1 = data.Provenance
    // document.getElementById('Provenance_1').innerHTML = "Provenance: "+Provenance_1;
    // //Text
    // var Text_1 = data.Text[0].Text_Name
    // document.getElementById('Text_1').innerHTML = "Text: "+Text_1;
    // //Time Period
    // var Time_Period_1 = data.Text[0].Time_Period
    // document.getElementById('Time_Period_1').innerHTML = "Time Period: "+Time_Period_1;
    // // get Author
    // var Orignal_Author_1 = data.Text[0].Orignal_Author
    // document.getElementById('Orignal_Author_1').innerHTML = "Author: "+ Orignal_Author_1;

    
})

fetch('/imageName2')
    .then(response => response.json())
    .then(data => {
        console.log(data)
        return data
})
.then(data => {
    
    //Gardiner sign
    var Gardiner2 = data.Gardiner_Sign
    document.getElementById('Gardiner2').innerHTML = "Gardiner Sign: "+Gardiner2;

    // image id 
    var id2 = data.id
    document.getElementById('id2').innerHTML = "Image ID: "+id2;

    //instance in Facsimile 
    var instance2 = data.Instance_In_Facsimile
    document.getElementById('intance2').innerHTML = "Instance: "+instance2;

    //XY Coordinates
    var coordinates2 = data.xy_coordinates
    document.getElementById('coordinates2').innerHTML = " XY Coordinates: "+coordinates2;

    
});

fetch('/imageName3')
    .then(response => response.json())
    .then(data => {
        console.log(data)
        return data
})
.then(data => {
    
    //Gardiner sign
    var Gardiner3 = data.Gardiner_Sign
    document.getElementById('Gardiner3').innerHTML = "Gardiner Sign: "+Gardiner3;

    // image id 
    var id3 = data.id
    document.getElementById('id3').innerHTML = "Image ID: "+id3;

    //instance in Facsimile 
    var instance3 = data.Instance_In_Facsimile
    document.getElementById('intance3').innerHTML = "Instance: "+instance3;

    //XY Coordinates
    var coordinates3 = data.xy_coordinates
    document.getElementById('coordinates3').innerHTML = " XY Coordinates: "+coordinates3;

    
});


fetch('/imageName4')
    .then(response => response.json())
    .then(data => {
        console.log(data)
        return data
})
.then(data => {
    
    //Gardiner sign
    var Gardiner4 = data.Gardiner_Sign
    document.getElementById('Gardiner4').innerHTML = "Gardiner Sign: "+Gardiner4;

    // image id 
    var id4 = data.id
    document.getElementById('id4').innerHTML = "Image ID: "+id4;

    //instance in Facsimile 
    var instance4 = data.Instance_In_Facsimile
    document.getElementById('intance4').innerHTML = "Instance: "+instance4;

    //XY Coordinates
    var coordinates4 = data.xy_coordinates
    document.getElementById('coordinates4').innerHTML = " XY Coordinates: "+coordinates4;

    
});

fetch('/imageName5')
    .then(response => response.json())
    .then(data => {
        console.log(data)
        return data
})
.then(data => {
    
    //Gardiner sign
    var Gardiner5 = data.Gardiner_Sign
    document.getElementById('Gardiner5').innerHTML = "Gardiner Sign: "+Gardiner5;

    // image id 
    var id5 = data.id
    document.getElementById('id5').innerHTML = "Image ID: "+id5;

    //instance in Facsimile 
    var instance5 = data.Instance_In_Facsimile
    document.getElementById('intance5').innerHTML = "Instance: "+instance5;

    //XY Coordinates
    var coordinates5 = data.xy_coordinates
    document.getElementById('coordinates5').innerHTML = " XY Coordinates: "+coordinates5;

    
});



// fetch('/imageName1')
//     .then(response => response.json())
//     .then(data => {
//         //console.log(data)
//         return data
//     })
//     .then(data => {
//             //console.log(data.image1)
//             var imageName1 = data.image1
//             var imageName2 = data.image2
//             var imageName3 = data.image3
//             var imageName4 = data.image4
//             var imageName5 = data.image5
//             // get filename 
//             var filename1 = imageName1.split("/").pop();
//             var filename2 = imageName2.split("/").pop();
//             var filename3 = imageName3.split("/").pop();
//             var filename4 = imageName4.split("/").pop();
//             var filename5 = imageName5.split("/").pop();

//             // get Gardiner sign
//             var Gardiner1 = filename1.split('_')[0];
//             var Gardiner2 = filename2.split('_')[0];
//             var Gardiner3 = filename3.split('_')[0];
//             var Gardiner4 = filename4.split('_')[0];
//             var Gardiner5 = filename5.split('_')[0];

//             document.getElementById('imageName1').innerHTML = Gardiner1;
//             document.getElementById('imageName2').innerHTML = Gardiner2;
//             document.getElementById('imageName3').innerHTML = Gardiner3;
//             document.getElementById('imageName4').innerHTML = Gardiner4;
//             document.getElementById('imageName5').innerHTML = Gardiner5;

//             // get Facsimile Maker 
//             var facsimileMaker1 = filename1;
//             var facsimileMaker2 = filename2;
//             var facsimileMaker3 = filename3;
//             var facsimileMaker4 = filename4;
//             var facsimileMaker5 = filename5;

//             // get Provenance
//             var provenance1 = filename1;
//             var provenance2 = filename2;
//             var provenance3 = filename3;
//             var provenance4 = filename4;
//             var provenance5 = filename5;

//             // get Text 

//             // get Time Period

//             // get Author


            
//             return console.log(data.image2);
//     })

