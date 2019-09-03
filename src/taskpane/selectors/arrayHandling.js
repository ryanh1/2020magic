export const flattenNestedArray = (nestedArray) => {
  let flattenedArray = [];
  nestedArray.forEach( (obj) => {
    obj.items.forEach( (item) => {
      flattenedArray.push(item);
    })
  });
  return flattenedArray;
}
