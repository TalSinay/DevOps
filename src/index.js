const express = require('express');

const port = process.env.PORT || 3000;
const app = express();


app.get('/', (req, res) => {
    console.log('new request has arrived');
    res.send("<h1 style='color: blue'>hello from the server main </h1>");
});

app.listen(port,()=>
{
    console.log("server is up and run in port" + port) ;
});