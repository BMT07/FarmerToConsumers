var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
const mongoose=require('mongoose');
var indexRouter = require('./routes/index');
const passport= require('passport')
var app = express();
const cors = require('cors')
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
const corsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }
  
  app.use(cors(corsOptions))

app.use(passport.initialize())
require("./security/passport")(passport)
mongoose.connect(process.env.URL_DB).then(()=>console.log("CONNECTED")).catch(err=>console.log(err))
app.use('/FarmerToConsumer', indexRouter);


module.exports = app;
