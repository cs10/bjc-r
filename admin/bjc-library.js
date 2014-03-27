/*
 * Common functions for any bjc page
 * 
 * CANNOT RELY ON JQUERY, YO
 */

if (typeof bjc === 'undefined') {
    // if bjc-loader wasn't used, we need this.
    bjc = {};
    bjc.rootURL = "/bjc-r"; // TODO: Make this dynamic?
    // needs to be defined, even though unused if bjc_loader isn't run
    bjc.loaded = {};
}

/////////////////


bjc.CORSproxy = "www.corsproxy.com";

bjc.CORSCompliantServers = [];
bjc.CORSCompliantServers.push("bjc.berkeley.edu");
bjc.CORSCompliantServers.push("bjc.eecs.berkeley.edu");
bjc.CORSCompliantServers.push("snap.berkeley.edu");
bjc.CORSCompliantServers.push("inst.eecs.berkeley.edu");
bjc.CORSCompliantServers.push("cs10.berkeley.edu");


////

bjc.snapRunURLBase = "http://snap.berkeley.edu/snapsource/snap.html#open:";

// returns the current domain with a cors proxy if needed
bjc.getSnapRunURL = function(targeturl) {

    if (targeturl === null) { 
        return;
    }

    // pointing to some non-local resource... do nothing!!
    if (targeturl.substring(0, 7) === "http://") {
        return targeturl;
    }
    
    // internal resource!
    var finalurl = bjc.snapRunURLBase + "http://";
    var currdom = document.domain;
    // console.log(currdom);
    // why not, for the devs out there...
    if (currdom === "localhost") {
        currdom = "bjc.berkeley.edu";
    }
    
    // If this server is not CORS compliant, use a proxy 
    if (bjc.CORSCompliantServers.indexOf(currdom) === -1) {
        finalurl = finalurl + bjc.CORSproxy + "/";
    }
    
    if (targeturl.indexOf("..") !== -1 ||
        targeturl.indexOf(bjc.rootURL) === -1) {
        var path = window.location.pathname;
        path = path.split("?")[0];
        path = path.substring(0, path.lastIndexOf("/") + 1)
        currdom = currdom + path;
    }
    
    finalurl = finalurl + currdom + targeturl;

    return finalurl;
};


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
    
    if (index !== -1 && line[index - 1] !== ":") {
        line = line.slice(0, index);
    }
    return line;
};

/** Google Analytics Tracking -- Currently not in use for BJC-R.
 *  Each new repo should get their own GA token, and setup and then swap these
 *  values. To make use of this code, the two ga() functions need to be called
 *  on each page that is loaded, which means this file must be loaded. 
 */
bjc.GACode = 'UA-47210910-3';
bjc.GAurl = 'berkeley.edu';
bjc.GAfun =  function(i,s,o,g,r,a,m) {
    i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  };

bjc.GA = function() {
        bjc.GAfun(window,document,'script','//www.google-analytics.com/analytics.js','ga');
    }
// GA Function Calls -- these do the real work!: 
// ga('create', bjc.GACode, bjc.GAUrl);
// ga('send', 'pageview');

/** Truncate a STR to an output of N chars.
 *  N does NOT include any HTML characters in the string.
 */
bjc.truncate = function(str, n) {
    // Ensure string is 'proper' HTML by putting it in a div, then extracting.
    var clean = document.createElement('div');
    clean.innerHTML = str;
    clean = clean.textContent || clean.innerText || '';
    
    // TODO: Shorten string to end on whole words?
    // TODO: Be smarter about stripping from HTML content??
    // &#8230; is a unicode ellipses
    if (clean.length > n) {
        return clean.slice(0, n - 1) + '&#8230;';
    }
    
    return str; // return the HTML content if possible.
};

bjc.loaded['bjc-library'] = true;
