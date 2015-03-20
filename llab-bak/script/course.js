/*
 * course.js
 *
 * loaded on course pages
 * Modifies the links on a course page so that queries are properly passed along
 *
 * Depends on:
 *      llab loader
 *      jQuery
 */

'use strict';

 /* Create the Query string for links to each topic within a course. */
llab.editURLs = function() {
    var query = {},
        docPath = location.pathname;

    // Set the 'course' attribute
    if (docPath.indexOf(llab.courses_path) !== -1) {
        // Exclude the path to the course file because it gets added back later
        query['course'] = docPath.replace(llab.courses_path, '');
    }

    // TODO: only really supports one container per file.
    // Build the Query string from container attributes
    $(".topic_container").each(function() {
        $.extend(query, llab.getAttributesForElement(this));
        // query = llab.merge(query, llab.getAttributesForElement(this));
        // TODO: Nest the loop below within this container.
        // Then only extent the query object temporarily
    });

    $(".topic_link a").each(function() {
        var str = this.href.indexOf('?') === -1 ? '?' : '&';
        this.href += str + llab.QS.stringify(query);
    });
};

$(document).ready(function() {
    llab.editURLs();
});