let express = require("express")
let path = require("path");

const app = express();
const port = 3000;

app.get('/', function (req, res) {
    const p = path.join(__dirname, './server/index.html');
    res.sendFile(p);
});

app.get('/dist/bundle.js', function (req, res) {
    const p = path.join(__dirname, './dist/bundle.js')
    res.sendFile(p);
});


//**** Check data base
const sql = require('mssql');

(async () => {
    try {
        await sql.connect('mssql://sa:12345@localhost:49714/Pyszczek');
        const result = await sql.query(
            `SELECT TOP 1000 
                [Name],[Age]
                FROM [Pyszczek].[dbo].[First]`);
        console.log(result.recordset);

        // sql.query(`INSERT INTO
        //     [Pyszczek].[dbo].[First]
        //     VALUES (Zuzia, 1)`)
    } catch (err) {
        // ... error checks
        console.log(err.message);//
    }
})();

app.listen(port, () => console.log("Listen on port " + port))