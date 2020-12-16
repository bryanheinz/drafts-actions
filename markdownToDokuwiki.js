// See online documentation for examples
// https://docs.getdrafts.com/docs/actions/scripting
//
// This action converts Markdown syntax to Dokuwiki syntax.
// It is far from full coverage and will be added to over time.
//

// get selected Drafts text
const selected_text = editor.getSelectedText();

function convertHeader(match, groupA, groupB) {
    const hl = groupA.length;
    let hn = '**';
    
    if (hl === 1) {
        hn = '======';
    } else if (hl === 2) {
        hn = '=====';
    } else if (hl === 3) {
        hn = '====';
    } else if (hl === 4) {
        hn = '===';
    } else {
        hn = '**';
    }
    
    return hn + ' ' + groupB + ' ' + hn;
}
function convertLinks(a, b, c) {
    const dokuLink = "[[" + c + "|" + b + "]]";
    return dokuLink;
}

// convert beginning of italics
let nt = selected_text.replace(/\b_/g, '//');
// convert end of italics
nt = nt.replace(/_\b/g, '//');
// convert beginning of code block
nt = nt.replace(/`{3}\b/g, "<code>");
// convert beginning of code block
nt = nt.replace(/\b`{3}/g, "</code>");
// convert beginning of in-line code
nt = nt.replace(/`{1}\b/g, "''");
// convert end of in-line code
nt = nt.replace(/\b`{1}/g, "'' ");
// convert headers
nt = nt.replace(/(#+) (.+)/g, convertHeader);
// convert links
nt = nt.replace(/\[(.*)\]\((.*)\)/g, convertLinks);

app.setClipboard(nt);
