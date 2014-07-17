/*
* Used by curriculum pages (/cur) to insert script and link tags.
*
* The functionality here is duplicated in other html pages as well, using static scripts
*   glossary/view.html
*   topic/topic.html
*   quiz/view.html
*
*  Also, the bjc object and bjc.rootURL is made in bjc-library.js as well
*
*/


// NOTE: this is built in bjc-library.js if not built here...
if (typeof bjc === 'undefined') {
    bjc = {};
    bjc.rootURL = "/bjc-r"; // TODO: Make this dynamic?
    // needs to be defined, even though unused if bjc_loader isn't run
    bjc.loaded = {};
}


bjc.paths = {};
bjc.paths.links = [];
bjc.paths.links.push("/admin/css/bootstrap.min.css"); // FIXME -- CDN
bjc.paths.links.push("/admin/css/bootstrap-theme.min.css"); // FIXME -- CDN
bjc.paths.links.push("/admin/css/from-mvle.css");
bjc.paths.links.push("/admin/css/BJC.css");

bjc.paths.scripts = [];
bjc.paths.complete_funs = [];

///////////////// stage 0
//
bjc.paths.scripts[0] = [];
bjc.paths.scripts[0].push("/admin/js/jquery-1.11.0.min.js");
// //cdnjs.cloudflare.com/ajax/libs/jquery/1.11.0/jquery.min.js
bjc.paths.scripts[0].push("/admin/js/bjc-library.js");

bjc.loaded['bjc-library'] = false;
bjc.paths.complete_funs[0] = function () {
    return (typeof jQuery === 'function' &&
            bjc.loaded['bjc-library']
        );
};


////////// stage 1
// all these scripts depend on jquery, loaded in stage 0
// all quiz item types should get loaded here
bjc.paths.scripts[1] = [];
bjc.paths.scripts[1].push("/admin/js/bjc-curriculum.js");  
bjc.paths.scripts[1].push("/admin/quiz/multiplechoice.js");
bjc.paths.scripts[1].push("/admin/js/bootstrap.min.js");
//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.1.1/js/bootstrap.min.js
bjc.paths.scripts[1].push("/admin/js/bjc-course.js");

bjc.loaded['multiplechoice'] = false;
bjc.paths.complete_funs[1] = function() {
	return ((bjc.loaded['multiplechoice'] ) //&& 
	        // (typeof jQuery.ui !== 'undefined')
	);
}


/////////  stage 2
// bjc-quiz.js depends on each of the quiz item types having loaded
// bjc-curriculum depends on jquery-ui
bjc.paths.scripts[2] = ["/admin/js/bjc-quiz.js"];
bjc.paths.complete_funs[2] = function() {
	// the last stage, no need to ever wait
	return true;
}


bjc.initialSetUp = (function() {
    var headElement = document.getElementsByTagName('HEAD').item(0);
    var apath;
    var tag;
    var src;

    // add CSS links
    for (var i = 0; i < bjc.paths.links.length; i++) {
        tag = getTag("link", bjc.paths.links[i], "text/css");
        tag.rel = "stylesheet";
        tag.media = "screen";
        headElement.appendChild(tag);
    }
    
    // load scripts, starting at stage 0
    loadScripts(0);

    // Load Google Analytics
    if (bjc.loaded['bjc-library']) {
        bjc.GA();
    }
    
    function getTag(name, src, type) {
		var tag;
		tag = document.createElement(name);
		if (src.substring(0, 7) !== "http://") {
			src = bjc.rootURL + src;
		}
		if (name === "link") {
			tag.href = src;
		} else {
			tag.src = src;
		}
		tag.type = type;
		return tag;
	}

    function loadScripts(stage_num) {
		var i;

		//console.log("starting script load stage " + stage_num);
		// load scripts
		for ( i = 0; i < bjc.paths.scripts[stage_num].length; i++) {
			tag = getTag("script", bjc.paths.scripts[stage_num][i], "text/javascript");
			headElement.appendChild(tag);
		}
		if ((stage_num + 1) < bjc.paths.scripts.length) {
			proceedWhenComplete(stage_num);
		}
	}

    function proceedWhenComplete(stage_num) {
        if (bjc.paths.complete_funs[stage_num]()) {
            if ((stage_num + 1) < bjc.paths.scripts.length) {
                loadScripts(stage_num + 1);
            }
        } else {
            setTimeout(function() {proceedWhenComplete(stage_num)}, 50);
        }
    }
});

bjc.initialSetUp();

