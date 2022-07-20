const { ChildProcess } = require('child_process');
const { spawn } = require('child_process'); // Allows for node python interaction 
const express = require('express');
const { rmSync, fstat } = require('fs');
const multer = require('multer'); // file upload middleware 
const uuid = require('uuid').v4; //unique image naming
//root of computer is needed for res.sendfile()
const root = '/Users/danielbernardo/Desktop/Dissteration Code/Hieratic_Web_App/server/database/Thesis_Dataset_Whole/'
//const root = '/Users/benjenkins/Desktop/Dissertation - Hieratic OCR website/Hieratic_Web_App/server/database/Thesis_Dataset_Whole/'
const fs = require('fs');
const AdmZip = require('adm-zip');

var id = '';
var upload_name = '';



// multer acts as middleware and stores in the client uploads in uploads directory
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'database/Thesis_Dataset_Whole/')
    },
    filename: (req, file, cb) => {
        const { originalname } = file;
        
        // name of image to be compaired, gets add to Thesis_Whole_Dataset
        cb(null, 'TIMG_0000.png')
        

    }
});

const upload = multer({ storage: storage });
const app = express();
const API_PORT = 3000;

app.use(express.json({ limit: '5000mb' }));
app.use(express.static('../Client'));


// tell the server to listen on the given port and log a message to the console (so we can see our server is doing something!)
app.listen(API_PORT, () => {
    console.log(`Listening on localhost:${API_PORT}`)
});




///////////////////////////////////////////////////////////////
/////////////////// Read in JSON Database  //////////////////// 
///////////////////////////////////////////////////////////////




//////////////////////////////////////////////////////////
/////////////////// Global Variables  //////////////////// 
//////////////////////////////////////////////////////////

var imageData = ""
var imageJSON = null

//////////////////////////////////////////////////////////
/////////////////// POST image upload //////////////////// 
//////////////////////////////////////////////////////////


app.post('/upload', upload.single('hieraticSign'), (req, res) => {

    /////////////////////////////////////////////////////////////////
    ////////////////// Run OCR analysis /////////////////////////////
    /////////////////////////////////////////////////////////////////
    const OCR_FFT_RUN = async function () {
        //spawn command "send"
        const childPython = spawn('python3', ['OCR_System/testing.py']);

        // recieve data from python file
        childPython.stdout.on('data', (data) => {

            console.log(`stdout: + ${data}`);

            //console.log(JSON.stringify(data))
            //console.log(eval(`(${data})`))
            imageData = eval(`(${data})`);
            console.log(imageData)

            imageJSON = {
                "image1": imageData[0],
                "image2": imageData[1],
                "image3": imageData[2],
                "image4": imageData[3],
                "image5": imageData[4]
            };

            //res.sendFile(imageJSON.image1)
            console.log(imageJSON.image1);
        })

        // handel errors
        childPython.stderr.on('data', (data) => {
            console.log(`stderr: + ${data}`);
        })
        // When Python file finshes 
        childPython.on('close', (code) => {
            console.log(`process exited with code: + ${code}`);

            //respond with webpage of results after python script is done

            res.redirect('http://localhost:3000/pages/ocr_results.html')

        })


    };
    OCR_FFT_RUN()

});

//////////////////////////////////////////
//// Get, send image file/s to client ////
//////////////////////////////////////////

//for fft only change 4 to 3

// Top match from IDM
app.get('/results1', (req, res) => {
    //get the file name from relative path
    let filename1 = imageJSON.image1
    res.sendFile(root + filename1 + '.png');
});

app.get('/results2', (req, res) => {

    let filename2 = imageJSON.image2
    res.sendFile(root + filename2 + '.png');

});

app.get('/results3', (req, res) => {
    let filename3 = imageJSON.image3
    res.sendFile(root + filename3 + '.png');
});

app.get('/results4', (req, res) => {
    let filename4 = imageJSON.image4
    res.sendFile(root + filename4 + '.png');
});

app.get('/results5', (req, res) => {
    let filename5 = imageJSON.image5
    res.sendFile(root + filename5 + '.png');
});


///////////////////////////////////////////
///// Get, send image names to client /////
///////////////////////////////////////////

