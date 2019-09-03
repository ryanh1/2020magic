export const toggleHighlight = (termsHighlighted, rangesToHighlight, color) => {
  termsHighlighted ? unhighlightTerms(rangesToHighlight) : highlightTerms(rangesToHighlight, color);
  return !termsHighlighted;
}

async function highlightTerms (rangesToHighlight, color) {
  await Word.run( rangesToHighlight, (context) => {
      console.log('Highlighting ', rangesToHighlight.length, ' terms.');
      for (let i = 0; i < rangesToHighlight.length; i++) {
        let term = rangesToHighlight[i];
        console.log('Highlighting defined term: ', JSON.stringify(term));
        // term.font.color = 'blue';
        // term.font.bold = true;
        term.font.highlightColor = color;
        term.select();
      }
      context.sync();
  })
}

async function unhighlightTerms (rangesToHighlight) {
  await Word.run( rangesToHighlight, (context) => {
    console.log('Unhighlighting ', rangesToHighlight.length, ' terms.');
    for (let i = 0; i < rangesToHighlight.length; i++) {
      let term = rangesToHighlight[i];
      console.log('Unhighlighting defined term: ', JSON.stringify(term));
      term.font.highlightColor = null;
      term.select();
    }
    context.sync();
  })
}
