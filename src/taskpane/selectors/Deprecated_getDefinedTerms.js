
// Returns true if word is term definition term and false if not
export const isWordTermDefinition = (word) => {
  console.log('Inside isWordTermDefinition with arg: ', JSON.stringify(word));
  var last = word.length - 1;
  if ( word[0] == "(" && word[last] == ")") {
    return true
  } else {
    return false;
  }
}

// Returns array of all defined terms in array of words
export const getDefinedTermsInWordsArray = (wordsArray) => {
  console.log('Inside getDefinedTermsInWordsArray with arg: ', JSON.stringify(wordsArray));
  var definedTerms = [];
  wordsArray.forEach( (word) => {
    if (isWordTermDefinition(word)) {
      definedTerms.push(word);
    }
  });
  console.log('Inside getDefinedTermsInWordsArray with arg: ', JSON.stringify(definedTerms));
  return definedTerms;
}

// Splits paragraph into array of words
export const getWordsInParagraph = (paragraph) => {
  console.log('Inside getWordsInParagraph with arg: ', JSON.stringify(paragraph));

  var wordsArray = [];
  paragraph.split(" ").forEach( (term) => {
    wordsArray.push(term.trim());
  })
  console.log('getWordsInParagraph result', JSON.stringify(wordsArray));
  return wordsArray;
}

// Returns array of all defined terms in selectionArray
export const getDefinedTermsInSelection = (selectionArray) => {
  console.log('Inside getDefinedTermsInSelection with arg: ', JSON.stringify(selectionArray));
  var definedTermsInSelection = [];

  selectionArray.forEach( (paragraph) => {
    var wordsArray = getWordsInParagraph(paragraph);
    var definedTermsInWordsArray = getDefinedTermsInWordsArray(wordsArray);
    definedTermsInWordsArray.forEach((term) => {
      definedTermsInSelection.push(term);
    })
  })

  console.log('getDefinedTermsInSelection result', JSON.stringify(definedTermsInSelection));
  return definedTermsInSelection;
}
