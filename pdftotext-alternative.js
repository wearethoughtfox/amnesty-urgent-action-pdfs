var pdftotext = require('pdftotextjs');
var fs = require('fs');

// Get all the text from the PDF, as one long string.
var pdftext = new pdftotext('sample/test.pdf').getTextSync().toString('utf8');

// Define each label we want to search for in the PDF
// As long as we know all the possible labels, it doesn’t matter if some labels are missing from some PDFs — we should still get the right content.
// However, if we don’t know all possible labels, we don’t know where the content for each label ends.
// If we know that the content for some labels will only ever be on one line, we could flag those labels, and get their content differently later on.
var labels = [
    {
        name: 'title',
        text: 'URGENT ACTION TITLE:'
    },
    {
        name: 'date',
        text: 'PUBLICATION DATE:'
    },
    {
        name: 'number',
        text: 'URGENT ACTION TYPE AND NUMBER:'
    },
    {
        name: 'indexNumber',
        text: 'INDEX NUMBER:'
    },
    {
        name: 'summary',
        text: 'URGENT ACTION SUMMARY:'
    },
    {
        name: 'letter',
        text: 'URGENT ACTION LETTER:'
    },
    {
        name: 'targetContactDetails',
        text: 'TARGET\'S CONTACT DETAILS & "COPIES TO"'
    },
    {
        name: 'preferredLanguage',
        text: 'PREFERRED LANGUAGE TO ADDRESS TARGET:'
    },
    {
        name: 'deadline',
        text: 'APPEAL DEADLINE NOTICE:'
    },
    {
        name: 'sendCopies',
        text: 'ALSO SEND COPIES TO DIPLOMATIC REPRESENTATIVES ACCREDITED TO YOUR COUNTRY'
    },
    {
        name: 'previousUALink',
        text: 'LINK TO PREVIOUS UA:'
    },
    {
        name: 'background',
        text: 'BACKGROUND INFORMATION (400 WORDS + RELEVANT LINKS):'
    },
    {
        name: 'paulsSecretSection',
        text: 'PAUL’S VERY OWN SECRET :'
    }
];

// Create a new array with all the labels from the previous list, and add the start and end positions of those labels in the PDF
var sections = labels.map(function (label, i) {
	var labelStart = pdftext.indexOf(label.text),
	      labelEnd = (labelStart > -1) ? (labelStart + label.text.length) : -1;

	return {
		      name: label.name,
	         label: label.text,
	    labelStart: labelStart,
	      labelEnd: labelEnd
	};
});

// Remove all sections whose labels we didn’t find in the PDF
sections = sections.filter(function (section) {
	return section.labelStart > -1;
});

// Sort the sections so that they’re in the same order that their labels show up in the PDF
sections.sort(function (a, b) {
	if (a.labelStart < b.labelEnd) {
		return -1;
	}
	else if (a.labelStart > b.labelEnd) {
		return 1;
	}
	else {
		return 0;
	}
});

// Assume that the content for each section is the text between the end of its label, and the start of the next section’s label (or the end of the file), and grab it.
sections = sections.map(function (section, i) {
	var  nextSection = sections[i+1],
	    contentStart = section.labelEnd,
	      contentEnd = nextSection ? nextSection.labelStart : pdftext.length;

	section.content = pdftext.slice(contentStart, contentEnd).trim();

	return section;
});

// Take the array of sections, and turn it into a single object of scraped data.
var scrapedData = sections.reduce(function (accumulator, currentSection) {
    accumulator[currentSection.name] = currentSection.content;

    return accumulator;
}, {});

var jsonContent = JSON.stringify(scrapedData, null, 4);

fs.writeFile("pdfoutput.json", jsonContent, 'utf8', function (err) {
    if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
    }

    console.log("JSON file has been saved.");
});
