var express = require('express');
const bodyParser = require('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
const chatRoute = require('./routes/chatRoute')
const messageRoute = require('./routes/messageRoute')
const mongoose = require('mongoose');
var indexRouter = require('./routes/index');
const productRoute = require('./routes/productRoute')

const passport = require('passport')
var app = express();
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
const cors = require('cors')
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
  allowedHeaders: ['Content-Type', 'Authorization', 'data']
}

app.use(cors(corsOptions))

app.use(passport.initialize())
require("./security/passport")(passport)
mongoose.connect(process.env.URL_DB).then(() => console.log("CONNECTED")).catch(err => console.log(err))
app.use('/FarmerToConsumer', indexRouter);
app.use("/api/chat", chatRoute)
app.use('/api/message', messageRoute)
app.use('/api/rating', productRoute)




var http = require('http');
var server = http.createServer(app);

var io = require('socket.io')(server, {
  pingTimeOut: 60000,
  cors: {
    origin: "http://localhost:3000"
  }
});

io.on('connection', function (socket) {
  console.log('connected to socket.io');
  socket.on('setup', (userData) => {
    socket.join(userData.id);
    socket.emit("connected");
  });
  socket.on('join chat', (room) => {
    socket.join(room);
    console.log("user joined room" + room);
  });

  socket.on('typing', (room) => socket.in(room).emit("typing"));
  socket.on('stop typing', (room) => socket.in(room).emit("stop typing"));


  socket.on('new message', (newMessageReceived) => {
    var chat = newMessageReceived.chat;
    if (!chat.users) return console.log("chat.users not defined");
    chat.users.forEach(user => {
      if (user._id == newMessageReceived.sender._id) return;

      socket.in(user._id).emit("message received", newMessageReceived);

    })
  });
  socket.off("setup", () => {
    console.log("user disconnected");
    socket.leave(userData.id);
  })
});

server.listen(4000, function () {
  console.log('Server listening on port 4000');
});





module.exports = app;
