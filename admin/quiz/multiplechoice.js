

// TODO move MC-template into here as a string, oh well

function MC(data, location, questionNumber) {
	this.myClass = "MultipleChoice";
			
			
	// questionNumber is the index of the question -- hopefully goes away?
	this.num = questionNumber;

	this.content = {};
	this.properties = {};
	this.correctResponse = [];
	this.choices = [];
	this.attempts = [];
	this.states = [];

	this.interaction = $(data);
	//this.responseDec = $($(".responseDeclaration")[this.num]);
	var rii = this.interaction.attr("responseIdentifier");
	this.responseDec = $('.responseDeclaration[identifier="' + rii + '"]');
	

	// save this MC dom element
	this.multipleChoice = $(location);
	
	// make a copy of the template
	var template = this.getTemplate();
	this.multipleChoice.html(template);

	//boolean to prevent shuffling after each answer submit
	this.previouslyRendered = false;
	

			
}



MC.prototype.loadContent = function() {
	var choices = this.choices;
	var i;
	this.interaction.find('.choice').each(function() {
		var elem = $(this);
		var choice = {
			identifier : elem.attr('identifier'),
			text : elem.find('.text').html(),
			feedback : elem.find('.feedback').html()
		};
		choices.push(choice);
	});

	// get user interaction information
	this.content.prompt = this.interaction.find('.prompt').html();
	this.properties.shuffle = (this.interaction.attr('shuffle') == "true");
	this.properties.maxChoices = this.interaction.attr('maxchoices');

	// get the list of correct responses
	var corrResponses = this.responseDec.find('.correctResponse');

	for ( i = 0; i !== corrResponses.length; i++) {
		this.correctResponse.push($(corrResponses[i]).attr('identifier'));
	}

};

//gets and returns a choice object given the choice's identifier
MC.prototype.getChoiceByIdentifier = function(identifier) {
	var i;
	for ( i = 0; i < this.choices.length; i++) {
		if (this.removeSpace(this.choices[i].identifier) == identifier) {
			return this.choices[i];
		}
	}
	return null;
};

MC.prototype.displayNumberAttempts = function(part1, part2, states) {
	var nextAttemptNum = states.length + 1;
	var nextAttemptString = "";
	if (Math.floor(nextAttemptNum / 10) == 1) {
		nextAttemptString = nextAttemptNum + "th";
	} else if (nextAttemptNum % 10 == 1) {
		nextAttemptString = nextAttemptNum + "st";
	} else if (nextAttemptNum % 10 == 2) {
		nextAttemptString = nextAttemptNum + "nd";
	} else if (nextAttemptNum % 10 == 3) {
		nextAttemptString = nextAttemptNum + "rd";
	} else {
		nextAttemptString = nextAttemptNum + "th";
	}
	this.multipleChoice.find('.numberAttemptsDiv').html(part1 + " " + nextAttemptString + " " + part2 + ".");
};

MC.prototype.tryAgain = function(e) {
	if (this.multipleChoice.find(".tryAgainButton").hasClass("disabledLink")) {
		return;
	}
	this.render();
};

/**
 * Render the MC
 * Nate: plan is to have the mc-single-template.body in the html currently, and pull
 * pieces from the data model (that the author makes) into the template
 */
