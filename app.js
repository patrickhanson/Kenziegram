const express = require("express")
const multer = require("multer")
const fs = require("fs")

const publicPath = "public/uploads";
const port = 3000;

const app = express();
app.use(express.static(publicPath));
const upload = multer({ dest: publicPath })

const uploadedFiles = [];



app.listen(port);

app.get('/', function(req, res) {
    fs.readdir(publicPath, function(err, items) {
        console.log(items);
        res.send(`<h1>KenzieGram</h1>
            <form method="POST" action="/upload" enctype="multipart/form-data" id="uploadTool">
                <div>
                    <label for="newPhoto">Upload a Photo:</label>
                    <input type="file" id="newPhoto" name="newPhoto" accept="image/*"/>
                </div>
                <button type="submit" id="uploadButton">Upload!</button>
            </form>
            <div id=photoGallery>
                ${images(items)}
            </div>`
        );
    });
})

let images = function(items) {
    let gallery = ''
    for(let i = 0; i < items.length; i++) {
        gallery += `<img src="${items[i]}" width="300px">`
    }
    return gallery
}

app.post('/upload', upload.single("newPhoto"), function(req, res) {
        res.send(`<h1>KenzieGram</h1>
            <img src="${req.file.filename}" width="300px">
            <p>Success!</p>
            <a href="/">Back</a>`
        );
    });