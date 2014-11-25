app.controller("GameController", ['$scope','$filter', '$timeout','ApiFactory','$location',
	function(s,$filter,$timeout,api){
	s.Answers = [];
	s.QuestionCard;
	

	
	api.Authenticate()
	.then(function(){
		console.log("Setting up game");
		s.setupGame()
		.then(function(){
			s.SetupSockets();
		})
	});
	
	
	s.setupGame = function()
	{
		return api.GetCurrentGame()
				.then(function(httpData){
					game = httpData.data;
					s.QuestionCard = game.currentQuestion;
					s.Answers = game.currentAnswers;	
				});
	}

	s.SetupSockets = function()
	{
		var socket = io.connect();
		socket.on('NewQuestion', function(question){
			s.$apply(function(){
				s.QuestionCard = question;
			});
		});
		socket.on('Answers', function(answers){
			s.$apply(function(){
				s.Answers = answers;
			});
		});
	}
}]);