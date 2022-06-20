const { ChildProcess } = require('child_process');
const { spawn } = require('child_process');
const express = require('express');
const multer = require('multer');
const uuid = require('uuid').v4;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        const { originalname } = file;
        // or 
        // uuid, or fieldname see 9.00 in for unique naming system (https://youtu.be/ysS4sL6lLDU?t=544)
        cb(null, 'upload.png');
    }
});

const upload = multer({ storage: storage});
const app = express();
const API_PORT = 3000;


app.use(express.static('../Client'));

// Ben are you still using the download function??
//function which takes in URL of image and downloads it to filepath destination
function downloadImage(url, filepath) {
    return download.image({
       url,
       dest: filepath 
    });
}

// tell the server to listen on the given port and log a message to the console (so we can see our server is doing something!)
app.listen(API_PORT, () => {
	console.log(`Listening on localhost:${API_PORT}`)
});


//////////////////////////////////////////////////////////
/////////////////// POST image upload //////////////////// 
//////////////////////////////////////////////////////////


var imageData = ""


app.post('/upload', upload.single('hieraticSign'), (req, res) =>{
    //return res.send(+'<a href="/index.html"> </a>')
    res.redirect('http://localhost:3000/pages/ocr_system.html')
    OCR_FFT_RUN();
    // OCR_FFT_ONLY_RESULTS();
    //res.send(imageData)
    //return res.send('<h3>Your image was uploaded</h3> <a href="/index.html">click here to go back</a>')

    //return res.redirect('http://localhost:3000/pages/ocr_system.html')
    //return res.send('<h3>Your image was uploaded</h3> <a href="/index.html">click here to go back</a>')
    //return res.json({status: 'OK'})
    //res.status(200)//.send('User Creation Successful')
    
    //return res.status(200).send()
});



//////////////////////////////////////////////////////////
////////////////// Child Spawn Method() ////////////////// 
//////////////////////////////////////////////////////////


// 1. node.js calls python script and passes name
// 2. python script prints hello + name
// 3. log result 

// const { spawn } = require('child_process'); 
// var name = " Dan"

// //spawn command "send"
// const py = spawn('python3', ['py-script.py', `${JSON.stringify(name)}`])

// // recieve
// py.stdout.on('data', (data) => {
//     console.log(JSON.stringify(data.toString()))
// })

// // check if the process has finished 

// py.on('close', (code) => {
//     console.log(`success: code ${code}`);
// })


/////////////////////////////////////////////////////////////////
////////////////// Run OCR analysis /////////////////////////////
/////////////////////////////////////////////////////////////////

const OCR_FFT_RUN = function(){
    //spawn command "send"
    const childPython = spawn('python3',['OCR_FFT_Only.py']);

    // recieve
    childPython.stdout.on('data', (data) => {
        
        console.log(`stdout: + ${data}`);
         
        //console.log(JSON.stringify(data))
        imageData = eval(`(${data})`);
        imageData = imageData[0].toString();
        
        return console.log(imageData)
    })

    // handel errors
    childPython.stderr.on('data', (data) => {
        console.log(`stderr: + ${data}`);
    })

    childPython.on('close', (code) => {
        console.log(`process exited with code: + ${code}`);
    })
    
};
    

/////////////////////////////////
///// conver string to URL  /////
/////////////////////////////////

const stringURLConverter = function(imageData){
    imageData = imageData.toString();
}
    
// // Function to send OCR results to client

// var results = JSON.stringify({"imageOne": imageData})


const OCR_FFT_ONLY_RESULTS = function(){
       

};
app.get('/results', (req, res) => {
    
    
    //res.status(200).json(imageData);
    res.sendFile(imageData);
});

// app.get('/results/:imageData', (req, res) => {
//     let imageData = req.params.imageData;

//     if(results[imageData]){res.status(200).json(results[imageData]);}
//     else{res.status(404).send({error: 'Image not found'});}
//     //res.send({ img: imageData });
//  });