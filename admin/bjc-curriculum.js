/** BJC-CURRICULUM
 * sets up a BJC curriculum page -- either local or external.
 * Uses jquery, jquery-ui.
 * This is borrowed from UCCP APCSA work
 */


bjc['file'] = "";
bjc['step'] = NaN;
bjc['url_list'] = new Array();


bjc.secondarySetUp = function() {

    // insert main div
    if ($("#full").length === 0) {
        $(document.body).wrapInner('<div id="full"></div>');
    }
    
    // Create the header section and nav buttons
    bjc.createTitleNav();
    
    // create Title tag, yo
    if (getParameterByName("title") != "") {
        document.title = decodeURIComponent(getParameterByName("title"));
    }
    
    // Set the header title to the page title.
    var titleText = document.title;
    if (titleText) { // && $(".header").length === 0 // this shouldn't happen.
        $('.header').html(titleText);
        // I don't think this does anything. If nothing breaks I'll remove it.
        // if (getParameterByName("title") != "") {
        //     $(".header").html(titleText);
        // }
    }
    
    // FIXME -- should just be in css...?
    document.body.style.marginTop = "0";
    // Clean up document title if it contains HTML
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
            vocabDiv.append('<a href="' + bjc.rootURL +
                '/glossary/view.html?term=' + this.getAttribute('term')
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
        $('#full').wrapInner('<div id="mainCol"></div>').prepend(
            '<div id="marginCol"></div>');
        // this moves the divs over.  Perhaps it could do some smarter ordering
        // always put vocab at the bottom, for instance.
        var marginCol = $("#marginCol").get(0);
        $.each(marginSelector, function(i, divclass) {
            $(divclass).appendTo(marginCol);
        });
    }

    // Get the topic file and step from the URL
    bjc.step = parseInt(getParameterByName("step"));
    var topicFile = getParameterByName("topic");

    // We don't have a topic file, so we should exit.
    if (topicFile === "" || isNaN(bjc['step'])) {
        return;
    }
    
    if (getParameterByName("step") === "") {
        // TODO -- this shouldn't happen, but we could intelligently find 
        // which step this should be
    }
    
    
    if (typeof topicFile == "object") {
        bjc['file'] = topicFile[1];
    } else {
        bjc['file'] = topicFile;
    }
    
    $.ajax({
        url : bjc.rootURL + "/topic/" + bjc.file,
        type : "GET",
        dataType : "text",
        cache : true, // cache the topic page.
        success: bjc.processLinks
    });
}; // close secondarysetup();


/** 
 *  Processes just the hyperlinked elements in the topic file,
 *  and creates navigation buttons.
 *  FIXME: This should share code with BJC topic!
 */
