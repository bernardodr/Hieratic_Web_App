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



// ////////////////////////////////////////////////////////////
// // create unique ids off a count
// ////////////////////////////////////////////////////////////
// array = []

// fs.readFile('../server/database/database.json', 'utf-8', (err, jsonString) => {
//     if (err) {
//         console.log(err)
//     }
//     else {

//         try {
//             //All of JSON data
//             const data = JSON.parse(jsonString);

//             ///WORKING FOR LOOP DO NOT DELETE
//             for (var i = 0; i < data.length; i++) {
//                 for (var n = 0; n < data[i].Signs.length; n++) {
//                     var signs = data[i].Signs[n].id
//                     console.log(signs)
//                     array.push(signs)
//                     count++
//                 }
//             }
//             console.log(count)

//             console.log(Math.max.apply(Math, array) + 'max value')
//             max = Math.max.apply(Math, array) + 'max value'
//             console.log(max)





//         } catch (err) {
//             console.log('Error pairing JSON', err)
//         }


//     }

// })


// fs.readFile('../server/database/database.json', 'utf-8', (err, jsonString) => {
//     if (err) {
//         console.log(err)
//     }
//     else {

//         try {
//             //All of JSON data
//             const data = JSON.parse(jsonString);

//             results = data.filter(data => 
//                 data.Facsimile_Maker === 'M??ller' && 
//                 data.Text_Name === 'Sinuhe B' && 
//                 data.Time_Period === 'New Kingdom');

//             console.log(results)



//         } catch (err) {
//             console.log('Error pairing JSON', err)
//         }


//     }

// })

// ///////////////////////////////////////////////////////////
// ////////////////// Working Search Engine //////////////////
// ///////////////////////////////////////////////////////////

// fs.readFile('../server/database/database.json', 'utf-8', (err, jsonString) => {
//     if (err) {
//         console.log(err)
//     }
//     else {

//         try {
//             //All of JSON data
//             const data = JSON.parse(jsonString);

//             results_round_1 = data.filter(data =>
//                 data.Facsimile_Maker === 'Poe' &&
//                 data.Text_Name === 'Shipwrecked Sailor');

//             console.log(results_round_1[0].Signs.length)

//             results_round_2 = results_round_1[0].Signs.filter(x => x.Gardiner_Sign === 'A1')
//             console.log(results_round_2)

//         } catch (err) {
//             console.log('Error pairing JSON', err)
//         }


//     }

// })

//////////////////////////////////////////////////////////////
/////////// Data Editing Logic for Signs objects /////////////
/////////////////////////////////////////////////////////////
/*
fs.readFile('../server/database/database.json', 'utf-8', (err, jsonString) => {
    if (err) {
        console.log(err)
    }
    else {

        try {
            //All of JSON data
            const data = JSON.parse(jsonString);

            // ///WORKING FOR LOOP DO NOT DELETE
            for (var i = 0; i < data.length; i++) {
                for (var n = 0; n < data[i].Signs.length; n++) {
                    var signs = data[i].Signs[n]
                    //console.log(signs)
                    count++
                    var item = data[i].Signs.find(x => x.id === 13110);
                    if (item) {
                        item.xy_coordinates = ""
                        json = JSON.stringify(data, null, 2); //convert it back to json
                        fs.writeFile('../server/database/database.json', json, 'utf8', callback);
                        function callback(err){
                            //console.log(err)
                        }
                    }
                }
                 
            }
            console.log("Data has been updated") 
            console.log(count)
        } catch (err) {
            console.log('Error pairing JSON', err)
        }

    }

})


*/

// //////////////////////////////////////////////////////////////
// /////////// Find image and ccreate Base 64      /////////////
// /////////////////////////////////////////////////////////////

// fs.readFile('../server/database/database.json', 'utf-8', (err, jsonString) => {
//     if (err) {
//         console.log(err)
//     }
//     else {

//         try {
//             //All of JSON data
//             const data = JSON.parse(jsonString);
//             fs.readFile(`../${data[0].Signs[0].Image_Path_Relative}`, function(err, data) {
//             base64= Buffer.from(data).toString('base64')
//             console.log(base64); 

//             })
//             //console.log(data[0].Signs[0].Image_Path_Relative)
//             //base64= Buffer.from(data[0].Signs[0].Image_Path_Relative,'base64')
//             //console.log(base64);
//             // ///WORKING FOR LOOP DO NOT DELETE


//         } catch (err) {
//             console.log('Error pairing JSON', err)
//         }

//     }

// })


//////////////////////////////////////////////////////////
/////////// Given ID delete entire sign Object ///////////
//////////////////////////////////////////////////////////

let input_ID = 13134

// Delete JSON data
fs.readFile('../server/database/database.json', 'utf-8', (err, jsonString) => {
    if (err) {
        console.log(err)
    }
    else {

        try {
            //All of JSON data
            const data = JSON.parse(jsonString);

            // ///WORKING FOR LOOP DO NOT DELETE
            for (var i = 0; i < data.length; i++) {
                for (var n = 0; n < data[i].Signs.length; n++) {
                    var signs = data[i].Signs[n].id
                    //console.log(signs)
                    if (signs === input_ID) {
                        //console.log(i, n)
                        //console.log(data[i].Signs[n].Image_Path_Relative)

                        //Get Relative image path to delete image
                        var delete_on_image_path = '../'+data[i].Signs[n].Image_Path_Relative
                        data[i].Signs.splice(n, 1);
                        json = JSON.stringify(data, null, 2); //convert it back to json
                        fs.writeFile('../server/database/database.json', json, 'utf8', callback);
                        function callback(err) {
                            console.log(err)
                        }
                        //Delete Image in Thesis_Dataset_Whole
                        try {
                            fs.unlinkSync(delete_on_image_path)
                            console.log("Successfully deleted the file.")
                        } catch (err) {
                            throw err
                        }



                        //validate deletion 
                        if (data[i].Signs[n] == undefined) {

                            console.log('data has been succesfully removed @ ' + 'index ' + i + ' , ' + n)


                        } else {
                            console.log('There was an issue deleting data')
                        }

                    }
                    count++
                    // var item = data[i].Signs.find(x => x.id === 13110);
                    // if (item) {
                    //     item.xy_coordinates = "x"
                    //     console.log(i)
                    //     json = JSON.stringify(data, null, 2); //convert it back to json
                    //     fs.writeFile('../server/database/database.json', json, 'utf8', callback);
                    //     function callback(err){
                    //         //console.log(err)
                    //     }
                    // }
                }


            }
            console.log("Data has been updated")
            console.log(count)
        } catch (err) {
            console.log('Error pairing JSON', err)
        }

    }

})





