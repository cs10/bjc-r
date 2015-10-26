// TODO: Make sure all display elements can use bootstrap
// TODO: Dry Code -- lots of repetition
// TODO: Save Selectors for button states and buttons
// TODO: Bind click events to google analytics
// TODO: Namespace everything
// TODO: Cache selections of elements
// TODO: Delay writing to DOM until everything is fully rendered
// TODO: Reduce complexity of DOM for answer options
// TODO: Return messages for incorrect answers
// TODO: Randomize the correct messages (need to randomly pick from an array)
// TODO: Remove the alert() call for bad answer selections

/* Represents a multiple choice question. */

function MC(data, location, questionNumber) {
    // FIXME: rename location variable
    //data = data[0];
    this.myClass = "MultipleChoice";


    // questionNumber is the index of the question
    this.num = questionNumber;

    this.content = {};
    this.properties = {};
    this.correctResponse = [];
    this.choices = [];
    this.attempts = [];
    this.states = [];

    this.interaction = data;
    //this.responseDec = $($(".responseDeclaration")[this.num]);
    var rii = this.interaction.attr("responseIdentifier");
    this.responseDec = $('.responseDeclaration[identifier="' + rii + '"]');


    // save this MC dom element
    this.multipleChoice = $(location);

    // make a copy of the template
    var template = this.getTemplate();
    this.multipleChoice = $(template).insertAfter(location);

    //boolean to prevent shuffling after each answer submit
    this.previouslyRendered = false;
}


MC.prototype.loadContent = function() {
    var choices = this.choices;
    var i;
    this.interaction.find('.choice').each(function() {
        var elem = $(this);
        var choice = {
            identifier: elem.attr('identifier'),
            text: elem.find('.text').html(),
            feedback: elem.find('.feedback').html()
        };
        choices.push(choice);
    });

    // get user interaction information
    this.content.prompt = this.interaction.find('.prompt').html();
    this.properties.shuffle = this.interaction.attr('shuffle') == "true";
    this.properties.maxChoices = this.interaction.attr('maxchoices');

    // get the list of correct responses
    var corrResponses = this.responseDec.find('.correctResponse');

    for (i = 0; i !== corrResponses.length; i++) {
        this.correctResponse.push($(corrResponses[i]).attr('identifier'));
    }

};

//gets and returns a choice object given the choice's identifier
MC.prototype.getChoiceByIdentifier = function(identifier) {
    var i = 0;
    for (; i < this.choices.length; i++) {
        if (this.removeSpace(this.choices[i].identifier) == identifier) {
            return this.choices[i];
        }
    }
    return null;
};

MC.prototype.displayNumberAttempts = function(part1, part2, states) {
    var nextAttemptNum = states.length + 1;
    var nextAttemptString = "";
    // TODO: Make this switch / case and refactor to a function (for clarity)
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
    // TODO: Google Analytics Push
    // Capture Question + Correctness + Attempts
    if (this.multipleChoice.find(".tryAgainButton").hasClass("disabled")) {
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
        this.multipleChoice.find('.questionType').html('Question ' + (this.num + 1));
    }

    /* render the prompt */
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
    // FIXME -- WRITE TO DOM OUTSIDE OF LOOP
    for (i = 0; i < this.choices.length; i++) {
        // TODO: Reduce this duplication......
        choiceHTML = '<table><tbody><tr class="table-middle"><td class="table-middle">' + '<input type="' + type + '" name="radiobutton"' + ' id="' + this.removeSpace(this.choices[i].identifier) + '" value="' + this.removeSpace(this.choices[i].identifier) + '" class="' + type + '"/></td><td class="table-middle">' + '<div id="choicetext:' + this.removeSpace(this.choices[i].identifier) + '">' + this.choices[i].text + '</div></td><td class="table-middle"><div id="feedback_' + this.removeSpace(this.choices[i].identifier) + '" name="feedbacks"></div></td></tr></tbody></table>';

        this.multipleChoice.find('.radiobuttondiv').append(choiceHTML);

        // TODO -- explain this...
        // TODO -- too much duplication!
        $('#' + this.removeSpace(this.choices[i].identifier)).bind('click', {
            myQuestion: this
        }, function(args) {
            args.data.myQuestion.enableCheckAnswerButton('true');
        });
        if (this.selectedInSavedState(this.choices[i].identifier)) {
            $('#' + this.removeSpace(this.choices[i].identifier)).attr('checked', true);
        }

        this.multipleChoice.find(".checkAnswerButton").bind('click', {
            myQuestion: this
        }, function(args) {
            args.data.myQuestion.checkAnswer();
        });

        this.multipleChoice.find(".tryAgainButton").bind('click', {
            myQuestion: this
        }, function(args) {
            args.data.myQuestion.tryAgain();
        });
    }

    this.multipleChoice.find('.tryAgainButton').addClass('disabled');
    this.enableCheckAnswerButton('true'); // ? Why not pass a boolean?
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
            this.multipleChoice.find('.tryAgainButton').addClass('disabled');
        }

    }
    //turn this flag on so that the step does not shuffle again during this visit
    this.previouslyRendered = true;
    this.interaction.remove();
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
        for (b = 0; b < latestState.length; b++) {
            if (latestState.choices[b] == choiceId) {
                return true;
            }
        }
    }

    return false;
};