bjc.processLinks = function(data, ignored1, ignored2) {
    // This is handled above...
    // var temp = getParameterByName("topic");
    // if (typeof temp == "object") {
    //     bjc['file'] = temp[1];
    // } else {
    //     bjc['file'] = temp;
    // }

    var hidden = [];
    var hiddenString = "";
    
    // URL Options
    var temp = window.location.search.substring(1).split("&");
    
    for (var i = 0; i < temp.length; i++) {
        var param = temp[i].split("="); // param = [OPTION, VALUE]
        if (param[0].substring(0, 2) == "no" && param[1] == "true") {
            hidden.push(param[0].substring(2));
            hiddenString += ("&" + temp[i]);
        }
    } // end for loop
    
    // TODO: Refactor multiple vars...
    var textLength = 35;
    var course = getParameterByName("course");
    var lines = data.split("\n");
    var num = 0;
    var url = document.URL;
    var list = $(document.createElement("ul")).attr(
        {'class': 'dropdown-menu dropdown-menu-right', 
         'role' : "menu",  'aria-labelledby' : "Topic-Navigation-Meu"});
    var option;
    var text;
    var list_item;
    
    for (var i = 0; i < lines.length; i++) {
        var line = bjc.stripComments($.trim(lines[i]));
        
        // Skip is this line is hidden in URL params.
        var used = hidden.indexOf(line.slice(0, line.indexOf(":"))) === -1;
        if (!used) continue;
        
        // Line is a title.
        if (line.indexOf("title:") !== -1) {
            /* Create a link back to the main topic. */
            url = bjc.rootURL + "/topic/topic.html?topic=" + bjc.file +
                  hiddenString + "&course=" + course;
            
            text = line.slice(line.indexOf(":") + 1);
            text = bjc.truncate($.trim(text), textLength);
            
            text = "<span class='main-topic-link'>" + text + "</span>";
            // TODO: Lots of code duplication here.
            option = $(document.createElement("a")).attr(
                {'href': url, 'role': 'presentation'});
            option.html(text);
            list_item = $(document.createElement("li")).attr(
                {'class': 'list_item', 'role' : 'presentation'});
            list_item.append(option);
            var separator = $(document.createElement("li")).attr(
                {'class': 'divider list_item', 'role' : 'presentation'});
            list.prepend(separator);
            list.prepend(list_item);
            
            continue;
        }
        
        // TODO: Before checking for links in a title.
        // If we don't have a link, skip this line.
        var hasLink = line.indexOf("[") !== -1 && line.indexOf("]") !== -1;
        if (!hasLink) {
            continue; 
        }
        
        // Grab the link title between : and [ 
        text = line.slice(line.indexOf(":") + 1, line.indexOf("["));
        text = bjc.truncate($.trim(text), textLength);
        // Grab the link betweem [ and ]
        url = (line.slice(line.indexOf("[") + 1, line.indexOf("]")));
        
        // Content References an external resource
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
        
        // Make the current step have an arrow in the dropdown menu
        if (num === bjc.step) {
            text = "<span class='current-step-link'>" + text + "</span>";
        }

        option = $(document.createElement("a")).attr(
            {'href': url, 'role' : 'menuitem'});
        option.html(text);
        
        list_item = $(document.createElement("li")).attr(
            {'class': 'list_item', 'role' : 'presentation'});
        list_item.append(option);
        list.append(list_item);
        num += 1;
    } // end for loop
    
    if (course !== "") {
        if (course.indexOf("http://") === -1) {
            course = bjc.rootURL + "/course/" + course;
        }
        var course_text = $(document.createElement('span')).attr(
            {'class' : 'course_link_list'});
        course_text.html("Go to Main Course Page");
        list_item = $(document.createElement("li")).attr(
            {'class': 'list_item', 'role' : 'presentation'});
        list_item.append($(document.createElement("a")).attr(
            {"href": course}).html(course_text));
        list.prepend(list_item);
    }

    // BUILD THE DROPDOWN MENU -- Uses Bootstrap 3
    // TODO: Refactor to be in a function
    bjc.setButtonURLs();
    var dropwon, list_header, caret;
    // Container div for the whole menu (title + links)
    dropdown = $(document.createElement("div")).attr(
        {'class': 'dropdown inline'});
    // Caret for the dropdown menu
    caret = $(document.createElement("span")).attr( {'class': 'caret'} );
    // build the list header
    list_header = $(document.createElement("div")).attr(
        {'class': 'btn btn-default dropdown-toggle',
         'type' : 'button', 'data-toggle' : "dropdown" });
    // Set Header Text and click function
    list_header.html("Click here to navigate...");
    list_header.click(bjc.navDropdownToggle);
    list_header.append(caret);
    // Insert dropdown items IN ORDER. 
    dropdown.append(list_header);
    dropdown.append(list);
    
    // Insert into the top div only.
    dropdown.insertAfter($('.top-nav .nav .backbutton'));
    
    list_header.width(list.outerWidth());
    
    if (document.URL.indexOf("empty-curriculum-page.html") !== -1) {
        bjc.addFrame();
    }

    // FIXME -- RENAME, parameter check
    bjc.moveAlonzo(bjc.url_list.length, bjc.step);

} // end processLinks()


// Create an iframe when loading from an empty curriculum page
// Used for embedded content. (Videos, books, etc)
bjc.addFrame = (function() {
    var source = getParameterByName("src");
    
    $("#full").append('<a href=' + source + 
        ' target="_">Open page in new window</a><br /><br />');
    $("#full").append('<div id="cont"></div>');
    
    var frame = $(document.createElement("iframe")).attr(
        {'src': source, 'class': 'step_frame'} );
    
    $("#cont").append(frame);
});


