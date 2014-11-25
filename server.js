var express = require('express'); // load express
var app 	= express();		  // get an instance of express
var http 	= require('http').Server(app);
var bodyParser = require('body-parser'); //load body parser for json data parsing
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');

var io 		= require("socket.io")(http);
var port 	= process.env.PORT || 8080; // Set the server port;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(cookieSession(
	{
		 secret:"I am a zimbabwi!"
		,maxAge  : new Date(Date.now() + 3600000) //1 Hour
    	,expires : new Date(Date.now() + 3600000) //1 Hour
	}));

//Route handler that ignores static content like JS & CSS files
app.use(express.static(__dirname + '/WWW'));


var api_router = express.Router();
var app_router = express.Router();

api_router.use(function(req,res,next){
	console.log('API Route - \'' + req.method + '\' ' + req.url);
	next(); //allows the route to continue
});

app_router.get('/Contents/*',function(req,res){
	res.sendFile(__dirname + req.url);
});

app_router.use(
	function(req,res,next)
	{
		console.log("Direct request for " + req.url + " was redirected to /#"+req.url);
		res.redirect('/#'+req.url);
		
	}
);

var api_controller = require('./Controllers/APIController.js')(api_router,io);


app.use('/api',api_router); //all routes that begin with /api
app.use('/',app_router);


/*io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('TestMessage',function(msg){
  	io.emit('TestMessage', "A Message: " + msg);
  });
});*/

http.listen(port,function(){
	console.log('Server running on port: ' + port);	
}); //starts the router
