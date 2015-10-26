// user.js

// this should allow google ids, etc, per settings in config.js.


//  for 61b, this is a simple user-id system where the user picks the username

// this all takes place in a dialog.


///  USER prototypes following api
///  -- getUserName()   -> string
///  -- isUserNameSet()  -> boolean
///  -- getSection() -> string: group user belongs to with approx size = 20

//// TODO fix the dialog hack, make it general for google accts, etc
///  -- dialoghtml -> a string of html..
///  -- showDialog()
///  -- hideDialog()  


/////////////////
///////////////// simple no authentication user object
///  the user chooses a username and section, persisted via cookie


var USER_NO_AUTH = function() {
    this.username = llab.readCookie("llab-username");
    if (this.username == "") {
        this.username = "anonymous";
    }
    this.section = llab.readCookie("llab-section");
    if (this.section == "" || this.section == null) {
        this.section = 1;
    }
    
    this.dialoghtml = $(this.getDialogHTML());
    this.hiderdiv = $('<div id="user_hider_div"></div>');
}

USER_NO_AUTH.prototype.setUserName = function(username) {
    // very secure, natch
    this.username = username;
    llab.createCookie("llab-username", username, 365);
}

// cookie read at create time
USER_NO_AUTH.prototype.getUserName = function() {
    return this.username;
}

USER_NO_AUTH.prototype.isUserNameSet = function() {
    return (this.username != null && this.username != "anonymous" && this.username != "");
}


USER_NO_AUTH.prototype.setSection = function(section) {
    this.section = section;
    llab.createCookie("llab-section", section);
}

// cookie read at create time
USER_NO_AUTH.prototype.getSection = function() {
    return this.section;
}


USER_NO_AUTH.prototype.showDialog = function() {
    $("#user_hider_div").fadeIn("slow");
    $("#USER_NO_AUTH_DIALOG > .username > input").val(this.getUserName());
    $("#USER_NO_AUTH_DIALOG > .section > input").val(this.getSection());
    $("#USER_NO_AUTH_DIALOG").fadeIn("slow");
}


USER_NO_AUTH.prototype.hideDialog = function() {
    $("#user_hider_div").fadeOut("slow");
    $("#USER_NO_AUTH_DIALOG").fadeOut("slow");
}




// TODO bind escape key to hideDialog()
USER_NO_AUTH.prototype.getDialogHTML = function() {
    template = 
    '<div id="USER_NO_AUTH_DIALOG">' +
        '<p>Enter your username and section</p>' +
        '<div class="username">' +
           'Username: ' +
           '<input name="username" type="text" width="80" onblur="llab.user.user.userNameBlur()">' +
        '</div>' +
           '<div class="section">' +
           'Section: ' +
           '<input name="section" type="text" width="80" onblur="llab.user.user.sectionBlur()">' +
        '</div>' +
        '<div class="closebutton">' +
           '<input type="button" value="OK" onClick="llab.user.user.hideDialog();"/>' + 
        '</div>' +
    '</div>';
    return template;
}


USER_NO_AUTH.prototype.userNameBlur = function() {
    this.setUserName($("#USER_NO_AUTH_DIALOG > .username > input").val());
}

USER_NO_AUTH.prototype.sectionBlur = function() {
    this.setSection($("#USER_NO_AUTH_DIALOG > .section > input").val());
}





/////////////////// END USER_NO_AUTH



// defaults if not set in config.js for some reason.

if (llab.user == null) {
    llab.user = {};
};
if (llab.user.user == null) {
    llab.user.user = new USER_NO_AUTH();
}

$(document).ready(function() {
    llab.user.user.dialoghtml.appendTo($("body")).hide();
    //$("#user-dialog").hide();
    llab.user.user.hiderdiv.appendTo($("body")).hide();
    //$("#user_hider_div").hide();
});

llab.loaded['user'] = true;
