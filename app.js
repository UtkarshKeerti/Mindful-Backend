const express = require('express');
require('dotenv/config');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')

app.use(bodyParser.json());

// app.use(cors({
//   origin: "*"
// }))

app.use(function (req, res, next) {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
});


// Connect to DB
mongoose.connect(process.env.DB_URI)
  .then((data) => console.log(`Connected with DB: ${data.connection.host}`))
  .catch((err) => console.log('Error in DB Connection', err));


//Routes
app.use('/api', require('./src/routers/api'));


// Listening to the server
app.listen(process.env.SERVER_PORT, () => console.log('Server listening on port: ', process.env.SERVER_PORT))