MC.prototype.render = function() {
	var i, type, choiceHTML;
	if (!this.previouslyRendered) {
		//$('.MultipleChoice').html(pageTemplate);

		/* set the question type title */
		//if (this.num == 0) {
		this.multipleChoice.find('.questionType').html('Question ' + (this.num + 1));
		//} else {
		//this.multipleChoice.find('.questionType').html('');
		//}
	}

	/* render the prompt
	 */
	this.multipleChoice.find('.promptDiv').html(this.content.prompt);

	/* remove buttons */
        
	var radiobuttondiv = this.multipleChoice.find('.radiobuttondiv')[0];
	while (radiobuttondiv.hasChildNodes()) {
		radiobuttondiv.removeChild(radiobuttondiv.firstChild);
	}
        
	/*
	 * if shuffle is enabled, shuffle the choices when they enter the step
	 * but not each time after they submit an answer
	 */
	if (this.properties.shuffle && !this.previouslyRendered) {
		this.choices.shuffle();
	}

	/* set variable whether this multiplechoice should be rendered with radio buttons or checkboxes */
	if (this.properties.maxChoices == 1) {
		type = 'radio';
	} else {
		type = 'checkbox';
	}

	/* render the choices */
	for ( i = 0; i < this.choices.length; i++) {
		choiceHTML = '<table><tbody><tr><td>' + '<input type="' + type + '" name="radiobutton"' + ' id="' + this.removeSpace(this.choices[i].identifier) + '" value="' + this.removeSpace(this.choices[i].identifier) + '" class="' + type + '"/></td><td>' + '<div id="choicetext:' + this.removeSpace(this.choices[i].identifier) + '">' + this.choices[i].text + '</div></td><td><div id="feedback_' + this.removeSpace(this.choices[i].identifier) + '" name="feedbacks"></div></td></tr></tbody></table>';

		this.multipleChoice.find('.radiobuttondiv').append(choiceHTML);

		// TODO -- what are these doing?  need to move from id's to classes eventually...
		// Peter: I think this is actually okay
		$('#' + this.removeSpace(this.choices[i].identifier)).bind('click', {
			myQuestion : this
		}, function(args) {
			args.data.myQuestion.enableCheckAnswerButton('true');
		});
		if (this.selectedInSavedState(this.choices[i].identifier)) {
			$('#' + this.removeSpace(this.choices[i].identifier)).attr('checked', true);
		}

		this.multipleChoice.find(".checkAnswerButton").bind('click', {
			myQuestion : this
		}, function(args) {
			args.data.myQuestion.checkAnswer();
		});

		this.multipleChoice.find(".tryAgainButton").bind('click', {
			myQuestion : this
		}, function(args) {
			args.data.myQuestion.tryAgain();
		});
	}

	this.multipleChoice.find('.tryAgainButton').addClass('disabledLink');
	this.enableCheckAnswerButton('true');
	// should this be here??? TODO
	this.clearFeedbackDiv();

	if (this.correctResponse.length < 1) {
		// if there is no correct answer to this question (ie, when they're filling out a form),
		// change button to say "save answer" and "edit answer" instead of "check answer" and "try again"
		// and don't show the number of attempts.
		this.multipleChoice.find(".checkAnswerButton").innerHTML = "Save Answer";
		this.multipleChoice.find(".tryAgainButton").innerHTML = "Edit Answer";
	} else {
		this.displayNumberAttempts("This is your", "attempt", this.attempts);
	};

	if (this.states.length > 0) {
		//the student previously answered the question correctly
		var latestState = this.states[this.states.length - 1];
		//display the message that they correctly answered the question
		var resultMessage = this.getResultMessage(latestState.isCorrect);
		this.multipleChoice.find('.resultMessageDiv').html(resultMessage);
		if (latestState.isCorrect) {
			this.multipleChoice.find('.tryAgainButton').addClass('disabledLink');
		}

	}
	//turn this flag on so that the step does not shuffle again during this visit
	this.previouslyRendered = true;

	//this.node.view.eventManager.fire('contentRenderComplete', this.node.id, this.node);
};

/**
 * Determine if challenge question is enabled
 */
MC.prototype.isChallengeEnabled = function() {
	return false;
};

/**
 * Determine if scoring is enabled
 */
MC.prototype.isChallengeScoringEnabled = function() {
	var result = false;

	if (this.properties.attempts != null) {
		var scores = this.properties.attempts.scores;

		//check if there are scores
		result = challengeScoringEnabled(scores);
	}

	return result;
};

/**
 * Given a choiceId, checks the latest state and if the choiceId
 * is part of the state, returns true, returns false otherwise.
 *
 * @param choiceId
 * @return boolean
 */
MC.prototype.selectedInSavedState = function(choiceId) {
	var b, latestState;
	if (this.states && this.states.length > 0) {
		latestState = this.states[this.states.length - 1];
		for ( b = 0; b < latestState.length; b++) {
			if (latestState.choices[b] == choiceId) {
				return true;
			}
		}
	}

	return false;
};

/**
 * If prototype 'shuffle' for array is not found, create it
 */
