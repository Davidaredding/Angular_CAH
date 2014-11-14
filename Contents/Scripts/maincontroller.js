app.controller("GameController", ['$scope','$http','$filter', '$timeout',function(s,$http,$filter,$timeout){
	s.cards;
	s.Questions;
	s.Answers = [];
	
	s.QuestionCard;
	s.AnswerCards = [];
	s.questionDiscard = [];
	s.answerDiscard = [];
	s.DrawQuestion = function()
	{
		if(this.QuestionCard)
			this.DiscardQuestion();
		var c = this.Questions.pop(1);
		if(!c)
		{
			console.log("Reshuffling Questions");
			s.Questions = this.shuffleCards(s.questionDiscard);
			s.questionDiscard = [];
			c=s.Questions.pop(1);
		}
		this.QuestionCard = c;
	};

	s.DrawAnswers = function(numberOfAnswers)
	{
		if(this.AnswerCards.length>0)
			this.DiscardAnswers();
		numberOfAnswers<=0?numberOfAnswers = 1:numberOfAnswers;
		for (var i = 0; i < numberOfAnswers; i++) {
			var c = s.Answers.pop();
			if(!c)
			{
				console.log("Reshuffling Answers");
				s.Answers = this.shuffleCards(s.answerDiscard);
				s.answerDiscard = [];
				c = s.Answers.pop();
			}
			s.AnswerCards.push(c);
		};

	}

	s.shuffleCards = function(array)
	{
	 var m = array.length, t, i;

	  // While there remain elements to shuffle
	  while (m) {
	    // Pick a remaining element…
	    i = Math.floor(Math.random() * m--);

	    // And swap it with the current element.
	    t = array[m];
	    array[m] = array[i];
	    array[i] = t;
	  }

	  return array;
	};

	s.DiscardQuestion = function()
	{
		s.questionDiscard.push(s.QuestionCard);
		s.QuestionCard = null;
	};
	s.DiscardAnswers = function()
	{

		angular.forEach(s.AnswerCards, function(a,i){s.answerDiscard.push(a)});
		s.AnswerCards = [];
	}

	s.cardMarginFromIndex = function(index)
	{
		return ""+index * 100+"px";
	}

	$http.get('node_modules/cah-cards/cards.json')
		.success(function(data)
		{
			s.cards = s.shuffleCards(data)
			s.Questions = $filter('filter')(s.cards,function(value,index){if(value.cardType=='Q')return true;});
			s.Answers = $filter('filter')(s.cards,function(v,i){if(v.cardType==='A')return true;});
			s.AutoDraw();
			
		})
		.error(function(err){
			console.log(err);
		});
	
	s.AutoDraw = function(){
		s.DrawQuestion();
		s.DrawAnswers(s.QuestionCard.numAnswers);

		$timeout(s.AutoDraw,3000+(2000*s.QuestionCard.numAnswers));
	}
}]);