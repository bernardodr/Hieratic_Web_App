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






// multer acts as middleware and stores in the client uploads in uploads directory
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'database/Thesis_Dataset_Whole/')
    },
    filename: (req, file, cb) => {
        const { originalname } = file;
        // or 
        // uuid, or fieldname see 9.00 in for unique naming system (https://youtu.be/ysS4sL6lLDU?t=544)
        cb(null, 'TIMG_0000.png')
        //OCR_FFT_RUN();

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

        // recieve
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
                        match = Object.assign(text_Info,match);
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
                    match = Object.assign(text_Info,match);
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
                        match = Object.assign(text_Info,match);
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
                        match = Object.assign(text_Info,match);
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
                        match = Object.assign(text_Info,match);
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
        tokens()
    })

    const tokens = function () {
        //run tokens.py  
        const pythonTokens = spawn('python3', ['OCR_System/tokens.py']);

        // recieve
        pythonTokens.stdout.on('data', (data) => {

        });

        // handel errors
        pythonTokens.stderr.on('data', (data) => {
            console.log(`stderr: + ${data}`);
        });

        // when script finishes 
        pythonTokens.on('close', (code) => {
            console.log(`process exited with code: + ${code}`);
            console.log('Tokens was successful')
            classification()
        });
    };

    const classification = function () {
        //run tokens.py  
        const pythonClassification = spawn('python3', ['OCR_System/classification.py']);

        // recieve
        pythonClassification.stdout.on('data', (data) => {

        });

        // handel errors
        pythonClassification.stderr.on('data', (data) => {
            console.log(`stderr: + ${data}`);
        });

        // when script finishes 
        pythonClassification.on('close', (code) => {
            console.log(`process exited with code: + ${code}`);
            console.log('Classification was successful')
        });
    };

    //Validate the data has been succefully added 


};
//Uncomment to update database
//updateDataset()




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


//post function to upload labelled imaged to thesis_dataset_whole
app.post('/image_upload', (req, res) => {

    //get base64 image data from post request
    var base64Data = req.body.image
    //give image new title - gardiner sign, instance in facsimile and date in yyyy-mm-dd format. Toisostring converts date to appropriate format
    //upload_name = `${req.body.gardiner}_${req.body.text}_${req.body.facsimile}_instance(${req.body.instance}).png`
    upload_name =`${req.body.gardiner}_${req.body.instance}_${req.body.facsimile}_${req.body.text}_${req.body.period}.png`
    //writes file to image database. Buffer.from converts base64 data into image
    fs.writeFile(`../server/database/Thesis_Dataset_Whole/${upload_name}`, Buffer.from(base64Data, 'base64'), function (err) {
        if (err) throw err;
        console.log('Image Saved');

    });
    res.status(200).send(`${upload_name} has been uploaded to Thesis_Dataset_Whole`)

})


//post function to add json data of uploaded image to (test.json)
app.post('/json_upload', (req, res) => {


    //access request values from user inputted data
    var object =

    {
        Facsimile_Maker: req.body.facsimile,
        Text_Name: req.body.text,
        Text_Info: {
            Orignal_Author: req.body.author,
            Time_Period: req.body.period,
            Provenance: req.body.provenance,
            Signs: [{
                
                Gardiner_Sign: req.body.gardiner,
                Instance_In_Facsimile: req.body.instance,
                Image_Name: upload_name,
                Image_Path_Relative: `server/database/Thesis_Dataset_Whole/${upload_name}`
            }]

        }
    }

    sign_info = [{
    
        Gardiner_Sign: req.body.gardiner,
        Instance_In_Facsimile: req.body.instance,
        Image_Name: upload_name,
        Image_Path_Relative: `server/database/Thesis_Dataset_Whole/${upload_name}`
    }]

    //read in (test.json) file 
    let jsondata = fs.readFileSync("../server/database/newJSON.json", "utf-8");
    //parse actual json from string 
    let json = JSON.parse(jsondata);

    counter = 0
        for (i = 0; i < json.length; i++) {

            if (json[i].Facsimile_Maker == req.body.facsimile && json[i].Text_Name == req.body.text) {
                signs = json[i].Text_Info.Signs
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
    fs.writeFileSync("../server/database/newJSON.json", jsondata, "utf-8");
    res.status(200).send(`${upload_name} has been uploaded to JSON database`)
})

/*
app.post('/aspectRatio', (req, res) => {

aspect_ratio=req.body.aspect_Ratio;
console.log(aspect_ratio);


})
*/  