// Top match from IDM
app.get('/imageName1', (req, res) => {
    fs.readFile('../server/database/database.json', 'utf-8', (err, jsonString) => {
        if (err) {
            console.log(err)
        }
        else {

            try {
                //All of JSON data
                const data = JSON.parse(jsonString);

                // Get Filename of Matched image
                let filename1 = imageJSON.image1 + '.png'

                // MATCH MATCH WORKING
                for (var i = 0; i < data.length; i++) {
                    //var signs = data[0].Signs[0].Image_Name
                    // console.log(signs)
                    match = data[i].Signs.find(x => x.Image_Name === filename1)
                    if (match === undefined) {

                    } else {
                        console.log(match)
                        text_Info = {
                            Facsimile_Maker: data[i].Facsimile_Maker,
                            Text_Name: data[i].Text_Name,
                            Time_Period: data[i].Time_Period
                        }
                        match = Object.assign(text_Info, match);
                        console.log(match)
                        match = JSON.stringify(match)
                        res.send(match)
                    }

                }


            } catch (err) {
                console.log('Error pairing JSON', err)
            }


        }

    })
});

// great JSON help = https://heynode.com/tutorial/readwrite-json-files-nodejs/
app.get('/imageName2', (req, res) => {
    fs.readFile('../server/database/database.json', 'utf-8', (err, jsonString) => {
        if (err) {
            console.log(err)
        }
        else {

            try {
                //All of JSON data
                const data = JSON.parse(jsonString);

                // Get Filename of Matched image
                let filename2 = imageJSON.image2 + '.png'

                // MATCH MATCH WORKING
                for (var i = 0; i < data.length; i++) {
                    //var signs = data[0].Signs[0].Image_Name
                    // console.log(signs)
                    match = data[i].Signs.find(x => x.Image_Name === filename2)
                    if (match === undefined) {

                    } else {
                        console.log(match)
                        text_Info = {
                            Facsimile_Maker: data[i].Facsimile_Maker,
                            Text_Name: data[i].Text_Name,
                            Time_Period: data[i].Time_Period
                        }
                        match = Object.assign(text_Info, match);
                        console.log(match)
                        match = JSON.stringify(match)
                        res.send(match)
                    }

                }

            } catch (err) {
                console.log('Error paring JSON', err)
            }


        }

    })
    //res.send(match);
});

app.get('/imageName3', (req, res) => {
    fs.readFile('../server/database/database.json', 'utf-8', (err, jsonString) => {
        if (err) {
            console.log(err)
        }
        else {

            try {
                //All of JSON data
                const data = JSON.parse(jsonString);

                // Get Filename of Matched image
                let filename3 = imageJSON.image3 + '.png'

                // MATCH MATCH WORKING
                for (var i = 0; i < data.length; i++) {
                    //var signs = data[0].Signs[0].Image_Name
                    // console.log(signs)
                    match = data[i].Signs.find(x => x.Image_Name === filename3)
                    if (match === undefined) {

                    } else {
                        console.log(match)
                        text_Info = {
                            Facsimile_Maker: data[i].Facsimile_Maker,
                            Text_Name: data[i].Text_Name,
                            Time_Period: data[i].Time_Period
                        }
                        match = Object.assign(text_Info, match);
                        console.log(match)
                        match = JSON.stringify(match)
                        res.send(match)
                    }

                }

            } catch (err) {
                console.log('Error paring JSON', err)
            }

        }

    })
});

app.get('/imageName4', (req, res) => {
    fs.readFile('../server/database/database.json', 'utf-8', (err, jsonString) => {
        if (err) {
            console.log(err)
        }
        else {

            try {
                //All of JSON data
                const data = JSON.parse(jsonString);

                // Get Filename of Matched image
                let filename4 = imageJSON.image4 + '.png'

                // MATCH MATCH WORKING
                for (var i = 0; i < data.length; i++) {
                    //var signs = data[0].Signs[0].Image_Name
                    // console.log(signs)
                    match = data[i].Signs.find(x => x.Image_Name === filename4)
                    if (match === undefined) {

                    } else {
                        console.log(match)
                        text_Info = {
                            Facsimile_Maker: data[i].Facsimile_Maker,
                            Text_Name: data[i].Text_Name,
                            Time_Period: data[i].Time_Period
                        }
                        match = Object.assign(text_Info, match);
                        console.log(match)
                        match = JSON.stringify(match)
                        res.send(match)
                    }

                }

            } catch (err) {
                console.log('Error paring JSON', err)
            }


        }

    })
});

