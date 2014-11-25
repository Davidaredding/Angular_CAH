//Api Controller
var db = require('../Config/DataAccess');
var Q = require('q');
var gameModel = require('../Models/Game');

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


module.exports = function(router, io){
	//Games = []
	game = null;
	router.route('/Game')
		.get(function(req,res) //Gets the current game
		{
			console.log(req.session.user);
			StartCycle();
			res.json(game.ToSimple());	
		});
	router.route('/login')
		.get(function(req,res){
			!req.session.user?res.status(401).send("User Not Authenticated"):res.status(200).send(req.session.user);
		})
		.post(function(req,res){
			req.session.user = req.body.user;
			res.status(200).send("User  "+ req.body.user + " recognized");
		});		
	router.route('/logoff')
		.post(function(req,res){
			req.session.destroy();
		});

	function StartCycle()
	{
		if(game)
			return;	
		
		Create_Game()
		.then(function(){
			cycle();
		});
	
	}

	function cycle()
	{
		Draw_Question();
		Draw_AnswerCards(game.currentQuestion.numAnswers);
		setTimeout(cycle,3000);
	}

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
		io.emit('NewQuestion', question);
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
		io.emit("Answers", retval);
		return retval;
	}

	/*  Helper Methods */ 
	function CreateNewGame()
	{
		if(game)
			return;
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