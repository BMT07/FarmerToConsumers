var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
const mongoose=require('mongoose');
var indexRouter = require('./routes/index');
const passport= require('passport')
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(passport.initialize())
require("./security/passport")(passport)


mongoose.connect(process.env.URL_DB).then(()=>console.log("CONNECTED")).catch(err=>console.log(err))

// Set View Engine
app.set('view engine', 'ejs');

app.use('/FarmerToConsumer', indexRouter);
app.use("/password", require("./routes/password"));


module.exports = app;
