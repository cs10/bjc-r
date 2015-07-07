/*
 * Common functions for any llab page
 *
 * CANNOT RELY ON JQUERY OR ANY OTHER LLAB LIBRARY
 */


// retrieve llab or create an empty version.
llab = llab || {};
llab.loaded = llab.loaded || {};


/////////////////
// TODO: ALL CORS SETTINGS SHOULD BE MOVED TO THE CONFIG FILE.
llab.CORSproxy = "https://bjcredir.herokuapp.com/";

llab.CORSCompliantServers = [];
llab.CORSCompliantServers.push("bjc.berkeley.edu");
llab.CORSCompliantServers.push("bjc.eecs.berkeley.edu");
llab.CORSCompliantServers.push("snap.berkeley.edu");
llab.CORSCompliantServers.push("inst.eecs.berkeley.edu");
llab.CORSCompliantServers.push("cs10.berkeley.edu");
llab.CORSCompliantServers.push("localhost");
llab.CORSCompliantServers.push("0.0.0.0");
llab.CORSCompliantServers.push("bjc.edc.org");

//// TODO: Move this to config? Or refactor?

llab.snapRunURLBase = "http://snap.berkeley.edu/snapsource/snap.html#open:";

// returns the current domain with a cors proxy if needed

llab.getSnapRunURL = function(targeturl) {
	if (!targeturl) { return ''; }

	if (targeturl.indexOf('http') == 0 || targeturl.indexOf('//') == 0) {
		// pointing to some non-local resource...  do nothing!!
		return targeturl;
	}

	// internal resource!
	var finalurl = llab.snapRunURLBase;
	var currdom = document.domain;
	if (currdom == "localhost") {
		currdom = 'http://' + currdom + ":" + window.location.port;
	} else if (llab.CORSCompliantServers.indexOf(currdom) == -1) {
		finalurl += llab.CORSproxy;
	} 
	if (targeturl.indexOf("..") != -1 || targeturl.indexOf(llab.rootURL) == -1) {
		var path = window.location.pathname;
		path = path.split("?")[0];
		path = path.substring(0, path.lastIndexOf("/") + 1);
		currdom = window.location.protocol + '//' + currdom + path;
	}
	finalurl = finalurl + currdom + targeturl;

	return finalurl;
};


/** Returns the value of the URL parameter associated with NAME. */
llab.getQueryParameter = function(paramName) {
	var params = llab.getURLParameters();
	if (params.hasOwnProperty(paramName)) {
		return params[paramName];
	} else {
		return '';
	}
};

/** Strips comments off the line in a topic file. */
llab.stripComments = function(line) {
	var index = line.indexOf("//");
	// the second condition makes this ignore urls (http://...)
	if (index !== -1 && line[index - 1] !== ":") {
		line = line.slice(0, index);
	}
	return line;
};

/* Google Analytics Tracking
 * To make use of this code, the two ga() functions need to be called
 * on each page that is loaded, which means this file must be loaded.
 */
llab.GAfun = function(i,s,o,g,r,a,m) { i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){ (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m) };

llab.GA = function() {
	llab.GAfun(window,document,'script','//www.google-analytics.com/analytics.js','ga');
};

// GA Function Calls -- these do the real work!:
if (llab.GACode) {
	llab.GA();
	ga('create', llab.GACode, llab.GAUrl);
	ga('send', 'pageview');
}

/** Truncate a STR to an output of N chars.
 *  N does NOT include any HTML characters in the string.
 */
llab.truncate = function(str, n) {
	// Ensure string is 'proper' HTML by putting it in a div, then extracting.
	var clean = document.createElement('div');
		clean.innerHTML = str;
		clean = clean.textContent || clean.innerText || '';

	// TODO: Be smarter about stripping from HTML content
	// This, doesn't factor HTML into the removed length
	// Perhaps match postion of nth character to the original string?
	// &#8230; is a unicode ellipses
	if (clean.length > n) {
		return clean.slice(0, n - 1) + '&#8230;';
	}

	return str; // return the HTML content if possible.
};


