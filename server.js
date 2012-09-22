var PORT = 8080;

var express = require('express');
var app = express()
  , http = require('http')
  , server = http.createServer(app)
  , io = require('socket.io').listen(server);

server.listen(PORT);

app.use('/js', express.static(__dirname + '/js'));
app.use('/css', express.static(__dirname + '/css'));

app.get('/', function (req, res) {
  res.sendfile('index.html');
});

io.configure(function() {
  io.set('log level', 1);
});

var session;

io.sockets.on('connection', function(socket) {

});
