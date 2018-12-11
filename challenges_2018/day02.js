export function getChecksum(ids) {
  let numWith2 = 0;
  let numWith3 = 0;

  ids.forEach(id => {
    const charMap = {};
    const chars = id.split('');
    chars.forEach(char => {
      if (charMap[char]) charMap[char]++
      else charMap[char] = 1
    })
    const counts = Object.values(charMap);
    if (counts.some(c => c === 2)) numWith2++;
    if (counts.some(c => c === 3)) numWith3++;
  })

  return numWith2 * numWith3;
}

export function oneCharOff(ids) {
  for(let i = 0; i < ids.length - 1; i++) {
    const id1 = ids[i];
    const chars1 = id1.split('');

    for(let j = i + 1; j < ids.length; j++) {
      const id2 = ids[j];
      const chars2 = id2.split('');

      const matching = [];
      let numNotMatching = 0;

      for(let k = 0; k < chars1.length; k++) {
        if (chars1[k] === chars2[k]) matching.push(chars1[k]);
        else numNotMatching++;

        if (numNotMatching > 1) break;
      }

      if (numNotMatching === 1) return matching.join('');
    }
  }
}