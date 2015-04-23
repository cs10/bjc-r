if (typeof llab === 'undefined') {
    llab = {};
    llab.paths = {};
    llab.paths.css_files = [];
    llab.loaded = {};
}

/*
 ***********************
 ******** CONFIG *******
 ***********************
 */


// if the website isn't at the root of the server, add the path here.
// starting / means this is an absolute link, yo
llab.rootURL = "/bjc-r/";


// change if llab scripts are installed in a different path *within* rootURL.
llab.install_directory = "llab/";

// absolute path to llab files -- don't change this
llab.llab_path = llab.rootURL + llab.install_directory;

// reference your custom CSS files, from within llab install directory.
// Multiple CSS files is fine, include a separate push for each
// llab.paths.css_files.push('css/3.3.0/bootstrap.min.css');
// llab.paths.css_files.push('css/3.3.0/bootstrap-theme.min.css');
llab.paths.css_files.push('css/3.3.0/bootstrap-compiled.min.css');
llab.paths.css_files.push('css/default.css');


// courses -- path to folder containing courses.
//  a course 'name', when prepended with this, will be an absolute link
llab.courses_path = llab.rootURL + "course/";

// TOPICS (old style) stuff.
//  place where you put (oldstyle) X.topic files, used when building menus on curriculum pages
llab.topics_path = llab.rootURL + "topic/";
//  used when referring to a topic page -- you could change this location
llab.topic_launch_page = llab.llab_path + "html/topic.html";
llab.alt_topic_page = llab.rootURL + "topic/topic.html";
llab.empty_curriculum_page_path = llab.llab_path + "html/empty-curriculum-page.html";


// google analytics tokens
// llab.GACode = 'UA-47210910-3' -- CS10 Code;
llab.GACode = 'UA-57857730-3'
llab.GAurl  = document.hostname;


// USER
llab.user = {};
//// Ug, this configuration needs to be done at end of load, after USER objects
//// are defined.  Need a syntax for this.  For now just doing it in user.js
// llab.user.user = new USER_NO_AUTH();  // simple user




/*
 ******************************
 ********* END CONFIG *********
 ******************************
 */

llab.loaded['config'] = true;