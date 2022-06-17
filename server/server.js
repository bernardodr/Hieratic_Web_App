const { ChildProcess } = require('child_process');

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
        cb(null, originalname);
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

app.post('/upload', upload.single('hieraticSign'), (req, res) =>{
    //return res.send(+'<a href="/index.html"> </a>')
    return res.redirect('http://localhost:3000/pages/ocr_system.html')
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

const { spawn } = require('child_process'); 
var name = ""

//spawn command "send"
const py = spawn('python3', ['py-script.py', `${JSON.stringify(name)}`])

// recieve
py.stdout.on('data', (data) => {
    console.log(JSON.stringify(data.toString()))
})

// // check if the process has finished 

// py.on('close', (code) => {
//     console.log(`success: code ${code}`);
// })
