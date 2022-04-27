const express = require('express');
require('dotenv/config');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')

app.use(bodyParser.json());
app.use(cors())


// Connect to DB
mongoose.connect(process.env.DB_URL)
  .then((data) => console.log(`Connected with DB: ${data.connection.host}`))
  .catch((err) => console.log('Error in DB Connection', err));


//Routes
app.use('/api', require('./src/routers/api'));


// Listening to the server
app.listen(process.env.PORT, () => console.log('Server listening on port: ', process.env.PORT))