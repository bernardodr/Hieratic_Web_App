const { ChildProcess } = require('child_process');
const { spawn } = require('child_process');
const express = require('express');
const multer = require('multer');
const uuid = require('uuid').v4;


/// 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        const { originalname } = file;
        // or 
        // uuid, or fieldname see 9.00 in for unique naming system (https://youtu.be/ysS4sL6lLDU?t=544)
        cb(null, 'upload.png')
        OCR_FFT_RUN();
    }
});

const upload = multer({ storage: storage});
const app = express();
const API_PORT = 3000;


app.use(express.static('../Client'));


// tell the server to listen on the given port and log a message to the console (so we can see our server is doing something!)
app.listen(API_PORT, () => {
	console.log(`Listening on localhost:${API_PORT}`)
});


//////////////////////////////////////////////////////////
/////////////////// POST image upload //////////////////// 
//////////////////////////////////////////////////////////

var imageData = ""
var imageJSON = null

//Original

app.post('/upload', upload.single('hieraticSign'), (req, res) =>{
    //return res.send(+'<a href="/index.html"> </a>')
    // turn below back on
    
    res.redirect('http://localhost:3000/pages/ocr_system.html')
    // put results on new page by sending HTML file 
    //OCR_FFT_RUN()


    //res.sendFile(imageJSON.image1)
    
});

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
            "image1": imageData[0].toString(),
            "image2": imageData[1],
            "image3": imageData[2],
            "image4": imageData[3],
            "image5": imageData[4]
        };
        imageData = imageData[0].toString();
        //console.log(imageJSON);
        //return console.log(imageData)
    })

    // handel errors
    childPython.stderr.on('data', (data) => {
        console.log(`stderr: + ${data}`);
    })

    childPython.on('close', (code) => {
        console.log(`process exited with code: + ${code}`);
    })
    
};

//////////////////////////////////////////
//// Get, send image file/s to client ////
//////////////////////////////////////////

app.get('/results1', (req, res) => {
    
    //res.status(200).json(imageData);

    //orginal 
    //res.sendFile(imageData);

    // test to see if format works
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

