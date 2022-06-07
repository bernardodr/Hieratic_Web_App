var express = require('express');
var download = require('image-downloader');
var app = express();
const API_PORT = 3000;

app.use(express.static('Client'));


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