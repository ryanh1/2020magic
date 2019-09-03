import {untrackRanges, trackRanges} from './rangeHelpers';
import {flattenNestedArray} from './arrayHandling';

// Find strings in quotes
const findStringsInQuotes = (context, parentheticals) => {
  let quotesTree = [];
  for (let i = 0; i < parentheticals.items.length; i++) {
    console.log('parenthetical: ', i);
    let quotes = parentheticals.items[i].search('(“)(*)(”)', {matchWildCards: true});
    context.load(quotes, 'text');
    quotesTree.push(quotes);
  }
  return quotesTree;
}

const startsWithLower = (word) => {
  let firstLetter = word.charAt(0);
  if (firstLetter === firstLetter.toLowerCase() && firstLetter !== firstLetter.toUpperCase()) {
    return true;
  } else {
    return false;
  }
}

const findCapitalTerms = (capsIgnore) => {
  let result = capsIgnore.filter( (term) => {
    console.log('term: ', term.text);
    let termIsCap = true;
    let words = term.text.split(" ");
    words.forEach( (word) => {
      console.log('word: ', word);
      if (startsWithLower(word)) {
        termIsCap = false;
      }
    });
    console.log('word is capitalized: ', termIsCap);
    return termIsCap;
  });
  console.log('Capitalized terms: ', result);
  return result;
}

const stripQuotesFromArray = (context, flattenedQuotes) => {
  let termsTree = [];
  for (let i = 0; i < flattenedQuotes.length; i++) {
    console.log('quote: ', i);
    let textInsideQuote = stripQuoteText(flattenedQuotes[i].text);
    console.log('stripped term: ', textInsideQuote);
    let insideQuote = flattenedQuotes[i].search(textInsideQuote);
    context.load(insideQuote, 'text', 'font', 'context');
    termsTree.push(insideQuote);
  }
  return termsTree;
}

// Remove the "( )" from array
const stripQuoteText = (quoteText) => {
  if (quoteText) {
    console.log('Inside stripParenthetical with arg: ', JSON.stringify(quoteText));
    console.log('stripParenthetical result: ', JSON.stringify(quoteText.substring(1, quoteText.length - 1)));
    return quoteText.substring(1, quoteText.length - 1);
  }
}

const highlightRangesChanged = (rangeArray) => {
  for (let i = 0; i < rangeArray.length; i++) {
    console.log('flattenedTerms: ', rangeArray[i]);
    rangeArray[i].font.color = 'purple';
    rangeArray[i].font.highlightColor = 'pink';
    rangeArray[i].font.bold = true;
  }
  return rangeArray;
}

export const getTerms = (flattenedTerms) => {
  return new Promise((resolve, reject) => {

    // Remove memory allocation for flattenedTerms;
    flattenedTerms = untrackRanges(flattenedTerms);

    return Word.run(
      function (context) {

        // Find all parentheticals
        let parentheticals = context.document.body.search('([\(])(*)([\)])', {matchWildCards: true});
        context.load(parentheticals, 'context');

        // Execute commands in batch
        return context.sync().then(function () {
          console.log('Parentheticals found: ' + parentheticals.items.length);
          console.log('Parentheticals: ', JSON.stringify(parentheticals));

          // Within parentheticals, find all strings in quotes
          let quotesTree = findStringsInQuotes(context, parentheticals);

          // Execute commands in batch
          return context.sync().then(function () {

            // Flatten tree
            let flattenedQuotes = flattenNestedArray(quotesTree);
            console.log('flattenedQuotes found: ' + flattenedQuotes.length);
            console.log('flattenedQuotes: ', JSON.stringify(flattenedQuotes));

            // Within quotes, find strings without the quotes
            let capsIgnore = stripQuotesFromArray(context, flattenedQuotes);

            // Execute commands in batch
            return context.sync().then(function() {

              let flattenedCapsIgnore = flattenNestedArray(capsIgnore);
              console.log('flattenedCapsIgnore found: ' + flattenedCapsIgnore.length);
              console.log('flattenedCapsIgnore: ', JSON.stringify(flattenedCapsIgnore));

              flattenedTerms = trackRanges(findCapitalTerms(flattenedCapsIgnore));
              console.log('Highlighting ', flattenedTerms.length, ' terms.');

              // flattenedTerms = highlightRangesChanged(flattenedTerms);

              return context.sync().then(function () {
                return resolve(flattenedTerms);
              })
            })
          })
        })
      }
    );
  });
}
