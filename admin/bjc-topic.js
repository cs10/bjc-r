
bjc['file'] = "";


/*
  
Renders Topic pages
  
Special lines start with 
  
   title:
   		this replaces the page <title> and the main heading with the value
   { }
   	    this draws a box around the stuff in between the braces
		
   topic: the title for each topic
	
   heading: a smaller heading. may also use h1, h2, etc.
   	    
   learning-goal: 
        puts values of adjacent lines that start with this as items in learning goals list.  
        a blank line or other non learning-goal: line will end the list

   big-idea:
        same as above, for a big ideas list
        
   <4 spaces>
        if a line starts with four/eight/twelve spaces (tab characters also work), 
        it will have an added class stuck in it called 'indent1', 'indent2', etc.  
        The line will be treated as any other line otherwise
        
   raw-html: 
        all following lines until a blank line are just raw html that stuck on the page.
	
other currently supported classes: quiz, assignment, resource, forum, video, extresource.
        
Other lines get their own <div> with the class as specified in the string before the colon
Can also specify some actual html tags before the colon (e.g. h1)
Anything in a [] is stuck as the target of a link

 */

/* The allowed tags for easy entry.
 * e.g.   h1: Some Text [maybe/a/link/too]
 */
//TODO put in bjc namespace
var tags = ["h1", "h2", "h3", "h4", "h5", "h6"];



bjc.renderFull = function(data, ignored1, ignored2) {
	var lines = data.split("\n");
	var line;
	var in_topic = false;
	var topic;
	var item;
	var learningGoal = false;
	var bigIdea = false;
	var list;
	var raw = false;
	var text;
	var num = 0;
	var indent = "";
	var url = document.URL;
	for (var i = 0; i < lines.length; i++) {
		line = lines[i];
		line = bjc.stripComments(line);
		if (line.length > 1 && !raw) {
			if (line.slice(0, 6) == "title:") {
				//TODO pull out the html tags for the page title
				$("div .header").html(line.slice(6));
				document.title = $("div .header").text();
				learningGoal = false;
				bigIdea = false;
			} else if (line.slice(0, 8) == "raw-html") {
				raw = true;
			} else if (line.slice(0,1) == "{") {
				in_topic = true;
				topic = $(document.createElement("div")).attr({'class': 'topic'});
				$("#full").append(topic);
				learningGoal = false;
				bigIdea = false;
			} else if (line.slice(0, 6) == "topic:") {
				item = $(document.createElement("div")).attr({'class': 'topic_header'}).append(line.slice(6));
				topic.append(item);
				learningGoal = false;
				bigIdea = false;
			} else if (line.slice(0, 8) == "heading:") {
				item = $(document.createElement("h3")).append(line.slice(8));
				topic.append(item);
				learningGoal = false;
				bigIdea = false;
			} else if (line.slice(0,1) == "}") {
				in_topic = false;
				learningGoal = false;
				bigIdea = false;
			} else if (line.slice(0, 13) == "learning-goal") {
				bigIdea = false;
				if (learningGoal) {
					list.append($(document.createElement("li")).append(line.slice(14)));	
				} else {
					indent = bjc.indentString(line);
					line = $.trim(line);
					learningGoal = true;
					item = $(document.createElement("div")).attr({'class': 'learninggoals' + indent});
					list = $(document.createElement("ul"));
					list.append($(document.createElement("li")).append(line.slice(14)));
					item.append(list);
					topic.append(item);
				};
			} else if (line.slice(0, 8) == "big-idea") {
				learningGoal = false;
				if (bigIdea) {
					list.append($(document.createElement("li")).append(line.slice(9)));	
				} else {
					indent = bjc.indentString(line);
					line = $.trim(line);
					bigIdea = true;
					item = $(document.createElement("div")).attr({'class': 'bigideas' + indent});
					list = $(document.createElement("ul"));
					list.append($(document.createElement("li")).append(line.slice(9)));
					item.append(list);
					topic.append(item);
				};
			} else {
				indent = bjc.indentString(line);
				line = $.trim(line);
				learningGoal = false;
				bigIdea = false;
				if (line.indexOf(":") != -1 && bjc.isTag(line.slice(0, line.indexOf(":")))) {
					item = $(document.createElement(line.slice(0, line.indexOf(":"))));
				} else if (line.indexOf(":") != -1) {
					item = $(document.createElement("div")).attr({'class': line.split(":")[0] + indent});
				} else {
					item = $(document.createElement("div"));
				}
				if (line.indexOf("[") != -1) {
					var temp = $(document.createElement("a"));
					text = line.slice(line.indexOf(":") + 1, line.indexOf("["))
					temp.append(text);
					url = (line.slice(line.indexOf("[") + 1, line.indexOf("]")));
					if (url.indexOf("http") != -1) {
						url = "/bjc-course/admin/empty-curriculum-page.html" + "?" + "src=" + url + "&" + "topic=" + bjc.file + "&step=" + num + "&title=" + text;
					} else {
						url += "?" + "topic=" + bjc.file + "&step=" + num;
					}
					num += 1;
					temp.attr({'href': url});
					item.append(temp);
					//url_list.push(url);
					//topic_list.push(text);
				} else {
					item.append(line.slice(line.indexOf(":") + 1));
				}
				topic.append(item);
			}
		} else if (line.length == 1) {
			learningGoal = false;
			bigIdea = false;
			raw = false;
		} else if (raw) {
			var raw_html = "";
			while (line.length > 1 && line.slice(0, 1) != "}") {
				raw_html += " " + line;
				i++;
				line = lines[i];
			}
			topic.append(raw_html);
			raw = false;
		} else {
			learningGoal = false;
			bigIdea = false;
		}
	}
}






/* Returns the indent class of this string,
 * depending on how far it has been indented
 * on the line. */
bjc.indentString = function(s) {
	var len = s.length;
	var count = 0;
	for (var i = 0; i < len; i++) {
		if (s[i] == " ") {
			count++;
		} else if (s[i] == "\t"){
			count += 4;
		} else {
			break;
		}
	}
	return " indent" + Math.floor(count/4);
}


/* Returns true iff S is an allowed html tag. */
bjc.isTag = function(s) {
	var n = tags.length;
	for (var i = 0; i < n; i++) {
		if (s == tags[i]) {
			return true;
		}
	}
	return false;
}



if (getParameterByName("topic") != "") {
	bjc.file = getParameterByName("topic");
	$.ajax({
		url : "/bjc-course/topic/" + bjc.file,
		type : "GET",
		dataType : "text",
		cache : false,
		success : bjc.renderFull
	});
} else {
	// TODO -- better error messge.  maybe show default course or topic?
	document.getElementsByTagName('BODY').item(0).innerHTML = "Please specify a file in the URL.";
}




//document.functionsReady = true;


/*
Error checking (do this after building page, so it won't slow it down?)

  Check the link targets if present - if they aren't there (give a 404), 
  put a "broken" class on the link to render in red or something 

  Maybe be smart about a mistyped youtube target?  dunno.

Be forgiving:

  if there is no closing brace, put one there when another one opens or the page ends

No error checking:

  No error checking on class name before the colon - it could be misspelled
  
  if no colon at all, just put no class on the div
  
  
  
 */


