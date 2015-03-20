// Polyfills for older browsers
if (!String.prototype.endsWith) {
  Object.defineProperty(String.prototype, 'endsWith', {
    value: function(searchString, position) {
      var subjectString = this.toString();
      if (position === undefined || position > subjectString.length) {
        position = subjectString.length;
      }
      position -= searchString.length;
      var lastIndex = subjectString.indexOf(searchString, position);
      return lastIndex !== -1 && lastIndex === position;
    }
  });
}



/////////// FIXME -- put this in a better place.





/* LLAB Loader
 * Lightweight Labs system.
 * This file is the entry point for all llab pages.
 */


var THIS_FILE = 'loader.js';

llab = {};
llab.loaded = {};  // keys are true if that script file is loaded
llab.paths  = {};
llab.paths.stage_complete_functions = [];
llab.paths.scripts = [];  // holds the scripts to load, in stages below
llab.paths.css_files = [];
llab.rootURL = "";  // to be overridden in config.js
llab.install_directory = "";  // to be overridden in config.js


// This file must always be at the same level as the llab install directory
llab.CONFIG_FILE_PATH = "../llab.js";

// This file must always be at the same level as the llab install directory
llab.BUILD_FILE_PATH = "./llab-complied.js";


// Syntax Highlighting support
llab.paths.syntax_highlights = "//cdnjs.cloudflare.com/ajax/libs/highlight.js/8.4/highlight.min.js";
llab.paths.css_files.syntax_highlights = "css/tomorrow-night-blue.css";



/////////////////////////
///////////////////////// stage 0
llab.paths.scripts[0] = [];
llab.paths.scripts[0].push(llab.CONFIG_FILE_PATH);
llab.paths.scripts[0].push("lib/jquery.min.js");

llab.loaded['config'] = false;
llab.paths.stage_complete_functions[0] = function() {
    return ( typeof jQuery === 'function' && llab.loaded['config'] );
}





/////////////////
///////////////// stage 1
llab.paths.scripts[1] = [];
llab.paths.scripts[1].push("script/library.js");
// llab.paths.scripts[1].push("script/lib/sha1.js");     // for brainstorm

llab.loaded['library'] = false;
llab.paths.stage_complete_functions[1] = function() {
    return ( llab.loaded['library'] );
}



////////////////////
//////////////////// stage 2
// all these scripts depend on jquery, loaded in stage 1
// all quiz item types should get loaded here
llab.paths.scripts[2] = [];
llab.paths.scripts[2].push("script/curriculum.js");
llab.paths.scripts[2].push("script/course.js");
llab.paths.scripts[2].push("script/topic.js");
llab.paths.scripts[2].push("script/quiz/multiplechoice.js");
llab.paths.scripts[2].push("lib/bootstrap.min.js");
// llab.paths.scripts[2].push("script/user.js");

llab.loaded['multiplechoice'] = false;
llab.paths.stage_complete_functions[2] = function() {
    return ( llab.loaded['multiplechoice'] //&&
             // llab.loaded['user']
        );
}




////////////////
////////////////  stage 3
// quiz.js depends on each of the quiz item types having loaded
llab.paths.scripts[3] = [];
llab.paths.scripts[3].push("script/quiz.js");
// llab.paths.scripts[3].push("script/brainstorm.js");



llab.paths.stage_complete_functions[3] = function() {
    return true; // the last stage, no need to wait
}

//////////////

llab.getPathToThisScript = function() {
    var scripts = document.scripts;
    for (var i = 0; i < scripts.length; i += 1) {
        var src = scripts[i].src;
        if (src.endsWith('/' + THIS_FILE)) {
            return src;
        }
    }
    return '';
};

llab.thisPath = llab.getPathToThisScript();


function getTag(name, src, type) {
    var tag = document.createElement(name);

    if (src.substring(0, 2) !== "//") {
        src = llab.thisPath.replace(THIS_FILE, src);
    }

    var link  = name === 'link' ? 'href' : 'src';
    tag[link] = src;
    tag.type  = type;

    return tag;
}



llab.initialSetUp = function() {
    var headElement = document.head;
    var tag, i, src;

    // start the process
    loadScriptsAndLinks(0);

    function loadScriptsAndLinks(stage_num) {
        var i, tag;

        //console.log("starting script load stage " + stage_num);

        // load css files
        while (llab.paths.css_files.length != 0) {
            tag = getTag("link", llab.paths.css_files.shift(), "text/css");
            tag.rel = "stylesheet";
            tag.media = "screen";
            headElement.appendChild(tag);
        }

        // load scripts
        llab.paths.scripts[stage_num].forEach(function(scriptfile) {
            tag = getTag("script", scriptfile, "text/javascript");
            headElement.appendChild(tag);
        });

        if ((stage_num + 1) < llab.paths.scripts.length) {
            proceedWhenComplete(stage_num);
        }
    }

    function proceedWhenComplete(stage_num) {
        if (llab.paths.stage_complete_functions[stage_num]()) {
            if ((stage_num + 1) < llab.paths.scripts.length) {
                loadScriptsAndLinks(stage_num + 1);
            }
        } else {
            // console.log("waiting on stage " + stage_num);
            setTimeout(function() {
                proceedWhenComplete(stage_num);
            }, 5);
        }
    }
};

/////////////////////

llab.initialSetUp();

