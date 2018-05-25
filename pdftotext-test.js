var pdftotext = require('pdftotextjs');
var R = require('ramda');
var pdf = new pdftotext('sample/test.pdf');

var data = pdf.getTextSync(); // returns buffer
data = data.toString('utf8');

var scrapedData = {};

inputObject = {
 date: "/.*PUBLICATION DATE.*/g",
 number: "/.*URGENT ACTION TYPE AND NUMBER.*/g"
};

var date = /.*PUBLICATION DATE.*/g;
var number = /.*URGENT ACTION TYPE AND NUMBER.*/g;
var letter = /ACTION LETTER[\w\W]*CONTACT DETAILS/g;


function findText (textToFind) {
  return data
    .match(textToFind)
    .toString();
}

function getTextAfterColon (foundText) {
  var splitArray = foundText.split(":");
  return splitArray[1];
}

function trimText (textToTrim) {
  return textToTrim.trim();
}

//Run with date
var result1 = findText(date);
var result2 = getTextAfterColon(result1);
scrapedData.date = trimText(result2);

//Run with number
scrapedData.number = trimText(getTextAfterColon(findText(number)));

scrapedData.letter = getTextAfterColon(findText(letter));

console.log (scrapedData);
