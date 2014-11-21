app.factory('ApiFactory',['$http', 
	function($http){
		var fac = {};

		fac.StartNewGame = function()
		{
			return $http.post('/api/Game')
				.success(function(data){
					//console.log(data);
				});
		};

		fac.GetCurrentGame = function()
		{
			return $http.get('/api/Game')
				.success(function(data){
					//console.log(data);
				});
		};

		fac.DrawQuestionCard = function()
		{
			return $http.get('/api/Game/DrawQuestionCard')
				.success(function(data){
					
				});
		};

		fac.DrawAnswerCards = function(numOfCards)
		{
			return $http.get('/api/Game/DrawAnswerCards/'+numOfCards)
				.success(function(data){
					//console.log(data);
				});
		};

		return fac;

}]);