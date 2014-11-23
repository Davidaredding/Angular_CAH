var express = require('express'); // load express
var app 	= express();		  // get an instance of express
var http 	= require('http').Server(app);
var bodyParser = require('body-parser'); //load body parser for json data parsing

var io 		= require("socket.io")(http);
var port = process.env.PORT || 8080; // Set the server port;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/WebApp'));

var api_router = express.Router(); 		//Set up routing  with an instnace of the epress router;
var app_router = express.Router();

api_router.use(function(req,res,next){
	console.log('API Route - \'' + req.method + '\' ' + req.url);
	next(); //allows the route to continue
});

app_router.use(function(req,res,next){
	console.log('App Route - \'' + req.method + '\' ' + req.url);
	next();
});

var api_controller = require('./APIController.js')(api_router,io);
//var app_controller = require('./AppController.js')(app_router);

app.use('/api',api_router); //all routes that begin with /api
//app.use('/',app_router);


/*io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('TestMessage',function(msg){
  	io.emit('TestMessage', "A Message: " + msg);
  });
});*/




http.listen(port,function(){
	console.log('Server running on port: ' + port);	
}); //starts the router