/**
 * If prototype 'shuffle' for array is not found, create it
 * TODO: Move this to a generic place for LLAB (library?)
 */
if (!Array.shuffle) {
    // FIXME -- wtf if with this for loop?
    // Document sources
    Array.prototype.shuffle = function() {
        var rnd, tmp, i;
        for (i = this.length; i; rnd = parseInt(Math.random() * i), tmp = this[--i], this[i] = this[rnd], this[rnd] = tmp) {}
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
    for (h = 0; h < this.correctResponse.length; h++) {
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
// FIXME --- CACHE THE $ SELECTORS!!
MC.prototype.checkAnswer = function() {
    // TODO: Google Analytics Push
    // Capture Question + Correctness + Attempts
    if (this.multipleChoice.find('.checkAnswerButton').hasClass('disabled')) {
        return;
    }

    //clear the previous result message
    this.multipleChoice.find('.resultMessageDiv').html('');

    this.attempts.push(null);

    var inputbuttons = this.multipleChoice.find('.radiobuttondiv')[0].getElementsByTagName('input');
    var mcState = {};
    var isCorrect = true;
    var i, checked, choiceIdentifier, choice;

    this.enableRadioButtons(false);
    // disable radiobuttons
    this.multipleChoice.find('.checkAnswerButton').addClass('disabled');
    // disable checkAnswerButton
    this.multipleChoice.find('.tryAgainButton').removeClass('disabled');
    // show try again button
    for (i = 0; i < inputbuttons.length; i++) {
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
                // FIXME -- we shouldn't do this
                // However if critical we should track the events
                alert('error retrieving choice by choiceIdentifier');
            }
        } else {
            if (this.isCorrect(choice.identifier)) {
                isCorrect = false;
            }
        }
    }

    mcState.isCorrect = isCorrect;

    var outerdiv = this.multipleChoice.find('.panel-heading').parent();
    outerdiv.removeClass('panel-primary');
    // Remove the confirmation classes if previously added.
    outerdiv.removeClass('panel-success');
    outerdiv.removeClass('panel-danger');
    if (isCorrect) { //the student answered correctly
        outerdiv.addClass('panel-success');
        //get the congratulations message and display it
        this.multipleChoice.find('.resultMessageDiv').html(this.getResultMessage(isCorrect));
        // disable checkAnswerButton
        this.multipleChoice.find('.checkAnswerButton').addClass('disabled');
    } else {
        outerdiv.addClass('panel-danger');
    }

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
        for (x = 0; x < inputs.length; x++) {
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

/** FIXME -- reusable
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
    if (doEnable == 'true') { // FIXME
        this.multipleChoice.find('.checkAnswerButton').removeClass('disabled');
        // disable checkAnswerButton
    } else {
        this.multipleChoice.find('.tryAgainButton').addClass('disabled');
        // disable checkAnswerButton
    }
};
/**
 * Enables radiobuttons so that user can click on them
 */
MC.prototype.enableRadioButtons = function(doEnable) {
    var i;
    var radiobuttons = this.multipleChoice.find('[name="radiobutton"]');
    for (i = 0; i < radiobuttons.length; i++) {
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
    for (z = 0; z < feedbacks.length; z++) {
        feedbacks[z].innerHTML = "";
    }
};

MC.prototype.postRender = function() {
    //  var thetitle = document.title;
};


// BEAUTIOUS
MC.prototype.getTemplate = function() {
    return "<div class='panel panel-primary MultipleChoice Question'>" +
        "        <div class='panel-heading questionType'>" +
        "            Multiple Choice" +
        "        </div>" +
        "        <!-- end of questionCountBox -->" +
        "        <div class='panel-body currentQuestionBox'>" +
        "            <div class='leftColumn'>" +
        "                <div class='promptDiv'></div>" +
        "                <div class='radiobuttondiv'></div>" +
        "                <div class='feedbackdiv'></div>" +
        "            </div>" +
        "        </div>" +
        "        <div class='clearBoth'></div>" +
        "        <div class='interactionBox'>" +
        "            <div class='statusMessages'>" +
        "                <div class='numberAttemptsDiv'></div>" +
        "                <div class='scoreDiv'></div>" +
        "                <div class='resultMessageDiv'></div>" +
        "            </div>" +
        "            <!-- Anchor-Based Button Layout using TABLE -->" +
        "            <div class='buttonDiv'>" +
        "                <table class='buttonTable'>" +
        "                    <tr>" +
        "                        <td><div class='buttonDiv'>" +
        "                            <button class='checkAnswerButton btn btn-primary'>Check Answer</button>" +
        "                        </div></td><td>" +
        "                        <div class='buttonDiv'>" +
        "                            <button class='tryAgainButton btn btn-primary'>Try Again</button>" +
        "                        </div></td>" +
        "                    </tr>" +
        "                </table>" +
        "            </div>" +
        "        </div>" +
        "    </div>";
};



// file is loaded, baby
llab.loaded['multiplechoice'] = true;
