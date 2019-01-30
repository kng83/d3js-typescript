let express = require("express")
let path = require("path");
const sql = require('mssql');
let sqlConnected;

const app = express();
const port = 3000;

app.get('/bobo', (req, res) => {
    console.log(req.query);
    let queryElement = req.query;
    if (queryElement && queryElement['Name'] !== undefined && queryElement['Age'] !== undefined) {
        let age = parseInt(queryElement['Age']);
        let name = `\'${queryElement['Name']}\'`;
        sql.query(
            `INSERT INTO [Pyszczek].[dbo].[First]
             VALUES (${name},${age});`
        ).then(value => console.log(value))
            .catch(e => console.log(e.message));

    }


    res.send('some')
})
app.get('/', function (req, res) {
    const p = path.join(__dirname, './server/index.html');
    res.sendFile(p);
});

app.get('/dist/bundle.js', function (req, res) {
    const p = path.join(__dirname, './dist/bundle.js')
    res.sendFile(p);
});
//

//**** Check data base


(async () => {
    try {
        sqlConnected = await sql.connect('mssql://sa:12345@localhost:49714/Pyszczek');

        const result = await sqlConnected.query(
            `SELECT TOP 10 *
             FROM [Pyszczek].[dbo].[First]
                ORDER BY id desc;`);

        console.log(result.recordset, 's');

    } catch (err) {
        // ... error checks
        console.log(err.message);//
    }
})();

app.listen(port, () => console.log("Listen on port " + port))