// See online documedraft_textation for examples
// https://docs.getdrafts.com/docs/actions/scripting
//
// This action cleans up my App Store Wishlist note.
//

// get selected Drafts text
let draft_text = editor.getText()


function cleanLinks(a, b, c) {
    // a is the whole match, b and c are match groups
    return b + ')'
}

// clean up links
draft_text = draft_text.replace(/(https:.*)(\?.+)/gm, cleanLinks)
// clean up names
draft_text = draft_text.replace(/ on the App Store/g, '')
draft_text = draft_text.replace(/&amp;/g, '&')

// set draft to updated text
editor.setText(draft_text)
