var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var port = process.env.PORT || 2001;


app.get('/', function(req, res){

  res.sendFile(__dirname + '/index.html');
});
var obj = {};
 io.on('connect', function(socket){
    console.log("connected");
       socket.on('game-manager', function(status){
           console.log("status",status)
          io.emit('game-manager', status);
      });
});

io.on('disconnect', () => {
    console.log("disconnect");
});


http.listen(port, function(){
  console.log('listening on *:' + port);
});
