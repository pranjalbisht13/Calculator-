var express = require('express');
var socket = require('socket.io')
// Application Setup

var app = express();
// creating server with port number
var port = process.env.PORT||3000
var server = app.listen(port,function(){
  console.log("App opened Successfully on port 3000 Open browser with localhost:3000");
});

app.use(express.static('Public'));

//  socket setting
var io = socket(server);

io.on('connection',function(socket){
  console.log('New User');

  socket.on('calculate',function(data){
    io.sockets.emit('calculate',data);

  });
});
