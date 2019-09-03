
// Return array of lower case versions of defined terms
const getLowerCaseTerms = (definedTerms) => {
  console.log('Inside getLowerCastTerms with args: ', JSON.stringify(definedTerms));
  if (definedTerms) {
    return definedTerms.map((term) => {
      return term.toLowerCase();
    })
  } else {
    return [];
  }

}

// Return array of lower case words used in paragraph similar to upper case terms
const getUsedLowerTerms = (lowerTerms, paragraph) => {
  console.log('Inside getLowerTerms with args: ', JSON.stringify(lowerTerms), JSON.stringify(paragraph));
  if (lowerTerms) {
    return lowerTerms.filter((term) => {
      return paragraph.includes(term);
    })
  } else {
    return [];
  }
}

// Teturn array of lower case words used in body similar to upper case terms
export const getMistakenlyLowerTerms = (definedTerms, bodyTextArray) => {
  console.log('Inside getMistakenlyLowerTerms with args: ', JSON.stringify(definedTerms), JSON.stringify(bodyTextArray));
  if (definedTerms && bodyTextArray) {
    var mistakenlyLowerTerms = [];
    var lowerTerms = getLowerCaseTerms(definedTerms);
    bodyTextArray.forEach((paragraph) => {
      var usedLowerTerms = getUsedLowerTerms(lowerTerms, paragraph);
      usedLowerTerms.forEach((term) => {
        mistakenlyLowerTerms.push(term);
      })
    })
    console.log('getMistakenlyLowerTerms result', JSON.stringify(mistakenlyLowerTerms));
    return mistakenlyLowerTerms;
  } else {
    return [];
  }
}
