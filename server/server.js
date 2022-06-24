const { ChildProcess } = require('child_process');
const { spawn } = require('child_process'); // Allows for node python interaction 
const express = require('express');
const { rmSync } = require('fs');
const multer = require('multer'); // file upload middleware 
const uuid = require('uuid').v4; //unique image naming


// multer acts as middleware and stores in the client uploads in uploads directory
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        const { originalname } = file;
        // or 
        // uuid, or fieldname see 9.00 in for unique naming system (https://youtu.be/ysS4sL6lLDU?t=544)
        cb(null, 'upload.png')
        //OCR_FFT_RUN();
        
    }
});

const upload = multer({ storage: storage});
const app = express();
const API_PORT = 3000;

app.use(express.json());
app.use(express.static('../Client'));


// tell the server to listen on the given port and log a message to the console (so we can see our server is doing something!)
app.listen(API_PORT, () => {
	console.log(`Listening on localhost:${API_PORT}`)
});

//////////////////////////////////////////////////////////
/////////////////// Global Variables  //////////////////// 
//////////////////////////////////////////////////////////

var imageData = ""
var imageJSON = null
var imageName = ''


//////////////////////////////////////////////////////////
/////////////////// POST image upload //////////////////// 
//////////////////////////////////////////////////////////


app.post('/upload', upload.single('hieraticSign') ,(req, res) =>{
    
    /////////////////////////////////////////////////////////////////
    ////////////////// Run OCR analysis /////////////////////////////
    /////////////////////////////////////////////////////////////////
    const OCR_FFT_RUN = async function(){
        //spawn command "send"
        const childPython = spawn('python3',['OCR_FFT_Only.py']);
    
        // recieve
        childPython.stdout.on('data', (data) => {
            
            console.log(`stdout: + ${data}`);
             
            //console.log(JSON.stringify(data))
            imageData = eval(`(${data})`);
            
            imageJSON = {
                "image1": imageData[0],
                "image2": imageData[1],
                "image3": imageData[2],
                "image4": imageData[3],
                "image5": imageData[4]
            };

            imageNames = {
                "image1": imageData[0].toString(),
                "image2": imageData[1].toString(),
                "image3": imageData[2].toString(),
                "image4": imageData[3].toString(),
                "image5": imageData[4].toString()
            };
            
            //res.sendFile(imageJSON.image1)
            console.log(imageNames);
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


app.get('/results1', (req, res) => {
    res.sendFile(imageJSON.image1);
});

app.get('/results2', (req, res) => {
    res.sendFile(imageJSON.image2);
});

app.get('/results3', (req, res) => {
    res.sendFile(imageJSON.image3);
});

app.get('/results4', (req, res) => {
    res.sendFile(imageJSON.image4);
});

app.get('/results5', (req, res) => {
    res.sendFile(imageJSON.image5);
});


///////////////////////////////////////////
///// Get, send image names to client /////
///////////////////////////////////////////

app.get('/imageName1', (req, res) => {
    res.send(imageJSON);
});

app.get('/imageName2', (req, res) => {
    res.send(imageJSON.image2);
});

app.get('/imageName3', (req, res) => {
    res.send(imageJSON.image3);
});

app.get('/imageName4', (req, res) => {
    res.send(imageJSON.image4);
});

app.get('/imageName5', (req, res) => {
    res.send(imageJSON.image5);
});


///////////////////////////////////////////////////////////////
/////////////////// Zip Database of Images //////////////////// 
///////////////////////////////////////////////////////////////

// app.get('/download', (req, res) => {

//     app.get('/download', function(req, res){
//         const file = `${__dirname}/Users/danielbernardo/Desktop/Dissteration Code/Hieratic_Web_App/README.md`;
//         res.download(file); // Set disposition and send it.
//       });

// })



