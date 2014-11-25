var app = angular.module('CAHTest',['ngRoute']);

app.config(function($routeProvider, $locationProvider){
	$routeProvider
	.when('/',{
		 templateUrl : 'Contents/Features/Home/home.html'
		,controller: 'mainController'
		,caseInsensitiveMatch: true
	})
	.when('/Game',{
		 templateUrl: '/Contents/Features/Game/Game.html'
		,controller: 'GameController'
		,caseInsensitiveMatch: true
	})
	.when('/Login:redirect*',{
	 	 templateUrl: '/Contents/Features/Login/Login.html'
		,controller: 'LoginController'
		,caseInsensitiveMatch: true	
	});
	$locationProvider.html5Mode(true);
});


app.controller('mainController',function($scope){
	$scope.message="Everyone come see how awesome I am!";
});



app.filter('stringReplaceFilter',function(){
	return function(text,target,replacement)
	{
		if(!text)
			return;
		return text.replace(new RegExp(target,'g'),replacement);
	}

});