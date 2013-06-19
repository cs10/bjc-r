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



bjc.secondarySetUp = function() {


	// insert main div
	$(document.body).wrapInner('<div id="full"></div>');



	// create Title tag
	if (getParameterByName("title") != "") {
		document.title = getParameterByName("title");
	}
	var titleText = document.title;
	if (titleText) {
		$('<div class="header"></div>').prependTo($("#full")).html(titleText);
		if (getParameterByName("title") != "") {
			$(".header").html(getParameterByName("title"));
		}
	}
	document.title = $(".header").text();

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
			vocabDiv.append('<a href="' + bjc.rootURL + 'glossary/view.html?term=' + this.getAttribute('term') + '" target="_vocab">' + this.getAttribute('term') + '</a>');
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
			helpDiv.append('<p><a href="' + bjc.rootURL + 'help/view.html?topic=' + this.getAttribute('topic') + '" target="_help">' + this.getAttribute('topic') + '</a></p>');
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
	if (getParameterByName("topic") != "") {
		// we want to put the nav bar at the top!
		if (getParameterByName("step") == "") {
			// TODO -- this shouldn't happen, but we could intelligently find which
			// step this should be
		}
		bjc['file'] = getParameterByName("topic");
		$.ajax({
			url : "/bjc-course/topic/" + bjc.file,
			type : "GET",
			dataType : "text",
			//data : myData,
			cache : false,
			success : bjc.processLinks
		});
	}



}


/** Processes just the hyperlinked elements in this page,
 *	and creates navigation buttons. 
 */
bjc.processLinks = function(data, ignored1, ignored2) {
	var lines = data.split("\n");
	var line;
	var text;
	var num = 0;
	var nav = $(document.createElement("div")).addClass("nav");
	var backButton = $(document.createElement("a")).addClass("backbutton");
	backButton.text("BACK");
	backButton.button({disabled: true});
	backButton.click(bjc.goBack);
	var forwardButton = $(document.createElement("a")).addClass("forwardbutton");
	forwardButton.text("FORWARD");
	forwardButton.button({disabled: true});
	forwardButton.click(bjc.goForward);
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
			if (line.indexOf("[") != -1) {
				text = line.slice(line.indexOf(":") + 1, line.indexOf("["))
				if (text.length > 45) {
					text = text.slice(0, 45) + "...";
				}
				url = (line.slice(line.indexOf("[") + 1, line.indexOf("]")));
				if (url.indexOf("http") != -1) {
					url = "/bjc-course/admin/empty-curriculum-page.html" + "?" + "src=" + url + "&" + "topic=" + bjc.file + "&step=" + num + "&title=" + text;
				} else {
					url += "?" + "topic=" + bjc.file + "&step=" + num;
				}
				bjc['url_list'].push(url);
				bjc['topic_list'].push(text);
				if (num == (bjc.step - 1)) {
					backButton.attr({'value': url});
					backButton.button({disabled: false});
					option = $(document.createElement("a")).attr({'href': url});
					option.html(text);
					
				} else if (num == bjc.step) {
					option = $(document.createElement("a")).attr({'href': url, 'selected': true});
					option.html(text);
					option.css("font-weight", "bold");
					//list_header.html(text);
					list_header.html("Click here to navigate...");
					
				} else if (num == (bjc.step + 1)) {
					forwardButton.attr({'value': url});
					forwardButton.button({disabled: false});
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
		$(".steps").slideToggle(500);
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
	
	if (document.URL.indexOf("/bjc-course/admin/empty-curriculum-page.html") != -1) {
		bjc.addFrame();
	}


}


bjc.addFrame = function() {
	var source = getParameterByName("src");
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



$(document).ready(bjc.secondarySetUp());
