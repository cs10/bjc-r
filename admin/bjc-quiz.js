// instance dispatch on type

function getQInstance(type, qdata, i) {
	// switch would be nicer here...
	if (type = "multiplechoice") {
		return new MC(qdata, i);
	}
	
}




//////////////



//var mc = [];

// puts qdatums into the hidden div, continues processing
$(document).ready(buildQuestions);




/**
 * Process each div with class assessment-data, start xmlhttp calls as necessary.
 */
function buildQuestions() {	

	// we don't do english here!  datas!!! 
	var qdatas = $("div.assessment-data");
	var num = qdatas.length;

	
	for (var i = 0; i < num; i++) {
		qdata = qdatas.get(i);
		
		if (qdata.hasAttribute("src")) {
			// need to figure out how to pass the questionNum through to buildQuestion
			alert("yo");
		} else {
			// need to figure out how to pass in the questionNumber here
			buildQuestion(qdata);
		}	
	}
	
	
	// now, remove the purely data tags, how about?
	$("div.assessment-data").remove();
	//$("div.responseDeclaration").remove();
	
}

//function buildQuestion(qdata, questionNumber) {
function buildQuestion(qdata, unused, unused2) {
		// TODO figure out how to pull questionNum out of ajax call
		var questionNum = 0;
		var type = $(qdata).attr("type");
		var question = getQInstance(type, qdata, questionNum);
		question.loadContent();
		question.render();
		//mc.push(question);
}

/**
 * Will eventually not reside here.
 */
getParameterByName = function(name) {
	name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
	var regexS = "[\\?&]" + name + "=([^&#]*)";
	var regex = new RegExp(regexS);
	var results = regex.exec(window.location.search);
	if (results == null)
		return "";
	else
		return decodeURIComponent(results[1].replace(/\+/g, " "));
}

