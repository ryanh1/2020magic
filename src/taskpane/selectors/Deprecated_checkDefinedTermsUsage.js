/*
  Problem with this section.
  Algirthm not right.
  Needs to consider entire body, not just paragraph.
  Also should return attribute to term array.
*/


// Checks if defined term is used
const isTermUsedInParagraph = (term, paragraph) => {
  console.log('Inside isTermUsedInParagraph with args: ', JSON.stringify(term), JSON.stringify(paragraph));
  var count = paragraph.match(new RegExp(term));
  var result = count > 0 ? true : false;
  console.log('isTermUsedInParagraph result: ', result);
  return result;
}

// See if defined terms are used in document
export const getTermsUsed = (definedTerms, bodyText) => {
  console.log('Inside getTermsUsed with args: ', JSON.stringify(definedTerms), JSON.stringify(bodyText));
  var termsUsed = [];
  if (definedTerms && bodyText) {
    bodyText.forEach( (paragraph) => {
      definedTerms.forEach( (term) => {
        if ( isTermUsedInParagraph(term, paragraph) ) {
          console.log('term ', term, ' used in: ', paragraph);
          if (!termsUsed.includes(term)) {
            termsUsed.push(term);
          }
        }
      })
      console.log('getTermsUsed result: ', termsUsed);
    });
    return termsUsed;
  } else {
    return [];
  }
}
