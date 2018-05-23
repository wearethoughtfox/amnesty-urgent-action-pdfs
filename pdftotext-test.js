var pdftotext = require('pdftotextjs');
var pdf = new pdftotext('sample/test.pdf');

var data = pdf.getTextSync(); // returns buffer
data = data.toString('utf8');

var re = /.*PUBLICATION DATE.*/g;
var found = data.match(re);
var splitText = found.toString().split(":");
var actionDate = splitText[1].trim();
console.log (actionDate);

var re1 = /.*URGENT ACTION TYPE AND NUMBER.*/g;
var found1 = data.match(re1);
var splitText1 = found1.toString().split(":");
var actionNumber = splitText1[1].trim();
console.log (actionNumber);
