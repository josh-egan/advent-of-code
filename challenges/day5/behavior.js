function isNice(str) {
  const invalidCharacterSequences = /ab|cd|pq|xy/g
  if (invalidCharacterSequences.test(str)) return false

  let vowels = str.match(/[aeiou]/g)
  if (!vowels || vowels.length < 3) return false

  let repeatingCharacter = /(\w)\1/g
  if (!repeatingCharacter.test(str)) return false

  return true
}

function isTrulyNice(str) {
  const charRepeatedWithOneBetween = /(\w)\w\1/g
  if (!charRepeatedWithOneBetween.test(str)) return false

  const repeatedPair = /(\w\w).*\1/g
  if (!repeatedPair.test(str)) return false

  return true
}

export default {
  countNiceStrings(stringArray) {
    let numNiceStrings = 0
    stringArray.forEach(s => {
      if (isNice(s)) numNiceStrings++
    })
    return numNiceStrings
  },

  countTrulyNiceStrings(stringArray) {
    let numNiceStrings = 0
    stringArray.forEach(s => {
      if (isTrulyNice(s)) numNiceStrings++
    })
    return numNiceStrings
  }
}
