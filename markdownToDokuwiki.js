// See online documentation for examples
// https://docs.getdrafts.com/docs/actions/scripting
//
// This action converts Markdown syntax to Dokuwiki syntax.
// It is far from full coverage and will be added to over time.
//

// get selected Drafts text
const selected_text = editor.getSelectedText()

function convertHeader(match, groupA, groupB) {
    const hl = groupA.length
    let hn = '**'
    
    if (hl === 1) {
        hn = '======'
    } else if (hl === 2) {
        hn = '====='
    } else if (hl === 3) {
        hn = '===='
    } else if (hl === 4) {
        hn = '==='
    } else {
        hn = '**'
    }
    
    return hn + ' ' + groupB + ' ' + hn
}

function convertLinks(a, b, c) {
    // a is the whole match, b and c are match groups
    const dokuLink = "[[" + c + "|" + b + "]]"
    return dokuLink
}

function convertNestLists(a) {
    // split to get beginning spaces
    let listDel = ''
    if (a.includes('-')) {
        listDel = '- '
    } else {
        listDel = '* '
    }
    const aList = a.split(listDel)[0]
    // count number of spaces before -
    const nestSpaces = aList.length
    // markdown spaces are 4, dokuwiki are 2 spaces
    // dividing by 4 let's us know how nested it is
    // take how nested it is and times it by 2 spaces
    const dokuSpaces = nestSpaces / 4 * 2
    return ' '.repeat(dokuSpaces) + listDel
}

function convertCodeBlock(a, b) {
    return "<code>" + b + "</code>"
}


// convert beginning of italics
let nt = selected_text.replace(/\b_/g, '//')
// convert end of italics
nt = nt.replace(/_\b/g, '//')
// convert ``` code blocks
nt = nt.replace(/\`{3}([^\`{3}]+)\`{3}/gm, convertCodeBlock)
// convert in-line code
// NOTE: needs to come after code blocks as Apple doesn't support lookbehind
//     regex. (?<!\`)\`{1}?(?!\`) would be the ideal regex
nt = nt.replace(/\`{1}?(?!\`)/g, "''")
// convert headers
nt = nt.replace(/(#+) (.+)/g, convertHeader)
// convert links
nt = nt.replace(/\[(.*)\]\((.*)\)/g, convertLinks)
// convert nested ordered list items
// NOTE: this needs to come before top-level, otherwise this will also grab the
//    top-level items.
// NOTE: i use - in MD instead of numbers (1.). see the readme for reasons.
nt = nt.replace(/^\s+- /gm, convertNestLists)
// convert top-level ordered list items
nt = nt.replace(/^- /gm, '  - ')
// convert nested unordered list items
// NOTE: this needs to come before top-level, otherwise this will also grab the
//    top-level items.
nt = nt.replace(/^\s+\* /gm, convertNestLists)
// convert top-level unordered list items
nt = nt.replace(/^\* /gm, '  * ')
// TODO: add numeric ordered list conversion

app.setClipboard(nt)
