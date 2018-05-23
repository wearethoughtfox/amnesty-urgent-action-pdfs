var pdftotext = require('pdftotextjs');
var pdf = new pdftotext('sample/test.pdf');

var data = pdf.getTextSync(); // returns buffer
data = data.toString('utf8');

var scrapedData = {};


var re1 = /.*URGENT ACTION TYPE AND NUMBER.*/g;
var found1 = data.match(re1);
var splitText1 = found1.toString().split(":");
scrapedData.number = splitText1[1].trim();

console.log (scrapedData);

// Trying to break it down

var date = /.*PUBLICATION DATE.*/g;

function findText (textToFind) {
  return data
    .match(textToFind)
    .toString();
}

function splitTextByColon (foundText) {
  return foundText.split(":");
}

function trimText (arrayToTrim) {
  return arrayToTrim[1].trim();
}

console.log (
  findText(date)
);
