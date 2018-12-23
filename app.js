let express = require("express")
let path = require("path");

const app = express();
const port = 3000;

app.get('/', function (req, res) {
    const p = path.join(__dirname, './server/index.html');
    res.sendFile(p);
});

// send main js file
app.get('/dist/bundle.js', function (req, res) {
    const p = path.join(__dirname, './dist/bundle.js')
    res.sendFile(p);
});

//send main css file
app.get('/css/style.css', function (req, res) {
    const p = path.join(__dirname, './server/css/style.css')
    res.sendFile(p);
});

app.listen(port, () => console.log("Listen on port " + port))