const { ChildProcess } = require('child_process');
var express = require('express');
var download = require('image-downloader');
var app = express();
const API_PORT = 3000;

app.use(express.static('../Client/'));


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
////////////////// Child Spawn Method() ////////////////// 
//////////////////////////////////////////////////////////


// 1. node.js calls python script and passes name
// 2. python script prints hello + name
// 3. log result 

const { spawn } = require('child_process'); 
// const { Script } = require('vm');
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