bjc.createTitleNav = function() {
    var topHTML = "<div class='top-nav'><div class='header'></div></div>";
    var botHTML = "<div class='full-bottom-bar'></div>";
    var navHTML = "<div class='nav btn-group'></div>";
    var topNav = $('.top-nav');
    var botNav = $('.full-bottom-bar');
    var buttons = "<a class='btn btn-default backbutton arrow'>&larr;</a>" +
                   "<a class='btn btn-default forwardbutton arrow'>&rarr;</a>";
    
    if (topNav.length === 0) {
        $(document.body).prepend(topHTML);
        topNav = $('.top-nav');
        topNav.append(navHTML);
    }
    
    // Don't add anything else if we don't know the step...
    if (isNaN(bjc.step)) {
        return;
    }

    if (botNav.length === 0) {
        $(document.body).append(botHTML);
        botNav = $('.full-bottom-bar');
        botNav.append(navHTML);
    }
        
    var forward = $('.forwardbutton'),
        back   = $('.backbutton');
        
    var buttonsExist = forward.length === 2 && back.length === 2;
    
    if (!buttonsExist && !isNaN(bjc.step)) {
        $('.nav').append(buttons);
    }
};

// Create the Forward and Backward buttons, properly disabling them when needed
bjc.setButtonURLs = function() {
    // No dropdowns for places that don't have a step.
    if (isNaN(bjc.step)) {
        return;
    }
    
    var forward = $('.forwardbutton'),
        back    = $('.backbutton');
        
    var buttonsExist = forward.length === 2 && back.length === 2;
    
    if (!buttonsExist) {
        bjc.createTitleNav();
        // Grab the freshly minted buttons. MMM, tasty!
        forward = $('.forwardbutton');
        back    = $('.backbutton');
    }
    
    // Disable the back button
    if (bjc.step === 0) {
        console.log('back')
        back.each(function(i, item) {
            console.log(item);
            $(this).addClass('disabled');
            $(this).attr('href', '#')
        });
    } else {
        back.each(function(i, item) {
            $(this).removeClass('disabled');
            $(this).attr('href', bjc.url_list[bjc.step - 1])
            $(this).click(bjc.goBack);
        });
    }
    
    // Disable the forward button
    if (bjc.step >= bjc.url_list.length - 1) {
        forward.each(function(i, item) {
            $(this).addClass('disabled');
            $(this).attr('href', '#')
        });
    } else {
        forward.each(function(i, item) {
            $(this).removeClass('disabled');
            $(this).attr('href', bjc.url_list[bjc.step + 1])
            $(this).click(bjc.goForward);
        });
    }
};

bjc.goBack = function() {
    window.location.href = bjc['url_list'][bjc.step - 1];
};

bjc.goForward = function() {
    window.location.href = bjc['url_list'][bjc.step + 1];
};

/* Hides the dropdown when a user clicks somewhere else. */
bjc.navDropdownToggle = function() {
    var list_header = $('.list_header'),
        close_state = "Click here to navigate...",
        open_state = "Click anywhere to close...";
    if (list_header.html() === close_state) {
        list_header.html(open_state);
    } else {
        list_header.html(close_state);
    }
    $($(".steps")[0]).slideToggle(300);
};

/** Positions an image along the bottom of the lab page, signifying progress.
 *  numSteps is the total number of steps in the lab
 *  currentStep is the number of the current step
 *  totalWidth is the width of the entire bottom bar
 *  buttonWidth is the combined width of the two nav buttons.
 */
bjc.moveAlonzo = function(numSteps, currentStep ) {
    var totalWidth = Number($(".full-bottom-bar").css("width").slice(0, -2)),
        buttons = Number($('.full-bottom-bar .nav').css('width').slice(0, -2)),
        width = totalWidth - buttons,
        result; // result stores left-offset of background image.
    
    if (currentStep < numSteps - 1) {
        width *= .98;
        result = (currentStep * (width / (numSteps - 1)) + 1) / totalWidth;
        result = (result * 100) + "%";
    } else {
        var picWidth = $(".full-bottom-bar").css("background-size");
        picWidth = picWidth.slice(0, picWidth.indexOf("px"));
        // the 4 is just to add a bit of space
        result = width - Number(picWidth) - 4 + "px"; 
    }
    
    result = result + " 2px";
    $(".full-bottom-bar").css("background-position", result);
};

/* Create an event to collapse dropdown menu when mouse is clicked anywhere */
$('html').click(function(event) {
    if (!$(event.target).is( $('.list_header')[0] )) {
        $( $(".steps")[0] ).slideUp(300);
    }
});

// Setup the nav and parse the topic file. 
$(document).ready(bjc.secondarySetUp);
