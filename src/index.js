const express = require('express');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;
const app = express();
const registerRouter = require('./register.js');

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/register', registerRouter);

app.get('/', (req, res) => {
  console.log('new request has arrived');
  res.send("<h1 style='color: blue'>Hello from the server </h1> <br><br> <a href='/register'>Go to the register page</a>");
});

app.listen(port, () => {
  console.log('Server is up and running on port', port);
});

module.exports = app;
