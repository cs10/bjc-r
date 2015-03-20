
var termParam = llab.getQueryParameter("term");
var termWord = "";

if (termParam !== "") {
    file = termParam + ".body";
    termWord = filename2term(termParam);

    $.ajax({
        url:    llab.rootURL + "/glossary/" + file,
        type:    "GET",
        dataType:    "text",
        data:    myData,
        cache:    true,
        success:    renderTerm,
        error:    error_function
        });
} else {
    $.ajax({
        url:    llab.rootURL + "/glossary/",
        type:    "GET",
        dataType:    "text",
        data:    myData,
        cache:    true,
        success:    renderIndex,
        error:    error_function
        });
}


function renderTerm(body, ignored1, ignored2) {
    // uses termWord
    var joe = $(".full");
    $(".full .header").append(termWord);
    $(".full").append(body);

}

function renderIndex(page, ignored1, ignored2) {
    // render a list of all terms -- only way to do this in javascript is if the
    //  server is set up to list all contents of the directory
    $(".full .header").html("Glossary Index");
    $("li", page).each(function(index) {
        // ignore if it isn't a link that points to a *.body target
        alert(this);

        });

}


function filename2term (filename) {
    var tw = filename;
    tw = tw.replace(/_/g , " ");
    tw = tw.replace(/-/g , " ");
    return tw;
}


function error_function(jqxhr, textStatus, errorThrown) {
    // TODO term wasn't there
    // TODO server didn't send index back, yo
    alert("ERROR" + textStatus);
}
