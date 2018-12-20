import * as express from 'express';

const app = express();
const port = 3000;

app.get('/' ,(req,res)=> res.send('hi there'));
app.listen(port , ()=>console.log(`Listen on port ${port}`))