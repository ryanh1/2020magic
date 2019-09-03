
// Check if the range is null, and if not untrack the ranges to save memory
export const untrackRanges = (rangeArray) => {
  if (rangeArray === null) {
    console.log('Range array is null');
  } else {
    console.log('Begin untracking range array');
    rangeArray = untrackRangeArray(rangeArray);
  }
  console.log('Range array: ', JSON.stringify(rangeArray));
  return [];
}

// Untrack each range in the array to save memory
async function untrackRangeArray(rangeArray) {
  if (rangeArray.length > 0) {
    await Word.run(rangeArray, async (context) => {
      rangeArray.forEach((range) => {
        console.log('Untrack range: ', JSON.stringify(range));
        range.untrack()
      });
      rangeArray = [];
      await context.sync();
    })
  } else {
    console.log('No ranges to untrack');
  }
}

// Track ranges
export const trackRanges = (rangeArray) => {
  let result = [];
  if (rangeArray === null) {
    console.log('Range array is null');
  } else if (rangeArray.length === 0) {
    console.log('Range array is empty');
  } else {
    rangeArray.forEach( (range) => {
      range.track();
      console.log('Track range: ', JSON.stringify(range));
      result.push(range);
    })
  }
  return result;
}


export const rangesToText = (items) => {
  console.log('Inside rangesToText with arg: ', JSON.stringify(items));
  return items.map(
    (item) => {
      console.log("item text: ", JSON.stringify(item.text));
      return item.text;
    }
  );
}