app.get('/imageName5', (req, res) => {
    fs.readFile('../server/database/database.json', 'utf-8', (err, jsonString) => {
        if (err) {
            console.log(err)
        }
        else {

            try {
                //All of JSON data
                const data = JSON.parse(jsonString);

                // Get Filename of Matched image
                let filename5 = imageJSON.image5 + '.png'

                // MATCH MATCH WORKING
                for (var i = 0; i < data.length; i++) {
                    //var signs = data[0].Signs[0].Image_Name
                    // console.log(signs)
                    match = data[i].Signs.find(x => x.Image_Name === filename5)
                    if (match === undefined) {

                    } else {
                        console.log(match)
                        text_Info = {
                            Facsimile_Maker: data[i].Facsimile_Maker,
                            Text_Name: data[i].Text_Name,
                            Time_Period: data[i].Time_Period
                        }
                        match = Object.assign(text_Info, match);
                        console.log(match)
                        match = JSON.stringify(match)
                        res.send(match)
                    }

                }

            } catch (err) {
                console.log('Error paring JSON', err)
            }


        }

    })
});

/////////////////////////////////////////////////////////////////////// 
/////////////////// Dynamically update OCR system  //////////////////// 
/////////////////////////////////////////////////////////////////////// 

// this process takes on .avg 2min 30s

const updateDataset = function () {

    //run training
    const pythonTraining = spawn('python3', ['OCR_System/training.py']);

    // recieve
    pythonTraining.stdout.on('data', (data) => {
        //output = eval(`(${data})`);
        console.log(data)
    })

    // handel errors
    pythonTraining.stderr.on('data', (data) => {
        console.log(`stderr: + ${data}`);
    })

    // when script finishes 
    pythonTraining.on('close', (code) => {
        console.log(`process exited with code: + ${code}`);
        console.log('Training was successful')
        //tokens()
    })

    


};


///////////////////////////////////////////////////////////////
/////////////////// Zip Database of Images //////////////////// 
///////////////////////////////////////////////////////////////

app.get('/download', function (req, res) {

    var zip = new AdmZip();

    //add image (folder) and json (file) to zip folder 
    zip.addLocalFile('../server/database/database.json', 'database.json');
    zip.addLocalFolder('../server/database/Thesis_Dataset_Whole', 'Thesis_Dataset_Whole')


    var zipFileContents = zip.toBuffer();
    const fileName = 'uploads.zip';
    const fileType = 'application/zip';
    //sets appropriate headings for sending response
    res.writeHead(200, {
        'Content-Disposition': `attachment; filename="${fileName}"`,
        'Content-Type': fileType,
    })
    console.log('download is in progress')
    //sends zipped folder as response to client 
    return res.end(zipFileContents);

})





//post function to add json data of uploaded image to (test.json)

app.post('/json_upload', (req, res) => {



    ///////////////////////////////////////////////////
    ////////// create unique ids off a count //////////
    ///////////////////////////////////////////////////

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
                        //console.log(signs)
                        array.push(signs)
                        //count++
                    }
                }
                //console.log(count)

                //console.log(Math.max.apply(Math, array) + 'max value')
                id = Math.max.apply(Math, array) + 1;

                upload_name = `${req.body.gardiner}_${req.body.instance}_${req.body.facsimile}_${req.body.text}_id:${id}.png`
                //access request values from user inputted data
                var object =

                {
                    Facsimile_Maker: req.body.facsimile,
                    Text_Name: req.body.text,
                    Time_Period: req.body.period,
                    Provenance: req.body.provenance,
                    Signs: [{

                        id: id,
                        Gardiner_Sign: req.body.gardiner,
                        Instance_In_Facsimile: req.body.instance,
                        Image_Name: `${upload_name}`,
                        Image_Path_Relative: `server/database/Thesis_Dataset_Whole/${upload_name}`,
                        xy_coordinates: `${req.body.x},${req.body.y}`
                    }]


                }

                sign_info = {

                    id: id,
                    Gardiner_Sign: req.body.gardiner,
                    Instance_In_Facsimile: req.body.instance,
                    Image_Name: `${upload_name}`,
                    Image_Path_Relative: `server/database/Thesis_Dataset_Whole/${upload_name}`,
                    xy_coordinates: `${req.body.x},${req.body.y}`
                }

                //read in (test.json) file 
                let jsondata = fs.readFileSync("../server/database/database.json", "utf-8");
                //parse actual json from string 
                let json = JSON.parse(jsondata);

                counter = 0
                for (i = 0; i < json.length; i++) {

                    if (json[i].Facsimile_Maker == req.body.facsimile && json[i].Text_Name == req.body.text) {
                        signs = json[i].Signs
                        signs.push(sign_info)
                        counter++
                    }
                }
                //if text and fac maker not found in database, add new object to jsondata
                if (counter == 0) {
                    json.push(object)

                }

                //convert json data to string 
                jsondata = JSON.stringify(json, null, 2);
                //write json to correct file 
                fs.writeFileSync("../server/database/database.json", jsondata, "utf-8");
                upload_name = `${req.body.gardiner}_${req.body.instance}_${req.body.facsimile}_${req.body.text}_id:${id}.png`
                res.status(200).send(`${upload_name} has been uploaded to JSON database`)

            } catch (err) {
                console.log('Error pairing JSON', err)
            }


        }

    })


})


