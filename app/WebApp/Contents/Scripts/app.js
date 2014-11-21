var app = angular.module('CAHTest',[]);
app.filter('stringReplaceFilter',function(){
	return function(text,target,replacement)
	{
		if(!text)
			return;
		return text.replace(new RegExp(target,'g'),replacement);
	}

});