if (!Array.shuffle) {
	Array.prototype.shuffle = function() {
		var rnd, tmp, i;
		for ( i = this.length; i; rnd = parseInt(Math.random() * i), tmp = this[--i], this[i] = this[rnd], this[rnd] = tmp) {
		}
	};
}

/**
 * Returns true if the choice with the given id is correct, false otherwise.
 */
MC.prototype.isCorrect = function(id) {
	var h;
	/* if no correct answers specified by author, then always return true */
	if (this.correctResponse.length == 0) {
		return true;
	};

	/* otherwise, return true if the given id is specified as a correct response */
	for ( h = 0; h < this.correctResponse.length; h++) {
		if (this.correctResponse[h] == id) {
			return true;
		}
	}
	return false;
};

/**
 * Checks Answer and updates display with correctness and feedback
 * Disables "Check Answer" button and enables "Try Again" button
 */
MC.prototype.checkAnswer = function() {
	if (this.multipleChoice.find('.checkAnswerButton').hasClass('disabledLink')) {
		return;
	}

	//clear the previous result message
	this.multipleChoice.find('.resultMessageDiv').html('');

	this.attempts.push(null);

	var inputbuttons = this.multipleChoice.find('.radiobuttondiv')[0].getElementsByTagName('input');
	var mcState = {};
	var isCorrect = true;
	var i, checked, choiceIdentifier, choice;

	/*
	 if (!this.enforceMaxChoices(inputbuttons)) {
	 return;
	 }*/

	this.enableRadioButtons(false);
	// disable radiobuttons
	this.multipleChoice.find('.checkAnswerButton').addClass('disabledLink');
	// disable checkAnswerButton
	this.multipleChoice.find('.tryAgainButton').removeClass('disabledLink');
	// show try again button
	for ( i = 0; i < inputbuttons.length; i++) {
		checked = inputbuttons[i].checked;
		choiceIdentifier = inputbuttons[i].getAttribute('id');
		// identifier of the choice that was selected
		// use the identifier to get the correctness and feedback
		choice = this.getChoiceByIdentifier(choiceIdentifier);
		if (checked) {
			if (choice) {
				this.multipleChoice.find('#feedback_' + choiceIdentifier).html(choice.feedback);

				var choiceTextDiv = this.multipleChoice.find(".choicetext:" + choiceIdentifier);
				if (this.isCorrect(choice.identifier)) {
					choiceTextDiv.attr("class", "correct");
				} else {
					choiceTextDiv.attr("class", "incorrect");
					isCorrect = false;
				}

				mcState.identifier = choice.identifier;

				//add the human readable value of the choice chosen
				mcState.text = choice.text;
			} else {
				//this.node.view.notificationManager('error retrieving choice by choiceIdentifier', 3);
				alert('error retrieving choice by choiceIdentifier');
			}
		} else {
			if (this.isCorrect(choice.identifier)) {
				isCorrect = false;
			}
		}
	}

	mcState.isCorrect = isCorrect;

	if (isCorrect) {
		//the student answered correctly

		//get the congratulations message and display it
		this.multipleChoice.find('.resultMessageDiv').html(this.getResultMessage(isCorrect));
		this.multipleChoice.find('.checkAnswerButton').addClass('disabledLink');
		// disable checkAnswerButton

	}

	//fire the event to push this state to the global view.states object
	//eventManager.fire('pushStudentWork', mcState);

	//push the state object into this mc object's own copy of states
	this.states.push(mcState);
	return false;
};

/**
 * Returns true iff this.maxChoices is less than two or
 * the number of checkboxes equals this.maxChoices. Returns
 * false otherwise.
 */
MC.prototype.enforceMaxChoices = function(inputs) {
	var x, maxChoices;
	var maxChoices = parseInt(this.properties.maxChoices);
	if (maxChoices > 1) {
		var countChecked = 0;
		for ( x = 0; x < inputs.length; x++) {
			if (inputs[x].checked) {
				countChecked += 1;
			}
		}

		if (countChecked > maxChoices) {
			//this.node.view.notificationManager.notify('You have selected too many. Please select only ' + maxChoices + ' choices.',3);
			//maxChoices = 3;
			alert('You have selected too many. Please select only ' + maxChoices + ' choices.');
			return false;
		} else if (countChecked < maxChoices) {
			//this.node.view.notificationManager.notify('You have not selected enough. Please select ' + maxChoices + ' choices.',3);
			//maxChoices = 3;
			alert('You have not selected enough. Please select ' + maxChoices + ' choices.');
			return false;
		}
	}
	return true;
};

