/**
 *
 * sets up a BJC curriculum page -- either local or external.
 * Uses jquery.
 * This is borrowed from UCCP APCSA work
 */

bjc['file'] = "";
bjc['step'] = "";
bjc['url_list'] = new Array();
// never gets used?
bjc['topic_list'] = new Array();

//bjc['rootURL'] = bjc.rootURL;



bjc.secondarySetUp = function() {

	// insert main div
    if ($("#full").length == 0) {
        $(document.body).wrapInner('<div id="full"></div>');
	}



	// create Title tag, yo
	if (getParameterByName("title") != "") {
		document.title = getParameterByName("title");
	}
	var titleText = document.title;
	if (titleText && $(".header").length == 0) {
		$('<div class="header"></div>').prependTo($("#full")).html(titleText);
		if (getParameterByName("title") != "") {
			$(".header").html(getParameterByName("title"));
		}
	}
	document.body.style.marginTop = "60px";
	document.title = $(".header").text();


	// fix snap links so they run snap
	$("a.run").each(function(i) {
		$(this).attr("target", "_blank");
		$(this).attr('href', bjc.getSnapRunURL(this.getAttribute('href')));
	});



	// make the vocab box if necessary
	if ($("span.vocab").length > 0) {
		if ($("div.vocab").length == 0) {
			// it might already exist, in order to have a 'topX' class inserted.
			$("#full").append('<div class="vocab"></div>');
		}
		var vocabDiv = $("div.vocab");
		$("span.vocab").each(function(i) {
			if (!(this.getAttribute('term'))) {
				this.setAttribute('term', this.innerHTML)
			}
			vocabDiv.append('<a href="' + bjc.rootURL + '/glossary/view.html?term=' + this.getAttribute('term')
					+ '" target="_vocab">' + this.getAttribute('term') + '</a>');
		});
	}

	// make the help box if necessary
	var helpSpans = $("span.help");
	if (helpSpans.length > 0) {
		$("#full").append('<div class="help"></div>');
		var helpDiv = $("div.help");
		helpSpans.each(function(i) {
			if (!(this.getAttribute('topic'))) {
				this.setAttribute('topic', this.innerHTML)
			};
			helpDiv.append('<p><a href="' + bjc.rootURL + '/help/view.html?topic=' + this.getAttribute('topic')
				       + '" target="_help">' + this.getAttribute('topic') + '</a></p>');
		});
	}

	// move anything that belongs in to the margin there, if necessary
	// these are the 4 class of divs that matter.
	var marginSelector = ["div.key", "div.warning", "div.help", "div.vocab"];
	if ($(marginSelector.join(',')).length > 0) {
		// add the two columns.
		$('#full').wrapInner('<div id="mainCol"></div>').prepend('<div id="marginCol"></div>');
		// this moves the divs over.  Perhaps it could do some smarter ordering
		// always put vocab at the bottom, for instance.
		var marginCol = $("#marginCol").get(0);
		$.each(marginSelector, function(i, divclass) {
			$(divclass).appendTo(marginCol);
		});
	}

	// should this page be rendered with the topic header (left, right buttons, etc)
	bjc['step'] = parseInt(getParameterByName("step"));
    var temp = getParameterByName("topic");
	if (temp != "" && !isNaN(bjc['step'])) {
        console.log("stuff happening");
        console.log(bjc['step']);
		// we want to put the nav bar at the top!
		if (getParameterByName("step") == "") {
			// TODO -- this shouldn't happen, but we could intelligently find which
			// step this should be
		}
        if (typeof temp == "object") {
            bjc['file'] = temp[1];
        } else {
            bjc['file'] = temp;
        }
		
		$.ajax({
		    url : bjc.rootURL + "/topic/" + bjc.file,
		    type : "GET",
		    dataType : "text",
		    cache : false,
		    /* success : function(data, unused1, unused2) {
		       bjc.processLinks(data, unused1, unused2);} // should this include a setTimeout? */
		    success: bjc.processLinks
		});
	}
	
	
	
}; // close secondarysetup();


/** Processes just the hyperlinked elements in this page,
 *	and creates navigation buttons. 
 */
