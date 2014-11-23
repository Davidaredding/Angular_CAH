app.factory('ApiFactory',['$http', 
	function($http){
		var fac = {};


		fac.GetCurrentGame = function()
		{
			return $http.get('/api/Game')
				.success(function(data){
					//console.log(data);
				});
		};

		

		return fac;

}]);