/*!
	query-string
	Parse and stringify URL query strings
	https://github.com/sindresorhus/query-string
	by Sindre Sorhus
	MIT License
*/
// Modiefied for LLAB. Inlined to reduce requests
var queryString = {};

queryString.parse = function (str) {
	if (typeof str !== 'string') {
		return {};
	}

	str = str.trim().replace(/^(\?|#)/, '');

	if (!str) {
		return {};
	}

	return str.trim().split('&').reduce(function (ret, param) {
		var parts = param.replace(/\+/g, ' ').split('=');
		var key = parts[0];
		var val = parts[1];

		key = decodeURIComponent(key);
		// missing `=` should be `null`:
		// http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
		val = val === undefined ? null : decodeURIComponent(val);

		if (!ret.hasOwnProperty(key)) {
			ret[key] = val;
		} else if (Array.isArray(ret[key])) {
			ret[key].push(val);
		} else {
			ret[key] = [ret[key], val];
		}

		return ret;
	}, {});
};

queryString.stringify = function (obj) {
	return obj ? Object.keys(obj).map(function (key) {
		var val = obj[key];

		if (Array.isArray(val)) {
			return val.map(function (val2) {
				if (!val2) { // Mod: Don't have =null values in URL params
					return encodeURIComponent(key);
				}
				return encodeURIComponent(key) + '=' + encodeURIComponent(val2);
			}).join('&');
		}

		if (!val) { // Mod: Don't have =null values in URL params
			return encodeURIComponent(key);
		}

		return encodeURIComponent(key) + '=' + encodeURIComponent(val);
	}).join('&') : '';
};
/*! End Query String */
llab.QS = queryString;


// Return a new object with the combined properties of A and B.
// Desgined for merging query strings
// B will clobber A if the fields are the same.
llab.merge = function(objA, objB) {
	var result = {}, prop;
	for (prop in objA) {
		if (objA.hasOwnProperty(prop)) {
			result[prop] = objA[prop];
		}
	}
	for (prop in objB) {
		if (objB.hasOwnProperty(prop)) {
			result[prop] = objB[prop];
		}
	}
	return result;
};

llab.getURLParameters = function() {
	return llab.QS.parse(location.search);
};

llab.getAttributesForElement = function(elm) {
	var map = elm.attributes,
		ignore = ['class', 'id', 'style'],
		attrs = {},
		item,
		i = 0,
		len = map.length;

	for (; i < len; i += 1) {
		item = map.item(i);
		if (ignore.indexOf(item.name) === -1) {
			attrs[item.name] = item.value;
		}
	}
	return attrs;
};


// These are STRINGS that are query selectors for selecting page elements
// We want to store them in a single place because it's easier to update
llab.selectors = {};
// These are code fragments which are reusable components.
llab.fragments = {};
// These are common strings that need not be build and should be reused!
llab.strings = {};
llab.strings.goMain = 'Go to the Course Page';
// &#8230; is ellipsis
llab.strings.clickNav = 'Click here to navigate&nbsp;&nbsp;';
//
llab.fragments.bootstrapSep = '<li class="divider list_item" role="presentation"></li>';
llab.fragments.bootstrapCaret = '<span class="caret"></span>';
llab.fragments.hamburger = '<span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span>';
// LLAB selectors for common page elements
llab.selectors.FULL = '.full';
llab.selectors.NAVSELECT = '.llab-nav';
llab.selectors.PROGRESS = '.full-bottom-bar';

//// cookie stuff
// someday my framework will come, but for now, stolen blithely from http://www.quirksmode.org/js/cookies.html
llab.createCookie = function(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

llab.readCookie = function(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

llab.eraseCookie = function(name) {
	createCookie(name,"",-1);
}


llab.spanTag = function(content, className) {
	return '<span class="' + className + '">' + content + '</span>'
}

// Cool array level operations
llab.any = function(A) {
	return A.reduce(function(x, y) {return x || y });
}

llab.all = function(A) {
	return A.reduce(function(x, y) {return x && y });
}

llab.which = function(A) {
	for (i = 0; i < A.length; i++) {
		if (A[i]) {
			return i;
		}
	}
	return -1;
}


/////////////////////  END

llab.loaded['library'] = true;
