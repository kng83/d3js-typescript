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


const sql = require('mssql');


// app.get('/bobo',(req,res)=>{
//     console.log(req.query);
//     let me = req.query;
//   //  if(me['Name']!== undefined && me['Age']!==undefined){
//     //    sql.connect('mssql://sa:12345@localhost:49714/Pyszczek')
//         // const second =  sql.query(
//         //     `INSERT INTO [Pyszczek].[dbo].[First]
//         //      VALUES (${me['Name']},${me['Age']});`
//         // )
// //    }
//     res.sendFile(path.join(__dirname, './server/index.html'))
// })


//**** Check data base


(async () => {
    try {
        await sql.connect('mssql://sa:12345@localhost:49714/Pyszczek'); //
        const result = await sql.query(
            `SELECT TOP 5
                [Name],[Age]
                FROM [Pyszczek].[dbo].[First]`);
        console.log(result.recordset);

        const second = await sql.query(
            `INSERT INTO [Pyszczek].[dbo].[First]
             VALUES ('Puszek',1);`//
        )

    } catch (err) {
        // ... error checks
        console.log(err.message);//
    }
})();

app.listen(port, () => console.log("Listen on port " + port))