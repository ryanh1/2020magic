import {untrackRanges, trackRanges} from './rangeHelpers';
import {flattenNestedArray} from './arrayHandling';


// Remove duplicate ranges
export const removeDuplicateRanges = (context, usesTree, flattenedUses, flattenedTerms) => {
  flattenedUses = trackRanges(flattenNestedArray(usesTree));
  return context.sync().then(function() {
    let locationArray = getLocationsOfUses(flattenedUses, flattenedTerms);
    return context.sync().then( function() {
      let duplicateLocationIndexes = findDuplicateLocations(locationArray);
      flattenedUses = removeDuplicateLocations(flattenedUses, duplicateLocationIndexes);
      return context.sync().then( function() {
        return flattenedUses;
      });
    });
  });
}

// Get locations of all uses.
const getLocationsOfUses = (flattenedUses, flattenedTerms) => {
  let locationArray = [];
  for (let i = 0; i < flattenedUses.length; i++) {
    for (let n = 0; n < flattenedTerms.length; n++) {
      let location = flattenedUses[i].compareLocationWith(flattenedTerms[n]);
      let locationObject = {usesIndex: i, location: location}
      locationArray.push(locationObject);
    }
  };
  return locationArray;
}

// When an array of locationObjects is passed in, return an array of the indexes were duplicates occur.
const findDuplicateLocations = (locationArray) => {
  let duplicateLocationIndexes = [];
  locationArray.forEach((locationObject) => {
    if (locationObject.location.value === 'Equal') {
      duplicateLocationIndexes.push(locationObject.usesIndex);
    }
  });
  return duplicateLocationIndexes;
}

// Remove use from flattenedUses if the location is a duplicate of a term.
const removeDuplicateLocations = (flattenedUses, duplicateLocationIndexes) => {
  return flattenedUses.filter((use, usesIndex) => {
    if (duplicateLocationIndexes.includes(usesIndex)) {
      use.untrack()
      return false;
    } else {
      return true;
    }
  });
}
