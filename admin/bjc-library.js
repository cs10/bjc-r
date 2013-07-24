/*
 * Common functions for any bjc page
 * 
 * CANNOT RELY ON JQUERY, YO
 */



if ( typeof bjc === 'undefined') {
	// if bjc-loader wasn't used, we need this.
	bjc = {};
	bjc.rootURL = "/bjc-r/";
}




//TODO put this in the bjc namespace
/** Returns the value of the URL parameter associated with NAME. */
function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
  var regexS = "[\\?&]" + name + "=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(window.location.search);
  if(results == null)
    return "";
  else
    return decodeURIComponent(results[1].replace(/\+/g, " "));
}



/** Strips comments off the line. */
bjc.stripComments = function(line) {
	var index = line.indexOf("//");
	if (index != -1 && line[index - 1] != ":") {
		line = line.slice(0, index);
	}
	return line;
}

