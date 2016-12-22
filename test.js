/**
 * Created by sinakashipazha on 12/20/2016 AD.
 */

var webdriverio = require('webdriverio');

var options = {
    desiredCapabilities: {
        browserName: 'firefox'
    }
};

webdriverio
    .remote(options)
    .init()
    .url('http://www.digistyle.com')
    .click('#loginLink')
    .waitForEnabled('#Email', 3000)
    .waitForEnabled('#Password', 3000)
    .addValue('#Email', 'esterlinkof@yahoo.co.uk')
    .setValue('#Password', 'AZIta1100')
    .click('.dk-btn')
    .waitForEnabled('#nothing', 3000)
    .getTitle().then(function (title) {
    console.log('Title was: ' + title);
}).end();