//post function to upload labelled imaged to thesis_dataset_whole
app.post('/image_upload', (req, res) => {

    //get base64 image data from post request
    var base64Data = req.body.image
    //give image new title - gardiner sign, instance in facsimile and date in yyyy-mm-dd format. Toisostring converts date to appropriate format

    //upload_name = `${req.body.gardiner}_${req.body.instance}_${req.body.facsimile}_${req.body.text}_id:${id}.png`
    //writes file to image database. Buffer.from converts base64 data into image
    fs.writeFile(`../server/database/Thesis_Dataset_Whole/${upload_name}`, Buffer.from(base64Data, 'base64'), function (err) {
        if (err) throw err;
        console.log('Image Saved');
        // Update weights with new image (works synchronously)
        updateDataset()
    });
    res.status(200).send(`${upload_name} has been uploaded to Thesis_Dataset_Whole`)

})


///////////////////////////////////////////////////////////
////////////////// Working Search Engine //////////////////
///////////////////////////////////////////////////////////


app.post('/search', (req, res) => {

    //inputs from client
    gardiner_sign = req.body.gardiner;
    fac_maker = req.body.facsimile;
    text = req.body.text;
    //console.log(gardiner_sign, fac_maker, text)

    fs.readFile('../server/database/database.json', 'utf-8', (err, jsonString) => {
        if (err) {
            console.log(err)
        }
        else {

            try {

                //All of JSON data
                const data = JSON.parse(jsonString);



                // round 1 search to narrow down Facsimile Maker & Text
                results_round_1 = data.filter(data =>
                    data.Facsimile_Maker === fac_maker &&
                    data.Text_Name === text);

                console.log(results_round_1[0].Signs.length)

                // round 2 search to narrow down Gardiner 
                results_round_2 = results_round_1[0].Signs.filter(x => x.Gardiner_Sign === gardiner_sign)

                base64 = ''
                // Update object with Base64 for image 
                for (var i = 0; i < results_round_2.length; i++) {

                    function Read() {

                        return fs.readFileSync(`../${results_round_2[i].Image_Path_Relative}`).toString('base64');
                    }

                    // fs.readFileSync(`../${results_round_2[i].Image_Path_Relative}`, function (err, data) {
                    //     buffer = 'hello'
                    //     //base64 = Buffer.from(data).toString('base64')
                    //     //console.log(base64);

                    //     //console.log(results_round_2[0].Image_Path_Relative)
                    //     return buffer
                    // })

                    results_round_2[i].Image_Path_Relative = Read()


                }

                //console.log(root + results_round_2[0].Image_Path_Relative)
                res.json(results_round_2)

            } catch (err) {
                console.log('Error pairing JSON', err)
            }


        }

    })



})


//////////////////////////////////////////////////////////
/////////// Given ID delete entire sign Object ///////////
//////////////////////////////////////////////////////////

app.post('/delete_sign_object', (req, res) => {
    count = 0
    let input_ID = req.body.id;
    input_ID = parseInt(input_ID)
    //console.log(input_ID)
    
    
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
                //console.log(count)
            } catch (err) {
                console.log('Error pairing JSON', err)
            }
    
        }
    
    })
    
})

/*
//////////////////////////////////////////////////////////////
/////////// Data Editing Logic for Signs objects /////////////
/////////////////////////////////////////////////////////////

// Put in a function so not to run when server restarts 
const Edit_Sign_Data = function () {

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
                            // add more items to be edited here
                            item.xy_coordinates = ""
                            json = JSON.stringify(data, null, 2); //convert it back to json
                            fs.writeFile('../server/database/database.json', json, 'utf8', callback);
                            function callback(err) {
                                //console.log(err)
                            }
                        }
                    }

                }
                console.log("Data has been updated")
                //console.log(count)
            } catch (err) {
                console.log('Error pairing JSON', err)
            }

        }

    })
}
*/

