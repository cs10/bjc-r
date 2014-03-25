/** BJC-CURRICULUM
 * sets up a BJC curriculum page -- either local or external.
 * Uses jquery, jquery-ui.
 * This is borrowed from UCCP APCSA work
 */

// Global Vars for page sections
var TOPNAV, HEADER, DROPDOWN, BUTTONS;
TOPNAV = 'top-nav';
HEADER = 'header';
DROPDOWN = 'nav';
BUTTONS = '';

var topNav = "<div class='top-nav'><div class='header'></div>" +
             "<div class='nav'><div class='backbutton '></div>" +
             "<div class='forwardbutton '></div></div></div>";

function makeDiv(cls) {
    // FIXME: Just use jQuery and build stuff more easily...
    return '<div class="' + cls + '"></div>';
}

bjc['file'] = "";
bjc['step'] = "";
bjc['url_list'] = new Array();


bjc.secondarySetUp = function() {

    // insert main div
    if ($("#full").length === 0) {
        $(document.body).wrapInner('<div id="full"></div>');
    }
    
    if ($('.' + TOPNAV).length === 0) {
        $(document.body).prepend(makeDiv(TOPNAV));
    }

    // create Title tag, yo
    if (getParameterByName("title") != "") {
        document.title = getParameterByName("title");
    }
    
    var titleText = document.title;
    var nav_div = $('.' + TOPNAV);
    if (titleText && $(".header").length == 0) {
        $(makeDiv(HEADER)).prependTo(nav_div).html(titleText);
        if (getParameterByName("title") != "") {
            $(".header").html(getParameterByName("title"));
        }
    }
    
    // FIXME -- should just be in css...?
    document.body.style.marginTop = "0";
    document.title = $(".header").text(); // Strips HTML from Header


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
    if (temp !== "" && !isNaN(bjc['step'])) {
        if (getParameterByName("step") === "") {
            // TODO -- this shouldn't happen, but we could intelligently find 
            // which step this should be
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
            cache : true, // cache the topic page.
            success: bjc.processLinks
        });
    }
    
}; // close secondarysetup();


/** 
 *  Processes just the hyperlinked elements in the topic file,
 *  and creates navigation buttons.
 *  FIXME: This should share code with BJC topic!
 */
