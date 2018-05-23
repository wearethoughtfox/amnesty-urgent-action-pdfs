const pdftotext = require('pdftotextjs');
const pdf = new pdftotext('sample/test.pdf');

const data = pdf.getTextSync(); // returns buffer
console.log(data.toString('utf8'));
