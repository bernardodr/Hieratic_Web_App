//const { match } = require('assert');
//const { match } = require('assert');
const fs = require('fs');
let count = 0
// let filename1 = "A12_0001_1_1_4.png"

// fs.readFile('../server/database/newJSON.json', 'utf-8', (err, jsonString) => {

// const data = JSON.parse(jsonString);
// let count = 0
// let filename1 = "A12_0001_1_1_4.png"

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

// let filename1 = "A12_0001_2_4_1.png"



// fs.readFile('../server/database/database.json', 'utf-8', (err, jsonString) => {
//     if (err) {
//         console.log(err)
//     }
//     else {

//         try {
//             //All of JSON data
//             const data = JSON.parse(jsonString);

//             // Get Filename of Matched image
//             let filename1 = imageJSON.image1 + '.png'

//             // MATCH MATCH WORKING
//             for (var i = 0; i < data.length; i++) {
//                 //var signs = data[0].Signs[0].Image_Name
//                 // console.log(signs)
//                 match = data[i].Signs.find(x => x.Image_Name === filename1)
//                 if (match === undefined) {

//                 } else {
//                     console.log(match)
//                     text_Info = {
//                         Facsimile_Maker: data[i].Facsimile_Maker,
//                         Text_Name: data[i].Text_Name,
//                         Time_Period: data[i].Time_Period
//                     }
//                     match = Object.assign(text_Info,match);
//                     console.log(match)
//                     match = JSON.stringify(match)
//                     res.send(match)
//                 }

//             }


//         } catch (err) {
//             console.log('Error pairing JSON', err)
//         }


//     }

// })
array = []

fs.readFile('../server/database/database.json', 'utf-8', (err, jsonString) => {
    if (err) {
        console.log(err)
    }
    else {

        try {
            //All of JSON data
            const data = JSON.parse(jsonString);

            ///WORKING FOR LOOP DO NOT DELETE
            for (var i = 0; i < data.length; i++) {
                for (var n = 0; n < data[i].Signs.length; n++) {
                    var signs = data[i].Signs[n].id
                    console.log(signs)
                    array.push(signs)
                    count++
                }
            }
            console.log(count)
            
            console.log(Math.max.apply(Math, array))

            



        } catch (err) {
            console.log('Error pairing JSON', err)
        }


    }

})

