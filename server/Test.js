const fs = require('fs');

fs.readFile('../server/database/newJSON.json', 'utf-8', (err, jsonString) => {

    const data = JSON.parse(jsonString);
    let count = 0
    let filename1 = "A12_0001_1_1_4.png"

    //length of high level JSON objects i.e. facsimilie makers and texts
    //console.log(data.length)

    // var signs = data[0].Signs[0].Image_Name
    // console.log(signs)



    // for (var i=0; i<data.length; i++) {
    //     var signs = data[i].Text_Info.Signs
    //     console.log(signs)
    // }


    // ///WORKING FOR LOOP DO NOT DELETE
    // for (var i=1; i<data.length; i++) {
    //     for (var n=1; n<data[i].Text_Info.Signs.length; n++) {
    //         var signs = data[i].Text_Info.Signs[n][0]
    //         console.log(signs.Image_Name)

    //         //Counter
    //         count++
    //     }
    // }
    // console.log(count)

    // ///WORKING FOR LOOP DO NOT DELETE
    // for (var i = 0; i < data.length; i++) {
    //     for (var n = 0; n < data[i].Signs.length; n++) {
    //         var signs = data[i].Signs[n].Image_Name

    //         console.log(signs)
    //         count++
    //     }
    // }
    // console.log(count)

    // ///WORKING FOR LOOP DO NOT DELETE
    // for (var i = 0; i < data.length; i++) {

    //     var signs = data[i].Signs
    //     //console.log(signs)
    //     match =  data[i].Signs.find(x => x.Image_Name === filename1)
    //     count++
    //     if(match == undefined){

    //     }else{
    //         console.log(match)
    //     }
    //     //console.log(signs)

    //     // for (var n = 0; n < data[i].Signs.length; n++) {
    //     //     var signs = data[i].Signs[n]
    //     //     console.log(signs)
    //     //     count++
    //     // }
    // }
    // console.log(count)






    // ///WORKING FOR LOOP DO NOT DELETE
    // for (var i = 0; i < data.length; i++) {
    //     for (var n = 0; n < data[i].Signs.length; n++) {
    //         var signs = data[i].Signs[n]
    //         console.log(signs)
    //         count++
    //     }
    // }
    // console.log(count)
    
   

    // for (var i = 0; i < data.length; i++) {
    //     var signs = data[0].Signs[0].Image_Name
    //     // console.log(signs)
    //     match = data[i].Signs.find(x => x.Image_Name === filename1)
    //     if(match === undefined){

    //     }else{
    //         console.log(match)
    //     }
        
    // }\
    

    





})






    // // WOrking version that returns only the signs object 
    // // MATCH MATCH WORKING
    // for (var i = 0; i < data.length; i++) {
    //     var signs = data[0].Signs[0].Image_Name
    //     // console.log(signs)
    //     match = data[i].Signs.find(x => x.Image_Name === filename1)
    //     if(match === undefined){

    //     }else{
    //         console.log(match)
    //     }
        
    // }