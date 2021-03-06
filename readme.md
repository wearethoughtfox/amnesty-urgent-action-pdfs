## The brief

1. Extract information from PDFs
* Sample in /sample folder
* http://coolwanglu.github.io/pdf2htmlEX/
* https://github.com/fagbokforlaget/pdftohtmljs
* https://pdf2htmlex.blogspot.co.uk
* https://gist.github.com/maxogden/5842859

2. In the wilds of .org these would need to be extracted and displayed initially on the pages below through if possible looking for and converting the first listed PDF URL in the select box or if single language the the PDF linked to in the button.  It would need to happen during the page load process without excessive delay.  (UA's are quite small files)

https://www.amnesty.org/en/documents/asa25/8374/2018/en/ - drop down box
https://www.amnesty.org/en/documents/afr63/8403/2018/en/ - Button


## The solution

1. The script requires pdftotext and pdftotextjs on the machine running the code. Installed pdftotext via brew install xpdf.
2. In the NodeJS [script](/pdftotext-alternative.js) we have defined a set of labels based on the sample PDF provided.
3. We need to know all possible labels, but not all labels need to be in all PDFs.
4. The script uses pdftotext through the pdftotextjs wrapper to convert the sample PDF to a string.
5. Then it looks through that string for all the labels defined and splits the string up into separate key value pairs based on the labels.
6. It outputs these as an object.
7. This object is written to a [file](/pdfoutput.json)
8. This file is loaded into index.html
9. It populates a simple template with minimal styling as a proof of concept

## Issues
1. targetContactDetails doesn’t have any line breaks for some reason
2. The page numbers “1” and “2” are shown when perhaps we don’t need them.
3. Marking up links to https://www.amnesty.org/en/documents/  in some way but this gets into the way you display the data.