bjc.processLinks = function(data, ignored1, ignored2) {
    var temp = getParameterByName("topic");
    if (typeof temp == "object") {
            bjc['file'] = temp[1];
        } else {
            bjc['file'] = temp;
    }
	var lines = data.split("\n");
	var line;
	var text;
	var num = 0;
	var nav = $(document.createElement("div")).addClass("nav");
	var backButton = $(document.createElement("a")).addClass("backbutton");
    var b_backButton = $(document.createElement("a")).addClass("backbutton");
	backButton.text("BACK");
	backButton.button({disabled: true});
	backButton.click(bjc.goBack);
    b_backButton.text("BACK");
	b_backButton.button({disabled: true});
	b_backButton.click(bjc.goBack);
	var forwardButton = $(document.createElement("a")).addClass("forwardbutton");
    var b_forwardButton = $(document.createElement("a")).addClass("forwardbutton");
	forwardButton.text("FORWARD");
	forwardButton.button({disabled: true});
	forwardButton.click(bjc.goForward);
    b_forwardButton.text("FORWARD");
	b_forwardButton.button({disabled: true});
	b_forwardButton.click(bjc.goForward);
	var list = $(document.createElement("ul")).attr({'class': 'steps'});
	list.menu();
	list.menu("collapse");
	var option;
	var url = document.URL;
	var list_item;
	var hidden;
	var list_header = $(document.createElement("div")).attr({'class': 'list_header'});
	list_header.menu();
	
	
	for (var i = 0; i < lines.length; i++) {
		line = lines[i];
		line = bjc.stripComments(line);
		if (line.length > 1) {
			if (line.indexOf("title:") != -1) {
				/* Create a link back to the main topic. */
				url = bjc.rootURL + "/topic/topic.html?topic=" + bjc.file;
				text = line.slice(line.indexOf(":") + 1);
				if (text.length > 35) {
					text = text.slice(0, 35) + "...";
				}
				text = "<span class='main-topic-link'>" + text + "</span>";
				option = $(document.createElement("a")).attr({'href': url});
				option.html(text);
				list_item = $(document.createElement("li")).attr({'class': 'list_item'});
				list_item.append(option);
				list.prepend(list_item);
			}
			if (line.indexOf("[") != -1) {
				text = line.slice(line.indexOf(":") + 1, line.indexOf("["))
				if (text.length > 35) {
					text = text.slice(0, 35) + "...";
				}
				url = (line.slice(line.indexOf("[") + 1, line.indexOf("]")));
				if (url.indexOf("http") != -1) {
					url = bjc.rootURL + "/admin/empty-curriculum-page.html" + "?" + "src=" + url + "&" + "topic=" + bjc.file + "&step=" + num + "&title=" + text;
				} else if (url.indexOf("?") != -1) {
					url += "&" + "topic=" + bjc.file + "&step=" + num;
				} else {
					url += "?" + "topic=" + bjc.file + "&step=" + num;
				}
				bjc['url_list'].push(url);
				bjc['topic_list'].push(text);
				if (num == (bjc.step - 1)) {
					backButton.attr({'value': url});
					backButton.button({disabled: false});
					b_backButton.attr({'value': url});
					b_backButton.button({disabled: false});
					option = $(document.createElement("a")).attr({'href': url});
					option.html(text);
					
				} else if (num == bjc.step) {
					text = "<span class='current-step-link'>" + text + "</span>";
					option = $(document.createElement("a")); //.attr({'href': url, 'selected': true});
					option.html(text);
					//list_header.html(text);
					list_header.html("Click here to navigate...");
					
				} else if (num == (bjc.step + 1)) {
					forwardButton.attr({'value': url});
					forwardButton.button({disabled: false});
                    b_forwardButton.attr({'value': url});
					b_forwardButton.button({disabled: false});
					option = $(document.createElement("a")).attr({'href': url});
					option.html(text);
				
				} else {
					option = $(document.createElement("a")).attr({'href': url});
					option.html(text);
				}
				list_item = $(document.createElement("li")).attr({'class': 'list_item'});
				list_item.append(option);
				list.append(list_item);
				num = num + 1;
			}
		}
	}
	/*nav.hover(function() {
			list.slideDown(500);
	}, function() {
		list.slideUp(500);
	});*/
	list_header.click(function() {
		if (list_header.html() == "Click here to navigate...") {
			list_header.html("Click again to close...");
		} else {
			list_header.html("Click here to navigate...");
		}
		$($(".steps")[0]).slideToggle(300);
	});
	nav.append(backButton);
	nav.append(list_header);
	nav.append(forwardButton);
	nav.append(list);
	var background = $(document.createElement("div")).attr({'class': 'nav_background'});
	nav.append(background);
    $("#full").prepend(nav);
	list_header.width(list.outerWidth());
	list.slideToggle(0);

	/*var b_list = list.clone();
	var b_list_header = list_header.clone();
	b_list_header.click(
			function() {
			if (b_list_header.html() == "Click here to navigate...") {
				b_list_header.html("Click again to close...");
			} else {
				b_list_header.html("Click here to navigate...");
			}
			$($(".steps")[1]).slideToggle(300);
		});*/
	/* b_list_header.click(
	   function() {
   if (b_list_header.html() == "Click here to navigate...") {
   b_list_header.html("Click again to close...");
					$($(".steps")[1]).show({effect: "slide", duration: 300, direction: "down"}); 
	} else {
		b_list_header.html("Click here to navigate...");
					$($(".steps")[1]).hide({effect: "slide", duration: 300, direction: "down"});
	}
});*/
	
	
	if (document.URL.indexOf(bjc.rootURL + "/admin/empty-curriculum-page.html") != -1) {
	    bjc.addFrame();
	} else {
		$("#full").append('<div id="full-bottom-bar"></div>');
		var b_nav = $(document.createElement("div")).addClass("bottom-nav");
		//var b_list = list.clone();
		b_nav.append(b_backButton);
		//b_nav.append(b_list_header);
		b_nav.append(b_forwardButton);
		//b_nav.append(b_list);
		b_nav.append(background.clone());
		$("#full-bottom-bar").append(b_nav);
        //b_list_header.width(list.outerWidth());
	}

        
}


bjc.addFrame = function() {
	var source = getParameterByName("src");
	$("#full").append('<a href=' + source + ' target="_">Open page in new window</a><br><br>');
	var frame = $(document.createElement("iframe")).attr({'src': source, 'class': 'step_frame'});
	$("#full").append(frame);
}

bjc.goBack = function() {
	window.location.href = bjc['url_list'][bjc.step - 1];
}

bjc.goForward = function() {
	window.location.href = bjc['url_list'][bjc.step + 1];
}

// function newPage(url) {
	// if (url != window.location.href) {
		// window.location.href = url;
	// }
// }



$(document).ready(bjc.secondarySetUp);
