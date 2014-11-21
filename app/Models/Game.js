var Game = function()
{
	
	this.id = null;
	this.currentQuestion =null;
	this.questions =[];
	this.question_discard =[];
	this.answers = [];
	this.answers_discard =[];
	this.active = false;
	this.currentAnswers = [];
	
}

Game.prototype.ToSimple = function()
	{
		var retval =  
		{
			"id": this.id,
			"currentQuestion": this.currentQuestion,
			"questions": this.questions.length,
			"answers": 	this.answers.length,
			"question_discard": this.question_discard.length,
			"answers_discard": this.answers_discard.length,
			"active": this.active,
			"currentAnswers" : this.currentAnswers
		};

		return retval;
	};

module.exports = Game;