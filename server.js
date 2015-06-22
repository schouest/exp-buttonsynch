var express = require("express");
var path = require("path");
var app = express();
var count = 0;

// static content (disabled)
//app.use(express.static(path.join(__dirname, "./static")));

// setting up ejs and our views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

// root route to render the index.ejs view
app.get('/', function(req, res) {
 res.render("index");
})

var server = app.listen(8000, function() {
 console.log("listening on port 8000");
})

var io = require('socket.io').listen(server);

// When a connection event happens (connection event is built in) run the following code
io.sockets.on('connection', function (socket) {
  console.log('Socket ID:',socket.id);
  //all the socket code goes in here!
 	socket.on("button_click", function (data){
 		count++;
 		io.emit('update_counter', {counter: count});

	})
	socket.on("button_reset", function (data){
 		count = 0;
 		io.emit('update_counter', {counter: count});

	})

	socket.on("new_view", function (data){
 		socket.emit('update_counter', {counter: count});
	})
})
