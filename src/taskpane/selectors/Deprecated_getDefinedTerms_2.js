/* GET PARENTHETICALS */

// Returns array of strings in paragraph in parentheses
const getParentheticals = (paragraph) => {
  if (paragraph) {
    console.log('Inside getParentheticals with arg: ', JSON.stringify(paragraph));
    var parentheticals = paragraph.match(/\((\w)*([\s\w=+-_?"”“';:{}|<>!@#$%^&*(),.<>?/'"~`])*\)/g);
    if (parentheticals == null) {
      console.log('getParentheticals result: ', "null");
      return [];
    } else {
      console.log('getParentheticals result: ', JSON.stringify(parentheticals));
      return stripParentheticalArray(parentheticals);
    }
  }
}

// Remove the "( )" from array
const stripParenthetical = (parenthetical) => {
  if (parenthetical) {
    console.log('Inside stripParenthetical with arg: ', JSON.stringify(parenthetical));
    console.log('stripParenthetical result: ', JSON.stringify(parenthetical.substring(1, parenthetical.length - 1)));
    return parenthetical.substring(1, parenthetical.length - 1);
  }
}

// Remove the "( )" from 1 element
const stripParentheticalArray = (parentheticalArray) => {
  if (parentheticalArray) {
    return parentheticalArray.map( (parenthetical) => {
      return stripParenthetical(parenthetical);
    })
  }
}


/* GET DEFINITIONS FOR STUFF IN PARENTHENTICALS  */

// Returns array of defined terms from a string of paragraph text
const getDefinitionsInParenthetical = (paragraph) => {
  if (paragraph) {
    console.log('Inside getDefinitionsInParenthetical with arg: ', JSON.stringify(paragraph));
    var definedTerms = paragraph.match(/([“'"])([A-Z][\w-']*)(\s+[A-Z][\w-']*)*([”'"])/g);
    if (definedTerms === null) {
      console.log('getDefinitionsInParenthetical result: ', "null");
      return [];
    } else {
      console.log('getDefinitionsInParenthetical result: ', JSON.stringify(definedTerms));
      return stripDefinedTermsArray(definedTerms);
    }
  }
}

// Remove the " " from array
const stripDefinedTermsArray = (terms) => {
  if (terms) {
    return terms.map( (term) => {
      return stripDefinedTerm(term);
    })
  }
}

// Remove the " " from 1 element
const stripDefinedTerm = (term) => {
  if (term) {
    console.log('Inside stripDefinedTerm with arg: ', JSON.stringify(term));
    console.log(term.substring(1, term.length - 1));
    return term.substring(1, term.length - 1);
  }
}

/* FIND DEFINED TERMS FROM ARRAY OF PARAGRAPH */

// Returns array of defined terms from an array of paragraphs
export const getDefinitionsFromBody = (paragraphs) => {
  console.log('Inside getDefinitionsFromBody with arg: ', JSON.stringify(paragraphs));
  var definedTerms = [];
  if (paragraphs) {
      paragraphs.forEach ( (paragraph) => {
        var parentheticalsInParagraph = getParentheticals(paragraph);
        if (parentheticalsInParagraph) {
          parentheticalsInParagraph.forEach( (parenthetical) => {
            var termsInParenthetical = getDefinitionsInParenthetical(parenthetical);
            if (termsInParenthetical) {
              termsInParenthetical.forEach( (term) => {
                definedTerms.push(term);
              });
            }
          })
        }
      });
    console.log('getDefinitionsFromBody result', JSON.stringify(definedTerms));
    return definedTerms;
  }
}
