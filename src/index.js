import express from 'express';
import cors from 'cors';
const port = process.env.PORT || 3000;
const app = express();


app.get('/', (req, res) => {
    console.log('new request has arrived');
    res.send("<h1 style='color: blue'>hello from the server main page </h1>");
});