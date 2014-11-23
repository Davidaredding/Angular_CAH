app.controller("GameController", ['$scope','$filter', '$timeout','ApiFactory',
	function(s,$filter,$timeout,api){
	console.log(socket);
	s.Answers = [];
	s.QuestionCard;

	
	api.GetCurrentGame()
	.then(function(httpData){
		game = httpData.data;
		s.QuestionCard = game.currentQuestion;
		s.Answers = game.currentAnswers;	

	});
	
	

	/*var socket = io();
	 function test(txt)
	 {
	 	socket.emit('TestMessage',txt);
	 	return;
	 }
	 socket.on('TestMessage',function(msg){
	 	console.log(msg);
	 });
	)*/
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

	
	/*s.DrawCards = function()
	{
		api.DrawQuestionCard()
		.then(function(httpData){
			s.QuestionCard = httpData.data;	
			api.DrawAnswerCards(s.QuestionCard.numAnswers)
				.then(function(httpData){
					s.Answers = httpData.data;
				});
		});
		//$timeout(s.DrawCards, 5000);
	}*/	
	

}]);