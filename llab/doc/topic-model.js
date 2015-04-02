/* LLAB JSON Object Defintion for a "topic" file.
 * Encoded as a JS Object because JSON doesn't support comments.
 * NOTE: This page is mostly a thought process and not a spec
 * The display renderings really have nothing to do with this model
 *    ...but they are the context for how things should be rendered on a topic
 *    html page, or in the dropdown (places where the topic is currently parsed)
 *
 * REQUIREMENTS:
 *  * Flexibility
        Support for optional metadata type stuff
 *  *
 * CONVENTIONS:
 *  * "url" vs "path"
 *  * singular vs plural names
 *      plurals are ALWAYS an array structure -- but I violated this already :(
 *
 * (KNOWN) TYPES:
 *      topic
 *      section -- FIXME, should we have a better name?
            [Semantically, this follows the <section> html tag.]
 *      resource
 *      resource-quiz
 *      resource-video
 *      resource-reading
 *      resource-homework
 *      big-ideas
 *      activities
 */
topicModel = {
    title: 'Topic Title',
    type: 'topic',
    url: '/bjc-r/...', // File Name Should be from the root of the web server
    contents: [
        { // Each of these "objects" would be defined by the type attribute.
            type: 'resource',
            contents: 'Hello',
            url: '/bjc-r/...'
        },
        "Should super-simple strings be supported?",
        {...}
    ]
}

/* Content Type Definitions
 *
 */

big_ideas = {
    type: 'big-ideas',
    contents: [
        'Items In a list',
    ]
}

//
activities = big_ideas

// Sections
section = {
    type: 'section', // Better name needed
    contents: [
        // Resource Objects
    ],
    url: '?' // Can "sections" be externally linked, like nested files?
}

// Applies to all resources in the dropdown menu. 3 known types
resource = {
    type: 'resource[-quiz|-reading|-video|-homework]',
    contents: ['Text or an HTML string'],
    url: '/content/repo/path/to/page.html'
}

// Items that aren't in the dropdown:
// This is treated like a resource, and doesn't have a URL
//
raw_html = {
    type: 'css-class-to-be-applied',
    contents: ['Some stuff...maybe an array??'],
    url: 'optional - would wrap stuff in an <a> tag..'
}

