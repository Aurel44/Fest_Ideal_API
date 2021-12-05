const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const cors =require('cors');
require('dotenv/config');

//Middlewares
app.use(cors());
app.use(bodyparser.json());
app.use(express.json());

//Import Routes
const bandsRoute = require('./routes/bands');
const authsRoute = require('./routes/auth');
app.use('/api/bands', bandsRoute);
app.use('/api/user', authsRoute);

//Connect to DB
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true },
  () => {
    console.log("Connected to DB!!!");
  }
);

//Call to server
app.listen(3000);
