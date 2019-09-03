import {untrackRanges, trackRanges} from './rangeHelpers';
import {flattenNestedArray} from './arrayHandling';
import {removeDuplicateRanges} from './removeDuplicateRanges';


export function getUses (flattenedUses, flattenedTerms, mistakenlyLowerUses) {
  return new Promise((resolve, reject) => {
    if (flattenedTerms.length < 1) {
      return resolve([]);
    } else {
      flattenedUses = untrackRanges(flattenedUses);
      return Word.run( flattenedTerms, (context) => {
        let usesTree = [];
        flattenedTerms.forEach((term) => {
          let searchTerm = mistakenlyLowerUses ? term.text.toLowerCase() : term.text;
          let termUses = context.document.body.search(searchTerm, {matchCase: true});
          context.load(termUses, 'text', 'context');
          usesTree.push(termUses);
        });
        return context.sync().then( function () {
          return resolve(removeDuplicateRanges(context, usesTree, flattenedUses, flattenedTerms));
        });
      });
    }
  });
}
