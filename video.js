var http = require('http');
var fs = require('fs');




http.createServer((req, res) => {
  console.log("your server runing at 2001")
  res.writeHead(200, {"Content-Type":'video/mp4'});
  var rs = fs.createReadStream("nodejs.mp4");
  rs.pipe(res);
}).listen(2001);