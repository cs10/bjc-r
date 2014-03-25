/*
 * Common functions for any bjc page
 * 
 * CANNOT RELY ON JQUERY, YO
 */

if ( typeof bjc === 'undefined') {
	// if bjc-loader wasn't used, we need this.
	bjc = {};
	bjc.rootURL = "/bjc-r";
	bjc.loaded = {};   // needs to be defined, even though unused if bjc_loader isn't run
}




/////////////////


bjc.CORSproxy = "www.corsproxy.com";

bjc.CORSCompliantServers = [];
bjc.CORSCompliantServers.push("bjc.berkeley.edu");
bjc.CORSCompliantServers.push("bjc.eecs.berkeley.edu");
bjc.CORSCompliantServers.push("snap.berkeley.edu");
bjc.CORSCompliantServers.push("inst.eecs.berkeley.edu");


////

bjc.snapRunURLBase = "http://snap.berkeley.edu/snapsource/snap.html#open:";

// returns the current domain with a cors proxy if needed

bjc.getSnapRunURL = function(targeturl) {

	if (targeturl != null) {   

		if (targeturl.substring(0, 7) == "http://") {
			// pointing to some non-local resource... maybe a published cloud project?  do nothing!!
			return targeturl;

		} else {
			// internal resource!
			var finalurl = bjc.snapRunURLBase + "http://";
			var currdom = document.domain;
			console.log(currdom);
			// why not, for the devs out there...
			if (currdom == "localhost") {
				currdom = "bjc.berkeley.edu";
			}
			if (bjc.CORSCompliantServers.indexOf(currdom) == -1) {
				finalurl = finalurl + bjc.CORSproxy + "/";
			}
			if (targeturl.indexOf("..") != -1 || targeturl.indexOf(bjc.rootURL) == -1) {
				var path = window.location.pathname;
				path = path.split("?")[0];
				path = path.substring(0, path.lastIndexOf("/") + 1)
				currdom = currdom + path;
			}
			finalurl = finalurl + currdom + targeturl;

			return finalurl;
		}
	}

	return currdom;

}



//TODO put this in the bjc namespace
/** Returns the value of the URL parameter associated with NAME. */
function getParameterByName(name) {
	/*name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
	var regexS = "[\\?&]" + name + "=([^&#]*)";
	var regex = new RegExp(regexS);
	var results = regex.exec(window.location.search);
	var results = window.location.search.match(regex);
	console.log(results);*/
	var results = [];
	var strings = window.location.search.substring(1).split("&");
    for (var i = 0; i < strings.length; i++) {
        var temp = strings[i].split("=");
        if (temp[0] == name) {
            results.push(temp[1]);
        }
    }
	if (results.length == 0)
        return "";
	else if (results.length == 1) {
        return results[0];
	} else {
        //console.log(decodeURIComponent(results[1].replace(/\+/g, " ")));
        //return decodeURIComponent(results[1].replace(/\+/g, " "));
        return results;
    }
}



/** Strips comments off the line. */
bjc.stripComments = function(line) {
	var index = line.indexOf("//");
	if (index != -1 && line[index - 1] != ":") {
		line = line.slice(0, index);
	}
	return line;
}


bjc.loaded['bjc-library'] = true;
