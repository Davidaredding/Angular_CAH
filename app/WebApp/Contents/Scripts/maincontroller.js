app.controller("GameController", ['$scope','$filter', '$timeout','ApiFactory',function(s,$filter,$timeout,api){
	s.Answers = [];
	s.QuestionCard;

	api.StartNewGame()
	.then(function(httpData){
		s.DrawCards();
	});
	
	
	
	s.DrawCards = function()
	{
		api.DrawQuestionCard()
		.then(function(httpData){
			s.QuestionCard = httpData.data;	
			api.DrawAnswerCards(s.QuestionCard.numAnswers)
				.then(function(httpData){
					s.Answers = httpData.data;
				});
		});
		$timeout(s.DrawCards, 5000);
	}	
	

}]);