// instance dispatch on type

function getQInstance(type, qdata, location,  i) {
	// switch would be nicer here...
	// based on value of 'type' attribute in the div with class=asessment-data
	if (type = "multiplechoice") {
		return new MC(qdata, location, i);
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
		var qdata = qdatas.get(i);
		var location = $('<div></div>');
		$(qdata).after(location);
		
		if (qdata.hasAttribute("src")) {
			var target = qdata.getAttribute("src");
			getRemoteQdata(target, location, i);
			
		} else {
			buildQuestion(qdata, location);
		}	
	}
	
	
	// now, remove the purely data tags, how about?
	$("div.assessment-data").remove();
	//$("div.responseDeclaration").remove();
	
}

// use a closure to keep around location and questionNum
function getRemoteQdata(target, location, questionNum) {
		$.ajax({
			url : target,
			type : "GET",
			dataType : "html",
			success : makeGetQdataCallback(location, questionNum)
			});
}

function makeGetRemoteQdataCallback (location, questionNum) {
	var callback = function(data) {
		buildQuestion(data, location, questionNum);
	};
	return callback;
}



//qdata is a div with the relevant data
//location is a div whose contents will be replaced with the question.
function buildQuestion(qdata, location, questionNum)  {
		var type = $(qdata).attr("type");
		var question = getQInstance(type, qdata, location, questionNum);
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

