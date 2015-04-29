// instance dispatch on type

function getQInstance(type, qdata, location,  i) {
    // switch would be nicer here...
    // based on value of 'type' attribute in the div with class=asessment-data
    if (type == "multiplechoice") {
        return new MC(qdata, location, i);
    } else if (type == "inline-multiplechoice") {
        return new IMC(qdata, location, i);
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
        var location = $("<div>").insertAfter($(qdata));
        if (qdata.attr("src")) {
            var target = qdata.attr("src");
            getRemoteQdata(target, location, i);

        } else {
            buildQuestion(qdata, location, i, false);
        }
    }

    // now, remove the purely data tags, how about?
    $("div.assessment-data").remove();

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



// qdata is a div with the relevant data
// location is a div whose contents will be replaced with the question.
function buildQuestion(qdata, location, questionNum, fetched)  {
    qdata = $(qdata).insertBefore(location);
    var type = qdata.attr("type");
    var question = getQInstance(type, qdata, location, questionNum);
    question.loadContent();
    question.render();
}

