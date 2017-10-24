express = require('express'),
app = express(),
 http = require('http').Server(app),
 io = require('socket.io')(http);

var port = process.env.PORT || 2001;

app.use(express.static(__dirname));
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
