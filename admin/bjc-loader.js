/*
 * Used by curriculum pages (/cur) to insert script and link tags.
 *
 * The functionality here is duplicated in other html pages as well, using static scripts
 *   glossary/view.html
 *   topic/topic.html
 *   quiz/view.html
 *
 * Also, the bjc object and bjc.rootURL is made in bjc-main.js as well, if this file isn't used.
 *
 */

// NOTE: this is built in bjc-library.js if not built here...
var bjc = {};
// rootURL also spec'ed in bjc-library.js
bjc.rootURL = "/bjc-r";


bjc.paths = {};
bjc.paths.links = [
	"/admin/jquery-ui-1.10.2-smoothness.css",
	"/admin/BJC.css",
	"/admin/from-mvle.css"
	];

// to be loaded right away, I guess...
bjc.paths.libraryscripts = [
	"/admin/jquery-1.9.1.min.js", 
	"/admin/bjc-library.js"
	];

// to be loaded after jquery is loaded
bjc.paths.jqueryscripts = [
	"/admin/jquery-ui.1.10.2.min.js",
	"/admin/quiz/multiplechoice.js",
	"/admin/bjc-quiz.js",
	"/admin/bjc-curriculum.js"
	];


bjc.initialSetUp = function() {
	var headElement = document.getElementsByTagName('HEAD').item(0);
	var apath;
	var tag;
	var i;
	var src;

	for ( i = 0; i < bjc.paths.libraryscripts.length; i++) {
		tag = getTag("script", bjc.paths.libraryscripts[i], "text/javascript");
		headElement.appendChild(tag);
	}
	for ( i = 0; i < bjc.paths.links.length; i++) {
		tag = getTag("link", bjc.paths.links[i], "text/css");
		tag.rel = "stylesheet";
		tag.media = "screen";
		headElement.appendChild(tag);
	}
	addProcessingCode();

	function addProcessingCode() {
		// hackalicious
		if (( typeof $ !== 'function') || (typeof getParameterByName !== 'function')) {
			setTimeout(addProcessingCode, 100);
			return;
		}
		for ( i = 0; i < bjc.paths.jqueryscripts.length; i++) {
			tag = getTag("script", bjc.paths.jqueryscripts[i], "text/javascript");	
			headElement.appendChild(tag);
		}

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

};

bjc.initialSetUp();