/**
 * Given whether this attempt is correct, adds any needed linkTo and
 * constraints and returns a message string.
 *
 * @param boolean - isCorrect
 * @param boolean - noFormat, return plain text
 * @return string - html response
 */
MC.prototype.getResultMessage = function(isCorrect) {
	var message = '';

	/* if this attempt is correct, then we only need to return a msg */
	if (isCorrect) {
		message = "You have successfully completed this question!";
	}

	return message;
};

/**
 * Returns a string of the given string with all spaces removed.
 */
MC.prototype.removeSpace = function(text) {
	return text.replace(/ /g, '');
};

/**
 * enable checkAnswerButton
 * OR
 * disable checkAnswerButton
 */
MC.prototype.enableCheckAnswerButton = function(doEnable) {
	if (doEnable == 'true') {
		this.multipleChoice.find('.checkAnswerButton').removeClass('disabledLink');
		// disable checkAnswerButton
	} else {
		this.multipleChoice.find('.tryAgainButton').addClass('disabledLink');
		// disable checkAnswerButton
	}
};
/**
 * Enables radiobuttons so that user can click on them
 */
MC.prototype.enableRadioButtons = function(doEnable) {
	var i;
	var radiobuttons = this.multipleChoice.find('[name="radiobutton"]');
	for ( i = 0; i < radiobuttons.length; i++) {
		if (doEnable == 'true') {
			radiobuttons[i].removeAttribute('disabled');
		} else {
			radiobuttons[i].setAttribute('disabled', 'true');
		}
	}
};


/**
 * Clears HTML inside feedbackdiv
 */
MC.prototype.clearFeedbackDiv = function() {
	var z;
	var feedbackdiv = this.multipleChoice.find('.feedbackdiv');
	feedbackdiv.innerHTML = "";

	var feedbacks = this.multipleChoice.find('[name="feedbacks"]');
	for ( z = 0; z < feedbacks.length; z++) {
		feedbacks[z].innerHTML = "";
	}
};

MC.prototype.postRender = function() {

	//  var thetitle = document.title;
};


// BEAUTIOUS
MC.prototype.getTemplate = function() {
	return "<div class='MultipleChoice Question bg7'>" +
	"			<div class='questionCountBox bg8'>" +
	"				<div class='questionTable'>" +
	"					<div class='questionType color1'>" +
	"						Multiple Choice" +
	"					</div>" +
	"				</div>" +
	"			</div>" +
	"			<!-- end of questionCountBox -->" +
	"			<div class='currentQuestionBox'>" +
	"				<div class='leftColumn' class='bg8'>" +
	"					<div class='promptDiv'></div>" +
	"					<div class='radiobuttondiv'></div>" +
	"					<div class='feedbackdiv'></div>" +
	"				</div>" +
	"				<div class='rightColumn' class='bg2'>" +
	"					<img src='" +
	bjc.rootURL +
	"/img/multi_choice.png' alt='Robot Art Open Response'  border='0' />" +
	"				</div>" +
	"			</div>" +
	"			<div class='clearBoth'></div>" +
	"			<div ='interactionBox'>" +
	"				<div class='statusMessages'>" +
	"					<div class='numberAttemptsDiv'></div>" +
	"					<div class='scoreDiv'></div>" +
	"					<div class='resultMessageDiv' style='font-size:16px'></div>" +
	"				</div>" +
	"				<!-- Anchor-Based Button Layout using TABLE -->" +
	"				<div class='buttonDiv'>" +
	"					<table class='buttonTable'>" +
	"						<tr>" +
	"							<td>" +
	"							<div class='buttonDiv'>" +
	"								<a class='checkAnswerButton  ui-button'>Check Answer</a>" +
	"							</div></td><td>" +
	"							<div class='buttonDiv'>" +
	"								<a class='tryAgainButton ui-button'>Try Again</a>" +
	"							</div></td>" +
	"						</tr>" +
	"					</table>" +
	"				</div>" +
	"			</div>" +
	"		</div>";

};

