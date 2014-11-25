app.controller("LoginController", ['$location','$routeParams', '$scope','ApiFactory',
	function($location,params, s,api){
		s.Authenticate = function()
		{
			api.Authenticate()
			.then(function(data){
				
					s.isAuthenticated = true;
					s.loginUser = data;
				
			})
			.error(function(){
					s.isAuthenticated = false;
					s.loginUser = null;
			});
		}

		s.login = function()
		{
			api.Login(s.loginUser)
			.then(function(data){
				s.isAuthenticated = true;
				s.login = data;
				if(params && params.redirect)
					$location.path(params.redirect)
				else
					$location.path('/');
			});
		}
	}
]);