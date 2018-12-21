import express from 'express';
import { join } from 'path';


const app = express();
const port = 3000;



app.get('/', function (req, res) {
    const path = join(__dirname, '../www/index.html');
    // console.log(path);
    res.sendFile(path);
});

app.get('/dist/bin/main.js', function (req, res) {
    const path = join(__dirname, './bin/main.js')
    // console.log(path);
    res.sendFile(path);
});

app.get('/js/require.js', function (req, res) {
    const path = join(__dirname, '../www/js/require.js')
    console.log(path);
    res.sendFile(path);
});

app.listen(port, () => console.log(`Listen on port ${port}`))