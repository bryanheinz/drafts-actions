// See online documentation for examples
// https://docs.getdrafts.com/docs/actions/scripting
//
// This action takes a selected shipment tracking code and opens the tracking
// page on the shipper's website.
//

var track_code = editor.getSelectedText();
var code_len = track_code.length;

if (code_len === 12 || code_len === 20) {
    // FedEx
    var track_url = 'https://www.fedex.com/apps/fedextrack/?tracknumbers=';
} else if (code_len === 18) {
    // UPS
    var track_url = 'https://www.ups.com/WebTracking?HTMLVersion=5.0&Requester=NES&AgreeToTermsAndConditions=yes&loc=en_CA&tracknum=';
} else if (code_len === 22) {
    // USPS
    var track_url = 'https://tools.usps.com/go/TrackConfirmAction?tLabels=';
} else {
    context.fail("Not sure which shipping proveder to use.")
    script.complete()
}

track_url = track_url + track_code;

app.openURL(track_url, true);
