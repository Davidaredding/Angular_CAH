app.service('ApiFactory',['$location','$http', 
	function($location,$http){
	
		var fac = {};
		fac.GetCurrentGame = function()
		{
			return $http({
					url:'/api/Game'
					,method:'GET'
				})
				.success(function(data){
					
				});
		};

		fac.Authenticate = function()
		{
			return $http.get('/api/Login')
			.error(function(data,status,heaers,config){
				$location.path('/Login' + $location.path());
			});
		}

		fac.Login = function(name)
		{
			return $http({
					method:'POST',
					url: '/api/Login',
					data:{
						user: name
					}
				});
				
		}

		fac.Logoff = function()
		{
			return $http({
				method:'POST',
				url: '/api/logoff'
			});
		}

		return fac;

}]);