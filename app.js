const express = require('express');
require('dotenv/config');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors')


// Middleware
app.use(bodyParser.json());
app.use(cors())


// Connect to DB
mongoose.connect(process.env.DB_URL)
  .then((data) => console.log(`Connected with DB: ${data.connection.host}`))
  .catch((err) => console.log('Error in DB Connection', err));


//Routes



// Listening to the server
app.listen(process.env.SERVER_PORT, () => console.log('Server listening on port: ', process.env.SERVER_PORT))