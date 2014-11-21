var http = require('https')
var MongoClient = require('mongodb').MongoClient;

//get all cards from Hangouts against humanity


var CAH_url = 'https://raw.githubusercontent.com/samurailink3/hangouts-against-humanity/master/source/data/cards.js';
var dbName = "CardsAgainstHumanity";
var mongoAddress = "mongodb://localhost:27017/"+dbName;
var collectionname = "cards";

var cards = [];

GetCards();

function GetCards()
{
	console.log("Fetching card data...");
	http.get(CAH_url,
		function(response){
			var data = '';
			response.on('data',function(chunk){process.stdout.write('#'); data+=chunk});
			response.on('end', function(){
				console.log("  all data received"); 
				data = data.replace("masterCards = ","");
				data = data.replace(/\\/g, "\\\\");
				data = data.replace(/\\"/g, "\\\\\"");
				cards = JSON.parse(data);
				console.log("Received " + cards.length + " cards.");
				updateDatabase(cards);
			});
		})
	.end();

}

function updateDatabase(data)
{
	console.log("Opening connection to db on port 27017");
	MongoClient.connect(mongoAddress,function(err,db){
		if(err){ console.log("Error connecting to the DB"); return;}
		console.log("Connected to database");
		console.log("Creating collection "+ collectionname);
		db.createCollection(collectionname, function(err,collection){
			if(err){console.log("Error with collection : "); console.log(err); return;}
			console.log("Inserting " + data.length + " cards");
			collection.insert(data,{w:1},function(err,result){
				
			});
		});

	});
}