bjc.processLinks = function(data, ignored1, ignored2) {
    var temp = getParameterByName("topic");
    if (typeof temp == "object") {
        bjc['file'] = temp[1];
    } else {
        bjc['file'] = temp;
    }
    
    var hidden = [];
    var hiddenString = "";
    
    // URL Options
    temp = window.location.search.substring(1).split("&");
    
    for (var i = 0; i < temp.length; i++) {
        var param = temp[i].split("="); // param = [OPTION, VALUE]
        if (param[0].substring(0, 2) == "no" && param[1] == "true") {
            hidden.push(param[0].substring(2));
            hiddenString += ("&" + temp[i]);
        }
    } // end for loop
    
    // TODO: Refactor multiple vars...
    var course = getParameterByName("course");
    var nav_div = $('.' + TOPNAV);
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
    var list_header = $(document.createElement("div")).attr(
        {'class': 'list_header'});
    list_header.menu();
    
    for (var i = 0; i < lines.length; i++) {
        line = lines[i];
        line = bjc.stripComments(line);
        
        // TODO: Refactor
        var cond = line.length <= 1 || (hidden.indexOf($.trim(line.slice(0, line.indexOf(":")))) !== -1);
        if (cond) {
            continue;
        }
        
        // Line is a title.
        if (line.indexOf("title:") !== -1) {
            /* Create a link back to the main topic. */
            url = bjc.rootURL + "/topic/topic.html?topic=" + bjc.file + hiddenString + "&course=" + course;
            text = line.slice(line.indexOf(":") + 1);
            
            if (text.length > 35) {
                text = text.slice(0, 32) + "...";
            }
            
            text = "<span class='main-topic-link'>" + text + "</span>";
            option = $(document.createElement("a")).attr(
                {'href': url});
            option.html(text);
            list_item = $(document.createElement("li")).attr(
                {'class': 'list_item'});
            list_item.append(option);
            list.prepend(list_item);
            
            continue;
        }
        
        // Line contains a link
        if (line.indexOf("[") !== -1) {
            text = line.slice(line.indexOf(":") + 1, line.indexOf("["));
            
            if (text.length > 35) { // Truncate Long Titles
                text = text.slice(0, 32) + "...";
            }
            
            url = (line.slice(line.indexOf("[") + 1, line.indexOf("]")));
            if (url.indexOf("http") !== -1) {
                url = bjc.rootURL + "/admin/empty-curriculum-page.html" +
                     "?" + "src=" +  url + "&" + "topic=" + bjc.file +
                     "&step=" + num + "&title=" + text + hiddenString +
                     "&course=" + course;
            } else {
                if (url.indexOf(bjc.rootURL) === -1 && 
                    url.indexOf("..") === -1) {
                    url = bjc.rootURL + (url[0] === "/" ? "" : "/") + url;
                }
                url += url.indexOf("?") !== -1 ? "&" : "?" ;
                url += "topic=" + bjc.file + "&step=" + num + hiddenString;
                url += "&course=" + course;
            }
            bjc['url_list'].push(url);
            
            // TODO: Refactor Button code out.
            if (num === (bjc.step - 1)) {
                backButton.attr({'value': url});
                backButton.button({disabled: false});
                b_backButton.attr({'value': url});
                b_backButton.button({disabled: false});
            } else if (num == bjc.step) {
                text = "<span class='current-step-link'>" + text + "</span>";
                // FIXME -- why does this only work here?
                list_header.html("Click here to navigate...");
            } else if (num == (bjc.step + 1)) {
                forwardButton.attr({'value': url});
                forwardButton.button({disabled: false});
                b_forwardButton.attr({'value': url});
                b_forwardButton.button({disabled: false});
            }
            
            option = $(document.createElement("a")).attr({'href': url});
            option.html(text);
            
            list_item = $(document.createElement("li")).attr({'class': 'list_item'});
            list_item.append(option);
            list.append(list_item);
            num += 1;
        }
    } // end for loop
    
    var course_link = getParameterByName("course");
    if (course_link !== "") {
        if (course_link.indexOf("http://") === -1) {
            course_link = bjc.rootURL + "/course/" + course_link;
        }
        list_item = $(document.createElement("li")).attr(
            {'class': 'list_item'});
        list_item.append($(document.createElement("a")).attr(
            {"class": "course_link", "href": course_link} ).html(
            "Go to Main Course Page"));
        list.prepend(list_item);
    }

    list_header.click(navDropdownToggle);
    nav.append(backButton);
    nav.append(list_header);
    nav.append(list);
    nav.append(forwardButton);
    // var background = $(document.createElement("div")).attr(
    //     {'class': 'nav_background'});
    // nav.append(background);
    
    nav_div.append(nav);
    list_header.width(list.outerWidth());
    list.slideToggle(0);    
    
    if (document.URL.indexOf("empty-curriculum-page.html") !== -1) {
        // DO SOMETHING when loading from an empty curriculum page
        bjc.addFrame();
    } else {
        $("#full").append('<div id="full-bottom-bar"></div>');
        var b_nav = $(document.createElement("div")).addClass("bottom-nav");
        b_nav.append(b_backButton);
        b_nav.append(b_forwardButton);
        // b_nav.append(background.clone());
        $("#full-bottom-bar").append(b_nav);
    }

    // FIXME -- RENAME, parameter check
    bjc.moveAlonzo(bjc.url_list.length, bjc.step,
           Number($("#full-bottom-bar").css("width").slice(0, -2)), 
           Number(b_backButton.css("width").slice(0, -2)) +
           Number(b_forwardButton.css("width").slice(0, -2)));

} // end processLinks()


bjc.addFrame = function() {
    var source = getParameterByName("src");
    $("#full").append('<a href=' + source + ' target="_">Open page in new window</a><br><br>');
    $("#full").append('<div id="cont"></div>');
    var frame = $(document.createElement("iframe")).attr({'src': source, 'class': 'step_frame'});
    $("#cont").append(frame);
}

bjc.goBack = function() {
    window.location.href = bjc['url_list'][bjc.step - 1];
}

bjc.goForward = function() {
    window.location.href = bjc['url_list'][bjc.step + 1];
}

/* Hides the dropdown when a user clicks somewhere else. */
function navDropdownToggle() {
    // FIXME -- make text a variable.
    var list_header = $('.list_header'),
        close_state = "Click here to navigate...",
        open_state = "Click anywhere to close...";
    if (list_header.html() === close_state) {
        list_header.html(open_state);
    } else {
        list_header.html(close_state);
    }
    $($(".steps")[0]).slideToggle(300);
}

$('html').click(function(event) {
    if (!$(event.target).is( $('.list_header')[0] )) {
        $( $(".steps")[0] ).slideUp(300);
    }
});

/** Positions an image along the bottom of the lab page, signifying progress.
 *  numSteps is the total number of steps in the lab
 *  currentStep is the number of the current step
 *  totalWidth is the width of the entire bottom bar
 *  buttonWidth is the combined width of the two nav buttons.
 */
bjc.moveAlonzo = function(numSteps, currentStep, totalWidth, buttonWidth) {
    var width = totalWidth - Number($('.bottom-nav').css('width').slice(0, -2)),
        result;
    
    if (currentStep < numSteps - 1) {
        width *= .98;
        result = Math.round((currentStep * (width / (numSteps - 1)) + 1) / totalWidth * 100) + "%";
    } else {
        var picWidth = $("#full-bottom-bar").css("background-size");
        picWidth = picWidth.slice(0, picWidth.indexOf("px"));
        // the 4 is just to add a bit of space
        result = width - Number(picWidth) - 4 + "px"; 
    }
    
    result = result + " 2px";
    $("#full-bottom-bar").css("background-position", result)
}


$(document).ready(bjc.secondarySetUp);
