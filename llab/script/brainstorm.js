/*
 * brainstorm tool, adapted from Wise4 stuff
 */

llab.bs = {};
llab.bs.nodes = [];


///////////

// starting point, after page load
llab.bs.buildNodes = function() {
    var bsdatas = $("div.brainstorm-data");
    var num = bsdatas.length;


    for (var i = 0; i < num; i++) {
        var bsdata = $(bsdatas.get(i));
    
        var handleRemoteBSData = function(data, status, jqxhr) {
            llab.bs.buildNode(data, i, true);
        }
        
        // is this going to work with multiple brainstorms?!?  huh, probably should test that
        var handleRemoteBSDataFail = function (jqxhr, status, error) {
            // TODO -- you know, write a div saying 'whoops' or something
            $(bsdata).addClass("brainstorm-get-remote-data-error");
            //$(bsdata).removeClass("brainstorm-data");
        }
        
        if (bsdata.attr("src")) {
            var target = bsdata.attr("src");
            llab.bs.getRemoteBSData(target).done(handleRemoteBSData).fail(handleRemoteBSDataFail);
        } else {
            llab.bs.buildNode(bsdata, i, false);
        }
    }

}


// use a closure to keep around location
llab.bs.getRemoteBSdata = function(target) {
    return $.ajax({
        url : target,
        type : "GET",
        dataType : "html"
    });
}




// bsdata is a div with the relevant data (see example.brainstorm)
// i is the index of this brainstorm in all the brainstorms on the page, probably unneccesary
// fetched is boolean, whether the bsdata was ajax'ed from another file
// success is (if fetched == true) success of ajax fetch
llab.bs.buildNode = function(bsdata, i, fetched) {
    
    var node = new BRAINSTORM(bsdata, i);
    llab.bs.nodes[i] = node;
    //node.loadContent();
    //node.render();
    node.show();
    
}




// construct this bad boy
var BRAINSTORM = function(bsdata, i) {

    this.bsdata = bsdata;
    this.indexOnPage = i;
    var bsdiv = $(this.getContentTemplate()).insertAfter(bsdata);
    this.bsdiv = bsdiv;

    this.id = bsdata.id;

    this.showtitle = true;
    this.title = bsdata.find(".title").html();
    if (this.title == "" || this.title == null) {
        this.showtitle = false;
    }
    if (this.showtitle) {
        bsdiv.find(".title").html(this.title).css('display','block');
    }

    // now that we have id and title, set the 'real' id
    if (this.id == "" || this.id == null) {
        this.id = this.title;   // to make sure length doesn't matter
        if (this.id == "" || this.id == null) {
            this.id = bsdata.html();
        }
    }
    this.id = SHA1(this.id);  // regularlize length, make things mysterious, etc.

    this.prompt = bsdata.find(".prompt").html();
    if (this.prompt == "" || this.prompt == null) {
        // hmm, not good.  No prompt, no brainstorm...
        this.prompt = "...Shaun neeeds to fill in this missing prompt...";
    }
    bsdiv.find(".prompt").html(this.prompt);
    
    // height of textarea
    var inputarea = bsdiv.find(".input").find(".inputarea");
    var numlines = inputarea.attr('rows');
    var numlines_toset = bsdata.attr('expected-lines');
    if (numlines_toset != "" || numlines_toset != null) {
        numlines = numlines_toset;
    }
    inputarea.attr('rows', numlines);



    //
    this.responses = [];

}

BRAINSTORM.prototype.show = function() {
    this.bsdata.hide(125);
    this.bsdiv.css('display', 'block');
    this.bsdiv.show(125);
}


// TODO EJS or anything templatey?
BRAINSTORM.prototype.getContentTemplate = function() {
    // template needs to start with '<' !! no spaces, sigh
    var template =  
        '<div class="brainstorm">' + 
        '   <div class="settings">' +
        '      <img src="' + llab.llab_path + 'img/brainstorm-gear.png" alt="Settings" onClick="llab.user.user.showDialog();" />' + 
        '   </div>' + 
        '   <div class="title"></div>' + 
        '   <div class="prompt"></div>' + 
        '   <div class="input">' + 
        '      <p>My Response: </p>' + 
        '      <textarea class="inputarea" rows="5" cols="100"></textarea>' + 
        '      <input class="inputbutton" type="button" value="save" onclick="save()" />' + 
        '      <div class="inputnotification"></div> ' + 
        '   </div>' + 
        '   <div class="responses">' + 
        '      <p>Responses: </p>' + 
        '      <div class="responsebutton">' +
        '         <img src="' + llab.llab_path + 'img/brainstorm-refresh-responses.png" alt="Refresh responses" />' +
        '      </div> ' + 
        '   </div>' + 
        '</div>';
    return template;
}











$(document).ready(llab.bs.buildNodes);
