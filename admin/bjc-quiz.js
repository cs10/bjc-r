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
		var qdata = $(qdatas.get(i));
		var location = $("<div></div>").insertAfter($(qdata));
		if (qdata.attr("src")) {
			var target = qdata.attr("src");
			getRemoteQdata(target, location, i);

		} else {
			buildQuestion(qdata, location, i, false);
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
			success : makeGetRemoteQdataCallback(location, questionNum)

		});
}

function makeGetRemoteQdataCallback(location, questionNum) {
	var callback = function(data, a, b) {
		buildQuestion(data, location, questionNum, true);
	};
	return callback;
}



//qdata is a div with the relevant data
//location is a div whose contents will be replaced with the question.
function buildQuestion(qdata, location, questionNum, fetched)  {
	qdata = $(qdata).insertBefore(location);
	console.log(qdata);
	console.log(location);
	var type = qdata.attr("type");
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
