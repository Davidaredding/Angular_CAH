//Api Controller
var db = require('./DataAccess');
var Q = require('q');
var gameModel = require('./Models/Game');

function shuffle(a){
			var m = a.length, t, i;

	  // While there remain elements to shuffle
		  while (m) {
		    // Pick a remaining element…
		    i = Math.floor(Math.random() * m--);

		    // And swap it with the current element.
		    t = a[m];
		    a[m] = a[i];
		    a[i] = t;
		  }
		  return a;
	}


module.exports = function(router){
	//Games = []
	game = null;
	router.route('/Game')
		.get(function(req,res) //Gets the current game
		{
			if(!game)
				res.status(404).send("Could not find an active game");
			else
				res.json(game.ToSimple());
		})
		.post(function(req,res) //Creates the current game
		{
			Create_Game()
			.then(function(){
				res.status(200).send("Game Succesfully Created");
			});
		});
	router.route('/Game/DrawAnswerCards/:count')
		.get(function(req,res){
			res.json(Draw_AnswerCards(req.params.count));
		});
	router.route('/Game/DrawQuestionCard')
		.get(function(req,res){
			Draw_Question();
			res.json(game.currentQuestion)
		});
		


	function Create_Game()
	{
		return CreateNewGame();
	}

	function Draw_Question()
	{

		if(!game)
			return null;

		if(game.currentQuestion != null)
		{
			game.question_discard.push(game.currentQuestion);
			game.currentQuestion = null;
		}

		if(game.questions.length<=0)
		{
			game.questions = shuffle(game.question_discard);
			game.question_discard = [];
		}

		var question = game.questions.pop();
	
		game.currentQuestion =  question;
	}

	function Draw_AnswerCards(count)
	{
		if(!game)
			return null;
		count = count<=0?1:count;
		if(game.currentAnswers.length>0)
		{
			for (var i = 0; i < game.currentAnswers.length; i++) {
				game.answers_discard.push(game.currentAnswers[i]);
			};
			game.currentAnswers = [];
		}

		if(game.answers.length <=count)
		{
			game.answers = shuffle(game.answers_discard);
			game.answers_discard = [];
		}
		var retval = [];
		
		for (var i = 0; i < count; i++) {
			var card = game.answers.pop();
			retval.push(card);
			game.currentAnswers.push(card);
		};
		return retval;
	}

	/*  Helper Methods */ 
	function CreateNewGame()
	{
		game = new gameModel({active:true});
		return db.FetchQuestions()
		.then(function(cards){
			console.log("Fetching Questions");
			game.questions = shuffle(cards);
		})
		.then(db.FetchAnswers)
		.then(function(cards){
			console.log("Fetching Answers");
			game.answers = shuffle(cards);
		})
		.then(function(){
			game.id="abc"
			game.active = true;
			console.log("Finished creating game");
		})
		.fail(function(error){
			console.log(error);
		});
	}
	
};