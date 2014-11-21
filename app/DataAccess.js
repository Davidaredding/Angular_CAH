var mongo_client = require('mongodb').MongoClient;
var CONFIGURATION = require('./Config');
var Q = require('q');

module.exports = {
	FetchAnswers: function()
	{
		deferred = Q.defer();
		mongo_client.connect(CONFIGURATION.db_connection,function(err,db){
			if(err) deferred.reject(new Error(err));
			var collection = db.collection("cards");
			
			collection.find({cardType:'A'}).toArray(function(err,db_cards){
				if(err) deferred.reject(new Error(err));
				deferred.resolve(db_cards);
			});
		});
		return deferred.promise
	},
	FetchQuestions: function()
	{
		deferred = Q.defer();
		mongo_client.connect(CONFIGURATION.db_connection,function(err,db){
			if(err) deferred.reject(new Error(err));
			
	
			var collection = db.collection("cards");
			
			collection.find({cardType:'Q'})
				.toArray(function(err,db_cards){
				if(err)deferred.reject( new Error(err));
					deferred.resolve(db_cards);
				});
		});

		return deferred.promise;		
	}
}