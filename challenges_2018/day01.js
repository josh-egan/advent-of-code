export function applyFrequencyChanges(startingFrequency, changes) {
  const newFrequency = changes.reduce((f, change) => {
    return f + change;
  }, startingFrequency);
  return newFrequency;
}

export function findFirstDuplicateFrequency(startingFrequency, changes) {
  const frequenciesReached = {};
  frequenciesReached[startingFrequency] = true;

  let currentFrequency = startingFrequency;
  let idx = 0;
  do {
    currentFrequency += changes[idx];
    if (frequenciesReached[currentFrequency]) return currentFrequency;
    else frequenciesReached[currentFrequency] = true;
    idx++;
    if (idx >= changes.length) idx = 0;
  } while (true)
}